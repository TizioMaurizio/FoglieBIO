import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
const root = resolve('dist');
const base = process.env.VITE_ASSET_BASE || '/FoglieBIO/';
const pageBase = process.env.VITE_PAGE_BASE || base;
const manifest = JSON.parse(await readFile('src/config/stripe-test.json','utf8'));
const pages = ['index.html','privacy.html','terms.html','cookies.html','en/index.html','en/privacy.html','en/terms.html','en/cookies.html'];
const assetPaths = new Set();
for (const page of pages) {
  const html = await readFile(resolve(root,page),'utf8');
  const language = page.startsWith('en/') ? 'en' : 'it';
  assert.ok(html.includes('<html lang="' + language + '">'), 'Incorrect page language: ' + page);
  assert.match(html, /<main/);
  assert.match(html, /noindex,nofollow/);
  assert.doesNotMatch(html, /chatgpt\.site|signin-with-chatgpt|<!--app-html-->|<!--app-head-->/);
  if(page.endsWith('index.html')) {
    assert.match(html,/id="prodotto"/);
    assert.match(html,/id="composizione"/);
    assert.match(html,/id="faq"/);
    assert.match(html,/hreflang="en"/);
    assert.doesNotMatch(html,/class="newsletter"|id="newsletter-email"/);
    for(const section of ['inizio','biologico','foglie','origine','storia','composizione']) assert.ok(html.includes('id="' + section + '"'), 'Missing restored section: ' + section);
    assert.match(html,/class="timeline"/);
    assert.match(html,/images\/antonio-berti-800\.jpg/);
    assert.match(html,/images\/azienda-antonio-1536\.jpg/);
  } else assert.doesNotMatch(html,/<script/);
  for(const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) assetPaths.add(match[1]);
  for(const match of html.matchAll(/\bsrcset="([^"]+)"/gi)) for(const candidate of match[1].split(',')) assetPaths.add(candidate.trim().split(/\s+/)[0]);
}
for(const url of assetPaths) {
  if (pageBase !== base && url.startsWith(pageBase)) {
    const page = url.slice(pageBase.length);
    if (['', 'en/', 'privacy.html', 'terms.html', 'cookies.html', 'en/privacy.html', 'en/terms.html', 'en/cookies.html'].includes(page)) {
      await stat(resolve(root, page.endsWith('/') || !page ? page + 'index.html' : page));
      continue;
    }
  }
  assert.ok(url.startsWith(base),'Path escapes project base: ' + url);
  const path = resolve(root,url.slice(base.length));
  assert.ok(path === root || path.startsWith(root+sep));
  const info = await stat(path);
  if(info.isDirectory()) await stat(resolve(path,'index.html'));
  else assert.ok(info.isFile());
}
await stat(resolve(root,'.nojekyll'));
const assetFiles = await readdir(resolve(root,'assets'));
for(const file of assetFiles.filter(file=>file.endsWith('.css'))) {
  const css = await readFile(resolve(root,'assets',file),'utf8');
  for(const match of css.matchAll(/url\(["']?([^)"']+)/g)) {
    if(match[1].startsWith('data:')) continue;
    assert.ok(match[1].startsWith(base),'CSS escapes base: '+match[1]);
    await stat(resolve(root,match[1].slice(base.length)));
  }
}
const forbiddenCredential = /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}|\bwhsec_[A-Za-z0-9]{16,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
const urls = new Set();
for(const file of [...pages,...assetFiles.filter(file=>/\.(js|css|json)$/.test(file)).map(file=>'assets/'+file)]) {
  const text = await readFile(resolve(root,file),'utf8');
  assert.doesNotMatch(text,forbiddenCredential,'Credential in public file: '+file);
  for(const match of text.matchAll(/https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+/g)) {
    assert.match(match[0],/^https:\/\/buy\.stripe\.com\/test_[A-Za-z0-9]+$/);
    urls.add(match[0]);
  }
}
const expected = manifest.offers.flatMap(offer=>[offer.links.it.url,offer.links.en.url]).sort();
assert.deepEqual([...urls].sort(),expected);
console.log('Verified 8 localized pages, local assets, ' + expected.length + ' sandbox links, no newsletter and no secret-key patterns.');
