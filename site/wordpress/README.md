# WordPress deployment at La Ruota Bio

This package serves the existing bilingual **sandbox preview** through the current WordPress hosting. It does not activate live payments. The full presentation, one-/three-bottle offers, test shipping and preview policies are retained.

## Build on Linux

Install the existing package-lock dependencies in a Linux checkout with Node >=22.13.0. Keep the Windows node_modules separate: its native dependencies do not work on Linux.

From site/:

```sh
npm ci
npm run typecheck
npm run lint
npm test
python3 wordpress/check-routing.py
VITE_ASSET_BASE=/wp-content/plugins/foglie-bio-preview/site/ VITE_PAGE_BASE=/foglie-bio-plus/ VITE_SITE_URL=https://www.laruotabio.it/foglie-bio-plus/ npm run build
python3 scripts/package-wordpress.py --output /absolute/path/foglie-bio-preview-wordpress.zip
```

The asset base points to the installed plugin; the page base scopes both languages and all six preview policies to /foglie-bio-plus/. The company homepage stays under the original WordPress theme. Canonical and language metadata use www.laruotabio.it. Running the normal build without these variables still produces the GitHub Pages target.

## Install or update

### Manual CLI deployment

From site/, run `python3 scripts/deploy-wordpress.py --dry-run` to prepare and validate a package, then `python3 scripts/deploy-wordpress.py` when ready to publish. Node >=22.13.0 with npm is required for building; `--node` and `--pnpm` also support an explicitly selected Node/pnpm runtime. The script installs native dependencies in a temporary copy, preserving an existing Windows node_modules directory.

The script prompts for WordPress credentials and keeps its session in memory. It waits for a protected **plugins-only UpdraftPlus snapshot** before replacing the product plugin, checks activation, clears Aruba cache, and compares all eight product pages/assets with the uploaded package. It verifies that the company homepage retains its original title and is not handled by the preview plugin. These plugin snapshots are protected from scheduled retention; remove old ones manually in WordPress only when no longer needed.

Useful controls:

```sh
# Authenticate and check access without uploading or creating a backup:
python3 scripts/deploy-wordpress.py --package /absolute/path/preview.zip --preflight
# Verify an existing package against the public site, without authentication:
python3 scripts/deploy-wordpress.py --package /absolute/path/preview.zip --verify-only
# Deploy a saved package, including a previous version for rollback:
python3 scripts/deploy-wordpress.py --package /absolute/path/previous-preview.zip
```

An existing ZIP needs only Python 3. If backup, authentication, activation, cache clearing or verification fails, the script stops and reports the stage; after an upload failure, inspect the site and restore the protected plugin snapshot through UpdraftPlus if needed. It does not automatically restore an older site after a failed verification. WordPress core, themes, database, other plugins and DNS are not deployed by the script. It currently accepts only the dedicated sandbox preview.

Git pushes continue to publish only the existing GitHub Pages preview. WordPress updates happen only when this deployment script is run. No GitHub secrets, SSH access, webhooks or automatic synchronization are required.

### WordPress admin alternative

Use WordPress admin → Plugins → Add Plugin → Upload Plugin. Upload the ZIP and activate **Foglie Bio Plus — Anteprima bilingue**. Updates use the same plugin directory and WordPress's replacement workflow; preserve the previous ZIP for rollback. Only the public built assets and the PHP route adapter are packaged. No Node runtime is required on the host.

Check all eight documents return HTTP 200, assets load, language switching works, the drawer opens with both offers and all four payment links are sandbox links. A successful website deployment does not establish Stripe checkout acceptance or readiness for customer sales.

The route adapter serves only /foglie-bio-plus/, /foglie-bio-plus/en/, and their six preview policy paths. The existing theme, WordPress pages, database, admin and API remain available. Deactivate this plugin to restore the previous WordPress product page, then clear the site's cache if an old page persists. No DNS change is required.

Pages retain noindex/nofollow and return X-Foglie-Preview: 1.0.1. Host/plugin caches may need clearing after activation or rollback. Existing WordPress paths such as /privacy-policy/ remain under the original theme.

## Deployment scope

Version 1.0.1 serves only the dedicated product subtree. La Ruota Bio's homepage, root /en/ route and root policy paths are not intercepted. The prior WordPress product page remains in the database and is restored by deactivating this plugin.

The official **Aruba HiSpeed Cache 3.1.0** plugin, obtained from the WordPress plugin directory, manages the existing host cache. Use its **Cancella cache** control after deployment or rollback when necessary. Verify normal anonymous requests, without cache-bypass headers, before reporting publication complete.

No Stripe payment has been completed during deployment; current checkout acceptance remains a separate task.

Version 1.0.1 was published on 7 October 2026. Anonymous requests verified all eight product-subtree documents and 25 assets against the uploaded bundle. The www and bare-domain homepage and existing /privacy-policy/ page returned their original WordPress content. PHP syntax and 24 route/fallback checks passed, including explicit protection of the company homepage.

## Credentials

Sign in directly through the administration browser. Do not add passwords, application passwords, session cookies or hosting credentials to source, build output or deployment documentation. This adapter creates no authentication endpoint or persistent deployment credential.

## La Ruota Bio navigation

The product header includes a button with the official La Ruota Bio logo linking to the company homepage in the same tab. Its accessible name is localized in Italian and English. The logo is bundled locally from the image used on the official company homepage:
https://www.laruotabio.it/wp-content/uploads/2023/05/LOGO-LA-RUOTA-BIO-SRL-laruotabio22-logo-012375-e1686235214896-300x139.jpg
