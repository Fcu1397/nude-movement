import { defineConfig, devices } from '@playwright/test'

// 本機用系統已安裝的 Edge，免去下載 Chromium；CI 用標準 chromium。
const channel = process.env.PW_CHANNEL ?? (process.env.CI ? undefined : 'msedge')

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    channel,
    // 截圖與 a11y 檢查都在關閉動畫的狀態下進行
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 375, height: 812 }, isMobile: false },
    },
  ],
  webServer: {
    // 需先跑過 npm run generate
    command: 'npm run preview',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
