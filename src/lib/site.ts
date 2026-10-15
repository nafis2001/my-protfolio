export const site = {
  name: 'Nafis',
  email: 'nafisivnamasud@gmail.com',
  profiles: [] as { label: string; url: string }[],
  url: import.meta.env.SITE_URL || 'https://example.invalid',
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
};
export const nav = [
  ['Work', '/work'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Lab', '/lab'],
  ['Contact', '/contact'],
];
