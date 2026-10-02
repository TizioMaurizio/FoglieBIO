import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { CheckoutDrawer } from '../src/components/CheckoutDrawer';
import { Footer } from '../src/sections/Closing';
import { FeatureStrip } from '../src/sections/FeatureStrip';
import { Composition } from '../src/sections/Story';
import { PrivacyPage } from '../src/components/Privacy';

describe('Public demo privacy', () => {
  it('presents the policy before checkout fields and makes personal fields read-only', () => {
    const html = renderToStaticMarkup(createElement(CheckoutDrawer, { quantity: 1, setQuantity: () => {}, optionId: 'single', onClose: () => {} }));
    const fields = [...html.matchAll(/<input\b[^>]*>/g)].map(match => match[0]);
    expect(fields).toHaveLength(9);
    fields.forEach(field => { expect(field).toContain('readOnly=""'); expect(field).toContain('autoComplete="off"'); });
    expect(html.indexOf('privacy.html')).toBeLessThan(html.indexOf('<form'));
    expect(html).toContain('demo@example.com');
  });
  it('does not invite a visitor to supply a real newsletter address or marketing consent', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain('readOnly=""');
    expect(html).toContain('demo@example.com');
    expect(html).not.toContain('type="checkbox"');
    expect(html).toContain('Informativa privacy');
    expect(html.indexOf('privacy.html')).toBeLessThan(html.indexOf('id="newsletter-email"'));
  });
  it('discloses hosting data and separates demo information from the official policy', () => {
    const html = renderToStaticMarkup(createElement(PrivacyPage));
    expect(html).toContain('GitHub Pages');
    expect(html).toContain('indirizzo IP');
    expect(html).toContain('https://www.laruotabio.it/privacy-policy/');
    expect(html).toContain('prima della raccolta di dati reali');
  });
  it('links the product introduction to the composition heading', () => {
    const strip = renderToStaticMarkup(createElement(FeatureStrip));
    const section = renderToStaticMarkup(createElement(Composition));
    expect(strip).toContain('href="#composizione" class="product-panel"');
    expect(section).toContain('id="composizione"');
    expect(section).toContain('id="composition-title"');
  });
});
