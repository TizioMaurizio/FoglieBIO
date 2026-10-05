import { SITE_URL } from "./site";
export type IntegrationMode = "mock" | "live";

// Only Stripe sandbox links are wired. Live services still fail closed.
export const integrations = {
  checkoutMode: "stripe-test" as "stripe-test" | "live",
  analyticsMode: "mock" as IntegrationMode,
  newsletterMode: "mock" as IntegrationMode,
  shippingMode: "mock" as IntegrationMode,
  inventoryMode: "mock" as IntegrationMode,
  reviewsMode: "local" as "local" | "live",
  subscriptionsEnabled: false,
  indexable: false,
  canonicalUrl: SITE_URL,
  demoUnitPriceCents: 4000,
  demoShippingCents: 590,
  supportedCountries: ["IT"],
  maxQuantity: 12,
};
