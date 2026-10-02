import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { LandingPage } from './components/LandingPage';
import { integrations } from './config/integrations';
import { SITE_URL } from './config/site';
import { productSchema, organizationSchema } from './data/seo';
import { PrivacyPage } from './components/Privacy';

export function renderPrivacy() {
  return renderToStaticMarkup(<PrivacyPage />);
}

export function render() {
  const description = 'Scopri Foglie Bio Plus, l’infuso di foglie d’olivo italiane di La Ruota Bio. La storia di Antonio, l’origine e il prodotto.';
  const schema = JSON.stringify([productSchema, organizationSchema]).replace(/</g, '\\u003c');
  return {
    html: renderToString(<LandingPage />),
    head: `<meta name="description" content="${description}" />
<meta name="robots" content="${integrations.indexable ? 'index,follow' : 'noindex,nofollow'}" />
<link rel="canonical" href="${SITE_URL}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="it_IT" />
<meta property="og:title" content="Foglie Bio Plus®" />
<meta property="og:description" content="Dalla terra. Dalle foglie. Una storia vera." />
<meta property="og:url" content="${SITE_URL}" />
<meta property="og:image" content="${SITE_URL}og.png" />
<meta property="og:image:alt" content="Foglie Bio Plus® — Dalla terra. Dalle foglie." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Foglie Bio Plus®" />
<meta name="twitter:description" content="Dalla terra. Dalle foglie. Una storia vera." />
<meta name="twitter:image" content="${SITE_URL}og.png" />
<script type="application/ld+json">${schema}</script>`,
  };
}
