# NAFIS — Portfolio operations

Last reviewed: 19 November 2026

## Live services

- Public portfolio: https://nafis-cinematic-portfolio.vercel.app
- GitHub code: https://github.com/nafis2001/my-protfolio/tree/main/nafis-cinematic-portfolio
- Vercel project: nafis-cinematic-portfolio (workspace: nafisivnamasud-1747)
- Framework: Next.js App Router, TypeScript, Node.js 22
- Repository root: nafis-cinematic-portfolio/
- Public artwork: public/portfolio/
- Case study data: lib/demo.ts (used until the CMS has published records)
- Visual tokens and responsive styling: app/globals.css

## Site readiness

The public design portfolio, real image gallery, selected case studies, social contact channels, SEO metadata, sitemap, theme switch and project-brief copier work without third-party API credentials.

The contact page intentionally uses the browser-only brief copier while the server-side enquiry database is unavailable. It **does not silently submit or store enquiries**. Visitors can copy their brief and contact the owner through LinkedIn, Instagram or Behance. The email link appears only when NEXT_PUBLIC_CONTACT_EMAIL is provided.

The owner-only CMS, enquiry storage and optional email notifications remain dependent on configuring Supabase and (for email) a verified sending provider. Do not describe those features as operational until an authenticated end-to-end test passes.

## Deployment status and procedure

At last review, Vercel was authorized for this workspace, but its GitHub OAuth import integration was unavailable. Deployment has been done through Vercel's API, using an install command that fetches the **public** GitHub source into the build machine:

    git clone --depth 1 https://github.com/nafis2001/my-protfolio.git /tmp/nafis-p && cp -a /tmp/nafis-p/nafis-cinematic-portfolio/. . && npm install --no-audit --no-fund

Use npm run build, Node.js 22.x, Next.js framework, and set NEXT_PUBLIC_SITE_URL to https://nafis-cinematic-portfolio.vercel.app.

**Changes pushed to GitHub do not redeploy automatically.** For automatic deployment, connect GitHub to the Vercel account, import this repository, and select nafis-cinematic-portfolio as the root directory, or configure a secure reviewed CI/CD workflow. Do not commit deployment tokens.

## Before enabling the CMS

1. Create or connect a Supabase project owned by the portfolio owner.
2. Review the migration at supabase/schema.sql carefully, then apply it through a trusted authenticated SQL console. It includes row-level security policies, owner roles, media storage and an atomic rate limiter.
3. Populate the production environment with the required Supabase URL, public anon key, and **server-only** service-role key. Do not expose the service-role key to the browser or repository. Confirm all owner role assignments.
4. Import or publish projects and site settings; verify image URLs, ownership, draft visibility, and public query behavior.
5. Test login, logout, CRUD permission rules, file uploads, spam limits and enquiry submissions from separate non-owner sessions.
6. For email, configure RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_OWNER_EMAIL server-side; set up a verified sender domain and test delivery.
7. Enable the CMS only after validation, including legal/privacy review appropriate for collecting enquiries.

## Quality checklist

- All main pages and portfolio images should return HTTP 200
- Contact and social links should lead to the intended destination
- Confirm small-screen hero typography, menu interactions and focus visibility in a real browser
- Check tab order, lightbox keyboard behavior and reduced-motion preference
- Run Lighthouse, axe and cross-browser tests after content changes
- Keep projects accurate; avoid invented client results, testimonials or performance claims
- Use optimized file sizes and descriptive alt text for new artwork
- Update the sitemap and case study metadata when adding new published projects
- Audit dependencies and regenerate a lockfile on a developer workstation when dependency versions change

## Editing content

The portfolio project titles, images and narrative summaries are in lib/demo.ts unless Supabase has published its own data. The homepage wording has fallbacks in lib/settings.ts and can be edited through the CMS once configured. Update both source and public assets together, then verify the live deployment.

Please do not add private customer data, API tokens, passwords or unapproved client work to this public repository.
