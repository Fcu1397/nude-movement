<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { PriceItem } from '~/data/types'
import { formatPrice } from '~/utils/formatPrice'

interface Props {
  item: PriceItem
}

defineProps<Props>()
</script>

<template>
  <article>
    <p>{{ item.labelEn }}</p>
    <h3>{{ item.labelZh }}</h3>
    <p>
      {{ item.singleLabel }}
      <del>{{ formatPrice(item.single, item.perPerson) }}</del>
    </p>
    <p>
      {{ item.monthlyEyebrow }}
    </p>
    <p>
      {{ item.monthlyLabel }}
      <strong>{{ formatPrice(item.monthly, item.perPerson) }}</strong>
    </p>
  </article>
</template>
