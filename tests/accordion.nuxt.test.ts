import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import Accordion from '../app/components/base/Accordion.vue'
import type { AccordionEntry } from '../app/data/types'

const entries: AccordionEntry[] = [
  { id: 'one', title: '第一項', body: ['第一項內容'] },
  { id: 'two', title: '第二項', body: ['第二項內容'], example: ['範例'] },
  { id: 'three', title: '待補答案', body: [] },
]

async function mountAccordion() {
  return mountSuspended(Accordion, {
    props: { entries },
    attachTo: document.body,
  })
}

describe('Accordion', () => {
  it('renders every expandable item collapsed, with correct aria wiring', async () => {
    const wrapper = await mountAccordion()
    const triggers = wrapper.findAll('[data-accordion-trigger]')

    expect(triggers).toHaveLength(2)

    for (const trigger of triggers) {
      expect(trigger.attributes('aria-expanded')).toBe('false')
      // 原生 button：Enter / Space 由瀏覽器轉成 click
      expect(trigger.element.tagName).toBe('BUTTON')
    }

    expect(triggers[0]!.attributes('aria-controls')).toBe('one-panel')
    expect(wrapper.find('#one-panel').attributes('aria-labelledby')).toBe('one-trigger')
    expect(wrapper.find('#one-panel').attributes('role')).toBe('region')
    expect(wrapper.find('#one-panel').attributes('inert')).toBeDefined()

    wrapper.unmount()
  })

  it('renders an entry without answers as a static row, not a button', async () => {
    const wrapper = await mountAccordion()

    expect(wrapper.text()).toContain('待補答案')
    expect(wrapper.find('#three-panel').exists()).toBe(false)
    expect(wrapper.findAll('[data-accordion-trigger]').map(t => t.text()))
      .not.toContain('待補答案')

    wrapper.unmount()
  })

  it('toggles a panel open and closed on click', async () => {
    const wrapper = await mountAccordion()
    const trigger = wrapper.findAll('[data-accordion-trigger]')[0]!

    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#one-panel').attributes('inert')).toBeUndefined()

    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('#one-panel').attributes('inert')).toBeDefined()

    wrapper.unmount()
  })

  it('keeps several panels open at the same time', async () => {
    const wrapper = await mountAccordion()
    const triggers = wrapper.findAll('[data-accordion-trigger]')

    await triggers[0]!.trigger('click')
    await triggers[1]!.trigger('click')

    expect(triggers.map(t => t.attributes('aria-expanded'))).toEqual(['true', 'true'])

    wrapper.unmount()
  })

  it('moves focus between headers with ArrowDown, ArrowUp, Home and End', async () => {
    const wrapper = await mountAccordion()
    const triggers = wrapper.findAll('[data-accordion-trigger]')
    const first = triggers[0]!.element as HTMLElement
    const last = triggers[1]!.element as HTMLElement

    first.focus()
    await triggers[0]!.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(last)

    await triggers[1]!.trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(first)

    await triggers[0]!.trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(last)

    await triggers[1]!.trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(first)

    wrapper.unmount()
  })

  it('skips items without answers in keyboard navigation', async () => {
    const wrapper = await mountAccordion()
    const triggers = wrapper.findAll('[data-accordion-trigger]')
    const first = triggers[0]!.element as HTMLElement

    ;(triggers[1]!.element as HTMLElement).focus()
    await triggers[1]!.trigger('keydown', { key: 'ArrowDown' })

    // 只有兩個可展開項目，往下會回到第一項而不是靜態問題列
    expect(document.activeElement).toBe(first)

    wrapper.unmount()
  })
})
