import { lightStats } from '../data/mockData';

export default function LightStats() {
  return (
    <div className="light-stats-wrap">
      <div className="light-stats">
        {lightStats.map((item) => (
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
          <span>
            <strong>綠燈</strong>：未實現損益率 ≥ +15%（趨勢偏多，可續抱）
          </span>
        </div>
        <div className="legend-item">
          <span className="dot yellow" />
          <span>
            <strong>黃燈</strong>：-5%～+15%（震盪整理，以觀望為主）
          </span>
        </div>
        <div className="legend-item">
          <span className="dot red" />
          <span>
            <strong>紅燈</strong>：{'<'} -5%（壓力較大，建議檢視停損或減碼）
          </span>
        </div>
        <p className="legend-hint">點擊個股右側 › 可展開燈號說明與詳細資料</p>
      </div>
    </div>
  );
}
