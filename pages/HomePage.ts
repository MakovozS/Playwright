import { Page, Locator } from '@playwright/test';

export default class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('//*[contains(@class, "header_signin")]');
    }

    async goToSignInForm() {
        await this.signInButton.click();
    }
}
