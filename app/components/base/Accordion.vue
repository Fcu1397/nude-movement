<!-- STUB: styling owned by Codex (C2) -->
<script setup lang="ts">
import type { AccordionEntry } from '~/data/types'

interface Props {
  entries: AccordionEntry[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <AccordionItem
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    />
  </div>
</template>
