import { test, expect } from '@playwright/test';

test.describe('Tool - Rss subscribor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rss-subscribor');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Rss subscribor - IT Tools');
  });

  test('', async ({ page }) => {

  });
});