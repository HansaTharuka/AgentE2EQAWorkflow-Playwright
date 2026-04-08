# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo-checkout/AC1-cart-review.spec.ts >> AC1: Cart Review >> AC1-02: Verify cart pricing is calculated correctly
- Location: tests/saucedemo-checkout/AC1-cart-review.spec.ts:51:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.summary_total')
Expected substring: "$55.97"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.summary_total')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "3"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bolt T-Shirt
            - generic [ref=e36]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e37]:
              - generic [ref=e38]: $15.99
              - button "Remove" [ref=e39] [cursor=pointer]
        - generic [ref=e40]:
          - generic [ref=e41]: "1"
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bike Light
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e46]:
              - generic [ref=e47]: $9.99
              - button "Remove" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - button "Go back Continue Shopping" [ref=e50] [cursor=pointer]:
          - img "Go back" [ref=e51]
          - text: Continue Shopping
        - button "Checkout" [ref=e52] [cursor=pointer]
  - contentinfo [ref=e53]:
    - list [ref=e54]:
      - listitem [ref=e55]:
        - link "Twitter" [ref=e56] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e57]:
        - link "Facebook" [ref=e58] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e59]:
        - link "LinkedIn" [ref=e60] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e61]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | // spec: specs/saucedemo-checkout-test-plan.md
  2   | // Suite 1: AC1 - Cart Review (5 tests)
  3   | // Validates cart display, pricing, navigation, and item removal
  4   | 
  5   | import { test, expect } from '@playwright/test';
  6   | 
  7   | test.describe('AC1: Cart Review', () => {
  8   |   test.beforeEach(async ({ page }) => {
  9   |     // Login before each test
  10  |     await page.goto('https://www.saucedemo.com');
  11  |     await page.locator('[data-test="username"]').fill('standard_user');
  12  |     await page.locator('[data-test="password"]').fill('secret_sauce');
  13  |     await page.locator('[data-test="login-button"]').click();
  14  |     await expect(page).toHaveURL(/.*inventory.html/);
  15  |   });
  16  | 
  17  |   test('AC1-01: Verify cart displays correct items and quantities', async ({ page }) => {
  18  |     // Add Sauce Labs Backpack ($29.99) to cart
  19  |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  20  |     await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  21  | 
  22  |     // Add Sauce Labs Bolt T-Shirt ($15.99) to cart
  23  |     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  24  |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  25  | 
  26  |     // Add Sauce Labs Bike Light ($9.99) to cart
  27  |     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  28  |     await expect(page.locator('.shopping_cart_badge')).toContainText('3');
  29  | 
  30  |     // Click shopping cart badge to navigate to cart page
  31  |     await page.locator('a.shopping_cart_link').click();
  32  |     await expect(page).toHaveURL(/.*cart.html/);
  33  | 
  34  |     // Verify all three items are displayed in the cart with correct names
  35  |     await expect(page.locator('.cart_list')).toBeVisible();
  36  |     const cartItems = page.locator('.cart_item');
  37  |     await expect(cartItems).toHaveCount(3);
  38  | 
  39  |     // Verify specific items are present
  40  |     await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
  41  |     await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
  42  |     await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
  43  | 
  44  |     // Verify quantity (QTY) column shows 1 for each item
  45  |     const quantities = page.locator('.cart_quantity');
  46  |     for (let i = 0; i < 3; i++) {
  47  |       await expect(quantities.nth(i)).toContainText('1');
  48  |     }
  49  |   });
  50  | 
  51  |   test('AC1-02: Verify cart pricing is calculated correctly', async ({ page }) => {
  52  |     // Add items: Backpack ($29.99), T-Shirt ($15.99), Bike Light ($9.99)
  53  |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  54  |     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  55  |     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  56  | 
  57  |     // Navigate to cart page
  58  |     await page.locator('a.shopping_cart_link').click();
  59  |     await expect(page).toHaveURL(/.*cart.html/);
  60  | 
  61  |     // Verify each item displays the correct price
  62  |     await expect(page.locator('.inventory_item_price').nth(0)).toContainText('$29.99');
  63  |     await expect(page.locator('.inventory_item_price').nth(1)).toContainText('$15.99');
  64  |     await expect(page.locator('.inventory_item_price').nth(2)).toContainText('$9.99');
  65  | 
  66  |     // Verify subtotal is correct (29.99 + 15.99 + 9.99 = 55.97)
> 67  |     await expect(page.locator('.summary_total')).toContainText('$55.97');
      |                                                  ^ Error: expect(locator).toContainText(expected) failed
  68  |   });
  69  | 
  70  |   test('AC1-03: Verify Continue Shopping button navigates back to inventory', async ({ page }) => {
  71  |     // Add items to cart
  72  |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  73  |     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  74  |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  75  | 
  76  |     // Navigate to cart page
  77  |     await page.locator('a.shopping_cart_link').click();
  78  |     await expect(page).toHaveURL(/.*cart.html/);
  79  | 
  80  |     // Click 'Continue Shopping' button
  81  |     await page.locator('[name="continue-shopping"]').click();
  82  |     await expect(page).toHaveURL(/.*inventory.html/);
  83  | 
  84  |     // Verify cart badge still shows the correct item count
  85  |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  86  |   });
  87  | 
  88  |   test('AC1-04: Verify Checkout button navigates to checkout information page', async ({ page }) => {
  89  |     // Add items to cart
  90  |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  91  |     await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  92  | 
  93  |     // Navigate to cart page
  94  |     await page.locator('a.shopping_cart_link').click();
  95  |     await expect(page).toHaveURL(/.*cart.html/);
  96  | 
  97  |     // Click 'Checkout' button
  98  |     await page.locator('[name="checkout"]').click();
  99  | 
  100 |     // Verify navigation to checkout information page
  101 |     await expect(page).toHaveURL(/.*checkout-step-one.html/);
  102 |     await expect(page.locator('.checkout_info')).toBeVisible();
  103 |   });
  104 | 
  105 |   test('AC1-05: Verify Remove button functionality in cart', async ({ page }) => {
  106 |     // Add Backpack ($29.99) and T-Shirt ($15.99) to cart
  107 |     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  108 |     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  109 |     await expect(page.locator('.shopping_cart_badge')).toContainText('2');
  110 | 
  111 |     // Navigate to cart page
  112 |     await page.locator('a.shopping_cart_link').click();
  113 |     await expect(page).toHaveURL(/.*cart.html/);
  114 |     await expect(page.locator('.cart_item')).toHaveCount(2);
  115 | 
  116 |     // Click Remove button next to Backpack
  117 |     await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  118 | 
  119 |     // Verify Backpack is removed, only T-Shirt remains
  120 |     await expect(page.locator('.cart_item')).toHaveCount(1);
  121 |     await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
  122 |     await expect(page.locator('text=Sauce Labs Backpack')).not.toBeVisible();
  123 | 
  124 |     // Verify cart badge updates to show 1 item
  125 |     await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  126 |   });
  127 | });
  128 | 
```