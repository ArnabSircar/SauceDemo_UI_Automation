// pages/BasePage.js
class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Common wait strategies
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }

  // Common actions
  async click(selector) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.waitForElement(selector);
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    await this.waitForElement(selector);
    return await this.page.textContent(selector);
  }

  async getAttribute(selector, attribute) {
    await this.waitForElement(selector);
    return await this.page.getAttribute(selector, attribute);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async isEnabled(selector) {
    return await this.page.isEnabled(selector);
  }

  // Screenshot on failure
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}_${Date.now()}.png` });
  }

  // Scroll
  async scrollToElement(selector) {
    await this.page.scrollIntoViewIfNeeded(selector);
  }

  // Press keys
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  // Get current URL
  async getCurrentUrl() {
    return this.page.url();
  }

  // Reload page
  async reload() {
    await this.page.reload();
    await this.waitForNavigation();
  }
}

export default BasePage ;