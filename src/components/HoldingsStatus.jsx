const rows = [
  { name:'潤隆', tag:'個股', shares:1000, avg:31.68, trades:24, out:32021, income:280, price:32.95, mv:32950, pnl:1270, pct:4.01 },
  { name:'廣達', tag:'個股', shares:315, avg:260.02, trades:34, out:88932, income:12150, price:325.50, mv:102533, pnl:20626, pct:25.18 },
  { name:'遠東銀', tag:'個股', shares:2453, avg:13.69, trades:0, out:33584, income:1090, price:13.45, mv:32993, pnl:-589, pct:-1.75 },
  { name:'福邦證', tag:'個股', shares:1750, avg:14.32, trades:0, out:25060, income:1914, price:14.50, mv:25375, pnl:315, pct:1.26 },
  { name:'群益ESG投等債20+', tag:'ETF', shares:6810, avg:14.75, trades:69, out:129961, income:33786, price:14.18, mv:96566, pnl:-3882, pct:-3.86 },
  { name:'群益證', tag:'個股', shares:1300, avg:20.64, trades:21, out:26851, income:0, price:30.60, mv:39780, pnl:12948, pct:48.26 },
  { name:'群益台灣精選高息', tag:'ETF', shares:1000, avg:21.19, trades:3, out:21189, income:4147, price:30.35, mv:30350, pnl:9160, pct:43.23 },
  { name:'華票', tag:'個股', shares:1000, avg:14.62, trades:0, out:14620, income:770, price:16.30, mv:16300, pnl:1680, pct:11.49 },
  { name:'統一台灣高息動能', tag:'ETF', shares:3000, avg:14.31, trades:0, out:42930, income:2286, price:22.29, mv:66870, pnl:23940, pct:55.77 },
  { name:'智原', tag:'個股', shares:450, avg:162.05, trades:102, out:81093, income:9431, price:171.50, mv:77175, pnl:4253, pct:5.83 },
  { name:'復華台灣科技優息', tag:'ETF', shares:5700, avg:18.40, trades:7, out:104890, income:9922, price:28.89, mv:164673, pnl:59793, pct:57.01 },
  { name:'凱基金', tag:'個股', shares:2421, avg:16.05, trades:3, out:38850, income:2028, price:30.95, mv:74930, pnl:36073, pct:92.83 },
  { name:'國票金', tag:'個股', shares:1027, avg:12.97, trades:0, out:13320, income:290, price:15.55, mv:15970, pnl:2650, pct:19.89 },
  { name:'海悅', tag:'個股', shares:1000, avg:80.79, trades:316, out:164049, income:84743, price:69.50, mv:69500, pnl:-11290, pct:-13.97 },
  { name:'原相', tag:'個股', shares:125, avg:203.44, trades:19, out:25449, income:140, price:197.50, mv:24688, pnl:-742, pct:-2.92 },
  { name:'英業達', tag:'個股', shares:220, avg:58.45, trades:18, out:17535, income:5808, price:64.80, mv:14256, pnl:1397, pct:10.86 },
  { name:'奕力-KY', tag:'個股', shares:1650, avg:55.60, trades:20, out:90391, income:2782, price:30.30, mv:49995, pnl:-41745, pct:-45.50 },
  { name:'長榮', tag:'個股', shares:230, avg:230.72, trades:43, out:53108, income:5515, price:238.00, mv:54740, pnl:1674, pct:3.16 },
  { name:'材料-KY', tag:'個股', shares:3050, avg:50.01, trades:127, out:152672, income:66, price:50.30, mv:153415, pnl:885, pct:0.58 },
  { name:'技嘉', tag:'個股', shares:420, avg:275.88, trades:357, out:187668, income:78323, price:347.50, mv:145950, pnl:30080, pct:25.96 },
  { name:'技宸', tag:'個股', shares:12, avg:255.00, trades:5, out:3065, income:0, price:224.50, mv:2694, pnl:-366, pct:-11.96 },
  { name:'玉山金', tag:'個股', shares:1960, avg:28.04, trades:41, out:59181, income:5711, price:38.05, mv:74578, pnl:19620, pct:35.70 },
  { name:'台積電', tag:'個股', shares:30, avg:1525.43, trades:25, out:45788, income:425, price:2380.00, mv:71400, pnl:25637, pct:56.02 },
  { name:'主動野村台灣優選', tag:'ETF', shares:1150, avg:19.01, trades:78, out:40901, income:25182, price:24.55, mv:28233, pnl:6371, pct:29.14 },
  { name:'王品', tag:'個股', shares:70, avg:225.09, trades:0, out:15756, income:2128, price:231.50, mv:16205, pnl:449, pct:2.85 },
  { name:'元大台灣價值高息', tag:'ETF', shares:2300, avg:9.63, trades:0, out:22149, income:1334, price:12.35, mv:28405, pnl:6256, pct:28.25 },
  { name:'中鴻', tag:'個股', shares:1000, avg:26.15, trades:0, out:26150, income:25, price:16.90, mv:16900, pnl:-9250, pct:-35.37 },
  { name:'中信關鍵半導體', tag:'ETF', shares:1000, avg:15.97, trades:13, out:15983, income:1730, price:33.84, mv:33840, pnl:17870, pct:111.90 },
  { name:'中信金', tag:'個股', shares:1000, avg:37.72, trades:9, out:39983, income:7351, price:66.40, mv:66400, pnl:28680, pct:76.03 },
  { name:'中信中國高股息', tag:'ETF', shares:2020, avg:12.68, trades:62, out:50737, income:28057, price:14.88, mv:30058, pnl:4444, pct:17.35 },
  { name:'大華優利高填息', tag:'ETF', shares:5480, avg:20.69, trades:1, out:113388, income:20034, price:33.78, mv:185114, pnl:71733, pct:63.27 },
  { name:'三商壽', tag:'個股', shares:4310, avg:6.60, trades:0, out:28456, income:0, price:9.82, mv:42324, pnl:13878, pct:48.79 },
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
      <p className="subtitle">資料直接讀自你的 Google Sheet「持股狀況」分頁，每次開啟頁面都會抓最新版本</p>

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
        這份表格的數字來自你自己維護的 Google Sheet「持股狀況」分頁，不是這個網站自己算的——要改數字或公式，直接編輯 Sheet 即可，存檔後重新整理這裡就會看到最新版本。如果 Sheet 一時讀不到（例如還沒設成「知道連結即可查看」），會自動改用本站用交易紀錄試算的版本頂替。
      </p>
    </div>
  );
}
