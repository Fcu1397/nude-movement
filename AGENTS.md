# AGENTS.md

> 給 OpenAI Codex 的專案指引。Codex 啟動時會自動讀取本檔。

## 專案

日系裸粉風格的成人舞蹈工作室單頁官網（Nuxt 4 SSG）。沒有後端、沒有資料庫，轉換目標是點擊 LINE 預約。

## 開始任何任務前，依序閱讀

1. `docs/DECISIONS.md` — 技術決策、tokens、檔案擁有權（**與 SPEC 衝突時以此為準**）
2. `docs/tasks/<你被指派的任務>.md` — 任務範圍、驗收標準、回報格式
3. `md/日系裸粉舞蹈工作室官網 Web SPEC v1.0.md` — 只讀需要的章節

## 你在這個專案的角色

Codex 負責**工程基礎與行為層**：專案骨架、design tokens、資料層與型別、互動元件（Header、Accordion、MobileBookingBar）、捲動動畫 plugin、SEO、無障礙、測試、效能與 CI。

視覺 section 元件（Hero、Classes、Pricing、Monthly、Booking、ContactCTA、Footer）由 Gemini 負責，**不要改那些檔案**。擁有權表見 `docs/DECISIONS.md` D2。

## 指令

**本機全域 Node 是 20.11，不可升級。** 專案以 devDependency `node@22` 提供 Node 22：
`npm run <script>` 會自動使用專案內的 Node 22；但**安裝依賴必須透過下列包裝指令**，
否則 npm 會在 Node 20 下跳過 native binding（rolldown）導致 build 失敗。

```powershell
# 安裝 / 新增依賴（唯一允許的安裝方式）
npx -y -p node@22.23.2 -p npm@11 -c "npm install"
npx -y -p node@22.23.2 -p npm@11 -c "npm install -D <package>"
```

**不要**直接執行 `npm install`、`npx nuxi init`，也不要使用 pnpm / yarn。一次性 CLI 請包成 `package.json` script 再以 `npm run` 執行。

```bash
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run test         # vitest
npm run test:e2e     # playwright（C3 之後）
npm run generate     # SSG 輸出到 .output/public
npm run shots        # 各斷點截圖到 .shots/（C3 之後）
```

若 sandbox 禁止網路導致安裝失敗，停下來請使用者核准，不要改用其他套件管理器或降版繞過。

## Code style

- Vue SFC 一律 `<script setup lang="ts">`；props 用 `defineProps<T>()` 型別宣告。
- 樣式用 `<style scoped>` + `tokens.css` 中的 CSS 變數；**不寫 hex 色碼、不寫魔術數字間距**。
- mobile-first，媒體查詢只用 `min-width: 640px / 1024px / 1440px`。
- 文案只從 `app/data/*.ts` 讀；元件內不硬寫文案（aria 輔助文字除外）。
- 互動元件遵循 WAI-ARIA Authoring Practices（accordion、disclosure / dialog 模式）。
- 不引入 `docs/DECISIONS.md` D1 以外的依賴；真的需要時在回報中說明理由。
- 命名：元件 PascalCase、composable `useXxx`、資料檔 camelCase export。

## 禁止

- 改 Gemini 擁有的檔案（需要時列入回報的「跨界需求」）。
- 改 `docs/DECISIONS.md`、`docs/tasks/`、`md/`。
- 發明營業規則或文案（價格、請假、補課、場租）。
- `git push`、merge 或 rebase main。
- 為了讓測試通過而刪除或跳過測試。

## 完成定義

1. 任務卡上的驗收項目逐條達成。
2. `npm run lint && npm run typecheck && npm run test && npm run generate` 全數通過。
3. 在任務分支上 commit（Conventional Commits）。
4. 依任務卡「回報格式」回覆。
