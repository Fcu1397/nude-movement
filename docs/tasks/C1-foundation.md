# C1 · Foundation（專案骨架、Tokens、資料層、元件 stub）

| | |
|---|---|
| Owner | **Codex** |
| 順序 | **1** |
| 依賴 | 無 |

## 目標

建立讓 Codex 與 Gemini 可以**分工開發、互不衝突**的基礎：專案骨架、design tokens、完整資料層（SPEC 文案逐字轉錄）、共用基礎元件，以及所有 section 的 stub（定好 props 契約）。

C1 完成時，`npm run dev` 應可看到**無樣式但內容完整**的單頁，所有文案、價格都正確呈現。

## 範圍

### 1. 專案骨架
- 在 repo 根目錄**手動建立** Nuxt 4 專案檔案（不要跑 `nuxi init`，它會在 Node 20 下執行）。**不得刪除或覆蓋**既有 `md/`、`docs/`、`AGENTS.md`、`GEMINI.md`、`README.md`。
- 以下 baseline 已由整合者在本機（全域 Node 20.11、PowerShell）實測：安裝、`generate`、`test`、`typecheck`、`lint` 全數通過。請以此為起點，版本範圍不要自行降版：

  ```json
  {
    "private": true,
    "type": "module",
    "scripts": {
      "postinstall": "nuxt prepare",
      "dev": "nuxt dev",
      "build": "nuxt build",
      "generate": "nuxt generate",
      "preview": "nuxt preview",
      "lint": "eslint .",
      "typecheck": "nuxt typecheck",
      "test": "vitest run"
    },
    "dependencies": {
      "nuxt": "^4.5.2",
      "@nuxt/image": "^2.1.0",
      "@nuxt/fonts": "^0.14.0",
      "vue": "^3.5.0",
      "vue-router": "^4.5.0"
    },
    "devDependencies": {
      "node": "^22.19.0",
      "@nuxt/eslint": "^1.17.0",
      "eslint": "^10.4.0",
      "@nuxt/test-utils": "^4.3.2",
      "@vue/test-utils": "^2.4.6",
      "happy-dom": "^20.0.0",
      "vitest": "^4.1.0",
      "vue-tsc": "^3.0.0",
      "typescript": "~5.9.0"
    }
  }
  ```

  - `tsconfig.json`：`{ "extends": "./.nuxt/tsconfig.json" }`
  - `eslint.config.mjs`：`import withNuxt from './.nuxt/eslint.config.mjs'; export default withNuxt()`
  - `vitest.config.ts`：`defineVitestConfig` from `@nuxt/test-utils/config`，需要 Nuxt 環境的測試檔命名 `*.nuxt.test.ts` 或設 `environment: 'nuxt'`
- 安裝：`npx -y -p node@22.23.2 -p npm@11 -c "npm install"`（見 AGENTS.md），commit `package-lock.json`。
- `nuxt.config.ts`：
  - `compatibilityDate: '2026-09-01'`
  - modules：`@nuxt/image`、`@nuxt/fonts`、`@nuxt/eslint`
  - `components: [{ path: '~/components', pathPrefix: false }]`
  - `app.head.htmlAttrs.lang = 'zh-Hant-TW'`
  - `css: ['~/assets/css/tokens.css', '~/assets/css/base.css']`
  - `image.format: ['avif', 'webp']`（注意：@nuxt/image 2 是 `format`，不是 `formats`）
  - `fonts.families` 依 DECISIONS D4 限定字重（provider `google`）
- `.gitignore`：`node_modules/`、`.nuxt/`、`.output/`、`.data/`、`.shots/`、`.lighthouseci/`

### 2. CSS
- `app/assets/css/tokens.css`：DECISIONS D3、D4、D5 的**全部** token，含斷點下的 token 覆寫。
- `app/assets/css/base.css`：modern reset、`body` 字體/背景/字色、`:focus-visible` 規則、`.visually-hidden`、`.container`（max-width + gutter）、`html { scroll-behavior: smooth; scroll-padding-top }`（reduced-motion 時關閉 smooth）。
- **不要**在 body 全域加底部 padding：底部預留空間由 `MobileBookingBar` 自己輸出一個 in-flow spacer（< 1024px 高度 `--mobile-bar-h`），bar 不渲染時空間自然消失。

### 3. 資料層 `app/data/`
`types.ts`（以下為最低契約，可補欄位但不可刪）：

```ts
export type ClassCategory = 'ballet' | 'stretch'
export type Tier = 'private' | 'duo' | 'group'

export interface ImageAsset { src: string; alt: string }
export interface Heading { eyebrow?: string; title: string; subtitle?: string }

export interface SiteConfig {
  brandName: string            // 'Nude Movement'（暫用）
  url: string | null           // null = 未定
  lineUrl: string | null       // null = 隱藏所有 LINE 元素
  instagramUrl: string | null  // null = 隱藏所有 IG 元素
  roomFee: number | null
  copyrightYear: number
  seo: { title: string; description: string; ogImage: string }
}
/** href 為 null 時元件不渲染該 CTA */
export interface CtaLink { label: string; href: string | null; external: boolean }
export interface HeroContent {
  eyebrow: string; title: string; lead: string[]; description: string
  primaryCta: CtaLink    // 查看課程 → '#classes'
  secondaryCta: CtaLink  // 預約課程 → site.lineUrl
  image: ImageAsset
}
export interface ClassInfo {
  id: ClassCategory; titleZh: string; titleEn: string
  description: string[]; keywords: string[]; suitableFor: string[]
  image: ImageAsset
}
export interface PriceItem {
  category: ClassCategory; tier: Tier
  labelEn: string; labelZh: string
  single: number; monthly: number; perPerson: boolean
}
export interface MonthlyPlanContent {
  heading: Heading; content: string[]; features: string[]
  example: { title: string; items: { label: string; count: number }[]; totalLabel: string }
  cta: CtaLink           // 開始安排本月課程 → site.lineUrl
}
export interface BookingStep { no: string; titleEn: string; titleZh: string; body: string[] }
/** body 為空陣列 = 答案待補，以靜態問題列呈現 */
export interface AccordionEntry { id: string; title: string; body: string[]; example?: string[] }
```

