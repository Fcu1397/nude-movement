# 派工總表

## 分工原則

| Agent | 擅長 | 在本專案負責 |
|---|---|---|
| **Codex** | 精確照規格實作、專案結構、型別、測試、a11y 行為、CI | 骨架 / tokens / 資料層、互動元件、SEO、測試與品質關卡 |
| **Gemini** | 視覺與版面判斷、中文內容、長上下文、看截圖（多模態） | 視覺 section、文案檢視、照片規劃與暫用圖、截圖視覺 QA |

**目前業主資料狀態**（詳見 DECISIONS「業主事項追蹤」）：品牌暫用「Nude Movement」；LINE / IG / 場租金額未提供 → 相關元素隱藏、程式保留；FAQ 只放問題；轉換追蹤 v1 不做。

## 執行方式

- **只用一個資料夾**：`D:\project\Web\nude-movement`，全部在 `main` 上進行，不開分支、不用 worktree。
- **依下方順序一次貼一個 prompt**，等 agent 回報完成（檢查全數通過、已 commit）再貼下一個。
- Codex 的 prompt 貼到 VS Code 的 **Codex 擴充套件**；Gemini 的 prompt 貼到 **Gemini Code Assist（agent mode）**。兩者都開同一個資料夾。
- 若回報中有檢查沒通過 → **不要進下一步**，改貼文末的「修正用 prompt」給同一個 agent。
- 環境：全機 Node 20.11 不升級，專案內以 devDependency 使用 Node 22（已實測可行），安裝依賴只能用 `npx -y -p node@22.23.2 -p npm@11 -c "npm install"`。

## 執行順序

| # | ID | Agent | 任務卡 | 內容 | 狀態 |
|---|---|---|---|---|---|
| 0 | G2-A | Gemini | [G2](tasks/G2-content-images.md) | 文案建議、照片 brief、業主清單、圖片 prompt | ✅ 已完成 |
| 1 | C1 | Codex | [C1](tasks/C1-foundation.md) | 骨架、Tokens、資料層、元件 stub | |
| 2 | C2 | Codex | [C2](tasks/C2-interactions.md) | Header、Accordion、底部列、reveal、SEO | |
| 3 | G1 | Gemini | [G1](tasks/G1-sections.md) | 視覺 sections | |
| 4 | G2-B | Gemini | [G2](tasks/G2-content-images.md) | 修正文件、暫用圖、alt | |
| 5 | C3 | Codex | [C3](tasks/C3-quality-gate.md) | 截圖工具、E2E、axe、Lighthouse、CI | |
| 6 | G3 | Gemini | [G3](tasks/G3-visual-qa.md) | 截圖視覺 QA 與修正 | |
| 7 | C4 | Codex | （本檔 prompt） | 修正 G3 列給 Codex 的問題 | |

每一步完成後，你只要確認兩件事：回報裡 **lint / typecheck / test / generate 都通過**，以及 `git log` 有該任務的 commit（例如 `feat(C1): ...`）。

---

## 1 ▶ C1（Codex）

```text
請先閱讀 AGENTS.md 與 docs/DECISIONS.md，然後執行 docs/tasks/C1-foundation.md。

開始前：
- 執行 git status，確認工作目錄乾淨；若不乾淨，停下來回報，不要繼續。
- 全程在 main 上工作，不要建立分支。

注意事項：
- 資料層請逐字轉錄 SPEC 文案，不要潤飾；價格請再對照 SPEC §12、§13 檢查一次。
- site.ts 依 DECISIONS D10：品牌 Nude Movement，LINE / IG / url / 場租皆 null，相關元素不渲染但程式保留；FAQ 只有問題。
- 建立專案時不得刪除或覆蓋 md/、docs/、AGENTS.md、GEMINI.md、README.md。
- 本機全域 Node 是 20.11 且不可升級：請以任務卡中的 package.json baseline 手動建立專案，依賴安裝只能用
  npx -y -p node@22.23.2 -p npm@11 -c "npm install"
  不要直接 npm install、不要 nuxi init、不要降版。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate，全數通過。
- commit 到 main，訊息格式 feat(C1): ...（含 package-lock.json）。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 2 ▶ C2（Codex）

```text
請先閱讀 AGENTS.md 與 docs/DECISIONS.md，然後執行 docs/tasks/C2-interactions.md。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -10 確認有 feat(C1) 的 commit；任一不符就停下來回報。
- 若沒有 node_modules，用 npx -y -p node@22.23.2 -p npm@11 -c "npm install" 安裝。
- 全程在 main 上工作，不要建立分支。

注意事項：
- 嚴格遵守 docs/DECISIONS.md D2 的檔案擁有權：不要修改 Gemini 擁有的 section 元件與 AppFooter（它們目前是 C1 的 stub，之後由 Gemini 實作）。
- Accordion 與行動選單遵循 WAI-ARIA Authoring Practices，並寫單元測試覆蓋鍵盤操作。
- 目前 LINE / IG 為 null：兩種狀態都要測，測試用網址不要 commit 進 site.ts。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate，全數通過。
- commit 到 main，訊息格式 feat(C2): ...。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 3 ▶ G1（Gemini）

