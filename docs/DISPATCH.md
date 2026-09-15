# 派工總表

## 分工原則

| Agent | 擅長 | 在本專案負責 |
|---|---|---|
| **Codex** | 精確照規格實作、專案結構、型別、測試、a11y 行為、CI | 骨架 / tokens / 資料層、互動元件、SEO、測試與品質關卡 |
| **Gemini** | 視覺與版面判斷、中文內容、長上下文、看截圖（多模態） | 視覺 section、文案檢視、照片規劃與暫用圖、截圖視覺 QA |

**目前業主資料狀態**（詳見 DECISIONS「業主事項追蹤」）：品牌暫用「Nude Movement」；LINE / IG / 場租金額未提供 → 相關元素隱藏、程式保留；FAQ 只放問題；轉換追蹤 v1 不做。

兩邊用**檔案擁有權**切開（`docs/DECISIONS.md` D2），並以 C1 先定好的 **props 型別、tokens、`data-reveal` 屬性**當契約，所以 C1 之後可以完全平行。

## 任務一覽

| ID | 任務 | Owner | 依賴 | 可平行 |
|---|---|---|---|---|
| [C1](tasks/C1-foundation.md) | 骨架、Tokens、資料層、元件 stub | Codex | — | G2-A |
| [G2](tasks/G2-content-images.md) | 文案建議、照片 brief、業主清單、暫用圖 | Gemini | A：無／B：C1 | 全部 |
| [C2](tasks/C2-interactions.md) | Header、Accordion、底部列、reveal、SEO | Codex | C1 | G1、G2 |
| [G1](tasks/G1-sections.md) | 視覺 sections | Gemini | C1 | C2、G2 |
| [C3](tasks/C3-quality-gate.md) | E2E、axe、Lighthouse、CI、截圖工具 | Codex | C1 C2 G1 | G3 |
| [G3](tasks/G3-visual-qa.md) | 截圖視覺 QA 與修正 | Gemini | C1 C2 G1 + `pnpm shots` | C3 |

```text
時間 →
Phase 0   Codex  ■■ C1 ─────────┐
          Gemini ■■ G2-A（文件） │
Phase 1   Codex                 ├─ ■■■ C2 ──────┐
          Gemini                ├─ ■■■ G1 ──────┤
          Gemini                └─ ■ G2-B       │
Phase 2   Codex                                 ├─ ■■ C3（先做 shots）
          Gemini                                └─ ■■ G3
Phase 3   整合者：合併、跑完整檢查、送業主確認 B1–B9
```

---

## Step 0 — 開工前（整合者做一次）

```bash
# 1. 把 SPEC 與派工文件提交到 main，讓所有分支都看得到
git add md docs AGENTS.md GEMINI.md
git commit -m "docs: add spec, decisions and task cards"

# 2. 平行階段建議開 worktree，兩個 agent 各自一個資料夾
git worktree add ../nude-movement-codex  -b codex/C1-foundation
git worktree add ../nude-movement-gemini -b gemini/G2-content
```

- Codex：在 `../nude-movement-codex` 啟動 `codex`（自動讀取 `AGENTS.md`）
- Gemini：在 `../nude-movement-gemini` 啟動 `gemini`（自動讀取 `GEMINI.md`，用 `/memory show` 確認含 DECISIONS）

---

## 可直接貼上的 Prompts

### ▶ C1（Codex）

```text
請先閱讀 AGENTS.md 與 docs/DECISIONS.md，然後執行 docs/tasks/C1-foundation.md。

- 你目前在分支 codex/C1-foundation。
- 資料層請逐字轉錄 SPEC 文案，不要潤飾；價格請再對照 SPEC §12、§13 檢查一次。
- site.ts 依 DECISIONS D10：品牌 Nude Movement，LINE / IG / url / 場租皆 null，相關元素不渲染但程式保留；FAQ 只有問題。
- 建立 Nuxt 專案時不得刪除或覆蓋 md/、docs/、AGENTS.md、GEMINI.md、README.md。
- 做完跑 pnpm lint && pnpm typecheck && pnpm test && pnpm generate，全數通過後 commit。
- 最後依任務卡的「回報格式」回覆。不要 push 或 merge。
```

### ▶ G2 Part A（Gemini，可與 C1 同時開始）

