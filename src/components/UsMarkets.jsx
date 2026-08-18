import { usMarkets } from '../data/mockData';
export default function UsMarkets() {
  return (
    <div className="us-markets">
      {usMarkets.map((item) => (
        <div key={item.id} className="us-card">
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
          <div className={`change ${item.direction}`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
}
