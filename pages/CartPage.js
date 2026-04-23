// pages/CartPage.js
import BasePage from './BasePage';

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = '.cart_item';
    this.checkoutButton = '[data-test="checkout"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.removeButtons = 'button:has-text("Remove")';
    this.cartList = '.cart_list';
    this.cartQuantity = '.cart_quantity';
    this.itemPrices = '.inventory_item_price';
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getCartItemQuantities() {
    const quantities = await this.page.locator(this.cartQuantity).allTextContents();
    return quantities.map(q => parseInt(q));
  }

  async getCartItemPrices() {
    const prices = await this.page.locator(this.itemPrices).allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async removeItemFromCart(itemName) {
    const itemSelector = `.cart_item:has-text("${itemName}")`;
    const removeBtn = `${itemSelector} button:has-text("Remove")`;
    await this.click(removeBtn);
  }

  async removeAllItems() {
    const removeButtons = await this.page.locator(this.removeButtons).all();
    for (const button of removeButtons) {
      await button.click();
      await this.waitForTimeout(5000);
    }
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async isCartEmpty() {
    const count = await this.getCartItemCount();
    return count === 0;
  }

  async getTotalItemsPrice() {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  async verifyItemInCart(itemName) {
    const itemNames = await this.getCartItemNames();
    return itemNames.includes(itemName);
  }

  // Assertions
  async assertCartContainsItems(expectedCount) {
    const actualCount = await this.getCartItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in cart but found ${actualCount}`);
    }
  }

  async assertItemRemoved(itemName) {
    const isPresent = await this.verifyItemInCart(itemName);
    if (isPresent) {
      throw new Error(`Item "${itemName}" still present in cart after removal`);
    }
  }
}

export default  CartPage ;