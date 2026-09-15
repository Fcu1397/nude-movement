# G2 · Content Review & Imagery

| | |
|---|---|
| Owner | **Gemini** |
| Branch | `gemini/G2-content` |
| 依賴 | Part A 無依賴（**可立即開始**）；Part B 需 C1 已合併 |
| 可平行 | C1、C2、G1 |

## 目標

在正式素材到位前，準備好文案檢視建議、照片規劃與暫用圖片，讓網站能完整展示，並給業主一份清楚的素材需求。

> FAQ 答案由業主後續提供，**本任務不撰寫 FAQ 答案**（DECISIONS D10）。

---

## Part A — 文件（無需程式骨架，可立即開始）

### A1. `docs/content/copy-review.md`
- **不修改 SPEC 文案**，只列建議：錯字、中英混排空格一致性、標點（全形／半形）、可能讓使用者誤解的句子（例如「單堂價」vs「優惠價」的說法）。
- 每條格式：`位置（SPEC §x）｜原文｜建議｜理由`。
- 品牌名暫用「Nude Movement」（DECISIONS D10），SPEC 中「品牌名稱 / Studio Name」處以此代入檢視。
- 老師具 GYROKINESIS® 認證：檢視 Gyrokinesis 名稱的使用位置，並建議網站中**首次出現**處是否加註 ® 與商標說明（只提建議）。
- 另提供：OG 分享標題與描述建議（≤ 60 / ≤ 110 字元）、Hero 與兩張課程圖的 alt 文字建議。

### A2. `docs/content/photo-brief.md`
給攝影師 / 業主的正式拍攝需求：
- 清單：Hero ×1（4:5）、Ballet ×1（3:4）、Stretch ×1（3:4）、OG ×1（1200×630，需留文字安全區）、備用 ×4–6。
- 每張：構圖、主體（腿部 / 手部線條、芭蕾鞋、木地板、淡色牆面）、光線（自然側光）、服裝色系（ivory、nude、beige，避免黑色與高彩度）、留白位置（Hero 需留文字側空間）。
- 避免清單（SPEC §9.3）。
- 交件規格：長邊 ≥ 2400px、sRGB、JPG 品質 90、檔名對應 DECISIONS D9。
- 後製方向：暖、低飽和、柔和對比。

### A3. `docs/content/image-prompts.md`
為 4 張暫用圖撰寫圖像生成 prompt（英文），風格一致：
- 不出現可辨識的人臉（用局部、背影、失焦）、無文字、無 logo。
- 每張附比例與 negative 要點。
- 若 Gemini CLI 本身無法生成圖片，產出此檔即可，由使用者在 Gemini App / AI Studio 生成。

### A4. `docs/content/owner-checklist.md`
可直接轉傳給業主的素材 / 資料需求清單，對應 DECISIONS「業主事項追蹤」中狀態為「待提供」的項目：
- 每項寫明：需要什麼、格式、提供後網站會出現什麼變化。
- FAQ 部分列出 6 題問題，請業主逐題回覆答案。

---

## Part B — 寫入專案（C1 合併後）

### B1. 暫用圖片
- 放到 `public/images/placeholder/`：`hero.jpg`（1600×2000）、`class-ballet.jpg`、`class-stretch.jpg`（1200×1600）、`og.jpg`（1200×630）。
- 若無法取得生成圖：用 `--color-bg-alt` 系的低對比紋理或純色佔位圖，尺寸比例必須正確。
- 單檔 ≤ 400KB。

### B2. alt 文字
- 更新 `hero.ts`、`classes.ts` 中 `image.alt`（依 A1 的建議）。只改 `alt` 欄位。

## 不做

- 修改 SPEC 原文案或任何營業規則。
- 撰寫 FAQ 答案、修改 `faq.ts`。
- 修改元件、樣式、設定檔。

## 驗收

- [ ] A1–A4 四份文件完成
- [ ] 4 張暫用圖尺寸比例正確、檔名符合 D9
- [ ] B2 只改了 `image.alt`；`pnpm typecheck && pnpm test && pnpm generate` 通過

## 回報格式

```md
## G2 回報
- 分支 / commit：
- 完成項目：
- 文案建議重點：（最值得業主看的 3–5 條）
- 暫用圖片來源：（AI 生成 / 純色佔位）
- 跨界需求：
```
