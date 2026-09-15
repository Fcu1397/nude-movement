<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { ContactContent } from '~/data/types'

interface Props {
  content: ContactContent
}

defineProps<Props>()
</script>

<template>
  <section id="contact">
    <p>{{ content.eyebrow }}</p>
    <h2>{{ content.title }}</h2>
    <p>{{ content.note }}</p>
    <div v-if="content.lineCta.href || content.instagramCta.href">
      <BaseButton
        v-if="content.lineCta.href"
        variant="primary"
        :href="content.lineCta.href"
        :external="content.lineCta.external"
      >
        {{ content.lineCta.label }}
      </BaseButton>
      <BaseButton
        v-if="content.instagramCta.href"
        variant="secondary"
        :href="content.instagramCta.href"
        :external="content.instagramCta.external"
      >
        {{ content.instagramCta.label }}
      </BaseButton>
    </div>
  </section>
</template>
