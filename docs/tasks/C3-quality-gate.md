# C3 · Quality Gate（E2E、A11y、Lighthouse、CI、截圖工具）

| | |
|---|---|
| Owner | **Codex** |
| Branch | `codex/C3-quality` |
| 依賴 | C1、C2、G1 已合併（G2 可未完成） |
| 可平行 | G3（G3 需要本任務的 `pnpm shots`，建議先完成第 1 項再通知 G3） |

## 目標

用自動化把 SPEC §28（Accessibility）與 §31（Lighthouse ≥ 90 ×4）變成可重複驗證的關卡，並提供 Gemini 做視覺 QA 用的截圖工具。

## 範圍

### 1. 截圖工具（優先完成）
- `scripts/shots.ts` + `pnpm shots`：對 `pnpm generate` 產物起 preview server，以 Playwright 輸出 full-page 截圖到 `.shots/`：
  - 寬度 375、768、1280、1440
  - 檔名 `{width}-full.png`，另外每個 section 各一張 `{width}-{sectionId}.png`
  - 375 寬額外一張「行動選單開啟」`375-menu-open.png`
- 截圖前等待字體載入並停用動畫（`reducedMotion: 'reduce'`）。

### 2. E2E（Playwright）
- 錨點導覽：點 header 各連結後對應 section 在視窗內且未被 header 遮住。
- 行動選單：開啟、Esc 關閉、focus 回到按鈕。
- Accordion：鍵盤操作與 aria 狀態。
- 目前資料（`lineUrl` / `instagramUrl` 為 null）：頁面中不存在 LINE / IG 連結與 MobileBookingBar。
- 外部連結存在時（以 `NUXT_PUBLIC_TEST_LINE_URL` 之類的測試用 env 或 fixture 產生第二份 build，擇一實作並說明）：LINE / IG 連結有 `target="_blank"` 與 `rel` 含 `noopener`；375px 捲到底 Footer 最後元素不與 MobileBookingBar 重疊。
- FAQ 空答案項目不是 button、無法展開。

### 3. A11y
- `@axe-core/playwright` 掃描 375 與 1280：**serious / critical 違規 = 0**。
- 檢查所有 `<img>` 有 alt、heading 階層不跳級（h1 僅一個）。

### 4. Lighthouse
- `lighthouserc.cjs`：`staticDistDir: .output/public`，mobile 預設設定，跑 3 次取中位數。
- assertions：performance / accessibility / best-practices / seo 皆 `>= 0.9`。
- 未達標時進行修正，常見方向：
  - CJK 字體：確認只載入 D4 字重、`font-display: swap`、非首屏字重不 preload
  - Hero 圖：preload、`fetchpriority`、正確 `sizes`
  - CLS：reveal 不影響版面、圖片有寬高比
  - 未使用的 JS

### 5. CI
- `.github/workflows/ci.yml`（push / PR）：install → lint → typecheck → test → generate → e2e → lhci。
- 快取 pnpm store 與 Playwright browsers。

### 6. 文件
- `docs/DEPLOY.md`：靜態部署步驟（Cloudflare Pages / Netlify / Vercel 任一，指令與輸出目錄），上線前 checklist（對應 DECISIONS 的 B1–B9），並寫明「業主資料到位時要改 `site.ts` 哪些欄位、改完會自動出現哪些元素」。

## 不做

- 視覺調整（G3）。
- 若效能 / a11y 阻斷問題**必須**改 Gemini 擁有的檔案：只做最小修正，並在回報的「跨界修改」逐條列出（檔案、原因、diff 摘要）。

## 驗收

- [ ] `pnpm shots` 產出所有指定截圖
- [ ] `pnpm test:e2e` 全數通過
- [ ] axe serious / critical = 0（375、1280）
- [ ] Lighthouse 四項 ≥ 90（附中位數分數）
- [ ] CI workflow 在本地以 `act` 或邏輯審查確認步驟完整
- [ ] `docs/DEPLOY.md` 完成

## 回報格式

```md
## C3 回報
- 分支 / commit：
- 驗收清單：
- Lighthouse 分數（mobile 中位數）：Perf / A11y / BP / SEO
- axe 結果：
- 為達標所做的修正：
- 跨界修改：（檔案 / 原因 / 摘要）
- 剩餘風險：
```
