import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render, renderPrivacy } = await server.ssrLoadModule('/src/entry-server.tsx');
  const { policies } = await server.ssrLoadModule('/src/data/policies.ts');
  const { SITE_URL } = await server.ssrLoadModule('/src/config/site.ts');
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) throw new Error('Missing prerender placeholders.');
  const styles = [...template.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(match => match[0]).join('\n');
  for (const language of ['it', 'en']) {
    const directory = 'dist/' + (language === 'en' ? 'en/' : '');
    await mkdir(directory, {recursive:true});
    const {html,head,title} = render(language);
    await writeFile(directory + 'index.html', template.replace('<html lang="it">','<html lang="' + language + '">').replace(/<title>[^<]*<\/title>/, '<title>' + title + '</title>').replace('<!--app-head-->',head).replace('<!--app-html-->',html));
    for (const page of ['privacy','terms','cookies']) {
      const canonical = SITE_URL + (language === 'en' ? 'en/' : '') + page + '.html';
      await writeFile(directory + page + '.html','<!doctype html><html lang="' + language + '"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + policies[language][page].title + ' — Foglie Bio Plus®</title><link rel="canonical" href="' + canonical + '">' + styles + '</head><body>' + renderPrivacy(language,page) + '</body></html>');
    }
  }
  await writeFile('dist/.nojekyll','');
} finally { await server.close(); }
