# 專案決策（Single Source of Truth）

- 原始需求：[md/日系裸粉舞蹈工作室官網 Web SPEC v1.0.md](../md/日系裸粉舞蹈工作室官網%20Web%20SPEC%20v1.0.md)
- 本檔用來**補足 SPEC 的模糊處、修正 SPEC 的衝突處**。兩者衝突時以本檔為準。
- 任何 agent 若發現本檔未涵蓋的決策點，**不要自行決定**，在回報中列入「待決事項」。

---

## D1 技術棧

| 項目 | 決定 |
|---|---|
| Framework | Nuxt 4 + TypeScript，`<script setup lang="ts">` |
| 輸出 | SSG（`npm run generate`），產出靜態檔部署 |
| 樣式 | 原生 CSS + CSS Custom Properties；元件內 `<style scoped>`。**不用** Tailwind / UI Kit / 動畫庫 |
| Nuxt 模組 | `@nuxt/image`、`@nuxt/fonts`、`@nuxt/eslint` |
| 套件管理 | **npm**（不用 pnpm / yarn） |
| Node | 全機維持 20.11 不動；專案以 devDependency `"node": "^22.19.0"` 提供 Node 22（`npm run` 自動使用）。安裝依賴一律用 `npx -y -p node@22.23.2 -p npm@11 -c "npm install"`。CI 直接用 Node 22 + `npm ci` |
| 測試 | Vitest + `@nuxt/test-utils`（unit）、Playwright + `@axe-core/playwright`（e2e / a11y）、`@lhci/cli` |
| 新增依賴 | 以上以外的依賴一律需在回報中說明理由，由整合者核准 |

---

## D2 目錄結構與檔案擁有權

**只改自己擁有的檔案。** 需要改別人的檔案 → 在回報列「跨界需求」，不要直接改。

```text
app/
  app.vue                         Codex
  pages/index.vue                 Codex   （section 組裝順序）
  assets/css/tokens.css           Codex
  assets/css/base.css             Codex
  components/base/                Codex   BaseButton, SectionHeading, Accordion, AccordionItem
  components/layout/AppHeader.vue       Codex
  components/layout/MobileBookingBar.vue Codex
  components/layout/AppFooter.vue       Gemini
  components/sections/PolicySection.vue Codex
  components/sections/FaqSection.vue    Codex
  components/sections/*（其餘）          Gemini  HeroSection, ClassSection, ClassFeature,
                                                  PricingSection, PricingCard, MonthlyPlan,
                                                  BookingSteps, ContactCTA
  composables/ , plugins/ , utils/      Codex
  data/types.ts                   Codex
  data/*.ts（內容）                Codex 建立（C1 逐字轉錄 SPEC）
                                  → 之後 Gemini 只可改：hero.ts / classes.ts 的 image.alt
public/images/                    Gemini
docs/content/ , docs/qa/          Gemini
tests/ , .github/ , lighthouserc.* , nuxt.config.ts , package.json   Codex
docs/DECISIONS.md , docs/tasks/   整合者（人 / Claude），agent 不改
```

元件自動匯入設定 `pathPrefix: false`，因此 `sections/HeroSection.vue` 直接以 `<HeroSection>` 使用。

---

## D3 色彩 Tokens（已修正 WCAG AA）

SPEC §4 的色票經實測，有三處不符合 SPEC §28 要求的 AA（一般文字需 ≥ 4.5:1，≥24px 大字需 ≥ 3:1）：

| SPEC 原用法 | 實測 | 問題 |
|---|---|---|
| Secondary Text `#81736D` on `#FCF9F7` / `#F4EAE4` | 4.35 / 3.85 | 未達 4.5 |
| Brown Beige `#A58B80` 作 secondary text | 3.03 / 2.69 | 未達 |
| Accent Rose `#C99F95` 作價格文字 | 2.26 | 大字也未達 3 |
| Hover `#C99F95` 底 + `#514743` 字 | 3.81 | 按鈕文字未達 |

