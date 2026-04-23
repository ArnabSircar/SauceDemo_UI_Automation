// tests/functional/inventory.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import TestData from '../../fixtures/test-data';

test.describe('Inventory Functionality Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.loginAsStandardUser();
  });

  test('F-13: Add product to cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('F-14: Remove product from cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.removeProductFromCart(TestData.products.backpack);
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);
  });

  test('F-15: Add multiple products to cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    await pom.inventoryPage.addProductToCart(TestData.products.boltTshirt);
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);
  });

  test('F-16: Sort products by name Z to A', async () => {
    await pom.inventoryPage.sortProducts('za');
    const productNames = await pom.inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('F-17: Sort products by price low to high', async () => {
    await pom.inventoryPage.sortProducts('lohi');
    await pom.inventoryPage.assertSortedByPriceAscending();
  });

  test('F-18: Sort products by price high to low', async () => {
    await pom.inventoryPage.sortProducts('hilo');
    const prices = await pom.inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('F-19: Product details page navigation', async ({ page }) => {
    await pom.inventoryPage.clickOnProduct(TestData.products.backpack);
    await expect(page).toHaveURL(/inventory-item.html/);
    const productDetail = await page.locator('.inventory_details_name');
    await expect(productDetail).toBeVisible();
  });

  test('F-20: Reset app state clears cart', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.bikeLight);
    await pom.inventoryPage.resetAppState();
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);
  });

  test('F-21: Verify all products have images', async () => {
    const images = await pom.inventoryPage.page.locator('.inventory_item_img img').all();
    for (const image of images) {
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).not.toBe('');
    }
  });

  test('F-22: Add same product twice should not duplicate', async () => {
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    const cartCount = await pom.inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
});