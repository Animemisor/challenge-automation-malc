/**
 * ARCHIVO: playwright.config.ts
 * PROPÓSITO: Configuración global de Playwright Test
 * NOTA: Esta configuración se usa principalmente para debugging y reportes
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Nota: Los tests se ejecutan con Cucumber, no directamente con Playwright Test
  testDir: './features',  // Cambiado de './tests' a './features'
  timeout: 120000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: 'https://phptravels.net',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});