export default function NewsList({ items }) {
  return (
    <div className="news-list">
      {items.map((n) => (
        <a
          key={(n.href || '') + n.title}
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`news-item ${n.tone || 'neutral'}`}
        >
          <div className="news-title">{n.title}</div>
          {n.en && <div className="news-en">{n.en}</div>}
          <div className="news-meta">
            <span>{n.date}</span>
            {n.tag && <span className="news-tag">{n.tag}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}
