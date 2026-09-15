import type { HeroContent } from './types'
import { site } from './site'

export const hero: HeroContent = {
  eyebrow: 'Ballet · Contemporary · Movement',
  title: 'Move with Grace.',
  lead: [
    '找回身體的空間，',
    '在流動裡感受自己的節奏。',
  ],
  description: 'Ballet · Contemporary · Gyrokinesis · Stretching',
  primaryCta: {
    label: '查看課程',
    href: '#classes',
    external: false,
  },
  secondaryCta: {
    label: '預約課程',
    href: site.lineUrl,
    external: true,
  },
  image: {
    src: '/images/placeholder/hero.jpg',
    alt: '自然光舞蹈教室中正在練習的舞者',
  },
}