因此定案如下（**元件內禁止直接寫 hex，一律用 token**）：

| Token | 值 | 用途 | 限制 |
|---|---|---|---|
| `--color-bg` | `#FCF9F7` | 主背景 | |
| `--color-bg-alt` | `#F4EAE4` | Classes / Monthly 區塊背景 | |
| `--color-nude` | `#DFC1B8` | 按鈕底、tag、細線 | 不可當文字色 |
| `--color-rose` | `#C99F95` | hover 底、active、裝飾 | 不可當文字色 |
| `--color-rose-deep` | `#8A6A61` | **新增**：優惠價等強調文字 | 僅限 ≥24px（ivory 4.64 / beige 4.11） |
| `--color-brown` | `#A58B80` | divider、icon | 不可當文字色 |
| `--color-text` | `#514743` | 主文字 | ivory 8.59 / beige 7.60 |
| `--color-text-muted` | `#6F625C` | **取代 `#81736D`** 作次要文字 | ivory 5.60 / beige 4.96 |
| `--color-text-strong` | `#3F3633` | **新增**：rose hover 底上的文字 | on rose 4.97 |
| `--color-line` | `rgba(165, 139, 128, 0.32)` | 卡片 border、分隔線 | |
| `--color-header-bg` | `rgba(252, 249, 247, 0.85)` | sticky header | |

按鈕：預設 `--color-nude` 底 + `--color-text` 字（5.34）；hover `--color-rose` 底 + `--color-text-strong` 字（4.97）；transition 250ms。
Focus：`outline: 2px solid var(--color-text); outline-offset: 3px;`（全站 `:focus-visible`）。
禁用純黑 `#000`、禁用漸層。

---

## D4 字體與字級

| Token | 字體 | 允許字重 |
|---|---|---|
| `--font-serif-tc` | Noto Serif TC | 500, 600 |
| `--font-sans-tc` | Noto Sans TC | 400, 500 |
| `--font-en` | Cormorant Garamond | 400, 400 italic, 500 |

字重限縮是為了 Lighthouse Performance ≥ 90（CJK 字體很重）。`font-display: swap`。

