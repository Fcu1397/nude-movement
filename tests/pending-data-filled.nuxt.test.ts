import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

// 業主資料到位後的行為：填入 site.ts 即應自動顯示，不需要改元件。
vi.mock('~/data/site', () => ({
  site: {
    brandName: 'Nude Movement',
    url: 'https://example.com',
    lineUrl: 'https://line.me/R/ti/p/@example',
    instagramUrl: 'https://instagram.com/example',
    roomFee: 500,
    copyrightYear: 2026,
    bookingLabel: 'LINE 預約',
    bookingBarLabel: 'LINE 預約課程',
    navigation: [
      { label: 'Top', href: '#top' },
      { label: 'Classes', href: '#classes' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Monthly Plan', href: '#monthly' },
      { label: 'Booking', href: '#booking' },
      { label: 'Policy', href: '#policy' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    seo: { title: 't', description: 'd', ogImage: '/images/placeholder/og.jpg' },
  },
}))

const AppHeader = await import('../app/components/layout/AppHeader.vue')
const MobileBookingBar = await import('../app/components/layout/MobileBookingBar.vue')
const PolicySection = await import('../app/components/sections/PolicySection.vue')
const { policy } = await import('../app/data/policy')

describe('with owner data filled in', () => {
  it('shows the LINE call to action in the header, opening in a new tab', async () => {
    const wrapper = await mountSuspended(AppHeader.default)
    const cta = wrapper.find('.site-header__cta')

    expect(cta.attributes('href')).toBe('https://line.me/R/ti/p/@example')
    expect(cta.attributes('target')).toBe('_blank')
    expect(cta.attributes('rel')).toContain('noopener')
    expect(cta.text()).toContain('另開視窗')

    wrapper.unmount()
  })

  it('renders the mobile booking bar with an in-flow spacer', async () => {
    const wrapper = await mountSuspended(MobileBookingBar.default)

    expect(wrapper.find('.mobile-booking__cta').attributes('href'))
      .toBe('https://line.me/R/ti/p/@example')
    expect(wrapper.find('.mobile-booking__spacer').exists()).toBe(true)

    wrapper.unmount()
  })

  it('appends the room fee to the cancellation policy once it is known', async () => {
    const wrapper = await mountSuspended(PolicySection.default, {
      props: { content: policy },
    })

    expect(wrapper.text()).toContain('將扣除基本場租費用（NT$500）。')

    wrapper.unmount()
  })
})
