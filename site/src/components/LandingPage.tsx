import { useState } from "react";
import { ArrowUpRight, Check, Leaf, Package, Plus } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Bottle } from "./Primitives";
import { CheckoutDrawer } from "./CheckoutDrawer";
import { brand } from "../data/content";
import { brandAssets } from "../data/brandAssets";
import { pagePath, shopCopy, type Language } from "../data/shopCopy";
import { stripeTest, getTestOffer } from "../services/stripeTest";
import { formatMoney } from "../services/validation";

export function ShopFooter({ language = "it" }: { language?: Language }) {
  const t = shopCopy[language];
  return <footer className="shop-footer">
    <div><BrandLogo /><p>{brand.legalName}<br />{language === "it" ? "P. IVA" : "VAT ID"}: {brand.vat}<br />{brand.address}, {language === "it" ? "Italia" : "Italy"}</p></div>
    <div><p>{t.support}</p><a href={"mailto:" + brand.email}>{brand.email}</a></div>
    <nav aria-label={language === "it" ? "Informazioni legali" : "Legal information"}>
      <a href={pagePath(language, "privacy")}>{t.privacy}</a>
      <a href={pagePath(language, "terms")}>{t.terms}</a>
      <a href={pagePath(language, "cookies")}>{t.cookies}</a>
    </nav>
    <small>© 2026 La Ruota Bio</small>
  </footer>;
}

export function LandingPage({ language = "it" }: { language?: Language }) {
  const t = shopCopy[language];
  const [bottles, setBottles] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const offer = getTestOffer(bottles);
  const money = (amount: number) => formatMoney(amount, language);
  return <>
    <a className="skip-link" href="#contenuto">{t.skip}</a>
    <div className="shop-preview-banner"><strong>{t.preview}</strong><span>{t.previewNote}</span></div>
    <header className="nav shop-nav">
      <a className="wordmark" href={pagePath(language)} aria-label={"Foglie Bio Plus — " + t.home}>
        <BrandLogo decorative /><span>foglie bio plus<sup>®</sup><small>LA RUOTA BIO</small></span>
      </a>
      <nav className="shop-nav-links" aria-label={language === "it" ? "Navigazione" : "Navigation"}>
        <a href="#prodotto">{t.product}</a><a href="#composizione">{t.details}</a><a href="#faq">{t.faq}</a>
      </nav>
      <div className="shop-language" aria-label={t.language}>
        <a href={pagePath("it")} hrefLang="it" lang="it" aria-current={language === "it" ? "page" : undefined}>IT</a>
        <a href={pagePath("en")} hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined}>EN</a>
      </div>
    </header>
    <main id="contenuto">
      <section className="shop-product" id="prodotto" aria-labelledby="product-title">
        <div className="shop-visual">
          <img className="shop-branch" src={brandAssets.branch} alt="" aria-hidden="true" width="500" height="500" />
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="bottle-stage"><Bottle priority alt={t.bottleAlt} /></div>
          <div className="shop-origin"><Leaf size={18} aria-hidden="true" /><span>{t.origin}</span></div>
        </div>
        <div className="shop-purchase">
          <p className="eyebrow">LA RUOTA BIO</p>
          <h1 id="product-title">Foglie Bio <span>Plus<sup>®</sup></span></h1>
          <p className="shop-description">{t.description}</p>
          <div className="shop-facts">
            <span><Package size={18} aria-hidden="true" /> 1 L</span>
            <span><img src={brandAssets.organic} width="62" height="41" alt={t.organicAlt} />{t.organic}</span>
          </div>
          <fieldset className="shop-packs">
            <legend>{t.choose}</legend>
            {stripeTest.offers.map(item => <label className={"shop-pack" + (item.bottles === bottles ? " selected" : "")} key={item.bottles}>
              <input type="radio" name="pack" value={item.bottles} checked={bottles === item.bottles} onChange={() => setBottles(item.bottles)} />
              <span className="shop-pack-title">{item.bottles === 1 ? t.single : item.bottles + " " + t.bottles}</span>
              <strong>{money(item.amountCents)}</strong>
              <span>{money(item.amountCents / item.bottles)} {t.each}</span>
              <small>{item.discountPercent > 0 ? t.proposal + " " + item.discountPercent + "%" : t.oneOff}</small>
            </label>)}
          </fieldset>
          <p className="shop-price-note">{t.previewNote}{offer.discountPercent > 0 && " " + offer.discountPercent + "% " + t.reference + "."}</p>
          <dl className="shop-summary"><div><dt>{t.packTotal}</dt><dd>{money(offer.amountCents)}</dd></div><div><dt>{t.shipping}</dt><dd>{money(stripeTest.shippingAmountCents)}</dd></div><div><dt>{t.total}</dt><dd>{money(offer.amountCents + stripeTest.shippingAmountCents)}</dd></div></dl>
          <button className="button shop-buy" onClick={() => setCheckout(true)}>{t.continue}<ArrowUpRight size={20} aria-hidden="true" /></button>
          <p className="shop-one-off"><Check size={16} aria-hidden="true" />{t.noRenewal}</p>
          <p className="fine-print">{t.shippingNote}</p>
        </div>
      </section>
      <section className="shop-information" id="composizione" aria-labelledby="details-title">
        <div><p className="eyebrow">FOGLIE BIO PLUS</p><h2 id="details-title">{t.productDetails}</h2><p>{t.warning}</p></div>
        <div className="shop-accordions">
          <details><summary>{t.composition}<Plus size={18} aria-hidden="true" /></summary><p>{t.compositionText}</p></details>
          <details><summary>{t.use}<Plus size={18} aria-hidden="true" /></summary><p>{t.useText}</p></details>
          <details><summary>{t.originTitle}<Plus size={18} aria-hidden="true" /></summary><p>{t.originText}</p></details>
        </div>
      </section>
      <section className="shop-faq" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">{t.faqTitle}</h2>
        <div className="shop-accordions">{t.faqs.map(item => <details key={item.q}><summary>{item.q}<Plus size={18} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
      </section>
    </main>
    <ShopFooter language={language} />
    {checkout && <CheckoutDrawer quantity={bottles} setQuantity={setBottles} language={language} onClose={() => setCheckout(false)} />}
  </>;
}
