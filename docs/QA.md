# Verification evidence

Tests ran in the cloud machine on Node 24 using the installed system Chromium through Playwright. These are local lab results with no original portfolio artwork loaded; rerun after real content and hosting are available.

## Passed

- Astro strict type check: 0 errors, 0 warnings, 0 hints.
- ESLint and static production build.
- Built-page validator: 8 pages, 119 local links, JSON-LD parse checks, sitemap and robots structure.
- Six core Chromium tests: main routes and axe WCAG 2/2.1/2.2 AA rules, responsive layouts, accessible mobile navigation, controls/export, contact draft preparation, reduced motion, touch interaction, and no-JavaScript reading/contact navigation.
- Responsive overflow checks: 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920 and 2560 pixels; the 768px test uses a short 400px landscape viewport.
- Separate synthetic fixture suite: two temporary published test entries plus a draft; category filtering, URL state and browser back, case-study links, seven complete media ratios (1:1, 4:5, 9:16, 16:9, 3:2, 6:1 and 1:8), image dimensions/loading at 320/768/1440px, axe on a populated case study, next-project navigation, and draft 404 exclusion. Fixtures are removed in a finally block and clean output rebuilt. Image proportions are compared against original width/height attributes; responsive raster dimensions can round by a pixel.
- SVG export: actual downloadable XML with user-entered markup escaped as text; keyboard and touch accent positioning; reset and presets.
- Contact: verified mailto and telephone links; form generates a draft and explicit email-app link. No message delivery was attempted or claimed.
- npm production dependency audit: 0 reported vulnerabilities at implementation time.
- Desktop homepage and Blue Room screenshots inspected; narrow-mobile homepage inspected. Missing glyphs and ice-blue text contrast issues were corrected.

## Lighthouse local measurements

| Audit               | Mobile | Desktop |
| ------------------- | -----: | ------: |
| Performance         |     99 |     100 |
| Accessibility       |    100 |     100 |
| Best Practices      |    100 |     100 |
| SEO                 |     66 |      66 |
| LCP                 | 1.66 s |  0.37 s |
| CLS                 | 0.0018 |  0.0063 |
| Total blocking time |   0 ms |    0 ms |

Reports are retained locally in `.lighthouse/` (ignored from Git). SEO is intentionally reduced by noindex/robots blocking and the unset real public canonical domain. Do not remove those safeguards to manufacture a higher audit score. These measurements are lab results, not real-user Core Web Vitals or INP. Lighthouse/axe do not establish full accessibility conformance.

## Not verified or not available

- Firefox and WebKit: Playwright browser download was denied by network policy (cdn.playwright.dev). Configurations remain available for future testing. Chromium mobile viewport/touch simulation is not a real iPhone, Android device, or Safari test.
- Actual project artwork and motion assets: not supplied. Synthetic rectangles validate layout only; no original portfolio collection or client outcomes are claimed. Native MP4/WebM support is implemented; synthetic WebM playback is checked separately. Actual motion artwork has not been supplied.
- Current official Cloudflare plan terms and external documentation: proxy 403 prevented reading. Recheck linked official sources before deployment.
- Public preview, Cloudflare integration, Google Search Console, indexing, rich-result eligibility, real email client delivery, field metrics, and production hosting performance: not performed. GitHub source delivery is recorded in the task handoff; no GitHub Actions run has been inspected.
- No notes articles exist. Notes stays unindexed and outside navigation/sitemap. The notes collection and Article renderer are now implemented and validated with temporary synthetic writing.
- Main core test run intentionally skips the fixture test unless QA_FIXTURES=1; the separate fixture runner executes it. It is not counted as an extra passing core test.

## Reproduce

Run `npm run check`, `npm run lint`, `npm run build`, `npm run validate`, then `CHROMIUM_PATH=/usr/bin/chromium npm test -- --project=chromium` on this cloud machine. Run `npm run test:fixtures` for populated-gallery validation. Use `CHROME_PATH=/usr/bin/chromium npx lighthouse http://127.0.0.1:4321 --chrome-flags='--headless --no-sandbox'` for a fresh local audit; add `--preset=desktop` for desktop. Browser processes and reports must correspond to the current build.

## Follow-up validation

The project schema now supports native motion media, with required caption paths for spoken content. The temporary fixture runner additionally creates a one-second silent WebM and two published test articles plus a draft. It verifies actual video decoding, article navigation/JSON-LD and draft exclusion, then removes all generated material and rebuilds clean output. The static validator now checks local source and poster URLs in addition to links. `npm run launch:check` intentionally fails until approved portfolio work, a real canonical domain and enabled production indexing are present.
