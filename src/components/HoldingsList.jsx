import HoldingItem from './HoldingItem';
export default function HoldingsList({ holdings, filter }) {
  const filtered = filter === 'all' ? holdings : holdings.filter((h) => h.signal === filter);
  if (filtered.length === 0) return <div className="empty-state">目前沒有符合條件的持股</div>;
  return (
    <div className="holdings-list">
      {filtered.map((holding) => <HoldingItem key={holding.id} holding={holding} />)}
    </div>
  );
}
