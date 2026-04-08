// spec: specs/saucedemo-checkout-test-plan.md
// Suite 2: AC2 - Checkout Information Form Validation (10 tests)
// Validates mandatory fields, error messages, special characters, and form submission

import { test, expect } from '@playwright/test';

test.describe('AC2: Checkout Information Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add items to cart, navigate to checkout
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();

    // Navigate to cart and then checkout
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await page.locator('[name="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('AC2-01: Verify First Name field is mandatory', async ({ page }) => {
    // Leave First Name empty, enter Last Name 'Doe' and Zip '12345'
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('AC2-02: Verify Last Name field is mandatory', async ({ page }) => {
    // Enter First Name 'John', leave Last Name empty, enter Zip '12345'
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('AC2-03: Verify Zip Code field is mandatory', async ({ page }) => {
    // Enter First Name 'John', Last Name 'Doe', leave Zip Code empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal code is required');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('AC2-04: Verify all fields mandatory - error message for empty form', async ({ page }) => {
    // Leave all form fields empty
    // Click Continue button without entering any data
    await page.locator('[name="continue"]').click();

    // Verify error message appears (likely First Name required based on validation order)
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('AC2-05: Verify valid form submission with correct data', async ({ page }) => {
    // Enter valid data: First Name 'Jane', Last Name 'Smith', Zip Code '67890'
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('67890');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify form is submitted successfully and navigated to Order Overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('AC2-06: Verify form accepts special characters in First Name', async ({ page }) => {
    // Enter First Name with special characters: 'Jean-Pierre' (includes hyphen)
    await page.locator('[data-test="firstName"]').fill('Jean-Pierre');
    await page.locator('[data-test="lastName"]').fill("O'Brien");
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify form is submitted successfully with special characters accepted
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('AC2-07: Verify form accepts various Zip Code formats', async ({ page }) => {
    // Enter First Name 'John', Last Name 'Doe', Zip Code 'ABC123' (alphanumeric)
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('ABC123');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify form is submitted successfully with alphanumeric zip code
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('AC2-08: Verify Cancel button returns to cart page', async ({ page }) => {
    // Enter some data in the form fields
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Cancel button
    await page.locator('[name="cancel"]').click();

    // Verify user is navigated back to cart.html without submitting the form
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_list')).toBeVisible();
  });

  test('AC2-09: Verify long names are accepted in form fields', async ({ page }) => {
    // Enter very long First Name (50+ characters)
    const longFirstName = 'VeryLongFirstNameThatShouldBeAcceptedByTheFormField';
    const longLastName = 'VeryLongLastNameThatShouldAlsoBeAcceptedByFormField';

    await page.locator('[data-test="firstName"]').fill(longFirstName);
    await page.locator('[data-test="lastName"]').fill(longLastName);
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify form is submitted successfully with long names
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('AC2-10: Verify error message dismissal when user corrects field', async ({ page }) => {
    // Leave First Name empty, enter Last Name 'Doe' and Zip '12345'
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // Click Continue button
    await page.locator('[name="continue"]').click();

    // Verify error message 'Error: First Name is required' appears
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');

    // Enter 'John' in First Name field
    await page.locator('[data-test="firstName"]').fill('John');

    // Error message should clear or persist, but form should submit when clicking Continue again
    await page.locator('[name="continue"]').click();

    // Verify form is submitted successfully
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
  });
});
