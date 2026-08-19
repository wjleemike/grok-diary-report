# 後續優化清單

依「先對、再快、再好看」排。改之前對一下 [DESIGN.md](./DESIGN.md)。

## P0 正確性

- [ ] 單一 `asOf` 日期來源，每日報告／市場／新聞／損益不要各寫各的
- [ ] 持股、均價、股數只從試算表來，拿掉重複常數（mockData vs PortfolioPnL）
- [ ] 新聞 `href` 儘量真連結，少用頻道首頁
- [ ] Apps Script `/exec` 健康檢查：`target === '交易紀錄'` 才允許送出

## P1 資料自動化

- [ ] 工作日 15:00 更新：台股/AI 新聞、科技文摘、國際頭條
- [ ] 美股／台股指數改抓最近交易日，不要寫死
- [ ] 損益表現價接試算表或公開報價
- [ ] 新聞 tone（good/bad）用規則或模型標，不要手標

建議：Vercel Cron 或 Grok Automation → 寫 JSON／Sheet → 前端 fetch。

## P2 體驗

- [ ] 樣式從 `index.html` 拆到 `src/index.css`
- [ ] 導覽手機改成「目前頁 + 選單」，避免 7 顆 pill 擠成一條
- [ ] 交易紀錄篩選／分頁（CSV 上千列）
- [ ] AddTrade 顯示「寫入中／已排入背景」狀態，不要只靠 2.5s
- [ ] 損益表小計列加上紅／綠

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
