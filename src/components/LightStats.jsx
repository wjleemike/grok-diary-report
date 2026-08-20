export default function LightStats({ stats }) {
  if (!stats) return null;
  return (
    <div className="light-stats-wrap">
      <div className="light-stats">
        {stats.map((item) => (
          <div key={item.id} className="light-card">
            <div className="number">
              <span className={`dot ${item.color}`} />
              {item.count}
            </div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="signal-legend">
        <div className="legend-item">
          <span className="dot green" />
          <span><strong>綠燈</strong>：四項條件偏多 ≥ 3 <em>且</em> 股價站上 MA20（短中期偏多）</span>
        </div>
        <div className="legend-item">
          <span className="dot yellow" />
          <span><strong>黃燈</strong>：均線／五日動能／量能未同步（整理或背離，觀望）</span>
        </div>
        <div className="legend-item">
          <span className="dot red" />
          <span><strong>紅燈</strong>：四項條件偏空 ≥ 3 <em>且</em> 股價低於 MA20（短中期偏空）</span>
        </div>
        <p className="legend-hint">四項：股價 vs MA20、MA20 vs MA60、近 5 日漲跌、量比。點擊 › 展開明細</p>
      </div>
    </div>
  );
}
