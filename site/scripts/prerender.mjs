import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

// Build-time HTML generation only. GitHub Pages needs no Node server or auth.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render, renderPrivacy } = await server.ssrLoadModule('/src/entry-server.tsx');
  const { html, head } = render();
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
    throw new Error('Prerender placeholders are missing.');
  }
  await writeFile('dist/index.html', template.replace('<!--app-head-->', head).replace('<!--app-html-->', html));
  await writeFile('dist/.nojekyll', '');
  const styles = [...template.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(match => match[0]).join('\n');
  const { SITE_URL } = await server.ssrLoadModule('/src/config/site.ts');
  await writeFile('dist/privacy.html', `<!doctype html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Privacy e dati personali — Foglie Bio Plus®</title><meta name="description" content="Come funzionano la demo, i moduli con dati fittizi e l’hosting di Foglie Bio Plus."><link rel="canonical" href="${SITE_URL}privacy.html">${styles}</head><body>${renderPrivacy()}</body></html>`);
} finally {
  await server.close();
}
