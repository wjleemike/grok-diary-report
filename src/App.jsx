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
import { lastUpdate, reportDate, totalHoldings, holdings } from './data/mockData.js';

function App() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('daily');

  return (
    <div className="app">
      <TopNav activeId={view} onNavigate={setView} />
      <main className="container">
        {view === 'market' ? (
          <MarketReport />
        ) : view === 'global' ? (
          <GlobalNews />
        ) : view === 'ai' ? (
          <TaiwanAINews />
        ) : (
          <>
            <p className="update-time">上次更新:{lastUpdate}</p>
            <div className="section-label">DAILY PORTFOLIO SIGNAL</div>
            <h1 className="main-title">Grok每日報告</h1>
            <p className="subtitle">{reportDate} 收盤資料 • 共 {totalHoldings} 檔持股</p>
            <IndexCards />
            <UsMarkets />
            <LightStats />
            <SummaryCards />
            <FilterTabs activeFilter={filter} onFilterChange={setFilter} totalCount={totalHoldings} />
            <HoldingsList holdings={holdings} filter={filter} />
          </>
        )}
      </main>
    </div>
  );
}
export default App;
