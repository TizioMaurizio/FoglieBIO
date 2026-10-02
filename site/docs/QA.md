# Quality assurance

GitHub Pages migration: TypeScript, ESLint, all 15 commerce tests and static build checks passed. The built page was served locally under `/FoglieBIO/`; canonical metadata, all four rendered product-image instances and hydrated checkout opening/Escape close were verified in Chrome. CSS/font paths were checked against the emitted files. The deployment workflow repeats these validations on every push.

The earlier Sites/vinext/Cloudflare toolchain has been removed for GitHub Pages. The maintained app is now plain Vite/React with prerendered static HTML; no authentication helper is shipped.

Automated checks cover integer totals, one/multiple bottles, quantity limits, malformed prices, required fields, email, Italian CAP/province, phone and unsupported countries. Service tests verify all four demo payment methods without network access, rejection of disabled offers, rejection of real sessions, newsletter validation/consent, empty real-review source and disabled subscriptions.

Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` with Node 22+. The current GitHub Pages build uses Vite and a build-time React prerender step. Browser extensions that inject `bis_skin_checked` and similar attributes can trigger React development hydration warnings; these are not product data and should not be suppressed in application code.

Manual browser matrix: desktop 1440/1920, tablet 768, mobile 360/390/430. Check hero/strip, product, footer, no horizontal scrolling, real image loading, sticky navigation, mobile menu, internal anchors, carousel manual/pause, FAQ, product details, modal focus/Escape/return focus, empty/invalid forms, successful checkout, back/cancel and newsletter demo. Do not enter real personal or financial data.

Reduced motion: CSS disables transitions/animations. The carousel checks the browser's preference before starting. No parallax, scroll hijacking or external tracking is installed. Native dialog traps focus and makes the page behind it inert; close restores focus. Below-fold images are lazy, with explicit dimensions; the hero is eager/high priority. Fonts are local with swap. Product images total approximately 335 KB and are shared across repeated uses. No numerical Lighthouse/Core Web Vitals claim is made without a measured production audit.

Production release remains blocked by the business/content/legal items in the other documents. The demonstration is intentionally noindex and has no product Offer or fabricated rating schema.

## Execution results

- TypeScript: passed. ESLint: passed with zero warnings on application and full project checks.
- Vitest: 15 tests passed, including four no-network payment-method flows.
- Build: The original build was validated before migration. The new GitHub Pages build is additionally checked for static HTML, local assets under `/FoglieBIO/`, canonical/social URLs and no authentication code.
- Browser: real Chrome inspection at 360, 390, 430, 768, 1440 and 1920 px. DOM widths show no horizontal overflow; headline text fits its mask at every tested width. Hero visually inspected at desktop and 390 px; checkout and footer at mobile.
- All internal anchor targets resolve; all four rendered photograph instances load.
- Desktop checkout tested with empty fields, invalid email/CAP, quantity 1→2, €45.90→€85.90 illustrative totals, valid fictional data, PayPal/Google Pay selection, back navigation, success and explicit no-payment message.
- Mobile menu/product navigation, checkout reopening with cleared fields, Escape close and restored purchase-button focus verified.
- FAQ expansion and newsletter empty/valid demo submission verified in browser.
- Reduced-motion rules reviewed in source; browser preference emulation was not available through this session's browser interface. Screen-reader hardware/software and Lighthouse scores were not measured.

## Sample-only privacy regression checks

The editable-form scenarios above describe the earlier demonstration. The public demo now uses read-only fixtures; visitors no longer enter their own details. New tests check readonly/autocomplete attributes, policy links before fields, no newsletter marketing checkbox, rejection of non-fixture data, hosting disclosure and the composition anchor. The static build validates the standalone privacy page and its absence of scripts.

Privacy update validation: TypeScript and ESLint passed; 20 tests passed. The built app was checked in Chrome: product-panel click reaches `#composizione`, all 9 checkout identity/address fields are read-only with autocomplete off, checkout completes without typing, newsletter simulation succeeds with its fixed address, and the standalone privacy page opens and fits a 390 px viewport. The emitted privacy HTML has no application scripts.

## Layout review

Checked 360, 390, 430, 768, 1024, 1440 and 1920 px in Chrome: no horizontal overflow; all headline masks fit their text; all bottle and bottle-photo transforms are `none`; the label is never displayed wider than its source. Visually reviewed desktop hero and the corrected leaf section, mobile hero, leaf section and purchase panel. Fixed the mobile product title joining “Foglie” and “Bio” when a line break was hidden. Checkout open/Escape close still works. Original photo bytes and privacy behavior are unchanged.

## Antonio photography update

Verified local responsive farm/portrait assets load in Chrome, with no horizontal overflow at 360, 390, 430, 768, 1440 and 1920 px. The hero has zero `.bottle-backdrop` elements at every width. Desktop origin/founder layouts and mobile founder layout were visually reviewed. The build validates every `srcset` variant as well as ordinary image/CSS paths. Photograph pixels are unchanged; only CSS display framing is used.
