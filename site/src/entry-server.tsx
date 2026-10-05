import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { LandingPage } from "./components/LandingPage";
import { integrations } from "./config/integrations";
import { SITE_URL } from "./config/site";
import { productSchema, organizationSchema } from "./data/seo";
import { PrivacyPage } from "./components/Privacy";
import { shopCopy, type Language, type PolicyPage } from "./data/shopCopy";
export function renderPrivacy(language: Language = "it", page: PolicyPage = "privacy") {
  return renderToStaticMarkup(<PrivacyPage language={language} page={page} />);
}
export function render(language: Language = "it") {
  const t = shopCopy[language];
  const canonical = SITE_URL + (language === "en" ? "en/" : "");
  const schema = JSON.stringify([{...productSchema, description:t.description}, organizationSchema]).replace(/</g, "\\u003c");
  return {
    html: renderToString(<LandingPage language={language} />),
    title: language === "it" ? "Foglie Bio Plus® — Dalla terra. Dalle foglie." : "Foglie Bio Plus® — From the soil. From the leaves.",
    head: '<meta name="description" content="' + t.description + '" />' +
      '<meta name="robots" content="' + (integrations.indexable ? "index,follow" : "noindex,nofollow") + '" />' +
      '<link rel="canonical" href="' + canonical + '" />' +
      '<link rel="alternate" hreflang="it" href="' + SITE_URL + '" />' +
      '<link rel="alternate" hreflang="en" href="' + SITE_URL + 'en/" />' +
      '<link rel="alternate" hreflang="x-default" href="' + SITE_URL + '" />' +
      '<meta property="og:type" content="website" /><meta property="og:locale" content="' + (language === "it" ? "it_IT" : "en_GB") + '" />' +
      '<meta property="og:title" content="Foglie Bio Plus®" /><meta property="og:description" content="' + t.description + '" />' +
      '<meta property="og:url" content="' + canonical + '" /><meta property="og:image" content="' + SITE_URL + 'og.png" />' +
      '<meta name="twitter:card" content="summary_large_image" /><script type="application/ld+json">' + schema + '</script>'
  };
}
