const rows = [
  { name:'潤隆', tag:'個股', shares:1000, avg:31.68, trades:24, out:32021, income:280, price:34.50, mv:34500, pnl:2820, pct:8.9 },
  { name:'廣達', tag:'個股', shares:315, avg:260.02, trades:34, out:88932, income:12150, price:327.00, mv:103005, pnl:21099, pct:25.76 },
  { name:'遠東銀', tag:'個股', shares:2453, avg:13.69, trades:0, out:33584, income:1090, price:13.60, mv:33361, pnl:-221, pct:-0.66 },
  { name:'福邦證', tag:'個股', shares:1750, avg:14.32, trades:0, out:25060, income:1914, price:14.65, mv:25638, pnl:578, pct:2.3 },
  { name:'群益ESG投等債20+', tag:'ETF', shares:6810, avg:14.75, trades:69, out:129961, income:33786, price:14.42, mv:98200, pnl:-2247, pct:-2.24 },
  { name:'群益證', tag:'個股', shares:1300, avg:20.64, trades:21, out:26851, income:0, price:30.35, mv:39455, pnl:12623, pct:47.04 },
  { name:'群益台灣精選高息', tag:'ETF', shares:1000, avg:21.19, trades:3, out:21189, income:4147, price:30.31, mv:30310, pnl:9120, pct:43.04 },
  { name:'華票', tag:'個股', shares:1000, avg:14.62, trades:0, out:14620, income:770, price:16.30, mv:16300, pnl:1680, pct:11.49 },
  { name:'統一台灣高息動能', tag:'ETF', shares:3000, avg:14.31, trades:0, out:42930, income:2286, price:22.21, mv:66630, pnl:23700, pct:55.21 },
  { name:'智原', tag:'個股', shares:450, avg:162.05, trades:102, out:81093, income:9431, price:172.00, mv:77400, pnl:4477, pct:6.14 },
  { name:'復華台灣科技優息', tag:'ETF', shares:5700, avg:18.40, trades:7, out:104890, income:9922, price:28.44, mv:162108, pnl:57228, pct:54.57 },
  { name:'凱基金', tag:'個股', shares:2421, avg:16.05, trades:3, out:38850, income:2028, price:30.40, mv:73598, pnl:34741, pct:89.41 },
  { name:'國票金', tag:'個股', shares:1027, avg:12.97, trades:0, out:13320, income:290, price:15.65, mv:16073, pnl:2752, pct:20.66 },
  { name:'海悅', tag:'個股', shares:1000, avg:80.79, trades:316, out:164049, income:84743, price:71.80, mv:71800, pnl:-8990, pct:-11.13 },
  { name:'原相', tag:'個股', shares:125, avg:203.44, trades:19, out:25449, income:140, price:200.00, mv:25000, pnl:-430, pct:-1.69 },
  { name:'英業達', tag:'個股', shares:220, avg:58.45, trades:18, out:17535, income:5808, price:64.50, mv:14190, pnl:1331, pct:10.35 },
  { name:'奕力-KY', tag:'個股', shares:1650, avg:55.60, trades:20, out:90391, income:2782, price:31.00, mv:51150, pnl:-40590, pct:-44.24 },
  { name:'長榮', tag:'個股', shares:230, avg:230.72, trades:43, out:53108, income:5515, price:246.00, mv:56580, pnl:3514, pct:6.62 },
  { name:'材料-KY', tag:'個股', shares:3050, avg:50.01, trades:127, out:152672, income:66, price:50.20, mv:153110, pnl:275, pct:0.18 },
  { name:'技嘉', tag:'個股', shares:420, avg:275.88, trades:357, out:187668, income:78323, price:344.00, mv:144480, pnl:28610, pct:24.69 },
  { name:'技宸', tag:'個股', shares:12, avg:255.00, trades:5, out:3065, income:0, price:223.50, mv:2682, pnl:-378, pct:-12.35 },
  { name:'玉山金', tag:'個股', shares:1960, avg:28.04, trades:41, out:59181, income:5711, price:37.35, mv:73206, pnl:18248, pct:33.2 },
  { name:'台積電', tag:'個股', shares:30, avg:1525.43, trades:25, out:45788, income:425, price:2375.00, mv:71250, pnl:25487, pct:55.69 },
  { name:'主動野村台灣優選', tag:'ETF', shares:1150, avg:19.01, trades:78, out:40901, income:25182, price:28.36, mv:32614, pnl:10752, pct:49.18 },
  { name:'王品', tag:'個股', shares:70, avg:225.09, trades:0, out:15756, income:2128, price:237.00, mv:16590, pnl:834, pct:5.29 },
  { name:'元大台灣價值高息', tag:'ETF', shares:2300, avg:9.63, trades:0, out:22149, income:1334, price:12.40, mv:28520, pnl:6371, pct:28.76 },
  { name:'中鴻', tag:'個股', shares:1000, avg:26.15, trades:0, out:26150, income:25, price:17.35, mv:17350, pnl:-8800, pct:-33.65 },
  { name:'中信關鍵半導體', tag:'ETF', shares:1000, avg:15.97, trades:13, out:15983, income:1730, price:39.05, mv:39050, pnl:23080, pct:144.52 },
  { name:'中信金', tag:'個股', shares:1000, avg:37.72, trades:9, out:39983, income:7351, price:63.40, mv:63400, pnl:25680, pct:68.08 },
  { name:'中信中國高股息', tag:'ETF', shares:2020, avg:12.68, trades:62, out:50737, income:28057, price:15.07, mv:30441, pnl:4828, pct:18.85 },
  { name:'大華優利高填息', tag:'ETF', shares:5480, avg:20.69, trades:1, out:113388, income:20034, price:33.64, mv:184347, pnl:70966, pct:62.59 },
  { name:'三商壽', tag:'個股', shares:4310, avg:6.60, trades:0, out:28456, income:0, price:9.75, mv:42022, pnl:13577, pct:47.73 },
];

