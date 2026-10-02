import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

// Build-time HTML generation only. GitHub Pages needs no Node server or auth.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const { html, head } = render();
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
    throw new Error('Prerender placeholders are missing.');
  }
  await writeFile('dist/index.html', template.replace('<!--app-head-->', head).replace('<!--app-html-->', html));
  await writeFile('dist/.nojekyll', '');
} finally {
  await server.close();
}
