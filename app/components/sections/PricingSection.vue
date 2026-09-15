<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { ClassCategory, PricingContent } from '~/data/types'

interface Props {
  content: PricingContent
}

const props = defineProps<Props>()
const categories: ClassCategory[] = ['ballet', 'stretch']

function itemsFor(category: ClassCategory) {
  return props.content.items.filter(item => item.category === category)
}
</script>

<template>
  <section id="pricing">
    <SectionHeading :heading="content.heading" />
    <p
      v-for="line in content.description"
      :key="line"
    >
      {{ line }}
    </p>
    <p>{{ content.supplement }}</p>
    <section
      v-for="category in categories"
      :key="category"
    >
      <h3>{{ content.categoryLabels[category] }}</h3>
      <ul>
        <li
          v-for="item in itemsFor(category)"
          :key="item.tier"
        >
          <PricingCard :item="item" />
        </li>
      </ul>
    </section>
  </section>
</template>
