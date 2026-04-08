# SauceDemo E-Commerce Checkout Test Plan (SCRUM-101)

## Application Overview

Comprehensive test plan for the SauceDemo (https://www.saucedemo.com) e-commerce checkout workflow. This plan covers all acceptance criteria for SCRUM-101, including cart review, checkout information form validation, order overview, order completion, and error handling scenarios. The test plan includes happy path scenarios, negative testing for validation errors, edge cases with special characters and boundary values, and navigation flow tests.

## Test Scenarios

### 1. Cart Review (AC1)

**Seed:** `tests/seed.spec.ts`

#### 1.1. AC1-01: Verify cart displays correct items and quantities

**File:** `tests/AC1-Cart-Review/AC1-01-cart-items-display.spec.ts`

**Steps:**
  1. Log in with credentials (standard_user / secret_sauce)
    - expect: User is logged in successfully and inventory page is displayed
  2. Add Sauce Labs Backpack ($29.99) to cart
    - expect: Item added to cart, cart badge shows count
  3. Add Sauce Labs Bolt T-Shirt ($15.99) to cart
    - expect: Item is added successfully
  4. Add Sauce Labs Bike Light ($9.99) to cart
    - expect: Item is added successfully, cart badge updates to show 3 items
  5. Click shopping cart badge to navigate to cart page
    - expect: Cart page (cart.html) is displayed
  6. Verify all three items are displayed in the cart with correct names and descriptions
    - expect: All items appear with accurate product names and descriptions
  7. Verify quantity (QTY) column shows 1 for each item
    - expect: Quantities are correct for all items

#### 1.2. AC1-02: Verify cart pricing is calculated correctly

**File:** `tests/AC1-Cart-Review/AC1-02-cart-pricing.spec.ts`

**Steps:**
  1. Log in and add items: Backpack ($29.99), T-Shirt ($15.99), and Bike Light ($9.99)
    - expect: Items added to cart successfully
  2. Navigate to cart page
    - expect: Cart page is displayed with all items
  3. Verify each item displays the correct price
    - expect: Backpack shows $29.99, T-Shirt shows $15.99, Bike Light shows $9.99
  4. Calculate subtotal manually (29.99 + 15.99 + 9.99 = 55.97)
    - expect: Pricing displayed matches the sum of individual items

#### 1.3. AC1-03: Verify Continue Shopping button navigates back to inventory

**File:** `tests/AC1-Cart-Review/AC1-03-continue-shopping.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in the cart
  2. Navigate to cart page
    - expect: Cart page is displayed
  3. Click 'Continue Shopping' button
    - expect: User is navigated back to inventory.html
  4. Verify cart badge still shows the correct item count
    - expect: Cart persists with items, badge shows the count

#### 1.4. AC1-04: Verify Checkout button navigates to checkout information page

**File:** `tests/AC1-Cart-Review/AC1-04-checkout-navigation.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in the cart
  2. Navigate to cart page
    - expect: Cart page is displayed
  3. Click 'Checkout' button
    - expect: User is navigated to checkout-step-one.html (Checkout Information page)

#### 1.5. AC1-05: Verify Remove button functionality in cart

**File:** `tests/AC1-Cart-Review/AC1-05-remove-item.spec.ts`

**Steps:**
  1. Log in and add Backpack ($29.99) and T-Shirt ($15.99) to cart
    - expect: Both items are in the cart, badge shows 2
  2. Navigate to cart page
    - expect: Cart page shows 2 items
  3. Click Remove button next to Backpack
    - expect: Backpack is removed from cart, only T-Shirt remains
  4. Verify cart badge updates to show 1 item
    - expect: Cart count is updated correctly

### 2. Checkout Information Form Validation (AC2)

**Seed:** `tests/seed.spec.ts`

#### 2.1. AC2-01: Verify First Name field is mandatory

**File:** `tests/AC2-Checkout-Form/AC2-01-firstname-required.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in the cart
  2. Navigate to cart and click Checkout
    - expect: Checkout Information page (checkout-step-one.html) is displayed
  3. Leave First Name field empty, enter Last Name 'Doe' and Zip '12345'
    - expect: Form fields are filled as specified
  4. Click Continue button
    - expect: Form is not submitted, error message 'Error: First Name is required' is displayed

#### 2.2. AC2-02: Verify Last Name field is mandatory

**File:** `tests/AC2-Checkout-Form/AC2-02-lastname-required.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page with items in cart
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John', leave Last Name empty, enter Zip '12345'
    - expect: Form fields are filled as specified
  3. Click Continue button
    - expect: Form is not submitted, error message 'Error: Last Name is required' is displayed

#### 2.3. AC2-03: Verify Zip Code field is mandatory

**File:** `tests/AC2-Checkout-Form/AC2-03-zip-required.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page with items in cart
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John', Last Name 'Doe', leave Zip Code empty
    - expect: Form fields are filled as specified
  3. Click Continue button
    - expect: Form is not submitted, error message 'Error: Postal Code is required' is displayed

#### 2.4. AC2-04: Verify all fields mandatory - error message for empty form

**File:** `tests/AC2-Checkout-Form/AC2-04-all-fields-empty.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page with items in cart
    - expect: Checkout Information page is displayed
  2. Leave all form fields empty (First Name, Last Name, Zip Code)
    - expect: All fields are empty
  3. Click Continue button without entering any data
    - expect: Form is not submitted, error message appears (likely First Name required based on validation order)

#### 2.5. AC2-05: Verify valid form submission with correct data

**File:** `tests/AC2-Checkout-Form/AC2-05-valid-submission.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page with items in cart
    - expect: Checkout Information page is displayed
  2. Enter valid data: First Name 'Jane', Last Name 'Smith', Zip Code '67890'
    - expect: All form fields are filled with valid data
  3. Click Continue button
    - expect: Form is submitted successfully and user is navigated to Order Overview page (checkout-step-two.html)

#### 2.6. AC2-06: Verify form accepts special characters in First Name

**File:** `tests/AC2-Checkout-Form/AC2-06-special-chars-firstname.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name with special characters: 'Jean-Pierre' (includes hyphen)
    - expect: Special character is accepted in First Name field
  3. Enter Last Name 'O'Brien' (includes apostrophe) and Zip '12345'
    - expect: Special character is accepted in Last Name field
  4. Click Continue button
    - expect: Form is submitted successfully with special characters accepted

#### 2.7. AC2-07: Verify form accepts various Zip Code formats

**File:** `tests/AC2-Checkout-Form/AC2-07-zip-formats.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John', Last Name 'Doe', Zip Code 'ABC123' (alphanumeric)
    - expect: Alphanumeric value is accepted in Zip Code field
  3. Click Continue button
    - expect: Form is submitted successfully with alphanumeric zip code

#### 2.8. AC2-08: Verify Cancel button returns to cart page

**File:** `tests/AC2-Checkout-Form/AC2-08-cancel-button.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page with items in cart
    - expect: Checkout Information page is displayed
  2. Enter some data in the form fields (First Name 'John', Last Name 'Doe', Zip '12345')
    - expect: Form fields are populated
  3. Click Cancel button
    - expect: User is navigated back to cart.html without submitting the form

#### 2.9. AC2-09: Verify long names are accepted in form fields

**File:** `tests/AC2-Checkout-Form/AC2-09-long-names.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter very long First Name (50+ characters): 'VeryLongFirstNameThatShouldBeAcceptedByTheFormField'
    - expect: Long name is accepted in First Name field
  3. Enter very long Last Name (50+ characters) and valid Zip '12345'
    - expect: Long name is accepted in Last Name field
  4. Click Continue button
    - expect: Form is submitted successfully with long names

#### 2.10. AC2-10: Verify error message dismissal when user corrects field

**File:** `tests/AC2-Checkout-Form/AC2-10-error-dismissal.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Leave First Name empty, enter Last Name 'Doe' and Zip '12345'
    - expect: Form fields are filled
  3. Click Continue button
    - expect: Error message 'Error: First Name is required' appears
  4. Enter 'John' in First Name field
    - expect: First Name is now filled, error message may disappear or persist
  5. Click Continue button again
    - expect: Form is submitted successfully, user is navigated to Order Overview page

### 3. Order Overview Display (AC3)

**Seed:** `tests/seed.spec.ts`

#### 3.1. AC3-01: Verify cart items summary is displayed correctly

**File:** `tests/AC3-Order-Overview/AC3-01-items-summary.spec.ts`

**Steps:**
  1. Log in and add Backpack ($29.99) and T-Shirt ($15.99) to cart
    - expect: Items are in the cart
  2. Navigate to cart and proceed through checkout form with valid data
    - expect: User reaches Order Overview page (checkout-step-two.html)
  3. Verify items summary section displays all items added to cart
    - expect: Backpack and T-Shirt are listed with correct names and descriptions
  4. Verify QTY column shows quantity 1 for each item
    - expect: Quantities are correctly displayed
  5. Verify Description column shows product information
    - expect: Product descriptions are visible for each item

#### 3.2. AC3-02: Verify item prices in order overview

**File:** `tests/AC3-Order-Overview/AC3-02-item-prices.spec.ts`

**Steps:**
  1. Add items to cart and proceed to Order Overview page
    - expect: Order Overview page is displayed with items
  2. Verify each item in the summary shows the correct price
    - expect: Backpack shows $29.99, T-Shirt shows $15.99

#### 3.3. AC3-03: Verify Payment Information section displays

**File:** `tests/AC3-Order-Overview/AC3-03-payment-info.spec.ts`

**Steps:**
  1. Navigate to Order Overview page
    - expect: Order Overview page is displayed
  2. Verify 'Payment Information:' label is visible
    - expect: Payment Information section header is displayed
  3. Verify payment method 'SauceCard #31337' is displayed
    - expect: Payment card information is shown

#### 3.4. AC3-04: Verify Shipping Information section displays

**File:** `tests/AC3-Order-Overview/AC3-04-shipping-info.spec.ts`

**Steps:**
  1. Navigate to Order Overview page
    - expect: Order Overview page is displayed
  2. Verify 'Shipping Information:' label is visible
    - expect: Shipping Information section header is displayed
  3. Verify shipping method 'Free Pony Express Delivery!' is displayed
    - expect: Shipping information is shown

#### 3.5. AC3-05: Verify Price total calculation is correct

**File:** `tests/AC3-Order-Overview/AC3-05-price-total.spec.ts`

**Steps:**
  1. Add Backpack ($29.99) and T-Shirt ($15.99) to cart (total $45.98)
    - expect: Items are in the cart
  2. Navigate to Order Overview page
    - expect: Order Overview is displayed
  3. Verify 'Item total: $45.98' is displayed
    - expect: Item subtotal is correct
  4. Verify 'Tax: $3.68' is displayed (approximately 8% of subtotal)
    - expect: Tax calculation is reasonable
  5. Verify 'Total: $49.66' is displayed (subtotal + tax)
    - expect: Final total is correct (45.98 + 3.68 = 49.66)

#### 3.6. AC3-06: Verify Cancel button on Order Overview returns to checkout

**File:** `tests/AC3-Order-Overview/AC3-06-cancel-button.spec.ts`

**Steps:**
  1. Navigate to Order Overview page with items
    - expect: Order Overview is displayed
  2. Click Cancel button
    - expect: User is navigated back to Checkout Information page (checkout-step-one.html)

#### 3.7. AC3-07: Verify Finish button proceeds to order completion

**File:** `tests/AC3-Order-Overview/AC3-07-finish-button.spec.ts`

**Steps:**
  1. Navigate to Order Overview page with items
    - expect: Order Overview is displayed with all details
  2. Click Finish button
    - expect: User is navigated to checkout-complete.html (Order Completion page)

#### 3.8. AC3-08: Verify totals with multiple items

**File:** `tests/AC3-Order-Overview/AC3-08-multiple-items-total.spec.ts`

**Steps:**
  1. Add 3 items: Backpack ($29.99), T-Shirt ($15.99), Bike Light ($9.99)
    - expect: All items are in the cart
  2. Navigate to Order Overview page
    - expect: Order Overview displays all 3 items
  3. Verify Item total shows $55.97 (29.99 + 15.99 + 9.99)
    - expect: Subtotal is calculated correctly
  4. Verify Tax is calculated on $55.97
    - expect: Tax amount is approximately $4.48

### 4. Order Completion (AC4)

**Seed:** `tests/seed.spec.ts`

#### 4.1. AC4-01: Verify Order Completion page displays after checkout

**File:** `tests/AC4-Order-Completion/AC4-01-completion-page-load.spec.ts`

**Steps:**
  1. Log in and add items to cart
    - expect: Items are in the cart
  2. Complete checkout process: navigate to cart, checkout, fill form (John/Doe/12345), proceed to overview
    - expect: Order Overview page is displayed
  3. Click Finish button
    - expect: User is navigated to checkout-complete.html

#### 4.2. AC4-02: Verify success message is displayed

**File:** `tests/AC4-Order-Completion/AC4-02-success-message.spec.ts`

**Steps:**
  1. Complete the full checkout process
    - expect: Order Completion page is loaded
  2. Verify page title shows 'Checkout: Complete!'
    - expect: Page title is displayed correctly
  3. Verify heading 'Thank you for your order!' is displayed
    - expect: Thank you message is visible

#### 4.3. AC4-03: Verify order confirmation message displays delivery information

**File:** `tests/AC4-Order-Completion/AC4-03-confirmation-message.spec.ts`

**Steps:**
  1. Complete the full checkout process
    - expect: Order Completion page is loaded
  2. Verify confirmation message contains 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    - expect: Order confirmation message is displayed with delivery details

#### 4.4. AC4-04: Verify Pony Express image is displayed

**File:** `tests/AC4-Order-Completion/AC4-04-pony-image.spec.ts`

**Steps:**
  1. Complete the full checkout process
    - expect: Order Completion page is loaded
  2. Verify Pony Express image is displayed on the page
    - expect: Image with alt text 'Pony Express' is visible

#### 4.5. AC4-05: Verify Back Home button navigates to inventory

**File:** `tests/AC4-Order-Completion/AC4-05-back-home-button.spec.ts`

**Steps:**
  1. Complete the full checkout process
    - expect: Order Completion page is displayed
  2. Click 'Back Home' button
    - expect: User is navigated back to inventory.html
  3. Verify inventory page loads with products displayed
    - expect: Inventory page is displayed, cart is cleared (back to fresh state for new order)

#### 4.6. AC4-06: Verify order page URL is correct

**File:** `tests/AC4-Order-Completion/AC4-06-completion-url.spec.ts`

**Steps:**
  1. Complete the full checkout process
    - expect: Order Completion page loads
  2. Verify page URL is 'https://www.saucedemo.com/checkout-complete.html'
    - expect: URL shows the correct checkout-complete page

### 5. Error Handling & Validation (AC5)

**Seed:** `tests/seed.spec.ts`

#### 5.1. AC5-01: Verify numbers-only validation in name fields (if applicable)

**File:** `tests/AC5-Error-Handling/AC5-01-numbers-in-names.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name '123456' (numbers only)
    - expect: Numbers are accepted in First Name field
  3. Enter Last Name '789', Zip '12345'
    - expect: All fields are filled
  4. Click Continue button
    - expect: Form is submitted (numbers in names are accepted or error message is shown)

#### 5.2. AC5-02: Verify HTML special characters are handled

**File:** `tests/AC5-Error-Handling/AC5-02-html-special-chars.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John<script>' (with HTML tag syntax)
    - expect: HTML characters are entered in the field
  3. Enter Last Name 'Doe', Zip '12345'
    - expect: All fields are filled
  4. Click Continue button
    - expect: Form is submitted successfully without executing scripts (no XSS vulnerability)

#### 5.3. AC5-03: Verify SQL injection characters are handled safely

**File:** `tests/AC5-Error-Handling/AC5-03-sql-injection.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name with SQL injection attempt: 'John'; DROP TABLE--'
    - expect: SQL characters are accepted in the field
  3. Enter Last Name 'Doe', Zip '12345'
    - expect: All fields are filled
  4. Click Continue button
    - expect: Form is submitted without executing SQL (no injection vulnerability), user proceeds to overview

#### 5.4. AC5-04: Verify very long input in Zip Code field

**File:** `tests/AC5-Error-Handling/AC5-04-long-zip.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John', Last Name 'Doe'
    - expect: Names are filled
  3. Enter extremely long Zip Code (100+ characters): 'ZipCode' repeated 20 times
    - expect: Field accepts the long input (or truncates it)
  4. Click Continue button
    - expect: Form is submitted or error message is shown

#### 5.5. AC5-05: Verify empty spaces-only validation

**File:** `tests/AC5-Error-Handling/AC5-05-spaces-only.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name with spaces only: '     ' (5 spaces)
    - expect: Spaces are entered in First Name field
  3. Enter Last Name with spaces: '     ', Zip with spaces: '     '
    - expect: All fields contain only spaces
  4. Click Continue button
    - expect: Form validation fails or spaces are trimmed, error message displayed if trimmed spaces result in empty field

#### 5.6. AC5-06: Verify field copy-paste functionality

**File:** `tests/AC5-Error-Handling/AC5-06-copy-paste.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Prepare text 'John' in clipboard and paste into First Name field
    - expect: Pasted text appears in First Name field
  3. Prepare text 'Doe' in clipboard and paste into Last Name field
    - expect: Pasted text appears in Last Name field
  4. Prepare text '12345' in clipboard and paste into Zip Code field
    - expect: Pasted text appears in Zip Code field
  5. Click Continue button
    - expect: Form is submitted successfully with pasted data

#### 5.7. AC5-07: Verify field navigation with Tab key

**File:** `tests/AC5-Error-Handling/AC5-07-tab-navigation.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Click on First Name field and enter 'John'
    - expect: First Name is entered
  3. Press Tab key to navigate to Last Name field
    - expect: Focus moves to Last Name field
  4. Type 'Doe'
    - expect: Last Name is entered
  5. Press Tab key to navigate to Zip Code field
    - expect: Focus moves to Zip Code field
  6. Type '12345' and press Tab again
    - expect: Zip Code is entered and focus moves to next element (Continue button or other)

#### 5.8. AC5-08: Verify form persistence after error correction

**File:** `tests/AC5-Error-Handling/AC5-08-form-persistence.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Enter First Name 'John', leave Last Name empty, enter Zip '12345'
    - expect: Fields are filled as specified
  3. Click Continue button
    - expect: Error message is shown: 'Error: Last Name is required'
  4. Verify First Name field still contains 'John' and Zip still contains '12345'
    - expect: Form data persistence: previously entered values are retained
  5. Enter 'Doe' in Last Name field and click Continue
    - expect: Form is submitted successfully with all retained data

#### 5.9. AC5-09: Verify multiple validation errors are shown

**File:** `tests/AC5-Error-Handling/AC5-09-multiple-errors.spec.ts`

**Steps:**
  1. Navigate to Checkout Information page
    - expect: Checkout Information page is displayed
  2. Leave all three fields empty (First Name, Last Name, Zip Code)
    - expect: All fields are empty
  3. Click Continue button
    - expect: Error message is displayed (likely for First Name, the first field in validation order)

#### 5.10. AC5-10: Verify cart persists through checkout errors

**File:** `tests/AC5-Error-Handling/AC5-10-cart-persistence.spec.ts`

**Steps:**
  1. Log in and add Backpack ($29.99) and T-Shirt ($15.99) to cart
    - expect: Cart contains 2 items, badge shows 2
  2. Navigate to Checkout and leave First Name empty, click Continue
    - expect: Error is shown, form validation fails
  3. Click Continue to return to cart page using browser back button or cancel
    - expect: Cart still contains the 2 items
  4. Navigate back to checkout and verify items are still in cart
    - expect: Cart badge still shows 2 items
