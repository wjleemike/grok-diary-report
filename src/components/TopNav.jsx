import { navItems } from '../data/mockData';

export default function TopNav({
  activeId = 'daily',
  onNavigate,
  onRefresh,
  refreshing = false,
}) {
  return (
    <nav className="top-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-btn ${activeId === item.id ? 'active' : ''}`}
          onClick={() => onNavigate && onNavigate(item.id)}
        >
          <span className="icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
      <button
        className={`nav-btn update-btn ${refreshing ? 'loading' : ''}`}
        onClick={() => onRefresh && onRefresh()}
        disabled={refreshing}
        title="向 Yahoo Finance／證交所抓取最新股價、均線、量能與新聞"
      >
        <span className="icon">🔄</span>
        {refreshing ? '更新中…' : '立即更新'}
      </button>
    </nav>
  );
}
