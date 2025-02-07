import { expect, Locator, Page } from '@playwright/test';

export default class GaragePage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly addNewCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly submitFormButton: Locator;
    readonly carsList: Locator;
    readonly editCarButton: Locator;
    readonly removeCarButton: Locator;
    readonly addExpenseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('h1:has-text("Garage")');
        this.addNewCarButton = page.locator('button.btn.btn-primary:has-text("Add car")');
        this.brandDropdown = page.locator('select#addCarBrand');
        this.modelDropdown = page.locator('select#addCarModel');
        this.mileageField = page.locator('input#addCarMileage');
        this.submitFormButton = page.locator('.modal-content >> button.btn.btn-primary:has-text("Add")');
        this.carsList = page.locator('.car-item');
        this.editCarButton = page.locator('.icon-edit');
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.addExpenseButton = page.locator('.car_add-expense').first();
    }

    async openPage() {
        await this.page.goto('/panel/garage');
    }

    async verifyPageIsOpen() {
        await expect(this.pageHeader).toBeVisible();
    }

    async addCarByBrandAndModel(brand: string, model: string) {

        await this.addNewCarButton.waitFor({ state: 'visible', timeout: 60000 });
        await this.addNewCarButton.click();
        const addCarModal = this.page.locator('div.modal-content');
        await expect(addCarModal).toBeVisible();

        await this.brandDropdown.selectOption({ label: brand });
        await this.modelDropdown.waitFor({ state: 'visible' });
        await this.modelDropdown.selectOption({ label: model });

        await this.mileageField.click();
        await this.mileageField.fill('555');
        await this.submitFormButton.click();
    }


    async removeLastAddedCar() {
        const firstEditButton = this.page.locator('.car_actions .icon-edit').first();
        await firstEditButton.waitFor({ state: 'visible' });
        await firstEditButton.click();

        const removeCarButton = this.page.locator('.btn-outline-danger');
        await removeCarButton.waitFor({ state: 'visible' });
        await removeCarButton.click();

        const confirmRemoveButton = this.page.locator('.btn-danger');
        await confirmRemoveButton.waitFor({ state: 'visible' });
        await confirmRemoveButton.click();
    }
}
