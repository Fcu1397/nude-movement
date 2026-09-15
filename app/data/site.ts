import type { SiteConfig } from './types'

export const site: SiteConfig = {
  brandName: 'Nude Movement',
  url: null,
  lineUrl: null,
  instagramUrl: null,
  roomFee: null,
  copyrightYear: 2026,
  bookingLabel: 'LINE 預約',
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
  seo: {
    title: 'Nude Movement｜芭蕾・抒情當代・嬋柔・伸展課程',
    description: '提供芭蕾、抒情當代、墊上嬋柔與伸展課程，包含私人課、雙人課與小班團課，適合成人初學者與希望提升身體控制與活動度的學員。',
    ogImage: '/images/placeholder/og.jpg',
  },
}
