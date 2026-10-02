import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Organic, OrganicHighlight } from '../src/sections/Organic';
import { organic } from '../src/data/organic';
import { product } from '../src/data/product';

describe('Organic evidence scope', () => {
  it('identifies the dated operator certificate without claiming current product certification', () => {
    const html = renderToStaticMarkup(createElement(Organic));
    expect(html).toContain('DOCUMENTO STORICO');
    expect(html).toContain('La Ruota Bio S.r.l.');
    expect(html).toContain('ICEA');
    expect(html).toContain('20 marzo 2023 – 20 marzo 2026');
    expect(html).toContain('copertura specifica di Foglie Bio Plus devono ancora essere verificati');
    expect(html).toContain(organic.certificate.pdf);
    expect(organic.certificate.productScopeVerified).toBe(false);
    expect(product.certification).toBeNull();
  });
  it('keeps the prominent claim about Antonio’s agricultural history', () => {
    const html = renderToStaticMarkup(createElement(OrganicHighlight));
    expect(html).toContain('href="#biologico"');
    expect(html).toContain('La storia dell’azienda di Antonio');
    expect(html).toContain('1998');
    expect(html).not.toContain('certificato bio');
  });
});