LINE / IG 相關的 `href` 一律引用 `site.lineUrl` / `site.instagramUrl`，不要在各資料檔重複寫網址。

資料檔（**SPEC 文案逐字轉錄**，多行文案拆成 `string[]`）：

| 檔案 | 來源 |
|---|---|
| `site.ts` | 依 DECISIONS D10 表格：`brandName: 'Nude Movement'`，`url` / `lineUrl` / `instagramUrl` / `roomFee` 皆 `null`；SEO 取 SPEC §29 並代入品牌名 |
| `hero.ts` | §9；secondary CTA「預約課程」→ `site.lineUrl`（external） |
| `classes.ts` | §10（heading + 2 筆 ClassInfo，圖片路徑見 D9） |
| `pricing.ts` | §11–§13（heading、說明、補充、6 筆 PriceItem；Gyro/Stretch 的 labelEn/labelZh 沿用 Ballet 的） |
| `monthly.ts` | §15 |
| `booking.ts` | §16 |
| `policy.ts` | §17（5 筆，Accordion 05 含 example） |
| `faq.ts` | §18（6 題，`body: []`，答案後續由業主提供） |
| `contact.ts` | §19（按鈕 href 引用 site） |
| `footer.ts` | §20（版權代入 `site.brandName`） |

`app/utils/formatPrice.ts`：`formatPrice(1500) → "NT$1,500"`，`perPerson` 時加 `" / 人"`。

### 4. 基礎元件 `app/components/base/`
- `BaseButton.vue`：props `variant: 'primary' | 'secondary'`、`href`、`external?`；有 href 渲染 `<a>`（external 加 `target="_blank" rel="noopener"` + visually-hidden「（另開視窗）」），否則 `<button>`。樣式依 D3（primary：nude 底 → hover rose 底；secondary：透明底 + 1px border）。min-height 44px、radius `--radius-btn`、transition 250ms。
- `SectionHeading.vue`：props `heading: Heading`、`level?: 'h2' | 'h3'`（預設 h2）、`align?: 'start' | 'center'`。eyebrow 用 `--font-en`，title 用 `--font-serif-tc`。

### 5. Stub 元件
為下列元件建立檔案，**定好 props、根元素與 section id、渲染無樣式的完整內容**，並在檔案頂端註解 `<!-- STUB: styling owned by Gemini (G1) -->` 或 `(C2)`：

- Gemini 擁有（G1 會改寫樣式與結構）：`HeroSection` `ClassSection` `ClassFeature` `PricingSection` `PricingCard` `MonthlyPlan` `BookingSteps` `ContactCTA` `AppFooter`
- Codex 擁有（C2 會完成）：`AppHeader` `MobileBookingBar` `Accordion` `AccordionItem` `PolicySection` `FaqSection`

`pages/index.vue` 依 DECISIONS D6 的順序組裝，資料由 page 以 props 傳入（元件不直接 import data，便於測試）。例外：Header、MobileBookingBar、Footer 可自行讀 `site.ts`。

`app.vue`：`<MobileBookingBar v-if="site.lineUrl" />`。Stub 階段即需落實「`href` 為 `null` 不渲染」規則（DECISIONS D6）。

### 6. 測試
- `formatPrice` 單元測試。
- 資料完整性測試：6 筆價格、每筆 `monthly < single`、6 題 FAQ、5 則 policy、hero/class 圖片 alt 非空。
- 渲染測試：`lineUrl` / `instagramUrl` 為 `null` 時頁面中不存在任何指向 LINE / IG 的連結。

## 不做

- 任何 section 的視覺設計（G1）。
- Header 選單行為、Accordion 行為、reveal plugin、SEO meta（C2）。
- Playwright、Lighthouse、CI（C3）。

## 驗收

- [ ] `npm run lint && npm run typecheck && npm run test && npm run generate` 通過
- [ ] `npm run dev` 可看到完整、順序正確的單頁內容，錨點 id 與 D6 一致
- [ ] 所有 SPEC 文案、價格逐字正確（抽查 §12、§13、§17）
- [ ] tokens.css 涵蓋 D3–D5 全部 token；元件內無 hex 色碼
- [ ] 所有 stub 元件已建立並有 props 型別
- [ ] 既有 `md/` `docs/` `AGENTS.md` `GEMINI.md` 未被改動

## 回報格式

```md
## C1 回報
- commit：
- 驗收清單：（逐條打勾，未完成者說明）
- 指令輸出摘要：lint / typecheck / test / generate
- 新增依賴：（套件名 + 理由）
- 與 DECISIONS 的偏差：（無則寫無）
- 待決事項：
- 給 Gemini 的注意事項：（props 契約、可用 token、已知限制）
```
