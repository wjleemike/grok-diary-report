import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  lastUpdate as seedLastUpdate,
  reportDate as seedReportDate,
  holdings as seedHoldings,
  taiwanIndices as seedTw,
  usMarkets as seedUs,
  portfolioSummary as seedSummary,
} from '../data/mockData.js';
import { enrichHolding, countSignals } from '../utils/signal.js';
import { applyQuotes, buildSummary, loadCache, saveCache } from './applyUpdate.js';

const MarketCtx = createContext(null);

function initialState() {
  const cached = typeof window !== 'undefined' ? loadCache() : null;
  const holdings = (cached?.holdings || seedHoldings).map(enrichHolding);
  return {
    holdings,
    taiwanIndices: cached?.taiwanIndices || seedTw,
    usMarkets: cached?.usMarkets || seedUs,
    lastUpdate: cached?.lastUpdate || seedLastUpdate,
    reportDate: cached?.reportDate || seedReportDate,
    news: cached?.news || null,
    live: Boolean(cached),
  };
}

export function MarketProvider({ children }) {
  const seed = useMemo(() => initialState(), []);
  const [holdings, setHoldings] = useState(seed.holdings);
  const [taiwanIndices, setTaiwanIndices] = useState(seed.taiwanIndices);
  const [usMarkets, setUsMarkets] = useState(seed.usMarkets);
  const [lastUpdate, setLastUpdate] = useState(seed.lastUpdate);
  const [reportDate, setReportDate] = useState(seed.reportDate);
  const [news, setNews] = useState(seed.news);
  const [live, setLive] = useState(seed.live);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState(null);

  const stats = useMemo(() => countSignals(holdings), [holdings]);
  const summary = useMemo(() => buildSummary(holdings), [holdings]);

  const refresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    setToast({ kind: 'info', text: '正在抓取最新股價、均線與新聞…' });
    try {
      const items = holdings.map((h) => ({ code: h.code, market: h.market, id: h.id }));
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `更新失敗（${res.status}）`);
      }
      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error || '更新失敗');

      const nextHoldings = applyQuotes(holdings, data.quotes).map(enrichHolding);
      const nextTw = data.taiwanIndices?.length ? data.taiwanIndices : taiwanIndices;
      const nextUs = data.usMarkets?.length ? data.usMarkets : usMarkets;
      const nextNews = data.news || news;
      const nextLast = data.lastUpdate || lastUpdate;
      const nextDate = data.reportDate || reportDate;

      setHoldings(nextHoldings);
      setTaiwanIndices(nextTw);
      setUsMarkets(nextUs);
      setNews(nextNews);
      setLastUpdate(nextLast);
      setReportDate(nextDate);
      setLive(true);
      saveCache({
        holdings: nextHoldings,
        taiwanIndices: nextTw,
        usMarkets: nextUs,
        news: nextNews,
        lastUpdate: nextLast,
        reportDate: nextDate,
      });

      const q = data.fetched?.quotes ?? 0;
      const n = data.fetched?.news ?? 0;
      setToast({ kind: 'ok', text: `已更新 ${q} 檔報價、${n} 則新聞 · ${nextLast}` });
    } catch (e) {
      setToast({ kind: 'err', text: `更新失敗：${e.message || e}` });
    } finally {
      setRefreshing(false);
      setTimeout(() => setToast(null), 6000);
    }
  }, [refreshing, holdings, taiwanIndices, usMarkets, news, lastUpdate, reportDate]);

  const value = {
    holdings,
    taiwanIndices,
    usMarkets,
    lastUpdate,
    reportDate,
    news,
    live,
    stats,
    summary,
    refreshing,
    toast,
    refresh,
  };

  return <MarketCtx.Provider value={value}>{children}</MarketCtx.Provider>;
}

export function useMarket() {
  const ctx = useContext(MarketCtx);
  if (!ctx) throw new Error('useMarket must be used within MarketProvider');
  return ctx;
}
