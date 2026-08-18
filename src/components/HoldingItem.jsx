function formatNumber(num) { return num.toLocaleString('en-US'); }
function formatPrice(price) { return price % 1 === 0 ? price.toString() : price.toFixed(2); }
export default function HoldingItem({ holding }) {
  const isPositive = holding.changePct >= 0;
  const signalLabel = { green: '綠燈', yellow: '黃燈', red: '紅燈' }[holding.signal];
  return (
    <div className="holding-item" data-signal={holding.signal}>
      <div className="holding-left">
        <div className={`holding-bar ${holding.signal}`} />
        <div className="holding-info">
          <div className="name">{holding.name} <span className="tag">{holding.tag}</span></div>
          <div className="meta">{holding.market} • 持有 {formatNumber(holding.shares)} 股<br />市值 {formatNumber(holding.marketValue)}</div>
        </div>
      </div>
      <div className="holding-right">
        <div>
          <div className="holding-price">{formatPrice(holding.price)}</div>
          <div className="holding-change" style={{ color: isPositive ? 'var(--green)' : undefined }}>
            {isPositive ? '+' : ''}{holding.changePct.toFixed(2)}%<br />未實現 {isPositive ? '+' : ''}{formatNumber(holding.dailyPnl)}
          </div>
        </div>
        <span className={`holding-badge ${holding.signal}`}><span className={`dot ${holding.signal}`} />{signalLabel}</span>
        <span className="arrow">›</span>
      </div>
    </div>
  );
}
