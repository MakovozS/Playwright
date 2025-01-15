import { Page, Locator } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly reEnterPasswordError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[name="name"]');
        this.lastNameInput = page.locator('[name="lastName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.reEnterPasswordInput = page.locator('input[name="repeatPassword"]');
        this.registerButton = page.locator('button[type="button"].btn.btn-primary');
        this.emailError = page.locator('div.error-message:has-text("Email required")');
        this.passwordError = page.locator('div.error-message:has-text("Password required")');
        this.reEnterPasswordError = page.locator('div.error-message:has-text("Re-enter password required")');
    }

    async fillSignUpForm(name: string, lastName: string, email: string, password: string, reEnterPassword: string) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.reEnterPasswordInput.fill(reEnterPassword);
    }

    async fillNameField(name: string) {
        await this.nameInput.fill(name);
        await this.nameInput.blur();
    }

    async fillLastNameField(lastName: string) {
        await this.lastNameInput.fill(lastName);
        await this.lastNameInput.blur();
    }

    async fillEmailField(email: string) {
        await this.emailInput.fill(email);
        await this.emailInput.blur();
    }

    async fillPasswordField(password: string) {
        await this.passwordInput.fill(password);
        await this.passwordInput.blur();
    }

    async fillReEnterPasswordField(reEnterPassword: string) {
        await this.reEnterPasswordInput.fill(reEnterPassword);
        await this.reEnterPasswordInput.blur();
    }

    async submitRegistrationForm() {
        await this.registerButton.click();
    }

}
