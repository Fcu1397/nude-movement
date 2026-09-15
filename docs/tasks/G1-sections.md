# G1 · Visual Sections

| | |
|---|---|
| Owner | **Gemini** |
| Branch | `gemini/G1-sections` |
| 依賴 | C1 已合併 |
| 可平行 | C2、G2 |
| 阻擋 | C3、G3 |

## 目標

把 C1 建好的 stub 元件，實作成符合 SPEC 視覺方向的正式版面。這是整個網站「看起來對不對」的關鍵任務。

## 你擁有的檔案

`app/components/sections/` 下的 `HeroSection` `ClassSection` `ClassFeature` `PricingSection` `PricingCard` `MonthlyPlan` `BookingSteps` `ContactCTA`，以及 `app/components/layout/AppFooter.vue`。

**不要改**：`tokens.css`、`base.css`、`BaseButton`、`SectionHeading`、`data/types.ts`、`pages/index.vue`、Header / Accordion / Policy / FAQ / MobileBookingBar。
缺 token、BaseButton 需要新 variant、需要改 props 型別 → 列入回報「跨界需求」，先用最接近的現有 token 實作。

## 共通要求

- 只用 tokens；`<style scoped>`；mobile-first。
- 背景節奏：Hero `--color-bg` → Classes `--color-bg-alt` → Pricing `--color-bg` → Monthly `--color-bg-alt` → Booking `--color-bg` → Policy / FAQ（C2）→ Contact `--color-bg-alt` → Footer `--color-bg`。
- 每個 section 用 `<SectionHeading>`；可捲動進場的區塊加 `data-reveal`（群組內可加 `data-reveal-delay`，≤100ms 遞增）。
- 中文多行文案（`string[]`）：desktop 保留斷行（`<br>`），mobile 可視寬度決定是否保留，避免孤字。
- 不用陰影、漸層、emoji；圓角遵守 token；icon 只能是細線 SVG（stroke 1–1.5px、`currentColor`、`aria-hidden="true"`）。
- **LINE / Instagram 目前沒有網址**（DECISIONS D6）：所有 `CtaLink.href === null` 的按鈕與連結用 `v-if` 不渲染，程式碼保留。每個含這類 CTA 的元件都要確認**隱藏狀態下版面依然完整**（按鈕列整列移除、不留空白高度、不出現孤立的分隔線），並暫時填入測試網址確認顯示狀態也正確。
- 品牌名一律用 `site.brandName`（目前「Nude Movement」）。

## 各元件規格

### HeroSection（SPEC §9）
- Desktop ≥1024px：左文字、右照片（照片 4:5），約 5:6 或 5:7 欄寬比，文字垂直置中，大量留白。
- Mobile：文字與 CTA 在上（首屏要看得到「查看課程」與「預約課程」），照片在下。
- 層級：eyebrow（`--font-en`、`--fs-eyebrow`、letter-spacing）→ H1「Move with Grace.」（`--font-en`、`--fs-hero`，**全頁唯一 h1**）→ 中文 lead（`--font-serif-tc`）→ description（`--color-text-muted`）→ CTA 列（primary「查看課程」→ `#classes`；secondary「預約課程」→ LINE）。
- 圖片：`<NuxtImg preload fetchpriority="high">`，無 lazy；可加極細的比例外框或偏移色塊（`--color-bg-alt`）增加編輯感，但不加陰影。

### ClassSection + ClassFeature（SPEC §10）
- `ClassSection` 為容器（`#classes`），內含兩個 `ClassFeature`。
- Desktop：圖文左右排列且**交錯**（第一個圖左、第二個圖右），圖片 3:4。
- `ClassFeature` 內容層級：英文名（`--font-en` italic）→ 中文名（`--font-serif-tc`）→ 描述 → Keywords（以「·」分隔的英文小字，或細框 tag，二擇一，全站一致）→「適合」清單（細線短橫作項目符號）。
- Mobile：圖 → 文字，單欄。

