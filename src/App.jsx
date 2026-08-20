import { useState } from 'react';
import TopNav from './components/TopNav.jsx';
import IndexCards from './components/IndexCards.jsx';
import UsMarkets from './components/UsMarkets.jsx';
import LightStats from './components/LightStats.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import FilterTabs from './components/FilterTabs.jsx';
import HoldingsList from './components/HoldingsList.jsx';
import MarketReport from './components/MarketReport.jsx';
import GlobalNews from './components/GlobalNews.jsx';
import TaiwanAINews from './components/TaiwanAINews.jsx';
import PortfolioPnL from './components/PortfolioPnL.jsx';
import AddTrade from './components/AddTrade.jsx';
import TradeHistory from './components/TradeHistory.jsx';
import { MarketProvider, useMarket } from './lib/MarketContext.jsx';

function AppShell() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('daily');
  const m = useMarket();

  return (
    <div className="app">
      <TopNav
        activeId={view}
        onNavigate={setView}
        onRefresh={m.refresh}
        refreshing={m.refreshing}
      />
      {m.toast && (
        <div className={`update-toast ${m.toast.kind}`} role="status">
          {m.toast.text}
        </div>
      )}
      <main className="container">
        {view === 'market' ? (
          <MarketReport />
        ) : view === 'global' ? (
          <GlobalNews news={m.news} usMarkets={m.usMarkets} reportDate={m.reportDate} live={m.live} />
        ) : view === 'ai' ? (
          <TaiwanAINews news={m.news} reportDate={m.reportDate} live={m.live} />
        ) : view === 'pnl' ? (
          <PortfolioPnL holdings={m.holdings} reportDate={m.reportDate} />
        ) : view === 'add' ? (
          <AddTrade />
        ) : view === 'history' ? (
          <TradeHistory />
        ) : (
          <>
            <p className="update-time">
              上次更新:{m.lastUpdate}
              {m.live ? ' · 即時資料' : ''}
              {m.refreshing ? ' · 抓取中…' : ''}
            </p>
            <div className="section-label">DAILY PORTFOLIO SIGNAL</div>
            <h1 className="main-title">Grok每日報告</h1>
            <p className="subtitle">
              {m.reportDate} {m.live ? '即時／最新收盤' : '收盤資料'} • 共 {m.holdings.length} 檔持股 • 燈號＝均線 × 動能 × 量能
            </p>
            <IndexCards items={m.taiwanIndices} />
            <UsMarkets items={m.usMarkets} />
            <LightStats stats={m.stats} />
            <SummaryCards items={m.summary} />
            <FilterTabs
              activeFilter={filter}
              onFilterChange={setFilter}
              totalCount={m.holdings.length}
            />
            <HoldingsList holdings={m.holdings} filter={filter} />
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <MarketProvider>
      <AppShell />
    </MarketProvider>
  );
}
