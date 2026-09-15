# GEMINI.md

> 給 Gemini CLI 的專案指引，啟動時會自動載入。可用 `/memory show` 確認已載入。

## 專案

日系裸粉風格的成人舞蹈工作室單頁官網（Nuxt 4 SSG）。沒有後端，轉換目標是點擊 LINE 預約。

## 共用決策（自動匯入）

@./docs/DECISIONS.md

## 開始任何任務前

1. 上方的 DECISIONS 已載入，**與 SPEC 衝突時以 DECISIONS 為準**。
2. 閱讀 `docs/tasks/<你被指派的任務>.md`。
3. 需要時閱讀 `md/日系裸粉舞蹈工作室官網 Web SPEC v1.0.md` 的相關章節。
4. **動手改檔案前，先列出「將新增 / 修改的檔案清單」和做法摘要**，再開始修改。

## 你在這個專案的角色

Gemini 負責**視覺呈現與內容**：視覺 section 元件（Hero、Classes、Pricing、Monthly Plan、Booking Steps、Contact CTA、Footer）、文案檢視建議、照片 brief 與暫用圖片、以截圖做視覺 QA。

FAQ 答案由業主後續提供，**不要撰寫 FAQ 答案**。

工程骨架、tokens、互動元件（Header、Accordion、MobileBookingBar）、動畫 plugin、SEO、測試由 Codex 負責，**不要改那些檔案**。擁有權表見 DECISIONS D2。

## 視覺方向（SPEC §3、§35、§36 摘要）

**要**：Japanese Minimal × Boutique Ballet Studio × Editorial。安靜、柔和、成熟、專業。
視覺重點來自 **字體排版、攝影、留白、間距、編輯式版面**。

**不要**：少女粉、可愛風、韓系網美、健身房感、兒童芭蕾教室、模板感；
漸層、高彩度、明顯陰影、卡片堆疊過多、24px 以上圓角、emoji、彩色 icon、花俏動畫。

自我檢查：做完一個 section，問自己「這像一本日本生活風格雜誌的內頁，還是像 SaaS landing page？」若是後者，拿掉裝飾、加大留白。

## 寫程式的規則

- Vue SFC `<script setup lang="ts">`；使用 C1 已定義好的 props 型別（`app/data/types.ts`），不要改型別。
- 樣式 `<style scoped>`，**只用 `tokens.css` 的 CSS 變數**：不寫 hex、不寫任意 px 間距。缺 token 時列入「跨界需求」。
- mobile-first，媒體查詢只用 `min-width: 640px / 1024px / 1440px`。
- 共用元件直接用：`<BaseButton>`、`<SectionHeading>`；不要自己重做按鈕或標題。
- 文案從 `app/data/*.ts` 讀取，元件內不硬寫文案；SPEC 文案**逐字使用**，不潤飾。
- 捲動動畫只加 `data-reveal` 屬性（DECISIONS D8），不要自己寫 IntersectionObserver 或引入動畫庫。
- 圖片用 `<NuxtImg>`，遵守 DECISIONS D9。
- 不新增 npm 依賴、不改 `nuxt.config.ts`、`package.json`、`tokens.css`、`base.css`。
- 保持改動範圍小；不要順手重構或重新格式化不相關的檔案。

## 指令

```bash
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run generate
npm run shots        # 各斷點截圖到 .shots/（C3 完成後可用）
```

截圖可用 `@.shots/xxx.png` 讀進對話中檢視。

**不要安裝或升級任何套件。** 本機全域 Node 為 20.11，專案靠 devDependency 使用 Node 22。若 worktree 還沒有 `node_modules`，只能用這個指令安裝：
`npx -y -p node@22.23.2 -p npm@11 -c "npm install"`（不要直接 `npm install`）。

## 禁止

- 改 Codex 擁有的檔案、`docs/DECISIONS.md`、`docs/tasks/`、`md/`。
- 發明營業規則（價格、請假、補課、場租、團課配對方式）。
- `git push`、merge 或 rebase main。

## 完成定義

1. 任務卡上的驗收項目逐條達成。
2. `npm run lint && npm run typecheck && npm run generate` 通過（`npm run test` 若存在也需通過）。
3. 在 375px、768px、1280px 寬度下自行檢視過畫面。
4. 在任務分支上 commit（Conventional Commits）。
5. 依任務卡「回報格式」回覆。
