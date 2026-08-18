import { defineConfig, devices } from '@playwright/test';

const port = process.env.E2E_PORT ?? '3000';
const baseURL = `http://localhost:${port}`;
const harnessesEnabled = process.env.E2E_HARNESSES === '1';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: harnessesEnabled
      ? `npm run dev -- --port ${port}`
      : `npm run start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120 * 1000,
    env: harnessesEnabled ? { E2E_HARNESSES: '1' } : undefined,
  },
});
