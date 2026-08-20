/**
 * 紅黃綠燈：未實現損益率 + 均線位置 雙重確認
 *
 * 損益偏向： ≥+15% 偏多 / -5%~+15% 中性 / <-5% 偏空
 * 均線偏向： 現價≥MA20 偏多；<MA20 且 <MA60 偏空；其餘中性
 *
 * 綠燈 = 損益偏多 且 均線偏多
 * 紅燈 = 損益偏空 且 均線偏空
 * 黃燈 = 其餘（背離或整理）
 */

export const SIGNAL_RULE = {
  green: '未實現 ≥ +15% 且現價站上 MA20（月線）：損益與均線雙重偏多，可續抱',
  yellow: '損益與均線未同時達標（背離或整理）：以觀望為主，等方向確認',
  red: '未實現 < -5% 且現價低於 MA20 與 MA60：雙重偏空，建議檢視停損或減碼',
};

export const SIGNAL_LABEL = { green: '綠燈', yellow: '黃燈', red: '紅燈' };

export const BIAS_LABEL = { bull: '偏多', side: '中性', bear: '偏空' };

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function computeMaBias(price, ma5, ma20, ma60) {
  const p = num(price);
  const m20 = num(ma20);
  const m60 = num(ma60);
  const m5 = num(ma5);
  if (p == null || m20 == null || m60 == null) {
    return {
      bias: 'side',
      hasData: false,
      above5: false,
      above20: false,
      above60: false,
      p,
      m5,
      m20,
      m60,
    };
  }
  const above5 = m5 == null ? false : p >= m5;
  const above20 = p >= m20;
  const above60 = p >= m60;
  let bias = 'side';
  if (above20) bias = 'bull';
  else if (!above20 && !above60) bias = 'bear';
  return { bias, hasData: true, above5, above20, above60, p, m5, m20, m60 };
}

export function computePnlBias(changePct) {
  const pct = num(changePct);
  if (pct == null) return 'side';
  if (pct >= 15) return 'bull';
  if (pct < -5) return 'bear';
  return 'side';
}

export function computeSignal(holding) {
  const pnlBias = computePnlBias(holding.changePct);
  const ma = computeMaBias(holding.price, holding.ma5, holding.ma20, holding.ma60);

  let signal = 'yellow';
  if (pnlBias === 'bull' && ma.bias === 'bull') signal = 'green';
  else if (pnlBias === 'bear' && ma.bias === 'bear') signal = 'red';

  const pct = num(holding.changePct);
  const pctText =
    pct == null ? '—' : `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;

  let reason;
  if (signal === 'green') {
    reason = `未實現 ${pctText} 且現價站上 MA20，損益與均線雙重偏多，可續抱。`;
  } else if (signal === 'red') {
    reason = `未實現 ${pctText} 且現價低於 MA20／MA60，雙重偏空，建議檢視停損或減碼。`;
  } else if (pnlBias === 'bull' && ma.bias === 'bear') {
    reason = `未實現 ${pctText} 偏多，但現價跌破 MA20 與 MA60，損益與均線背離，改以觀望為主。`;
  } else if (pnlBias === 'bull' && ma.bias === 'side') {
    reason = `未實現 ${pctText} 已過綠燈門檻，但尚未站穩月線（MA20），先觀望等待均線確認。`;
  } else if (pnlBias === 'bear' && ma.bias !== 'bear') {
    reason = `未實現 ${pctText} 偏空，但均線尚未全面走空，暫列黃燈觀察，避免過早停損。`;
  } else if (ma.bias === 'bear') {
    reason = `未實現 ${pctText} 落在整理區，且現價低於月季線，均線偏弱，以觀望為主。`;
  } else {
    reason = `未實現 ${pctText} 落在 -5%～+15% 整理區；均線${BIAS_LABEL[ma.bias]}，以觀望為主。`;
  }

  return { signal, reason, pnlBias, maBias: ma.bias, ma };
}

export function enrichHolding(holding) {
  const s = computeSignal(holding);
  return {
    ...holding,
    signal: s.signal,
    reason: s.reason,
    pnlBias: s.pnlBias,
    maBias: s.maBias,
  };
}

export function countSignals(list) {
  const counts = { green: 0, yellow: 0, red: 0 };
  for (const h of list) counts[h.signal] = (counts[h.signal] || 0) + 1;
  return [
    { id: 'green', count: counts.green, label: '綠燈檔數', color: 'green' },
    { id: 'yellow', count: counts.yellow, label: '黃燈檔數', color: 'yellow' },
    { id: 'red', count: counts.red, label: '紅燈檔數', color: 'red' },
  ];
}
