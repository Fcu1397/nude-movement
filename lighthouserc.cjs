const CATEGORY_MIN = 0.9

module.exports = {
  ci: {
    collect: {
      staticDistDir: '.output/public',
      numberOfRuns: 3,
      settings: {
        // 靜態主機不走 HTTP/2；canonical 需等網域確定（DECISIONS B8）
        skipAudits: ['uses-http2', 'canonical'],
      },
    },
    assert: {
      // index.html 是真正的頁面，四項都必須 >= 0.9。
      // 200.html / 404.html 是 Nuxt 的 SPA fallback：錯誤頁刻意 noindex，
      // 因此不套 SEO 門檻，其餘仍然要求同樣水準。
      assertMatrix: [
        {
          matchingUrlPattern: '.*/index\\.html$',
          assertions: {
            'categories:performance': ['error', { minScore: CATEGORY_MIN }],
            'categories:accessibility': ['error', { minScore: CATEGORY_MIN }],
            'categories:best-practices': ['error', { minScore: CATEGORY_MIN }],
            'categories:seo': ['error', { minScore: CATEGORY_MIN }],
          },
        },
        {
          matchingUrlPattern: '.*/(200|404)\\.html$',
          assertions: {
            'categories:performance': ['error', { minScore: CATEGORY_MIN }],
            'categories:accessibility': ['error', { minScore: CATEGORY_MIN }],
            'categories:best-practices': ['error', { minScore: CATEGORY_MIN }],
          },
        },
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
}
