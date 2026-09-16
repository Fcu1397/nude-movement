<script setup lang="ts">
import type { PriceItem } from '~/data/types'
import { formatPrice } from '~/utils/formatPrice'

interface Props {
  item: PriceItem
}

defineProps<Props>()
</script>

<template>
  <article class="pricing-card">
    <p class="pricing-card__tier">
      {{ item.labelEn }}
    </p>
    <h4 class="pricing-card__name">
      {{ item.labelZh }}
    </h4>

    <div class="pricing-card__prices">
      <p class="pricing-card__single">
        <span class="pricing-card__label">{{ item.singleLabel }}</span>
        <del>{{ formatPrice(item.single, item.perPerson) }}</del>
        <span class="visually-hidden">（未搭配月方案時的單堂價格，仍然適用）</span>
      </p>

      <p class="pricing-card__monthly">
        <span class="pricing-card__label">{{ item.monthlyLabel }}</span>
        <strong>{{ formatPrice(item.monthly, item.perPerson) }}</strong>
      </p>
    </div>
  </article>
</template>

<style scoped>
.pricing-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: var(--space-5);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-bg);
  transition: border-color var(--duration-interaction) var(--ease);
}

.pricing-card:hover {
  border-color: var(--color-nude);
}

.pricing-card__tier {
  margin-block: 0 var(--space-2);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.pricing-card__name {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-body);
  font-weight: 500;
}

.pricing-card__prices {
  margin-block-start: var(--space-5);
}

.pricing-card__label {
  display: block;
  color: var(--color-text-muted);
  font-size: var(--fs-eyebrow);
}

.pricing-card__single {
  margin-block: 0;
  color: var(--color-text-muted);
}

.pricing-card__monthly {
  padding-block-start: var(--space-3);
  border-block-start: 1px solid var(--color-line);
  margin-block: var(--space-3) 0;
}

.pricing-card__monthly strong {
  display: block;
  margin-block-start: var(--space-1);
  color: var(--color-rose-deep);
  font-family: var(--font-en);
  font-size: var(--fs-price);
  font-weight: 500;
  line-height: 1.1;
}
</style>
