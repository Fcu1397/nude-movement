<!-- STUB: styling owned by Codex (C2) -->
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <header>
    <a href="#top">{{ site.brandName }}</a>
    <nav :aria-label="`${site.brandName} navigation`">
      <ul>
        <li
          v-for="link in site.navigation"
          :key="link.href"
        >
          <a :href="link.href">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
    <BaseButton
      v-if="site.lineUrl"
      variant="primary"
      :href="site.lineUrl"
      external
    >
      {{ site.bookingLabel }}
    </BaseButton>
  </header>
</template>
