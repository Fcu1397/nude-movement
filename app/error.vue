<script setup lang="ts">
import { errorPage } from '~/data/errorPage'

interface Props {
  error?: { statusCode?: number }
}

const props = defineProps<Props>()

const isNotFound = computed(() => props.error?.statusCode === 404)
const title = computed(() => (isNotFound.value ? errorPage.notFoundTitle : errorPage.genericTitle))

useSeoMeta({
  title: `${title.value}｜${errorPage.eyebrow}`,
  robots: 'noindex',
})
</script>

<template>
  <main class="error-page">
    <div class="error-page__inner container">
      <p class="error-page__eyebrow">
        {{ errorPage.eyebrow }}
      </p>
      <h1 class="error-page__title">
        {{ title }}
      </h1>
      <p class="error-page__description">
        {{ errorPage.description }}
      </p>
      <BaseButton
        class="error-page__cta"
        variant="primary"
        href="/"
      >
        {{ errorPage.homeLabel }}
      </BaseButton>
    </div>
  </main>
</template>

<style scoped>
.error-page {
  display: flex;
  min-height: 100vh;
  align-items: center;
  background: var(--color-bg);
}

.error-page__inner {
  max-width: 34rem;
  padding-block: var(--section-y);
  text-align: center;
}

.error-page__eyebrow {
  margin-block: 0 var(--space-5);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.error-page__title {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-section);
  font-weight: 600;
  line-height: var(--leading-heading);
}

.error-page__description {
  margin-block: var(--space-4) 0;
  color: var(--color-text-muted);
}

.error-page__cta {
  margin-block-start: var(--space-6);
}
</style>
