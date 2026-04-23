// tests/functional/cart.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import TestData from '../../fixtures/test-data';

test.describe('Cart Functionality Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.loginAsStandardUser();
  });

  test('F-23: Navigate to cart', async () => {
    await pom.inventoryPage.goToCart();
    await pom.cartPage.assertCartContainsItems(0);
  });

  test('F-24: Remove item from cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.removeItemFromCart(TestData.products.backpack);
    await pom.cartPage.assertCartContainsItems(0);
  });

  test('F-25: Continue shopping from cart', async ({ page }) => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.continueShopping();
    await expect(page).toHaveURL(TestData.urls.inventory);
  });

  test('F-26: Cart persists after page refresh', async ({ page }) => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await page.reload();
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('F-27: Multiple items in cart display correctly', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    await pom.inventoryPage.addProductToCart(TestData.products.boltTshirt);
    await pom.inventoryPage.goToCart();
    const itemCount = await pom.cartPage.getCartItemCount();
    expect(itemCount).toBe(3);

    const itemNames = await pom.cartPage.getCartItemNames();
    expect(itemNames).toContain(TestData.products.backpack);
    expect(itemNames).toContain(TestData.products.bikeLight);
    expect(itemNames).toContain(TestData.products.boltTshirt);
  });

  test('F-28: Remove all items from cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.removeAllItems();
    await pom.cartPage.assertCartContainsItems(0);
  });
});