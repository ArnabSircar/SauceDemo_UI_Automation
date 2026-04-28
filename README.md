# SauceDemo UI Automation Framework

A comprehensive end-to-end UI automation framework for [SauceDemo](https://www.saucedemo.com/) using **Playwright** with **TypeScript/JavaScript**, **Allure Reports**, and **CI/CD integration**.

![Playwright](https://img.shields.io/badge/Playwright-1.59.1-45ba4c?style=for-the-badge&logo=playwright)
![Allure](https://img.shields.io/badge/Allure-Report-6e7681?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-2088ff?style=for-the-badge&logo=github)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/Tests-61 Passed-3fb950)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-Deployed-2a9d8f)

---

## 🌐 Live Report Links

| Report | URL |
|--------|-----|
| **Allure Dashboard** | https://ArnabSircar.github.io/SauceDemo_UI_Automation/graph/ |
| **GitHub Actions** | https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions |

---

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Test Coverage](#-test-coverage)
- [Page Object Model](#-page-object-model)
- [Configuration](#-configuration)
- [License](#-license)

---

## ✨ Features

- **Playwright Framework** - Modern, reliable browser automation
- **Page Object Model (POM)** - Maintainable, reusable test architecture
- **Multiple Test Suites** - Functional, Performance, Security, Visual, Regression
- **Allure Reports** - Rich interactive test reporting with charts
- **PDF Export** - Export reports as professional PDF documents
- **GitHub Actions CI/CD** - Automated testing on every push/PR
- **Parallel Execution** - Fast test runs with parallel workers
- **Retries & Screenshots** - Automatic retry on failure with trace screenshots

---

## 📁 Project Structure

```
SauceDemo_UI_Automation/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD pipeline
├── allure-report/                # Generated Allure HTML report
├── allure-results/                # Raw test results for Allure
├── config/                        # Configuration files
├── fixtures/                      # Test data & user credentials
│   ├── users.js                  # User credentials
│   └── test-data.js              # Test data constants
├── pages/                         # Page Object classes
│   ├── BasePage.js               # Base class with common methods
│   ├── LoginPage.js              # Login page actions
│   ├── InventoryPage.js          # Inventory page actions
│   ├── CartPage.js               # Cart page actions
│   ├── CheckoutPage.js           # Checkout page actions
│   └── index.js                  # Page exports
├── scripts/
│   └── generateAllurePdf.js      # PDF report generation script
├── tests/                         # Test specifications
│   ├── functional/               # Functional test suites
│   │   ├── login.spec.js        # Login tests (F-01 to F-12)
│   │   ├── inventory.spec.js    # Inventory tests (F-13 to F-22)
│   │   ├── cart.spec.js         # Cart tests (F-23 to F-28)
│   │   └── checkout.spec.js     # Checkout tests (F-29 to F-35)
│   ├── performance/              # Performance test suites
│   │   └── performance.spec.js  # Performance tests (P-01 to P-06)
│   ├── security/                # Security test suites
│   │   └── security.spec.js     # Security tests (S-01 to S-08)
│   ├── visual/                  # Visual test suites
│   │   └── visual.spec.js       # Visual tests (V-01 to V-05)
│   └── regression/              # Regression test suites
│       └── full-flow.spec.js    # E2E flow tests (R-01 to R-07)
├── utils/
│   └── pageObjectManager.js      # Centralized POM manager
├── playwright.config.js          # Playwright configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

---

## 🔧 Prerequisites

- **Node.js** v18+ (LTS recommended)
- **npm** v8+ or **yarn**
- **Git**
- **Java** (for Allure Report generation)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SauceDemo_UI_Automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

---

## ▶️ Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (visible browser)
```bash
npm run test:headed
```

### Run Specific Test Suites

| Suite | Command |
|-------|---------|
| Functional Tests | `npm run test:functional` |
| Security Tests | `npm run test:security` |
| Performance Tests | `npm run test:performance` |
| Regression Tests | `npm run test:regression` |
| Visual Tests | `npm run test:visual` |

### Run with Debug Mode
```bash
npm run test:debug
```

---

## 📊 Test Reports

### Playwright HTML Report
```bash
npm run report
```

### Allure Report

Generate and serve the Allure report locally:
```bash
npm run allure:generate    # Generate HTML report
npm run allure:serve       # Serve report at http://localhost:8080
```

### Export as PDF

Generate a comprehensive PDF report with all charts:
```bash
npm run allure:pdf
```

**PDF Contents:**
- Cover Page with Test Summary
- Dashboard (with pie charts & trends)
- Behaviors (feature/epic breakdown)
- Categories (defect categories)
- XUnit (test suite breakdown)
- Timeline (execution timeline)
- Packages (tests by file)

---

## 🚀 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. **Runs on** every push and pull request to `main`/`master` branches
2. **Installs** dependencies and Playwright browsers
3. **Executes** all tests with parallel workers
4. **Generates** Allure HTML report
5. **Creates** PDF export with charts
6. **Uploads** artifacts:
   - `allure-results` - Raw test data
   - `allure-report` - HTML report
   - `allure-report.pdf` - PDF export
   - `playwright-report` - Playwright report

### View CI/CD Artifacts

1. Go to **Actions** tab in GitHub repository
2. Click on the workflow run
3. Download artifacts from the **Artifacts** section

---

## 📝 Test Coverage

### Functional Tests (35 tests)

| Test ID | Description |
|---------|-------------|
| F-01 to F-12 | Login functionality tests |
| F-13 to F-22 | Inventory functionality tests |
| F-23 to F-28 | Cart functionality tests |
| F-29 to F-35 | Checkout functionality tests |

### Performance Tests (6 tests)

| Test ID | Description |
|---------|-------------|
| P-01 to P-06 | Page load, login, sorting, and cart performance tests |

### Security Tests (8 tests)

| Test ID | Description |
|---------|-------------|
| S-01 to S-08 | SQL injection, XSS, session management, auth tests |

### Visual Tests (5 tests)

| Test ID | Description |
|---------|-------------|
| V-01 to V-05 | UI element visibility and layout tests |

### Regression Tests (7 tests)

| Test ID | Description |
|---------|-------------|
| R-01 to R-07 | Full E2E purchase flow and critical paths |

---

## 🏗️ Page Object Model

The framework uses a centralized **PageObjectManager** for consistent test setup:

### Usage Example

```javascript
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import TestData from '../../fixtures/test-data';

test.describe('My Test Suite', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    // Single login for all tests
    await pom.loginAsStandardUser();
  });

  test('Add product to cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    const count = await pom.inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('Complete checkout', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.proceedToCheckout();
    await pom.checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.clickFinish();
    await pom.checkoutPage.assertOrderComplete();
  });
});
```

### Available Page Objects

| Page Object | Methods |
|-------------|---------|
| `pom.loginPage` | `login()`, `navigateToLoginPage()`, `logout()` |
| `pom.inventoryPage` | `addProductToCart()`, `sortProducts()`, `goToCart()` |
| `pom.cartPage` | `proceedToCheckout()`, `removeItemFromCart()` |
| `pom.checkoutPage` | `fillCheckoutInfo()`, `clickContinue()`, `clickFinish()` |

---

## ⚙️ Configuration

### Playwright Configuration

Edit `playwright.config.js` to customize:

```javascript
export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,  // Retry on CI
  workers: process.env.CI ? 1 : 4,  // Parallel workers
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  outputDir: 'allure-results',
});
```

### Environment Variables

Create a `.env` file if needed:

```env
BASE_URL=https://www.saucedemo.com
CI=true
```

### Test Data

Edit `fixtures/test-data.js` to customize test data:

```javascript
const TestData = {
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    // ...
  },
  urls: {
    login: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
    // ...
  },
  // ...
};
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues or questions, please open a GitHub issue.

---

<p align="center">
  <strong>Built with ❤️ using Playwright & Allure</strong>
</p>

---

## 🌐 Live Report Access

### Allure Report on GitHub Pages

After each push to `main`, the workflow automatically deploys the Allure report. Access it at:

**https://ArnabSircar.github.io/SauceDemo_UI_Automation/graph/**

### GitHub Actions

View all test runs and download artifacts:

**https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions**

### Quick Links

- [Allure Dashboard](https://ArnabSircar.github.io/SauceDemo_UI_Automation/graph/)
- [Workflow Runs](https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions)
- [latest Artifacts](https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions)