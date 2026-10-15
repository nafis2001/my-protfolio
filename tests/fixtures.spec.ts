import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('synthetic: complete artwork, case studies, draft exclusion and history filters', async ({
  page,
}) => {
  test.skip(process.env.QA_FIXTURES !== '1', 'Only enabled by the temporary fixture runner');
  await page.goto('/work');
  await expect(page.locator('.gallery article')).toHaveCount(2);
  await page.getByRole('button', { name: 'Editorial', exact: true }).click();
  await expect(page.locator('.gallery article:visible')).toHaveCount(1);
  await expect(page).toHaveURL(/category=Editorial/);
  await page.getByRole('button', { name: 'Experimental', exact: true }).click();
  await page.goBack();
  await expect(page.getByRole('button', { name: 'Editorial', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'All work' }).click();
  await page.getByRole('link', { name: 'Synthetic QA 0' }).click();
  await expect(page.locator('.project-images img')).toHaveCount(7);
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const img of await page.locator('.project-images img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0))
        .toBeTruthy();
      const ratio = await img.evaluate((e: HTMLImageElement) => ({
        rendered: e.getBoundingClientRect().width / e.getBoundingClientRect().height,
        original: Number(e.getAttribute('width')) / Number(e.getAttribute('height')),
      }));
      expect(Math.abs(ratio.rendered - ratio.original)).toBeLessThan(0.01);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    ).toBeTruthy();
  }
  const video = page.locator('video');
  await expect(video).toHaveAttribute('preload', 'none');
  await video.evaluate(async (v: HTMLVideoElement) => {
    await v.play();
    v.pause();
  });
  expect(await video.evaluate((v: HTMLVideoElement) => v.videoWidth)).toBe(320);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  await expect(page.getByRole('link', { name: 'View complete image' })).toHaveCount(7);
  await expect(page.getByRole('link', { name: 'View poster image' })).toHaveCount(1);
  await page.getByRole('link', { name: 'Next project:' }).click();
  await expect(page).toHaveURL(/qa-1/);
  const draft = await page.request.get('/work/qa-2');
  expect(draft.status()).toBe(404);
  await page.goto('/notes');
  await expect(page.locator('.note-list article')).toHaveCount(2);
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Notes' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Synthetic article 0' }).click();
  await expect(page.locator('article')).toContainText('A synthetic test');
  const articleSchemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(
    articleSchemas.map((s) => JSON.parse(s)).some((s) => s['@type'] === 'Article'),
  ).toBeTruthy();
  expect((await page.request.get('/notes/qa-note-2')).status()).toBe(404);
});
