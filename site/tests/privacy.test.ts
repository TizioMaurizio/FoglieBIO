import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { CheckoutDrawer } from '../src/components/CheckoutDrawer';
import { ShopFooter } from '../src/components/LandingPage';
import { PrivacyPage } from '../src/components/Privacy';

describe('Preview privacy and selling essentials', () => {
  it.each(['it','en'] as const)('discloses Stripe transmission before leaving the %s page', language => {
    const html = renderToStaticMarkup(createElement(CheckoutDrawer,{quantity:1,setQuantity:()=>{},language,onClose:()=>{}}));
    expect(html).not.toContain('<input');
    expect(html).not.toContain('<form');
    expect(html.indexOf('privacy.html')).toBeLessThan(html.indexOf('href="https://buy.stripe.com/test_'));
    expect(html).toContain(language === 'it' ? 'trasmessi e conservati' : 'transmitted and stored');
    expect(html).toContain('demo@example.com');
  });
  it.each(['it','en'] as const)('removes the newsletter while retaining legal and support links in %s', language => {
    const html = renderToStaticMarkup(createElement(ShopFooter,{language}));
    expect(html).not.toContain('<form');
    expect(html).not.toContain('<input');
    expect(html).not.toContain('newsletter');
    expect(html).toContain('privacy.html');
    expect(html).toContain('terms.html');
    expect(html).toContain('cookies.html');
    expect(html).toContain('info@laruotabio.it');
  });
  it.each(['it','en'] as const)('provides all translated policy pages without pretending that real sales are active in %s', language => {
    for(const page of ['privacy','terms','cookies'] as const) {
      const html = renderToStaticMarkup(createElement(PrivacyPage,{language,page}));
      expect(html).toContain('<h1>');
      expect(html).toContain('https://stripe.com/privacy');
      expect(html).toContain('https://www.laruotabio.it/privacy-policy/');
      expect(html).not.toContain('<form');
    }
    const privacy = renderToStaticMarkup(createElement(PrivacyPage,{language}));
    expect(privacy).toContain('GitHub Pages');
    expect(privacy).toContain(language === 'it' ? 'indirizzo IP' : 'IP addresses');
  });
});
