import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

function describeViolations(violations: { id: string, nodes: { target: unknown[], failureSummary?: string }[] }[]) {
  return violations.flatMap(v => v.nodes.map(n => `${v.id} @ ${n.target.join(' ')} — ${(n.failureSummary ?? '').replace(/\s+/g, ' ').slice(0, 160)}`))
}

const SECTIONS = ['top', 'classes', 'pricing', 'monthly', 'booking', 'policy', 'faq', 'contact']

test.describe('anchors and structure', () => {
  test('every section anchor exists and there is a single h1', async ({ page }) => {
    await page.goto('/')

    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }

    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('header links scroll to their section without the header covering it', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'header nav is desktop only')

    await page.goto('/')
    const headerHeight = await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().height)

    for (const id of ['classes', 'pricing', 'booking', 'faq']) {
      await page.locator(`.site-header__link[href="#${id}"]`).click()
      await page.waitForTimeout(400)

      const top = await page.locator(`#${id}`).evaluate(el => el.getBoundingClientRect().top)
      expect(top).toBeGreaterThanOrEqual(headerHeight - 2)
      expect(top).toBeLessThan(200)
    }
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()

    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt', /.+/)
    }
  })
})

test.describe('pending owner data', () => {
  test('renders no LINE or Instagram links and no booking bar yet', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('a[href*="line.me"], a[href*="instagram.com"]')).toHaveCount(0)
    await expect(page.locator('.mobile-booking__bar')).toHaveCount(0)
  })

  test('FAQ questions render as static rows until answers arrive', async ({ page }) => {
    await page.goto('/')

    const faqTriggers = page.locator('#faq [data-accordion-trigger]')
    await expect(faqTriggers).toHaveCount(0)
    await expect(page.locator('#faq')).toContainText('團體課需要自己找同學嗎？')
  })
})

test.describe('mobile menu', () => {
  test('opens, closes with Escape and returns focus to the toggle', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'drawer is mobile only')

    await page.goto('/')
    const toggle = page.locator('.site-header__toggle')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#site-menu')).not.toHaveAttribute('inert', /.*/)

    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('closes after choosing an anchor', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'drawer is mobile only')

    await page.goto('/')
    await page.locator('.site-header__toggle').click()
    await page.locator('.site-header__drawer-link[href="#pricing"]').click()

    await expect(page.locator('.site-header__toggle')).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('policy accordion', () => {
  test('is operable with the keyboard', async ({ page }) => {
    await page.goto('/')

    const triggers = page.locator('#policy [data-accordion-trigger]')
    await expect(triggers).toHaveCount(5)

    await triggers.first().focus()
    await page.keyboard.press('Enter')
    await expect(triggers.first()).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('ArrowDown')
    await expect(triggers.nth(1)).toBeFocused()

    await page.keyboard.press('End')
    await expect(triggers.nth(4)).toBeFocused()

    await page.keyboard.press('Space')
    await expect(triggers.nth(4)).toHaveAttribute('aria-expanded', 'true')
  })
})

test.describe('accessibility', () => {
  test('has no serious or critical axe violations', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')

    expect(describeViolations(blocking)).toEqual([])
  })

  test('has no serious or critical violations with the policy accordion open', async ({ page }) => {
    await page.goto('/')

    for (const trigger of await page.locator('#policy [data-accordion-trigger]').all()) {
      await trigger.click()
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')

    expect(describeViolations(blocking)).toEqual([])
  })
})
