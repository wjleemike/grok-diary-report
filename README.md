# Grok每日報告

台股個人儀表板（React + Vite）。深色、繁中、**紅漲綠跌**。

- 線上：Vercel 部署 `main`
- 持股與交易：Google Sheet `14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w`

## 設計過程包（優化請從這裡開始）

下載：`grok-diary-report-design-pack.zip`（含規格、過程、原始碼快照）。

| 文件 | 內容 |
|---|---|
| [docs/DESIGN.md](docs/DESIGN.md) | 定位、IA、色票、燈號、即時資料管線 |
| [docs/PROCESS.md](docs/PROCESS.md) | 怎麼做的、踩過的坑 |
| [docs/OPTIMIZATION.md](docs/OPTIMIZATION.md) | 下一步優化清單 |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | 設計迭代年表 |

## 本機

```bash
npm install
npm run dev
```

寫入交易的 Apps Script：`apps-script/Code.gs`。前端 URL 在 `src/config.js`。

右上角「立即更新」會呼叫 `/api/update`（開發走 Vite middleware，正式走 Vercel function）。
