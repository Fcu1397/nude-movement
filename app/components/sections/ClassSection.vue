<script setup lang="ts">
import type { ClassesContent } from '~/data/types'

interface Props {
  content: ClassesContent
}

defineProps<Props>()
</script>

<template>
  <section
    id="classes"
    class="classes"
  >
    <div class="classes__inner container">
      <SectionHeading
        :heading="content.heading"
        data-reveal
      />

      <div class="classes__list">
        <ClassFeature
          v-for="(item, index) in content.items"
          :key="item.id"
          :item="item"
          :reverse="index % 2 === 1"
          data-reveal
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.classes {
  padding-block: var(--section-y);
  background: var(--color-bg-alt);
}

.classes__list {
  display: grid;
  margin-block-start: var(--space-6);
  gap: calc(var(--space-6) * 2);
}

@media (min-width: 1024px) {
  .classes__list {
    margin-block-start: calc(var(--space-6) * 2);
    gap: calc(var(--space-6) * 3);
  }
}
</style>
