import { useState } from 'react';
import { computeSignal, SIGNAL_RULE, SIGNAL_LABEL } from '../utils/signal.js';

function formatNumber(num) {
  if (num === null || num === undefined) return '—';
  return Number(num).toLocaleString('en-US');
}
function formatPrice(price) {
  if (price === null || price === undefined) return '—';
  return price % 1 === 0 ? price.toString() : Number(price).toFixed(2);
}

/**
 * 真實 MA 數值計算
 * 依現價與 MA5 / MA20 / MA60 動態判斷：
 * - 站上 / 低於 各均線
 * - 多頭 / 空頭 / 糾結 排列
 * - 產出對應技術建議
 */
function computeMaAnalysis(price, ma5, ma20, ma60) {
  if (
    price == null ||
    ma5 == null ||
    ma20 == null ||
    ma60 == null ||
    Number.isNaN(Number(price)) ||
    Number.isNaN(Number(ma5)) ||
    Number.isNaN(Number(ma20)) ||
    Number.isNaN(Number(ma60))
  ) {
    return {
      hasData: false,
      above5: false,
      above20: false,
      above60: false,
      arrangement: '—',
      advice: '尚無足夠均線資料，無法計算技術建議。',
      statusText: '資料不足',
    };
  }

  const p = Number(price);
  const m5 = Number(ma5);
  const m20 = Number(ma20);
  const m60 = Number(ma60);

  const above5 = p >= m5;
  const above20 = p >= m20;
  const above60 = p >= m60;

  let arrangement = '均線糾結／震盪';
  if (m5 > m20 && m20 > m60 && above5) {
    arrangement = '多頭排列';
  } else if (m5 < m20 && m20 < m60 && !above5) {
    arrangement = '空頭排列';
  }

  const aboveList = [];
  const belowList = [];
  if (above5) aboveList.push('MA5');
  else belowList.push('MA5');
  if (above20) aboveList.push('MA20');
  else belowList.push('MA20');
  if (above60) aboveList.push('MA60');
  else belowList.push('MA60');

  let statusText = '';
  if (aboveList.length === 3) {
    statusText = `站上 ${aboveList.join(',')}`;
  } else if (belowList.length === 3) {
    statusText = `低於 ${belowList.join(',')}`;
  } else {
    statusText =
      (aboveList.length ? `站上 ${aboveList.join(',')}` : '') +
      (aboveList.length && belowList.length ? '；' : '') +
      (belowList.length ? `低於 ${belowList.join(',')}` : '');
  }

  let advice = `現價 ${formatPrice(p)}：${statusText}。`;

  if (above5 && above20 && above60) {
    if (m5 >= m20 && m20 >= m60) {
      advice +=
        '多頭排列；短均在中均之上，動能偏多；可沿 MA20 移動停利，回測不破續抱。';
    } else {
      advice +=
        '三條均線之上，但均線尚未完全多頭排列；續抱為主，留意均線糾結後方向。';
    }
  } else if (!above5 && !above20 && !above60) {
    advice +=
      '空頭或弱勢；宜等收復 MA20 或出現止跌再評估，否則優先控風險減碼。';
  } else if (above20 && above60 && !above5) {
    advice += '短線弱於 MA5，先觀察能否站回；中期仍站上月線與季線，偏多整理。';
  } else if (above60 && !above20) {
    advice +=
      '尚未站穩月線(MA20)，宜觀望；突破 MA20 帶量再偏多。';
  } else if (above5 && above20 && !above60) {
    advice +=
      '短中期偏強但尚未站上季線；均線糾結或震盪，突破/跌破 MA20 再決定加減碼。';
  } else if (!above5 && above20) {
    advice +=
      '短線弱於 MA5，但站上 MA20；先觀察能否站回 MA5，回測 MA20 不破可續抱。';
  } else {
    advice +=
      '均線糾結或震盪，突破/跌破 MA20 再決定加減碼。';
  }

  return {
    hasData: true,
    above5,
    above20,
    above60,
    arrangement,
    advice,
    statusText,
    m5,
    m20,
    m60,
    p,
  };
}

