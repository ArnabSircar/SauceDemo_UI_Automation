// tests/regression/full-flow.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import TestData from '../../fixtures/test-data';

test.describe('Full E2E Regression Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.loginAsStandardUser();
  });

  test('R-01: Complete purchase flow - happy path', async ({ page }) => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    expect(await pom.inventoryPage.getCartItemCount()).toBe(2);

    await pom.inventoryPage.goToCart();
    expect(await pom.cartPage.getCartItemCount()).toBe(2);

    await pom.cartPage.proceedToCheckout();
    await pom.checkoutPage.fillCheckoutInfo(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.clickFinish();
    await pom.checkoutPage.assertOrderComplete();
  });

  test('R-02: Browse and add all products to cart', async () => {
    const products = Object.values(TestData.products);
    for (const product of products) {
      await pom.inventoryPage.addProductToCart(product);
    }
    expect(await pom.inventoryPage.getCartItemCount()).toBe(6);
  });

  test('R-03: Add and remove items flow', async ({ page }) => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.fleeceJacket);
    expect(await pom.inventoryPage.getCartItemCount()).toBe(2);

    await pom.inventoryPage.removeProductFromCart(TestData.products.backpack);
    expect(await pom.inventoryPage.getCartItemCount()).toBe(1);

    await pom.inventoryPage.goToCart();
    expect(await pom.cartPage.getCartItemCount()).toBe(1);
  });

  test('R-04: Sort and verify products', async () => {
    await pom.inventoryPage.sortProducts('lohi');
    await pom.inventoryPage.assertSortedByPriceAscending();

    await pom.inventoryPage.sortProducts('az');
    await pom.inventoryPage.assertSortedByNameAscending();
  });

  test('R-05: Product detail page navigation', async ({ page }) => {
    await pom.inventoryPage.clickOnProduct(TestData.products.backpack);
    await expect(page).toHaveURL(/inventory-item.html/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
  });

  test('R-06: Reset app state functionality', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    expect(await pom.inventoryPage.getCartItemCount()).toBe(2);

    await pom.inventoryPage.resetAppState();
    expect(await pom.inventoryPage.getCartItemCount()).toBe(0);
  });

  test('R-07: Logout and login again', async ({ page }) => {
    await pom.inventoryPage.logout();
    await expect(page).toHaveURL(TestData.urls.login);

    await pom.loginPage.login('standard_user', 'secret_sauce');
    await pom.loginPage.assertLoginSuccessful();
  });
});