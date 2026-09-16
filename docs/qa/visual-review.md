# Visual Review — 2026-09-16

檢視對象：`npm run shots` 於 375 / 768 / 1280 / 1440 產出的 41 張截圖（`.shots/`）。
判斷標準：SPEC §3、§35、§36 與 `docs/DECISIONS.md`。

## 總評

整體方向符合 SPEC §36：安靜、柔和、成熟，視覺重量來自字體、留白與細線，沒有漸層、陰影或彩色 icon。
頁面節奏（ivory → beige → ivory → beige → ivory → beige）讓 Classes 與 Monthly Plan 自然成為視覺重點，Monthly Plan 的收據式卡片是全頁最吸睛的元素，符合它作為主要轉換區的定位。
目前最大的限制是**暫用圖片幾乎是空白色塊**，Hero 與 Classes 的畫面重量明顯不足；正式照片到位後才能真正判斷成品。
價格卡把「單堂」與「月 4 堂優惠」並列，優惠價以 rose-deep 大字呈現，不會讓人誤以為單堂價已作廢。

## 問題清單

| ID | 等級 | 斷點 | Section | 問題 | 擁有者 | 修正 | 狀態 |
|----|------|------|---------|------|--------|------|------|
| V01 | P1 | all | Booking | 步驟數字用 `--color-nude`，對比僅 1.6，違反 DECISIONS D3「nude 不可當文字色」，axe 判定 serious | Codex | 改用 `--color-rose-deep`（大字 4.64） | 已修正 |
| V02 | P1 | all | Pricing / Booking | Cormorant 預設 old-style 數字，`NT$1,400`、`01` 與內文的 lining 數字並列時高低不一致 | Gemini | 價格與步驟數字加 `font-variant-numeric: lining-nums` | 已修正 |
| V03 | P1 | all | Header | 導覽第一項為 `Top`，SPEC §7 的 IA 寫的是 `Home` | Codex | `site.navigation` 改為 `Home` | 已修正 |
| V04 | P1 | all | 全站 | Nuxt 內建錯誤頁為深色主題，色彩對比不足（#64748b on #020420） | Codex | 新增 `app/error.vue`，改用品牌色票 | 已修正 |
| V05 | P2 | all | 工具 | 截圖工具用 `scrollIntoViewIfNeeded`，區塊標題被 sticky header 蓋住，會誤導視覺審查 | Codex | 截圖前扣掉 header 高度 | 已修正 |
| V06 | P2 | all | FAQ | 其他每個 section 都是「英文 eyebrow + 中文標題」，只有 FAQ 是單獨一個英文 `FAQ`，層級感不一致 | 業主 | SPEC §18 未提供中文標題，建議補「常見問題」；未確認前維持現狀 | 待業主確認 |
| V07 | P2 | all | Hero / Classes | 暫用圖幾乎是空白色塊，Hero 右側與 Classes 版面重量不足 | 業主 | 需正式照片（DECISIONS B7），程式面不需改動 | 待素材 |
| V08 | P2 | 1280+ | Classes | 課程圖在桌機約 560×747px，體積偏大，若正式照片主體偏小會顯得空 | Gemini | 待正式照片到位後再評估是否加 `max-height` | 觀察中 |

## 各斷點檢查

| 檢查項目 | 375 | 768 | 1280 | 1440 |
|---|---|---|---|---|
| 無水平捲軸、文字不貼邊 | ✅ | ✅ | ✅ | ✅ |
| 首屏可見 H1、中文 lead、CTA | ✅ | ✅ | ✅ | ✅ |
| Section 間距一致、背景交替正確 | ✅ | ✅ | ✅ | ✅ |
| 同類圖片比例一致（Hero 4:5、Class 3:4） | ✅ | ✅ | ✅ | ✅ |
| 字體層級清楚（英文 serif / 中文 serif / 中文 sans） | ✅ | ✅ | ✅ | ✅ |
| 中文標題無孤字 | ✅ | ✅ | ✅ | ✅ |
| 行動選單開啟狀態正常 | ✅ | — | — | — |
| 價格卡優惠價一眼可辨 | ✅ | ✅ | ✅ | ✅ |

## 目前資料狀態下的呈現

LINE / Instagram 尚未提供，因此 Hero 只有「查看課程」一個按鈕、Monthly Plan 沒有 CTA、Contact 只有標題與說明、Footer 沒有社群列、手機沒有底部預約列。
逐一檢視後**沒有出現空洞或殘留的空白高度**，Contact 區塊在沒有按鈕時仍是完整的收尾區塊。
FAQ 六題目前是靜態問題列（無展開圖示），視覺上刻意且一致；答案填入後會自動變成可展開項目。
