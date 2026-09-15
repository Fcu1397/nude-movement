# C2 · Interactions, A11y & SEO

| | |
|---|---|
| Owner | **Codex** |
| 順序 | **2** |
| 依賴 | C1 已完成 |

## 目標

完成所有「有行為」的元件與全站機制：Header、行動版選單、底部預約列、Accordion、Policy / FAQ section、捲動動畫 plugin、SEO meta 與結構化資料。

## 範圍

### 1. `AppHeader.vue`
- sticky；背景 `--color-header-bg` + `backdrop-filter: blur(12px)`；`@supports not (backdrop-filter: ...)` 時用實色 `--color-bg`。
- 高度 `--header-h`；捲動離開頂端後底部出現 1px `--color-line`。
- Logo：目前以文字呈現 `site.brandName`（`--font-en`），連到 `#top`。
- Desktop（≥1024px）：Logo ｜ Classes · Pricing · Booking · FAQ ｜ `<BaseButton>` LINE 預約（`site.lineUrl` 為 null 時不渲染，導覽靠右對齊不留空）。
- Mobile（<1024px）：Logo ｜ Hamburger。
  - 抽屜採 disclosure 或 modal dialog 模式：`aria-expanded`、`aria-controls`；Esc 關閉；開啟時 focus 移入、關閉時 focus 回到按鈕；開啟時鎖定 body 捲動；點錨點後關閉。
  - 抽屜內容：D6 全部 8 個錨點 + LINE 預約按鈕（有 `lineUrl` 時）。
  - Hamburger 按鈕 44×44，有 accessible name（「開啟選單」/「關閉選單」）。
- （加分）目前所在 section 的導覽項加 `aria-current="true"` 樣式。

### 2. `MobileBookingBar.vue`
- 只在 `site.lineUrl` 存在時由 `app.vue` 渲染（C1 已設定）；目前值為 null，所以**實際不會出現**，但仍須完整實作並以單元測試驗證。
- 僅 <1024px 顯示；`position: fixed; bottom: 0`；高度 `--mobile-bar-h`（含 safe-area）。
- 自帶 in-flow spacer（<1024px 高度 `--mobile-bar-h`），避免遮住 Footer。
- 內容：`<BaseButton>` 滿版「LINE 預約課程」→ LINE（external）。
- 背景同 header 半透明 + 上緣 1px line。
- 當 `#contact` 進入視窗時以 transform 淡出（避免與 ContactCTA 的 LINE 按鈕重複）；不得造成 layout shift。
- 確認 Footer 最底部內容不會被遮住。

### 3. `Accordion.vue` + `AccordionItem.vue`
- 遵循 WAI-ARIA Accordion Pattern：標題 `<hN><button aria-expanded aria-controls>`、面板 `role="region" aria-labelledby`。
- 預設全部關閉；允許同時展開多個。
- 鍵盤：Enter / Space 切換；↑ ↓ Home End 在標題間移動 focus。
- 展開動畫：`grid-template-rows: 0fr → 1fr`，250ms；reduced-motion 時無動畫。
- 面板內容在 SSG HTML 中存在（SEO），收合時對輔助科技隱藏（`hidden` 或 `inert`）。
- 樣式：標題列上下 1px `--color-line`、右側細線 +/− 圖示（CSS 繪製，無彩色 icon）、點擊區 ≥ 44px、標題 `--font-serif-tc`、內文 `--color-text`，example 區塊用 `--color-text-muted` + 左側細線。
- **`body` 為空陣列的項目（目前 FAQ 全部如此）**：渲染為靜態問題列 — 標題仍在 `<hN>` 內、保留上下細線與相同字級，但**沒有 button、沒有 +/− 圖示、沒有 region**，且不納入 ↑↓ Home End 的焦點移動。填入答案後自動變成可展開項目。

### 4. `PolicySection.vue`、`FaqSection.vue`
- `SectionHeading` + `Accordion`。Policy 錨點 `#policy`、FAQ `#faq`。
- Policy 03：`site.roomFee` 為 `null` 時維持 SPEC 原文；有數字時在「將扣除基本場租費用」後補「（NT$xxx）」。
- 版面：Desktop 可左標題、右 accordion 兩欄（編輯式），mobile 單欄。

### 5. Reveal plugin（DECISIONS D8）
- `app/plugins/reveal.client.ts`：hydrate 後在 `<html>` 加 `js-reveal` class，IntersectionObserver 觀察所有 `[data-reveal]`，進入視窗加 `.is-visible` 後 unobserve。
- 支援 `data-reveal`（fade-up）、`data-reveal="fade"`、`data-reveal-delay`。
- CSS 放 `base.css`：只在 `html.js-reveal` 下隱藏；`prefers-reduced-motion: reduce` 下直接可見。
- 首屏（Hero）元素不得因此延後 LCP：Hero 內的 `data-reveal` 在 plugin 啟動時若已在視窗內，立刻加 `.is-visible`（無延遲）。

### 6. SEO
- `useSeoMeta`：title、description（SPEC §29）、`og:title/description/image/url/type/locale(zh_TW)`、`twitter:card=summary_large_image`。
- canonical 取 `site.url`；`site.url` 為 TODO 時不輸出 canonical 與 og:url。
- JSON-LD（`useHead` script `application/ld+json`）：`@type: "SportsActivityLocation"`，只輸出非 null 欄位（name、description；url、`sameAs[IG]` 在有值時才加）；地址等未知欄位不輸出。
- `public/robots.txt`、favicon 佔位。

### 7. 測試
- Accordion：預設關閉、點擊切換、Enter/Space、↑↓ Home End、aria 屬性正確；空 `body` 項目無 button 且被鍵盤導覽略過。
- AppHeader：選單開關、Esc 關閉、aria-expanded 同步；`lineUrl` 有值 / 為 null 兩種狀態的 CTA 顯示。
- MobileBookingBar：以有值的 `lineUrl` 掛載測試連結屬性與 spacer。
- formatPrice / 資料測試維持通過。

## 不做

- Gemini 擁有的 section 樣式（見 D2）。若發現 G1 需要的 token 或 BaseButton 行為，可補在 Codex 的檔案中，並於回報列出。
- Playwright / Lighthouse / CI（C3）。

## 驗收

- [ ] `npm run lint && npm run typecheck && npm run test && npm run generate` 通過
- [ ] 僅用鍵盤可完成：開選單 → 跳到 Policy → 展開 Accordion 01 → 跳到 FAQ 讀到問題列
- [ ] 目前資料（LINE / IG 為 null）下，頁面沒有任何 LINE / IG 元素、沒有底部列、沒有多餘空白
- [ ] 暫時把 `lineUrl` 填入測試值時，Header CTA 與底部列出現，375px 下 Footer 最後一行不被遮住（驗證後還原）
- [ ] 關閉 JS（或 view-source `.output/public/index.html`）時所有內容與 FAQ/Policy 文字存在
- [ ] reduced-motion 下無任何動畫
- [ ] `index.html` 中有正確的 title、description、og 標籤與 JSON-LD
- [ ] 未修改 Gemini 擁有的檔案

## 回報格式

```md
## C2 回報
- commit：
- 驗收清單：
- 指令輸出摘要：
- 新增依賴：
- 與 DECISIONS 的偏差：
- 待決事項：
- 跨界需求：（需要 Gemini 配合的地方，例如某 section 需加 data-reveal）
```
