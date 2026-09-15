<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { MonthlyPlanContent } from '~/data/types'

interface Props {
  content: MonthlyPlanContent
}

defineProps<Props>()
</script>

<template>
  <section id="monthly">
    <SectionHeading :heading="content.heading" />
    <p
      v-for="line in content.content"
      :key="line"
    >
      {{ line }}
    </p>
    <ul>
      <li
        v-for="feature in content.features"
        :key="feature"
      >
        {{ feature }}
      </li>
    </ul>
    <aside>
      <h3>{{ content.example.title }}</h3>
      <p
        v-for="item in content.example.items"
        :key="item.label"
      >
        {{ item.label }} × {{ item.count }}
      </p>
      <p>{{ content.example.totalLabel }}</p>
    </aside>
    <BaseButton
      v-if="content.cta.href"
      variant="primary"
      :href="content.cta.href"
      :external="content.cta.external"
    >
      {{ content.cta.label }}
    </BaseButton>
  </section>
</template>
