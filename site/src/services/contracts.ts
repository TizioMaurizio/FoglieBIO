export type PaymentMethod = "card" | "paypal" | "apple" | "google";
export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}
export interface CheckoutInput {
  productId: string;
  optionId: string;
  quantity: number;
  method: PaymentMethod;
  customer: Customer;
}
export interface CheckoutSession {
  id: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  simulated: boolean;
}
export interface PaymentProvider {
  createCheckout(input: CheckoutInput): Promise<CheckoutSession>;
  confirmPayment(
    session: CheckoutSession,
  ): Promise<{ simulated: boolean; status: "completed" }>;
}
export interface ShippingProvider {
  quote(
    country: string,
    subtotalCents: number,
  ): Promise<{ amountCents: number; simulated: boolean }>;
}
export type AnalyticsEvent =
  | "page_view"
  | "view_item"
  | "select_product"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "newsletter_signup"
  | "faq_open"
  | "story_view"
  | "cta_click";
export interface AnalyticsPayload {
  product_id?: string;
  product_name?: string;
  quantity?: number;
  price?: number;
  currency?: string;
  source?: string;
  question?: string;
  simulated?: boolean;
}
export interface AnalyticsProvider {
  trackEvent(name: AnalyticsEvent, payload?: AnalyticsPayload): void;
}
export interface EmailProvider {
  subscribe(email: string, consent: boolean): Promise<{ simulated: boolean }>;
}
export type InventoryStatus = "available" | "low-stock" | "out-of-stock";
export interface InventoryProvider {
  getStatus(productId: string): Promise<InventoryStatus>;
}
export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verifiedPurchase: boolean;
}
export interface ReviewsProvider {
  list(productId: string): Promise<Review[]>;
}
