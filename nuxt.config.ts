// GitHub Pages 的專案頁位於 /<repo>/ 子路徑。
// 注意：必須在建置期決定（不能用 NUXT_APP_BASE_URL，那是執行期覆寫，
// 會讓 prerender 取到 302 重導而產不出頁面）。
const basePath = process.env.NUXT_BASE_PATH || '/'

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
    // 專案型 GitHub Pages 會放在 /<repo>/ 子路徑，由 NUXT_APP_BASE_URL 指定
    baseURL: basePath,
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${basePath}favicon.svg` },
      ],
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
