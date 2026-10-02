import { assetUrl } from '../config/site';

// Original photographs selected from Antonio's official website at the user's request.
export const photography = {
  portrait: {
    src: assetUrl('images/antonio-berti-800.jpg'),
    srcSet: `${assetUrl('images/antonio-berti-500.jpg')} 500w, ${assetUrl('images/antonio-berti-800.jpg')} 800w`,
    width: 800,
    height: 1202,
    alt: 'Ritratto di Antonio Berti, dal suo sito ufficiale',
    source: 'https://www.antonioberti.it/',
  },
  farm: {
    src: assetUrl('images/azienda-antonio-1536.jpg'),
    srcSet: `${assetUrl('images/azienda-antonio-800.jpg')} 800w, ${assetUrl('images/azienda-antonio-1536.jpg')} 1536w`,
    width: 1536,
    height: 864,
    alt: 'Campi e fabbricato agricolo nella fotografia pubblicata sul sito di Antonio Berti',
    source: 'https://www.antonioberti.it/',
  },
};

export const antonioSources = {
  story: 'https://www.antonioberti.it/la-mia-storia/',
  farm: 'https://www.antonioberti.it/a-roda-dea-sega-25-anni-di-agricoltura-bio-senza-compromessi/',
};
