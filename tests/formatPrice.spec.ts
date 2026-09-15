import { describe, expect, it } from 'vitest'
import { formatPrice } from '../app/utils/formatPrice'

describe('formatPrice', () => {
  it('formats a whole amount with the NT$ prefix and thousands separators', () => {
    expect(formatPrice(1500)).toBe('NT$1,500')
  })

  it('adds the per-person suffix when requested', () => {
    expect(formatPrice(850, true)).toBe('NT$850 / 人')
  })
})
