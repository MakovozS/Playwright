import { test, expect } from '@playwright/test';
import SignInForm from '../forms/SignInForm';

test('Test changing user name in profile with API manipulation', async ({ page }) => {
    const signInForm = new SignInForm(page);
    const PROFILE_URL = process.env.PROFILE_URL;

    await page.goto(process.env.GARAGE_URL!);
    await signInForm.signInButton.click();
    await signInForm.loginWithCredentials(process.env.SIGNIN_EMAIL!, process.env.SIGNIN_PASSWORD!);
    await page.waitForURL(process.env.GARAGE_URL!);
    const userNavDropdown = page.locator('#userNavDropdown');
    await userNavDropdown.click();
    const profileLink = page.locator('a[routerlink="/panel/profile"]');
    await profileLink.click();

    const responsebody = {
        "status": "ok",
        "data": {
            "userId": 169433,
            "photoFilename": "default-user.png",
            "name": "New",
            "lastName": "User"
        }
    };

    await page.route('**/api/users/profile', route => route.fulfill({
        status: 200,
        body: JSON.stringify(responsebody),
        headers: { 'Content-Type': 'application/json' }
    }));

    await page.goto(PROFILE_URL!);

    await page.waitForSelector('p.profile_name.display-4', { timeout: 5000 });

    const nameElement = page.locator('p.profile_name.display-4');
    await expect(nameElement).toHaveText('New User');

    await page.waitForTimeout(2000);

    await page.close();
});
