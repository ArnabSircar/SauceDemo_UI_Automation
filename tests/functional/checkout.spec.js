// tests/functional/checkout.spec.js
import { test, expect } from '@playwright/test';
import PageObjectManager from '../../utils/pageObjectManager';
import TestData from '../../fixtures/test-data';

test.describe('Checkout Functionality Tests', () => {
  let pom;

  test.beforeEach(async ({ page }) => {
    pom = new PageObjectManager(page);
    await pom.loginAsStandardUser();
    await pom.inventoryPage.addProductToCart(TestData.products.backpack);
    await pom.inventoryPage.goToCart();
    await pom.cartPage.proceedToCheckout();
  });

  test('F-29: Complete checkout with valid information', async () => {
    await pom.checkoutPage.fillCheckoutInfo(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.assertTotalCalculation();
    await pom.checkoutPage.clickFinish();
    await pom.checkoutPage.assertOrderComplete();
  });

  test('F-30: Checkout with empty first name', async () => {
    await pom.checkoutPage.fillCheckoutInfo('', TestData.checkoutInfo.valid.lastName, TestData.checkoutInfo.valid.postalCode);
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.assertErrorMessage(TestData.errorMessages.checkout.firstNameRequired);
  });

  test('F-31: Checkout with empty last name', async () => {
    await pom.checkoutPage.fillCheckoutInfo(TestData.checkoutInfo.valid.firstName, '', TestData.checkoutInfo.valid.postalCode);
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.assertErrorMessage(TestData.errorMessages.checkout.lastNameRequired);
  });

  test('F-32: Checkout with empty postal code', async () => {
    await pom.checkoutPage.fillCheckoutInfo(TestData.checkoutInfo.valid.firstName, TestData.checkoutInfo.valid.lastName, '');
    await pom.checkoutPage.clickContinue();
    await pom.checkoutPage.assertErrorMessage(TestData.errorMessages.checkout.postalCodeRequired);
  });

  test('F-33: Cancel checkout', async ({ page }) => {
    await pom.checkoutPage.clickCancel();
    await expect(page).toHaveURL(TestData.urls.cart);
  });

  test('F-34: Verify tax calculation', async () => {
    await pom.checkoutPage.fillCheckoutInfo(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await pom.checkoutPage.clickContinue();
    const itemTotal = await pom.checkoutPage.getItemTotal();
    const tax = await pom.checkoutPage.getTax();
    const total = await pom.checkoutPage.getTotal();
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  test('F-35: Order completion page elements', async () => {
    await pom.checkoutPage.completeCheckout(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    const header = await pom.checkoutPage.getCompleteHeader();
    const completeText = await pom.checkoutPage.getCompleteText();
    expect(header).toContain('Thank you for your order!');
    expect(completeText).toContain('Your order has been dispatched');
    await pom.checkoutPage.clickBackHome();
  });
});