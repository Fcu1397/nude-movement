<script setup lang="ts">
import type { AccordionSectionContent } from '~/data/types'

interface Props {
  content: AccordionSectionContent
}

defineProps<Props>()
</script>

<template>
  <section
    id="faq"
    class="faq"
  >
    <div class="faq__inner container">
      <SectionHeading
        class="faq__heading"
        :heading="content.heading"
        data-reveal
      />
      <Accordion
        class="faq__accordion"
        :entries="content.entries"
        data-reveal
      />
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding-block: var(--section-y);
}

.faq__inner {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .faq__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  }

  .faq__heading {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
    align-self: start;
  }
}
</style>
