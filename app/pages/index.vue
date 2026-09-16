<script setup lang="ts">
import { booking } from '~/data/booking'
import { classes } from '~/data/classes'
import { contact } from '~/data/contact'
import { faq } from '~/data/faq'
import { footer } from '~/data/footer'
import { hero } from '~/data/hero'
import { monthly } from '~/data/monthly'
import { policy } from '~/data/policy'
import { pricing } from '~/data/pricing'
import { site } from '~/data/site'

const ogImage = site.url ? `${site.url}${site.seo.ogImage}` : site.seo.ogImage

useSeoMeta({
  title: site.seo.title,
  description: site.seo.description,
  ogTitle: site.seo.title,
  ogDescription: site.seo.description,
  ogImage,
  ogType: 'website',
  ogLocale: 'zh_TW',
  ogSiteName: site.brandName,
  // 網域未定前不輸出 og:url 與 canonical。
  ogUrl: site.url ?? undefined,
  twitterCard: 'summary_large_image',
})

const structuredData: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  'name': site.brandName,
  'description': site.seo.description,
}

if (site.url) {
  structuredData.url = site.url
}

if (site.instagramUrl) {
  structuredData.sameAs = [site.instagramUrl]
}

useHead({
  link: site.url ? [{ rel: 'canonical', href: site.url }] : [],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }],
})
</script>

<template>
  <div>
    <main>
      <HeroSection :content="hero" />
      <ClassSection :content="classes" />
      <PricingSection :content="pricing" />
      <MonthlyPlan :content="monthly" />
      <BookingSteps :content="booking" />
      <PolicySection :content="policy" />
      <FaqSection :content="faq" />
      <ContactCTA :content="contact" />
    </main>
    <AppFooter :content="footer" />
  </div>
</template>
