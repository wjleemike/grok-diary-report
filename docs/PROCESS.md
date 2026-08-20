# 設計與實作過程

給後續優化用的決策日誌。涵蓋 2026-08 中旬～2026-08-20。

## 階段

### 1. 視覺還原（8 月中）
使用者提供「Claude每日報告」截圖，要求做同款深色儀表板。  
先靜態還原，再 React + Vite 重構，產品名改 **Grok每日報告**，專案 `wjleemike/grok-diary-report`，部署 Vercel。

### 2. 持股對齊試算表
Sheet：`https://docs.google.com/spreadsheets/d/14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w`  
多次用截圖校正損益／持股。原則：**以試算表為準**；確認不含聯發科。  
日期曾誤用未收盤日，改回正確收盤日。

### 3. 新聞頁
- 國際頭條：CNN / Fox / Bloomberg 各約 10 則，表格 → 卡片  
- 每則可開原文、標日期、中文下附英文  
- 台股/AI：熱點日報格式（發生什麼／為何重要／持股影響）  
- 8/20 前內容多為手動常數；之後接即時 RSS

### 4. 交易寫入 Google Sheet（最常出錯）

| 問題 | 原因 | 解法 |
|---|---|---|
| 寫進「持股狀況」 | 舊部署／預設分頁 | `SHEET_NAME = '交易紀錄'` + 新 `/exec` |
| 寫到表尾隱藏列（列 1018） | `appendRow` / `getLastRow` | 掃可見資料列再插入 |
| 編號變成 `1900/8/28` | 241 被當 Excel 日期序號 | A 欄 `setNumberFormat('0')` + `fixTradeIds` |
| 編號不是最後 +1 | 掃到日期或空列 | `scanCursor_` 看 D 欄代號 |
| 股票名稱空白 | 只傳代號 | 前後端 `stockMap` |
| 送出要等 100 秒+ | Apps Script 冷啟動 | 樂觀 UI 2.5s 解鎖 |
| 成功但列號 undefined | 回傳欄位不一致 | 解析 `row` / `id` |

寫入 URL 在 `src/config.js`。換部署一定要改這個檔。

### 5. 導覽演進
新增交易 → 交易紀錄放其右側 → 損益／持股狀況移最右 → **拿掉持股狀況**。  
損益表加計算日期，並依 ETF／類股分組。

### 6. 顏色
全站改台股慣例：紅漲綠跌。  
新聞：好消息紅、壞消息綠；字級加大、卡片化。

### 7. 個股展開與燈號（8/19–8/20）
使用者路徑：

1. 展開要看到均線分析；曾出現「尚無均線資料」→ 全部持股補 Yahoo MA5/20/60  
2. 中信關鍵半導體 ETF 均線不正確 → 全數改真實計算  
3. 燈號不能只看未實現損益率 → 改「損益 × 均線位置」  
4. 再改成類似「股價站上 20 日均線」＋量能 → **四因子**（`signal.js`）  
5. 展開要三大法人近 5 日買賣超（TWSE / TPEx）

### 8. 立即更新（8/20，曾否決後又要求加回）
早期曾說不要「立即更新」；8/20 明確要求即時股價與新聞。

實作：

- `POST /api/update`（Vercel + Vite middleware 共用 `fetchUpdate.js`）  
- Yahoo spark 10 檔一批 + MIS 一次抓價  
- 結果進 `MarketContext` + `localStorage`  
- 量比 spark 常為 0 → 套用時保留舊 `volRatio`  
- 加權指數不要四捨五入成整數（44933.74 不要變 44934）

### 9. 國際頭條繁中（8/20）
靜態陣列已是中文，但 Google News／CNN RSS 常回英文。

- `isMostlyEnglish` + MyMemory `en|zh-TW`  
- 原文放 `en` 欄  
- **坑：** 翻譯只在本地，未推 GitHub → 正式站 CNN 仍英文。必須推 `api/_lib/fetchUpdate.js` 才會進 Vercel。

### 10. CNN 固定 10 則重大新聞（8/20 晚）
舊查詢 `site:cnn.com (business OR markets OR economy)` 只拿到 5 條生活新聞（Crocs、Dyson、豪宅）。  
CNN 官方 RSS 過期。改為多組 Google News（en-US）合併、過濾生活類、打分去重、取 10、再翻譯。

## 使用者明確否決／堅持

- 不要聯發科  
- 不要把交易寫進持股狀況  
- 不要歐美綠漲紅跌  
- 燈號不要只看損益率  
- 國際頭條每則都要繁體中文  
- CNN 要 10 條**重大**新聞（不要生活雜訊）  
- 「立即更新」：早期否決，8/20 **加回且要真的抓價＋新聞**

## 技術踩坑

| 坑 | 處理 |
|---|---|
| Vite plugin-react 大版本與 Vite 8 不合 | 對齊本機已裝版本 |
| GitHub 未含翻譯函式，Vercel 仍英文 | 以 `api/_lib/fetchUpdate.js` 為準推 main |
| Fox RSS 空 | Google News 無結果時改 Fox publisher RSS |
| CNN 官方 RSS 停更 | 改 Google News 多查詢 |
| parseRss 的 `tag` 常是「CNN」字串 | 重大新聞改用標題關鍵字分類 |
| spark volume = 0 | `q.volRatio ?? h.volRatio` |

## 自動化現況（2026-08-20）

已接：按「立即更新」抓價、均線、量能、指數、國際／AI／台股新聞（CNN 10 則重大＋繁中）。  
未接：工作日 15:00 排程自動寫入；市場報告長文仍手動。
