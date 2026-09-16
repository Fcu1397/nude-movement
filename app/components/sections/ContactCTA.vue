<script setup lang="ts">
import type { ContactContent } from '~/data/types'

interface Props {
  content: ContactContent
}

const props = defineProps<Props>()

const hasActions = computed(() => Boolean(props.content.lineCta.href || props.content.instagramCta.href))
</script>

<template>
  <section
    id="contact"
    class="contact"
  >
    <div
      class="contact__inner container"
      data-reveal
    >
      <p class="contact__eyebrow">
        {{ content.eyebrow }}
      </p>
      <h2 class="contact__title">
        {{ content.title }}
      </h2>

      <div
        v-if="hasActions"
        class="contact__actions"
      >
        <BaseButton
          v-if="content.lineCta.href"
          variant="primary"
          :href="content.lineCta.href"
          :external="content.lineCta.external"
        >
          {{ content.lineCta.label }}
        </BaseButton>
        <BaseButton
          v-if="content.instagramCta.href"
          variant="secondary"
          :href="content.instagramCta.href"
          :external="content.instagramCta.external"
        >
          {{ content.instagramCta.label }}
        </BaseButton>
      </div>

      <p
        class="contact__note"
        :class="{ 'contact__note--tight': !hasActions }"
      >
        {{ content.note }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-block: calc(var(--section-y) * 1.1);
  background: var(--color-bg-alt);
}

.contact__inner {
  max-width: 44rem;
  text-align: center;
}

.contact__eyebrow {
  margin-block: 0;
  font-family: var(--font-en);
  font-size: var(--fs-section);
  font-weight: 400;
  line-height: 1.1;
}

.contact__title {
  margin-block: var(--space-4) 0;
  font-family: var(--font-serif-tc);
  font-size: var(--fs-lead);
  font-weight: 500;
  line-height: var(--leading-heading);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-block-start: var(--space-6);
  gap: var(--space-3);
}

.contact__note {
  margin-block: var(--space-5) 0;
  color: var(--color-text-muted);
  font-size: var(--fs-eyebrow);
}

.contact__note--tight {
  margin-block-start: var(--space-4);
}
</style>
