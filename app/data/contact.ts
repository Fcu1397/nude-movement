import type { ContactContent } from './types'
import { site } from './site'

export const contact: ContactContent = {
  eyebrow: 'Ready to Move?',
  title: '開始安排屬於自己的身體練習。',
  note: '課程相關問題，也歡迎先私訊詢問。',
  lineCta: {
    label: 'LINE 預約',
    href: site.lineUrl,
    external: true,
  },
  instagramCta: {
    label: 'Instagram',
    href: site.instagramUrl,
    external: true,
  },
}
