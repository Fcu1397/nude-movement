<!-- STUB: styling owned by Codex (C2) -->
<script setup lang="ts">
import type { AccordionEntry } from '~/data/types'

interface Props {
  entry: AccordionEntry
}

defineProps<Props>()
</script>

<template>
  <article :id="entry.id">
    <h3>{{ entry.title }}</h3>
    <div v-if="entry.body.length">
      <p
        v-for="line in entry.body"
        :key="line"
      >
        {{ line }}
      </p>
      <blockquote v-if="entry.example?.length">
        <p
          v-for="line in entry.example"
          :key="line"
        >
          {{ line }}
        </p>
      </blockquote>
    </div>
  </article>
</template>
