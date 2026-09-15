import type { PricingContent } from './types'

const tierLabels = {
  private: { labelEn: 'Private', labelZh: '一對一私人課', perPerson: false },
  duo: { labelEn: 'Duo', labelZh: '一對二雙人課', perPerson: true },
  group: { labelEn: 'Group', labelZh: '3 人以上', perPerson: true },
} as const

export const pricing: PricingContent = {
  heading: {
    eyebrow: 'Pricing',
    title: '課程費用',
  },
  description: [
    '以下皆為 60 分鐘課程之總價，',
    '包含專業指導與教室租借費。',
  ],
  supplement: '1.5 小時或 2 小時課程將依比例另行報價。',
  categoryLabels: {
    ballet: 'Ballet / Contemporary',
    stretch: 'Gyrokinesis / Stretch',
  },
  items: [
    {
      category: 'ballet',
      tier: 'private',
      ...tierLabels.private,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 1500,
      monthly: 1400,
    },
    {
      category: 'ballet',
      tier: 'duo',
      ...tierLabels.duo,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 850,
      monthly: 750,
    },
    {
      category: 'ballet',
      tier: 'group',
      ...tierLabels.group,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 650,
      monthly: 550,
    },
    {
      category: 'stretch',
      tier: 'private',
      ...tierLabels.private,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 1300,
      monthly: 1200,
    },
    {
      category: 'stretch',
      tier: 'duo',
      ...tierLabels.duo,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 750,
      monthly: 650,
    },
    {
      category: 'stretch',
      tier: 'group',
      ...tierLabels.group,
      singleLabel: '單堂',
      monthlyEyebrow: 'Monthly Plan',
      monthlyLabel: '月 4 堂優惠',
      single: 600,
      monthly: 500,
    },
  ],
}
