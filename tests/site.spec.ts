import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('routes, SEO and accessibility', async ({ page }) => {
  for (const path of ['/', '/work', '/about', '/services', '/contact', '/lab']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});
test('responsive layout and mobile navigation', async ({ page }) => {
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: width === 768 ? 400 : 900 });
    for (const path of ['/', '/work', '/services', '/lab', '/contact']) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${path} at ${width}`,
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('summary').click();
  await page
    .getByRole('navigation', { name: 'Mobile', exact: true })
    .getByRole('link', { name: 'About' })
    .click();
  await expect(page).toHaveURL(/about/);
});
test('playground controls, safe SVG export and keyboard movement', async ({ page }) => {
  await page.goto('/lab');
  await page.locator('#phrase').fill('HELLO <SCRIPT>');
  await expect(page.locator('#type-group')).toContainText('<SCRIPT>');
  await page.locator('#palette').selectOption('paper');
  await expect(page.locator('#poster-bg')).toHaveAttribute('fill', '#F7F7F2');
  const symbol = page.locator('#symbol');
  await symbol.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(symbol).toHaveAttribute('transform', 'translate(550 730)');
  await page.locator('#mode').selectOption('editorial');
  const download = page.waitForEvent('download');
  await page.locator('#export').click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('nafis-blue-room.svg');
  const stream = await file.createReadStream();
  let text = '';
  for await (const chunk of stream!) text += chunk.toString();
  expect(text).toContain('<svg');
  expect(text).toContain('&lt;SCRIPT&gt;');
  expect(text).not.toContain('<script>');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.locator('#phrase')).toHaveValue('MAKE SOME NOISE');
});
test('contact prepares a draft and motion toggle works', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('link', { name: 'nafisivnamasud@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:nafisivnamasud@gmail.com',
  );
  await page.getByLabel('Your name', { exact: true }).fill('Test visitor');
  await page.getByLabel('Your email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('What are you making?').fill('A considered packaging project.');
  await page.getByRole('button', { name: 'Prepare email draft' }).click();
  await expect(page.locator('#form-status')).toContainText('Nothing has been sent');
  await expect(page.locator('#email-draft')).toHaveAttribute(
    'href',
    /mailto:nafisivnamasud@gmail.com\?subject=.*body=/,
  );
  await expect(page.locator('#draft')).toHaveValue(/packaging project/);
  await page.locator('#motion').click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});
test('reduced motion and touch poster', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.locator('.hero-name').evaluate((e) => getComputedStyle(e).animationName)).toBe(
    'none',
  );
  await page.goto('/lab');
  await page.locator('#preset').selectOption('idea');
  await expect(page.locator('#type-group')).toContainText('CURIOUS');
});

test('touch input moves the accent and content works without JavaScript', async ({ browser }) => {
  const touch = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 } });
  const page = await touch.newPage();
  await page.goto('/lab');
  const symbol = page.locator('#symbol');
  await symbol.scrollIntoViewIfNeeded();
  const bounds = (await symbol.boundingBox())!;
  await page.touchscreen.tap(bounds.x + bounds.width / 2 + 8, bounds.y + bounds.height / 2);
  await expect(symbol).not.toHaveAttribute('transform', 'translate(560 730)');
  await page.locator('#phrase').fill('a b c d e f g h i j');
  await expect(page.locator('#type-group')).toContainText('h i j');
  await touch.close();
  const plain = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const basic = await plain.newPage();
  await basic.goto('/');
  await expect(basic.locator('h1')).toContainText('NAFIS');
  await basic.locator('summary').click();
  await basic
    .getByRole('navigation', { name: 'Mobile', exact: true })
    .getByRole('link', { name: 'Contact' })
    .click();
  await expect(basic.getByRole('link', { name: 'nafisivnamasud@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:nafisivnamasud@gmail.com',
  );
  await expect(basic.locator('#inquiry')).toBeHidden();
  await plain.close();
});
