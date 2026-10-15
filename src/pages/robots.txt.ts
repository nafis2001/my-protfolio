import type { APIRoute } from 'astro';
import { site } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(
    site.launchReady
      ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap-index.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
