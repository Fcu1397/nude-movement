import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import IndexPage from '../app/pages/index.vue'

describe('pending external links', () => {
  it('does not render LINE or Instagram links while their URLs are null', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const anchors = wrapper.findAll('a')

    expect(anchors.some(anchor => anchor.text().includes('LINE'))).toBe(false)
    expect(anchors.some(anchor => anchor.text().includes('Instagram'))).toBe(false)
    expect(wrapper.text()).not.toContain('預約課程')
    expect(wrapper.text()).not.toContain('開始安排本月課程')
  })
})
