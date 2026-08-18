const rows = [
  { name:'潤隆', tag:'個股', shares:1000, avg:31.68, trades:24, out:32021, income:280, price:32.85, mv:32850, pnl:982, pct:3.07 },
  { name:'廣達', tag:'個股', shares:315, avg:260.02, trades:34, out:88932, income:12150, price:327.00, mv:103005, pnl:25826, pct:29.04 },
  { name:'遠東銀', tag:'個股', shares:2453, avg:13.69, trades:0, out:33584, income:1090, price:13.45, mv:32993, pnl:372, pct:1.11 },
  { name:'福邦證', tag:'個股', shares:1750, avg:14.32, trades:0, out:25060, income:1914, price:14.55, mv:25463, pnl:2218, pct:8.85 },
  { name:'群益ESG投等債20+', tag:'ETF', shares:6810, avg:14.75, trades:69, out:129961, income:33786, price:14.42, mv:98179, pnl:1625, pct:1.25 },
  { name:'群益證', tag:'個股', shares:1300, avg:20.64, trades:21, out:26851, income:0, price:30.50, mv:39650, pnl:12646, pct:47.10 },
  { name:'群益台灣精選高息', tag:'ETF', shares:1000, avg:21.19, trades:3, out:21189, income:4147, price:30.34, mv:30340, pnl:13181, pct:62.21 },
  { name:'華票', tag:'個股', shares:1000, avg:14.62, trades:0, out:14620, income:770, price:16.25, mv:16250, pnl:2337, pct:15.99 },
  { name:'統一台灣高息動能', tag:'ETF', shares:3000, avg:14.31, trades:0, out:42930, income:2286, price:22.32, mv:66960, pnl:26058, pct:60.70 },
  { name:'智原', tag:'個股', shares:450, avg:162.05, trades:102, out:81093, income:9431, price:170.50, mv:76725, pnl:4767, pct:5.88 },
  { name:'復華台灣科技優息', tag:'ETF', shares:5700, avg:18.40, trades:7, out:104890, income:9922, price:28.90, mv:164730, pnl:69127, pct:65.91 },
  { name:'凱基金', tag:'個股', shares:2421, avg:16.05, trades:3, out:38850, income:2028, price:30.95, mv:74930, pnl:37819, pct:97.34 },
  { name:'國票金', tag:'個股', shares:1027, avg:12.97, trades:0, out:13320, income:290, price:15.60, mv:16021, pnl:2929, pct:21.99 },
  { name:'海悅', tag:'個股', shares:1000, avg:80.79, trades:316, out:164049, income:84743, price:69.40, mv:69400, pnl:-10174, pct:-6.20 },
  { name:'原相', tag:'個股', shares:125, avg:203.44, trades:19, out:25449, income:140, price:199.00, mv:24875, pnl:-530, pct:-2.08 },
  { name:'英業達', tag:'個股', shares:220, avg:58.45, trades:18, out:17535, income:5808, price:65.88, mv:14493, pnl:2709, pct:15.45 },
  { name:'奕力-KY', tag:'個股', shares:1650, avg:55.60, trades:20, out:90391, income:2782, price:30.20, mv:49830, pnl:-37971, pct:-42.01 },
  { name:'長榮', tag:'個股', shares:230, avg:230.72, trades:43, out:53108, income:5515, price:238.00, mv:54740, pnl:6936, pct:13.06 },
  { name:'材料-KY', tag:'個股', shares:3050, avg:50.01, trades:127, out:152672, income:66, price:50.40, mv:153720, pnl:522, pct:0.34 },
  { name:'技嘉', tag:'個股', shares:420, avg:275.88, trades:357, out:187668, income:78323, price:346.50, mv:145530, pnl:35623, pct:18.98 },
  { name:'技宸', tag:'個股', shares:12, avg:255.00, trades:5, out:3065, income:0, price:223.50, mv:2682, pnl:-393, pct:-12.83 },
  { name:'玉山金', tag:'個股', shares:1960, avg:28.04, trades:41, out:59181, income:5711, price:38.10, mv:74676, pnl:20918, pct:35.35 },
  { name:'台積電', tag:'個股', shares:30, avg:1525.43, trades:25, out:45788, income:425, price:2380.00, mv:71400, pnl:25762, pct:56.26 },
  { name:'主動野村台灣優選', tag:'ETF', shares:1150, avg:19.01, trades:78, out:40901, income:25182, price:24.47, mv:28141, pnl:12312, pct:30.10 },
  { name:'王品', tag:'個股', shares:70, avg:225.09, trades:0, out:15756, income:2128, price:231.83, mv:16228, pnl:2537, pct:16.10 },
  { name:'元大台灣價值高息', tag:'ETF', shares:2300, avg:9.63, trades:0, out:22149, income:1334, price:12.35, mv:28405, pnl:7480, pct:33.77 },
  { name:'中鴻', tag:'個股', shares:1000, avg:26.15, trades:0, out:26150, income:25, price:16.95, mv:16950, pnl:-9240, pct:-35.34 },
  { name:'中信關鍵半導體', tag:'ETF', shares:1000, avg:15.97, trades:13, out:15983, income:1730, price:33.88, mv:33880, pnl:19496, pct:121.98 },
  { name:'中信金', tag:'個股', shares:1000, avg:37.72, trades:9, out:39983, income:7351, price:66.50, mv:66500, pnl:33611, pct:84.06 },
  { name:'中信中國高股息', tag:'ETF', shares:2020, avg:12.68, trades:62, out:50737, income:28057, price:14.90, mv:30098, pnl:7302, pct:14.39 },
  { name:'大華優利高填息', tag:'ETF', shares:5480, avg:20.69, trades:1, out:113388, income:20034, price:33.79, mv:185169, pnl:91101, pct:80.34 },
  { name:'三商壽', tag:'個股', shares:4310, avg:6.60, trades:0, out:28456, income:0, price:9.82, mv:42324, pnl:13705, pct:48.16 },
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