```text
請先閱讀 GEMINI.md 與 docs/DECISIONS.md，然後執行 docs/tasks/G1-sections.md。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -10 確認有 feat(C1) 與 feat(C2) 的 commit；任一不符就停下來回報。
- 全程在 main 上工作，不要建立分支。不要安裝或升級任何套件。
- 閱讀 app/data/types.ts、app/assets/css/tokens.css、BaseButton.vue、SectionHeading.vue，了解可用的契約。

進行方式：
- 開始修改前，先列出每個 section 的版面構想（desktop / mobile 各一句）與要改的檔案，再動手。
- 只改任務卡「你擁有的檔案」；缺 token 或需要改型別，寫進回報的「跨界需求」，先用現有 token 替代。
- 一次完成一個 section，完成後在 375 / 1280 寬度檢查，再進行下一個。
- LINE / IG 目前沒有網址、按鈕會隱藏：每個 section 都要在「隱藏」與「暫填測試網址」兩種狀態下檢查版面；檢查完還原 site.ts，測試網址不要 commit。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate，全數通過。
- commit 到 main，訊息格式 feat(G1): ...。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 4 ▶ G2 Part B（Gemini）

```text
請先閱讀 GEMINI.md 與 docs/DECISIONS.md，然後執行 docs/tasks/G2-content-images.md 的 Part B（B0、B1、B2）。Part A 已完成，不用重做。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -10 確認有 feat(G1) 的 commit；任一不符就停下來回報。
- 全程在 main 上工作，不要建立分支。不要安裝或升級任何套件。

注意事項：
- B0：依任務卡的審查意見修正 docs/content/ 下的三份文件。
- B1：暫用圖片放 public/images/placeholder/，檔名與尺寸依 DECISIONS D9；若你無法生成圖片，改用低對比純色 / 紋理佔位圖，並在回報中說明。
- B2：hero.ts、classes.ts 只改 image.alt；不要改 faq.ts。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate，全數通過。
- commit 到 main，訊息格式 feat(G2): ...。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 5 ▶ C3（Codex）

```text
請先閱讀 AGENTS.md 與 docs/DECISIONS.md，然後執行 docs/tasks/C3-quality-gate.md。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -15 確認有 feat(C1)、feat(C2)、feat(G1)、feat(G2) 的 commit；任一不符就停下來回報。
- 全程在 main 上工作，不要建立分支。
- 新增依賴（Playwright、axe、lhci 等）只能用 npx -y -p node@22.23.2 -p npm@11 -c "npm install -D <package>"；Playwright 瀏覽器安裝請包成 npm script 再以 npm run 執行。

注意事項：
- 依任務卡順序，先完成 npm run shots。
- Lighthouse 未達 90 時請修正；若必須改 Gemini 擁有的檔案，只做最小修改，並在回報的「跨界修改」逐條列出。
- 附上 Lighthouse mobile 中位數分數。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate && npm run test:e2e，全數通過。
- commit 到 main，訊息格式 feat(C3): ...。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 6 ▶ G3（Gemini）

```text
請先閱讀 GEMINI.md 與 docs/DECISIONS.md，然後執行 docs/tasks/G3-visual-qa.md。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -15 確認有 feat(C3) 的 commit；任一不符就停下來回報。
- 全程在 main 上工作，不要建立分支。不要安裝或升級任何套件。

進行方式：
- 先執行 npm run shots，再用 @.shots/<檔名>.png 逐張讀取截圖審查。
- 以 SPEC §3、§35、§36 與 docs/DECISIONS.md 為標準，產出 docs/qa/visual-review.md。
- 只修正你擁有檔案中的 P0 / P1；Codex 擁有的問題寫進清單，擁有者欄填 Codex。
- 修正後重跑 npm run shots，確認改善。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate，全數通過。
- commit 到 main，訊息格式 fix(G3): ...。
- 依任務卡的「回報格式」回覆。不要 push。
```

## 7 ▶ C4 修正視覺問題（Codex）

```text
請先閱讀 AGENTS.md 與 docs/DECISIONS.md，然後處理 docs/qa/visual-review.md 中「擁有者 = Codex」的問題。

開始前：
- 執行 git status 確認乾淨，並以 git log --oneline -5 確認有 G3 的 commit；任一不符就停下來回報。
- 全程在 main 上工作，不要建立分支。

進行方式：
- 依等級 P0 → P1 → P2 處理；只改 Codex 擁有的檔案（DECISIONS D2）。
- 每修正一項，把 visual-review.md 中該列的「狀態」改為「已修正（C4）」，這是本任務唯一允許修改的 Gemini 文件。
- 若某項需要改設計決策或 Gemini 的檔案，不要改，在回報中列出。

完成時：
- 執行 npm run lint && npm run typecheck && npm run test && npm run generate && npm run test:e2e，全數通過。
- commit 到 main，訊息格式 fix(C4): ...。
- 回報：已修正的問題 ID、未處理項目與原因、Lighthouse 分數是否仍 ≥ 90。不要 push。
```

---

## 修正用 prompt（任何一步檢查沒過時使用）

貼給**剛剛執行該任務的同一個 agent**，把 `<任務ID>` 換掉：

```text
剛才的 <任務ID> 回報中有檢查未通過或驗收項目未完成。請：
1. 重新執行 npm run lint && npm run typecheck && npm run test && npm run generate，找出失敗原因。
2. 在不違反 docs/DECISIONS.md（含 D2 檔案擁有權）的前提下修正；不要刪除或跳過測試、不要降版套件、不要直接 npm install。
3. 全數通過後 commit 到 main，訊息格式 fix(<任務ID>): ...。
4. 回報：失敗原因、修正內容、目前各項檢查結果。
```

## 上線前

見 `docs/DECISIONS.md`「業主事項追蹤 B1–B9」與 C3 產出的 `docs/DEPLOY.md`。
