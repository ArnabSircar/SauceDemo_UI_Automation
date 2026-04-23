// tests/visual/visual.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import Users from '../../fixtures/users';
import TestData from '../../fixtures/test-data';

test.describe('Visual Regression Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
  });

  test('V-01: Login page visual elements', async ({ page }) => {
    await pom.loginPage.navigateToLoginPage();
    await expect(page.locator('.login_logo')).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('V-02: Inventory page visual layout', async () => {
    await pom.loginAsStandardUser();
    await expect(pom.inventoryPage.page.locator('.inventory_list')).toBeVisible();
    await expect(pom.inventoryPage.page.locator('.shopping_cart_link')).toBeVisible();
    await expect(pom.inventoryPage.page.locator('.product_sort_container')).toBeVisible();
  });

  test('V-03: Cart page visual layout', async ({ page }) => {
    await pom.loginAsStandardUser();
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await expect(page.locator('.cart_list')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });

  test('V-04: Checkout page visual layout', async ({ page }) => {
    await pom.loginAsStandardUser();
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.proceedToCheckout();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });

  test('V-05: Visual_user login experience', async ({ page }) => {
    await pom.loginPage.navigateToLoginPage();
    await pom.loginPage.login(Users.VISUAL_USER.username, Users.VISUAL_USER.password);
    await expect(page).toHaveURL(TestData.urls.inventory);
  });
});