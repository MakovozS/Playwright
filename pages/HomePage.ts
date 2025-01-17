import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.locator('button.btn.btn-primary:has-text("Sign up")');
    }

    async goToSignUpPage() {
        await this.signUpButton.click();
    }
}