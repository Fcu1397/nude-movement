import type { FooterContent } from './types'
import { site } from './site'

export const footer: FooterContent = {
  brandName: site.brandName,
  disciplines: [
    'Ballet',
    'Contemporary',
    'Gyrokinesis',
    'Stretching',
  ],
  socialLinks: [
    { label: 'LINE', href: site.lineUrl, external: true },
    { label: 'Instagram', href: site.instagramUrl, external: true },
  ],
  copyright: `© ${site.copyrightYear} ${site.brandName}. All Rights Reserved.`,
}
