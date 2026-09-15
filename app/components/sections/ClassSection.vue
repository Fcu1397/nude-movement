<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { ClassesContent } from '~/data/types'

interface Props {
  content: ClassesContent
}

defineProps<Props>()
</script>

<template>
  <section id="classes">
    <SectionHeading :heading="content.heading" />
    <ClassFeature
      v-for="item in content.items"
      :key="item.id"
      :item="item"
    />
  </section>
</template>
