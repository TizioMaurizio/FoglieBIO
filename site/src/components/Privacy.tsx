import { ArrowLeft } from "lucide-react";
import { brand } from "../data/content";
import { policies } from "../data/policies";
import { pagePath, shopCopy, type Language, type PolicyPage } from "../data/shopCopy";
export const privacyPath = () => pagePath("it", "privacy");
// Retained for unmounted legacy components; the storefront uses no newsletter.
export function PrivacyNotice({ id }: { id: string }) {
  return <aside id={id} className="privacy-notice"><a href={privacyPath()}>Informativa privacy dell’anteprima</a></aside>;
}
export function PrivacyPage({ language = "it", page = "privacy" }: { language?: Language; page?: PolicyPage }) {
  const policy = policies[language][page];
  const t = shopCopy[language];
  return <main className="privacy-page">
    <a className="text-link" href={pagePath(language)}><ArrowLeft size={17} aria-hidden="true" />{t.back}</a>
    <p className="eyebrow">{t.preview}</p>
    <h1>{policy.title}</h1>
    {policy.sections.map(([heading, text], index) => <section key={heading} aria-labelledby={"policy-" + index}><h2 id={"policy-" + index}>{heading}</h2><p>{text}</p></section>)}
    <section><h2>La Ruota Bio</h2><p>{brand.legalName} · {language === "it" ? "P. IVA" : "VAT ID"} {brand.vat}<br />{brand.address}, {language === "it" ? "Italia" : "Italy"}<br /><a href={"mailto:" + brand.email}>{brand.email}</a></p></section>
    <nav className="policy-links" aria-label={t.details}>
      <a href={pagePath(language, "privacy")}>{t.privacy}</a><a href={pagePath(language, "terms")}>{t.terms}</a><a href={pagePath(language, "cookies")}>{t.cookies}</a>
      <a href={pagePath(language === "it" ? "en" : "it", page)} hrefLang={language === "it" ? "en" : "it"}>{language === "it" ? "English" : "Italiano"}</a>
    </nav>
    <p><a href="https://stripe.com/privacy">Stripe privacy</a> · <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy</a> · <a href="https://www.laruotabio.it/privacy-policy/">{language === "it" ? "Informativa ufficiale La Ruota Bio" : "La Ruota Bio official privacy notice"}</a></p>
  </main>;
}
