import { useState } from 'react';

function formatNumber(num) {
  if (num === null || num === undefined) return '—';
  return Number(num).toLocaleString('en-US');
}
function formatPrice(price) {
  if (price === null || price === undefined) return '—';
  return price % 1 === 0 ? price.toString() : Number(price).toFixed(2);
}
function maClass(price, ma) {
  if (ma === null || ma === undefined || price === null || price === undefined) return '';
  return price >= ma ? 'up' : 'down';
}

const SIGNAL_RULE = {
  green: '未實現損益率 ≥ +15%：趨勢偏多，可持續持有或分批加碼觀察',
  yellow: '未實現損益率介於 -5%～+15%：震盪整理，以觀望為主',
  red: '未實現損益率低於 -5%：壓力較大，建議檢視停損或減碼',
};

export default function HoldingItem({ holding }) {
  const [open, setOpen] = useState(false);
  const isPositive = holding.changePct >= 0;
  const signalLabel = { green: '綠燈', yellow: '黃燈', red: '紅燈' }[holding.signal];
  const hasMA = holding.ma5 != null || holding.ma20 != null || holding.ma60 != null;

  return (
    <div
      className={`holding-item ${open ? 'expanded' : ''}`}
      data-signal={holding.signal}
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      <div className="holding-main">
        <div className="holding-left">
          <div className={`holding-bar ${holding.signal}`} />
          <div className="holding-info">
            <div className="name">
              {holding.name}{' '}
              {holding.code ? <span className="tag">{holding.code}</span> : null}
              <span className="tag">{holding.tag}</span>
            </div>
            <div className="meta">
              {holding.market} · 持有 {formatNumber(holding.shares)} 股
              <br />
              市值 {formatNumber(holding.marketValue)}
            </div>
          </div>
        </div>

        <div className="holding-right">
          <div>
            <div className="holding-price">{formatPrice(holding.price)}</div>
            <div className={`holding-change ${isPositive ? 'up' : 'down'}`}>
              {isPositive ? '+' : ''}
              {holding.changePct.toFixed(2)}%
              <br />
              未實現 {isPositive ? '+' : ''}
              {formatNumber(holding.dailyPnl)}
            </div>
          </div>
          <span className={`holding-badge ${holding.signal}`}>
            <span className={`dot ${holding.signal}`} />
            {signalLabel}
          </span>
          <span className={`arrow ${open ? 'open' : ''}`}>›</span>
        </div>
      </div>

      {open && (
        <div className="holding-detail" onClick={(e) => e.stopPropagation()}>
          <div className="detail-row signal-reason">
            <span className="detail-label">燈號說明</span>
            <span className="detail-value">
              <strong className={holding.signal}>{signalLabel}</strong>
              {' — '}
              {holding.reason || SIGNAL_RULE[holding.signal]}
            </span>
          </div>

          {hasMA && (
            <div className="detail-grid" style={{ marginBottom: 12 }}>
              <div>
                <span className="detail-label">MA5（5日）</span>
                <span className={`detail-value ${maClass(holding.price, holding.ma5)}`}>
                  {formatPrice(holding.ma5)}
                  {holding.ma5 != null ? (holding.price >= holding.ma5 ? ' ▲' : ' ▼') : ''}
                </span>
              </div>
              <div>
                <span className="detail-label">MA20（月線）</span>
                <span className={`detail-value ${maClass(holding.price, holding.ma20)}`}>
                  {formatPrice(holding.ma20)}
                  {holding.ma20 != null ? (holding.price >= holding.ma20 ? ' ▲' : ' ▼') : ''}
                </span>
              </div>
              <div>
                <span className="detail-label">MA60（季線）</span>
                <span className={`detail-value ${maClass(holding.price, holding.ma60)}`}>
                  {formatPrice(holding.ma60)}
                  {holding.ma60 != null ? (holding.price >= holding.ma60 ? ' ▲' : ' ▼') : ''}
                </span>
              </div>
            </div>
          )}

          <div className="detail-grid">
            <div>
              <span className="detail-label">判定規則</span>
              <span className="detail-value muted">{SIGNAL_RULE[holding.signal]}</span>
            </div>
            <div>
              <span className="detail-label">產業／類型</span>
              <span className="detail-value">{holding.sector || holding.tag}</span>
            </div>
            <div>
              <span className="detail-label">持有股數</span>
              <span className="detail-value">{formatNumber(holding.shares)}</span>
            </div>
            <div>
              <span className="detail-label">現價</span>
              <span className="detail-value">{formatPrice(holding.price)}</span>
            </div>
            <div>
              <span className="detail-label">市值</span>
              <span className="detail-value">{formatNumber(holding.marketValue)}</span>
            </div>
            <div>
              <span className="detail-label">未實現損益</span>
              <span className={`detail-value ${isPositive ? 'up' : 'down'}`}>
                {isPositive ? '+' : ''}
                {formatNumber(holding.dailyPnl)}（{isPositive ? '+' : ''}
                {holding.changePct.toFixed(2)}%）
              </span>
            </div>
          </div>
          {holding.maAdvice && (
            <div className="detail-row">
              <span className="detail-label">均線分析建議</span>
              <span className="detail-value">{holding.maAdvice}</span>
            </div>
          )}
          {holding.note && (
            <div className="detail-row">
              <span className="detail-label">補充觀察</span>
              <span className="detail-value">{holding.note}</span>
            </div>
          )}
          <p className="detail-value muted" style={{ marginTop: 8, fontSize: 11 }}>
            均線以 Yahoo Finance 近約 4 個月日線收盤價計算（SMA）；▲ 現價≥均線、▼ 現價<均線。非投資建議。
          </p>
        </div>
      )}
    </div>
  );
}