```text
請執行 docs/tasks/G2-content-images.md 的 Part A（A1–A4），先不要做 Part B。

- 你目前在分支 gemini/G2-content。
- 開始寫之前，先列出你要產出的檔案與每份文件的大綱。
- 不要撰寫 FAQ 答案（業主後續提供），也不要發明任何營業規則。
- 不要修改 md/ 下的 SPEC。
- 完成後 commit，並依任務卡的「回報格式」回覆。
```

### ▶ C2（Codex，C1 合併後）

```text
C1 已合併到 main。請 rebase 到最新 main 後，切到分支 codex/C2-interactions，
閱讀 docs/tasks/C2-interactions.md 並執行。

- Gemini 同時在做 G1（sections 視覺），請嚴格遵守 docs/DECISIONS.md D2 的檔案擁有權，不要改 Gemini 的檔案。
- Accordion 與行動選單請遵循 WAI-ARIA Authoring Practices，並寫單元測試覆蓋鍵盤操作。
- 做完跑完整檢查、commit、依回報格式回覆。
```

### ▶ G1（Gemini，C1 合併後）

```text
C1 已合併到 main。請切到基於最新 main 的分支 gemini/G1-sections，
閱讀 docs/tasks/G1-sections.md 並執行。

- 先讀 app/data/types.ts、app/assets/css/tokens.css、BaseButton.vue、SectionHeading.vue，了解可用的契約。
- 開始修改前，先列出每個 section 的版面構想（desktop / mobile 各一句）與要改的檔案，再動手。
- 只改任務卡「你擁有的檔案」；缺 token 或需要改型別，寫進「跨界需求」並先用現有 token 替代。
- LINE / IG 目前沒有網址、按鈕會隱藏：每個 section 都要在「隱藏」與「暫填測試網址」兩種狀態下檢查版面，測試網址不要 commit。
- 一次完成一個 section，完成後在 375 / 1280 寬度檢查再進行下一個。
- 全部完成後跑 pnpm lint && pnpm typecheck && pnpm generate，commit，依回報格式回覆。
```

### ▶ G2 Part B（Gemini，C1 合併後，可接在 G1 之後同一 session）

```text
請執行 docs/tasks/G2-content-images.md 的 Part B。
- 不要改 faq.ts；hero.ts、classes.ts 只改 image.alt。
- 暫用圖片放 public/images/placeholder/，檔名與尺寸依 DECISIONS D9。
- 完成後跑 pnpm typecheck && pnpm test && pnpm generate，commit，依回報格式回覆。
```

### ▶ C3（Codex，C2 + G1 合併後）

```text
C2 與 G1 已合併到 main。請切到分支 codex/C3-quality，執行 docs/tasks/C3-quality-gate.md。

- 請「先」完成第 1 項 pnpm shots 並 commit，回報一句「shots ready」，Gemini 會以此開始 G3。
- 之後完成 E2E、axe、Lighthouse、CI。
- Lighthouse 未達 90 時請修正；若必須改 Gemini 擁有的檔案，只做最小修改並在回報的「跨界修改」逐條列出。
- 附上 mobile 中位數分數，依回報格式回覆。
```

### ▶ G3（Gemini，shots ready 後）

```text
請切到分支 gemini/G3-visual-qa（基於最新 main，並合入 codex/C3-quality 的 shots commit），
執行 docs/tasks/G3-visual-qa.md。

- 先跑 pnpm shots，再用 @.shots/<檔名>.png 逐張讀取截圖審查。
- 以 SPEC §3、§35、§36 與 docs/DECISIONS.md 為標準，產出 docs/qa/visual-review.md。
- 只修正你擁有檔案中的 P0 / P1；Codex 擁有的問題寫入清單即可。
- 完成後依回報格式回覆。
```

---

## 整合者 checklist（每次合併前）

- [ ] `git diff main --stat`：改動的檔案都在該 agent 的擁有範圍內（D2）
- [ ] 回報中的「跨界需求 / 跨界修改 / 待決事項」已處理或轉成新任務
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm generate` 在合併後的 main 通過
- [ ] 抽查價格與 Policy 文案與 SPEC 一致
- [ ] 合併順序：C1 → C2 → G1（G1 rebase 後合併）→ G2-B → C3 → G3

## 上線前

見 `docs/DECISIONS.md`「業主事項追蹤 B1–B9」與 C3 產出的 `docs/DEPLOY.md`。
