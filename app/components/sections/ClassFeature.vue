<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { ClassInfo } from '~/data/types'

interface Props {
  item: ClassInfo
}

defineProps<Props>()
</script>

<template>
  <article>
    <p>{{ item.titleEn }}</p>
    <h3>{{ item.titleZh }}</h3>
    <p
      v-for="line in item.description"
      :key="line"
    >
      {{ line }}
    </p>
    <ul>
      <li
        v-for="keyword in item.keywords"
        :key="keyword"
      >
        {{ keyword }}
      </li>
    </ul>
    <p>{{ item.suitableLabel }}</p>
    <ul>
      <li
        v-for="audience in item.suitableFor"
        :key="audience"
      >
        {{ audience }}
      </li>
    </ul>
  </article>
</template>
