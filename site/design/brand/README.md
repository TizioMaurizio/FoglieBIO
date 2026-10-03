# Foglie Bio Plus brand library

Received from the user on 3 October 2026. All 27 original PNGs were moved from the workspace root `assets/` into descriptive folders under `originals/`, with byte-for-byte SHA-256 verification. Original filenames, dimensions, alpha data and hashes remain in `manifest.json`. One identical duplicate is preserved separately. Nothing from this source library is copied wholesale into the public deployment.

## Folders

- `logos/`: the supplied circular brand emblem.
- `decorations/`, `illustrations/`, `icons/`, `badges/`: reusable brand elements.
- `campaigns/`, `lettering/`, `buttons/`, `patterns/`, `frames/`: retained creative variants; not all are appropriate for the live page.
- `reference-only/`: assets with **1998** text, excluded from product branding following the user's correction to **2022**.
- `duplicates/`: the second copy of the same emblem, preserved without data loss.
- `official/`: the unmodified EU organic logo downloaded from the European Commission.

## Web exports and live use

`npm run assets:brand` uses Sharp for deterministic resizing/encoding only, preserving transparency and content. It writes optimized assets to `public/brand/`; `web-exports.json` lists the files, dimensions and sizes. Brand graphics total about 538 KiB across all eight WebP variants; visitors only download the variants actually used. Source PNGs total much more and remain outside `public/`.

| Asset | Live use |
|---|---|
| Emblem | Header, footer and favicon |
| Right olive branch | Decorative hero corner; no bottle background |
| Leaf illustration | Botanical story; labelled as an illustration |
| Origin Italy emblem | Product visual, referring to the Italian olive leaves |
| Process symbols | Decorative support for the HTML process steps |
| Gold olive divider | Closing CTA |
| Official EU organic logo | Hero, organic section and product purchase information |

Banner mockups with composited farm/product scenes and baked text remain in the source library. Documentary farm, Antonio portrait and bottle photography are unchanged. Interactive text/buttons remain HTML for responsiveness and accessibility.

## Organic logo provenance

Official page: https://agriculture.ec.europa.eu/farming/organic-farming/organic-logo_en

Source archive: https://agriculture.ec.europa.eu/document/download/f7fc7161-4703-4387-9923-7c0867e9776b_en?filename=eu-organic-logo-jpg-format.zip

Selected file: `logo_jpg/EU_Organic_Logo_Colour_rgb.jpg`. It is copied without recoloring, cropping, stylizing or merging with the brand emblem. Its green remains distinct from the website's sticker green #5A783C.

The user explicitly confirmed the product's organic status on 3 October 2026. This is recorded as an owner confirmation, not an independent registry verification. No updated certificate number, expiry or product control-body code was supplied; none is invented or inferred from the older distributor certificate. For packaging/label artwork, populate the appropriate verified product control code and agricultural origin required by the official logo rules. The old operator PDF remains historical research evidence.
