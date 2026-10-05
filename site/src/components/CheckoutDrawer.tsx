import { useState } from "react";
import { ArrowUpRight, ArrowLeft, LockKeyhole } from "lucide-react";
import { Modal, Bottle } from "./Primitives";
import { PackSelector } from "./PackSelector";
import { pagePath, shopCopy, type Language } from "../data/shopCopy";
import { formatMoney } from "../services/validation";
import { getStripeTestCheckoutUrl, getTestOffer, stripeTest } from "../services/stripeTest";

export function CheckoutDrawer({ quantity, setQuantity, language = "it", onClose }: {
  quantity: number; setQuantity: (quantity: number) => void; language?: Language; onClose: () => void;
}) {
  const t = shopCopy[language];
  const [opened, setOpened] = useState(false);
  let checkoutUrl: string | undefined;
  let offer: ReturnType<typeof getTestOffer> | undefined;
  try { offer = getTestOffer(quantity); checkoutUrl = getStripeTestCheckoutUrl(quantity, language); } catch { /* Fail closed. */ }
  const money = (amount: number) => formatMoney(amount, language);
  return <Modal title={t.checkoutTitle} onClose={onClose} closeLabel={t.close} className="checkout">
    <div className="demo-banner"><LockKeyhole size={17} aria-hidden="true" /><p><strong>{t.testBanner}</strong><br />{t.testNoOrder}</p></div>
    <div className="checkout-product"><Bottle alt={t.bottleAlt} /><div><p className="eyebrow">LA RUOTA BIO</p><h3>Foglie Bio Plus®</h3><p>{quantity} × 1 L · {t.organic}</p></div></div>
    <PackSelector quantity={quantity} onChange={value => { setQuantity(value); setOpened(false); }} language={language} />
    {offer && <dl className="checkout-totals"><div><dt>{t.packTotal}</dt><dd>{money(offer.amountCents)}</dd></div><div><dt>{t.shipping}</dt><dd>{money(stripeTest.shippingAmountCents)}</dd></div><div className="total"><dt>{t.total}</dt><dd>{money(offer.amountCents + stripeTest.shippingAmountCents)}</dd></div></dl>}
    <p className="fine-print">{t.shippingNote}</p>
    <aside className="privacy-notice" aria-labelledby="stripe-test-privacy"><LockKeyhole size={20} aria-hidden="true" /><div><h3 id="stripe-test-privacy">{t.safeTitle}</h3><p>{t.safeText}</p><a href={pagePath(language, "privacy")} target="_blank" rel="noopener noreferrer">{t.privacy} <span className="sr-only">{t.newTab}</span></a></div></aside>
    <details className="stripe-test-guide"><summary>{t.testData}</summary><dl>
      <div><dt>Email</dt><dd><code>demo@example.com</code></dd></div>
      <div><dt>{t.name}</dt><dd>{language === "it" ? "Cliente Test" : "Test Customer"}</dd></div>
      <div><dt>{t.address}</dt><dd>Via Esempio 1, 35100 Padova (PD), {language === "it" ? "Italia" : "Italy"}</dd></div>
      <div><dt>{t.phone}</dt><dd><code>+1 202 555 0100</code></dd></div>
      <div><dt>{t.card}</dt><dd><code>4242 4242 4242 4242</code></dd></div>
      <div><dt>{t.expiry}</dt><dd><code>12/34</code> / <code>123</code></dd></div>
    </dl><p>{t.decline} <code>4000 0000 0000 0002</code>.</p></details>
    <p className="payment-explanation">{t.fixedPack} {t.oneOff}</p>
    {checkoutUrl ? <a className="button full-button" href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpened(true)}>{t.pay}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">{t.newTab}</span></a> : <p className="field-error" role="alert">{t.unavailable}</p>}
    {opened && <p className="stripe-test-return" role="status">{t.returned}</p>}
    <button className="text-link back-button" onClick={onClose}><ArrowLeft size={16} aria-hidden="true" />{t.back}</button>
  </Modal>;
}
