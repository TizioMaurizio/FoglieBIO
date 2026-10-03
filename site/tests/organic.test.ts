import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Organic, OrganicHighlight } from '../src/sections/Organic';
import { organic } from '../src/data/organic';
import { product } from '../src/data/product';
import { Hero } from '../src/sections/Hero';
import { brand } from '../src/data/content';

describe('Confirmed organic branding', () => {
  it('uses the owner confirmation without inventing a replacement certificate', () => {
    const html = renderToStaticMarkup(createElement(Organic));
    expect(organic.productStatus).toBe('confirmed-by-owner');
    expect(organic.productConfirmationDate).toBe('2026-10-03');
    expect(product.certification).toBe('Biologico certificato');
    expect(html).toContain('eu-organic-logo.jpg');
    expect(html).toContain('Biologico certificato');
    expect(html).not.toContain('DOCUMENTO STORICO');
    expect(organic.certificate.status).toBe('historical');
    expect(organic.certificate.validUntil).toBe('2026-03-20');
    expect(organic.currentProductCertificateUrl).toBeNull();
    expect(organic.productControlBodyCode).toBeNull();
  });
  it('shows the official bio mark and 2022 in the product branding', () => {
    const html = renderToStaticMarkup(createElement(OrganicHighlight));
    expect(html).toContain('href="#biologico"');
    expect(html).toContain('Logo biologico dell’Unione europea');
    expect(html).toContain('2022');
    expect(html).not.toContain('1998');
    expect(brand.foundedYear).toBe('2022');
  });
  it('keeps the real upright bottle and uses supplied art as decoration only', () => {
    const html = renderToStaticMarkup(createElement(Hero));
    expect(html).toContain('images/bottle.jpg');
    expect(html).toContain('brand/ramo-olivo.webp');
    expect(html).not.toContain('1998');
    expect(html).not.toContain('bottle-backdrop');
  });
});
