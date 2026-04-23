// fixtures/test-data.js
const TestData = {
  checkoutInfo: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    },
    invalid: {
      emptyFirstName: { firstName: '', lastName: 'Doe', postalCode: '12345' },
      emptyLastName: { firstName: 'John', lastName: '', postalCode: '12345' },
      emptyPostalCode: { firstName: 'John', lastName: 'Doe', postalCode: '' },
      allEmpty: { firstName: '', lastName: '', postalCode: '' }
    }
  },
  
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTshirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    redTshirt: 'Test.allTheThings() T-Shirt (Red)'
  },
  
  errorMessages: {
    login: {
      lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
      invalidCredentials: 'Epic sadface: Username and password do not match',
      usernameRequired: 'Epic sadface: Username is required',
      passwordRequired: 'Epic sadface: Password is required'
    },
    checkout: {
      firstNameRequired: 'Error: First Name is required',
      lastNameRequired: 'Error: Last Name is required',
      postalCodeRequired: 'Error: Postal Code is required'
    }
  },
  
  urls: {
    login: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkout: 'https://www.saucedemo.com/checkout-step-one.html',
    checkoutOverview: 'https://www.saucedemo.com/checkout-step-two.html',
    complete: 'https://www.saucedemo.com/checkout-complete.html'
  }
};

export default  TestData ;