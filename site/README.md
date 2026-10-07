# Foglie Bio Plus — product presentation and shop preview

React 19, TypeScript and Vite static site. The original hero, feature panels, organic section, olive-leaf information, farm/process story, Antonio's portrait/timeline and composition section are restored, including English equivalents. They lead into the updated pack choice, product details, FAQ, support and localized preview policies. The newsletter demo remains removed. Original photography, organic branding and Foglie Bio green are preserved.

## Run and verify

Requires Node 22+:

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort
```

Built preview routes:

- Italian: http://127.0.0.1:4173/FoglieBIO/
- English: http://127.0.0.1:4173/FoglieBIO/en/
- Privacy, terms and cookies: matching `privacy.html`, `terms.html`, `cookies.html` in both directories.

The build prerenders both language pages with matching HTML language, metadata, canonical and hreflang links. Each policy page is standalone and script-free. All eight pages retain noindex/nofollow because commercial details remain unapproved. Language choice uses ordinary links, without cookies/local storage.

## Stripe sandbox and offer proposals

Two choices implement Antonio's proposal: one bottle at EUR 42.50, or three bottles at EUR 117.30 (8% off, EUR 39.10 each). The saving applies immediately, including on the first order, without coupons, stacking or a EUR 50 gate. The original EUR 5.90 shipping fixture is explicitly fictional, not a delivery quote.

`src/config/stripe-test.json` is the authoritative public sandbox manifest. Version 3 contains four links: each offer has Italian and English custom messages/shipping names. `getStripeTestCheckoutUrl()` enforces the test Stripe domain and appends the selected locale. Pack quantity is fixed on Stripe to prevent quantity changes from misapplying bulk pricing. Choose another pack on the site.

EU27 plus Switzerland address collection is configured, as selected by the user. Cards, eligible wallets and Satispay are available through Stripe. Country readiness, real VAT/OSS, Swiss imports/tax/clearance, shipping rates and live account verification remain open. English content does not establish product/label eligibility in each market. Prices are based in EUR; no CHF amount was invented.

No recurring billing, mailing list, marketing automation, account creation or analytics is active. One bottle purchased per month is an internal planning hypothesis, not product dosage or a claim of bottle duration.

Run `./scripts/verify-stripe-test.ps1` from PowerShell for read-only verification of the sandbox account, two product prices, four fixed-pack links, EU27 plus CH, localized shipping, methods and hosted confirmation. The historical network loyalty proposal is documented separately in the promotion plan; no customer-history programme is active.

## Public repository and deployment

Only public test URLs and resource IDs are committed as configuration; no secret keys, CLI credentials, customer exports or webhook secrets belong in the repo. The build checks for common credential patterns and non-test Stripe URLs. The frontend needs no Stripe SDK or backend credential.

The existing GitHub Pages workflow publishes this sandbox preview on a push to main; only dist is uploaded. Publishing the preview does not enable live payments. Select appropriate ecommerce hosting for the live shop, since GitHub Pages restricts commercial ecommerce hosting.

The same preview can be packaged for the existing WordPress hosting at `www.laruotabio.it/foglie-bio-plus/`, preserving La Ruota Bio's homepage. See [WordPress deployment and rollback](wordpress/README.md). Build-time asset/page bases and site URL preserve the default GitHub Pages target while supporting dedicated IT/EN product routes.

## Maintained entry points

| Path | Purpose |
| --- | --- |
| `src/components/LandingPage.tsx` | Original presentation, current offers and footer |
| `src/sections/Presentation.tsx`, `EnglishPresentation.tsx` | Original section sequence and English counterparts |
| `src/components/CheckoutDrawer.tsx` | Pack summary and safe test handoff |
| `src/data/shopCopy.ts`, `policies.ts` | Full Italian/English copy |
| `src/services/stripeTest.ts` | Fixed-pack and locale validation |
| `src/config/stripe-test.json` | Public test resources |
| `src/styles/shop.css` | Responsive storefront layout |
| `scripts/prerender.mjs` | Both store pages and six policy pages |
| `docs/PROMOTION_PLAN.md` | Proposed discount and repeat-purchase strategy |
| `docs/ANTONIO_CALL_CHECKLIST.md` | Autonomous work vs owner approvals |

Original Italian presentation components are active again. Their existing no-op story/carousel behavior remains; no tracking service is enabled. English counterparts preserve the same sections, images and factual scope. Legacy newsletter and mock purchase components remain unmounted; the real preview purchase path uses only the current Stripe sandbox links.

See [test instructions](docs/STRIPE_TEST_CHECKOUT.md), [promotion plan](docs/PROMOTION_PLAN.md), [call checklist](docs/ANTONIO_CALL_CHECKLIST.md) and [product/content evidence](docs/CONTENT_AND_CLAIMS_REVIEW.md).
