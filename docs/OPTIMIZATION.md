# 後續優化清單

依「先對、再快、再好看」排。改之前對一下 [DESIGN.md](./DESIGN.md)。  
狀態基準：2026-08-20。

## 已完成（勿重做）

- [x] 美股／台股指數可即時抓（Yahoo + MIS）
- [x] 持股現價、MA5/20/60、五日漲跌、量比（Yahoo spark/chart）
- [x] 燈號＝均線 × 結構 × 五日動能 × 量能（非純損益率）
- [x] 展開三大法人近 5 日
- [x] 立即更新按鈕（價＋新聞）
- [x] 國際／AI 英文標題翻繁中，原文進 `en`
- [x] CNN 固定 10 則重大新聞（過濾生活類）
- [x] 新聞卡片可開原文

## P0 正確性

- [ ] 單一 `asOf` 日期來源，每日報告／市場長文／損益不要各寫各的
- [ ] 持股、均價、股數只從試算表來，拿掉重複常數（mockData vs PortfolioPnL）
- [ ] Apps Script `/exec` 健康檢查：`target === '交易紀錄'` 才允許送出
- [ ] 翻譯備援（MyMemory 失敗時的第二來源），避免少數標題留英文
- [ ] Yahoo spark 量能為 0 時改走 chart 補量比

## P1 資料自動化

- [ ] 工作日 15:00 自動更新（Vercel Cron 或 Grok Automation）
- [ ] 台股市場報告長文改半自動（不要整篇手貼）
- [ ] 損益表均價／股數接試算表
- [ ] Bloomberg 查詢收斂到市場新聞（少基金廣告標題）

## P2 體驗

- [ ] 樣式從 `index.html` 拆到 `src/index.css`
- [ ] 導覽手機改成「目前頁 + 選單」，避免 7 顆 pill 擠成一條
- [ ] 交易紀錄篩選／分頁（CSV 上千列）
- [ ] AddTrade 顯示「寫入中／已排入背景」，不要只靠 2.5s
- [ ] 損益表小計列加上紅／綠
- [ ] CNN 區塊標「10 則重大」已做；可加更新時間戳在新聞區

## P3 結構

- [ ] `src/data/news/`、`src/data/market/` 與畫面分離
- [ ] 刪或封存 `HoldingsStatus.jsx`
- [ ] Code.gs 與前端 `stockMap.js` 共用一份對照
- [ ] README 寫部署、換 Script URL、`fixTradeIds` 步驟

## 改色／改字時

1. 只動 `index.html` token 與 `.up/.down/.good/.bad`  
2. 不要改燈號綠黃紅  
3. 新聞字不要小於 16px（手機）  
4. 驗：上漲紅、下跌綠、好消息紅、壞消息綠  
5. 國際頭條必須繁中；CNN 必須 10 條重大
