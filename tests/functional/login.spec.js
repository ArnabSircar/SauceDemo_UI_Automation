// tests/functional/login.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import Users from '../../fixtures/users';
import TestData from '../../fixtures/test-data';

test.describe('Login Functionality Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
  });

  test('F-01: Valid login with standard_user', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    await pom.loginPage.assertLoginSuccessful();
    await pom.inventoryPage.assertProductCount(6);
  });

  test('F-02: Valid login with problem_user', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.PROBLEM_USER.username, Users.PROBLEM_USER.password);
    await pom.loginPage.assertLoginSuccessful();
    const productCount = await pom.inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test('F-03: Valid login with performance_glitch_user', async () => {
    const startTime = Date.now();
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.PERFORMANCE_GLITCH_USER.username, Users.PERFORMANCE_GLITCH_USER.password);
    const duration = Date.now() - startTime;
    await pom.loginPage.assertLoginSuccessful();
    expect(duration).toBeGreaterThan(2000);
  });

  test('F-04: Valid login with error_user', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.ERROR_USER.username, Users.ERROR_USER.password);
    await pom.loginPage.assertLoginSuccessful();
    const productCount = await pom.inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test('F-05: Valid login with visual_user', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.VISUAL_USER.username, Users.VISUAL_USER.password);
    await pom.loginPage.assertLoginSuccessful();
    await pom.inventoryPage.assertProductCount(6);
  });

  test('F-06: Invalid login with wrong password', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.STANDARD_USER.username, 'wrong_password');
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.invalidCredentials);
  });

  test('F-07: Login with locked_out_user', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.LOCKED_OUT_USER.username, Users.LOCKED_OUT_USER.password);
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.lockedOut);
  });

  test('F-08: Empty credentials login', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.click(pom.loginPage.loginButton);
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.usernameRequired);
  });

  test('F-09: Only username entered', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.fill(pom.loginPage.usernameInput, Users.STANDARD_USER.username);
    await pom.loginPage.click(pom.loginPage.loginButton);
    const errorMessage = await pom.loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.login.passwordRequired);
  });

  test('F-10: Login with Enter key', async () => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.loginWithEnterKey(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    await pom.loginPage.assertLoginSuccessful();
  });

  test('F-11: Logout functionality', async ({ page }) => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    await pom.inventoryPage.logout();
    await expect(page).toHaveURL(TestData.urls.login);
  });

  test('F-12: Session persistence after page reload', async ({ page }) => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    await page.reload();
    await pom.inventoryPage.assertProductCount(6);
  });
});