export default function HoldingItem({ holding }) {
  const [open, setOpen] = useState(false);
  const isPositive = holding.changePct >= 0;
  const judged = computeSignal(holding);
  const signal = judged.signal;
  const signalLabel = SIGNAL_LABEL[signal];

  const ma = computeMaAnalysis(
    holding.price,
    holding.ma5,
    holding.ma20,
    holding.ma60
  );

  return (
    <div
      className={`holding-item ${open ? 'expanded' : ''}`}
      data-signal={signal}
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
          <div className={`holding-bar ${signal}`} />
          <div className="holding-info">
            <div className="name">
              {holding.name} <span className="tag">{holding.tag}</span>
            </div>
            <div className="meta">
              {holding.market} • 持有 {formatNumber(holding.shares)} 股
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
          <span className={`holding-badge ${signal}`}>
            <span className={`dot ${signal}`} />
            {signalLabel}
          </span>
          <span className={`arrow ${open ? 'open' : ''}`}>›</span>
        </div>
      </div>

      {open && (
        <div className="holding-detail" onClick={(e) => e.stopPropagation()}>
          <div className="detail-row signal-reason">
            <span className="detail-label">燈號說明（均線 × 動能 × 量能）</span>
            <span className="detail-value">
              <strong className={signal}>{signalLabel}</strong>
              {' — '}
              {judged.reason}
            </span>
          </div>

          <ul className="factor-list">
            {(judged.factors || []).map((f) => (
              <li key={f.id} className={`factor-item bias-${f.bias}`}>
                <span className="factor-dot">●</span>
                <span className="factor-text">{f.text}</span>
              </li>
            ))}
          </ul>

          <div className="detail-grid">
            <div>
              <span className="detail-label">判定規則</span>
              <span className="detail-value muted">{SIGNAL_RULE[signal]}</span>
            </div>
            <div>
              <span className="detail-label">產業／類型</span>
              <span className="detail-value">{holding.sector || holding.tag}</span>
            </div>
            <div>
              <span className="detail-label">現價</span>
              <span className="detail-value">{formatPrice(holding.price)}</span>
            </div>
            <div>
              <span className="detail-label">未實現損益</span>
              <span className={`detail-value ${isPositive ? 'up' : 'down'}`}>
                {isPositive ? '+' : ''}
                {formatNumber(holding.dailyPnl)}（{isPositive ? '+' : ''}
                {holding.changePct.toFixed(2)}%）
              </span>
            </div>
            <div>
              <span className="detail-label">近 5 日</span>
              <span className="detail-value">
                {holding.chg5d == null
                  ? '—'
                  : `${holding.chg5d >= 0 ? '+' : ''}${Number(holding.chg5d).toFixed(2)}%`}
              </span>
            </div>
            <div>
              <span className="detail-label">量比</span>
              <span className="detail-value">
                {holding.volRatio == null ? '—' : `${Number(holding.volRatio).toFixed(2)} 倍`}
              </span>
            </div>
          </div>

          <div className="ma-section">
            <div className="detail-label" style={{ marginBottom: 8 }}>
              均線分析（真實計算）
            </div>

            {ma.hasData ? (
              <>
                <div className="ma-grid">
                  <div className={`ma-item ${ma.above5 ? 'above' : 'below'}`}>
                    <div className="ma-name">MA5</div>
                    <div className="ma-value">{formatPrice(ma.m5)}</div>
                    <div className="ma-status">
                      {ma.above5 ? '▲ 站上' : '▼ 低於'}
                    </div>
                  </div>
                  <div className={`ma-item ${ma.above20 ? 'above' : 'below'}`}>
                    <div className="ma-name">MA20</div>
                    <div className="ma-value">{formatPrice(ma.m20)}</div>
                    <div className="ma-status">
                      {ma.above20 ? '▲ 站上' : '▼ 低於'}
                    </div>
                  </div>
                  <div className={`ma-item ${ma.above60 ? 'above' : 'below'}`}>
                    <div className="ma-name">MA60</div>
                    <div className="ma-value">{formatPrice(ma.m60)}</div>
                    <div className="ma-status">
                      {ma.above60 ? '▲ 站上' : '▼ 低於'}
                    </div>
                  </div>
                </div>

                <div className="ma-arrangement">
                  <span className="detail-label">排列型態</span>
                  <span
                    className={`ma-arr-badge ${
                      ma.arrangement === '多頭排列'
                        ? 'bull'
                        : ma.arrangement === '空頭排列'
                        ? 'bear'
                        : 'side'
                    }`}
                  >
                    {ma.arrangement}
                  </span>
                </div>

                <div className="detail-row" style={{ marginTop: 10, marginBottom: 0 }}>
                  <span className="detail-label">技術建議（依現價 vs 均線計算）</span>
                  <span className="detail-value ma-advice">{ma.advice}</span>
                </div>
              </>
            ) : (
              <div className="detail-value muted">尚無均線資料</div>
            )}
          </div>

          {holding.note && (
            <div className="detail-row" style={{ marginTop: 12 }}>
              <span className="detail-label">補充觀察</span>
              <span className="detail-value">{holding.note}</span>
            </div>
          )}

          <p className="detail-value muted" style={{ marginTop: 10, fontSize: 11 }}>
            燈號依四項技術條件：股價 vs MA20、MA20 vs MA60、近 5 日漲跌、量比（近 1 日／近 20 日均量）。綠燈需偏多 ≥ 3 且站上月線；紅燈需偏空 ≥ 3 且跌破月線。非投資建議。
          </p>
        </div>
      )}
    </div>
  );
}
