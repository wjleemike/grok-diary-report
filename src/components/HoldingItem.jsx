import { useState } from 'react';

function formatNumber(num) {
  if (num === null || num === undefined) return '\u2014';
  return Number(num).toLocaleString('en-US');
}
function formatPrice(price) {
  if (price === null || price === undefined) return '\u2014';
  return price % 1 === 0 ? price.toString() : Number(price).toFixed(2);
}

const SIGNAL_RULE = {
  green: '\u672a\u5be6\u73fe\u640d\u76ca\u7387 \u2265 +15%\uff1a\u8da8\u52e2\u504f\u591a\uff0c\u53ef\u6301\u7e8c\u6301\u6709\u6216\u5206\u6279\u52a0\u78bc\u89c0\u5bdf',
  yellow: '\u672a\u5be6\u73fe\u640d\u76ca\u7387\u4ecb\u65bc -5%\uff5e+15%\uff1a\u9707\u76ea\u6574\u7406\uff0c\u4ee5\u89c0\u671b\u70ba\u4e3b',
  red: '\u672a\u5be6\u73fe\u640d\u76ca\u7387 < -5%\uff1a\u58d3\u529b\u8f03\u5927\uff0c\u5efa\u8b70\u6aa2\u8996\u505c\u640d\u6216\u6e1b\u78bc',
};

export default function HoldingItem({ holding }) {
  const [open, setOpen] = useState(false);
  const isPositive = holding.changePct >= 0;
  const signalLabel = { green: '\u7da0\u71c8', yellow: '\u9ec3\u71c8', red: '\u7d05\u71c8' }[holding.signal];

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
              {holding.name} <span className="tag">{holding.tag}</span>
            </div>
            <div className="meta">
              {holding.market} \u2022 \u6301\u6709 {formatNumber(holding.shares)} \u80a1
              <br />
              \u5e02\u503c {formatNumber(holding.marketValue)}
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
              \u672a\u5be6\u73fe {isPositive ? '+' : ''}
              {formatNumber(holding.dailyPnl)}
            </div>
          </div>
          <span className={`holding-badge ${holding.signal}`}>
            <span className={`dot ${holding.signal}`} />
            {signalLabel}
          </span>
          <span className={`arrow ${open ? 'open' : ''}`}>\u203a</span>
        </div>
      </div>

      {open && (
        <div className="holding-detail" onClick={(e) => e.stopPropagation()}>
          <div className="detail-row signal-reason">
            <span className="detail-label">\u71c8\u865f\u8aaa\u660e</span>
            <span className="detail-value">
              <strong className={holding.signal}>{signalLabel}</strong>
              {' \u2014 '}
              {holding.reason || SIGNAL_RULE[holding.signal]}
            </span>
          </div>
          <div className="detail-grid">
            <div>
              <span className="detail-label">\u5224\u5b9a\u898f\u5247</span>
              <span className="detail-value muted">{SIGNAL_RULE[holding.signal]}</span>
            </div>
            <div>
              <span className="detail-label">\u7522\u696d\uff0f\u985e\u578b</span>
              <span className="detail-value">{holding.sector || holding.tag}</span>
            </div>
            <div>
              <span className="detail-label">\u6301\u6709\u80a1\u6578</span>
              <span className="detail-value">{formatNumber(holding.shares)}</span>
            </div>
            <div>
              <span className="detail-label">\u73fe\u50f9</span>
              <span className="detail-value">{formatPrice(holding.price)}</span>
            </div>
            <div>
              <span className="detail-label">\u5e02\u503c</span>
              <span className="detail-value">{formatNumber(holding.marketValue)}</span>
            </div>
            <div>
              <span className="detail-label">\u672a\u5be6\u73fe\u640d\u76ca</span>
              <span className={`detail-value ${isPositive ? 'up' : 'down'}`}>
                {isPositive ? '+' : ''}
                {formatNumber(holding.dailyPnl)}\uff08{isPositive ? '+' : ''}
                {holding.changePct.toFixed(2)}%\uff09
              </span>
            </div>
          </div>
          {holding.note && (
            <div className="detail-row">
              <span className="detail-label">\u88dc\u5145\u89c0\u5bdf</span>
              <span className="detail-value">{holding.note}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
