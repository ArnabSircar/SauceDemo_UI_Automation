// tests/performance/performance.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import Users from '../../fixtures/users';
import TestData from '../../fixtures/test-data';

test.describe('Performance Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
  });

  test('P-01: Login page load time', async ({ page }) => {
    const startTime = Date.now();
    await pom.loginPage.navigateToLoginPage();
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('P-02: Standard user login performance', async () => {
    await pom.loginPage.navigateToLoginPage();
    const startTime = Date.now();
    await pom.loginPage.login(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    const loginTime = Date.now() - startTime;
    expect(loginTime).toBeLessThan(3000);
  });

  test('P-03: Performance glitch user login takes longer', async () => {
    await pom.loginPage.navigateToLoginPage();
    const startTime = Date.now();
    await pom.loginPage.login(Users.PERFORMANCE_GLITCH_USER.username, Users.PERFORMANCE_GLITCH_USER.password);
    const loginTime = Date.now() - startTime;
    expect(loginTime).toBeGreaterThan(2000);
  });

  test('P-04: Page reload performance', async ({ page }) => {
    await pom.loginAsStandardUser();
    const startTime = Date.now();
    await page.reload();
    const reloadTime = Date.now() - startTime;
    expect(reloadTime).toBeLessThan(5000);
  });

  test('P-05: Sorting performance', async () => {
    await pom.loginAsStandardUser();
    const startTime = Date.now();
    await pom.inventoryPage.sortProducts('lohi');
    await pom.inventoryPage.sortProducts('az');
    await pom.inventoryPage.sortProducts('hilo');
    const sortTime = Date.now() - startTime;
    expect(sortTime).toBeLessThan(2000);
  });

  test('P-06: Add to cart performance', async () => {
    await pom.loginAsStandardUser();
    const products = Object.values(TestData.products);
    const startTime = Date.now();
    for (const product of products) {
      await pom.inventoryPage.addProductToCart(product);
    }
    const addTime = Date.now() - startTime;
    expect(addTime).toBeLessThan(5000);
  });
});