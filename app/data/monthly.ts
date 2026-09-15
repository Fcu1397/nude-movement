import type { MonthlyPlanContent } from './types'
import { site } from './site'

export const monthly: MonthlyPlanContent = {
  heading: {
    eyebrow: 'Monthly 4 Classes',
    title: '當月 4 堂優惠方案',
    subtitle: '每月一次，安排自己的身體練習。',
  },
  content: [
    '只要於排課時一次預約當月 4 堂以上，',
    '該批課程即可全面享有優惠價格。',
  ],
  features: [
    '✓ 可跨課程類別',
    '✓ 私人課 / 雙人課 / 團課皆可混搭',
    '✓ 全部享優惠價格',
  ],
  example: {
    title: 'Your Monthly Plan',
    items: [
      { label: 'Ballet Private', count: 2 },
      { label: 'Stretch Group', count: 2 },
    ],
    totalLabel: 'Total Classes: 4',
  },
  cta: {
    label: '開始安排本月課程',
    href: site.lineUrl,
    external: true,
  },
}
