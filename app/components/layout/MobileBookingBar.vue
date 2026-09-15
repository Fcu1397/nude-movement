<!-- STUB: styling owned by Codex (C2) -->
<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <div v-if="site.lineUrl">
    <div>
      <BaseButton
        variant="primary"
        :href="site.lineUrl"
        external
      >
        {{ site.bookingLabel }}
      </BaseButton>
    </div>
    <div aria-hidden="true" />
  </div>
</template>
