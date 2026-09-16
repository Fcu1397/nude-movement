<script setup lang="ts">
import { site } from '~/data/site'
import type { AccordionSectionContent } from '~/data/types'
import { formatPrice } from '~/utils/formatPrice'

interface Props {
  content: AccordionSectionContent
}

const props = defineProps<Props>()

const ROOM_FEE_LINE = '將扣除基本場租費用。'

/** 場租金額尚未提供時維持 SPEC 原文，有金額才補上。 */
const entries = computed(() => {
  if (site.roomFee === null) {
    return props.content.entries
  }

  const amount = formatPrice(site.roomFee)

  return props.content.entries.map(entry => ({
    ...entry,
    body: entry.body.map(line => (
      line === ROOM_FEE_LINE ? `將扣除基本場租費用（${amount}）。` : line
    )),
  }))
})
</script>

<template>
  <section
    id="policy"
    class="policy"
  >
    <div class="policy__inner container">
      <SectionHeading
        class="policy__heading"
        :heading="content.heading"
        data-reveal
      />
      <Accordion
        class="policy__accordion"
        :entries="entries"
        data-reveal
      />
    </div>
  </section>
</template>

<style scoped>
.policy {
  padding-block: var(--section-y);
}

.policy__inner {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .policy__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    gap: var(--space-6) var(--space-6);
  }

  .policy__heading {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
    align-self: start;
  }
}
</style>
