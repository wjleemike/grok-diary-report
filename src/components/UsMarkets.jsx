import { usMarkets as seed } from '../data/mockData';

export default function UsMarkets({ items }) {
  const list = items?.length ? items : seed;
  return (
    <div className="us-markets">
      {list.map((item) => (
        <div key={item.id} className="us-card">
          <div className="label">{item.label}</div>
          <div className={`value change ${item.direction}`}>{item.value}</div>
          <div className={`change ${item.direction}`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
}
