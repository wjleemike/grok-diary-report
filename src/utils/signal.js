/**
 * 紅黃綠燈：均線位置 + 波段結構 + 五日動能 + 量能
 *
 * 四項條件（與展開明細相同）：
 *  1. 股價 vs MA20 → 短中期趨勢
 *  2. MA20 vs MA60 → 波段結構
 *  3. 近 5 日漲跌 → 動能
 *  4. 近期量比（近1日量 / 近20日均量）→ 量能
 *
 * 綠燈：偏多 ≥ 3 項，且股價站上 MA20
 * 紅燈：偏空 ≥ 3 項，且股價低於 MA20
 * 黃燈：其餘
 */

export const SIGNAL_RULE = {
  green: '四項技術條件中偏多達 3 項以上，且股價站上 MA20：短中期偏多，可續抱',
  yellow: '均線／動能／量能未同步（整理或背離）：以觀望為主',
  red: '四項技術條件中偏空達 3 項以上，且股價低於 MA20：短中期偏空，建議減碼或停損',
};

export const SIGNAL_LABEL = { green: '綠燈', yellow: '黃燈', red: '紅燈' };

export const BIAS_LABEL = { bull: '偏多', side: '中性', bear: '偏空' };

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function fmtPct(v) {
  const n = num(v);
  if (n == null) return '—';
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}

function fmtX(v) {
  const n = num(v);
  if (n == null) return '—';
  return `${n.toFixed(2)} 倍`;
}

/** 近 5 日：>|1%| 才算偏多／偏空，其間為中性 */
function momentumBias(chg5d) {
  const n = num(chg5d);
  if (n == null) return 'side';
  if (n >= 1) return 'bull';
  if (n <= -1) return 'bear';
  return 'side';
}

/** 量比：≥1.30 放量偏多；<0.80 縮量偏弱；其間中性 */
function volumeBias(volRatio) {
  const n = num(volRatio);
  if (n == null) return 'side';
  if (n >= 1.3) return 'bull';
  if (n < 0.8) return 'bear';
  return 'side';
}

function structureBias(ma20, ma60) {
  const a = num(ma20);
  const b = num(ma60);
  if (a == null || b == null) return 'side';
  const diff = (a - b) / b;
  if (Math.abs(diff) < 0.003) return 'side'; // 糾結
  return a > b ? 'bull' : 'bear';
}

export function buildFactors(holding) {
  const p = num(holding.price);
  const m20 = num(holding.ma20);
  const m60 = num(holding.ma60);
  const chg5d = num(holding.chg5d);
  const volRatio = num(holding.volRatio);

  const above20 = p != null && m20 != null && p >= m20;
  const trendBias = p == null || m20 == null ? 'side' : above20 ? 'bull' : 'bear';
  const structBias = structureBias(m20, m60);
  const momBias = momentumBias(chg5d);
  const volBias = volumeBias(volRatio);

  const trendText = above20
    ? '股價站上 20 日均線，短中期趨勢偏多'
    : p != null && m20 != null
      ? '股價低於 20 日均線，短中期趨勢偏空'
      : '均線資料不足，短中期趨勢中性';

  const structText =
    structBias === 'bull'
      ? '20 日均線高於 60 日均線，波段結構偏多'
      : structBias === 'bear'
        ? '20 日均線低於 60 日均線，波段結構偏空'
        : '20 日均線與 60 日均線糾結，波段結構中性';

  let momText;
  if (chg5d == null) momText = '近 5 日漲跌資料不足，動能中性';
  else if (chg5d >= 0) momText = `近 5 日上漲 ${chg5d.toFixed(2)}%，動能${BIAS_LABEL[momBias]}`;
  else momText = `近 5 日下跌 ${Math.abs(chg5d).toFixed(2)}%，動能${BIAS_LABEL[momBias]}`;

  let volText;
  if (volRatio == null) volText = '量比資料不足，量能中性';
  else volText = `近期量比 ${volRatio.toFixed(2)} 倍，量能${BIAS_LABEL[volBias]}`;

  const factors = [
    { id: 'trend', label: '短中期趨勢', bias: trendBias, text: trendText },
    { id: 'structure', label: '波段結構', bias: structBias, text: structText },
    { id: 'momentum', label: '五日動能', bias: momBias, text: momText },
    { id: 'volume', label: '量能', bias: volBias, text: volText },
  ];

  const bullCount = factors.filter((f) => f.bias === 'bull').length;
  const bearCount = factors.filter((f) => f.bias === 'bear').length;
  const sideCount = factors.filter((f) => f.bias === 'side').length;

  let signal = 'yellow';
  if (bullCount >= 3 && above20) signal = 'green';
  else if (bearCount >= 3 && !above20) signal = 'red';

  let reason;
  if (signal === 'green') {
    reason = `四項條件中 ${bullCount} 項偏多，且股價站上 MA20，短中期偏多，可續抱。`;
  } else if (signal === 'red') {
    reason = `四項條件中 ${bearCount} 項偏空，且股價低於 MA20，短中期偏空，建議減碼或停損。`;
  } else {
    reason = `偏多 ${bullCount}／中性 ${sideCount}／偏空 ${bearCount}，均線、動能與量能未同步，以觀望為主。`;
  }

  return {
    signal,
    reason,
    factors,
    bullCount,
    bearCount,
    sideCount,
    above20,
    chg5d,
    volRatio,
    fmtPct: fmtPct(chg5d),
    fmtVol: fmtX(volRatio),
  };
}

export function computeSignal(holding) {
  const f = buildFactors(holding);
  return {
    signal: f.signal,
    reason: f.reason,
    factors: f.factors,
    bullCount: f.bullCount,
    bearCount: f.bearCount,
    sideCount: f.sideCount,
    maBias: f.above20 ? 'bull' : 'bear',
    pnlBias: momentumBias(holding.chg5d),
  };
}

export function enrichHolding(holding) {
  const s = computeSignal(holding);
  return {
    ...holding,
    signal: s.signal,
    reason: s.reason,
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
