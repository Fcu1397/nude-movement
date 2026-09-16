# 部署與上線

## 本機指令

```powershell
# 安裝依賴（全機 Node 是 20.11，一律用這個包裝指令）
npx -y -p node@22.23.2 -p npm@11 -c "npm install"

npm run dev          # 開發：http://localhost:3000
npm run lint
npm run typecheck
npm run test         # vitest（單元／元件）
npm run generate     # 產出 .output/public
npm run preview      # 預覽 generate 的結果
npm run test:e2e     # Playwright + axe（需先 generate）
npm run shots        # 各斷點截圖到 .shots/（需先 generate）
npm run lighthouse   # Lighthouse CI（需先 generate）
```

- 本機 Playwright 走系統的 Microsoft Edge，不必下載 Chromium。要改用 Chromium：`npm run e2e:install` 並設 `PW_CHANNEL=chromium`。
- `npm run lighthouse` 需要 Chrome 或 Edge。若找不到瀏覽器，指定路徑：
  ```powershell
  $env:CHROME_PATH = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
  npm run lighthouse
  ```

## 部署（靜態主機）

輸出是純靜態檔，任何靜態主機都可以。

| 項目 | 值 |
|---|---|
| Build command | `npm run generate` |
| Output directory | `.output/public` |
| Node version | 22 |
| SPA fallback | `200.html` / `404.html` 已一併輸出 |

### Cloudflare Pages
1. 連結 GitHub repo。
2. Build command `npm run generate`，Build output directory `.output/public`。
3. 環境變數 `NODE_VERSION=22`。

### Netlify
`netlify.toml`：

```toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "22"
```

### Vercel
Framework preset 選 Nuxt，Build command 改 `npm run generate`，Output directory `.output/public`。

## 上線前檢查

對應 `docs/DECISIONS.md` 的「業主事項追蹤」。**目前每一項未提供的資料都只需要改 `app/data/site.ts`，不需要動元件。**

| 項目 | 改哪裡 | 填入後會出現什麼 |
|---|---|---|
| B1 品牌名稱 / Logo | `site.brandName` | Header、Footer、SEO title、版權 |
| B2 LINE 連結 | `site.lineUrl` | Header CTA、Hero「預約課程」、Monthly CTA、Contact LINE 按鈕、Footer、**手機底部預約列**（含底部留白） |
| B2 Instagram 連結 | `site.instagramUrl` | Contact 的 Instagram 按鈕、Footer 社群、JSON-LD `sameAs` |
| B3 場租金額 | `site.roomFee`（數字） | Policy「24 小時內取消」自動補上「（NT$xxx）」 |
| B4 FAQ 答案 | `app/data/faq.ts` 各題 `body` | 該題從靜態問題列變成可展開項目 |
| B7 正式照片 | 覆蓋 `public/images/placeholder/` 同名檔案 | Hero 與課程配圖、OG 分享圖 |
| B8 網域 | `site.url` | canonical、`og:url`、JSON-LD `url` |

改完務必重跑：

```powershell
npm run test; npm run generate; npm run test:e2e; npm run lighthouse
```

注意：`tests/pending-data-filled.nuxt.test.ts` 已先驗證「資料填入後」的行為；LINE / IG 填入後，`e2e/site.e2e.ts` 裡「pending owner data」那組測試需要改成正向斷言。

## 目前品質基準（本機實測）

| 頁面 | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `index.html` | 0.95 | 1.00 | 1.00 | 1.00 |
| `200.html` / `404.html` | 0.90 | 1.00 | 0.96 | 0.54 ※ |

※ 錯誤頁刻意加上 `noindex`，SEO 分數因此偏低，`lighthouserc.cjs` 只對 `index.html` 套 SEO 門檻。
