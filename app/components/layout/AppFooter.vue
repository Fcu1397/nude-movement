<script setup lang="ts">
import type { FooterContent } from '~/data/types'

interface Props {
  content: FooterContent
}

const props = defineProps<Props>()

const socialLinks = computed(() => props.content.socialLinks.filter(link => link.href))
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner container">
      <div class="site-footer__brand">
        <p class="site-footer__name">
          {{ content.brandName }}
        </p>
        <ul class="site-footer__disciplines">
          <li
            v-for="discipline in content.disciplines"
            :key="discipline"
          >
            {{ discipline }}
          </li>
        </ul>
      </div>

      <ul
        v-if="socialLinks.length"
        class="site-footer__social"
      >
        <li
          v-for="link in socialLinks"
          :key="link.label"
        >
          <a
            :href="link.href ?? undefined"
            target="_blank"
            rel="noopener"
          >
            {{ link.label }}
            <span class="visually-hidden">（另開視窗）</span>
          </a>
        </li>
      </ul>

      <p class="site-footer__legal">
        {{ content.copyright }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: var(--space-6);
  border-block-start: 1px solid var(--color-line);
}

.site-footer__inner {
  display: grid;
  gap: var(--space-5);
}

.site-footer__name {
  margin-block: 0 var(--space-3);
  font-family: var(--font-en);
  font-size: var(--fs-lead);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__disciplines,
.site-footer__social {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  gap: var(--space-2) var(--space-4);
  list-style: none;
}

.site-footer__disciplines li,
.site-footer__social li {
  color: var(--color-text-muted);
  font-family: var(--font-en);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.08em;
}

.site-footer__social a {
  text-decoration: none;
  transition: color var(--duration-interaction) var(--ease);
}

.site-footer__social a:hover {
  color: var(--color-rose-deep);
}

.site-footer__legal {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-eyebrow);
}

@media (min-width: 1024px) {
  .site-footer {
    padding-block: calc(var(--space-6) * 1.5);
  }

  .site-footer__inner {
    align-items: end;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .site-footer__legal {
    grid-column: 1 / -1;
    padding-block-start: var(--space-5);
    border-block-start: 1px solid var(--color-line);
  }
}
</style>
