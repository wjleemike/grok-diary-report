export default function FilterTabs({ activeFilter, onFilterChange, totalCount }) {
  const filters = [
    { id: 'all', label: `全部 (${totalCount})` },
    { id: 'red', label: '紅燈', color: 'red' },
    { id: 'yellow', label: '黃燈', color: 'yellow' },
    { id: 'green', label: '綠燈', color: 'green' },
  ];
  return (
    <div className="filter-row">
      {filters.map((f) => (
        <button key={f.id} className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`} onClick={() => onFilterChange(f.id)}>
          {f.color && <span className={`dot ${f.color}`} />}{f.label}
        </button>
      ))}
    </div>
  );
}
