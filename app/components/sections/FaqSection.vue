<!-- STUB: styling owned by Codex (C2) -->
<script setup lang="ts">
import type { AccordionSectionContent } from '~/data/types'

interface Props {
  content: AccordionSectionContent
}

defineProps<Props>()
</script>

<template>
  <section id="faq">
    <SectionHeading :heading="content.heading" />
    <Accordion :entries="content.entries" />
  </section>
</template>
