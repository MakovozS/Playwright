import { test } from '../fixtures/garagePageFixture';
import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Test adding all Porsche cars and removing them one by one', async ({ userGaragePage, addCar, addExpense }) => {
    await addCar('Porsche', '911');
    await addCar('Porsche', 'Cayenne');
    await addCar('Porsche', 'Panamera');
    await userGaragePage.page.waitForTimeout(1000);

    await addExpense('1000', '10', '13');

    await userGaragePage.page.goto(process.env.GARAGE_URL as string);

    for (let i = 0; i < 3; i++) {
        await userGaragePage.removeLastAddedCar();
    }
    await userGaragePage.page.waitForTimeout(2000);

    const carsListAfterRemoval = await userGaragePage.carsList.count();
    expect(carsListAfterRemoval).toBe(0);
    await userGaragePage.page.close();
});
