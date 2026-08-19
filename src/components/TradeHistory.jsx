export default function TradeHistory() {
  return (
    <div className="market-report">
      <p className="section-label">PORTFOLIO TRADE LOG</p>
      <h1 className="main-title">交易紀錄</h1>
      <p className="subtitle">來自 Google Sheet 交易明細；正式串接後會自動列出</p>
      <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:20 }}>
        <p className="mr-note" style={{ margin:0 }}>
          目前為預留頁面。可從「新增交易紀錄」送出示範資料，或提供 Sheet「交易明細」公開連結後改為自動讀取。
        </p>
      </div>
    </div>
  );
}
