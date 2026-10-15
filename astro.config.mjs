import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync } from 'node:fs';
if (existsSync('.env')) process.loadEnvFile('.env');
const site = process.env.SITE_URL || 'https://example.invalid';
if (
  process.env.PUBLIC_LAUNCH_READY === 'true' &&
  (!site.startsWith('https://') || new URL(site).hostname.endsWith('.invalid'))
) {
  throw new Error('Launch requires SITE_URL set to the actual public HTTPS hostname.');
}
export default defineConfig({
  site,
  integrations: [sitemap({ filter: (page) => !/^\/notes\/?$/.test(new URL(page).pathname) })],
  output: 'static',
});
