<script setup lang="ts">
import type { HeroContent } from '~/data/types'

interface Props {
  content: HeroContent
}

defineProps<Props>()
</script>

<template>
  <section
    id="top"
    class="hero"
  >
    <div class="hero__inner container">
      <div
        class="hero__text"
        data-reveal="fade"
      >
        <p class="hero__eyebrow">
          {{ content.eyebrow }}
        </p>
        <h1 class="hero__title">
          {{ content.title }}
        </h1>
        <p class="hero__lead">
          <template
            v-for="(line, index) in content.lead"
            :key="line"
          >
            {{ line }}<br v-if="index < content.lead.length - 1">
          </template>
        </p>
        <p class="hero__description">
          {{ content.description }}
        </p>
        <div class="hero__actions">
          <BaseButton
            v-if="content.primaryCta.href"
            variant="primary"
            :href="content.primaryCta.href"
            :external="content.primaryCta.external"
          >
            {{ content.primaryCta.label }}
          </BaseButton>
          <BaseButton
            v-if="content.secondaryCta.href"
            variant="secondary"
            :href="content.secondaryCta.href"
            :external="content.secondaryCta.external"
          >
            {{ content.secondaryCta.label }}
          </BaseButton>
        </div>
      </div>

      <div
        class="hero__media"
        data-reveal="fade"
        data-reveal-delay="100"
      >
        <NuxtImg
          class="hero__image"
          :src="content.image.src"
          :alt="content.image.alt"
          width="1600"
          height="2000"
          sizes="100vw lg:50vw"
          preload
          fetchpriority="high"
          loading="eager"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: var(--space-6) var(--section-y);
}

.hero__inner {
  display: grid;
  gap: var(--space-6);
}

.hero__eyebrow {
  margin-block: 0 var(--space-4);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.hero__title {
  margin: 0;
  font-family: var(--font-en);
  font-size: var(--fs-hero);
  font-weight: 400;
  line-height: 1.05;
}

.hero__lead {
  max-width: var(--copy-max);
  margin-block: var(--space-5) 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-lead);
  line-height: var(--leading-body);
}

.hero__description {
  margin-block: var(--space-4) 0;
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.08em;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  margin-block-start: var(--space-6);
  gap: var(--space-3);
}

.hero__media {
  position: relative;
}

/* 偏移的淡色塊，做出編輯式層次，不用陰影 */
.hero__media::before {
  position: absolute;
  z-index: -1;
  top: var(--space-5);
  right: calc(var(--gutter) * -1);
  bottom: calc(var(--space-5) * -1);
  left: var(--space-6);
  background: var(--color-bg-alt);
  content: '';
}

.hero__image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-img);
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .hero {
    padding-block-start: var(--space-6);
  }

  .hero__inner {
    align-items: center;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: calc(var(--space-6) * 2);
    min-height: calc(100vh - var(--header-h) - var(--section-y));
  }

  .hero__media::before {
    right: calc(var(--space-6) * -1);
  }
}
</style>
