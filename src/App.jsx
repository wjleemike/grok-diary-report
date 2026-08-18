import { useState } from 'react';
import TopNav from './components/TopNav';
import IndexCards from './components/IndexCards';
import UsMarkets from './components/UsMarkets';
import LightStats from './components/LightStats';
import SummaryCards from './components/SummaryCards';
import FilterTabs from './components/FilterTabs';
import HoldingsList from './components/HoldingsList';
import MarketReport from './components/MarketReport';
import { lastUpdate, reportDate, totalHoldings, holdings } from './data/mockData';

function App() {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('daily');

  return (
    <div className="app">
      <TopNav activeId={view} onNavigate={setView} />
      <main className="container">
        {view === 'market' ? (
          <MarketReport />
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
