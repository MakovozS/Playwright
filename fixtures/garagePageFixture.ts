import { test as base, BrowserContext, Page } from '@playwright/test';
import GaragePage from '../pages/GaragePage';
import AddExpensePage from '../pages/AddExpensePage';

type garagePageTypes = {
    userGaragePage: GaragePage;
    addCar: (brand: string, model: string) => Promise<void>;
    removeCar: () => Promise<void>;
    addExpense: (mileage: string, liters: string, totalCost: string) => Promise<void>;
};

export const test = base.extend<garagePageTypes>({
    userGaragePage: async ({ browser }, use) => {
        const storageStatePath = './storageState.json';
        const context: BrowserContext = await browser.newContext({
            storageState: storageStatePath,
        });
        const page: Page = await context.newPage();
        await page.goto('https://qauto.forstudy.space/panel/garage');
        const garagePage = new GaragePage(page);
        await use(garagePage);
    },
    addCar: async ({ userGaragePage }, use) => {
        const addCar = async (brand: string, model: string) => {
            await userGaragePage.addCarByBrandAndModel(brand, model);
        };
        await use(addCar);
    },
    removeCar: async ({ userGaragePage }, use) => {
        const removeCar = async () => {
            await userGaragePage.removeLastAddedCar();
        };
        await use(removeCar);
    },
    addExpense: async ({ userGaragePage }, use) => {
        const addExpense = async (mileage: string, liters: string, totalCost: string) => {
            const addExpensePage = new AddExpensePage(userGaragePage.page);
            await addExpensePage.clickAddExpenseButton();
            await addExpensePage.fillMileage(mileage);
            await addExpensePage.fillLiters(liters);
            await addExpensePage.fillTotalCost(totalCost);
            await addExpensePage.clickSaveButton();
        };
        await use(addExpense);
    },
});
