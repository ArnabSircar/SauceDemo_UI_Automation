// pages/InventoryPage.js
import BasePage from './BasePage';
class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = '.inventory_item';
    this.productItems = '.inventory_item';
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
    this.sortDropdown = '.product_sort_container';
    this.burgerMenu = '#react-burger-menu-btn';
    this.logoutButton = '#logout_sidebar_link';
    this.resetAppButton = '#reset_sidebar_link';
    this.inventoryContainer = '#inventory_container';
    this.footer = '.footer';
  }

  async getProductCount() {
    return await this.page.locator(this.productList).count();
  }

  async addProductToCart(productName) {
    const productSelector = `.inventory_item:has-text("${productName}")`;
    const addButton = `${productSelector} button`;
    await this.click(addButton);
  }

  async addProductByIndex(index) {
    const addButtons = await this.page.locator('.btn_inventory').all();
    if (addButtons[index]) {
      await addButtons[index].click();
    }
  }

  async removeProductFromCart(productName) {
    const productSelector = `.inventory_item:has-text("${productName}")`;
    const removeButton = `${productSelector} button:has-text("Remove")`;
    await this.click(removeButton);
  }

  async getCartItemCount() {
    if (await this.isVisible(this.cartBadge)) {
      const count = await this.getText(this.cartBadge);
      return parseInt(count);
    }
    return 0;
  }

  async sortProducts(sortType) {
    const sortValues = {
      'az': 'az',      // Name (A to Z)
      'za': 'za',      // Name (Z to A)
      'lohi': 'lohi',  // Price (low to high)
      'hilo': 'hilo'   // Price (high to low)
    };
    await this.page.selectOption(this.sortDropdown, sortValues[sortType]);
    await this.waitForTimeout(500);
  }

  async getProductPrices() {
    const priceElements = await this.page.locator('.inventory_item_price').allTextContents();
    return priceElements.map(price => parseFloat(price.replace('$', '')));
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async goToCart() {
    await this.click(this.cartIcon);
  }

  async logout() {
    await this.click(this.burgerMenu);
    await this.waitForTimeout(500);
    await this.click(this.logoutButton);
  }

  async resetAppState() {
    await this.click(this.burgerMenu);
    await this.waitForTimeout(500);
    await this.click(this.resetAppButton);
    await this.pressKey('Escape');
  }

  async clickOnProduct(productName) {
    const productLink = `.inventory_item_name:has-text("${productName}")`;
    await this.click(productLink);
  }

  async getAllProductDetails() {
    const products = [];
    const items = await this.page.locator(this.productItems).all();
    
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      const description = await item.locator('.inventory_item_desc').textContent();
      products.push({ name, price, description });
    }
    return products;
  }

  async isProductDisplayed(productName) {
    const product = await this.page.locator(`.inventory_item:has-text("${productName}")`);
    return await product.isVisible();
  }

  async getButtonTextForProduct(productName) {
    const productSelector = `.inventory_item:has-text("${productName}")`;
    const button = await this.page.locator(`${productSelector} button`);
    return await button.textContent();
  }

  // Assertions
  async assertProductCount(expectedCount) {
    const actualCount = await this.getProductCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} products but found ${actualCount}`);
    }
  }

  async assertSortedByPriceAscending() {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    if (JSON.stringify(prices) !== JSON.stringify(sortedPrices)) {
      throw new Error('Products are not sorted by price in ascending order');
    }
  }

  async assertSortedByNameAscending() {
    const names = await this.getProductNames();
    const sortedNames = [...names].sort();
    if (JSON.stringify(names) !== JSON.stringify(sortedNames)) {
      throw new Error('Products are not sorted by name in ascending order');
    }
  }
}

export default InventoryPage ;