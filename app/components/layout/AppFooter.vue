<!-- STUB: styling owned by Gemini (G1) -->
<script setup lang="ts">
import type { FooterContent } from '~/data/types'

interface Props {
  content: FooterContent
}

defineProps<Props>()
</script>

<template>
  <footer>
    <p>{{ content.brandName }}</p>
    <ul>
      <li
        v-for="discipline in content.disciplines"
        :key="discipline"
      >
        {{ discipline }}
      </li>
    </ul>
    <ul v-if="content.socialLinks.some(link => link.href)">
      <li
        v-for="link in content.socialLinks.filter(link => link.href)"
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
    <p>{{ content.copyright }}</p>
  </footer>
</template>
