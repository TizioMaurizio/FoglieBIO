"""Verify the product adapter never takes over the company's homepage."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

parser = argparse.ArgumentParser()
parser.add_argument("--php", default="php")
args = parser.parse_args()
adapter = Path(__file__).with_name("foglie-bio-preview.php")

with tempfile.TemporaryDirectory(prefix="foglie-routing-") as temporary:
    root = Path(temporary)
    plugin = root / adapter.name
    shutil.copy2(adapter, plugin)
    for page in ("index.html", "en/index.html", "privacy.html", "terms.html", "cookies.html", "en/privacy.html", "en/terms.html", "en/cookies.html"):
        file = root / "site" / page
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text("PRODUCT:" + page)
    harness = root / "harness.php"
    harness.write_text('''<?php
const ABSPATH = __DIR__;
function add_action($name, $callback, $priority) { $GLOBALS['callback']=$callback; }
function is_admin() { return (bool)($GLOBALS['test']['admin'] ?? false); }
function is_feed() { return (bool)($GLOBALS['test']['feed'] ?? false); }
function is_trackback() { return false; }
function wp_parse_url($url,$component) { return parse_url($url,$component); }
function status_header($status) { fwrite(STDERR,"STATUS=$status"); }
function nocache_headers() {}
$GLOBALS['test']=json_decode($argv[2],true);
$_SERVER['REQUEST_URI']=$GLOBALS['test']['path'];
$_SERVER['REQUEST_METHOD']=$GLOBALS['test']['method'] ?? 'GET';
$_GET=$GLOBALS['test']['query'] ?? [];
require $argv[1];
$GLOBALS['callback']();
echo 'WORDPRESS_FALLBACK';
''')

    def request(settings):
        return subprocess.run([args.php, "-n", str(harness), str(plugin), json.dumps(settings)], capture_output=True, text=True, check=True)

    for path, page in [
        ("/foglie-bio-plus", "index.html"),
        ("/foglie-bio-plus/", "index.html"),
        ("/foglie-bio-plus/en/", "en/index.html"),
        *[("/foglie-bio-plus/" + p, p) for p in ["privacy.html", "terms.html", "cookies.html", "en/privacy.html", "en/terms.html", "en/cookies.html"]],
    ]:
        result = request({"path": path})
        assert result.stdout == "PRODUCT:" + page and result.stderr == "STATUS=200", path

    for settings in [
        *[{"path": p} for p in ["/", "/en/", "/privacy.html", "/terms.html", "/cookies.html", "/privacy-policy/", "/wp-admin/", "/foglie-bio-plus-extra/", "/foglie-bio-plus/../../etc/passwd"]],
        {"path": "/foglie-bio-plus/", "method": "POST"},
        {"path": "/foglie-bio-plus/", "query": {"preview": "true"}},
        {"path": "/foglie-bio-plus/", "admin": True},
        {"path": "/foglie-bio-plus/", "feed": True},
    ]:
        result = request(settings)
        assert result.stdout == "WORDPRESS_FALLBACK" and not result.stderr, settings

    result = request({"path": "/foglie-bio-plus/en/", "method": "HEAD"})
    assert not result.stdout and result.stderr == "STATUS=200"
    (root / "site/index.html").unlink()
    result = request({"path": "/foglie-bio-plus/"})
    assert result.stdout == "WORDPRESS_FALLBACK" and not result.stderr

print("Passed 24 product-route, company-homepage protection, fallback and HEAD checks.")
