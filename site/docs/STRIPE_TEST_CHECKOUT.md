# Single / three-bottle checkout — EU27 + Switzerland

Updated 5 October 2026. The site implements Antonio’s price proposal and the user-requested Swiss preparation in the sandbox. A push to main publishes the preview through GitHub Pages; live payments remain disabled.

## Open the preview

- Italian: http://127.0.0.1:4173/FoglieBIO/
- English: http://127.0.0.1:4173/FoglieBIO/en/

Refresh an already-open page to load the new offers. Build with `npm run build`; serve with `node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort`.

The flow is website → choose 1 or 3 bottles → synthetic-data guide → localized Stripe checkout in a new tab → hosted TEST confirmation. Closing Stripe returns to the original site tab. The website does not infer payment success from a URL or opening checkout.

## Current offers and links

| Offer | Product total | Test total with EUR 5.90 shipping | Italian | English |
| --- | ---: | ---: | --- | --- |
| 1 bottle | EUR 42.50 | EUR 48.40 | [IT test](https://buy.stripe.com/test_cNifZjfgN1sA7fb5EVeME0k?locale=it) | [EN test](https://buy.stripe.com/test_4gM14pecJ8V2czvaZfeME0l?locale=en) |
| 3 bottles, immediate 8% saving | EUR 117.30 | EUR 123.20 | [IT test](https://buy.stripe.com/test_dRm3cx8Spefm2YV2sJeME0m?locale=it) | [EN test](https://buy.stripe.com/test_fZu14p3y5dbi8jfc3jeME0n?locale=en) |

The three-bottle unit price is EUR 39.10. Saving EUR 10.20 compared with three singles is built into a fixed pack price, without additional coupons or minimum-spend tests. One pack per Checkout Session prevents a quantity change from misapplying the deal. No repeat-order loyalty check is activated.

Account: La Ruota Bio sandbox, `acct_1UMmrrPxSGPkPPdA`. All resource IDs and base URLs are in `src/config/stripe-test.json` version 3. Public resource IDs/links are not credentials. All four links were verified through the CLI as active and `livemode=false`.

## Geography, collection and methods

Allowed delivery country codes: AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, **CH**.

Switzerland is an additional non-EU market. UK, Norway and other countries are not silently enabled. This address selector is test configuration only; country-specific product, tax and shipping readiness still needs validation.

Base currency EUR. The EUR 5.90 shipping rate is fictional, with separate Italian/English labels. Automatic tax and fiscal invoice creation are off; no Swiss import charges are calculated. The checkout notices explicitly state this.

Cards and Satispay are the explicit payment methods. Eligible Apple Pay/Google Pay remain enabled through Stripe. Email, delivery name/address and phone are collected on Stripe, and billing details when Stripe requires them. No personal information is collected by the website.

Branding remains Foglie Bio green #5A783C. Website and checkout copy use the selected IT/EN language. Production receipt and support configuration still needs its own validation.

## Manual acceptance checks

Use fictional details only: `demo@example.com`, Test Customer, a clearly fictional address in the chosen country, and a fictional phone such as `+1 202 555 0100` with the +1 prefix. The drawer supplies an Italian address example; enter a matching Swiss example when testing Switzerland.

1. Check IT/EN pages show only one and three bottles, with the totals above.
2. Choose three bottles and confirm EUR 117.30 product total / EUR 123.20 test total; the 8% saving applies without a previous order or code.
3. Verify Switzerland and EU destinations can be selected, and that UK/Norway cannot.
4. Complete a test card payment with `4242 4242 4242 4242`, expiry `12/34`, CVC `123`. Expect the localized TEST confirmation.
5. Test decline/retry with `4000 0000 0000 0002`, then 3DS, Satispay cancellation and compatible-device wallets.
6. Check abandonment, return to the site, keyboard/mobile usability and policy links.

Report the offer/language used and completion to the implementing agent for read-only CLI verification. Do not paste personal details or credentials. No new browser payment has been presumed completed for this version.

## Read-only verification

Run `./scripts/verify-stripe-test.ps1` from site/. It verifies account, amounts, products, non-adjustable packs, countries, shipping, methods and confirmation metadata. It makes no changes.

The original full-price two-bottle flow previously completed a EUR 85.90 sandbox payment and was verified complete/paid with `livemode=false`. That history is retained; it is not evidence that the current Swiss or three-bottle flows have been browser-tested. Superseded quantity/pack links are deactivated after replacement verification.

See [the updated offer and loyalty interpretation](PROMOTION_PLAN.md) and [Antonio call checklist](ANTONIO_CALL_CHECKLIST.md).
