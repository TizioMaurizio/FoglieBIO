import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
assert.match(html, /<html lang="it">/);
assert.match(html, /<main/);
assert.match(html, /Dalla terra\./);
assert.match(html, /rel="canonical" href="https:\/\/tiziomaurizio.github.io\/FoglieBIO\/"/);
assert.match(html, /https:\/\/tiziomaurizio.github.io\/FoglieBIO\/og.png/);
assert.doesNotMatch(html, /chatgpt\.site|signin-with-chatgpt|<!--app-html-->|<!--app-head-->/);
const assetPaths = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1]);
for (const url of new Set(assetPaths)) {
  assert.ok(url.startsWith('/FoglieBIO/'), `Asset escapes project base: ${url}`);
  const path = resolve(root, url.slice('/FoglieBIO/'.length));
  assert.ok(path.startsWith(root + sep));
  assert.ok((await stat(path)).isFile(), `Missing asset: ${url}`);
}
await stat(resolve(root, '.nojekyll'));
for (const file of await readdir(resolve(root, 'assets'))) {
  if (!file.endsWith('.css')) continue;
  const css = await readFile(resolve(root, 'assets', file), 'utf8');
  for (const match of css.matchAll(/url\(["']?([^\)"']+)/g)) {
    const url = match[1];
    if (url.startsWith('data:')) continue;
    assert.ok(url.startsWith('/FoglieBIO/'), `CSS asset escapes project base: ${url}`);
    const path = resolve(root, url.slice('/FoglieBIO/'.length));
    assert.ok(path.startsWith(root + sep));
    assert.ok((await stat(path)).isFile(), `Missing CSS asset: ${url}`);
  }
}
console.log(`Static HTML, public access and ${new Set(assetPaths).size} local asset paths verified.`);
