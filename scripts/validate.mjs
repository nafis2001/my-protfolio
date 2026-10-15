import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve('dist');
let pages = 0,
  links = 0;
async function walk(dir) {
  for (const f of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) {
      pages++;
      const html = await readFile(p, 'utf8');
      if (!/<title>.+<\/title>/.test(html)) throw Error(`Missing title: ${p}`);
      for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))
        JSON.parse(m[1]);
      for (const m of html.matchAll(/(?:href|src|poster)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
        const target = m[1];
        if (!target || target === '/') continue;
        links++;
        try {
          const { stat } = await import('node:fs/promises');
          let dest = join(root, decodeURIComponent(target));
          const s = await stat(dest);
          if (s.isDirectory()) await stat(join(dest, 'index.html'));
        } catch {
          throw Error(`Broken local link ${target} in ${p}`);
        }
      }
    }
  }
}
await walk(root);
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
const sitemap = await readFile(join(root, 'sitemap-0.xml'), 'utf8');
if (!sitemap.includes('<urlset') || !robots.includes('User-agent:'))
  throw Error('Invalid discovery files');
console.log(
  `Validated ${pages} pages, ${links} local links/assets, JSON-LD syntax, sitemap and robots.txt.`,
);
