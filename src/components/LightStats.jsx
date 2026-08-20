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
          <span><strong>\u7da0\u71c8</strong>\uff1a\u672a\u5be6\u73fe\u640d\u76ca\u7387 \u2265 +15%\uff08\u8da8\u52e2\u504f\u591a\uff0c\u53ef\u7e8c\u62b1\uff09</span>
        </div>
        <div className="legend-item">
          <span className="dot yellow" />
          <span><strong>\u9ec3\u71c8</strong>\uff1a-5%\uff5e+15%\uff08\u9707\u76ea\u6574\u7406\uff0c\u4ee5\u89c0\u671b\u70ba\u4e3b\uff09</span>
        </div>
        <div className="legend-item">
          <span className="dot red" />
          <span><strong>\u7d05\u71c8</strong>\uff1a< -5%\uff08\u58d3\u529b\u8f03\u5927\uff0c\u5efa\u8b70\u6aa2\u8996\u505c\u640d\u6216\u6e1b\u78bc\uff09</span>
        </div>
        <p className="legend-hint">\u9ede\u64ca\u500b\u80a1\u53f3\u5074 \u203a \u53ef\u5c55\u958b\u71c8\u865f\u8aaa\u660e\u8207\u8a73\u7d30\u8cc7\u6599</p>
      </div>
    </div>
  );
}
