import { describe, expect, it } from 'vitest'
import { classes } from '../app/data/classes'
import { faq } from '../app/data/faq'
import { hero } from '../app/data/hero'
import { policy } from '../app/data/policy'
import { pricing } from '../app/data/pricing'
import { site } from '../app/data/site'

describe('content data', () => {
  it('contains the six prices transcribed from SPEC sections 12 and 13', () => {
    expect(pricing.items.map(item => ({
      category: item.category,
      tier: item.tier,
      single: item.single,
      monthly: item.monthly,
      perPerson: item.perPerson,
    }))).toEqual([
      { category: 'ballet', tier: 'private', single: 1500, monthly: 1400, perPerson: false },
      { category: 'ballet', tier: 'duo', single: 850, monthly: 750, perPerson: true },
      { category: 'ballet', tier: 'group', single: 650, monthly: 550, perPerson: true },
      { category: 'stretch', tier: 'private', single: 1300, monthly: 1200, perPerson: false },
      { category: 'stretch', tier: 'duo', single: 750, monthly: 650, perPerson: true },
      { category: 'stretch', tier: 'group', single: 600, monthly: 500, perPerson: true },
    ])
    expect(pricing.items).toHaveLength(6)
    expect(pricing.items.every(item => item.monthly < item.single)).toBe(true)
  })

  it('contains six unanswered FAQ questions and five policy entries', () => {
    expect(faq.entries).toHaveLength(6)
    expect(faq.entries.every(entry => entry.body.length === 0)).toBe(true)
    expect(policy.entries).toHaveLength(5)
  })

  it('provides alt text for the hero and both class images', () => {
    expect(hero.image.alt.trim()).not.toBe('')
    expect(classes.items).toHaveLength(2)
    expect(classes.items.every(item => item.image.alt.trim().length > 0)).toBe(true)
  })

  it('keeps all pending site values null', () => {
    expect(site.url).toBeNull()
    expect(site.lineUrl).toBeNull()
    expect(site.instagramUrl).toBeNull()
    expect(site.roomFee).toBeNull()
  })
})
