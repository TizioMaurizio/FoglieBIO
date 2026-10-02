"use client";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CreditCard,
  LockKeyhole,
} from "lucide-react";
import { Modal, Bottle, QuantitySelector } from "./Primitives";
import { integrations } from "../config/integrations";
import { product } from "../data/product";
import { services, trackEvent } from "../services/providers";
import {
  calculateTotals,
  formatMoney,
  validateCustomer,
} from "../services/validation";
import type { Customer, PaymentMethod } from "../services/contracts";

const fields: {
  key: keyof Customer;
  label: string;
  type?: string;
  autoComplete: string;
  placeholder?: string;
  inputMode?: "numeric" | "tel" | "email";
}[] = [
  { key: "firstName", label: "Nome", autoComplete: "given-name" },
  { key: "lastName", label: "Cognome", autoComplete: "family-name" },
  {
    key: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    key: "phone",
    label: "Telefono",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
  },
  { key: "address", label: "Indirizzo", autoComplete: "street-address" },
  { key: "city", label: "Città", autoComplete: "address-level2" },
  {
    key: "postalCode",
    label: "CAP",
    autoComplete: "postal-code",
    placeholder: "35018",
    inputMode: "numeric",
  },
  {
    key: "province",
    label: "Provincia",
    autoComplete: "address-level1",
    placeholder: "PD",
  },
];
const methods: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Carta" },
  { id: "paypal", label: "PayPal" },
  { id: "apple", label: "Apple Pay" },
  { id: "google", label: "Google Pay" },
];
const emptyCustomer: Customer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  province: "",
  country: "IT",
};

