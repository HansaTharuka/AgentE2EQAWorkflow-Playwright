// spec: specs/saucedemo-checkout-test-plan.md
// Suite 4: AC4 - Order Completion (6 tests)
// Validates completion page, success message, confirmation details, and navigation

import { test, expect } from '@playwright/test';

test.describe('AC4: Order Completion', () => {
  test.beforeEach(async ({ page }) => {
    // Complete full checkout process to reach Order Completion page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to cart and checkout
    await page.locator('a.shopping_cart_link').click();
    await page.locator('[name="checkout"]').click();

    // Fill checkout form with valid data
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[name="continue"]').click();

    // Verify Order Overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // Click Finish button to complete order
    await page.locator('[name="finish"]').click();

    // Verify Order Completion page is displayed
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });

  test('AC4-01: Verify Order Completion page displays after checkout', async ({ page }) => {
    // Verify page URL is correct
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    // Verify completion container is visible
    await expect(page.locator('.checkout_complete_container')).toBeVisible();
  });

  test('AC4-02: Verify success message is displayed', async ({ page }) => {
    // Verify page title shows 'Checkout: Complete!'
    await expect(page.locator('head > title')).toContainText('Checkout: Complete');

    // Verify heading 'Thank you for your order!' is displayed
    await expect(page.locator('h2.complete-header')).toContainText('Thank you for your order!');
  });

  test('AC4-03: Verify order confirmation message displays delivery information', async ({ page }) => {
    // Verify confirmation message contains delivery details
    const confirmationText = page.locator('.complete-text');
    await expect(confirmationText).toContainText('Your order has been dispatched');
    await expect(confirmationText).toContainText('Pony Express');
  });

  test('AC4-04: Verify Pony Express image is displayed', async ({ page }) => {
    // Verify Pony Express image is displayed on the page
    const ponyImage = page.locator('img[alt="Pony Express"]');
    await expect(ponyImage).toBeVisible();
  });

  test('AC4-05: Verify Back Home button navigates to inventory', async ({ page }) => {
    // Click 'Back Home' button
    await page.locator('[name="back-to-products"]').click();

    // Verify user is navigated back to inventory.html
    await expect(page).toHaveURL(/.*inventory.html/);

    // Verify inventory page loads with products displayed
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // Verify cart is cleared (badge should not be visible)
    const cartBadge = page.locator('.shopping_cart_badge');
    // Cart badge either doesn't exist or is not visible when empty
    const badgeVisible = await cartBadge.isVisible().catch(() => false);
    if (badgeVisible) {
      await expect(cartBadge).not.toContainText(/\d+/);
    }
  });

  test('AC4-06: Verify order page URL is correct', async ({ page }) => {
    // Verify page URL is 'https://www.saucedemo.com/checkout-complete.html'
    const url = page.url();
    await expect(url).toMatch(/https:\/\/www\.saucedemo\.com\/checkout-complete\.html/);
  });
});
