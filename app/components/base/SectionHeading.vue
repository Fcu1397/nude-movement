<script setup lang="ts">
import type { Heading } from '~/data/types'

interface Props {
  heading: Heading
  level?: 'h2' | 'h3'
  align?: 'start' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  level: 'h2',
  align: 'start',
})
</script>

<template>
  <header
    class="section-heading"
    :class="`section-heading--${props.align}`"
  >
    <p
      v-if="props.heading.eyebrow"
      class="section-heading__eyebrow"
    >
      {{ props.heading.eyebrow }}
    </p>
    <component
      :is="props.level"
      class="section-heading__title"
    >
      {{ props.heading.title }}
    </component>
    <p
      v-if="props.heading.subtitle"
      class="section-heading__subtitle"
    >
      {{ props.heading.subtitle }}
    </p>
  </header>
</template>

<style scoped>
.section-heading {
  text-align: start;
}

.section-heading--center {
  text-align: center;
}

.section-heading__eyebrow {
  margin-block-end: var(--space-2);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  font-weight: 500;
  letter-spacing: var(--tracking-eyebrow);
}

.section-heading__title {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-section);
  font-weight: 600;
  line-height: var(--leading-heading);
}

.section-heading__subtitle {
  max-width: var(--copy-max);
  margin-block-start: var(--space-3);
  margin-block-end: 0;
  color: var(--color-text-muted);
}
</style>
