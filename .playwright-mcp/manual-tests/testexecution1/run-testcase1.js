const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = path.join(__dirname);
fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const url = 'https://automationexercise.com';
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.screenshot({ path: path.join(outputDir, 'step1_homepage.png'), fullPage: true });

    await page.getByRole('link', { name: /signup\s*\/\s*login/i }).click();
    await page.waitForSelector('text=New User Signup!', { timeout: 15000 });
    await page.screenshot({ path: path.join(outputDir, 'step2_signup-login.png'), fullPage: true });

    const signupName = page.locator('input[data-qa="signup-name"]');
    const signupEmail = page.locator('input[data-qa="signup-email"]');
    await signupName.fill('Test User');
    const timestamp = Date.now();
    const generatedEmail = `testuser+${timestamp}@example.com`;
    await signupEmail.fill(generatedEmail);
    await page.screenshot({ path: path.join(outputDir, 'step3_signup-filled.png'), fullPage: true });

    await page.getByRole('button', { name: /signup/i }).first().click();
    await page.waitForSelector('text=Enter Account Information', { timeout: 15000 });
    await page.screenshot({ path: path.join(outputDir, 'step4_enter-account-information.png'), fullPage: true });

    await page.locator('#id_gender1').check();
    await page.locator('#password').fill('Password123');
    await page.locator('#days').selectOption('15');
    await page.locator('#months').selectOption('1');
    await page.locator('#years').selectOption('1990');
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();
    await page.locator('#first_name').fill('Test');
    await page.locator('#last_name').fill('User');
    await page.locator('#company').fill('ACME Corp');
    await page.locator('#address1').fill('123 Main Street');
    await page.locator('#address2').fill('Suite 100');
    await page.locator('#country').selectOption({ label: 'India' });
    await page.locator('#state').fill('Delhi');
    await page.locator('#city').fill('New Delhi');
    await page.locator('#zipcode').fill('110001');
    await page.locator('#mobile_number').fill('9876543210');
    await page.screenshot({ path: path.join(outputDir, 'step5_account-details-filled.png'), fullPage: true });

    await page.getByRole('button', { name: /create account/i }).click();
    await page.waitForSelector('text=Account Created!', { timeout: 15000 });
    await page.screenshot({ path: path.join(outputDir, 'step6_account-created.png'), fullPage: true });

    const continueLink = page.getByRole('link', { name: /Continue/i });
    if (await continueLink.count()) {
      await continueLink.first().click();
    } else {
      const continueButton = page.getByRole('button', { name: /Continue/i });
      if (await continueButton.count()) await continueButton.first().click();
    }
    await page.waitForSelector('text=Logged in as', { timeout: 20000 });
    await page.screenshot({ path: path.join(outputDir, 'step7_logged-in.png'), fullPage: true });

    const deleteLink = page.getByRole('link', { name: /Delete Account/i });
    if (await deleteLink.count()) {
      await deleteLink.first().click();
    } else {
      const deleteButton = page.getByRole('button', { name: /Delete Account/i });
      if (await deleteButton.count()) await deleteButton.first().click();
    }
    await page.waitForSelector('text=ACCOUNT DELETED!', { timeout: 20000 });
    await page.screenshot({ path: path.join(outputDir, 'step8_account-deleted.png'), fullPage: true });

    console.log('Test Case 1 completed successfully.');
  } catch (error) {
    console.error('Test Case 1 failed:', error);
  } finally {
    await browser.close();
  }
})();
