import { Locator, Page } from "@playwright/test";

export default class SignInForm {
    readonly form: Page;
    readonly signInButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly registrationLink: Locator;

    constructor(page: Page) {
        this.form = page;
        this.signInButton = page.locator('button.btn.header_signin');
        this.emailField = page.locator('input#signinEmail[name="email"]');
        this.passwordField = page.locator('input#signinPassword[name="password"]');
        this.loginButton = page.locator('button[type="button"].btn.btn-primary:has-text("Login")');
        this.forgotPasswordLink = page.locator('button.btn.btn-link:has-text("Forgot password")');
        this.registrationLink = page.locator('button.btn.btn-link:has-text("Registration")');
    }

    async triggerErrorOnField(fieldName: string) {
        const element = fieldName === 'email' ? this.emailField : this.passwordField;
        await element.focus();
        await element.blur();
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async submitForm() {
        await this.loginButton.click();
    }

    async clickRegistrationLink() {
        await this.registrationLink.click();
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submitForm();
    }
}
