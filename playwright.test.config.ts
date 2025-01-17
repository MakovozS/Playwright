import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения из файла .env.test
dotenv.config({ path: '.env.test' });


export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000, // Время выполнения теста
    expect: {
        timeout: 5000, // Таймаут ожидания элементов
    },
    use: {
        baseURL: process.env.BASE_URL, // URL берется из переменной окружения
        httpCredentials: {
            username: process.env.USERNAME!,
            password: process.env.PASSWORD!,
        },
        headless: true, // Запуск без отображения браузера
        viewport: { width: 1280, height: 720 }, // Размер окна браузера
        ignoreHTTPSErrors: true, // Игнорирование ошибок HTTPS
    },
    projects: [
        {
            name: 'chromium', // Имя проекта
            use: { ...devices['Desktop Chrome'] }, // Используем настройки для Desktop Chrome
        },
    ],
});
