# Grok 每日報告 — 設計規格

後續優化請先讀這份，再改畫面或資料。產品名：**Grok每日報告**。  
Repo：`wjleemike/grok-diary-report`　線上：Vercel 自動部署 `main`。

---

## 1. 產品定位

個人台股儀表板：每日訊號、市場報告、國際／AI 新聞、持股損益、交易寫入 Google Sheet。  
語言：**繁體中文**。市場習慣：**紅漲綠跌**（與歐美綠漲紅跌相反）。

目標裝置：桌機為主、手機可讀。導覽列橫向捲動，新聞用卡片。

---

## 2. 資訊架構

| 導覽 id | 標籤 | 元件 | 資料來源 |
|---|---|---|---|
| `daily` | 每日分析報告 | IndexCards / UsMarkets / LightStats / SummaryCards / HoldingsList | `src/data/mockData.js` |
| `market` | 台股市場報告 | MarketReport | 元件內常數 |
| `global` | 國際財經頭條 | GlobalNews + NewsList | 元件內常數（CNN / Bloomberg / Fox） |
| `ai` | 台股/AI焦點新聞 | TaiwanAINews + NewsList | 元件內常數 |
| `add` | 新增交易紀錄 | AddTrade | 寫入 Apps Script |
| `history` | 交易紀錄 | TradeHistory | Google Sheet `gid=352753194` CSV |
| `pnl` | 持股損益總表 | PortfolioPnL | 元件內常數（ETF／類股分組） |

已移除：`持股狀況`（HoldingsStatus.jsx 仍在 repo，未掛導覽）。

順序固定：分析 → 市場 → 國際 → AI → 新增交易 → 交易紀錄 → **損益表最右**。

---

## 3. 視覺系統

樣式全寫在 [`index.html`](../index.html) 的 `<style>`，沒有獨立 CSS 檔。

### 3.1 Token

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#0b0f14` | 頁面底 |
| `--card` | `#1a2234` | 卡片 |
| `--border` | `#2a3548` | 邊線 |
| `--text` | `#f1f5f9` | 正文 |
| `--muted` | `#94a3b8` | 次要 |
| `--dim` | `#64748b` | 更淡 |
| `--accent` | `#14b8a6` | 導覽／進行中（非漲跌） |
| `--green` | `#22c55e` | **下跌／壞消息／虧損** |
| `--red` / `--reds` | `#ef4444` / `#f87171` | **上漲／好消息／獲利** |
| `--yellow` | `#eab308` | 黃燈（訊號，不是漲跌） |

### 3.2 漲跌與新聞色（台股慣例）

| 語意 | class | 顏色 |
|---|---|---|
| 上漲、獲利、買超、買、好消息 | `.up` / `.good` / `.positive` | 紅 `--reds` |
| 下跌、虧損、賣超、賣、壞消息 | `.down` / `.bad` / `.negative` | 綠 `--green` |
| 中性新聞 | `.neutral` | `--text` |
| 綠燈／黃燈／紅燈 | `.dot.green` 等 | **維持燈號本色，不要對調** |

### 3.3 字級

| 用途 | 桌機 | 手機 |
|---|---|---|
| 頁標題 `.main-title` | 28px | 維持 |
| 區塊 `.mr-section-title` | 18px | 維持 |
| 新聞標題 `.news-title` | 17px / 650 | 16px |
| 新聞英文 `.news-en` | 14px | 14px |
| 表格 `.mr-table` | 13px | 橫向捲動 |
| 註解 `.mr-note` | 12px | 12px |

新聞**不要**用窄表格當主體，用 `.news-list` 卡片。

### 3.4 版面

- 內容寬 `1100px`，左右 `24px`
- 指數 2 欄；美股 4 欄；手機 1～2 欄
- 導覽：圓角 pill、active = teal
- 卡片 `border-radius: 12px`

---

## 4. 元件對照

```
App.jsx                 單頁切 view
TopNav.jsx              讀 navItems
NewsList.jsx            新聞卡片（tone: good|bad|neutral）
GlobalNews.jsx          國際頭條 + 美股解析 + 台股影響
TaiwanAINews.jsx        台股新聞 + AI 進展 + 持股影響
MarketReport.jsx        大盤／法人／技術面
PortfolioPnL.jsx        ETF → 類股分組損益
AddTrade.jsx            樂觀送出，寫 Sheet
TradeHistory.jsx        CSV／gviz 讀交易紀錄
HoldingsStatus.jsx      已下線，勿再掛導覽
```

損益表類股順序：

1. ETF：半導體 ETF → 高息／科技 ETF → 債券 ETF  
2. 個股：半導體 → 電子製造／ODM → 金融 → 航運 → 營建 → 鋼鐵 → 餐飲

---

## 5. 資料與整合

### Google Sheet

- 試算表：`14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w`
- 交易紀錄分頁 gid：`352753194`
- 持股狀況分頁曾誤寫，**禁止**再當交易寫入目標

常數在 [`src/config.js`](../src/config.js)。

### Apps Script（寫入）

- 檔案：[`apps-script/Code.gs`](../apps-script/Code.gs)（v11）
- 目標分頁：`交易紀錄`
- 編號：最後可見列的編號 + 1；A 欄格式必須是 `0`（否則會變成 `1900/8/28`）
- 插入：最後一列可見資料下方（使用者會隱藏列，不能用 `getLastRow()`）
- 股票名稱：代號對照表自動帶入
- 部署後若還寫到「持股狀況」，代表舊 `/exec` URL，需換新部署

### 靜態資料落差（優化重點）

多處日期不一致，改資料時要一起改：

| 區塊 | 目前基準 |
|---|---|
| 每日報告 `reportDate` | 2026-08-17 |
| 損益表計算日 | 2026/08/18 |
| 國際／AI 新聞 | 2026/08/18～19 |
| 台股市場報告 | 2026/08/17 |

持股以試算表為準；**沒有聯發科**。

---

## 6. 設計決策（不要無故推翻）

1. 漲跌與新聞情緒用台股紅綠，燈號維持綠黃紅本意。  
2. 新聞中文下附英文，整卡可點原文。  
3. 交易送出用樂觀 UI（約 2.5s 解鎖），Apps Script 冷啟動很慢。  
4. 損益表只顯示計算日期，不假裝即時報價。  
5. 樣式集中 `index.html`，改色先改 token。

---

## 7. 相關文件

- [PROCESS.md](./PROCESS.md) — 怎麼做、踩過什麼坑  
- [OPTIMIZATION.md](./OPTIMIZATION.md) — 下一步優化清單
