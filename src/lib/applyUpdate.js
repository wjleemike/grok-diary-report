function costOf(h) {
  if (h.costPrice != null && Number.isFinite(Number(h.costPrice))) return Number(h.costPrice);
  const pct = Number(h.changePct) || 0;
  const price = Number(h.price);
  if (!Number.isFinite(price) || pct <= -99.9) return price;
  return price / (1 + pct / 100);
}

function fmtInt(n) {
  const v = Math.round(n);
  const abs = Math.abs(v).toLocaleString('en-US');
  return v < 0 ? `-${abs}` : abs;
}

export function applyQuotes(holdings, quotes) {
  if (!quotes) return holdings;
  return holdings.map((h) => {
    const q = quotes[h.code];
    if (!q || q.price == null || !Number.isFinite(Number(q.price))) return h;
    const cost = costOf(h);
    const price = Number(q.price);
    const shares = Number(h.shares) || 0;
    const marketValue = Math.round(price * shares);
    const dailyPnl = Math.round((price - cost) * shares);
    const changePct = cost ? ((price / cost) - 1) * 100 : 0;
    return {
      ...h,
      costPrice: cost,
      price,
      marketValue,
      dailyPnl,
      changePct,
      ma5: q.ma5 ?? h.ma5,
      ma20: q.ma20 ?? h.ma20,
      ma60: q.ma60 ?? h.ma60,
      chg5d: q.chg5d ?? h.chg5d,
      volRatio: q.volRatio ?? h.volRatio,
      dayChangePct: q.dayChangePct ?? h.dayChangePct,
    };
  });
}

export function buildSummary(holdings) {
  const mv = holdings.reduce((s, h) => s + (Number(h.marketValue) || 0), 0);
  const pnl = holdings.reduce((s, h) => s + (Number(h.dailyPnl) || 0), 0);
  const cost = mv - pnl;
  const pct = cost ? (pnl / cost) * 100 : 0;
  return [
    { id: 'marketValue', value: fmtInt(mv), label: '總市值', negative: false },
    {
      id: 'dailyPnl',
      value: (pnl >= 0 ? '+' : '') + fmtInt(pnl),
      label: '未實現總損益',
      negative: pnl < 0,
    },
    {
      id: 'dailyPnlPct',
      value: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
      label: '未實現損益比率',
      negative: pct < 0,
    },
  ];
}

const CACHE_KEY = 'grok-diary-live-v1';

export function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.holdings)) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...payload, savedAt: Date.now() }));
  } catch {
    /* ignore quota */
  }
}
