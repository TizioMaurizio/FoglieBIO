// Product organic status confirmed explicitly by the user on 2026-10-03.
// The prior operator PDF remains historical evidence; its scope/expiry are not changed.
export const organic = {
  productStatus: 'confirmed-by-owner' as const,
  productConfirmationDate: '2026-10-03',
  currentProductCertificateUrl: null as string | null,
  productControlBodyCode: null as string | null,
  farmName: 'A Roda Dea Sega',
  farmSince: '1998',
  farmSource: 'https://www.antonioberti.it/a-roda-dea-sega-25-anni-di-agricoltura-bio-senza-compromessi/',
  companySource: 'https://www.laruotabio.it/certificazione/',
  certificate: {
    status: 'historical' as const,
    operatorName: 'La Ruota Bio S.r.l.',
    authority: 'ICEA',
    authorityCode: 'IT-BIO-006',
    operatorCode: 'E3480',
    documentNumber: 'IT-BIO-006.380-0010161.2023.001',
    validFrom: '2023-03-20',
    validUntil: '2026-03-20',
    periodLabel: '20 marzo 2023 – 20 marzo 2026',
    activities: 'Distribuzione e magazzinaggio',
    pdf: 'https://www.laruotabio.it/wp-content/uploads/2023/05/E3480_LARUOTABIOSRL_214878_CO_ITBIO006.3800010161.2023.001_202303201506.pdf',
    registry: 'https://webgate.ec.europa.eu/tracesnt/directory/publication/organic-operator/IT-BIO-006.380-0010161.2023.001.pdf',
    productScopeVerified: false,
  },
};
