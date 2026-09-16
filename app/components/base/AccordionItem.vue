<script setup lang="ts">
import type { AccordionEntry } from '~/data/types'

interface Props {
  entry: AccordionEntry
  headingLevel?: 'h3' | 'h4'
}

const props = withDefaults(defineProps<Props>(), { headingLevel: 'h3' })

/** body 為空 = 答案待補，渲染成靜態問題列（無 button、不可展開）。 */
const expandable = computed(() => props.entry.body.length > 0)
const open = ref(false)
</script>

<template>
  <div class="accordion-item">
    <component
      :is="props.headingLevel"
      class="accordion-item__heading"
    >
      <button
        v-if="expandable"
        :id="`${entry.id}-trigger`"
        class="accordion-item__trigger"
        type="button"
        data-accordion-trigger
        :aria-expanded="open"
        :aria-controls="`${entry.id}-panel`"
        @click="open = !open"
      >
        <span>{{ entry.title }}</span>
        <span
          class="accordion-item__icon"
          :class="{ 'is-open': open }"
          aria-hidden="true"
        />
      </button>
      <span
        v-else
        class="accordion-item__static"
      >{{ entry.title }}</span>
    </component>

    <div
      v-if="expandable"
      :id="`${entry.id}-panel`"
      class="accordion-item__panel"
      :class="{ 'is-open': open }"
      role="region"
      :aria-labelledby="`${entry.id}-trigger`"
      :inert="!open"
    >
      <div class="accordion-item__panel-inner">
        <div class="accordion-item__body">
          <p
            v-for="line in entry.body"
            :key="line"
          >
            {{ line }}
          </p>

          <div
            v-if="entry.example?.length"
            class="accordion-item__example"
          >
            <p
              v-for="line in entry.example"
              :key="line"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border-block-end: 1px solid var(--color-line);
}

.accordion-item__heading {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-body);
  font-weight: 500;
  line-height: var(--leading-heading);
}

.accordion-item__trigger {
  display: flex;
  width: 100%;
  min-height: var(--control-min-h);
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  gap: var(--space-4);
  text-align: start;
  cursor: pointer;
  transition: color var(--duration-interaction) var(--ease);
}

.accordion-item__trigger:hover {
  color: var(--color-rose-deep);
}

.accordion-item__static {
  display: flex;
  min-height: var(--control-min-h);
  align-items: center;
  padding: var(--space-4) 0;
  color: var(--color-text-muted);
}

.accordion-item__icon {
  position: relative;
  width: 12px;
  height: 12px;
  flex: none;
}

.accordion-item__icon::before,
.accordion-item__icon::after {
  position: absolute;
  background: var(--color-brown);
  content: '';
  transition: transform var(--duration-interaction) var(--ease);
}

.accordion-item__icon::before {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
}

.accordion-item__icon::after {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
}

.accordion-item__icon.is-open::after {
  transform: scaleY(0);
}

.accordion-item__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-interaction) var(--ease);
}

.accordion-item__panel.is-open {
  grid-template-rows: 1fr;
}

.accordion-item__panel-inner {
  overflow: hidden;
}

.accordion-item__body {
  max-width: var(--copy-max);
  padding-block-end: var(--space-5);
}

.accordion-item__body p {
  margin-block: 0;
}

.accordion-item__example {
  padding-inline-start: var(--space-4);
  border-inline-start: 1px solid var(--color-line);
  margin-block-start: var(--space-4);
  color: var(--color-text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .accordion-item__panel,
  .accordion-item__icon::before,
  .accordion-item__icon::after {
    transition: none;
  }
}
</style>
