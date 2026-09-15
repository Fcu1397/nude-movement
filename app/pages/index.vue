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
