<p align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="300">
  <br>
  <h1>SauceDemo UI Automation Framework</h1>
  <p>End-to-end UI automation testing with Playwright, Allure Reports & CI/CD</p>
</p>

---

## 📋 Overview

A production-ready UI automation framework for [SauceDemo](https://www.saucedemo.com/) built with:
- **[Playwright](https://playwright.dev)** - Modern browser automation
- **Allure Reports** - Interactive test reporting
- **GitHub Actions** - CI/CD pipeline
- **Page Object Model** - Maintainable test architecture

| | |
|---|---|
| **Tests** | 61 |
| **Passed** | 59 (97%) |
| **Failed** | 2 |
| **Duration** | ~2 min |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ArnabSircar/SauceDemo_UI_Automation.git
cd SauceDemo_UI_Automation

# Install dependencies
npm install

# Install browsers
npx playwright install --with-deps

# Run tests
npm test
```

---

## 📁 Project Structure

```
SauceDemo_UI_Automation/
├── .github/
│   └── workflows/           # CI/CD pipelines
├── allure-report/          # Generated test report
├── allure-results/        # Raw test results
├── fixtures/             # Test data (users, products)
├── pages/               # Page Object Model
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── scripts/             # Utility scripts
├── tests/
│   ├── functional/     # Functional tests (35)
│   ├── performance/   # Performance tests (6)
│   ├── security/     # Security tests (8)
│   ├── visual/      # Visual tests (5)
│   └── regression/  # E2E tests (7)
├── utils/
│   └── pageObjectManager.js
├── playwright.config.js
└── package.json
```

---

## 🧪 Test Suites

### Functional Tests (35 tests)

| ID | Description | Status |
|----|-------------|--------|
| F-01 to F-12 | Login functionality | ✅ |
| F-13 to F-22 | Inventory operations | ⚠️ |
| F-23 to F-28 | Cart management | ✅ |
| F-29 to F-35 | Checkout process | ✅ |

### Other Suites (26 tests)

| Suite | Tests | Coverage |
|-------|-------|----------|
| Performance | 6 | Load time, login speed, sorting |
| Security | 8 | SQL injection, XSS, auth |
| Visual | 5 | UI layout, elements |
| Regression | 7 | End-to-end flows |

---

## 📊 Reports

### Local Development

```bash
# Open Playwright HTML report
npm run report

# Generate Allure HTML report
npm run allure:generate

# Serve Allure report
npm run allure:serve

# Export as PDF
npm run allure:pdf
```

### GitHub Pages

The Allure report is automatically deployed after each push.

**🔗 [View Live Report](https://arnabsircar.github.io/SauceDemo_UI_Automation/)**

---

## 🔧 Configuration

### playwright.config.js

```javascript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

### Environment Variables

Create `.env` file:

```env
BASE_URL=https://www.saucedemo.com
CI=true
```

---

## 🏗️ Page Object Model

### Using PageObjectManager

```javascript
import { test, expect } from '@playwright/test';
import PageObjectManager from './utils/pageObjectManager';
import TestData from './fixtures/test-data';

test.describe('Shopping', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.loginAsStandardUser();
  });

  test('Add product to cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    expect(await pom.inventoryPage.getCartItemCount()).toBe(1);
  });

  test('Complete checkout', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.proceedToCheckout();
    await pom.checkoutPage.completeCheckout('John', 'Doe', '12345');
    await pom.checkoutPage.assertOrderComplete();
  });
});
```

### Available Methods

| Page | Methods |
|------|--------|
| `pom.loginPage` | `login()`, `navigateToLoginPage()`, `logout()` |
| `pom.inventoryPage` | `addProductToCart()`, `sortProducts()`, `goToCart()` |
| `pom.cartPage` | `proceedToCheckout()`, `removeItemFromCart()` |
| `pom.checkoutPage` | `fillCheckoutInfo()`, `clickContinue()`, `clickFinish()` |

---

## ⚡ Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Run in debug mode |
| `npm run test:functional` | Run functional tests |
| `npm run test:security` | Run security tests |
| `npm run test:performance` | Run performance tests |
| `npm run test:regression` | Run regression tests |
| `npm run allure:generate` | Generate Allure HTML |
| `npm run allure:serve` | Serve Allure locally |
| `npm run allure:pdf` | Export as PDF |

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow:

1. ✅ Installs dependencies
2. ✅ Installs Playwright browsers
3. ✅ Runs all 61 tests
4. ✅ Generates Allure report
5. ✅ Deploys to GitHub Pages

**View Runs:** https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

ISC License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using <a href="https://playwright.dev">Playwright</a> & <a href="https://qameta.io/allure">Allure</a>
</p>