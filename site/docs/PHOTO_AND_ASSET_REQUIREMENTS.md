# Photography and assets

No fake farm, founder, plant, lifestyle image or fictional bottle was created. The only generated asset is the abstract typographic social card, with no documentary content.

## Usable now

| Asset                                    | Source                                                                                                                                    | Use / limitations                                                                                                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/bottle.jpg` (1080 × 1488) | [Official bottle photograph](https://www.laruotabio.it/wp-content/uploads/2025/11/Immagine-WhatsApp-2025-11-21-ore-18.26.02_48448aaa.jpg) | Real product in hero, strip, product panel and checkout. Original pixels retained. CSS framing removes excess white space; every instance is upright, with a subtle CSS floor shadow in the large product views. No AI bottle or cutout was made. |
| `public/images/label.jpg` (448 × 521)    | [Official label image](https://www.laruotabio.it/wp-content/uploads/2025/11/Immagine-WhatsApp-2025-11-21-ore-18.26.23_6eaabc7e.jpg)       | Full label displayed without cropping or enlargement in the leaf profile; not represented as a farm photograph.                                                                                  |
| `public/og.png`                          | One generated typography-only card                                                                                                        | Social metadata. Brand title, headline and parent brand; cream/olive.                                                                                                                          |
| `public/fonts/`                          | Google Fonts DM Sans and Inter                                                                                                            | Local font loading, weights 400 and 500.                                                                                                                                                       |
| DOCX embedded imagery                    | Supplied DOCX                                                                                                                             | Includes repeated logo and small supporting graphics; not suitable as documentary founder/farm photography.                                                                                    |

## Next shoot, in priority order

1. Current bottle front and reverse label: 2400+ px tall, soft side light, neutral background, exact colors and sharp text. Deliver transparent PNG/WebP plus original. Confirm packaging version. Replace hero/purchase asset after checking readability.
2. Additional portrait of Antonio at work in the field: a formal portrait from his official website is now used beside the founder story. A future work portrait would complement it.
3. Antonio working: medium shot and hands, honest process. Use story and advertising.
4. Hand collecting actual olive leaves: portrait and horizontal. Use the origin steps only if this is the real process.
5. Macro olive leaf: 1600 × 1600 and wide 2400 × 1400. Could complement the full original label now displayed.
6. Additional farm/olive environment photography: the farm panorama from Antonio’s homepage now appears in the origin section; an actual olive harvest view would add process detail.
7. Fresh leaves after collection: detail and overhead. Origin section.
8. Laboratory/preparation/processing and bottling: actual location, permissions, no staged invented technique. Origin and educational content.
9. Bottle with serving glass: verify official dose first; vertical and wide. Future use section.
10. Bottle on a real table and packaging closeups: 2000+ px, natural light. Product detail / Meta formats.

Capture horizontal, portrait and square whenever possible. Provide subject/location/date, image rights and consent to publish identifiable people. Contextual bottle image mentioned in the brief was not present as an attachment; no generic substitute was downloaded. Avoid text baked into documentary photos. Keep originals; export WebP/AVIF sizes after selection without changing the label or bottle proportions.

## Layout and palette review

The flat green on the original bottle sticker has modal RGB (90, 120, 60), **#5A783C**. It was sampled from `bottle.jpg` in two side-label regions: x300–322/y810–1000 and x792–815/y700–870. Lighting, JPEG edges and lettering create other shades; this value is a pixel-sampled brand match, not a claim about a printer’s physical ink specification. `--label-green` in `src/styles/globals.css` is the single primary token. White on this green has a calculated contrast ratio of 5.02:1; cream #F4F3EB on it is 4.51:1.

The original image files are unmodified. `Bottle` uses a CSS frame corresponding to source coordinates x272–853/y90–1384, keeping the entire cap, bottle, label and base. No image rotation, reconstructed packaging or generated product photo is used. The previous 300% leaf enlargement was removed; the full label is displayed at up to 260 CSS pixels, below its 448-pixel native width. Layout rules for the hero, bottle, leaf profile and product panel are centralized in `src/styles/product-layout.css`.

## Material from Antonio Berti’s official website — 2 October 2026

Selected and imported at the user’s explicit request. Images are unchanged source JPEGs; responsive variants were downloaded from the source’s existing `srcset`, not generated or reconstructed. Copyright remains with the original owners. No photographer or open license was stated in the inspected page metadata. Source pages are linked visibly beside the photographs.

| Current local asset | Exact source | Placement |
|---|---|---|
| `images/antonio-berti-800.jpg` | https://www.antonioberti.it/website/wp-content/uploads/2025/11/Antonio-Berti-800x1202.jpg | Founder portrait, original 800 × 1202, 147 KB |
| `images/antonio-berti-500.jpg` | https://www.antonioberti.it/website/wp-content/uploads/2025/11/Antonio-Berti-500x751.jpg | Smaller portrait variant, 60 KB |
| `images/azienda-antonio-1536.jpg` | https://www.antonioberti.it/website/wp-content/uploads/2025/06/antonioberti_home_slide-1536x864.jpg | Origin section farm panorama, 1536 × 864, 219 KB |
| `images/azienda-antonio-800.jpg` | https://www.antonioberti.it/website/wp-content/uploads/2025/06/antonioberti_home_slide-800x450.jpg | Smaller farm variant, 70 KB |

Portrait and panorama both appear on https://www.antonioberti.it/. Farm background is documented at https://www.antonioberti.it/a-roda-dea-sega-25-anni-di-agricoltura-bio-senza-compromessi/ and biography at https://www.antonioberti.it/la-mia-storia/. The farm image is not described as an olive grove or proof of a specific harvesting process. The waterwheel and vegetable-basket images were also inspected but not added, to keep the page focused. Family/school photographs were not reused.

The requested green arch behind the hero bottle has been removed from both markup and CSS. The upright original bottle and subtle floor shadow remain.
