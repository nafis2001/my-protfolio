import { readFile, readdir } from 'node:fs/promises';
const failures = [];
const home = await readFile('dist/index.html', 'utf8');
if (/noindex/.test(home))
  failures.push(
    'Production still has noindex. Enable PUBLIC_LAUNCH_READY only after content approval.',
  );
if (home.includes('example.invalid'))
  failures.push('Set SITE_URL to the verified public HTTPS domain and rebuild.');
if (home.includes('CONTENT PENDING')) failures.push('Add approved original portfolio work.');
const work = await readdir('dist/work', { withFileTypes: true });
if (!work.some((f) => f.isDirectory())) failures.push('No case studies are published.');
if (work.some((f) => f.name.startsWith('qa-')))
  failures.push('Synthetic QA fixtures must never be launched.');
const robots = await readFile('dist/robots.txt', 'utf8');
if (!robots.includes('Allow: /') || !robots.includes('Sitemap: https://'))
  failures.push('Production robots must allow indexing and name the real sitemap.');
if (failures.length) {
  console.error('Launch is blocked:\n' + failures.map((f) => '- ' + f).join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Automated launch gates passed. Manual rights, real-device, contact-client, hosting terms, and publication approval checks are still required.',
  );
