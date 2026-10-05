# Foglie Bio Plus — focused shop preview

React 19, TypeScript and Vite static storefront. Product, pack choice, essential product information, purchase FAQ, support and localized preview policies. The newsletter demo, long editorial story/timeline and unused reviews are no longer rendered. Original photography, organic branding and Foglie Bio green remain.

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

## Maintained entry points

| Path | Purpose |
| --- | --- |
| `src/components/LandingPage.tsx` | Focused store and footer |
| `src/components/CheckoutDrawer.tsx` | Pack summary and safe test handoff |
| `src/data/shopCopy.ts`, `policies.ts` | Full Italian/English copy |
| `src/services/stripeTest.ts` | Fixed-pack and locale validation |
| `src/config/stripe-test.json` | Public test resources |
| `src/styles/shop.css` | Responsive storefront layout |
| `scripts/prerender.mjs` | Both store pages and six policy pages |
| `docs/PROMOTION_PLAN.md` | Proposed discount and repeat-purchase strategy |
| `docs/ANTONIO_CALL_CHECKLIST.md` | Autonomous work vs owner approvals |

Earlier editorial components, research and mock-provider classes remain as unmounted source/reference material; they are not the active purchase flow. The active page imports no newsletter, review service, fake stock provider or analytics provider.

See [test instructions](docs/STRIPE_TEST_CHECKOUT.md), [promotion plan](docs/PROMOTION_PLAN.md), [call checklist](docs/ANTONIO_CALL_CHECKLIST.md) and [product/content evidence](docs/CONTENT_AND_CLAIMS_REVIEW.md).
