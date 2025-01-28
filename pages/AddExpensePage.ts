import { Page } from '@playwright/test';

class AddExpensePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Метод для клика по кнопке добавления расхода
    async clickAddExpenseButton() {
        const addExpenseButton = this.page.locator('.car_add-expense').first();
        await addExpenseButton.waitFor({ state: 'visible' });
        await addExpenseButton.click();
    }

    // Метод для заполнения поля пробега
    async fillMileage(mileage: string) {
        const mileageField = this.page.locator('#addExpenseMileage');
        await mileageField.waitFor({ state: 'visible' });
        await mileageField.fill(mileage);
    }

    // Метод для заполнения поля литров
    async fillLiters(liters: string) {
        const litersField = this.page.locator('#addExpenseLiters');
        await litersField.waitFor({ state: 'visible' });
        await litersField.fill(liters);
    }

    // Метод для заполнения поля стоимости
    async fillTotalCost(cost: string) {
        const totalCostField = this.page.locator('#addExpenseTotalCost');
        await totalCostField.waitFor({ state: 'visible' });
        await totalCostField.fill(cost);
    }

    // Метод для клика по кнопке сохранения
    async clickSaveButton() {
        const saveButton = this.page.locator('div.modal-footer button.btn-primary:not([disabled])');
        await saveButton.waitFor({ state: 'visible' });
        await saveButton.click();
    }
}

export default AddExpensePage;
