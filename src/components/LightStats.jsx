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
          <span><strong>綠燈</strong>：未實現 ≥ +15% <em>且</em> 現價站上 MA20（損益＋均線雙重偏多）</span>
        </div>
        <div className="legend-item">
          <span className="dot yellow" />
          <span><strong>黃燈</strong>：損益與均線未同時達標（背離或整理，以觀望為主）</span>
        </div>
        <div className="legend-item">
          <span className="dot red" />
          <span><strong>紅燈</strong>：未實現 {'<'} -5% <em>且</em> 現價低於 MA20 與 MA60（雙重偏空）</span>
        </div>
        <p className="legend-hint">點擊個股右側 › 可展開損益偏向、均線偏向與 MA5/MA20/MA60 真實計算</p>
      </div>
    </div>
  );
}
