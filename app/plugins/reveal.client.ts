/**
 * 捲動進場效果（DECISIONS D8）。
 * 元件只負責標記 data-reveal，觀察與時序統一在這裡處理。
 * 沒有 JS 或 prefers-reduced-motion 時不加 js-reveal，內容維持可見。
 */
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const root = document.documentElement
  root.classList.add('js-reveal')

  const startedAt = performance.now()

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue
      }

      const el = entry.target as HTMLElement
      // 首屏元素立即顯示，避免延後 LCP。
      const isInitialPaint = performance.now() - startedAt < 300
      const delay = isInitialPaint ? 0 : Number(el.dataset.revealDelay ?? 0)

      el.style.transitionDelay = delay > 0 ? `${delay}ms` : ''
      el.classList.add('is-visible')
      observer.unobserve(el)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 })

  const observeAll = () => {
    for (const el of document.querySelectorAll('[data-reveal]:not(.is-visible)')) {
      observer.observe(el)
    }
  }

  observeAll()

  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', observeAll)
})
