import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppHeader from '../app/components/layout/AppHeader.vue'

async function mountHeader() {
  return mountSuspended(AppHeader, { attachTo: document.body })
}

describe('AppHeader', () => {
  it('starts with the drawer closed and inert', async () => {
    const wrapper = await mountHeader()
    const toggle = wrapper.find('.site-header__toggle')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(toggle.attributes('aria-controls')).toBe('site-menu')
    expect(toggle.text()).toContain('開啟選單')
    expect(wrapper.find('#site-menu').attributes('inert')).toBeDefined()

    wrapper.unmount()
  })

  it('opens and closes the drawer from the toggle', async () => {
    const wrapper = await mountHeader()
    const toggle = wrapper.find('.site-header__toggle')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(toggle.text()).toContain('關閉選單')
    expect(wrapper.find('#site-menu').attributes('inert')).toBeUndefined()

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('#site-menu').attributes('inert')).toBeDefined()

    wrapper.unmount()
  })

  it('closes the drawer on Escape and returns focus to the toggle', async () => {
    const wrapper = await mountHeader()
    const toggle = wrapper.find('.site-header__toggle')

    await toggle.trigger('click')
    await wrapper.find('.site-header').trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle.element)

    wrapper.unmount()
  })

  it('closes the drawer when an anchor is followed', async () => {
    const wrapper = await mountHeader()
    const toggle = wrapper.find('.site-header__toggle')

    await toggle.trigger('click')
    await wrapper.findAll('.site-header__drawer-link')[1]!.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })

  it('lists every anchor in the drawer and the four main links on desktop', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.findAll('.site-header__drawer-link')).toHaveLength(8)
    expect(wrapper.findAll('.site-header__link').map(link => link.attributes('href')))
      .toEqual(['#classes', '#pricing', '#booking', '#faq'])

    wrapper.unmount()
  })

  it('renders no LINE call to action while the URL is null', async () => {
    const wrapper = await mountHeader()

    expect(wrapper.text()).not.toContain('LINE')

    wrapper.unmount()
  })
})
