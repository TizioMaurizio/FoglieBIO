import { describe, it, expect, vi, afterEach } from "vitest";
import {
  calculateTotals,
  validateCustomer,
  isEmail,
} from "../src/services/validation";
import {
  MockPaymentProvider,
  MockShippingProvider,
  MockEmailProvider,
  LocalReviewsProvider,
} from "../src/services/providers";
import { integrations } from "../src/config/integrations";
import { product } from "../src/data/product";
import type { Customer } from "../src/services/contracts";
import { demoCustomer } from "../src/data/demo";
const customer: Customer = { ...demoCustomer };
afterEach(() => vi.restoreAllMocks());
describe("Checkout totals and validation", () => {
  it("calculates money in integer cents for one and several bottles", () => {
    expect(calculateTotals(4000, 1, 590)).toEqual({
      subtotalCents: 4000,
      shippingCents: 590,
      totalCents: 4590,
    });
    expect(calculateTotals(4000, 3, 590).totalCents).toBe(12590);
  });
  it.each([0, -1, 1.5, 13, Infinity, NaN])(
    "rejects invalid quantity %s",
    (quantity) => {
      expect(() => calculateTotals(4000, quantity, 590)).toThrow();
    },
  );
  it("rejects negative and non-integer prices", () => {
    expect(() => calculateTotals(-1, 1, 0)).toThrow();
    expect(() => calculateTotals(40.5, 1, 0)).toThrow();
  });
  it("validates all customer fields, CAP, province, phone and country", () => {
    expect(validateCustomer(customer)).toEqual({});
    expect(
      validateCustomer({
        ...customer,
        firstName: " ",
        email: "bad@",
        postalCode: "abcde",
        province: "Padova",
        phone: "abc",
        country: "FR",
      }),
    ).toMatchObject({
      firstName: expect.any(String),
      email: expect.any(String),
      postalCode: expect.any(String),
      province: expect.any(String),
      phone: expect.any(String),
      country: expect.any(String),
    });
  });
  it("validates newsletter email", () => {
    expect(isEmail("demo@example.com")).toBe(true);
    expect(isEmail("a@b")).toBe(false);
  });
});
describe("Service isolation", () => {
  it('refuses visitor data even if a read-only field is tampered with', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network prohibited'));
    const payment = new MockPaymentProvider(new MockShippingProvider());
    await expect(payment.createCheckout({ customer: { ...customer, email: 'visitor@example.org' }, method: 'card', quantity: 1, productId: product.id, optionId: 'single' })).rejects.toThrow('dati di esempio');
    await expect(new MockEmailProvider().subscribe('visitor@example.org', true)).rejects.toThrow('email di esempio');
    expect(fetch).not.toHaveBeenCalled();
  });
  it("completes every demo payment method without a network call", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Network prohibited"));
    const payment = new MockPaymentProvider(new MockShippingProvider());
    for (const method of ["card", "paypal", "apple", "google"] as const) {
      const session = await payment.createCheckout({
        customer,
        method,
        quantity: 2,
        productId: product.id,
        optionId: "single",
      });
      expect(session.totalCents).toBe(8590);
      expect(await payment.confirmPayment(session)).toEqual({
        status: "completed",
        simulated: true,
      });
    }
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects unapproved bundles and malformed customer data", async () => {
    const payment = new MockPaymentProvider(new MockShippingProvider());
    const input = {
      customer,
      method: "card" as const,
      quantity: 1,
      productId: product.id,
      optionId: "duo",
    };
    await expect(payment.createCheckout(input)).rejects.toThrow();
    await expect(
      payment.createCheckout({
        ...input,
        optionId: "single",
        customer: { ...customer, email: "bad" },
      }),
    ).rejects.toThrow();
  });
  it("does not accept unsupported shipping destinations or real sessions", async () => {
    const shipping = new MockShippingProvider();
    await expect(shipping.quote("US")).rejects.toThrow();
    await expect(
      new MockPaymentProvider(shipping).confirmPayment({
        id: "live",
        totalCents: 1,
        subtotalCents: 1,
        shippingCents: 0,
        simulated: false,
      }),
    ).rejects.toThrow();
  });
  it("does not subscribe, send or retain newsletter addresses", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Network prohibited"));
    const email = new MockEmailProvider();
    await expect(email.subscribe("demo@example.com", false)).rejects.toThrow();
    await expect(email.subscribe("invalid", true)).rejects.toThrow();
    expect(await email.subscribe("demo@example.com", true)).toEqual({
      simulated: true,
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("contains no fabricated reviews or active subscription offer", async () => {
    expect(await new LocalReviewsProvider().list(product.id)).toEqual([]);
    expect(integrations.subscriptionsEnabled).toBe(false);
    expect(product.priceCents).toBeNull();
    expect(product.options.filter((o) => o.enabled)).toHaveLength(1);
  });
});
