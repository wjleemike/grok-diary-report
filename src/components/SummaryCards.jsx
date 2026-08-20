import { portfolioSummary as seed } from '../data/mockData';

export default function SummaryCards({ items }) {
  const list = items?.length ? items : seed;
  return (
    <div className="summary-row">
      {list.map((item) => (
        <div key={item.id} className="summary-card">
          <div className={`value ${item.negative ? 'negative' : 'positive'}`}>{item.value}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
