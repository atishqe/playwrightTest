import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function login(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test=username]', 'standard_user');
  await page.fill('[data-test=password]', 'secret_sauce');
  await page.click('[data-test=login-button]');
}

test.use({ viewport: { width: 1440, height: 900 } });
test.describe('E2E Tests for Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Verify Z-A sorting', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'za');
    const itemNames = await page.$$eval('.inventory_item_name', items =>
      items.map(item => item.textContent)
    );
    const sorted = [...itemNames].sort().reverse();
    expect(itemNames).toEqual(sorted);
  });

  test('Verify price high-low sorting', async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');
    const itemPrices = await page.$$eval('.inventory_item_price', items =>
      items.map(item => item.textContent ? parseFloat(item.textContent.replace('$', '')) : 0)
    );
    const sorted = [...itemPrices].sort((a, b) => b - a);
    expect(itemPrices).toEqual(sorted);
  });

  test('Add items and complete checkout', async ({ page }) => {
    await login(page);
    await page.click('text=Add to cart', { timeout: 3000 });
    await page.click('text=Add to cart', { timeout: 3000 });

    await page.click('[data-test=shopping-cart-link]');
    await page.click('[data-test=checkout]');
    await page.fill('[data-test=firstName]', 'Atish');
    await page.fill('[data-test=lastName]', 'Garg');
    await page.fill('[data-test=postalCode]', '12345');
    await page.click('[data-test=continue]');
    await expect(page.locator('.summary_info')).toBeVisible();
    await page.click('[data-test=finish]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('Check accessibility violations on inventory page', async ({ page }) => {
    await login(page);
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.length).toBeLessThan(5);
  });

  test('Visual regression for inventory page', async ({ page }) => {
    await login(page);
    expect(await page.screenshot()).toMatchSnapshot('inventory-page.png', { maxDiffPixels: 500 });
  });
})


