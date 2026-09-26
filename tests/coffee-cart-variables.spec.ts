import { test, expect } from '@playwright/test';

test('TC-001, Add product to cart', async ({ page }) => {
  const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
  const cartPage = page.getByRole('link', { name: 'Cart page' });
  const orderList = page.locator('#app');
  const coffeeEspressoMacchiato = 'Espresso Macchiato';

  await page.goto('/');
  await espressoMacchiato.click();
  await cartPage.click();
  await expect(orderList).toContainText(coffeeEspressoMacchiato);
});

test('TC-002, Cart is empty', async ({ page }) => {
  const cartPage = page.getByRole('link', { name: 'Cart page' });
  const orderPage = page.getByRole('paragraph');
  const noCoffeeMessage = 'No coffee, go add some.';

  await page.goto('/');
  await cartPage.click();
  await expect(orderPage).toContainText(noCoffeeMessage);
});

test('TC-003, Sum is correct', async ({ page }) => {
  const coffeePage = page.locator('#app');
  const coffeeEspressoMacchiato = 'Espresso Macchiato $12.00';
  const cupEspressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
  const coffeeCappuccino = 'Cappuccino $19.00';
  const cupCappuccino = page.locator('[data-test="Cappuccino"]');
  const checkout = page.locator('[data-test="checkout"]');
  const totalSum = 'Total: $31.00';

  await page.goto('/');
  await expect(coffeePage).toContainText(coffeeEspressoMacchiato);
  await cupEspressoMacchiato.click();
  await expect(coffeePage).toContainText(coffeeCappuccino);
  await cupCappuccino.click();
  await expect(checkout).toContainText(totalSum);
});

test('TC-004, Extra cup proposition is present', async ({ page }) => {
  const coffeeMocha = page.locator('[data-test="Mocha"]');
  const coffeeFlatWhite = page.locator('[data-test="Flat_White"]');
  const coffeeAmericano = page.locator('[data-test="Americano"]');
  const coffeePage = page.locator('#app');
  const luckyDayMessage = 'It\'s your lucky day! Get an extra cup of Mocha for $4.';

  await page.goto('/');
  await coffeeMocha.click();
  await coffeeFlatWhite.click();
  await coffeeAmericano.click();
  await expect(coffeePage).toContainText(luckyDayMessage);
});

test('TC-005, Success message is present', async ({ page }) => {
  const coffeeCappuccino = page.locator('[data-test="Cappuccino"]');
  const cartPage = page.getByRole('link', { name: 'Cart page' });
  const nameField = page.getByRole('textbox', { name: 'Name' });
  const checkout = page.locator('[data-test="checkout"]');
  const userName = 'SD';
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const userEmail = 'ref@data.co';
  const promotionCheckbox = page.getByRole('checkbox', { name: 'Promotion checkbox' });
  const buttonSubmit = page.getByRole('button', { name: 'Submit' });
  const orderPage = page.locator('#app');
  const successMessage = 'Thanks for your purchase. Please check your email for payment.';

  await page.goto('/');
  await coffeeCappuccino.click();
  await cartPage.click();
  await checkout.click();
  await nameField.fill(userName);
  await emailField.fill(userEmail);
  await promotionCheckbox.check();
  await buttonSubmit.click();
  await expect(orderPage).toContainText(successMessage);
});