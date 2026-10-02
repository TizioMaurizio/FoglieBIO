import type { Customer } from "./contracts";
export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function validateCustomer(
  customer: Customer,
): Partial<Record<keyof Customer, string>> {
  const errors: Partial<Record<keyof Customer, string>> = {};
  for (const key of Object.keys(customer) as (keyof Customer)[]) {
    if (!customer[key].trim()) errors[key] = "Compila questo campo.";
  }
  if (customer.email && !isEmail(customer.email))
    errors.email = "Inserisci un indirizzo email valido.";
  if (customer.postalCode && !/^\d{5}$/.test(customer.postalCode))
    errors.postalCode = "Il CAP deve contenere 5 cifre.";
  if (customer.province && !/^[A-Za-z]{2}$/.test(customer.province))
    errors.province = "Usa la sigla di 2 lettere, ad esempio PD.";
  if (customer.phone && !/^\+?[\d\s().-]{6,20}$/.test(customer.phone))
    errors.phone = "Inserisci un numero di telefono valido.";
  if (customer.country !== "IT")
    errors.country = "La demo è disponibile solo per indirizzi italiani.";
  return errors;
}
export function calculateTotals(
  unitPriceCents: number,
  quantity: number,
  shippingCents: number,
  maxQuantity = 12,
) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQuantity)
    throw new Error("Quantità non valida.");
  if (
    ![unitPriceCents, shippingCents].every((n) => Number.isInteger(n) && n >= 0)
  )
    throw new Error("Importo non valido.");
  const subtotalCents = unitPriceCents * quantity;
  return {
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
  };
}
export const formatMoney = (cents: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
