<script setup lang="ts">
import type { MonthlyPlanContent } from '~/data/types'

interface Props {
  content: MonthlyPlanContent
}

const props = defineProps<Props>()

/** 資料以「✓ 」開頭；勾號改由細線 icon 呈現，避免字元符號的粗糙感。 */
const features = computed(() => props.content.features.map(feature => feature.replace(/^✓\s*/, '')))
</script>

<template>
  <section
    id="monthly"
    class="monthly"
  >
    <div class="monthly__inner container">
      <div
        class="monthly__text"
        data-reveal
      >
        <SectionHeading :heading="content.heading" />

        <p class="monthly__body">
          <template
            v-for="(line, index) in content.content"
            :key="line"
          >
            {{ line }}<br v-if="index < content.content.length - 1">
          </template>
        </p>

        <ul class="monthly__features">
          <li
            v-for="feature in features"
            :key="feature"
          >
            <svg
              class="monthly__check"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M3 8.5 6.5 12 13 4.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
              />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <BaseButton
          v-if="content.cta.href"
          class="monthly__cta"
          variant="primary"
          :href="content.cta.href"
          :external="content.cta.external"
        >
          {{ content.cta.label }}
        </BaseButton>
      </div>

      <aside
        class="monthly__example"
        data-reveal
        data-reveal-delay="100"
      >
        <h3 class="monthly__example-title">
          {{ content.example.title }}
        </h3>
        <ul class="monthly__example-list">
          <li
            v-for="item in content.example.items"
            :key="item.label"
          >
            <span>{{ item.label }}</span>
            <span class="monthly__example-count">× {{ item.count }}</span>
          </li>
        </ul>
        <p class="monthly__example-total">
          {{ content.example.totalLabel }}
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.monthly {
  padding-block: var(--section-y);
  background: var(--color-bg-alt);
}

.monthly__inner {
  display: grid;
  gap: var(--space-6);
}

.monthly__body {
  max-width: var(--copy-max);
  margin-block: var(--space-5) 0;
}

.monthly__features {
  display: grid;
  padding: 0;
  margin-block: var(--space-5) 0;
  gap: var(--space-3);
  list-style: none;
}

.monthly__features li {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.monthly__check {
  width: 16px;
  height: 16px;
  flex: none;
  color: var(--color-brown);
  translate: 0 0.2em;
}

.monthly__cta {
  margin-block-start: var(--space-6);
}

.monthly__example {
  padding: var(--space-5);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-bg);
}

.monthly__example-title {
  padding-block-end: var(--space-4);
  border-block-end: 1px solid var(--color-line);
  margin: 0;
  font-family: var(--font-en);
  font-size: var(--fs-card-title);
  font-weight: 500;
  letter-spacing: 0.04em;
}

.monthly__example-list {
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
}

.monthly__example-list li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--color-line);
  gap: var(--space-4);
  font-family: var(--font-en);
  font-size: var(--fs-lead);
}

.monthly__example-count {
  color: var(--color-text-muted);
}

.monthly__example-total {
  margin-block: var(--space-4) 0;
  font-family: var(--font-en);
  font-size: var(--fs-lead);
  letter-spacing: 0.04em;
}

@media (min-width: 1024px) {
  .monthly__inner {
    align-items: start;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: calc(var(--space-6) * 2);
  }

  .monthly__example {
    padding: var(--space-6);
  }
}
</style>
