// tests/saucedemo-checkout/README.md
/*
# SauceDemo Checkout Workflow - Playwright Test Suite

## Overview

Comprehensive automated test suite for the SauceDemo e-commerce checkout workflow (SCRUM-101).
This suite covers 39 test cases across 5 acceptance criteria areas with 100% specification coverage.

**Test Framework:** Playwright
**Browser Support:** Chromium, Firefox, WebKit
**Application:** https://www.saucedemo.com (SauceDemo)
**Test Credentials:** standard_user / secret_sauce

## Quick Start

### Installation
```bash
npm install
npx playwright install
```

### Run All Tests
```bash
npx playwright test tests/saucedemo-checkout/

# With UI
npx playwright test tests/saucedemo-checkout/ --ui

# Headed mode (see browser)
npx playwright test tests/saucedemo-checkout/ --headed

# Specific browser
npx playwright test tests/saucedemo-checkout/ --project chromium

# Single file
npx playwright test tests/saucedemo-checkout/AC1-cart-review.spec.ts

# Specific test
npx playwright test tests/saucedemo-checkout/AC1-cart-review.spec.ts -g "AC1-01"
```

### View Results
```bash
npx playwright show-report
```

## Test Suite Structure

### File Organization
```
tests/
├── seed.spec.ts                          # Login seed file
└── saucedemo-checkout/
    ├── AC1-cart-review.spec.ts          # Suite 1: 5 tests
    ├── AC2-checkout-form.spec.ts        # Suite 2: 10 tests
    ├── AC3-order-overview.spec.ts       # Suite 3: 8 tests
    ├── AC4-order-completion.spec.ts     # Suite 4: 6 tests
    ├── AC5-error-handling.spec.ts       # Suite 5: 10 tests
    ├── README.md                        # This file
    └── TEST-SUITE-SUMMARY.md            # Detailed breakdown
```

## Test Suites

### Suite 1: AC1 - Cart Review (5 Tests)
**File:** `AC1-cart-review.spec.ts`

Tests the shopping cart functionality including item display, pricing, navigation, and removal.

- **AC1-01:** Verify cart displays correct items and quantities
- **AC1-02:** Verify cart pricing is calculated correctly
- **AC1-03:** Verify Continue Shopping button navigates back to inventory
- **AC1-04:** Verify Checkout button navigates to checkout information page
- **AC1-05:** Verify Remove button functionality in cart

**Key Elements:**
- `.shopping_cart_badge` - Cart item count
- `.cart_list` - Cart items container
- `[data-test="add-to-cart-..."]` - Add to cart buttons
- `[data-test="remove-..."]` - Remove item buttons

### Suite 2: AC2 - Checkout Form Validation (10 Tests)
**File:** `AC2-checkout-form.spec.ts`

Tests form validation, mandatory fields, error messages, and special character handling.

- **AC2-01:** Verify First Name field is mandatory
- **AC2-02:** Verify Last Name field is mandatory
- **AC2-03:** Verify Zip Code field is mandatory
- **AC2-04:** Verify all fields mandatory - error message for empty form
- **AC2-05:** Verify valid form submission with correct data
- **AC2-06:** Verify form accepts special characters in First Name
- **AC2-07:** Verify form accepts various Zip Code formats
- **AC2-08:** Verify Cancel button returns to cart page
- **AC2-09:** Verify long names are accepted in form fields
- **AC2-10:** Verify error message dismissal when user corrects field

**Key Elements:**
- `[data-test="firstName"]` - First Name input
- `[data-test="lastName"]` - Last Name input
- `[data-test="postalCode"]` - Postal Code input
- `h3.error` - Error message display
- `[name="continue"]` - Continue button
- `[name="cancel"]` - Cancel button

### Suite 3: AC3 - Order Overview (8 Tests)
**File:** `AC3-order-overview.spec.ts`

Tests order overview page displays items, pricing, payment/shipping info, and navigation.

- **AC3-01:** Verify cart items summary is displayed correctly
- **AC3-02:** Verify item prices in order overview
- **AC3-03:** Verify Payment Information section displays
- **AC3-04:** Verify Shipping Information section displays
- **AC3-05:** Verify Price total calculation is correct
- **AC3-06:** Verify Cancel button on Order Overview returns to checkout
- **AC3-07:** Verify Finish button proceeds to order completion
- **AC3-08:** Verify totals with multiple items

**Key Elements:**
- `.summary_info` - Order summary container
- `.summary_item_price` - Item price display
- `.cart_item` - Individual item row
- `[name="finish"]` - Finish button

### Suite 4: AC4 - Order Completion (6 Tests)
**File:** `AC4-order-completion.spec.ts`

Tests order completion page displays success messages and proper navigation.

- **AC4-01:** Verify Order Completion page displays after checkout
- **AC4-02:** Verify success message is displayed
- **AC4-03:** Verify order confirmation message displays delivery information
- **AC4-04:** Verify Pony Express image is displayed
- **AC4-05:** Verify Back Home button navigates to inventory
- **AC4-06:** Verify order page URL is correct

**Key Elements:**
- `.checkout_complete_container` - Completion page container
- `h2.complete-header` - "Thank you" heading
- `.complete-text` - Confirmation text
- `[name="back-to-products"]` - Back Home button
- `img[alt="Pony Express"]` - Delivery image

### Suite 5: AC5 - Error Handling & Validation (10 Tests)
**File:** `AC5-error-handling.spec.ts`

Tests edge cases, special characters, security (XSS, SQL injection), and form persistence.

- **AC5-01:** Verify numbers-only validation in name fields
- **AC5-02:** Verify HTML special characters are handled
- **AC5-03:** Verify SQL injection characters are handled safely
- **AC5-04:** Verify very long input in Zip Code field
- **AC5-05:** Verify empty spaces-only validation
- **AC5-06:** Verify field copy-paste functionality
- **AC5-07:** Verify field navigation with Tab key
- **AC5-08:** Verify form persistence after error correction
- **AC5-09:** Verify multiple validation errors are shown
- **AC5-10:** Verify cart persists through checkout errors

**Key Elements:**
- Form input fields
- Validation and error handling
- Cart persistence
- Security features (XSS, SQLi protection)

## Test Features

### BeforeEach Setup
Each test suite includes a `beforeEach` hook that:
1. Navigates to SauceDemo
2. Logs in with standard_user credentials
3. Verifies inventory page loads
4. Prepares the page for test execution

### Reliable Element Selectors
All tests use data-test attributes and semantic selectors:
- `[data-test="..."]` - Primary identifiers
- `.class-name` - Stable class selectors
- `[name="..."]` - Form element names
- `[alt="..."]` - Image alternatives

### Explicit Waits
Tests use Playwright's expect() for reliable waiting:
```typescript
await expect(page).toHaveURL(/.*inventory.html/);
await expect(page.locator('.shopping_cart_badge')).toContainText('1');
await expect(page.locator('.checkout_complete_container')).toBeVisible();
```

### Error Handling
Tests validate error messages and validation flows:
- Mandatory field validation
- Error message display
- Form persistence after errors
- Validation error recovery

### Security Testing
Tests verify application security:
- XSS protection (HTML special characters)
- SQL injection handling
- Input sanitization
- Data validation

## Configuration

### Playwright Config (playwright.config.ts)
The test suite uses the project's Playwright configuration:
- **Parallel Execution:** Enabled for faster runs
- **Retries:** 2 retries on CI, 0 on local
- **Reporter:** HTML report generation
- **Trace:** On first retry for debugging
- **Timeout:** 30 seconds per test (default)

### Environment
Tests run against live SauceDemo application:
- **Base URL:** https://www.saucedemo.com
- **Credentials:** standard_user / secret_sauce
- **Browser:** All major browsers supported

## Debugging

### Debug Mode
```bash
npx playwright test tests/saucedemo-checkout/ --debug
```

### Inspector Mode
```bash
PWDEBUG=1 npx playwright test tests/saucedemo-checkout/AC1-cart-review.spec.ts
```

### HTML Report
```bash
npx playwright show-report
```

## Test Data

### Product Information
The tests use SauceDemo's standard product catalog:
- Sauce Labs Backpack: $29.99
- Sauce Labs Bolt T-Shirt: $15.99
- Sauce Labs Bike Light: $9.99
- Sauce Labs Fleece Jacket: $49.99
- Sauce Labs Onesie: $7.99
- Test.allTheThings() T-Shirt (Red): $15.99

### Tax Calculation
Tests validate 8% tax rate:
- Subtotal × 1.08 = Total

### Test User
- **Username:** standard_user
- **Password:** secret_sauce
- **Status:** Standard user with full access

## Best Practices Implemented

✓ **Reliable Selectors:** Uses data-test attributes and semantic selectors
✓ **Explicit Waits:** Uses expect() for deterministic waiting
✓ **Test Independence:** Each test can run in isolation
✓ **Setup/Teardown:** BeforeEach handles test setup
✓ **Error Testing:** Comprehensive validation and error scenarios
✓ **Security Testing:** XSS, SQL injection, input validation
✓ **Performance:** Parallel execution enabled
✓ **Maintainability:** Clear test names matching specifications
✓ **Documentation:** Inline comments for complex steps
✓ **Comprehensive Coverage:** 39 tests across 5 suites

## Troubleshooting

### Tests Timeout
- Increase timeout in playwright.config.ts
- Check network connectivity to saucedemo.com
- Verify browser is responsive

### Element Not Found
- Check element selectors in browser DevTools
- Verify page has loaded with proper waits
- Check for dynamic element changes

### Flaky Tests
- Use explicit waits instead of hard delays
- Avoid CSS selectors that change frequently
- Use data-test attributes when possible

### Authentication Issues
- Verify credentials: standard_user / secret_sauce
- Check if SauceDemo account status
- Clear browser storage if needed

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Playwright tests
  run: npx playwright test tests/saucedemo-checkout/

- name: Upload report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Performance Metrics

Expected test execution times:
- Suite 1 (AC1): ~30 seconds (5 tests)
- Suite 2 (AC2): ~60 seconds (10 tests)
- Suite 3 (AC3): ~50 seconds (8 tests)
- Suite 4 (AC4): ~40 seconds (6 tests)
- Suite 5 (AC5): ~70 seconds (10 tests)

**Total:** ~4-5 minutes for full suite in parallel

## References

- [Playwright Documentation](https://playwright.dev)
- [SauceDemo Application](https://www.saucedemo.com)
- [SCRUM-101 Test Plan](../saucedemo-checkout-test-plan.md)
- [Manual Testing Findings](../../test-results/SCRUM-101-manual-testing-findings.md)

## Support

For issues or questions:
1. Check test logs: `npx playwright show-report`
2. Review test for recent changes
3. Verify application is accessible
4. Check browser compatibility
*/
