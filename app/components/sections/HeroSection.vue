<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { HeroContent } from '~/data/types'

interface Props {
  content: HeroContent
}

defineProps<Props>()
</script>

<template>
  <section id="top">
    <p>{{ content.eyebrow }}</p>
    <h1>{{ content.title }}</h1>
    <p
      v-for="line in content.lead"
      :key="line"
    >
      {{ line }}
    </p>
    <p>{{ content.description }}</p>
    <div>
      <BaseButton
        v-if="content.primaryCta.href"
        variant="primary"
        :href="content.primaryCta.href"
        :external="content.primaryCta.external"
      >
        {{ content.primaryCta.label }}
      </BaseButton>
      <BaseButton
        v-if="content.secondaryCta.href"
        variant="secondary"
        :href="content.secondaryCta.href"
        :external="content.secondaryCta.external"
      >
        {{ content.secondaryCta.label }}
      </BaseButton>
    </div>
  </section>
</template>
