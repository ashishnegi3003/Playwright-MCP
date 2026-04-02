const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = path.join(__dirname);
fs.mkdirSync(outputDir, { recursive: true });

async function createAccount(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.getByRole('link', { name: /signup\s*\/\s*login/i }).click();
  await page.waitForSelector('text=New User Signup!', { timeout: 15000 });

  await page.fill('input[data-qa="signup-name"]', 'Temp User');
  const email = `tempuser+${Date.now()}@example.com`;
  await page.fill('input[data-qa="signup-email"]', email);
  await page.getByRole('button', { name: /signup/i }).first().click();

  await page.waitForSelector('text=Enter Account Information', { timeout: 15000 });
  await page.check('#id_gender1');
  const password = 'Password123!';
  await page.fill('#password', password);
  await page.selectOption('#days', '15');
  await page.selectOption('#months', '1');
  await page.selectOption('#years', '1990');
  await page.check('#newsletter');
  await page.check('#optin');
  await page.fill('#first_name', 'Temp');
  await page.fill('#last_name', 'User');
  await page.fill('#company', 'ACME Corp');
  await page.fill('#address1', '123 Main Street');
  await page.fill('#address2', 'Suite 100');
  await page.selectOption('#country', { label: 'India' });
  await page.fill('#state', 'Delhi');
  await page.fill('#city', 'New Delhi');
  await page.fill('#zipcode', '110001');
  await page.fill('#mobile_number', '9876543210');
  await page.getByRole('button', { name: /Create Account/i }).click();

  await page.waitForSelector('text=Account Created!', { timeout: 20000 });
  const continueLink = page.getByRole('link', { name: /Continue/i });
  if (await continueLink.count()) {
    await continueLink.first().click();
    await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
  }

  await context.close();
  return { email, password };
}

(async () => {
  const browser = await chromium.launch();
  try {
    const credentials = await createAccount(browser);
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.screenshot({ path: path.join(outputDir, 'step1_homepage.png'), fullPage: true });

    await page.getByRole('link', { name: /signup\s*\/\s*login/i }).click();
    await page.waitForSelector('text=Login to your account', { timeout: 15000 });
    await page.screenshot({ path: path.join(outputDir, 'step2_signup-login.png'), fullPage: true });

    await page.fill('input[data-qa="login-email"]', credentials.email);
    await page.fill('input[data-qa="login-password"]', credentials.password);
    await page.screenshot({ path: path.join(outputDir, 'step3_login-filled.png'), fullPage: true });

    await page.getByRole('button', { name: /login/i }).first().click();
    await page.waitForSelector('text=Logged in as', { timeout: 20000 });
    await page.screenshot({ path: path.join(outputDir, 'step4_logged-in.png'), fullPage: true });

    const deleteLink = page.getByRole('link', { name: /Delete Account/i });
    if (await deleteLink.count()) {
      await deleteLink.first().click();
    } else {
      const deleteButton = page.getByRole('button', { name: /Delete Account/i });
      if (await deleteButton.count()) await deleteButton.first().click();
    }
    await page.waitForSelector('text=ACCOUNT DELETED!', { timeout: 20000 });
    await page.screenshot({ path: path.join(outputDir, 'step5_account-deleted.png'), fullPage: true });

    await context.close();
    console.log('Test Case 2 completed successfully.');
  } catch (error) {
    console.error('Test Case 2 failed:', error);
  } finally {
    await browser.close();
  }
})();
