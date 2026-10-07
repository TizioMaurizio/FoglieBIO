"""Manually build/deploy the dedicated WordPress preview. Standard library only."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import getpass
import hashlib
from html.parser import HTMLParser
import http.cookiejar
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
import zipfile

BASE = "https://www.laruotabio.it"
PLUGIN = "foglie-bio-preview/foglie-bio-preview.php"
ASSETS = "/wp-content/plugins/foglie-bio-preview/site/"
PAGE_BASE = "/foglie-bio-plus/"
PAGES = ["index.html", "en/index.html", "privacy.html", "terms.html", "cookies.html", "en/privacy.html", "en/terms.html", "en/cookies.html"]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.forms, self.text = [], [], []
        self.form = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag == "form":
            self.form = {"action": attrs.get("action", ""), "fields": {}, "files": []}
            self.forms.append(self.form)
        if tag == "input" and self.form is not None and attrs.get("name"):
            if attrs.get("type") == "file":
                self.form["files"].append(attrs["name"])
            else:
                self.form["fields"][attrs["name"]] = attrs.get("value", "")

    def handle_endtag(self, tag):
        if tag == "form":
            self.form = None

    def handle_data(self, text):
        self.text.append(text)


def same_site(url, context="/"):
    result = urllib.parse.urljoin(BASE + context, url)
    parsed = urllib.parse.urlsplit(result)
    if parsed.scheme != "https" or parsed.hostname != "www.laruotabio.it" or parsed.port or parsed.username or parsed.password:
        raise RuntimeError("Refusing a request outside the intended HTTPS website.")
    return result


class SameSiteRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, response, code, message, headers, new_url):
        return super().redirect_request(request, response, code, message, headers, same_site(new_url))


class Client:
    def __init__(self):
        self.opener = urllib.request.build_opener(SameSiteRedirect(), urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def request(self, path, data=None, content_type=None):
        if isinstance(data, dict):
            data = urllib.parse.urlencode(data).encode()
            content_type = "application/x-www-form-urlencoded"
        request = urllib.request.Request(same_site(path), data=data)
        if content_type:
            request.add_header("Content-Type", content_type)
        try:
            with self.opener.open(request, timeout=45) as response:
                return response.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as error:
            raise RuntimeError(f"WordPress request failed (HTTP {error.code}).") from None
        except urllib.error.URLError:
            raise RuntimeError("WordPress could not be reached securely.") from None

    def login(self):
        username = os.environ.get("FOGLIE_WP_USER") or input("WordPress username: ")
        password = os.environ.get("FOGLIE_WP_PASSWORD") or getpass.getpass("WordPress password: ")
        self.request("/wp-login.php")
        self.request("/wp-login.php", {"log": username, "pwd": password, "wp-submit": "Accedi", "redirect_to": BASE + "/wp-admin/", "testcookie": "1"})
        del password
        html = self.request("/wp-admin/plugin-install.php?tab=upload")
        forms = [form for form in Page(html).forms if "pluginzip" in form["files"]]
        if len(forms) != 1 or "_wpnonce" not in forms[0]["fields"]:
            raise RuntimeError("Login/upload access was not established. Complete any authentication challenge in WordPress directly.")
        return forms[0]

    def backup(self, timeout):
        html = self.request("/wp-admin/options-general.php?page=updraftplus")
        match = re.search(r"var\s+updraft_credentialtest_nonce\s*=\s*['\"]([^'\"]+)", html)
        if not match:
            raise RuntimeError("UpdraftPlus is unavailable; deployment stopped before changing the site.")
        nonce = match.group(1)

        def command(action, **parameters):
            response = json.loads(self.request("/wp-admin/admin-ajax.php", {"action": "updraft_ajax", "subaction": action, "nonce": nonce, **parameters}))
            if not isinstance(response, dict) or response.get("error") or response.get("fatal_error"):
                raise RuntimeError("UpdraftPlus did not accept the backup operation.")
            return response

        response = command("backupnow", backupnow_nodb=1, backupnow_nofiles=0, backupnow_nocloud=1, onlythisfileentity="plugins", always_keep=1, incremental=0)
        job = response.get("nonce", "")
        if not re.fullmatch(r"[a-f0-9]{12}", job):
            raise RuntimeError("The backup job was not confirmed; deployment stopped.")
        print(f"Protected plugin backup started: {job}", flush=True)
        deadline = time.monotonic() + timeout
        last_progress = 0
        while time.monotonic() < deadline:
            result = command("get_log", action_data=job)
            if result.get("nonce") != job:
                raise RuntimeError("Unexpected backup job; deployment stopped.")
            if "The backup succeeded and is now complete" in result.get("log", ""):
                print("Plugin backup completed.", flush=True)
                return job
            if time.monotonic() - last_progress > 30:
                print("Waiting for the protected plugin backup...", flush=True)
                last_progress = time.monotonic()
            time.sleep(5)
        raise RuntimeError("Backup did not complete within the time limit; no deployment was attempted.")

    def preflight(self):
        html = self.request("/wp-admin/options-general.php?page=updraftplus")
        match = re.search(r"var\s+updraft_credentialtest_nonce\s*=\s*['\"]([^'\"]+)", html)
        if not match:
            raise RuntimeError("UpdraftPlus backup access is unavailable.")
        result = json.loads(self.request("/wp-admin/admin-ajax.php", {"action": "updraft_ajax", "subaction": "get_existing_backups_data", "nonce": match.group(1)}))
        if not isinstance(result, dict) or not isinstance(result.get("history"), (dict, list)):
            raise RuntimeError("UpdraftPlus did not confirm access to backup history.")
        cache = self.request("/wp-admin/options-general.php?page=aruba-hispeed-cache")
        if not re.search(r'["\']ahsc_nonce["\']\s*:\s*["\']([^"\']+)', cache):
            raise RuntimeError("Aruba cache control is unavailable.")
        print("Preflight passed: WordPress upload, UpdraftPlus and Aruba cache access. No installation or backup was performed.")

    def upload(self, form, package):
        boundary = "foglie-" + uuid.uuid4().hex
        parts = []
        for name, value in form["fields"].items():
            parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="pluginzip"; filename="foglie-bio-preview.zip"\r\nContent-Type: application/zip\r\n\r\n'.encode())
        parts.extend([package.read_bytes(), f"\r\n--{boundary}--\r\n".encode()])
        url = same_site(form["action"], "/wp-admin/plugin-install.php")
        query = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)
        if urllib.parse.urlsplit(url).path != "/wp-admin/update.php" or query.get("action") != ["upload-plugin"]:
            raise RuntimeError("Unexpected WordPress upload destination.")
        html = self.request(url, b"".join(parts), "multipart/form-data; boundary=" + boundary)
        replacements = [link for link in Page(html).links if urllib.parse.parse_qs(urllib.parse.urlsplit(link).query).get("overwrite") == ["update-plugin"]]
        if len(replacements) > 1:
            raise RuntimeError("Ambiguous plugin replacement response; deployment stopped.")
        if replacements:
            replacement = same_site(replacements[0], "/wp-admin/update.php")
            query = urllib.parse.parse_qs(urllib.parse.urlsplit(replacement).query)
            if urllib.parse.urlsplit(replacement).path != "/wp-admin/update.php" or query.get("action") != ["upload-plugin"] or not query.get("_wpnonce"):
                raise RuntimeError("Unexpected replacement operation.")
            html = self.request(replacement)
        text = " ".join(Page(html).text).lower()
        if not any(message in text for message in ["aggiornato con successo", "installato correttamente", "plugin updated successfully", "plugin installed successfully"]):
            raise RuntimeError("WordPress did not confirm successful installation. Check the backup and admin panel.")
        html = self.request("/wp-admin/plugins.php")
        links = []
        for link in Page(html).links:
            query = urllib.parse.parse_qs(urllib.parse.urlsplit(link).query)
            if query.get("plugin") == [PLUGIN]:
                links.append((link, query.get("action", [""])[0]))
        activation = [link for link, action in links if action == "activate"]
        if activation:
            self.request(same_site(activation[0], "/wp-admin/plugins.php"))
            html = self.request("/wp-admin/plugins.php")
        active = any(urllib.parse.parse_qs(urllib.parse.urlsplit(link).query).get("plugin") == [PLUGIN] and urllib.parse.parse_qs(urllib.parse.urlsplit(link).query).get("action") == ["deactivate"] for link in Page(html).links)
        if not active:
            raise RuntimeError("The updated product plugin is not active. Use WordPress admin to recover.")
        print("WordPress installed and activated the product plugin.", flush=True)

    def clear_cache(self):
        html = self.request("/wp-admin/options-general.php?page=aruba-hispeed-cache")
        match = re.search(r'["\']ahsc_nonce["\']\s*:\s*["\']([^"\']+)', html)
        if not match:
            raise RuntimeError("Aruba cache control was not found. Clear the cache in wp-admin, then run --verify-only.")
        result = json.loads(self.request("/wp-admin/admin-ajax.php", {"action": "ahcs_clear_cache", "ahsc_nonce": match.group(1), "ahsc_to_purge": "all"}))
        if not isinstance(result, dict) or result.get("type") != "success" or result.get("code") != 200:
            raise RuntimeError("Aruba did not confirm cache clearing. Clear it in wp-admin, then run --verify-only.")
        print("Aruba cache cleared.", flush=True)


def validate_package(package):
    files = {}
    with zipfile.ZipFile(package) as archive:
        if archive.testzip() is not None:
            raise RuntimeError("The package is corrupt.")
        for item in archive.infolist():
            path = PurePosixPath(item.filename)
            if item.is_dir():
                continue
            if path.is_absolute() or ".." in path.parts or "\\" in item.filename or not item.filename.startswith("foglie-bio-preview/"):
                raise RuntimeError("The package contains files outside the intended plugin.")
            if item.filename in files or (item.external_attr >> 16) & 0o170000 == 0o120000:
                raise RuntimeError("Duplicate entries and symbolic links are not allowed.")
            files[item.filename] = archive.read(item)
    adapter = files.get("foglie-bio-preview/foglie-bio-preview.php", b"").decode()
    if "'/foglie-bio-plus' => 'index.html'" not in adapter or re.search(r"['\"]/['\"]\s*=>", adapter):
        raise RuntimeError("The adapter must preserve the company homepage and use the dedicated product route.")
    for page in PAGES:
        html = files.get("foglie-bio-preview/site/" + page, b"").decode()
        if ASSETS not in html or "noindex,nofollow" not in html or 'href="' + BASE + PAGE_BASE not in html:
            raise RuntimeError("The package is missing a valid localized preview page.")
    for name, content in files.items():
        if name.endswith((".html", ".js", ".css", ".json", ".php")):
            text = content.decode(errors="replace")
            if re.search(r"\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}|\bwhsec_[A-Za-z0-9]{16,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----", text):
                raise RuntimeError("A possible credential was found in the package.")
            for url in re.findall(r"https://buy\.stripe\.com/[A-Za-z0-9_]+", text):
                if not re.fullmatch(r"https://buy\.stripe\.com/test_[A-Za-z0-9]+", url):
                    raise RuntimeError("Only the approved sandbox preview can be deployed by this script.")
    return files


def public_get(path):
    opener = urllib.request.build_opener(SameSiteRedirect())
    with opener.open(same_site(path), timeout=30) as response:
        return response.read(), response.headers


def company_homepage():
    html, headers = public_get("/")
    match = re.search(rb"<title>(.*?)</title>", html, re.S)
    if headers.get("X-Foglie-Preview") or not match:
        raise RuntimeError("The company homepage is not healthy; deployment stopped.")
    return match.group(1)


def verify(files, original_title):
    tasks = []
    for name, data in files.items():
        if name.startswith("foglie-bio-preview/site/"):
            relative = name.removeprefix("foglie-bio-preview/site/")
            if relative == ".nojekyll":
                continue
            if relative in PAGES:
                path = PAGE_BASE + (relative.removesuffix("index.html") if relative.endswith("index.html") else relative)
            else:
                path = ASSETS + relative
            tasks.append((path, data))

    def check(task):
        path, expected = task
        actual, _ = public_get(path)
        if actual != expected:
            raise RuntimeError("The published build does not match the package: " + path)

    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(check, tasks))
    if company_homepage() != original_title:
        raise RuntimeError("The company homepage changed unexpectedly; use the protected backup to recover.")
    print(f"Verified {len(PAGES)} product pages, assets and the original company homepage.", flush=True)


def build(site, output, node=None, pnpm=None):
    node = shutil.which(node or "node")
    manager = shutil.which(pnpm or "npm")
    if not node or not manager:
        raise RuntimeError("Node >=22.13.0 and npm are required. Alternatively provide --node/--pnpm or an existing ZIP with --package.")
    version = tuple(map(int, subprocess.check_output([node, "-p", "process.versions.node"], text=True).strip().split(".")))
    if version < (22, 13, 0):
        raise RuntimeError("Node >=22.13.0 is required.")
    environment = {key: value for key, value in os.environ.items() if key not in ["VITE_ASSET_BASE", "VITE_PAGE_BASE", "VITE_SITE_URL"]}
    environment["PATH"] = str(Path(node).parent) + os.pathsep + os.environ.get("PATH", "")
    build_environment = {**environment, "VITE_ASSET_BASE": ASSETS, "VITE_PAGE_BASE": PAGE_BASE, "VITE_SITE_URL": BASE + PAGE_BASE}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.parent.chmod(0o700)
    # Native packages from the mounted Windows checkout are never used or changed.
    with tempfile.TemporaryDirectory(prefix="foglie-wordpress-build-") as directory:
        native = Path(directory) / "site"
        shutil.copytree(site, native, ignore=shutil.ignore_patterns("node_modules", "dist", "coverage", ".wordpress-deploy", "__pycache__", ".env*", "*.pem"))
        if pnpm:
            subprocess.run([manager, "import"], cwd=native, env=environment, check=True)
            subprocess.run([manager, "install", "--frozen-lockfile"], cwd=native, env=environment, check=True)
        else:
            subprocess.run([manager, "ci"], cwd=native, env=environment, check=True)
        subprocess.run([sys.executable, "-m", "unittest", "discover", "-s", "tests", "-p", "test_wordpress_deploy.py"], cwd=native, env=environment, check=True)
        for task in ["typecheck", "lint", "test", "build"]:
            subprocess.run([manager, "run", task], cwd=native, env=build_environment if task == "build" else environment, check=True)
        subprocess.run([sys.executable, str(native / "scripts/package-wordpress.py"), "--output", str(output)], cwd=native, env=environment, check=True)
    output.chmod(0o600)
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-dir", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--node", help="Node executable, if not available through PATH.")
    parser.add_argument("--pnpm", help="Use this pnpm executable and import the existing npm lockfile in the temporary build copy.")
    parser.add_argument("--package", type=Path, help="Deploy an already built ZIP instead of rebuilding.")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Build/validate only; no WordPress login or changes.")
    mode.add_argument("--verify-only", action="store_true", help="Verify a package against the public site; no changes.")
    mode.add_argument("--preflight", action="store_true", help="Authenticate and check access without installing or backing up.")
    parser.add_argument("--backup-timeout", type=int, default=600)
    args = parser.parse_args()
    if args.verify_only and not args.package:
        parser.error("--verify-only requires --package")
    site = args.site_dir.resolve()
    output = site / ".wordpress-deploy/foglie-bio-preview.zip"
    if not args.package:
        output.parent.mkdir(parents=True, exist_ok=True)
        package = build(site, output, args.node, args.pnpm)
    else:
        package = args.package.resolve()
    files = validate_package(package)
    print("Validated dedicated IT/EN sandbox package. SHA256: " + hashlib.sha256(package.read_bytes()).hexdigest(), flush=True)
    if args.dry_run:
        print("Dry run complete. No WordPress requests or changes were made.")
        return
    original_title = company_homepage()
    if args.verify_only:
        verify(files, original_title)
        return
    client = Client()
    form = client.login()
    if args.preflight:
        client.preflight()
        return
    backup = client.backup(args.backup_timeout)
    print(f"Deploying to {BASE}{PAGE_BASE} (restore snapshot: {backup})", flush=True)
    client.upload(form, package)
    client.clear_cache()
    verify(files, original_title)
    print("Deployment complete. To roll back, rerun with a previous package or use the protected UpdraftPlus plugin snapshot.")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError, OSError, subprocess.CalledProcessError, zipfile.BadZipFile) as error:
        print("Deployment stopped: " + str(error), file=sys.stderr)
        sys.exit(1)