export function CheckoutDrawer({
  quantity,
  setQuantity,
  optionId,
  onClose,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
  optionId: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details",
  );
  const [customer, setCustomer] = useState<Customer>({ ...emptyCustomer });
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>(
    {},
  );
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const busyRef = useRef(false);
  const totals = calculateTotals(
    integrations.demoUnitPriceCents,
    quantity,
    integrations.demoShippingCents,
  );
  const selectedOption = product.options.find((o) => o.id === optionId)!;
  function continueToPayment(event: React.FormEvent) {
    event.preventDefault();
    const validation = validateCustomer(customer);
    setErrors(validation);
    if (Object.keys(validation).length) {
      const field = Object.keys(validation)[0];
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${field}"]`)
        ?.focus();
      return;
    }
    setStep("payment");
  }
  async function confirm() {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      const session = await services.payment.createCheckout({
        productId: product.id,
        optionId,
        quantity,
        method,
        customer,
      });
      const result = await services.payment.confirmPayment(session);
      trackEvent("purchase", {
        product_id: product.id,
        product_name: product.name,
        quantity,
        price: integrations.demoUnitPriceCents / 100,
        currency: product.currency,
        simulated: result.simulated,
      });
      setCustomer({ ...emptyCustomer });
      setStep("success");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Non è stato possibile completare la simulazione. Riprova.",
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  return (
    <Modal
      title={step === "success" ? "Simulazione completata" : "Il tuo acquisto"}
      onClose={onClose}
      className="checkout"
    >
      <div className="demo-banner">
        <LockKeyhole size={17} />
        <p>
          <strong>Checkout dimostrativo</strong>
          <br />
          Nessun addebito. Nessun ordine inviato. Usa dati di fantasia.
        </p>
      </div>
      {step === "success" ? (
        <div className="checkout-success" role="status">
          <span className="success-mark">
            <Check size={34} />
          </span>
          <h3>Il percorso è completo.</h3>
          <p>Hai provato l’esperienza di acquisto di Foglie Bio Plus.</p>
          <p>
            <strong>Il pagamento non è attivo.</strong> Nessun importo è stato
            addebitato, nessun ordine registrato e nessuna email inviata.
          </p>
          <button className="button" onClick={onClose}>
            Torna alla scoperta <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <ol className="checkout-steps" aria-label="Fasi del checkout">
            <li aria-current={step === "details" ? "step" : undefined}>
              01 · I tuoi dati
            </li>
            <li aria-current={step === "payment" ? "step" : undefined}>
              02 · Pagamento demo
            </li>
          </ol>
          <div className="checkout-product">
            <Bottle />
            <div>
              <h3>{product.name}</h3>
              <p>
                {selectedOption.title} · {product.format}
              </p>
              <small>
                {formatMoney(integrations.demoUnitPriceCents)} / bottiglia ·
                esempio
              </small>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
          </div>
          <dl className="checkout-totals">
            <div>
              <dt>Subtotale</dt>
              <dd>{formatMoney(totals.subtotalCents)}</dd>
            </div>
            <div>
              <dt>Spedizione · esempio</dt>
              <dd>{formatMoney(totals.shippingCents)}</dd>
            </div>
            <div className="total">
              <dt>Totale demo</dt>
              <dd>{formatMoney(totals.totalCents)}</dd>
            </div>
          </dl>
          <p className="fine-print">
            Importi illustrativi: prezzo, imposte applicabili e tariffe di
            spedizione definitive sono da confermare.
          </p>
          {step === "details" ? (
            <form ref={form} onSubmit={continueToPayment} noValidate>
              <h3 className="form-title">Dati e indirizzo di spedizione</h3>
              <div className="form-grid">
                {fields.map((field) => (
                  <label
                    className={field.key === "address" ? "full-field" : ""}
                    key={field.key}
                    htmlFor={`checkout-${field.key}`}
                  >
                    {field.label}
                    <input
                      id={`checkout-${field.key}`}
                      name={field.key}
                      type={field.type || "text"}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      inputMode={field.inputMode}
                      value={customer[field.key]}
                      maxLength={
                        field.key === "province"
                          ? 2
                          : field.key === "postalCode"
                            ? 5
                            : 150
                      }
                      required
                      aria-invalid={!!errors[field.key]}
                      aria-describedby={
                        errors[field.key] ? `error-${field.key}` : undefined
                      }
                      onChange={(e) => {
                        setCustomer({
                          ...customer,
                          [field.key]: e.target.value,
                        });
                        if (errors[field.key])
                          setErrors({ ...errors, [field.key]: undefined });
                      }}
                    />
                    {errors[field.key] && (
                      <span className="field-error" id={`error-${field.key}`}>
                        {errors[field.key]}
                      </span>
                    )}
                  </label>
                ))}
                <label className="full-field" htmlFor="checkout-country">
                  Paese
                  <select
                    id="checkout-country"
                    name="country"
                    value={customer.country}
                    onChange={(e) =>
                      setCustomer({ ...customer, country: e.target.value })
                    }
                    autoComplete="country"
                  >
                    <option value="IT">Italia</option>
                  </select>
                </label>
              </div>
              <p className="fine-print">
                I dati restano solo in questa pagina e vengono cancellati alla
                chiusura. Non saranno usati per ordini o contatti.
              </p>
              <button className="button full-button" type="submit">
                Continua al pagamento demo <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="payment-step">
              <h3
                className="form-title"
                tabIndex={-1}
                ref={(node) => {
                  node?.focus();
                }}
              >
                Scegli un metodo dimostrativo
              </h3>
              <fieldset className="payment-methods">
                <legend className="sr-only">Metodo di pagamento</legend>
                {methods.map((item) => (
                  <label
                    key={item.id}
                    className={method === item.id ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      checked={method === item.id}
                      onChange={() => setMethod(item.id)}
                    />
                    {item.id === "card" && <CreditCard size={18} />}
                    <span>{item.label}</span>
                  </label>
                ))}
              </fieldset>
              <p className="payment-explanation">
                {methods.find((m) => m.id === method)?.label} è mostrato solo
                come esempio. Non inserire numeri di carta o credenziali: non è
                previsto alcun collegamento al servizio.
              </p>
              {error && (
                <p role="alert" className="field-error">
                  {error}
                </p>
              )}
              <button
                className="button full-button"
                disabled={busy}
                onClick={confirm}
              >
                {busy ? "Simulazione in corso…" : "Concludi — Demo checkout"}{" "}
                <ArrowRight size={18} />
              </button>
              <button
                className="text-link back-button"
                onClick={() => setStep("details")}
              >
                <ArrowLeft size={16} /> Torna ai tuoi dati
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
