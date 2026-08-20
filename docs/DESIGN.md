# Grok 每日報告 — 設計規格

後續優化請先讀這份，再改畫面或資料。產品名：**Grok每日報告**。  
Repo：`wjleemike/grok-diary-report`　線上：Vercel 自動部署 `main`。  
規格基準：**2026-08-20**（含即時更新、CNN 10 則重大新聞、繁中翻譯）。

---

## 1. 產品定位

個人台股儀表板：每日訊號、市場報告、國際／AI 新聞、持股損益、交易寫入 Google Sheet。  
語言：**繁體中文**。市場習慣：**紅漲綠跌**（與歐美綠漲紅跌相反）。

目標裝置：桌機為主、手機可讀。導覽列橫向捲動，新聞用卡片。

---

## 2. 資訊架構

| 導覽 id | 標籤 | 元件 | 資料來源 |
|---|---|---|---|
| `daily` | 每日分析報告 | IndexCards / UsMarkets / LightStats / SummaryCards / HoldingsList | 種子 `mockData.js` →「立即更新」覆寫 Yahoo／證交所 MIS |
| `market` | 台股市場報告 | MarketReport | 元件內常數（收盤整理） |
| `global` | 國際財經頭條 | GlobalNews + NewsList | 靜態常數為後備；即時：`/api/update` → CNN 10 則重大＋Bloomberg＋Fox（標題翻繁中） |
| `ai` | 台股/AI焦點新聞 | TaiwanAINews + NewsList | 同上，即時 Google News（台股／AI） |
| `add` | 新增交易紀錄 | AddTrade | 寫入 Apps Script |
| `history` | 交易紀錄 | TradeHistory | Google Sheet `gid=352753194` CSV |
| `pnl` | 持股損益總表 | PortfolioPnL | 持股常數＋即時報價覆寫 |

已移除導覽：`持股狀況`（`HoldingsStatus.jsx` 仍在 repo，未掛導覽）。

順序固定：分析 → 市場 → 國際 → AI → 新增交易 → 交易紀錄 → **損益表最右**。

右上角：**立即更新**（`TopNav` → `MarketContext.refresh` → `POST /api/update`）。

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
App.jsx                 單頁切 view + MarketProvider
TopNav.jsx              navItems + 立即更新
MarketContext.jsx       即時狀態、localStorage 快取、refresh()
applyUpdate.js          把 quotes 套回持股（價、MA、量比）
signal.js               四因子燈號（均線×結構×五日動能×量能）
NewsList.jsx            新聞卡片（tone: good|bad|neutral；可顯示 en）
GlobalNews.jsx          國際頭條 + 美股解析 + 台股影響
TaiwanAINews.jsx        台股新聞 + AI 進展 + 持股影響
MarketReport.jsx        大盤／法人／技術面
HoldingItem.jsx         展開：均線、量能、三大法人近 5 日
PortfolioPnL.jsx        ETF → 類股分組損益
AddTrade.jsx            樂觀送出，寫 Sheet
TradeHistory.jsx        CSV／gviz 讀交易紀錄
HoldingsStatus.jsx      已下線，勿再掛導覽
api/_lib/fetchUpdate.js 伺服器抓價＋新聞＋翻譯
api/update.js           Vercel serverless
```

損益表類股順序：

1. ETF：半導體 ETF → 高息／科技 ETF → 債券 ETF  
2. 個股：半導體 → 電子製造／ODM → 金融 → 航運 → 營建 → 鋼鐵 → 餐飲

---

## 5. 即時資料管線

```
[立即更新]
    → POST /api/update  { items: [{code, market, id}] }
    → fetchUpdate.js
         Yahoo Finance spark/chart（價、MA5/20/60、5日漲跌、量比）
         證交所 MIS（台股即時價）
         Google News RSS（台股、AI、CNN、Bloomberg、Fox）
         CNN：多查詢合併 → 篩重大 → 固定 10 則
         英文標題 MyMemory en→zh-TW，原文進 en
    → MarketContext 套用 quotes / news / 指數
    → localStorage 快取（下次進站先顯示）
```

- 開發：Vite middleware `/api/update`（`vite.config.js`）
- 正式：Vercel `api/update.js`（`maxDuration: 30`）
- 種子資料（`mockData.js`）僅作首次載入／API 失敗後備

### CNN 10 則重大新聞規則

1. 合併三組 Google News（en-US）：油價／伊戰／Fed／關稅／國債／股市；中國／台積／AI／戰爭；business/markets  
2. 去掉生活類（Underscored、Dyson、Crocs、美食、時尚等）  
3. 依關鍵字打分，去重，取前 10  
4. 標題翻繁中，分類 tag（中東／油價、財政、貿易…）

---

## 6. 燈號（不要改回只看損益率）

檔案：[`src/utils/signal.js`](../src/utils/signal.js)

四項條件：

1. 股價 vs MA20（短中期趨勢）  
2. MA20 vs MA60（波段結構）  
3. 近 5 日漲跌（≥+1% 偏多，≤−1% 偏空）  
4. 量比（近1日／近20日均量：≥1.30 放量；<0.80 縮量）

- **綠燈**：偏多 ≥ 3 項，且股價站上 MA20  
- **紅燈**：偏空 ≥ 3 項，且股價低於 MA20  
- **黃燈**：其餘  

燈號語意維持交通燈，**不要**跟漲跌紅綠對調。

---

## 7. 資料與整合

### Google Sheet

- 試算表：`14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w`
- 交易紀錄分頁 gid：`352753194`
- 持股狀況分頁曾誤寫，**禁止**再當交易寫入目標

常數在 [`src/config.js`](../src/config.js)。

### Apps Script（寫入）

- 檔案：[`apps-script/Code.gs`](../apps-script/Code.gs)
- 目標分頁：`交易紀錄`
- 編號：最後可見列的編號 + 1；A 欄格式必須是 `0`（否則會變成 `1900/8/28`）
- 插入：最後一列可見資料下方（使用者會隱藏列，不能用 `getLastRow()`）
- 股票名稱：代號對照表自動帶入

### 靜態 vs 即時

| 區塊 | 種子／後備 | 即時（立即更新） |
|---|---|---|
| 持股價、MA、量比 | mockData | Yahoo + MIS |
| 加權／櫃買 | mockData | MIS |
| 美股指數 | mockData | Yahoo |
| CNN | GlobalNews 內 10 則常數 | 10 則重大＋繁中 |
| Bloomberg / Fox / AI / 台股新聞 | 元件常數 | Google News RSS＋翻譯 |
| 台股市場報告長文 | MarketReport 常數 | 尚未自動 |

持股以試算表為準；**沒有聯發科**。

---

## 8. 設計決策（不要無故推翻）

1. 漲跌與新聞情緒用台股紅綠，燈號維持綠黃紅本意。  
2. 新聞中文下附英文原文（`en`），整卡可點原文。  
3. 國際頭條**必須繁體中文**；英文來源先翻譯再顯示。  
4. CNN 固定 **10 條重大**財經／地緣，不要生活雜訊。  
5. 交易送出用樂觀 UI（約 2.5s 解鎖），Apps Script 冷啟動很慢。  
6. 燈號用均線×動能×量能，不能只看未實現損益率。  
7. 樣式集中 `index.html`，改色先改 token。

---

## 9. 相關文件

- [PROCESS.md](./PROCESS.md) — 怎麼做、踩過什麼坑  
- [OPTIMIZATION.md](./OPTIMIZATION.md) — 下一步優化清單  
- [CHANGELOG.md](./CHANGELOG.md) — 設計迭代年表
