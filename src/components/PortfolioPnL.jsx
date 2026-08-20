const rows = [
  { name:'大華優利高填息', tag:'ETF', sector:'高息／科技 ETF', shares:5480, avg:20.69, price:33.64, chg:-0.44, mv:184347, pnl:70966, pct:62.59, div:'—' },
  { name:'復華台灣科技優息', tag:'ETF', sector:'高息／科技 ETF', shares:5700, avg:18.40, price:28.44, chg:-1.49, mv:162108, pnl:57228, pct:54.57, div:'2,156' },
  { name:'群益ESG投等債20+', tag:'ETF', sector:'債券 ETF', shares:6810, avg:14.75, price:14.42, chg:1.26, mv:98200, pnl:-2247, pct:-2.24, div:'—' },
  { name:'統一台灣高息動能', tag:'ETF', sector:'高息／科技 ETF', shares:3000, avg:14.31, price:22.21, chg:-0.49, mv:66630, pnl:23700, pct:55.21, div:'—' },
  { name:'中信關鍵半導體', tag:'ETF', sector:'半導體 ETF', shares:1000, avg:15.97, price:39.05, chg:-1.14, mv:39050, pnl:23080, pct:144.52, div:'—' },
  { name:'群益台灣精選高息', tag:'ETF', sector:'高息／科技 ETF', shares:1000, avg:21.19, price:30.31, chg:-0.1, mv:30310, pnl:9120, pct:43.04, div:'—' },
  { name:'中信中國高股息', tag:'ETF', sector:'高息／科技 ETF', shares:2020, avg:12.68, price:15.07, chg:1.21, mv:30441, pnl:4828, pct:18.85, div:'1,101' },
  { name:'元大台灣價值高息', tag:'ETF', sector:'高息／科技 ETF', shares:2300, avg:9.63, price:12.40, chg:0.4, mv:28520, pnl:6371, pct:28.76, div:'—' },
  { name:'主動野村台灣優選', tag:'ETF', sector:'高息／科技 ETF', shares:1150, avg:19.01, price:28.36, chg:-0.32, mv:32614, pnl:10752, pct:49.18, div:'—' },
  { name:'台積電', tag:'個股', sector:'半導體', shares:30, avg:1525.43, price:2375.00, chg:1.06, mv:71250, pnl:25487, pct:55.69, div:'—' },
  { name:'智原', tag:'個股', sector:'半導體', shares:450, avg:162.05, price:172.00, chg:-0.29, mv:77400, pnl:4477, pct:6.14, div:'—' },
  { name:'材料-KY', tag:'個股', sector:'半導體', shares:3050, avg:50.11, price:50.20, chg:-0.99, mv:153110, pnl:275, pct:0.18, div:'—' },
  { name:'原相', tag:'個股', sector:'半導體', shares:125, avg:203.44, price:200.00, chg:1.01, mv:25000, pnl:-430, pct:-1.69, div:'—' },
  { name:'奕力-KY', tag:'個股', sector:'半導體', shares:1650, avg:55.60, price:31.00, chg:1.14, mv:51150, pnl:-40590, pct:-44.24, div:'—' },
  { name:'廣達', tag:'個股', sector:'電子製造／ODM', shares:315, avg:260.02, price:327.00, chg:-1.21, mv:103005, pnl:21099, pct:25.76, div:'—' },
  { name:'技嘉', tag:'個股', sector:'電子製造／ODM', shares:420, avg:275.88, price:344.00, chg:-1.29, mv:144480, pnl:28610, pct:24.69, div:'—' },
  { name:'英業達', tag:'個股', sector:'電子製造／ODM', shares:220, avg:58.45, price:64.50, chg:-1.07, mv:14190, pnl:1331, pct:10.35, div:'590' },
  { name:'技宸', tag:'個股', sector:'電子製造／ODM', shares:12, avg:255.00, price:223.50, chg:0.0, mv:2682, pnl:-378, pct:-12.35, div:'—' },
  { name:'中信金', tag:'個股', sector:'金融', shares:1000, avg:37.72, price:63.40, chg:-2.31, mv:63400, pnl:25680, pct:68.08, div:'2,490' },
  { name:'玉山金', tag:'個股', sector:'金融', shares:1960, avg:28.04, price:37.35, chg:-1.19, mv:73206, pnl:18248, pct:33.2, div:'—' },
  { name:'凱基金', tag:'個股', sector:'金融', shares:2421, avg:16.05, price:30.40, chg:0.0, mv:73598, pnl:34741, pct:89.41, div:'—' },
  { name:'國票金', tag:'個股', sector:'金融', shares:1027, avg:12.97, price:15.65, chg:0.64, mv:16073, pnl:2752, pct:20.66, div:'—' },
  { name:'遠東銀', tag:'個股', sector:'金融', shares:2453, avg:13.69, price:13.60, chg:0.74, mv:33361, pnl:-221, pct:-0.66, div:'—' },
  { name:'福邦證', tag:'個股', sector:'金融', shares:1750, avg:14.32, price:14.65, chg:1.03, mv:25638, pnl:578, pct:2.3, div:'—' },
  { name:'群益證', tag:'個股', sector:'金融', shares:1300, avg:20.64, price:30.35, chg:0.5, mv:39455, pnl:12623, pct:47.04, div:'—' },
  { name:'華票', tag:'個股', sector:'金融', shares:1000, avg:14.62, price:16.30, chg:0.31, mv:16300, pnl:1680, pct:11.49, div:'—' },
  { name:'三商壽', tag:'個股', sector:'金融', shares:4310, avg:6.60, price:9.75, chg:0.0, mv:42022, pnl:13577, pct:47.73, div:'—' },
  { name:'長榮', tag:'個股', sector:'航運', shares:230, avg:230.72, price:246.00, chg:2.29, mv:56580, pnl:3514, pct:6.62, div:'—' },
  { name:'潤隆', tag:'個股', sector:'營建', shares:1000, avg:31.68, price:34.50, chg:3.6, mv:34500, pnl:2820, pct:8.9, div:'—' },
  { name:'海悅', tag:'個股', sector:'營建', shares:1000, avg:80.79, price:71.80, chg:2.57, mv:71800, pnl:-8990, pct:-11.13, div:'—' },
  { name:'中鴻', tag:'個股', sector:'鋼鐵', shares:1000, avg:26.15, price:17.35, chg:2.66, mv:17350, pnl:-8800, pct:-33.65, div:'—' },
  { name:'王品', tag:'個股', sector:'餐飲', shares:70, avg:225.09, price:237.00, chg:1.28, mv:16590, pnl:834, pct:5.29, div:'—' },
];

