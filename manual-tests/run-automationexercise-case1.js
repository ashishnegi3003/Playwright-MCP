const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const outDir = path.join(__dirname, 'case1-automationexercise');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const email = `testuser+${Date.now()}@example.com`;

  try {
    await page.goto('https://automationexercise.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, 'step1_homepage.png'), fullPage: true });

    await page.click('a[href="/login"]');
    await page.waitForSelector('input[data-qa="signup-name"]', { timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, 'step2_signup-login.png'), fullPage: true });

    await page.fill('input[data-qa="signup-name"]', 'Automation Test');
    await page.fill('input[data-qa="signup-email"]', email);
    await page.screenshot({ path: path.join(outDir, 'step3_signup-filled.png'), fullPage: true });
    await page.click('button[data-qa="signup-button"]');

    await page.waitForSelector('h2', { timeout: 15000 });
    await page.waitForFunction(() => document.body.innerText.includes('ENTER ACCOUNT INFORMATION'), { timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, 'step4_enter-account-information.png'), fullPage: true });

    await page.click('#id_gender1');
    await page.fill('#password', 'Test@12345');
    await page.selectOption('#days', '10');
    await page.selectOption('#months', '5');
    await page.selectOption('#years', '1990');
    await page.check('#newsletter');
    await page.check('#optin');
    await page.fill('#first_name', 'Auto');
    await page.fill('#last_name', 'Tester');
    await page.fill('#company', 'My Company');
    await page.fill('#address1', '123 Testing St');
    await page.fill('#address2', 'Suite 100');
    await page.selectOption('#country', 'United States');
    await page.fill('#state', 'Test State');
    await page.fill('#city', 'Test City');
    await page.fill('#zipcode', '12345');
    await page.fill('#mobile_number', '1234567890');
    await page.screenshot({ path: path.join(outDir, 'step5_account-details-filled.png'), fullPage: true });
    await page.click('button[data-qa="create-account"]');

    await page.waitForFunction(() => document.body.innerText.includes('ACCOUNT CREATED!'), { timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, 'step6_account-created.png'), fullPage: true });

    await page.click('a[data-qa="continue-button"]');
    await page.waitForFunction(() => document.body.innerText.includes('Logged in as '), { timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, 'step7_logged-in.png'), fullPage: true });

    await page.click('a[href="/delete_account"]');
    await page.waitForFunction(() => document.body.innerText.includes('ACCOUNT DELETED!'), { timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, 'step8_account-deleted.png'), fullPage: true });

    const reportPath = path.join(__dirname, 'automationexercise-test-case1-report.md');
    const reportContent = `# AutomationExercise Test Case 1 Report\n\n` +
      `## Scenario\nRegister user and delete account on https://automationexercise.com\n\n` +
      `## Steps and Evidence\n` +
      `1. Open homepage\n   - screenshot: case1-automationexercise/step1_homepage.png\n` +
      `2. Navigate to Signup / Login\n   - screenshot: case1-automationexercise/step2_signup-login.png\n` +
      `3. Fill signup details\n   - screenshot: case1-automationexercise/step3_signup-filled.png\n` +
      `4. Enter account information page\n   - screenshot: case1-automationexercise/step4_enter-account-information.png\n` +
      `5. Fill account details\n   - screenshot: case1-automationexercise/step5_account-details-filled.png\n` +
      `6. Create account\n   - screenshot: case1-automationexercise/step6_account-created.png\n` +
      `7. Continue after account creation\n   - screenshot: case1-automationexercise/step7_logged-in.png\n` +
      `8. Delete account\n   - screenshot: case1-automationexercise/step8_account-deleted.png\n\n` +
      `## Outcome\nTest case 1 completed successfully with account registration and deletion evidence captured.\n`;
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log('Test case 1 completed, evidence and report saved.');
  } catch (error) {
    console.error('Error during test execution:', error);
    await page.screenshot({ path: path.join(outDir, 'error.png'), fullPage: true });
  } finally {
    await browser.close();
  }
})();