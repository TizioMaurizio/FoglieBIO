import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CheckoutDrawer } from '../src/components/CheckoutDrawer';
import { PackSelector } from '../src/components/PackSelector';
import { LandingPage } from '../src/components/LandingPage';
import { getStripeTestCheckoutUrl, getTestOffer, requireStripeTestUrl, stripeTest } from '../src/services/stripeTest';
import { render } from '../src/entry-server';
import type { Language } from '../src/data/shopCopy';

describe('Antonio single/triple offer and EU + Switzerland checkout', () => {
  it.each([0,-1,1.5,2,4,5,6,7,12,Infinity,NaN])('rejects unsupported bottle count %s', count => {
    expect(() => getStripeTestCheckoutUrl(count)).toThrow();
  });
  it.each(['https://buy.stripe.com/liveExample','http://buy.stripe.com/test_example','https://buy.stripe.com.attacker.example/test_example','https://user:password@buy.stripe.com/test_example','https://buy.stripe.com:8443/test_example','https://buy.stripe.com/test_example?locale=fr','https://buy.stripe.com/test_example?redirect=https://attacker.example','javascript:alert(1)'])('rejects non-approved base URL %s', url => {
    expect(() => requireStripeTestUrl(url)).toThrow();
  });
  it('rejects a runtime language outside the supported set', () => {
    expect(() => getStripeTestCheckoutUrl(1,'fr' as Language)).toThrow();
  });
  it('applies Antonio’s 8% exactly once to three bottles at EUR 42.50', () => {
    expect(stripeTest.baseUnitAmountCents).toBe(4250);
    expect(stripeTest.offers.map(offer => [offer.bottles,offer.amountCents,offer.discountPercent])).toEqual([[1,4250,0],[3,11730,8]]);
    for (const offer of stripeTest.offers) {
      expect(offer.amountCents).toBe(Math.round(stripeTest.baseUnitAmountCents * offer.bottles * (100-offer.discountPercent)/100));
      expect(getTestOffer(offer.bottles)).toEqual(offer);
    }
    expect(getTestOffer(3).amountCents / 3).toBe(3910);
    expect(3 * 4250 - getTestOffer(3).amountCents).toBe(1020);
    expect(stripeTest.approvalStatus).toBe('antonio_pricing_preview');
  });
  it('maps every pack and language to its own fixed-price hosted checkout', () => {
    const urls = new Set();
    for (const language of ['it','en'] as const) for (const offer of stripeTest.offers) {
      const url = new URL(getStripeTestCheckoutUrl(offer.bottles,language));
      expect(url.origin + url.pathname).toBe(offer.links[language].url);
      expect(url.search).toBe('?locale=' + language);
      urls.add(url.origin + url.pathname);
    }
    expect(urls.size).toBe(4);
  });
  it('contains EU27 plus Switzerland, without enabling the UK or Norway', () => {
    expect([...stripeTest.allowedShippingCountries].sort()).toEqual(['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','CH'].sort());
    expect(stripeTest.paymentMethods).toEqual(['card','satispay']);
  });
  it.each(['it','en'] as const)('renders the correct 3-bottle total and link in %s', language => {
    const html = renderToStaticMarkup(createElement(CheckoutDrawer,{quantity:3,setQuantity:()=>{},language,onClose:()=>{}}));
    expect(html).toContain('href="' + getStripeTestCheckoutUrl(3,language) + '"');
    expect(html).toContain(language === 'it' ? '123,20' : '123.20');
    expect(html).toContain(language === 'it' ? 'senza rinnovo automatico' : 'No automatic renewal');
    expect(html).not.toContain('PayPal');
    expect([...html.matchAll(/type="radio"/g)]).toHaveLength(2);
    expect(html).not.toContain('<select');
    expect(html).not.toContain('role="status"');
  });
  it('fails closed on an invalid pack rather than rendering a payment link', () => {
    const html = renderToStaticMarkup(createElement(CheckoutDrawer,{quantity:4,setQuantity:()=>{},onClose:()=>{}}));
    expect(html).toContain('role="alert"');
    expect(html).not.toContain('href="https://buy.stripe.com/');
  });
  it.each(['it','en'] as const)('makes the triple promotion visible even when one bottle is selected in %s', language => {
    const html = renderToStaticMarkup(createElement(CheckoutDrawer,{quantity:1,setQuantity:()=>{},language,onClose:()=>{}}));
    expect(html).toContain(language === 'it' ? '39,10' : '39.10');
    expect(html).toContain(language === 'it' ? '10,20' : '10.20');
    expect(html).toContain('−8%');
    expect(html).toContain(language === 'it' ? 'anche sul primo ordine' : 'including your first order');
    expect(html.indexOf('shop-pack-badge')).toBeLessThan(html.indexOf('checkout-totals'));
    expect(html).toContain('href="' + getStripeTestCheckoutUrl(1,language) + '"');
  });
  it('keeps the page and drawer radio groups independent', () => {
    const html = renderToStaticMarkup(createElement('div',null,
      createElement(PackSelector,{quantity:1,onChange:()=>{},language:'it'}),
      createElement(PackSelector,{quantity:1,onChange:()=>{},language:'it'})));
    const names = [...html.matchAll(/<input\b[^>]*name="([^"]+)"/g)].map(match=>match[1]);
    expect(names).toHaveLength(4);
    expect(new Set(names).size).toBe(2);
  });
});
describe('Restored presentation and translated checkout', () => {
  it.each(['it','en'] as const)('renders complete %s navigation and matching checkout offers', language => {
    const html = renderToStaticMarkup(createElement(LandingPage,{language}));
    expect([...html.matchAll(/type="radio"/g)]).toHaveLength(2);
    expect(html).toContain(language === 'it' ? 'Svizzera' : 'Switzerland');
    expect(html).toContain(language === 'it' ? '39,10' : '39.10');
    expect(html).toContain('href="' + import.meta.env.BASE_URL + 'en/"');
    expect(html).toContain('id="composizione"');
    expect(html).toContain('id="faq"');
    expect(html).toContain('brand/eu-organic-logo.jpg');
    expect(html).not.toMatch(/class="newsletter"|id="newsletter-email"/);
    for(const id of ['inizio','biologico','foglie','origine','storia','composizione','prodotto','scheda-prodotto','faq']) {
      expect(html.split('id="' + id + '"')).toHaveLength(2);
    }
    expect(html).toContain('class="timeline"');
    expect(html).toContain('class="founder section-space"');
    expect(html).toContain('images/antonio-berti-800.jpg');
    expect(html).toContain('images/azienda-antonio-1536.jpg');
    expect(html).toContain('class="compound-grid"');
    expect(html).toContain('1998');
    expect(html).toContain('2013');
    expect(html).toContain('2022');
    expect([...html.matchAll(/<h1[ >]/g)]).toHaveLength(1);
    expect(html.indexOf('id="storia"')).toBeLessThan(html.indexOf('id="prodotto"'));
    expect(html).toContain(language === 'it' ? 'Dalla terra.' : 'From the soil.');
    expect(html).toContain(language === 'it' ? 'Oleuropeina' : 'Oleuropein');
    expect(html).not.toContain('month supply');
    expect(html).not.toContain('mesi di trattamento');
    if(language === 'en') {
      expect(html).toContain('Your pack');
      expect(html).toContain('Privacy notice');
      expect(html).not.toMatch(/Acquista|Dati di spedizione|Informativa privacy|Confezione/);
    }
  });
  it('prerenders translated metadata with two language routes and no commercial Offer schema', () => {
    const italian = render('it');
    const english = render('en');
    expect(italian.head).toContain('hreflang="en"');
    expect(english.head).toContain('rel="canonical" href="https://tiziomaurizio.github.io/FoglieBIO/en/"');
    expect(english.head).toContain('en_GB');
    expect(english.head).toContain('noindex,nofollow');
    expect(english.head).not.toContain('"@type":"Offer"');
  });
});
