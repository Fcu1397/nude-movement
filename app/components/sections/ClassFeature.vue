<script setup lang="ts">
import type { ClassInfo } from '~/data/types'

interface Props {
  item: ClassInfo
  reverse?: boolean
}

withDefaults(defineProps<Props>(), { reverse: false })
</script>

<template>
  <article
    class="class-feature"
    :class="{ 'class-feature--reverse': reverse }"
  >
    <div class="class-feature__media">
      <NuxtImg
        class="class-feature__image"
        :src="item.image.src"
        :alt="item.image.alt"
        width="1200"
        height="1600"
        sizes="100vw lg:50vw"
        loading="lazy"
      />
    </div>

    <div class="class-feature__text">
      <p class="class-feature__title-en">
        {{ item.titleEn }}
      </p>
      <h3 class="class-feature__title">
        {{ item.titleZh }}
      </h3>

      <p class="class-feature__description">
        <template
          v-for="(line, index) in item.description"
          :key="line"
        >
          {{ line }}<br v-if="index < item.description.length - 1">
        </template>
      </p>

      <ul class="class-feature__keywords">
        <li
          v-for="keyword in item.keywords"
          :key="keyword"
        >
          {{ keyword }}
        </li>
      </ul>

      <div class="class-feature__suitable">
        <p class="class-feature__suitable-label">
          {{ item.suitableLabel }}
        </p>
        <ul class="class-feature__suitable-list">
          <li
            v-for="audience in item.suitableFor"
            :key="audience"
          >
            {{ audience }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.class-feature {
  display: grid;
  gap: var(--space-5);
}

.class-feature__image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-img);
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.class-feature__title-en {
  margin-block: 0 var(--space-2);
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-lead);
  font-style: italic;
  letter-spacing: 0.04em;
}

.class-feature__title {
  margin: 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-card-title);
  font-weight: 600;
  line-height: var(--leading-heading);
}

.class-feature__description {
  max-width: var(--copy-max);
  margin-block: var(--space-4) 0;
}

.class-feature__keywords {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-block: var(--space-5) 0;
  gap: var(--space-2) var(--space-4);
  list-style: none;
}

.class-feature__keywords li {
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
}

.class-feature__keywords li + li {
  position: relative;
  padding-inline-start: var(--space-4);
}

.class-feature__keywords li + li::before {
  position: absolute;
  left: 0;
  content: '·';
}

.class-feature__suitable {
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--color-line);
  margin-block-start: var(--space-5);
}

.class-feature__suitable-label {
  margin-block: 0 var(--space-3);
  color: var(--color-text-muted);
  font-family: var(--font-serif-tc);
}

.class-feature__suitable-list {
  display: grid;
  padding: 0;
  margin: 0;
  gap: var(--space-2);
  list-style: none;
}

.class-feature__suitable-list li {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.class-feature__suitable-list li::before {
  width: 16px;
  height: 1px;
  flex: none;
  background: var(--color-brown);
  content: '';
  translate: 0 -0.35em;
}

@media (min-width: 1024px) {
  .class-feature {
    align-items: center;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: calc(var(--space-6) * 1.5);
  }

  .class-feature--reverse .class-feature__media {
    order: 2;
  }
}
</style>
