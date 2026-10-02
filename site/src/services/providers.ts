import { integrations } from "../config/integrations";
import { product } from "../data/product";
import { demoCustomer, demoEmail } from "../data/demo";
import type {
  AnalyticsProvider,
  CheckoutInput,
  CheckoutSession,
  EmailProvider,
  InventoryProvider,
  InventoryStatus,
  PaymentProvider,
  Review,
  ReviewsProvider,
  ShippingProvider,
} from "./contracts";
import { calculateTotals, isEmail, validateCustomer } from "./validation";

export class MockShippingProvider implements ShippingProvider {
  async quote(country: string) {
    if (!integrations.supportedCountries.includes(country))
      throw new Error("Paese non disponibile nella demo.");
    return { amountCents: integrations.demoShippingCents, simulated: true };
  }
}
export class MockPaymentProvider implements PaymentProvider {
  constructor(private shipping: ShippingProvider) {}
  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    if (
      input.productId !== product.id ||
      !product.options.some((o) => o.id === input.optionId && o.enabled)
    )
      throw new Error("Prodotto non disponibile.");
    if (Object.keys(validateCustomer(input.customer)).length)
      throw new Error("Controlla i dati inseriti.");
    if ((Object.keys(demoCustomer) as (keyof typeof demoCustomer)[]).some(key => input.customer[key] !== demoCustomer[key]))
      throw new Error("La demo accetta solo i dati di esempio predefiniti.");
    if (!["card", "paypal", "apple", "google"].includes(input.method))
      throw new Error("Metodo non valido.");
    const preliminary = calculateTotals(
      integrations.demoUnitPriceCents,
      input.quantity,
      0,
      integrations.maxQuantity,
    );
    const shipping = await this.shipping.quote(
      input.customer.country,
      preliminary.subtotalCents,
    );
    return {
      id: `demo-${Date.now()}`,
      ...calculateTotals(
        integrations.demoUnitPriceCents,
        input.quantity,
        shipping.amountCents,
      ),
      simulated: true,
    };
  }
  async confirmPayment(session: CheckoutSession) {
    if (!session.simulated || !session.id.startsWith("demo-"))
      throw new Error("Sessione demo non valida.");
    return { status: "completed" as const, simulated: true };
  }
}
export class MockEmailProvider implements EmailProvider {
  async subscribe(email: string, consent: boolean) {
    if (!isEmail(email))
      throw new Error("Inserisci un indirizzo email valido.");
    if (email !== demoEmail)
      throw new Error("La demo accetta solo l’indirizzo email di esempio.");
    if (!consent) throw new Error("Conferma di aver letto l’informativa.");
    return { simulated: true }; // Do not retain, log or transmit the address.
  }
}
export class MockAnalyticsProvider implements AnalyticsProvider {
  trackEvent: AnalyticsProvider["trackEvent"] = (name, payload = {}) => {
    // Deliberately no persistence, network, identifiers, form values or console logging.
    void name;
    void payload;
  };
}
export class MockInventoryProvider implements InventoryProvider {
  async getStatus(productId: string): Promise<InventoryStatus> {
    void productId;
    return "available";
  }
}
export class LocalReviewsProvider implements ReviewsProvider {
  async list(productId: string): Promise<Review[]> {
    void productId;
    return [];
  }
}
function createServices() {
  if (
    [
      integrations.checkoutMode,
      integrations.shippingMode,
      integrations.newsletterMode,
      integrations.analyticsMode,
      integrations.inventoryMode,
    ].some((m) => m !== "mock") ||
    integrations.reviewsMode !== "local"
  ) {
    throw new Error(
      "Servizi live non configurati: implementare e verificare gli adapter prima dell’attivazione.",
    );
  }
  const shipping = new MockShippingProvider();
  return {
    shipping,
    payment: new MockPaymentProvider(shipping),
    email: new MockEmailProvider(),
    analytics: new MockAnalyticsProvider(),
    inventory: new MockInventoryProvider(),
    reviews: new LocalReviewsProvider(),
  };
}
export const services = createServices();
export const trackEvent = services.analytics.trackEvent;
