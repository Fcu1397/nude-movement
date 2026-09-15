# G3 · Visual QA

| | |
|---|---|
| Owner | **Gemini** |
| Branch | `gemini/G3-visual-qa` |
| 依賴 | C1、C2、G1 已合併；C3 的 `pnpm shots` 已可用 |
| 可平行 | C3 其餘項目 |

## 目標

利用 Gemini 的圖像理解能力，以截圖逐斷點審查整站視覺，對照 SPEC 與 DECISIONS 找出問題、分級，並修正自己擁有檔案中的問題。

## 步驟

1. `pnpm shots`，產出 `.shots/` 截圖。
2. 逐張讀取截圖（`@.shots/375-full.png` 等），依下方清單審查。
3. 寫 `docs/qa/visual-review.md`。
4. 修正屬於自己擁有檔案（G1 的元件、`public/images/`）的 P0 / P1 問題。
5. 重跑 `pnpm shots`，把修正前後的差異記錄在 review 文件中。

## 審查清單

### 品牌感（SPEC §3、§35、§36）
- 第一眼感受是否「安靜、柔和、成熟、專業」？是否有任何地方像少女粉、健身房、兒童舞蹈教室、模板網站？
- 裝飾是否過多（多餘卡片、框線、icon）？

### 排版
- 字體層級是否清楚：英文 serif / 中文 serif / 中文 sans 的分工是否一致。
- 中文標題與段落是否有孤字（最後一行只剩 1–2 字）。
- 中文段落行長是否過長（desktop 建議每行 ≤ 34 字）。
- 中英混排的基線與間距是否自然。

### 版面與節奏
- Section 上下間距是否一致（D5）；背景色交替是否符合 G1 定義的節奏。
- 對齊：各 section 左緣是否對齊同一 container。
- 375px：左右 gutter、按鈕寬度、卡片內距是否舒適；首屏是否看得到 CTA。
- 1440px：內容是否過度分散、圖片是否過大。

### 元件
- Pricing：優惠價是否一眼可辨、單堂價是否不會被誤會成「已取消」。
- Monthly Plan：是否足夠突出（它是主要轉換區）。
- 按鈕 hover / focus 狀態（可請 Codex 在 shots 中加入 hover 截圖，或以 dev server 手動檢查）。
- 行動選單開啟狀態（`375-menu-open.png`）。
- LINE / IG 隱藏狀態（目前上線狀態）下：Hero、Monthly Plan、Contact CTA、Footer 是否有空洞或不平衡。
- FAQ 只有問題、沒有答案時，這個區塊看起來是否刻意且完整。
- 若 C3 有提供外部連結顯示狀態的截圖：底部預約列是否遮到內容。

### 圖片
- 比例一致；裁切是否切到主體；色調是否與整體暖色一致。

## `docs/qa/visual-review.md` 格式

```md
# Visual Review — <日期>

## 總評
（3–5 句，整體是否達到 SPEC §36 的方向）

## 問題清單
| ID | 等級 | 斷點 | Section | 問題 | 截圖 | 擁有者 | 建議修正 | 狀態 |
|----|------|------|---------|------|------|--------|----------|------|
| V01 | P1 | 375 | Pricing | ... | 375-pricing.png | Gemini | ... | 已修正 |
```

等級：
- **P0**：破版、內容遮擋、看不到 CTA、嚴重偏離品牌方向
- **P1**：明顯不一致、層級混亂、孤字、間距錯誤
- **P2**：細節打磨

## 不做

- 修改 Codex 擁有的檔案（Header、Accordion、Policy、FAQ、MobileBookingBar、tokens、base.css）→ 問題寫進清單，擁有者填 Codex。
- 改變設計方向或新增 section。

## 驗收

- [ ] `docs/qa/visual-review.md` 完成，涵蓋 375 / 768 / 1280 / 1440
- [ ] Gemini 擁有的 P0 / P1 全部修正並附修正後截圖檔名
- [ ] Codex 擁有的問題清楚列出，可直接轉成任務
- [ ] `pnpm lint && pnpm typecheck && pnpm generate` 通過

## 回報格式

```md
## G3 回報
- 分支 / commit：
- 問題統計：P0 x / P1 x / P2 x（已修 / 未修）
- 需 Codex 處理的問題 ID：
- 需業主決定的視覺問題：（例如照片風格、品牌色微調）
```
