# Free static deployment

No connected Cloudflare account or deployment tool is available in this session. No public preview or production deployment has been performed. The repository’s origin is nafis2001/my-protfolio; the remote was empty at initial inspection. The owner explicitly authorized source delivery to main. See the task handoff for the verified push outcome.

## GitHub

Review changes and ensure no client-private artwork or credentials are present. Commit the implementation and push to the intended branch of `nafis2001/my-protfolio` only after confirming the destination. GitHub integration can then build the static site. The CI workflow runs npm ci, type checking, lint, production build, local-link/metadata validation, Chromium tests, and synthetic media/article tests. It installs Playwright Chromium and FFmpeg on the runner. No secrets are needed for the build.

## Cloudflare Pages

Verify current official Pages Free terms and limits before enabling deployment:

- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

These documentation domains were blocked by the cloud network during implementation, so current free-tier quotas and terms could not be independently confirmed. The site uses no functions, storage, database, workers, or paid service.

1. Sign in to Cloudflare and choose Workers & Pages → create a Pages project → connect GitHub.
2. Select exactly `nafis2001/my-protfolio`. Use production branch main once the reviewed source is pushed. Do not replace an existing project.
3. Framework Astro; build command `npm run build`; output `dist`; root directory repository root; Node 24 (or a compatible version >=22.12).
4. Set `SITE_URL=https://<chosen-project>.pages.dev`. Keep `PUBLIC_LAUNCH_READY=false` on the first preview. Preview builds should remain false even after production launches.
5. Deploy only after authorization. Verify the returned HTTPS URL: home, work, lab, contact, 404, fonts, PNG social image, sitemap, robots, canonical and noindex. Check email/phone on a real device. This is the verification that establishes a public preview; a local process does not.
6. Complete launch content review, then enable `PUBLIC_LAUNCH_READY=true` only for production and rebuild. This enables indexing; it is not a guarantee of discovery.
7. Keep pages.dev for a $0 launch. A custom domain is optional and may cost money; do not purchase one for this task. If you already own a domain, add it in Pages custom domains, follow its DNS instructions, set SITE_URL to that exact HTTPS hostname, rebuild, and redirect alternate public hosts to prevent duplication.

## Launch checklist

- [ ] Original approved artwork uploaded; no content-pending presentation presented as finished work
- [ ] Case-study details, image rights, dates, roles and descriptions verified
- [ ] Contact email/telephone approved and tested in actual email/phone clients
- [ ] Social profiles added only if verified; no unsupported claims
- [ ] SITE_URL points to the actual deployment; all canonicals and sitemap use it
- [ ] PNG social cards checked with an actual share preview (SVG source retained for editing)
- [ ] Mobile Chromium, Firefox, Safari/WebKit and real iOS/Android checked
- [ ] Build, check, lint, link/metadata, axe, interaction and image-ratio checks pass
- [ ] Lighthouse audited again with real artwork and production hosting
- [ ] Preview deployment inspected and final public publication explicitly authorized
- [ ] Production indexing enabled only when content is ready; draft/notes routes stay excluded
- [ ] Search Console verification and sitemap submission completed by owner

## Headers

`public/_headers` applies basic static security headers on Cloudflare. The site does not use third-party scripts or analytics. No cookie banner is needed for the current local-only preferences and no tracking setup; reassess if services change.
