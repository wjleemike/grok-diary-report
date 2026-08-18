import { lightStats } from '../data/mockData';
export default function LightStats() {
  return (
    <div className="light-stats">
      {lightStats.map((item) => (
        <div key={item.id} className="light-card">
          <div className="number"><span className={`dot ${item.color}`} />{item.count}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
