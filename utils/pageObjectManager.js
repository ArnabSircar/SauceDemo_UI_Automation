import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import Users from '../fixtures/users';

class PageObjectManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async loginAsStandardUser() {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.login(Users.STANDARD_USER.username, Users.STANDARD_USER.password);
    await this.loginPage.assertLoginSuccessful();
  }

  async loginAsUser(userType, username, password) {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.login(username, password);
    await this.loginPage.assertLoginSuccessful();
  }
}

export default PageObjectManager;