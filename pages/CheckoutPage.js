// pages/CheckoutPage.js
import BasePage from './BasePage';

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.cancelButton = '[data-test="cancel"]';
    this.itemTotal = '.summary_subtotal_label';
    this.tax = '.summary_tax_label';
    this.total = '.summary_total_label';
    this.completeHeader = '.complete-header';
    this.completeText = '.complete-text';
    this.ponyExpressImage = '.pony_express';
    this.backHomeButton = '[data-test="back-to-products"]';
    this.errorMessage = '[data-test="error"]';
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }

  async clickFinish() {
    await this.click(this.finishButton);
  }

  async clickCancel() {
    await this.click(this.cancelButton);
  }

  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.clickContinue();
    await this.waitForNavigation();
    await this.clickFinish();
  }

  async getItemTotal() {
    const text = await this.getText(this.itemTotal);
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.getText(this.tax);
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.getText(this.total);
    return parseFloat(text.replace('Total: $', ''));
  }

  async getCompleteHeader() {
    return await this.getText(this.completeHeader);
  }

  async getCompleteText() {
    return await this.getText(this.completeText);
  }

  async clickBackHome() {
    await this.click(this.backHomeButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isCheckoutOverviewDisplayed() {
    return await this.isVisible(this.itemTotal);
  }

  async isOrderCompleteDisplayed() {
    return await this.isVisible(this.completeHeader);
  }

  // Assertions
  async assertTotalCalculation() {
    const itemTotal = await this.getItemTotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    const calculatedTotal = parseFloat((itemTotal + tax).toFixed(2));
    
    if (Math.abs(calculatedTotal - total) > 0.01) {
      throw new Error(`Total calculation mismatch. Expected ${calculatedTotal} but got ${total}`);
    }
  }

  async assertOrderComplete() {
    const header = await this.getCompleteHeader();
    console.log('Order completion header:', header);
    if (!header.includes('Thank you for your order!')) {
      throw new Error(`Order completion message not displayed. Got: ${header}`);
    }
  }

  async assertErrorMessage(expectedMessage) {
    const actualMessage = await this.getErrorMessage();
    if (!actualMessage.includes(expectedMessage)) {
      throw new Error(`Expected error "${expectedMessage}" but got "${actualMessage}"`);
    }
  }
}

export default  CheckoutPage ;