# SauceDemo UI Automation Framework

A comprehensive end-to-end UI automation testing framework using **Playwright** + **Allure Reports** + **GitHub Actions CI/CD**.

---

## 📊 Test Results

| Metric | Count |
|--------|-------|
| Total Tests | 61 |
| Passed | 59 |
| Failed | 2 |
| Duration | ~2 min |

---

## 🌐 Live Report Access

### ▶️ Allure Report (GitHub Pages)

After each push to `main`, the Allure report is automatically deployed:

**🔗 https://ArnabSircar.github.io/SauceDemo_UI_Automation/**

> Click the link above to view the full Allure test report with charts and graphs!

---

### 📋 Test Coverage by Suite

| Suite | Tests | Status |
|-------|-------|--------|
| Login | 12 | ✅ |
| Inventory | 10 | ⚠️ 1 failed |
| Cart | 6 | ✅ |
| Checkout | 7 | ✅ |
| Performance | 6 | ✅ |
| Security | 8 | ✅ |
| Visual | 5 | ✅ |
| Regression | 7 | ✅ |

---

## 🚀 Quick Start

### Clone & Install

```bash
git clone https://github.com/ArnabSircar/SauceDemo_UI_Automation.git
cd SauceDemo_UI_Automation
npm install
npx playwright install --with-deps
```

### Run Tests

```bash
# All tests
npm test

# Headed mode (visible browser)
npm run test:headed
```

---

## 📁 Project Structure

```
SauceDemo_UI_Automation/
├── .github/workflows/     # CI/CD pipelines
├── allure-report/        # Generated Allure report
├── allure-results/       # Raw test results
├── fixtures/              # Test data (users, products)
├── pages/                # Page Object Model
├── scripts/              # PDF export script
├── tests/                # Test suites
│   ├── functional/      # F-01 to F-35
│   ├── performance/      # P-01 to P-06
│   ├── security/         # S-01 to S-08
│   ├── visual/           # V-01 to V-05
│   └── regression/        # R-01 to R-07
├── utils/                # POM manager
├── playwright.config.js
└── package.json
```

---

## 📖 Test Cases

### Functional Tests (35)

| ID | Description |
|----|-------------|
| F-01 to F-12 | Login functionality |
| F-13 to F-22 | Inventory operations |
| F-23 to F-28 | Cart management |
| F-29 to F-35 | Checkout process |

### Other Suites (26)

| Suite | Tests |
|-------|-------|
| Performance | 6 |
| Security | 8 |
| Visual | 5 |
| Regression | 7 |

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run allure:generate` | Generate HTML report |
| `npm run allure:pdf` | Export as PDF |

---

## 🔧 GitHub Actions

View all workflow runs:
**https://github.com/ArnabSircar/SauceDemo_UI_Automation/actions**

Download test artifacts from the Actions tab.

---

## 📄 License

ISC License

---

<p align="center">Built with ❤️ using Playwright & Allure</p>