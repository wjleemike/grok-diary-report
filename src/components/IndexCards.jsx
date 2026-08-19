import { taiwanIndices } from '../data/mockData';
export default function IndexCards() {
  return (
    <div className="index-row">
      {taiwanIndices.map((item) => (
        <div key={item.id} className="index-card">
          <div className="label">{item.label}</div>
          <div className={`value change ${item.direction}`}>{item.value}</div>
          <div className={`change ${item.direction}`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
}
