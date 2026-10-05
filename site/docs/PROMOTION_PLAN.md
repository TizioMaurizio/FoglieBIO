# Antonio’s offer — simplified implementation

Updated 5 October 2026 from Antonio’s message supplied by the user. Replaces the former EUR 40 base and 2/4/6-bottle 5/10/15% proposal. Still sandbox only: this is not authorization to activate real payments.

## Two choices, one discount

| Offer | Product amount | Per bottle | Saving vs singles | Total including fictional EUR 5.90 shipping |
| --- | ---: | ---: | ---: | ---: |
| 1 × 1 L | EUR 42.50 | EUR 42.50 | — | EUR 48.40 |
| 3 × 1 L | EUR 117.30 | EUR 39.10 | 8% / EUR 10.20 | EUR 123.20 |

Arithmetic: 42.50 × 3 = 127.50; 127.50 × 8% = 10.20; 127.50 − 10.20 = 117.30. Antonio’s approximate EUR 39 becomes **EUR 39.10** when the requested discount is exactly 8%.

The three-bottle saving applies immediately, including on the first order. No EUR 50 gate, customer account, coupon code, previous-purchase check or discount stacking is needed. Prices are fixed in Stripe, so there is no repeated calculation that can switch the discount off after it reduces the total. Customers choose a different pack on the website.

This is a pack comparison against three single bottles at the current base, not a claim about a historical previous price. Actual VAT treatment and whether the communicated price is VAT-inclusive must be settled for live selling. The shipping example is not a confirmed rate.

## How the network loyalty rule would work

Antonio also described the old network scheme: after a first paid qualifying purchase of at least EUR 50, later qualifying purchases receive 8%. With the simplified current catalogue, this produces no additional benefit:

- One bottle is EUR 42.50, below EUR 50.
- Three bottles already receive the full 8% immediately.
- Applying another 8% would stack discounts and exceed the intended offer.

Therefore **no historical-purchase loyalty programme is activated or promised on the website**. The current implementation uses the simpler 1/3-bottle offers. If loyalty or a broader catalogue is added later, implement it separately.

Recommended deterministic rule for that future version (threshold basis and refund policy need final confirmation):

1. Determine whether the identified customer has an earlier successful, qualifying order using verified private order records. A cookie, email URL parameter or checkbox is not proof.
2. Evaluate the new order’s eligible product subtotal **before discounts**, using a defined threshold basis (recommended: exclude shipping). Use an inclusive comparison: subtotal ≥ 5000 cents.
3. Decide the discount once: qualifying prior order + current qualifying subtotal → 8%; otherwise 0%. If a pack already has 8%, keep one 8% benefit rather than adding another.
4. Calculate the final amount after the decision. Do not run the eligibility check again using the discounted amount.
5. Never let a failed, unpaid, cancelled or duplicate order create eligibility. Define how full/partial refunds affect qualification before activating the programme.

Boundary example: a qualifying repeat order with EUR 50.00 eligible subtotal receives EUR 4.00 off and finishes at EUR 46.00. It remains eligible because the original EUR 50.00 was the input. EUR 49.99 does not qualify. This removes the loop described by Antonio.

A secure automated loyalty implementation needs customer identification and trusted order history/server-side enforcement, or an explicitly managed business process. The current static storefront deliberately avoids a public reusable loyalty coupon that anyone could claim.

## Repeat buying

Keep simple one-time reordering. One bottle purchased monthly is a purchasing hypothesis, not a statement of dosage, efficacy or how long a bottle lasts. No subscription, automatic renewal, email list, reminder or campaign is activated. An optional customer-requested reminder can be considered later without changing the pricing rule.

## Switzerland preparation

All four active links (two offers × IT/EN) accept EU27 + CH addresses. Base prices remain EUR; no invented CHF price is added. Any currency choice surfaced by Stripe must be reviewed in live acceptance testing.

The same EUR 5.90 shipping value is explicitly a sandbox fixture. It includes no calculation or promise about Swiss import taxes, duties or clearance fees. Before real Swiss orders:

- Obtain carrier rates and transit/return arrangements for one and three bottles.
- Decide who bears import taxes/clearance and identify importer responsibilities; publish clear delivery terms.
- Ask the accountant to check exports from Italy, Swiss import/mail-order VAT and required invoices/documents. EU OSS does not by itself cover Switzerland.
- Verify Swiss supplement composition, claims, labelling and any relevant import/notification requirements using the actual product dossier. English website copy is not proof of compliant packaging.

Official references: [Swiss food supplements](https://www.blv.admin.ch/en/food-supplements), [food imports from the EU](https://www.blv.admin.ch/en/import-foods-eu), [Swiss postal imports](https://www.bazg.admin.ch/en/internet-purchases-postal-shipments-information-import), [mail-order VAT](https://www.bazg.admin.ch/en/vat-mail-order-trade-and-platform-taxation).
