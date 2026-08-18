import { navItems } from '../data/mockData';

export default function TopNav({ activeId = 'daily', onNavigate }) {
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
    </nav>
  );
}
