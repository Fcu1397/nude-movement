<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { BookingContent } from '~/data/types'

interface Props {
  content: BookingContent
}

defineProps<Props>()
</script>

<template>
  <section id="booking">
    <SectionHeading :heading="content.heading" />
    <ol>
      <li
        v-for="step in content.steps"
        :key="step.no"
      >
        <article>
          <p>{{ step.no }}</p>
          <p>{{ step.titleEn }}</p>
          <h3>{{ step.titleZh }}</h3>
          <p
            v-for="line in step.body"
            :key="line"
          >
            {{ line }}
          </p>
        </article>
      </li>
    </ol>
  </section>
</template>