function fmt(n, digits = 0) {
  if (n === null || n === undefined) return '—';
  const abs = Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
  return n < 0 ? `-${abs}` : abs;
}
function pctStr(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

function sumGroup(list) {
  const mv = list.reduce((s, r) => s + r.mv, 0);
  const pnl = list.reduce((s, r) => s + r.pnl, 0);
  return { mv, pnl };
}

function RowTable({ list }) {
  return (
    <div className="mr-table-wrap">
      <table className="mr-table" style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>股票</th>
            <th>持有股數</th>
            <th>買入均價</th>
            <th>現價</th>
            <th>今日漲跌</th>
            <th>市值</th>
            <th>未實現損益</th>
            <th>未實現損益率</th>
            <th>累計已收股利</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.name}>
              <td style={{ textAlign: 'left' }}>
                {r.name}{' '}
                <span style={{ fontSize: 10, color: 'var(--dim)', background: '#1e293b', padding: '1px 5px', borderRadius: 4 }}>{r.tag}</span>
              </td>
              <td>{fmt(r.shares)}</td>
              <td>{r.avg.toFixed(2)}</td>
              <td>{r.price.toFixed(2)}</td>
              <td className={r.chg >= 0 ? 'up' : 'down'}>{pctStr(r.chg)}</td>
              <td>{fmt(r.mv)}</td>
              <td className={r.pnl >= 0 ? 'up' : 'down'}>{r.pnl >= 0 ? '+' : ''}{fmt(r.pnl)}</td>
              <td className={r.pct >= 0 ? 'up' : 'down'}>{pctStr(r.pct)}</td>
              <td>{r.div}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ETF_ORDER = ['半導體 ETF', '高息／科技 ETF', '債券 ETF'];
const STOCK_ORDER = ['半導體', '電子製造／ODM', '金融', '航運', '營建', '鋼鐵', '餐飲'];

function mergeLive(base, holdings) {
  if (!holdings?.length) return base;
  const byName = Object.fromEntries(holdings.map((h) => [h.name, h]));
  return base.map((r) => {
    const h = byName[r.name];
    if (!h || h.price == null) return r;
    const price = Number(h.price);
    const mv = Math.round(price * r.shares);
    const pnl = Math.round((price - r.avg) * r.shares);
    const pct = r.avg ? ((price / r.avg) - 1) * 100 : r.pct;
    const chg = h.dayChangePct != null ? Number(h.dayChangePct) : r.chg;
    return { ...r, price, mv, pnl, pct, chg };
  });
}

export default function PortfolioPnL({ holdings, reportDate }) {
  const liveRows = mergeLive(rows, holdings);
  const etfs = liveRows.filter((r) => r.tag === 'ETF');
  const stocks = liveRows.filter((r) => r.tag === '個股');
  const etfSum = sumGroup(etfs);
  const stockSum = sumGroup(stocks);
  const allSum = sumGroup(liveRows);
  const cost = liveRows.reduce((s, r) => s + r.shares * r.avg, 0);
  const pct = cost ? (allSum.pnl / cost) * 100 : 0;
  const dateLabel = reportDate ? reportDate.replace(/-/g, '/') : '2026/08/20';

  return (
    <div className="market-report">
      <p className="section-label">PORTFOLIO P&L</p>
      <h1 className="main-title">持股損益總表</h1>
      <p className="subtitle">計算日期 {dateLabel}・32 檔持股依 Yahoo／證交所／櫃買行情重算</p>
      <p className="update-time" style={{ marginTop: -8, marginBottom: 16 }}>現價與損益計算基準：{dateLabel}（點「立即更新」同步最新現價）</p>

      <div className="summary-row" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 20 }}>
        <div className="summary-card">
          <div className="label">總投入成本</div>
          <div className="value">{fmt(Math.round(cost))}</div>
        </div>
        <div className="summary-card">
          <div className="label">總市值</div>
          <div className="value">{fmt(allSum.mv)}</div>
        </div>
        <div className="summary-card">
          <div className="label">總未實現損益</div>
          <div className="value" style={{ color: allSum.pnl >= 0 ? 'var(--reds)' : 'var(--green)' }}>
            {allSum.pnl >= 0 ? '+' : ''}{fmt(allSum.pnl)}
          </div>
          <div className="label" style={{ marginTop: 4 }}>({pct >= 0 ? '+' : ''}{pct.toFixed(2)}%)</div>
        </div>
      </div>

      <section className="mr-section">
        <h2 className="mr-section-title">
          ETF（{etfs.length} 檔）
          <span style={{ fontWeight: 400, fontSize: 13, marginLeft: 10, color: 'var(--muted)' }}>
            市值 {fmt(etfSum.mv)}　未實現 {etfSum.pnl >= 0 ? '+' : ''}{fmt(etfSum.pnl)}
          </span>
        </h2>
        {ETF_ORDER.map((sec) => {
          const list = etfs.filter((r) => r.sector === sec);
          if (!list.length) return null;
          return (
            <div key={sec} style={{ marginBottom: 16 }}>
              <h3 className="mr-sub">{sec}</h3>
              <RowTable list={list} />
            </div>
          );
        })}
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">
          個股／類股（{stocks.length} 檔）
          <span style={{ fontWeight: 400, fontSize: 13, marginLeft: 10, color: 'var(--muted)' }}>
            市值 {fmt(stockSum.mv)}　未實現 {stockSum.pnl >= 0 ? '+' : ''}{fmt(stockSum.pnl)}
          </span>
        </h2>
        {STOCK_ORDER.map((sec) => {
          const list = stocks.filter((r) => r.sector === sec);
          if (!list.length) return null;
          return (
            <div key={sec} style={{ marginBottom: 16 }}>
              <h3 className="mr-sub">{sec}</h3>
              <RowTable list={list} />
            </div>
          );
        })}
      </section>

      <p className="mr-note" style={{ marginTop: 12 }}>
        未實現損益 = 市值 − 持有股數 × 買入均價（不含手續費／交易稅）。現價來自「立即更新」抓取的 Yahoo／證交所最新行情；無成交則沿用前一交易日。
      </p>
    </div>
  );
}

