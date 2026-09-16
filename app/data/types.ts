export type ClassCategory = 'ballet' | 'stretch'
export type Tier = 'private' | 'duo' | 'group'

export interface ImageAsset {
  src: string
  alt: string
}

export interface Heading {
  eyebrow?: string
  title: string
  subtitle?: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface SiteConfig {
  brandName: string
  url: string | null
  lineUrl: string | null
  instagramUrl: string | null
  roomFee: number | null
  copyrightYear: number
  bookingLabel: string
  bookingBarLabel: string
  navigation: NavigationLink[]
  seo: {
    title: string
    description: string
    ogImage: string
  }
}

/** href 為 null 時元件不渲染該 CTA。 */
export interface CtaLink {
  label: string
  href: string | null
  external: boolean
}

export interface HeroContent {
  eyebrow: string
  title: string
  lead: string[]
  description: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
  image: ImageAsset
}

export interface ClassInfo {
  id: ClassCategory
  titleZh: string
  titleEn: string
  description: string[]
  keywords: string[]
  suitableLabel: string
  suitableFor: string[]
  image: ImageAsset
}

export interface ClassesContent {
  heading: Heading
  items: ClassInfo[]
}

export interface PriceItem {
  category: ClassCategory
  tier: Tier
  labelEn: string
  labelZh: string
  singleLabel: string
  monthlyEyebrow: string
  monthlyLabel: string
  single: number
  monthly: number
  perPerson: boolean
}

export interface PricingContent {
  heading: Heading
  description: string[]
  supplement: string
  categoryLabels: Record<ClassCategory, string>
  items: PriceItem[]
}

export interface MonthlyPlanContent {
  heading: Heading
  content: string[]
  features: string[]
  example: {
    title: string
    items: { label: string, count: number }[]
    totalLabel: string
  }
  cta: CtaLink
}

export interface BookingStep {
  no: string
  titleEn: string
  titleZh: string
  body: string[]
}

export interface BookingContent {
  heading: Heading
  steps: BookingStep[]
}

/** body 為空陣列 = 答案待補，以靜態問題列呈現。 */
export interface AccordionEntry {
  id: string
  title: string
  body: string[]
  example?: string[]
}

export interface AccordionSectionContent {
  heading: Heading
  entries: AccordionEntry[]
}

export interface ContactContent {
  eyebrow: string
  title: string
  note: string
  lineCta: CtaLink
  instagramCta: CtaLink
}

export interface FooterContent {
  brandName: string
  disciplines: string[]
  socialLinks: CtaLink[]
  copyright: string
}

export interface ErrorPageContent {
  eyebrow: string
  notFoundTitle: string
  genericTitle: string
  description: string
  homeLabel: string
}
