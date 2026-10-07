import importlib.util
import io
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import zipfile

spec = importlib.util.spec_from_file_location("deploy_wordpress", Path(__file__).resolve().parents[1] / "scripts/deploy-wordpress.py")
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)


class DeploymentTests(unittest.TestCase):
    def package(self, directory, **changes):
        adapter = b"<?php $routes = array('/foglie-bio-plus' => 'index.html');"
        files = {"foglie-bio-preview/foglie-bio-preview.php": adapter}
        for page in deploy.PAGES:
            files["foglie-bio-preview/site/" + page] = (f'<meta name="robots" content="noindex,nofollow"><link href="{deploy.BASE}{deploy.PAGE_BASE}"><link href="{deploy.ASSETS}assets/site.css">').encode()
        files.update(changes)
        package = Path(directory) / "preview.zip"
        with zipfile.ZipFile(package, "w") as output:
            for name, data in files.items():
                output.writestr(name, data)
        return package

    def test_accepts_complete_product_package(self):
        with tempfile.TemporaryDirectory() as directory:
            self.assertEqual(len(deploy.validate_package(self.package(directory))), 9)

    def test_rejects_company_homepage_takeover(self):
        with tempfile.TemporaryDirectory() as directory:
            package = self.package(directory, **{"foglie-bio-preview/foglie-bio-preview.php": b"<?php $routes = array('/foglie-bio-plus' => 'index.html', '/' => 'index.html');"})
            with self.assertRaisesRegex(RuntimeError, "homepage"):
                deploy.validate_package(package)

    def test_rejects_foreign_plugin_and_traversal(self):
        for name in ["another-plugin/run.php", "foglie-bio-preview/../../run.php", "/foglie-bio-preview/site/x"]:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as directory:
                with self.assertRaisesRegex(RuntimeError, "outside"):
                    deploy.validate_package(self.package(directory, **{name: b"x"}))

    def test_rejects_live_checkout(self):
        with tempfile.TemporaryDirectory() as directory:
            package = self.package(directory, **{"foglie-bio-preview/site/assets/site.js": b"https://buy.stripe.com/livecheckout"})
            with self.assertRaisesRegex(RuntimeError, "sandbox"):
                deploy.validate_package(package)

    def test_rejects_secret_key(self):
        with tempfile.TemporaryDirectory() as directory:
            package = self.package(directory, **{"foglie-bio-preview/site/assets/site.js": b"sk_test_" + b"A" * 20})
            with self.assertRaisesRegex(RuntimeError, "credential"):
                deploy.validate_package(package)

    def test_rejects_duplicate_and_symlink(self):
        for symlink in [False, True]:
            with self.subTest(symlink=symlink), tempfile.TemporaryDirectory() as directory:
                package = self.package(directory)
                with zipfile.ZipFile(package, "a") as output:
                    if symlink:
                        info = zipfile.ZipInfo("foglie-bio-preview/site/link")
                        info.external_attr = 0o120777 << 16
                        output.writestr(info, "outside")
                    else:
                        with patch("warnings.warn"):
                            output.writestr("foglie-bio-preview/site/index.html", "duplicate")
                with self.assertRaisesRegex(RuntimeError, "Duplicate"):
                    deploy.validate_package(package)

    def test_refuses_insecure_and_foreign_redirects(self):
        for url in ["http://www.laruotabio.it/", "https://example.com/", "https://www.laruotabio.it:8443/", "https://user:password@www.laruotabio.it/"]:
            with self.subTest(url=url), self.assertRaises(RuntimeError):
                deploy.same_site(url)

    def test_upload_form_preserves_nonce_and_target(self):
        page = deploy.Page('<form action="/wp-admin/update.php?action=upload-plugin"><input type="hidden" name="_wpnonce" value="test"><input type="file" name="pluginzip"></form>')
        self.assertEqual(page.forms[0]["fields"]["_wpnonce"], "test")
        self.assertEqual(page.forms[0]["files"], ["pluginzip"])

    def test_existing_plugin_replacement_and_activation(self):
        client = deploy.Client()
        replacement = '<a href="update.php?action=upload-plugin&amp;overwrite=update-plugin&amp;package=123&amp;_wpnonce=test">Replace</a>'
        inactive = '<a href="plugins.php?action=activate&amp;plugin=foglie-bio-preview%2Ffoglie-bio-preview.php&amp;_wpnonce=test">Activate</a>'
        active = '<a href="plugins.php?action=deactivate&amp;plugin=foglie-bio-preview%2Ffoglie-bio-preview.php&amp;_wpnonce=test">Deactivate</a>'
        with tempfile.TemporaryDirectory() as directory, patch.object(client, "request", side_effect=[replacement, "Plugin updated successfully.", inactive, "Plugin activated", active]) as request, patch("sys.stdout", io.StringIO()):
            client.upload({"action": "update.php?action=upload-plugin", "fields": {"_wpnonce": "test"}}, self.package(directory))
        self.assertTrue(request.call_args_list[0].args[0].startswith(deploy.BASE + "/wp-admin/update.php"))
        self.assertIn("/wp-admin/update.php?", request.call_args_list[1].args[0])
        self.assertIn("/wp-admin/plugins.php?", request.call_args_list[3].args[0])

    def test_failed_installation_is_not_accepted(self):
        client = deploy.Client()
        with tempfile.TemporaryDirectory() as directory, patch.object(client, "request", return_value="Installation failed"):
            with self.assertRaisesRegex(RuntimeError, "successful installation"):
                client.upload({"action": "/wp-admin/update.php?action=upload-plugin", "fields": {}}, self.package(directory))

    def test_backup_is_protected_and_plugin_only(self):
        client = deploy.Client()
        calls = []

        def request(path, data=None, content_type=None):
            calls.append((path, data))
            if data is None:
                return "var updraft_credentialtest_nonce = 'test';"
            if data["subaction"] == "backupnow":
                return '{"nonce":"123456abcdef"}'
            return '{"nonce":"123456abcdef","log":"The backup succeeded and is now complete"}'

        with patch.object(client, "request", side_effect=request), patch("sys.stdout", io.StringIO()):
            self.assertEqual(client.backup(10), "123456abcdef")
        params = calls[1][1]
        self.assertEqual(params["onlythisfileentity"], "plugins")
        self.assertEqual(params["always_keep"], 1)
        self.assertEqual(params["backupnow_nocloud"], 1)

    def test_backup_failure_prevents_upload(self):
        with tempfile.TemporaryDirectory() as directory:
            package = self.package(directory)
            with patch("sys.argv", ["deploy", "--package", str(package)]), patch.object(deploy, "company_homepage", return_value=b"La Ruota Bio"), patch.object(deploy, "Client") as client, patch("sys.stdout", io.StringIO()):
                client.return_value.backup.side_effect = RuntimeError("Backup failed")
                with self.assertRaisesRegex(RuntimeError, "Backup failed"):
                    deploy.main()
                client.return_value.upload.assert_not_called()

    def test_cache_requires_confirmed_success(self):
        for response in ['{"type":"success","code":200}', '{"type":"error","code":404}']:
            client = deploy.Client()
            with patch.object(client, "request", side_effect=['{"ahsc_nonce":"test"}', response]), patch("sys.stdout", io.StringIO()):
                if "404" in response:
                    with self.assertRaises(RuntimeError):
                        client.clear_cache()
                else:
                    client.clear_cache()


if __name__ == "__main__":
    unittest.main()
