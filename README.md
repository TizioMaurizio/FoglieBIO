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

The full product presentation is available in Italian and English: hero, organic information, olive-leaf composition, farm photography, Antonio's story and timeline, followed by Antonio's single-bottle / three-bottle 8% offer. Stripe **sandbox** checkout supports EU27 plus Switzerland. The newsletter demo remains removed and no real fulfillment is enabled. See the [test guide](site/docs/STRIPE_TEST_CHECKOUT.md), [promotion plan](site/docs/PROMOTION_PLAN.md) and [Antonio call checklist](site/docs/ANTONIO_CALL_CHECKLIST.md). The GitHub Pages workflow publishes the test preview after a push to main.
