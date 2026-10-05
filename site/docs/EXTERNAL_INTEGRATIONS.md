# Current external integrations

The active site combines the restored original product presentation with the bilingual shop preview. Real customer sales are not enabled.

| Feature | Current state | Before live sales |
| --- | --- | --- |
| Checkout | 4 Stripe sandbox links: 1/3 bottles × IT/EN | Tax/shipping completion, account activation, live configuration |
| Promotions | Antonio's EUR 42.50 base; 3 bottles at EUR 117.30 with immediate 8% saving | Final tax treatment, truthful price presentation; no loyalty stacking |
| Europe + Switzerland | EU27 + CH shipping-address selector in all links | Country-specific product/label, VAT, Swiss import/clearance and carrier checks |
| Shipping | Fictional EUR 5.90 test rate, localized names | Real pack/weight/country rates and delivery commitments |
| Taxes/invoices | Unconfigured; no automatic tax or fiscal invoice | Accountant's classification, registrations/OSS and invoicing process |
| Branding | Official logo; Foglie Bio green #5A783C | Confirm production business/support identity |
| Language | IT/EN storefront, checkout messages and policy-preview pages | Approved product translations and locally required food-information languages |
| Orders/stock | No real fulfillment or stock claim | Documented manual process or verified webhook/order system |
| Newsletter, reviews, account, analytics | Removed from active storefront/not activated | Optional future scope |
| Legal/privacy | Clearly labelled bilingual preview information | Approved commercial policies and actual processor/data flows |

The storefront uses only public URLs and resource IDs. Stripe CLI authentication remains in the user's normal configuration outside Git; no frontend secret or Stripe SDK is needed. The original hero, organic, farm, founder, timeline and composition sections are active again in Italian and English. Story events remain no-ops; no analytics service is enabled. The old mock purchase, stock, newsletter and reviews flows remain unused.

For automated fulfillment, verify Stripe webhook signatures, check authoritative payment/amount data and make processing idempotent. A client page or URL cannot prove payment. A controlled manual Dashboard workflow is also an option for an initial release if the business can reliably process orders and stock.

No field claiming “one month per bottle” or guaranteed duration is added: monthly purchasing is a planning assumption. No recurring payments, campaign, reminders or email subscriptions were activated.

The GitHub Pages workflow publishes the sandbox preview after a push to main. Its [usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) restrict ecommerce hosting, so choose a suitable production host/domain plan before accepting real sales.

Detailed sources, test instructions and decisions: [checkout guide](STRIPE_TEST_CHECKOUT.md), [promotion plan](PROMOTION_PLAN.md), [owner vs autonomous checklist](ANTONIO_CALL_CHECKLIST.md), [product evidence](CONTENT_AND_CLAIMS_REVIEW.md).
