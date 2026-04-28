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

### ⚠️ First Time Setup Required

1. Go to **Settings** → **Pages**
2. Select **Source**: "Deploy from a branch"
3. **Branch**: `gh-pages` / `(root)`
4. Click **Save**

5. Then go to **Actions** → **Allure Report to Pages** → **Run workflow**

After deployment (~3 min), the Allure report will be at:

**🔗 https://ArnabSircar.github.io/SauceDemo_UI_Automation/**

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

```bash
git clone https://github.com/ArnabSircar/SauceDemo_UI_Automation.git
cd SauceDemo_UI_Automation
npm install
npx playwright install --with-deps
npm test
```

---

## 📁 Project Structure

```
├── .github/workflows/     # CI/CD pipelines
├── allure-report/        # Generated Allure report
├── fixtures/              # Test data
├── pages/                # Page Object Model
├── tests/                # Test suites
└── package.json
```

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run allure:pdf` | Export as PDF |

---

## 📄 License

ISC

<p align="center">Built with ❤️ using Playwright & Allure</p>