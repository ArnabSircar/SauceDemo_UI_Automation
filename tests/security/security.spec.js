// tests/security/security.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import Users from '../../fixtures/users';
import TestData from '../../fixtures/test-data';

test.describe('Security Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
  });

  test('S-01: SQL injection prevention in username field', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.fill(pom.loginPage.usernameInput, "' OR '1'='1");
    await pom.loginPage.fill(pom.loginPage.passwordInput, "' OR '1'='1");
    await pom.loginPage.click(pom.loginPage.loginButton);
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface');
  });

  test('S-02: XSS prevention in credentials', async ({ page }) => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.fill(pom.loginPage.usernameInput, '<script>alert("xss")</script>');
    await pom.loginPage.fill(pom.loginPage.passwordInput, 'password');
    await pom.loginPage.click(pom.loginPage.loginButton);
    await page.waitForTimeout(1000);
    const pageContent = await page.content();
    expect(pageContent).not.toContain('<script>alert("xss")</script>');
  });

  test('S-03: Locked out user error message', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.LOCKED_OUT_USER.username, Users.LOCKED_OUT_USER.password);
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.lockedOut);
  });

  test('S-04: Session not persisted after logout', async ({ page }) => {
    await pom.loginAsStandardUser();
    await pom.inventoryPage.logout();
    await expect(page).toHaveURL(TestData.urls.login);
  });

  test('S-05: Direct inventory URL access without login redirects', async ({ page }) => {
    await page.goto(TestData.urls.inventory);
    await expect(page).toHaveURL(TestData.urls.login);
  });

  test('S-06: Direct cart URL access without login redirects', async ({ page }) => {
    await page.goto(TestData.urls.cart);
    await expect(page).toHaveURL(TestData.urls.login);
  });

  test('S-07: Direct checkout URL access without login redirects', async ({ page }) => {
    await page.goto(TestData.urls.checkout);
    await expect(page).toHaveURL(TestData.urls.login);
  });

  test('S-08: Invalid credentials show generic error', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.invalidCredentials);
  });
});