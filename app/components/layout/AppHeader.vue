<script setup lang="ts">
import { site } from '~/data/site'

const desktopHrefs = ['#classes', '#pricing', '#booking', '#faq']
const desktopLinks = computed(() => site.navigation.filter(link => desktopHrefs.includes(link.href)))

const menuOpen = ref(false)
const isScrolled = ref(false)
const activeHref = ref<string | null>(null)
const toggleEl = ref<HTMLButtonElement | null>(null)
const drawerEl = ref<HTMLElement | null>(null)

function focusables(): HTMLElement[] {
  const inDrawer = drawerEl.value
    ? Array.from(drawerEl.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    : []

  return toggleEl.value ? [toggleEl.value, ...inDrawer] : inDrawer
}

function closeMenu(returnFocus = true) {
  if (!menuOpen.value) {
    return
  }

  menuOpen.value = false

  if (returnFocus) {
    void nextTick(() => toggleEl.value?.focus())
  }
}

function toggleMenu() {
  if (menuOpen.value) {
    closeMenu()
  }
  else {
    menuOpen.value = true
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!menuOpen.value) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu()

    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const items = focusables()

  if (items.length === 0) {
    return
  }

  const first = items[0]!
  const last = items[items.length - 1]!

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(menuOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''

  if (open) {
    await nextTick()
    drawerEl.value?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus()
  }
})

let sectionObserver: IntersectionObserver | null = null

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

function onResize() {
  if (window.innerWidth >= 1024) {
    closeMenu(false)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  onScroll()

  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeHref.value = `#${entry.target.id}`
      }
    }
  }, { rootMargin: '-45% 0px -50% 0px' })

  for (const link of site.navigation) {
    const target = document.querySelector(link.href)

    if (target) {
      sectionObserver.observe(target)
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  sectionObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': isScrolled }"
    @keydown="onKeydown"
  >
    <div class="site-header__inner container">
      <a
        class="site-header__brand"
        href="#top"
        @click="closeMenu(false)"
      >{{ site.brandName }}</a>

      <nav
        class="site-header__nav"
        aria-label="主要導覽"
      >
        <ul class="site-header__list">
          <li
            v-for="link in desktopLinks"
            :key="link.href"
          >
            <a
              class="site-header__link"
              :href="link.href"
              :aria-current="activeHref === link.href ? 'true' : undefined"
            >{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <BaseButton
        v-if="site.lineUrl"
        class="site-header__cta"
        variant="primary"
        :href="site.lineUrl"
        external
      >
        {{ site.bookingLabel }}
      </BaseButton>

      <button
        ref="toggleEl"
        class="site-header__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-menu"
        @click="toggleMenu"
      >
        <span
          class="site-header__bars"
          :class="{ 'is-open': menuOpen }"
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
        <span class="visually-hidden">{{ menuOpen ? '關閉選單' : '開啟選單' }}</span>
      </button>
    </div>

    <div
      id="site-menu"
      ref="drawerEl"
      class="site-header__drawer"
      :class="{ 'is-open': menuOpen }"
      :inert="!menuOpen"
    >
      <nav
        class="site-header__drawer-inner container"
        aria-label="全站導覽"
      >
        <ul class="site-header__drawer-list">
          <li
            v-for="link in site.navigation"
            :key="link.href"
          >
            <a
              class="site-header__drawer-link"
              :href="link.href"
              :aria-current="activeHref === link.href ? 'true' : undefined"
              @click="closeMenu(false)"
            >{{ link.label }}</a>
          </li>
        </ul>

        <BaseButton
          v-if="site.lineUrl"
          class="site-header__drawer-cta"
          variant="primary"
          :href="site.lineUrl"
          external
          @click="closeMenu(false)"
        >
          {{ site.bookingLabel }}
        </BaseButton>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  border-block-end: 1px solid transparent;
  transition: border-color var(--duration-interaction) var(--ease);
}

@supports not (backdrop-filter: blur(12px)) {
  .site-header {
    background: var(--color-bg);
  }
}

.site-header.is-scrolled {
  border-block-end-color: var(--color-line);
}

.site-header__inner {
  display: flex;
  min-height: var(--header-h);
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.site-header__brand {
  font-family: var(--font-en);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-header__nav,
.site-header__cta {
  display: none;
}

.site-header__toggle {
  display: inline-flex;
  width: var(--control-min-h);
  height: var(--control-min-h);
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  margin-inline-end: calc(var(--space-3) * -1);
  background: none;
  cursor: pointer;
}

.site-header__bars {
  display: grid;
  width: 20px;
  gap: 5px;
}

.site-header__bars span {
  height: 1px;
  background: var(--color-text);
  transition: transform var(--duration-interaction) var(--ease);
}

.site-header__bars.is-open span:first-child {
  transform: translateY(3px) rotate(45deg);
}

.site-header__bars.is-open span:last-child {
  transform: translateY(-3px) rotate(-45deg);
}

.site-header__drawer {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  overflow: hidden;
  max-height: 0;
  background: var(--color-bg);
  border-block-end: 1px solid transparent;
  transition:
    max-height var(--duration-interaction) var(--ease),
    border-color var(--duration-interaction) var(--ease);
}

.site-header__drawer.is-open {
  max-height: calc(100vh - var(--header-h));
  border-block-end-color: var(--color-line);
}

.site-header__drawer-inner {
  padding-block: var(--space-5);
}

.site-header__drawer-list {
  display: grid;
  padding: 0;
  margin: 0;
  gap: var(--space-1);
  list-style: none;
}

.site-header__drawer-link {
  display: flex;
  min-height: var(--control-min-h);
  align-items: center;
  font-family: var(--font-en);
  font-size: var(--fs-lead);
  letter-spacing: 0.04em;
  text-decoration: none;
}

.site-header__drawer-cta {
  width: 100%;
  margin-block-start: var(--space-4);
}

.site-header__link[aria-current],
.site-header__drawer-link[aria-current] {
  color: var(--color-rose-deep);
}

@media (min-width: 1024px) {
  .site-header__nav,
  .site-header__cta {
    display: block;
  }

  .site-header__nav {
    margin-inline-start: auto;
  }

  .site-header__toggle,
  .site-header__drawer {
    display: none;
  }

  .site-header__list {
    display: flex;
    padding: 0;
    margin: 0;
    gap: var(--space-5);
    list-style: none;
  }

  .site-header__link {
    font-family: var(--font-en);
    font-size: var(--fs-lead);
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: color var(--duration-interaction) var(--ease);
  }

  .site-header__link:hover {
    color: var(--color-rose-deep);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header__drawer,
  .site-header__bars span {
    transition: none;
  }
}
</style>
