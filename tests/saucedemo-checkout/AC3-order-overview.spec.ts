// spec: specs/saucedemo-checkout-test-plan.md
// Suite 3: AC3 - Order Overview Display (8 tests)
// Validates items summary, pricing, payment/shipping info, and navigation buttons

import { test, expect } from '@playwright/test';

test.describe('AC3: Order Overview', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to Order Overview page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Navigate to cart and checkout
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await page.locator('[name="checkout"]').click();

    // Fill checkout form
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[name="continue"]').click();

    // Verify Order Overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

  test('AC3-01: Verify cart items summary is displayed correctly', async ({ page }) => {
    // Verify items summary section displays all items added to cart
    await expect(page.locator('.summary_info')).toBeVisible();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    // Verify specific items are listed
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();

    // Verify QTY column shows quantity 1 for each item
    const quantities = page.locator('.summary_quantity');
    await expect(quantities.nth(0)).toContainText('1');
    await expect(quantities.nth(1)).toContainText('1');
  });

  test('AC3-02: Verify item prices in order overview', async ({ page }) => {
    // Verify each item in the summary shows the correct price
    const prices = page.locator('.summary_item_price');
    await expect(prices.nth(0)).toContainText('$29.99');
    await expect(prices.nth(1)).toContainText('$15.99');
  });

  test('AC3-03: Verify Payment Information section displays', async ({ page }) => {
    // Verify 'Payment Information:' label is visible
    await expect(page.locator('text=Payment Information:')).toBeVisible();

    // Verify payment method 'SauceCard #31337' is displayed
    await expect(page.locator('text=SauceCard #31337')).toBeVisible();
  });

  test('AC3-04: Verify Shipping Information section displays', async ({ page }) => {
    // Verify 'Shipping Information:' label is visible
    await expect(page.locator('text=Shipping Information:')).toBeVisible();

    // Verify shipping method 'Free Pony Express Delivery!' is displayed
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();
  });

  test('AC3-05: Verify Price total calculation is correct', async ({ page }) => {
    // Items: Backpack ($29.99) and T-Shirt ($15.99) = $45.98
    // Tax is approximately 8% of subtotal = $3.68
    // Total = $45.98 + $3.68 = $49.66

    // Verify 'Item total: $45.98' is displayed
    await expect(page.locator('text=Item total: $45.98')).toBeVisible();

    // Verify 'Tax: $3.68' is displayed (approximately 8% of subtotal)
    await expect(page.locator('text=Tax: $3.68')).toBeVisible();

    // Verify 'Total: $49.66' is displayed
    await expect(page.locator('text=Total: $49.66')).toBeVisible();
  });

  test('AC3-06: Verify Cancel button on Order Overview returns to checkout', async ({ page }) => {
    // Click Cancel button
    await page.locator('[name="cancel"]').click();

    // Verify user is navigated back to Checkout Information page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  });

  test('AC3-07: Verify Finish button proceeds to order completion', async ({ page }) => {
    // Click Finish button
    await page.locator('[name="finish"]').click();

    // Verify user is navigated to checkout-complete.html (Order Completion page)
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.checkout_complete_container')).toBeVisible();
  });

  test('AC3-08: Verify totals with multiple items', async ({ page }) => {
    // Add third item and navigate back to overview
    // First, go back to inventory to add more items
    await page.locator('[name="cancel"]').click();
    await page.locator('[name="cancel"]').click();
    await page.locator('[name="continue-shopping"]').click();

    // Add 3rd item: Bike Light ($9.99)
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Navigate back to Order Overview
    await page.locator('a.shopping_cart_link').click();
    await page.locator('[name="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[name="continue"]').click();

    // Verify Order Overview displays all 3 items
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);

    // Verify Item total shows $55.97 (29.99 + 15.99 + 9.99)
    await expect(page.locator('text=Item total: $55.97')).toBeVisible();

    // Verify Tax is calculated on $55.97 (approximately $4.48)
    await expect(page.locator('text=Tax: $4.48')).toBeVisible();
  });
});
