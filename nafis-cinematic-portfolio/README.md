# NAFIS / Cinematic Creative Portfolio

A custom, responsive Next.js App Router portfolio starter for **Nafis Ibn Masud**, with Supabase-backed project editing, a contact inbox and SEO-ready routes. **Behance:** https://www.behance.net/nafis24

> IMPORTANT: This is a source-code starter, not an already deployed website. NPM packages could not be installed in the creation environment, so the site has not passed an actual build, Lighthouse run, or end-to-end browser QA. The appearance and features need testing before production use. Some requested advanced features are not implemented (listed below). Seed projects are *editorial demonstration entries* and their project images are stylized CSS artwork, NOT copied from Behance or verified as live client work.

## Quick start

1. Install **Node.js 22+**, clone/unzip this project and run `npm install`.
2. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to your production URL, and add your Supabase URL and publishable/anon key.
3. Create a Supabase project. Execute `supabase/schema.sql` in SQL editor once (on an empty project). Ensure email/password authentication is enabled.
4. Create your user through Supabase Authentication -> Users. Then execute `insert into public.owner_roles (user_id) values ('<your-auth-user-uuid>');` from a trusted SQL editor. NEVER add owner roles from browser code.
5. Add `SUPABASE_SERVICE_ROLE_KEY` in server-only environment variables so the contact handler can save submissions and enforce atomic rate limits. Never prefix it with `NEXT_PUBLIC_`.
6. To enable contact emails, configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender domain) and `CONTACT_OWNER_EMAIL`. Without these, contact submissions are saved in the database but no email is sent.
7. Run `npm run dev` and visit http://localhost:3000. Owner area: `/admin/login`.
8. Run `npm run typecheck`, `npm run build`, and test all pages before deploying. In Vercel, import the repo as Next.js, add the same environment variables, then deploy. Configure your custom domain and update `NEXT_PUBLIC_SITE_URL`.

## Editing content

- **Projects:** Sign in to `/admin` -> Projects. Add, edit, publish or delete. Use a unique lowercase slug and upload approved cover images to Supabase Storage or provide a URL. Content updates appear on `/work` after revalidation. Drafts remain private.
- **Site copy:** Admin -> Settings edits the hero, availability, Behance URL and CV URL. The hero and CV views are linked to settings. Other footer/social links are currently static and should be made settings-driven before launch.
- **Enquiries:** Admin -> Inbox. Submissions are validated server-side, stored with owner-only access, marked read/unread and optionally emailed.
- **Services, testimonials, clients, articles:** Tables and public fetch logic exist for some content; full admin CRUD controls are not yet provided.
- **Media:** The project editor supports cover upload to the public `portfolio` bucket. Supabase does not automatically optimize images by uploading; use pre-optimized artwork. Automatic AVIF/WebP variants and media drag-reordering are not built yet.
- **Project narrative:** The schema supports media galleries, body blocks, results, SEO titles and publication dates, but the current admin form edits a subset. The remaining fields may be edited in Supabase Studio until additional CMS controls are built.
- **Portrait:** Replace the portrait placeholder in `app/about/page.tsx` with your approved photo.
- **Testimonials:** Placeholder examples remain unpublished to avoid fabricated endorsements.
- **Resume:** Upload your verified CV PDF to Storage and save its URL in Admin -> Settings.

## Architecture

- `app/` — server-rendered pages, route handlers and server actions
- `components/` — reusable React components for navigation, portfolio, filtering, galleries, form and admin
- `lib/` — typed data adapters, Supabase clients, SEO and demo data
- `supabase/schema.sql` — database entities, indexes, RLS policies and public storage policies
- `supabase/seed.json` — labeled editorial sample content (not inserted automatically)
- `app/globals.css` — design tokens, both themes, layout system and component states

## Database reference

`owner_roles`: user_id (UUID, primary key, Auth foreign key).
`clients`: id, name, slug, logo_url, website, sort_order, published, created_at.
`projects`: id, title, slug, summary, category, tags[], client, client_id -> clients, year, role, tools[], duration, deliverables[], cover_image, gallery JSON, body_blocks JSON, challenge, approach, solution, results, featured, sort_order, status, published_at, seo_title, seo_description, timestamps.
`services`: id, title, slug, description, deliverables[], turnaround, starting_price, sort_order, published, created_at.
`testimonials`: id, quote, author, role, company, published, sort_order, created_at.
`journal_posts`: id, title, slug, excerpt, body_blocks, cover_image, status, published_at, seo fields, created_at.
`site_settings`: id=1, hero_title, hero_description, available, social_links JSON, theme JSON, cv_url, seo_defaults JSON, updated_at.
`contact_submissions`: id, name, email, project_type, budget, timeline, project_link, message, consent, read, created_at.
`contact_rate_limits`: hashed IP, window_start, attempts.

Public SELECT uses RLS to expose only published content. Admin writes require a verified owner ID. Inbox and rate limit rows are not publicly accessible; the contact API uses a server-side service role after validation and atomic rate limiting.

## Style guide

- **Primary (ice white):** `#d4f8ff`; **accent cyan:** `#51d9ff`.
- **Dark background:** `#071019`; **surface:** `#101f2c`; **text:** `#effaff`; **muted:** `#94acbb`.
- **Light background:** `#f3f8fb`; **surface:** `#ffffff`; **text:** `#132b39`.
- Typography: system sans stack, editorial display sizes with `clamp`, tight headlines, body line-height 1.62.
- Layout: 1280px max-width, responsive 12-column work grid, 8px-centric spacing, 18px corner radius, 44+ px controls.
- Image approach: bespoke typographic CSS study cards until genuine approved project images are available. Avoid stock photography.

## QA checklist (run before launch)

- [ ] Install packages successfully and run TypeScript/build without errors.
- [ ] Test routes: `/`, `/work`, dynamic case studies, `/about`, `/services`, `/process`, `/testimonials`, `/contact`, `/resume`, `/privacy`, `/admin`, `/admin/login`, 404.
- [ ] Create Supabase owner; verify non-owners cannot access or edit dashboard content.
- [ ] Add, edit, publish, and delete a project; verify it appears/disappears on public pages.
- [ ] Test text search, multi-category filters, year/client, sort, load more and shareable query URLs.
- [ ] Submit valid and invalid contacts; verify spam honeypot, rate limit, database inbox and email provider.
- [ ] Run keyboard/screen-reader review, color-contrast audit, reduced-motion checks.
- [ ] Test responsive layout at 360 / 768 / 1024 / 1440 / 1920px.
- [ ] Run PageSpeed Insights / Lighthouse on production and optimize to 90+ in all four categories.
- [ ] Verify LCP under 2.5s, CLS under 0.1, INP under 200ms on real devices.
- [ ] Verify sitemap, robots, canonical, OG tags, project metadata and structured data.
- [ ] Replace all editorial placeholders with approved artwork, truthful case-study outcomes, licensed photos and permissioned testimonials.

## Gaps against the complete requested specification

This deliverable intentionally does **not** claim feature parity with every requested advanced feature. Missing: full CRUD screens for all content types, scheduled-publish controls, rich block editor, autosave, drag-to-reorder media, image transformations, live preview, video captions generation, before/after comparison slider, automated testimonial slider, journal route/editor, privacy-friendly analytics, custom animated page transitions, file attachment on contacts, client logo assets, downloadable verified CV, dynamic OG image generation, and email delivery verification. A production launch also requires a complete authenticated security audit, end-to-end tests and a real build.
