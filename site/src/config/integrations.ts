import { SITE_URL } from "./site";
export type IntegrationMode = "mock" | "live";

// Live modes deliberately fail closed until real server-backed adapters exist.
export const integrations = {
  checkoutMode: "mock" as IntegrationMode,
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
