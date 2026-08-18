import { portfolioSummary } from '../data/mockData';
export default function SummaryCards() {
  return (
    <div className="summary-row">
      {portfolioSummary.map((item) => (
        <div key={item.id} className="summary-card">
          <div className={`value ${item.negative ? 'negative' : ''}`}>{item.value}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
