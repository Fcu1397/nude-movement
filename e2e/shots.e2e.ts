import { expect, test } from '@playwright/test'

/**
 * 產生各斷點截圖給視覺 QA（G3）使用：npm run shots
 * 輸出到 .shots/，不進版控。
 */
const WIDTHS = [375, 768, 1280, 1440]
const SECTIONS = ['top', 'classes', 'pricing', 'monthly', 'booking', 'policy', 'faq', 'contact']

test.describe('@shots', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  for (const width of WIDTHS) {
    test(`screenshots at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'one project is enough for screenshots')

      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(300)

      await page.screenshot({ path: `.shots/${width}-full.png`, fullPage: true })

      for (const id of SECTIONS) {
        const section = page.locator(`#${id}`)
        await section.scrollIntoViewIfNeeded()
        await page.waitForTimeout(200)
        await section.screenshot({ path: `.shots/${width}-${id}.png` })
      }

      await page.locator('footer').screenshot({ path: `.shots/${width}-footer.png` })

      if (width === 375) {
        await page.goto('/')
        await page.locator('.site-header__toggle').click()
        await page.waitForTimeout(300)
        await page.screenshot({ path: '.shots/375-menu-open.png' })
      }

      expect(true).toBe(true)
    })
  }
})
