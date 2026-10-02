# Foglie Bio Plus

Premium Italian landing page and demonstration storefront. React 19, TypeScript, Tailwind 4, Lucide and Vite. The deployment is a **static GitHub Pages site**, with no server, ChatGPT login, Cloudflare Worker or Sites dependency.

Public URL: **https://tiziomaurizio.github.io/FoglieBIO/**

## Run and build

Node 22+ is required. From the Git repository root:

```sh
cd site
npm ci
npm run dev
```

The development URL includes `/FoglieBIO/`. The project base is configured in `vite.config.ts`; `assetUrl()` in `src/config/site.ts` keeps product photographs inside that base. Vite rewrites font/CSS paths. On the original Windows workstation, a temporary Node 22 runtime is available at `../work/node.exe` if the system Node is still version 20.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

The build emits `dist/`. A build-time prerender step includes the page text, product/organization schema, Italian metadata, canonical URL and social tags in `index.html`. The browser hydrates the same React components. GitHub serves files only; no Node runtime or authentication is required. `check-static-build.mjs` verifies the base paths, built assets, prerendered content and absence of the previous authentication origin.

## Git and deployment

The repository is `TizioMaurizio/FoglieBIO`; the only `.git` lives at the workspace root. Run Git commands from the root or `site/`, with the same result.

Push to `main` to deploy through `.github/workflows/pages.yml`. The workflow installs locked dependencies, runs TypeScript/lint/tests, builds static HTML and uploads **only `site/dist`**. Repository Settings → Pages must use **GitHub Actions** as the build source.

## Structure

| Location | Purpose |
|---|---|
| `index.html`, `src/main.tsx` | Static document and React hydration entry |
| `src/entry-server.tsx`, `scripts/prerender.mjs` | Build-time rendering and metadata |
| `src/styles/` | Editorial design, responsive behavior and motion |
| `src/components/`, `src/sections/` | Reusable UI, storytelling and checkout |
| `src/data/` | Product, brand, FAQ, history and schema |
| `src/config/` | Public origin, asset base and integration modes |
| `src/services/` | Typed mock providers, validation and integer totals |
| `public/images/`, `public/fonts/` | Local original product photography and licensed fonts |
| `public/og.png` | Typographic social card |
| `tests/`, `docs/` | Commerce tests and launch documentation |

## Demo checkout

Click **Acquista** or **Acquista ora**, change quantity and continue with the prefilled, read-only example details. The demo never asks for the visitor’s real name, address, phone or email. Select a payment method and press **Concludi — Demo checkout**. The final screen confirms no payment, order or email occurred.

Newsletter simulation also uses a fixed `demo@example.com` address. Both mock providers reject customer details or email addresses different from the synthetic fixtures in `src/data/demo.ts`. No marketing consent is collected by the demo.

An explicit privacy notice appears before checkout and newsletter fields. The standalone, script-free [`privacy.html`](https://tiziomaurizio.github.io/FoglieBIO/privacy.html) explains demo behavior, GitHub Pages IP logging, links to the official La Ruota Bio policy and GDPR work needed before live collection. Its wording is not a certification of compliance. The product introduction link “Conosci il prodotto” targets `#composizione`.

The public product price is unconfirmed. Only the drawer shows illustrative amounts (€40 per bottle and €5.90 shipping). These are not approved commercial offers. Payment, shipping, stock and analytics remain mocked.

Live integration modes fail closed until adapters are implemented. GitHub Pages cannot hold server secrets or process payment webhooks: use a separate trusted backend or a hosted commerce checkout when real services are enabled. See [external integrations](docs/EXTERNAL_INTEGRATIONS.md), [content review](docs/CONTENT_AND_CLAIMS_REVIEW.md), [photography](docs/PHOTO_AND_ASSET_REQUIREMENTS.md) and [QA](docs/QA.md).

The demonstration remains `noindex,nofollow` until final product, legal and commercial details are approved. Public access and search indexing are separate settings.
