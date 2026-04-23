import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
    this.logo = '.app_logo';
    this.botImage = '.bot_column';
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.waitForNavigation();
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isLoginPageLoaded() {
    return await this.isVisible(this.logo);
  }

  async clearCredentials() {
    await this.page.fill(this.usernameInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  async loginWithEnterKey(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.pressKey('Enter');
    await this.waitForNavigation();
  }

  async getErrorMessageText() {
    const errorElement = await this.page.locator(this.errorMessage);
    return await errorElement.textContent();
  }

  async isErrorIconDisplayed() {
    const errorIcon = await this.page.locator('.error-button');
    return await errorIcon.isVisible();
  }

  // Assertions
  async assertLoginSuccessful() {
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
  }

  async assertErrorMessage(expectedMessage) {
    const actualMessage = await this.getErrorMessage();
    if (!actualMessage.includes(expectedMessage)) {
      throw new Error(`Expected message "${expectedMessage}" but got "${actualMessage}"`);
    }
  }

  async assertLoginButtonEnabled() {
    const isEnabled = await this.isEnabled(this.loginButton);
    if (!isEnabled) {
      throw new Error('Login button is disabled');
    }
  }
}

export default LoginPage ;