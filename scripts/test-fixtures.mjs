// Synthetic test assets never remain in the publishable source or final dist.
import { mkdir, writeFile, rm, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import sharp from 'sharp';
const images = 'src/assets/__qa_only',
  entries = [
    'src/content/projects/__qa-one.md',
    'src/content/projects/__qa-two.md',
    'src/content/projects/__qa-draft.md',
  ];
const noteEntries = [
  'src/content/notes/__qa-one.md',
  'src/content/notes/__qa-two.md',
  'src/content/notes/__qa-draft.md',
];
const motion = 'public/__qa_motion';
const ratios = [
  [1200, 1200],
  [1000, 1250],
  [720, 1280],
  [1280, 720],
  [1200, 800],
  [1800, 300],
  [300, 2400],
];
function run(command, args, env = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: { ...process.env, ...env } });
  if (result.status !== 0) throw Error(`${command} ${args.join(' ')} failed`);
}
for (const p of [images, motion, ...entries, ...noteEntries]) {
  try {
    await access(p);
    throw Error(`Refusing to overwrite ${p}`);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}
let failed = false;
try {
  await mkdir(images, { recursive: true });
  for (let i = 0; i < ratios.length; i++) {
    const [width, height] = ratios[i];
    await sharp({
      create: { width, height, channels: 3, background: i % 2 ? '#2457FF' : '#DDE9FF' },
    })
      .png()
      .toFile(`${images}/${i}.png`);
  }
  await mkdir(motion, { recursive: true });
  run('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-f',
    'lavfi',
    '-i',
    'color=c=blue:s=320x180:d=1',
    '-c:v',
    'libvpx-vp9',
    '-an',
    `${motion}/clip.webm`,
  ]);
  for (let i = 0; i < 3; i++) {
    await writeFile(
      noteEntries[i],
      `---\nslug: qa-note-${i}\ntitle: Synthetic article ${i}\ndescription: Test-only article for validating the publishing system.\npublishedAt: 2020-01-01\nstatus: ${i === 2 ? 'draft' : 'published'}\ntags: [qa]\n---\n\n## A synthetic test\n\nThis temporary article tests rendering. It is never real published writing.\n`,
    );
    const media = (i === 0 ? ratios : [ratios[0]])
      .map(
        (_, j) =>
          `  - src: ../../assets/__qa_only/${j}.png\n    alt: Synthetic QA rectangle ratio ${ratios[j].join(' by ')}\n    caption: Synthetic fixture, never portfolio work.`,
      )
      .join('\n');
    await writeFile(
      entries[i],
      `---\nslug: qa-${i}\ntitle: Synthetic QA ${i}\ncategory: ${i === 1 ? 'Editorial' : 'Experimental'}\nyear: 2026\nclient: Synthetic test fixture — not a client\nrole: Automated layout validation\ndescription: Synthetic fixture for testing only.\ntags: [qa]\nfeatured: false\norder: ${i}\nstatus: ${i === 2 ? 'draft' : 'published'}\nmedia:\n${media}${i === 0 ? '\n  - src: ../../assets/__qa_only/3.png\n    alt: Synthetic silent motion test\n    video:\n      src: /__qa_motion/clip.webm\n      width: 320\n      height: 180\n      hasSpeech: false' : ''}\nseo:\n  title: Synthetic QA ${i}\n  description: Synthetic QA page never intended for publication.\n---\n\n## Test fixture\n\nThis tests image rendering, not portfolio content.\n`,
    );
  }
  run('npm', ['run', 'build']);
  run('npm', ['run', 'validate']);
  run('npm', ['test', '--', '--project=chromium', '--grep', 'synthetic'], {
    QA_FIXTURES: '1',
    CHROMIUM_PATH:
      process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : ''),
  });
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  for (const p of [...entries, ...noteEntries]) await rm(p, { force: true });
  await rm(motion, { recursive: true, force: true });
  await rm(images, { recursive: true, force: true });
  run('npm', ['run', 'build']);
}
if (failed) process.exitCode = 1;