| Token | 值 | 用途 |
|---|---|---|
| `--fs-eyebrow` | `0.8125rem` | 英文 eyebrow / tag（letter-spacing `0.14em`） |
| `--fs-body` | `1rem` | 正文、FAQ、Policy |
| `--fs-lead` | `1.125rem` | 導言 |
| `--fs-card-title` | `1.375rem` | 卡片標題 |
| `--fs-price` | `clamp(1.75rem, 1.5rem + 1vw, 2.25rem)` | 優惠價 |
| `--fs-section` | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` | Section 標題 |
| `--fs-hero` | `clamp(2.75rem, 1.8rem + 4vw, 5rem)` | Hero H1 |

- 中文正文 `line-height: 1.8`，標題 `1.4`；中文段落最大寬度約 `34em`。
- SPEC §28「font-size 不低於 16px」解讀為：**所有承載資訊的文字 ≥ 16px**；英文 eyebrow / tag 屬裝飾，可用 13px，但旁邊必須有同義中文標題。

---

## D5 版面 Tokens

| Token | 值 |
|---|---|
| `--container-max` | `1200px` |
| `--content-max` | `1120px` |
| `--gutter` | `20px`（≥640px: `24px`） |
| `--section-y` | `64px`（≥640px: `80px`；≥1024px: `120px`） |
| `--header-h` | `64px`（≥1024px: `72px`） |
| `--mobile-bar-h` | `64px` + `env(safe-area-inset-bottom)` |
| `--radius-btn` | `6px` |
| `--radius-card` | `8px` |
| `--radius-img` | `4px` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |

- 斷點（mobile-first，只用 `min-width`）：`640px`、`1024px`、`1440px`。
- 陰影：預設不用。卡片用 `1px solid var(--color-line)`。
- `html { scroll-padding-top: var(--header-h); }`

---

## D6 導覽與錨點

頁面順序與錨點：

```text
#top  Hero
#classes  Classes
#pricing  Pricing
#monthly  Monthly Plan
#booking  Booking
#policy  Policy
#faq  FAQ
#contact  Contact CTA
Footer
```

- Desktop header：Logo ｜ Classes · Pricing · Booking · FAQ ｜ `[LINE 預約]`
- Mobile header：Logo ｜ Hamburger（抽屜內含全部 8 個錨點 + LINE 預約按鈕）
- Mobile 不在 header 放「預約」，由底部固定列 MobileBookingBar 負責（< 1024px 顯示）。
- 所有外部連結（LINE / Instagram）：`target="_blank" rel="noopener"`，並有 visually-hidden「（另開視窗）」。
- **LINE / Instagram 連結目前尚未提供（值為 `null`）→ 相關元素一律不渲染（`v-if`），但程式碼保留**，填入網址後自動出現。影響範圍：
  - Header 的「LINE 預約」按鈕（desktop 與行動抽屜）
  - Hero secondary CTA「預約課程」
  - Monthly Plan CTA「開始安排本月課程」
  - ContactCTA 的 LINE / Instagram 按鈕
  - Footer 社群連結
  - MobileBookingBar 整條（連同底部預留空間）
  - JSON-LD `sameAs`
- 元件在上述元素隱藏時，版面仍須完整、不留空洞（例如按鈕列整列移除，而不是留下空白高度）。

---

## D7 價格卡

- 2 類課程 × 3 種人數 = 6 張卡，依課程類別分兩組，各組有小標題。
- **單堂價不是「已作廢的原價」**（沒買月方案時仍適用），所以不能只靠刪除線表達：
  - 顯示「單堂 NT$1,500」（可套 line-through 樣式，色 `--color-text-muted`）
  - 顯示「月 4 堂優惠 NT$1,400」為主視覺（`--fs-price`、`--color-rose-deep`）
  - 兩個價格都有文字標籤；刪除線元素補 visually-hidden 說明。
- 價格格式 `NT$1,500`、雙人/團體加 `/ 人`，由 `utils/formatPrice.ts` 統一。
- 不用 `<table>`。建議語意：`<ul>` 包 `<li><article>`。
- 排版：mobile 單欄（卡片精簡）、≥640px 可 3 欄或 2+1、≥1024px 3 欄。**不做 tab 切換**。

---

## D8 捲動動畫（元件與實作解耦）

- 契約：元件只加屬性 `data-reveal`（fade-up）或 `data-reveal="fade"`（fade-in），可選 `data-reveal-delay="100"`（ms）。
- 實作由 Codex 的 client plugin 以 IntersectionObserver 統一處理（Gemini 不寫觀察器）。
- 規格：500ms、`--ease`、fade-up 位移 16px；同一組內 stagger ≤ 100ms。
- **無 JS 時內容必須可見**：隱藏狀態只在 `html.js-reveal` 存在時生效。
- `prefers-reduced-motion: reduce` → 不做動畫。
- 禁止：parallax、zoom、bounce、spin。

---

## D9 圖片

- 比例：Hero `4:5`、Class `3:4`、OG `1200×630`。同類圖片比例必須一致。
- 一律 `<NuxtImg>` / `<NuxtPicture>`，`format="avif,webp"`，給 `sizes`。
- Hero 圖：`preload`、`fetchpriority="high"`、不 lazy。其餘 `loading="lazy"`。
- 正式照片到位前用 `public/images/placeholder/` 下的固定檔名；換正式圖只換檔案，不改程式：
  - `hero.jpg`、`class-ballet.jpg`、`class-stretch.jpg`、`og.jpg`
- `alt` 必填，中文描述畫面內容。

---

## D10 內容規則

- 所有文案放 `app/data/*.ts`；元件內**不得硬寫文案**（aria / visually-hidden 輔助文字除外）。
- SPEC 中的文案已是業主提供的版本，**逐字使用**，不潤飾。潤飾建議寫到 `docs/content/copy-review.md`。
- 全站設定集中在 `app/data/site.ts`：

  | 欄位 | 目前值 | 未提供時的行為 |
  |---|---|---|
  | `brandName` | `'Nude Movement'`（暫用專案名稱） | — |
  | `url` | `null` | 不輸出 canonical、`og:url` |
  | `lineUrl` | `null` | 隱藏所有 LINE 元素（見 D6） |
  | `instagramUrl` | `null` | 隱藏所有 Instagram 元素（見 D6） |
  | `roomFee` | `null` | Policy 03 維持 SPEC 原文，不顯示金額 |

  SPEC 中的「品牌名稱」「Brand Name」「Studio Name」一律以 `site.brandName` 代入，例如 SEO title「Nude Movement｜芭蕾・抒情當代・嬋柔・伸展課程」、版權「© 2026 Nude Movement. All Rights Reserved.」。
- **FAQ 目前只放問題，答案後續補**：`faq.ts` 每題 `body: []`。答案為空的題目以**靜態問題列**呈現（不可展開、無 +/− 圖示、不進入 accordion 鍵盤導覽）；填入答案後自動變成可展開項目。
- **AI 不得發明營業規則**（價格、請假、補課、場租、團課配對等），也不得自行撰寫 FAQ 答案。
- 補課期限「須於次月前兩週內完成補課」= **下個月的第一週與第二週**。網站文案維持 SPEC 原文，此定義供撰寫說明或回答問題時使用。
- 老師具 GYROKINESIS® 認證，可使用「Gyrokinesis」名稱。

---

## D11 Git 與交付流程

- **不開分支、不用 worktree**：所有任務依 `docs/DISPATCH.md` 的順序，在 `D:\project\Web\nude-movement` 的 `main` 上逐一執行。
- 一次只執行一個任務。開始前確認 `git status` 乾淨、上一個任務已 commit。
- 依序執行時，D2 的檔案擁有權仍然有效（避免後面的任務改壞前面任務的成果）。
- Commit：Conventional Commits 並帶任務 ID，例如 `feat(C1): scaffold nuxt project`，英文或中文皆可。
- agent **不得** push、建立分支、改寫 git 歷史（rebase / amend / reset）。
- 完成定義（C1 完成後適用）：
  ```bash
  npm run lint && npm run typecheck && npm run test && npm run generate
  ```
  全部通過才可回報完成。

---

## 業主事項追蹤（不影響開發，但影響上線）

| # | 項目 | 狀態 | 目前處理 |
|---|---|---|---|
| B1 | 品牌名稱（中 / 英）、Logo 檔 | 暫定 | 暫用專案名稱「Nude Movement」，Logo 以文字呈現 |
| B2 | LINE 官方帳號連結、Instagram 連結 | 待提供 | 相關元素隱藏、程式保留（D6） |
| B3 | 「基本場租費用」實際金額（SPEC §17 Note） | 待提供 | 不顯示金額（D10） |
| B4 | FAQ 6 題答案 | 待提供 | 只顯示問題（D10） |
| B5 | 補課期限定義 | ✅ 已確認 | 下個月的第一週與第二週 |
| B6 | GYROKINESIS® 使用資格 | ✅ 已確認 | 老師具認證，可使用 |
| B7 | 正式照片（見 `docs/content/photo-brief.md`） | 待提供 | 使用暫用圖（D9） |
| B8 | 網域與部署平台 | ✅ 暫定 | GitHub Pages：`https://fcu1397.github.io/nude-movement`，`site.url` 已設定；換自訂網域時見 `docs/DEPLOY.md` |
| B9 | 轉換追蹤（LINE 點擊事件，GA4 / Meta Pixel） | 保留，暫不實作 | v1 不做 |
