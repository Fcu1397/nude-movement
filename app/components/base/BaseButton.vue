<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary'

interface Props {
  variant: ButtonVariant
  href?: string | null
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  href: undefined,
  external: false,
})
</script>

<template>
  <a
    v-if="typeof props.href === 'string'"
    class="base-button"
    :class="`base-button--${props.variant}`"
    :href="props.href"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noopener' : undefined"
  >
    <slot />
    <span
      v-if="props.external"
      class="visually-hidden"
    >（另開視窗）</span>
  </a>
  <button
    v-else-if="props.href === undefined"
    class="base-button"
    :class="`base-button--${props.variant}`"
    type="button"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  min-height: var(--control-min-h);
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-btn);
  color: var(--color-text);
  font-weight: 500;
  line-height: var(--leading-heading);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    color var(--duration-interaction) var(--ease),
    background-color var(--duration-interaction) var(--ease),
    border-color var(--duration-interaction) var(--ease);
}

.base-button--primary {
  background: var(--color-nude);
}

.base-button--primary:hover {
  background: var(--color-rose);
  color: var(--color-text-strong);
}

.base-button--secondary {
  border-color: var(--color-brown);
  background: transparent;
}

.base-button--secondary:hover {
  border-color: var(--color-rose);
  background: var(--color-rose);
  color: var(--color-text-strong);
}
</style>
