<script setup lang="ts">
import type { AccordionEntry } from '~/data/types'

interface Props {
  entries: AccordionEntry[]
  headingLevel?: 'h3' | 'h4'
}

withDefaults(defineProps<Props>(), { headingLevel: 'h3' })

const rootEl = ref<HTMLElement | null>(null)

function triggers(): HTMLElement[] {
  return rootEl.value
    ? Array.from(rootEl.value.querySelectorAll<HTMLElement>('[data-accordion-trigger]'))
    : []
}

function onKeydown(event: KeyboardEvent) {
  const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']

  if (!keys.includes(event.key)) {
    return
  }

  const items = triggers()
  const current = items.indexOf(document.activeElement as HTMLElement)

  if (current === -1 || items.length === 0) {
    return
  }

  event.preventDefault()

  const next = {
    ArrowDown: (current + 1) % items.length,
    ArrowUp: (current - 1 + items.length) % items.length,
    Home: 0,
    End: items.length - 1,
  }[event.key] as number

  items[next]?.focus()
}
</script>

<template>
  <div
    ref="rootEl"
    class="accordion"
    @keydown="onKeydown"
  >
    <AccordionItem
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
      :heading-level="headingLevel"
    />
  </div>
</template>

<style scoped>
.accordion {
  border-block-start: 1px solid var(--color-line);
}
</style>
