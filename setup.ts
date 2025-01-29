import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        httpCredentials: {
            username: process.env.USERNAME!,
            password: process.env.PASSWORD!,
        }
    });

    const page = await context.newPage();

    await page.goto(process.env.BASE_URL!);

    const signInButton = page.locator("button.header_signin");
    await signInButton.waitFor({ state: 'visible', timeout: 30000 });
    await signInButton.click();
    const emailField = page.locator('#signinEmail');
    const passwordField = page.locator('#signinPassword');
    await emailField.fill('makovozsvetl@gmail.com');
    await passwordField.fill('Password123');
    const loginButton = page.locator('div.modal-footer button.btn.btn-primary');
    await loginButton.waitFor({ state: 'visible', timeout: 30000 });
    await loginButton.click();
    await page.waitForURL(process.env.GARAGE_URL!);
    const storageStatePath = 'storageState.json';
    await context.storageState({ path: storageStatePath });

})();
