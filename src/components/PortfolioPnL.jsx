const rows = [
  { name:'大華優利高填息', tag:'ETF', sector:'高息／科技 ETF', shares:5480, avg:20.69, price:33.77, chg:-0.94, mv:185060, pnl:71678, pct:63.22, div:'—' },
  { name:'復華台灣科技優息', tag:'ETF', sector:'高息／科技 ETF', shares:5700, avg:18.40, price:28.89, chg:-1.06, mv:164673, pnl:59793, pct:57.01, div:'2,156' },
  { name:'群益ESG投等債20+', tag:'ETF', sector:'債券 ETF', shares:6810, avg:14.75, price:14.18, chg:-1.60, mv:96566, pnl:-3882, pct:-3.86, div:'—' },
  { name:'統一台灣高息動能', tag:'ETF', sector:'高息／科技 ETF', shares:3000, avg:14.31, price:22.31, chg:-0.09, mv:66930, pnl:24000, pct:55.90, div:'—' },
  { name:'中信關鍵半導體', tag:'ETF', sector:'半導體 ETF', shares:1000, avg:15.97, price:33.83, chg:-6.62, mv:33830, pnl:17860, pct:111.83, div:'—' },
  { name:'群益台灣精選高息', tag:'ETF', sector:'高息／科技 ETF', shares:1000, avg:21.19, price:30.35, chg:-0.03, mv:30350, pnl:9160, pct:43.23, div:'—' },
  { name:'中信中國高股息', tag:'ETF', sector:'高息／科技 ETF', shares:2020, avg:12.68, price:14.88, chg:-0.73, mv:30058, pnl:4444, pct:17.35, div:'1,101' },
  { name:'元大台灣價值高息', tag:'ETF', sector:'高息／科技 ETF', shares:2300, avg:9.63, price:12.34, chg:-0.96, mv:28382, pnl:6233, pct:28.14, div:'—' },
  { name:'主動野村台灣優選', tag:'ETF', sector:'高息／科技 ETF', shares:1150, avg:19.01, price:24.52, chg:-4.29, mv:28198, pnl:6337, pct:28.98, div:'—' },
  { name:'台積電', tag:'個股', sector:'半導體', shares:30, avg:1525.43, price:2380.00, chg:-0.83, mv:71400, pnl:25637, pct:56.02, div:'—' },
  { name:'智原', tag:'個股', sector:'半導體', shares:450, avg:162.05, price:172.00, chg:-2.82, mv:77400, pnl:4478, pct:6.14, div:'—' },
  { name:'材料-KY', tag:'個股', sector:'半導體', shares:3050, avg:50.11, price:50.40, chg:0.60, mv:153720, pnl:1190, pct:0.78, div:'—' },
  { name:'原相', tag:'個股', sector:'半導體', shares:125, avg:203.44, price:197.00, chg:-0.76, mv:24625, pnl:-805, pct:-3.17, div:'—' },
  { name:'奕力-KY', tag:'個股', sector:'半導體', shares:1650, avg:55.60, price:30.30, chg:-2.10, mv:49995, pnl:-41745, pct:-45.50, div:'—' },
  { name:'廣達', tag:'個股', sector:'電子製造／ODM', shares:315, avg:260.02, price:325.00, chg:-2.55, mv:102375, pnl:20469, pct:24.99, div:'—' },
  { name:'技嘉', tag:'個股', sector:'電子製造／ODM', shares:420, avg:275.88, price:347.50, chg:-2.93, mv:145950, pnl:30080, pct:25.96, div:'—' },
  { name:'英業達', tag:'個股', sector:'電子製造／ODM', shares:220, avg:58.45, price:64.60, chg:-3.15, mv:14212, pnl:1353, pct:10.52, div:'590' },
  { name:'技宸', tag:'個股', sector:'電子製造／ODM', shares:12, avg:255.00, price:220.00, chg:0.00, mv:2640, pnl:-420, pct:-13.73, div:'—' },
  { name:'中信金', tag:'個股', sector:'金融', shares:1000, avg:37.72, price:66.40, chg:1.22, mv:66400, pnl:28680, pct:76.03, div:'2,490' },
  { name:'玉山金', tag:'個股', sector:'金融', shares:1960, avg:28.04, price:38.25, chg:1.32, mv:74970, pnl:20012, pct:36.41, div:'—' },
  { name:'凱基金', tag:'個股', sector:'金融', shares:2421, avg:16.05, price:30.95, chg:-1.43, mv:74930, pnl:36073, pct:92.83, div:'—' },
  { name:'國票金', tag:'個股', sector:'金融', shares:1027, avg:12.97, price:15.60, chg:-0.32, mv:16021, pnl:2701, pct:20.28, div:'—' },
  { name:'遠東銀', tag:'個股', sector:'金融', shares:2453, avg:13.69, price:13.45, chg:-1.10, mv:32993, pnl:-589, pct:-1.75, div:'—' },
  { name:'福邦證', tag:'個股', sector:'金融', shares:1750, avg:14.32, price:14.50, chg:-0.34, mv:25375, pnl:315, pct:1.26, div:'—' },
  { name:'群益證', tag:'個股', sector:'金融', shares:1300, avg:20.64, price:30.60, chg:0.16, mv:39780, pnl:12948, pct:48.26, div:'—' },
  { name:'華票', tag:'個股', sector:'金融', shares:1000, avg:14.62, price:16.30, chg:0.31, mv:16300, pnl:1680, pct:11.49, div:'—' },
  { name:'三商壽', tag:'個股', sector:'金融', shares:4310, avg:6.60, price:9.82, chg:1.13, mv:42324, pnl:13878, pct:48.79, div:'—' },
  { name:'長榮', tag:'個股', sector:'航運', shares:230, avg:230.72, price:238.50, chg:3.02, mv:54855, pnl:1789, pct:3.37, div:'—' },
  { name:'潤隆', tag:'個股', sector:'營建', shares:1000, avg:31.68, price:33.00, chg:0.00, mv:33000, pnl:1320, pct:4.17, div:'—' },
  { name:'海悅', tag:'個股', sector:'營建', shares:1000, avg:80.79, price:69.60, chg:-1.14, mv:69600, pnl:-11190, pct:-13.85, div:'—' },
  { name:'中鴻', tag:'個股', sector:'鋼鐵', shares:1000, avg:26.15, price:17.00, chg:-0.58, mv:17000, pnl:-9150, pct:-34.99, div:'—' },
  { name:'王品', tag:'個股', sector:'餐飲', shares:70, avg:225.09, price:232.00, chg:-0.22, mv:16240, pnl:484, pct:3.07, div:'—' },
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

export default function PortfolioPnL() {
  const etfs = rows.filter((r) => r.tag === 'ETF');
  const stocks = rows.filter((r) => r.tag === '個股');
  const etfSum = sumGroup(etfs);
  const stockSum = sumGroup(stocks);

  return (
    <div className="market-report">
      <p className="section-label">PORTFOLIO P&L</p>
      <h1 className="main-title">持股損益總表</h1>
      <p className="subtitle">計算日期 2026/08/18（現價＝當日收盤）・依 ETF 與個股類股分類</p>
      <p className="update-time" style={{ marginTop: -8, marginBottom: 16 }}>現價與損益計算基準：2026年8月18日</p>

      <div className="summary-row" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 20 }}>
        <div className="summary-card">
          <div className="label">總投入成本</div>
          <div className="value">1,551,341</div>
        </div>
        <div className="summary-card">
          <div className="label">總市值</div>
          <div className="value">1,886,151</div>
        </div>
        <div className="summary-card">
          <div className="label">總未實現損益</div>
          <div className="value" style={{ color: 'var(--green)' }}>+334,810</div>
          <div className="label" style={{ marginTop: 4 }}>(+21.58%)</div>
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
        未實現損益 = 市值 − 持有股數 × 買入均價（不含手續費／交易稅；已賣出部位的實現損益不在此表統計）。累計已收股利含現金股利收入，不含股票股利。
      </p>
    </div>
  );
}
