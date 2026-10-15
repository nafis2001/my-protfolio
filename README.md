# Nafis — The Attention Studio

An independent designer’s static Astro + strict TypeScript portfolio. Electric cobalt, warm gallery paper, editorial typography, and a lightweight SVG composition playground. No accounts, database, paid API, or server runtime required.

## Run locally

Use Node 22.12+ (Node 24 tested).

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --host 0.0.0.0
npm run check
npm run lint
npm run build
npm run validate
npm run preview -- --host 0.0.0.0
```

Astro 7 runs its preview as a managed background process. `ASTRO_TELEMETRY_DISABLED=1 npx astro preview status` and `... preview stop` manage it. Development and preview processes must restart in future cloud tasks. Use the existing checkout; no Git worktree is necessary.

## Browser checks

```sh
npx playwright install chromium firefox webkit
# The optional synthetic motion fixture suite also requires FFmpeg.
npm test
# This cloud machine already provides Chromium:
CHROMIUM_PATH=/usr/bin/chromium npm test -- --project=chromium
```

Playwright tests cover static routes, axe accessibility, 11 viewport widths, mobile menu, reduced motion, contact draft preparation, keyboard poster manipulation, and SVG export with escaped user text. Browser downloads may need network access to cdn.playwright.dev. Real iOS/Android testing is still recommended.

## Content and launch status

No original portfolio artwork was provided. No fictional projects are published. The project schema, gallery, category filtering, complete-image links, and case-study renderer are implemented; project-level validation is exercised with temporary, clearly labeled synthetic test fixtures. The empty notes route is intentionally unindexed; a schema-validated article system is ready and Notes joins navigation after two genuine articles are published. Native motion media supports MP4/WebM with poster images and captions requirements.

Verified contact: nafisivnamasud@gmail.com and +880 1600 120307. Change these in `src/lib/site.ts` and the phone link in `src/pages/contact.astro`. The form opens an email draft, not a delivery service. No information is submitted to this site.

The site defaults to **noindex** and robots disallow while content is incomplete. Never enable launch mode without the checklist below. Canonicals default to example.invalid until SITE_URL is configured.

- [Content workflow](docs/CONTENT.md)
- [Deployment and launch checklist](docs/DEPLOYMENT.md)
- [Remaining steps in order](docs/NEXT-STEPS.md)
- [SEO and 90-day growth plan](docs/SEO.md)
- [Validation evidence and limitations](docs/QA.md)
- [Research and design decisions](docs/RESEARCH.md)

## Architecture

- `src/pages`: static routes, robots endpoint, dynamic published case-study routes
- `src/content.config.ts`: schema-validated Markdown projects
- `src/components/Gallery.astro`: stable source-order adaptive gallery; intrinsic image proportions
- `src/scripts/blue-room.ts`: loaded only on /lab, local-only controls and SVG export
- `src/layouts/Layout.astro`: shared navigation, fonts, canonical/social metadata, JSON-LD, motion preference
- `src/styles/global.css`: tokens, responsive layouts and reduced-motion rules
- `public/licenses`: full font licenses; fonts self-hosted through build

## Costs and rights

No paid dependencies or ongoing infrastructure required. Intended hosting is a free Cloudflare Pages static project on pages.dev; account and current plan eligibility must be checked at deployment. Space Grotesk, Instrument Serif, Manrope and IBM Plex Mono use SIL OFL 1.1, verified from installed package licenses. A tiny DejaVu symbol subset uses the accompanying permissive font license. Do not upload client work without publication rights.
