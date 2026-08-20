import { taiwanIndices as seed } from '../data/mockData';

export default function IndexCards({ items }) {
  const list = items?.length ? items : seed;
  return (
    <div className="index-row">
      {list.map((item) => (
        <div key={item.id} className="index-card">
          <div className="label">{item.label}</div>
          <div className={`value change ${item.direction}`}>{item.value}</div>
          <div className={`change ${item.direction}`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
}