function fmt(n) {
  if (n === null || n === undefined) return '\u2014';
  const abs = Math.abs(n).toLocaleString('en-US');
  return n < 0 ? `-${abs}` : abs;
}
function pctStr(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

export default function HoldingsStatus() {
  return (
    <div className="market-report">
      <p className="section-label">HOLDINGS STATUS</p>
      <h1 className="main-title">持股狀況</h1>
      <p className="subtitle">資料直接讀自你的 Google Sheet「持股狀況」分頁（以試算表最新版為準）</p>

      <div className="mr-table-wrap">
        <table className="mr-table" style={{fontSize:11}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>股票</th>
              <th>持有股數</th>
              <th>買入均價</th>
              <th>交易成本</th>
              <th>支出</th>
              <th>收入</th>
              <th>已實現損益</th>
              <th>已實現損益率</th>
              <th>現價</th>
              <th>市值</th>
              <th>未實現損益</th>
              <th>未實現損益率</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td style={{textAlign:'left',whiteSpace:'nowrap'}}>
                  {r.name}{' '}
                  <span style={{fontSize:9,color:'var(--dim)',background:'#1e293b',padding:'1px 4px',borderRadius:3}}>{r.tag}</span>
                </td>
                <td>{fmt(r.shares)}</td>
                <td>{r.avg.toFixed(2)}</td>
                <td>{r.trades}</td>
                <td>{fmt(r.out)}</td>
                <td>{fmt(r.income)}</td>
                <td>—</td>
                <td>—</td>
                <td>{r.price.toFixed(2)}</td>
                <td>{fmt(r.mv)}</td>
                <td className={r.pnl >= 0 ? 'up' : 'down'}>{r.pnl >= 0 ? '+' : ''}{fmt(r.pnl)}</td>
                <td className={r.pct >= 0 ? 'up' : 'down'}>{pctStr(r.pct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mr-note" style={{marginTop:12}}>
        這份表格的數字以你維護的 Google Sheet「持股狀況」為準。已實現損益欄目前 Sheet 顯示為「-」，故此處亦顯示「—」。
      </p>
    </div>
  );
}
