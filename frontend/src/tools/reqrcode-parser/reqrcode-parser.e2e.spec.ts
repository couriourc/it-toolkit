import { test, expect } from '@playwright/test';

test.describe('Tool - Reqrcode parser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reqrcode-parser');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Reqrcode parser - IT Tools');
  });

  test('', async ({ page }) => {

  });
});