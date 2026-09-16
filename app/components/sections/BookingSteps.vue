<script setup lang="ts">
import type { BookingContent } from '~/data/types'

interface Props {
  content: BookingContent
}

defineProps<Props>()
</script>

<template>
  <section
    id="booking"
    class="booking"
  >
    <div class="booking__inner container">
      <SectionHeading
        :heading="content.heading"
        data-reveal
      />

      <ol class="booking__steps">
        <li
          v-for="(step, index) in content.steps"
          :key="step.no"
          class="booking__step"
          data-reveal
          :data-reveal-delay="index * 100"
        >
          <p
            class="booking__number"
            aria-hidden="true"
          >
            {{ step.no }}
          </p>
          <p class="booking__step-en">
            {{ step.titleEn }}
          </p>
          <h3 class="booking__step-title">
            {{ step.titleZh }}
          </h3>
          <p
            v-if="step.body.length"
            class="booking__step-body"
          >
            <template
              v-for="(line, lineIndex) in step.body"
              :key="line"
            >
              {{ line }}<br v-if="lineIndex < step.body.length - 1">
            </template>
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.booking {
  padding-block: var(--section-y);
}

.booking__steps {
  display: grid;
  padding: 0;
  margin-block: var(--space-6) 0;
  gap: var(--space-6);
  list-style: none;
}

.booking__step {
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--color-line);
}

.booking__number {
  margin-block: 0 var(--space-4);
  color: var(--color-nude);
  font-family: var(--font-en);
  font-size: 3rem;
  font-weight: 500;
  line-height: 1;
}

.booking__step-en {
  margin-block: 0 var(--space-2);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.booking__step-title {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-card-title);
  font-weight: 600;
  line-height: var(--leading-heading);
}

.booking__step-body {
  max-width: var(--copy-max);
  margin-block: var(--space-4) 0;
  color: var(--color-text-muted);
}

@media (min-width: 640px) {
  .booking__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-block-start: calc(var(--space-6) * 1.5);
    gap: var(--space-5);
  }
}
</style>
