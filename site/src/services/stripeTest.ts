import manifest from "../config/stripe-test.json";
import type { Language } from "../data/shopCopy";

export const stripeTest = manifest;
export function requireStripeTestUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== "buy.stripe.com" || url.port ||
      url.username || url.password || url.search || url.hash ||
      !/^\/test_[A-Za-z0-9]+$/.test(url.pathname)) {
    throw new Error("Only unmodified Stripe sandbox links are allowed.");
  }
  return url.href;
}
export function getTestOffer(bottles: number) {
  if (manifest.mode !== "stripe-test" || manifest.approvalStatus !== "antonio_pricing_preview") {
    throw new Error("Live offers are not configured.");
  }
  const offer = manifest.offers.find(item => item.bottles === bottles);
  if (!Number.isInteger(bottles) || !offer) throw new Error("Unsupported pack.");
  return offer;
}
export function getStripeTestCheckoutUrl(bottles: number, language: Language = "it"): string {
  if (language !== "it" && language !== "en") throw new Error("Unsupported language.");
  const offer = getTestOffer(bottles);
  const url = new URL(requireStripeTestUrl(offer.links[language].url));
  url.searchParams.set("locale", language);
  return url.href;
}
