# Grok每日報告

台股個人儀表板（React + Vite）。深色、繁中、**紅漲綠跌**。

- 線上：Vercel 部署 `main`
- 持股與交易：Google Sheet `14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w`

## 設計過程包（優化請從這裡開始）

| 文件 | 內容 |
|---|---|
| [docs/DESIGN.md](docs/DESIGN.md) | 定位、IA、色票、字級、元件、資料來源 |
| [docs/PROCESS.md](docs/PROCESS.md) | 怎麼做的、踩過的坑 |
| [docs/OPTIMIZATION.md](docs/OPTIMIZATION.md) | 下一步優化清單 |

## 本機

```bash
npm install
npm run dev
```

寫入交易的 Apps Script：`apps-script/Code.gs`。前端 URL 在 `src/config.js`。
