import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Web delivery exports only: no regenerated graphics, background changes or text edits.
const source = 'design/brand/originals/';
const output = 'public/brand/';
await mkdir(output, { recursive: true });
const exports = [
  ['logos/foglie-bio-plus-emblema.png', 'logo-160.webp', 160],
  ['logos/foglie-bio-plus-emblema.png', 'logo-320.webp', 320],
  ['logos/foglie-bio-plus-emblema.png', 'logo-640.webp', 640],
  ['decorations/ramo-angolo-destro.png', 'ramo-olivo.webp', 500],
  ['illustrations/foglie-rugiada.png', 'foglie-olivo.webp', 640],
  ['badges/origine-italia.png', 'origine-italia.webp', 280],
  ['decorations/separatore-oro.png', 'separatore-oro.webp', 1000],
  ['icons/processo-simboli.png', 'processo-icone.webp', 720],
];
const inventory = [];
for (const [input, filename, width] of exports) {
  const info = await sharp(source + input).resize({ width, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(output + filename);
  inventory.push({ source: input, output: filename, width: info.width, height: info.height, bytes: info.size });
}
await sharp(source + 'logos/foglie-bio-plus-emblema.png').resize(128, 128).png().toFile(output + 'favicon.png');
await writeFile('design/brand/web-exports.json', JSON.stringify(inventory, null, 2) + '\n');
console.log(`Exported ${inventory.length} brand images; ${(inventory.reduce((n, item) => n + item.bytes, 0) / 1024).toFixed(0)} KiB total.`);
