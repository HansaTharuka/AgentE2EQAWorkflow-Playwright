// spec: specs/saucedemo-checkout-test-plan.md
// Suite 1: AC1 - Cart Review (5 tests)
// Validates cart display, pricing, navigation, and item removal

import { test, expect } from '@playwright/test';

test.describe('AC1: Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('AC1-01: Verify cart displays correct items and quantities', async ({ page }) => {
    // Add Sauce Labs Backpack ($29.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('1');

    // Add Sauce Labs Bolt T-Shirt ($15.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');

    // Add Sauce Labs Bike Light ($9.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('3');

    // Click shopping cart badge to navigate to cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Verify all three items are displayed in the cart with correct names
    await expect(page.locator('.cart_list')).toBeVisible();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);

    // Verify specific items are present
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();

    // Verify quantity (QTY) column shows 1 for each item
    const quantities = page.locator('.cart_quantity');
    for (let i = 0; i < 3; i++) {
      await expect(quantities.nth(i)).toContainText('1');
    }
  });

  test('AC1-02: Verify cart pricing is calculated correctly', async ({ page }) => {
    // Add items: Backpack ($29.99), T-Shirt ($15.99), Bike Light ($9.99)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Navigate to cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Verify each item displays the correct price
    await expect(page.locator('.inventory_item_price').nth(0)).toContainText('$29.99');
    await expect(page.locator('.inventory_item_price').nth(1)).toContainText('$15.99');
    await expect(page.locator('.inventory_item_price').nth(2)).toContainText('$9.99');

    // Verify subtotal is correct (29.99 + 15.99 + 9.99 = 55.97)
    await expect(page.locator('.summary_total')).toContainText('$55.97');
  });

  test('AC1-03: Verify Continue Shopping button navigates back to inventory', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');

    // Navigate to cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Click 'Continue Shopping' button
    await page.locator('[name="continue-shopping"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // Verify cart badge still shows the correct item count
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  });

  test('AC1-04: Verify Checkout button navigates to checkout information page', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('1');

    // Navigate to cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Click 'Checkout' button
    await page.locator('[name="checkout"]').click();

    // Verify navigation to checkout information page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(page.locator('.checkout_info')).toBeVisible();
  });

  test('AC1-05: Verify Remove button functionality in cart', async ({ page }) => {
    // Add Backpack ($29.99) and T-Shirt ($15.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('.shopping_cart_badge')).toContainText('2');

    // Navigate to cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // Click Remove button next to Backpack
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify Backpack is removed, only T-Shirt remains
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Backpack')).not.toBeVisible();

    // Verify cart badge updates to show 1 item
    await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  });
});
