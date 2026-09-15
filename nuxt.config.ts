export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
    },
  },
  image: {
    format: ['avif', 'webp'],
  },
  fonts: {
    families: [
      {
        name: 'Noto Serif TC',
        provider: 'google',
        weights: [500, 600],
      },
      {
        name: 'Noto Sans TC',
        provider: 'google',
        weights: [400, 500],
      },
      {
        name: 'Cormorant Garamond',
        provider: 'google',
        weights: [400, 500],
        styles: ['normal', 'italic'],
      },
    ],
  },
})
