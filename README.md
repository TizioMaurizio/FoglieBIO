# Foglie Bio Plus

Public site: **https://tiziomaurizio.github.io/FoglieBIO/**. No ChatGPT account or authentication is required.

The maintained React application is in [`site/`](site/README.md). The repository root owns Git history and the `origin` remote (`TizioMaurizio/FoglieBIO`); `site/` is an ordinary source directory, not a nested repository or submodule.

```sh
cd site
npm ci
npm run dev
```

Use Node 22+. Push changes to `main` to trigger `.github/workflows/pages.yml`: validation, a prerendered static build, then GitHub Pages deployment. Pages must use **GitHub Actions** as its source. Only `site/dist` is uploaded; local source documents, development tools and credentials are excluded.

This repository contains the current site only. Its source, assets, tests and documentation live in `site/`.

Payments, checkout, newsletter and shipping remain demonstrations. See the [integration plan](site/docs/EXTERNAL_INTEGRATIONS.md) before enabling real commerce.
