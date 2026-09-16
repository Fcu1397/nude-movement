<script setup lang="ts">
import type { ClassCategory, PricingContent } from '~/data/types'

interface Props {
  content: PricingContent
}

const props = defineProps<Props>()
const categories: ClassCategory[] = ['ballet', 'stretch']

function itemsFor(category: ClassCategory) {
  return props.content.items.filter(item => item.category === category)
}
</script>

<template>
  <section
    id="pricing"
    class="pricing"
  >
    <div class="pricing__inner container">
      <div
        class="pricing__intro"
        data-reveal
      >
        <SectionHeading :heading="content.heading" />
        <p class="pricing__description">
          <template
            v-for="(line, index) in content.description"
            :key="line"
          >
            {{ line }}<br v-if="index < content.description.length - 1">
          </template>
        </p>
        <p class="pricing__supplement">
          {{ content.supplement }}
        </p>
      </div>

      <section
        v-for="category in categories"
        :key="category"
        class="pricing__group"
        data-reveal
      >
        <h3 class="pricing__group-title">
          {{ content.categoryLabels[category] }}
        </h3>
        <ul class="pricing__cards">
          <li
            v-for="item in itemsFor(category)"
            :key="item.tier"
          >
            <PricingCard :item="item" />
          </li>
        </ul>
      </section>

      <p class="pricing__link">
        <a href="#monthly">了解當月 4 堂優惠方案</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  padding-block: var(--section-y);
}

.pricing__description {
  max-width: var(--copy-max);
  margin-block: var(--space-5) 0;
}

.pricing__supplement {
  max-width: var(--copy-max);
  margin-block: var(--space-3) 0;
  color: var(--color-text-muted);
}

.pricing__group {
  margin-block-start: var(--space-6);
}

.pricing__group-title {
  padding-block-end: var(--space-3);
  border-block-end: 1px solid var(--color-line);
  margin: 0 0 var(--space-5);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  font-weight: 500;
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.pricing__cards {
  display: grid;
  padding: 0;
  margin: 0;
  gap: var(--space-4);
  list-style: none;
}

.pricing__link {
  margin-block: var(--space-6) 0;
  font-family: var(--font-serif-tc);
}

.pricing__link a {
  padding-block-end: var(--space-1);
  border-block-end: 1px solid var(--color-nude);
  text-decoration: none;
  transition: border-color var(--duration-interaction) var(--ease);
}

.pricing__link a:hover {
  border-block-end-color: var(--color-rose-deep);
}

@media (min-width: 640px) {
  .pricing__cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .pricing__group {
    margin-block-start: calc(var(--space-6) * 1.5);
  }
}
</style>
