<script setup lang="ts">
import { site } from '~/data/site'

const atContact = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  const contact = document.querySelector('#contact')

  if (!contact) {
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    atContact.value = Boolean(entry?.isIntersecting)
  }, { threshold: 0.25 })

  observer.observe(contact)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="mobile-booking">
    <div
      class="mobile-booking__bar"
      :class="{ 'is-hidden': atContact }"
    >
      <BaseButton
        class="mobile-booking__cta"
        variant="primary"
        :href="site.lineUrl"
        external
      >
        {{ site.bookingBarLabel }}
      </BaseButton>
    </div>
    <div
      class="mobile-booking__spacer"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.mobile-booking__bar {
  position: fixed;
  z-index: 30;
  inset-inline: 0;
  bottom: 0;
  padding: var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  border-block-start: 1px solid var(--color-line);
  transition: transform var(--duration-interaction) var(--ease);
}

@supports not (backdrop-filter: blur(12px)) {
  .mobile-booking__bar {
    background: var(--color-bg);
  }
}

.mobile-booking__bar.is-hidden {
  transform: translateY(100%);
}

.mobile-booking__cta {
  width: 100%;
}

.mobile-booking__spacer {
  height: var(--mobile-bar-h);
}

@media (min-width: 1024px) {
  .mobile-booking__bar,
  .mobile-booking__spacer {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-booking__bar {
    transition: none;
  }
}
</style>
