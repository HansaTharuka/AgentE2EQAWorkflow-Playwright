// spec: specs/saucedemo-checkout-test-plan.md
// SauceDemo seed file for test setup and login

import { test, expect } from '@playwright/test';

test.describe('SauceDemo Setup', () => {
  test('seed: Login and verify inventory page', async ({ page }) => {
    // Navigate to SauceDemo application
    await page.goto('https://www.saucedemo.com');

    // Enter username in login form
    await page.locator('[data-test="username"]').fill('standard_user');

    // Enter password in login form
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify user is logged in and inventory page is displayed
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
