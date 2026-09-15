<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <AppHeader />
  <NuxtPage />
  <MobileBookingBar v-if="site.lineUrl" />
</template>
