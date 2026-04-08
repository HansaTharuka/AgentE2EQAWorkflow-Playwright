# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo-checkout/AC1-cart-review.spec.ts >> AC1: Cart Review >> AC1-05: Verify Remove button functionality in cart
- Location: tests/saucedemo-checkout/AC1-cart-review.spec.ts:105:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Sauce Labs Bolt T-Shirt')
Expected: visible
Error: strict mode violation: locator('text=Sauce Labs Bolt T-Shirt') resolved to 2 elements:
    1) <div class="inventory_item_name" data-test="inventory-item-name">Sauce Labs Bolt T-Shirt</div> aka locator('[data-test="item-1-title-link"]')
    2) <div class="inventory_item_desc" data-test="inventory-item-desc">Get your testing superhero on with the Sauce Labs…</div> aka locator('[data-test="inventory-item-desc"]')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Sauce Labs Bolt T-Shirt')

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
        - generic [ref=e14]: "1"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Bolt T-Shirt
            - generic [ref=e27]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e28]:
              - generic [ref=e29]: $15.99
              - button "Remove" [ref=e30] [cursor=pointer]
      - generic [ref=e31]:
        - button "Go back Continue Shopping" [ref=e32] [cursor=pointer]:
          - img "Go back" [ref=e33]
          - text: Continue Shopping
        - button "Checkout" [ref=e34] [cursor=pointer]
  - contentinfo [ref=e35]:
    - list [ref=e36]:
      - listitem [ref=e37]:
        - link "Twitter" [ref=e38] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e39]:
        - link "Facebook" [ref=e40] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e41]:
        - link "LinkedIn" [ref=e42] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e43]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
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
  67  |     await expect(page.locator('.summary_total')).toContainText('$55.97');
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
> 121 |     await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  122 |     await expect(page.locator('text=Sauce Labs Backpack')).not.toBeVisible();
  123 | 
  124 |     // Verify cart badge updates to show 1 item
  125 |     await expect(page.locator('.shopping_cart_badge')).toContainText('1');
  126 |   });
  127 | });
  128 | 
```