### PricingSection + PricingCard（SPEC §11–§14、DECISIONS D7）
- 標題、說明、補充文字（「1.5 小時或 2 小時…」用 `--color-text-muted`）。
- 兩組：「Ballet & Contemporary」「Gyrokinesis & Stretch」，各含 3 張卡。
- `PricingCard`：tier 英文（eyebrow 風格）→ 中文名 → 單堂價（標籤「單堂」+ line-through 樣式 + visually-hidden 說明）→ 優惠價（標籤「月 4 堂優惠」、`--fs-price`、`--color-rose-deep`）→ 單位。
- 卡片：`1px solid var(--color-line)`、`--radius-card`、背景 `--color-bg`；hover 最多只改 border 顏色。
- 可在區塊底部加一行連到 `#monthly` 的文字連結「了解當月 4 堂優惠方案」。
- 價格一律用 `formatPrice()`。**不用 `<table>`、不做 tab。**

### MonthlyPlan（SPEC §15，全站最重要轉換區之一）
- `#monthly`，背景 `--color-bg-alt`。
- Desktop 兩欄：左側標題 / subheading / 說明 / features；右側「Your Monthly Plan」範例。
- Features：SPEC 的「✓」改為細線 check SVG（`--color-brown`）+ 文字。
- 範例卡設計成**編輯式清單 / 收據感**：`--color-bg` 底、細線分隔、`--font-en` 標題、項目與數量左右對齊、底部「Total Classes: 4」。
- CTA「開始安排本月課程」→ LINE（external），primary。目前隱藏，左欄在沒有 CTA 時結尾應停在 features，範例卡仍與左欄垂直平衡。

### BookingSteps（SPEC §16）
- `#booking`，語意 `<ol>`。
- Desktop 三欄、mobile 直排。
- 視覺主元素為大號數字 01 / 02 / 03（`--font-en`，尺寸大、色 `--color-nude` 或 `--color-rose`，數字 `aria-hidden`，因 `<ol>` 已提供順序）。
- 數字下方：英文（eyebrow 風格）→ 中文標題 → 說明（Step 02、03 有）。
- 可用細線連接三步驟（desktop 橫線、mobile 直線）。無 icon。

### ContactCTA（SPEC §19）
- `#contact`，背景 `--color-bg-alt`，置中、上下留白加大。
- 「Ready to Move?」（`--font-en`、接近 `--fs-section` 的大字）→ 中文 → 兩個按鈕（LINE primary、Instagram secondary，皆 external）→ 補充文字。
- 目前兩個按鈕都隱藏：此時 section 只剩標題、中文與補充文字，仍須是一個好看的收尾區塊（調整上下留白，不留按鈕的空位）。

### AppFooter（SPEC §20）
- Brand name、課程列表（Ballet / Contemporary / Gyrokinesis / Stretching）、社群（LINE、Instagram）、版權。
- 社群連結都沒有值時，整個社群區塊（含標題）不渲染，其餘區塊重新分配寬度。
- Desktop 橫向三區塊，mobile 直排；上緣 1px line；文字 `--color-text-muted`。

## 自我檢查（完成前）

用 `pnpm dev`，瀏覽器 DevTools 切 375 / 768 / 1280 / 1440 逐一檢視：
- [ ] 375px 首屏看得到 H1、中文 lead、CTA（LINE 隱藏時只有「查看課程」）
- [ ] LINE / IG 隱藏與顯示兩種狀態都檢查過，隱藏時沒有空洞（檢查完還原 `site.ts`，不要 commit 測試網址）
- [ ] 沒有水平捲軸；沒有文字貼齊螢幕邊緣
- [ ] 整體感覺符合 GEMINI.md「視覺方向」，不像 SaaS 模板或健身房
- [ ] 同類圖片比例一致（Hero 4:5、Class 3:4）
- [ ] 除 Hero 外沒有第二個 h1；section 標題皆 h2
- [ ] 元件內無 hex、無硬寫文案
- [ ] `pnpm lint && pnpm typecheck && pnpm generate` 通過

## 回報格式

```md
## G1 回報
- 分支 / commit：
- 完成元件：
- 設計決定摘要：（每個 section 1–2 句，例如 Keywords 選了哪種呈現、Hero 欄寬比）
- 自我檢查清單：
- 跨界需求：（需要 Codex 新增的 token / BaseButton variant / 型別欄位，以及暫時替代做法）
- 已知問題：
```
