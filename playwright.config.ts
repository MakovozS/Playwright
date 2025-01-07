import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests', // Папка с тестами
  fullyParallel: false, // Не запускать тесты параллельно
  forbidOnly: !!process.env.CI, // Запретить test.only в CI
  retries: process.env.CI ? 2 : 0, // Повторить тесты на CI в случае неудачи
  workers: process.env.CI ? 1 : undefined, // Использовать 1 воркер в CI
  reporter: 'html', // Репортер для отчета
  use: {
    baseURL: 'https://qauto.forstudy.space', // Базовый URL для тестов
    httpCredentials: {
      username: 'guest', // Логин для авторизации
      password: 'welcome2qauto', // Пароль для авторизации
    },
    trace: 'on-first-retry', // Включить сбор трассировки при повторе тестов
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Если вам нужно протестировать другие браузеры, можно раскомментировать следующие секции:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
}); 
