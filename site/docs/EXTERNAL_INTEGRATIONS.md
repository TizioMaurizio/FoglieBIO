# External integrations

All commerce is **MOCKED**. No live credential or provider is initialized. The interface is demonstrable; order fulfillment is not implemented. No contact form was added: the verified public contact address is available as a mailto link.

| Feature                      | Status / current implementation                  | Future service                                  | Connection point                                                          | Required configuration                                                                   | UI impact                                                                              |
| ---------------------------- | ------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Payment                      | MOCKED: MockPaymentProvider                      | Stripe / PayPal / commerce platform             | PaymentProvider in `src/services/contracts.ts`; factory in `providers.ts` | Backend secret keys, webhook secrets, public client IDs; approved product IDs and prices | Keep summary/forms; replace method mock with provider-owned secure widgets or redirect |
| Shipping                     | MOCKED: MockShippingProvider                     | Fulfillment/carrier API                         | ShippingProvider.quote                                                    | Server credentials, origin, countries, VAT and rates                                     | Requote address/cart changes; no layout rebuild                                        |
| Inventory                    | MOCKED: available, no scarcity text              | Commerce backend                                | InventoryProvider.getStatus                                               | Stock source, SKU mapping                                                                | Existing entry guard; enforce server-side at order time                                |
| Newsletter                   | MOCKED: MockEmailProvider                        | Brevo / Klaviyo / Mailchimp                     | EmailProvider.subscribe                                                   | Backend API key, audience/list ID, approved consent text                                 | Add authoritative success, double opt-in flow, errors                                  |
| Reviews                      | READY TO WIRE: LocalReviewsProvider returns []   | Verified review platform                        | ReviewsProvider.list and Reviews component                                | Account, product mapping, moderation policy                                              | Existing component hidden while empty                                                  |
| Analytics                    | MOCKED: no-op MockAnalyticsProvider              | GA4 / Google Ads / Meta                         | AnalyticsProvider.trackEvent                                              | Provider IDs, CMP gate, server CAPI token only on backend                                | None to core layout                                                                    |
| Consent                      | READY TO WIRE: no trackers or stored preferences | CMP                                             | Gate live analytics initialization centrally                              | Regional consent policy, approved privacy/cookie text                                    | Add real preference controls when tracking exists                                      |
| Orders / emails              | BLOCKED BY BUSINESS DECISION                     | Backend, commerce platform, transactional email | Live payment webhook + idempotent order service                           | Tax, inventory, order model, approved templates, support                                 | Real confirmation/reference after server confirmation                                  |
| Subscriptions / reorder      | BLOCKED BY BUSINESS DECISION; disabled           | Chosen commerce platform                        | PurchaseOption.kind + subscriptionsEnabled                                | Approved duration, quantity, price, cancellation and renewal terms                       | Activate structured options only after approval                                        |
| Customer account / CRM / CMS | Not implemented                                  | Platform to be selected                         | Add adapters only when required                                           | NEEDS CREDENTIALS and data model                                                         | Optional future scope                                                                  |

## Provider behavior and launch safeguards

Modes are centralized in `src/config/integrations.ts`. Live selection fails closed until adapters are registered. Unknown public price, ingredients, dosage, storage and certification remain null. Mock rates are explicitly named `demoUnitPriceCents` and `demoShippingCents`. They must never be reused as production defaults. All totals use integer cents.

Production must validate SKU, enabled offer, quantity, price, country, tax, shipping and stock on a trusted backend. Stripe Checkout sessions should be created there; confirm fulfillment from a verified webhook with idempotency, not a client success page. PayPal orders should also be created and captured server-side with webhook reconciliation. Apple Pay/Google Pay availability must be checked through the selected payment provider. Live confirmation and legal consent semantics need adaptation; a flag alone is intentionally insufficient.

Newsletter/contact credentials must remain server-side. Add abuse protection, server validation, consent evidence and the chosen opt-in policy before collecting addresses. Customer data must not enter analytics payloads or logs. In the demo, forms use volatile component state only and do not call fetch or storage APIs.

## Event map

Prepared events: page_view, view_item (product enters viewport), select_product, add_to_cart, begin_checkout, purchase, newsletter_signup, faq_open, story_view, cta_click. Commerce payloads support product_id, product_name, quantity, price and currency EUR. Sources distinguish navigation, product and final CTA. Demo events carry `simulated: true` where applicable and the adapter does nothing.

The live adapter **must discard simulated events**. Map product fields to GA4 `items` and Meta `content_ids`; generate one stable server order/event ID and deduplicate Pixel/CAPI. Emit real purchase only after confirmed payment; avoid firing once per render or return-page reload. Do not use health information for audience segmentation. Initialize analytics only after required CMP consent. Search Console requires domain verification. Merchant Center requires verified price, stock, shipping and complete commerce/legal data; the current no-offer demo is unsuitable for a product feed.

## Economics model to populate later

Required inputs: ex-VAT revenue, VAT rate, product cost, packaging, shipping charged and actual shipping, payment fees, discounts, returns, repeat purchase cadence. Contribution before marketing = ex-VAT revenue − variable costs; first-order break-even CAC equals that contribution. Define ROAS on the same revenue basis as the ad platform. AOV and LTV remain unknown; no inferred forecasts or one-month supply are shown.

## Antonio / business checklist

- Final VAT-inclusive retail price and approved offers.
- Current full label, 1 L format confirmation, ingredient order/allergens, dosage, storage and shelf life after opening.
- Actual packaging material; DOCX says glass but the photographed material is not independently verified.
- Farm identity/location, processing lab/location, producer/distributor responsibilities.
- Current organic certificate and whether this exact product/SKU is in scope.
- Shipping rates/countries/times, stock process, tax and returns rules.
- Confirm published company details and support address; approved privacy, cookies and sales conditions.
- Payment/commerce/email providers; real reviews and consent to publish them.
- Final legal review of label, landing and intended ad creative before live launch.

## GitHub Pages hosting

The frontend is served publicly at https://tiziomaurizio.github.io/FoglieBIO/ without authentication. GitHub Pages is static hosting: future live providers must use a separate backend or a hosted checkout. Never put payment/email secrets in frontend code or GitHub Pages assets. Publishing does not turn the existing mock providers into live services.
