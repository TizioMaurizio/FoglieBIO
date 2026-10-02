"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, ArrowRight, Leaf } from "lucide-react";
import { brand, faq, legal, navigation } from "../data/content";
import { services, trackEvent } from "../services/providers";
import { Modal } from "../components/Primitives";
import { demoEmail } from "../data/demo";
import { PrivacyNotice, privacyPath } from "../components/Privacy";
import type { Review } from "../services/contracts";
export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <section className="section-space" aria-label="Esperienze dei clienti">
      <h2>Le vostre esperienze</h2>
      {reviews.map((review) => (
        <article key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.text}</p>
          <p>
            {review.rating} su 5 ·{" "}
            <time dateTime={review.date}>
              {new Date(review.date).toLocaleDateString("it-IT")}
            </time>
            {review.verifiedPurchase && " · Acquisto verificato"}
          </p>
        </article>
      ))}
    </section>
  );
}
export function FAQ() {
  return (
    <section id="faq" className="faq section-space">
      <div>
        <p className="eyebrow">CON CHIAREZZA</p>
        <h2>
          Le domande,
          <br />
          prima di scegliere.
        </h2>
        <p>
          Un’informazione in più fa sempre bene.
          <br />
          Per parlare con La Ruota Bio:
        </p>
        <a className="text-link" href={`mailto:${brand.email}`}>
          {brand.email}
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="faq-list">
        {faq.map((item, index) => (
          <details
            key={item.question}
            onToggle={(e) => {
              if (e.currentTarget.open)
                trackEvent("faq_open", { question: item.question });
            }}
          >
            <summary>
              <span className="faq-index">0{index + 1}</span>
              {item.question}
              <Plus size={18} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function FinalCTA({
  onPurchase,
}: {
  onPurchase: (source: string) => void;
}) {
  return (
    <section className="final-cta">
      <Leaf size={34} strokeWidth={1} />
      <p className="eyebrow">UNA FOGLIA. UNA STORIA. UN’IDEA ITALIANA.</p>
      <h2>
        Conosci la storia.
        <br />
        Scopri il suo infuso.
      </h2>
      <button
        className="button light-button"
        onClick={() => onPurchase("final_cta")}
      >
        Scopri l’acquisto <ArrowUpRight size={19} />
      </button>
      <p className="fine-print">
        Acquisto dimostrativo · Nessun pagamento attivo
      </p>
    </section>
  );
}
export function Footer() {
  const [legalKey, setLegalKey] = useState<keyof typeof legal | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setStatus("");
    setBusy(true);
    try {
      // This fixed mock call is not visitor consent and must never be reused by a live adapter.
      await services.email.subscribe(demoEmail, true);
      trackEvent("newsletter_signup", { simulated: true });
      setStatus(
        "Simulazione completata. Nessuna iscrizione effettuata e nessuna email inviata.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Riprova tra poco.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <footer>
      <div className="footer-top">
        <div>
          <p className="eyebrow">LETTERE DALLA TERRA</p>
          <h2>
            Le storie belle
            <br />
            continuano.
          </h2>
          <p>Novità, persone e curiosità dal mondo dell’olivo.</p>
        </div>
        <form className="newsletter" autoComplete="off" noValidate onSubmit={subscribe}>
          <PrivacyNotice id="newsletter-privacy" />
          <label htmlFor="newsletter-email">Email di esempio · non modificabile</label>
          <div className="newsletter-input">
            <input
              id="newsletter-email"
              type="email"
              value={demoEmail}
              readOnly
              autoComplete="off"
              aria-describedby="newsletter-feedback"
            />
            <button
              type="submit"
              aria-label="Prova la newsletter senza iscriverti"
              disabled={busy}
            >
              <ArrowRight size={23} />
            </button>
          </div>
          <p className="fine-print">Prova la newsletter con l’email di esempio. Nessuna iscrizione reale e nessun consenso marketing raccolto.</p>
          <div id="newsletter-feedback" aria-live="polite">
            {error && <p className="field-error">{error}</p>}
            {status && <p className="success-text">{status}</p>}
          </div>
        </form>
      </div>
      <div className="footer-main">
        <a className="wordmark" href="#inizio">
          <Leaf size={24} strokeWidth={1.4} />
          <span>
            foglie bio plus<sup>®</sup>
            <small>UNA STORIA LA RUOTA BIO</small>
          </span>
        </a>
        <nav aria-label="Collegamenti nel footer">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.website} target="_blank" rel="noreferrer">
            La Ruota Bio <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          {brand.legalName} · P. IVA {brand.vat}
          <br />
          {brand.address}
        </p>
        <div>
          <a href={privacyPath()}>Informativa privacy</a>
          <button onClick={() => setLegalKey("cookies")}>Cookie</button>
          <button onClick={() => setLegalKey("terms")}>Condizioni</button>
        </div>
        <span>© 2026 La Ruota Bio</span>
      </div>
      {legalKey && (
        <Modal
          title={legal[legalKey].title}
          onClose={() => setLegalKey(null)}
          className="legal-modal"
        >
          <p>{legal[legalKey].text}</p>
        </Modal>
      )}
    </footer>
  );
}
