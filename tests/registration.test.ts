import { test, expect } from '@playwright/test';

test.describe("Registration Form Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('button.btn.btn-primary:has-text("Sign up")').click();
    });

    test.describe("Name Field Validations", () => {
        test("Error for empty field", async ({ page }) => {
            await page.locator("#signupName").fill('');
            await page.locator("#signupName").blur();
            await expect(page.locator("text=Name required")).toBeVisible();
        });

        test("Should accept valid input", async ({ page }) => {
            await page.locator("#signupName").fill('Svit Lana');
            await page.locator("#signupName").blur();
            await expect(page.locator("text=Name is invalid")).toBeVisible();
        });

        test("Error wrong length", async ({ page }) => {
            await page.locator("#signupName").fill('S');
            await page.locator("#signupName").blur();
            await expect(page.locator("text=Name has to be from 2 to 20 characters long")).toBeVisible();

            await page.locator("#signupName").fill('S'.repeat(21));
            await page.locator("#signupName").blur();
            await expect(page.locator("text=Name has to be from 2 to 20 characters long")).toBeVisible();
        });

        test("Should show valid border color for invalid Name input", async ({ page }) => {
            await page.locator("#signupName").fill('Svit Lana');
            await page.locator("#signupName").blur();
            await expect(page.locator("#signupName")).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe("Last Name Field Validations", () => {
        test("Error for empty field", async ({ page }) => {
            await page.locator("#signupLastName").fill('');
            await page.locator("#signupLastName").blur();
            await expect(page.locator("text=Last name required")).toBeVisible();
        });

        test("Should accept valid input", async ({ page }) => {
            await page.locator("#signupLastName").fill('Last Name');
            await page.locator("#signupLastName").blur();
            await expect(page.locator("text=Last name is invalid")).toBeVisible();
        });

        test("Error wrong length", async ({ page }) => {
            await page.locator("#signupLastName").fill('S');
            await page.locator("#signupLastName").blur();
            await expect(page.locator("text=Last name has to be from 2 to 20 characters long")).toBeVisible();

            await page.locator("#signupLastName").fill('S'.repeat(21));
            await page.locator("#signupLastName").blur();
            await expect(page.locator("text=Last name has to be from 2 to 20 characters long")).toBeVisible();
        });

        test("Should show valid border color for invalid Last Name input", async ({ page }) => {
            await page.locator("#signupLastName").fill('Svit Lana');
            await page.locator("#signupLastName").blur();
            await expect(page.locator("#signupLastName")).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe("Email Field Validations", () => {
        test("Should show error for empty field", async ({ page }) => {
            await page.locator("#signupEmail").fill('');
            await page.locator("#signupEmail").blur();
            await expect(page.locator("text=Email required")).toBeVisible();
        });

        test("Should show error for invalid email", async ({ page }) => {
            await page.locator("#signupEmail").fill('invalid-email');
            await page.locator("#signupEmail").blur();
            await expect(page.locator("text=Email is incorrect")).toBeVisible();
        });

        test("Should accept valid email", async ({ page }) => {
            await page.locator("#signupEmail").fill('user@test.com');
            await page.locator("#signupEmail").blur();
            await expect(page.locator("text=Email is incorrect")).toBeHidden();
        });

        test("Should show valid border color for invalid Email input", async ({ page }) => {
            await page.locator("#signupEmail").fill('invalid-email');
            await page.locator("#signupEmail").blur();
            await expect(page.locator("#signupEmail")).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe("Password Field Validations", () => {
        test("Error for empty field", async ({ page }) => {
            await page.locator("#signupPassword").fill('');
            await page.locator("#signupPassword").blur();
            await expect(page.locator("text=Password required")).toBeVisible();
        });

        test("Error for wrong password", async ({ page }) => {
            await page.locator("#signupPassword").fill('Long'.repeat(4));
            await page.locator("#signupPassword").blur();
            await expect(page.locator("text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
        });

        test("Should accept strong password", async ({ page }) => {
            await page.locator("#signupPassword").fill('Password123');
            await page.locator("#signupPassword").blur();
            await expect(page.locator("text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeHidden();
        });

        test("Error for password without integer, capital letter", async ({ page }) => {
            await page.locator("#signupPassword").fill('password');
            await page.locator("#signupPassword").blur();
            await expect(page.locator("text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
        });

        test("Should show valid border color for invalid Password input", async ({ page }) => {
            await page.locator("#signupPassword").fill('password');
            await page.locator("#signupPassword").blur();
            await expect(page.locator("#signupPassword")).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe("Re-enter Password Field Validations", () => {
        test("Error for mismatched passwords", async ({ page }) => {
            await page.locator("#signupPassword").fill('Password1');
            await page.locator("#signupRepeatPassword").fill('Password123');
            await page.locator("#signupRepeatPassword").blur();
            await expect(page.locator("text=Passwords do not match")).toBeVisible();
        });

        test("Error for empty field", async ({ page }) => {
            await page.locator("#signupRepeatPassword").fill('');
            await page.locator("#signupRepeatPassword").blur();
            await expect(page.locator("text=Re-enter password required")).toBeVisible();
        });

        test("Should show valid border color for invalid Re-enter password input", async ({ page }) => {
            await page.locator("#signupRepeatPassword").fill('password');
            await page.locator("#signupRepeatPassword").blur();
            await expect(page.locator("#signupRepeatPassword")).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test("Should accept matching passwords", async ({ page }) => {
            await page.locator("#signupPassword").fill('Password123');
            await page.locator("#signupRepeatPassword").fill('Password123');
            await page.locator("#signupRepeatPassword").blur();
            await expect(page.locator("text=Passwords do not match")).toBeHidden();
        });
    });

    test.describe("Register Button Validation", () => {
        test("Should be disabled if fields are invalid", async ({ page }) => {
            await page.goto('https://qauto.forstudy.space');
            await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
            await expect(page.locator('.modal-content button.btn.btn-primary')).toBeDisabled();
        });

        test("Should be disabled if any field is invalid", async ({ page }) => {
            await page.goto('https://qauto.forstudy.space');
            await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
            await page.locator("#signupName").fill('Name');
            await page.locator("#signupLastName").fill('Last');
            await page.locator("#signupEmail").fill('invalid-email');
            await page.locator("#signupPassword").fill('Password123');
            await page.locator("#signupRepeatPassword").fill('Password123');
            await expect(page.locator('.modal-content button.btn.btn-primary')).toBeDisabled();
        });

        test("Should enable Register button and submit form if all fields are valid", async ({ page }) => {
            await page.goto('https://qauto.forstudy.space');
            await page.locator('button.hero-descriptor_btn.btn.btn-primary').click();
            await page.locator("#signupName").fill('Svitlana');
            await page.locator("#signupLastName").fill('Testova');
            await page.locator("#signupEmail").fill('makovozsvetl+auto85@gmail.com');
            await page.locator("#signupPassword").fill('Password123');
            await page.locator("#signupRepeatPassword").fill('Password123');
            const registerButton = page.locator('.modal-content button.btn.btn-primary');
            await expect(registerButton).toBeEnabled();
            await registerButton.click();
            await expect(page.locator('text=My profile')).toBeVisible();
        });


    });

});