const marketReportMeta={dataDate:'2026/08/20',updateNote:'資料日期 2026/08/20 收盤・大盤／類股／上市櫃法人已更新；美股已更新至 8/20 收盤'};
const marketOverview={taiex:{label:'加權指數 TAIEX',value:'44,933.74',change:'+214.39 (+0.48%)',direction:'up'},tpex:{label:'櫃買指數 TPEx',value:'389.96',change:'+5.17 (+1.34%)',direction:'up'},volume:'7,929.62 億元',up:778,down:228,flat:59};
const sectorPerformance={gainers:[{name:'油電燃氣類指數',pct:'+3.62%'},{name:'水泥類指數',pct:'+2.67%'},{name:'航運類指數',pct:'+2.48%'},{name:'紡織纖維類指數',pct:'+2.29%'},{name:'建材營造類指數',pct:'+2.11%'}],losers:[{name:'電腦及週邊設備類指數',pct:'-1.67%'},{name:'綠能環保類指數',pct:'-1.00%'},{name:'金融保險類指數',pct:'-0.66%'},{name:'數位雲端類指數',pct:'-0.34%'}]};
const institutionalTWSE={date:'2026/08/20',rows:[{name:'自營商(自行買賣)',buy:'66.6 億元',sell:'88.5 億元',net:'-21.9 億元',neg:true},{name:'自營商(避險)',buy:'248.8 億元',sell:'288.0 億元',net:'-39.2 億元',neg:true},{name:'投信',buy:'223.2 億元',sell:'235.3 億元',net:'-12.1 億元',neg:true},{name:'外資及陸資(不含自營商)',buy:'3,314.4 億元',sell:'3,276.6 億元',net:'+37.8 億元',neg:false},{name:'外資自營商',buy:'0 億元',sell:'0 億元',net:'+0 億元',neg:false},{name:'合計',buy:'3,853.0 億元',sell:'3,888.4 億元',net:'-35.4 億元',neg:true}],note:'上市三大法人 8/20 合計賣超 35.4 億元。外資轉買超 37.8 億，投信與自營商續賣。櫃買三大法人合計賣超 39.1 億。'};
const institutionalTPEx={date:'2026/08/20',rows:[{name:'外資及陸資合計',buy:'564.6 億元',sell:'590.8 億元',net:'-26.2 億元',neg:true},{name:'投信',buy:'46.9 億元',sell:'45.8 億元',net:'+1.1 億元',neg:false},{name:'自營商合計',buy:'44.0 億元',sell:'58.1 億元',net:'-14.0 億元',neg:true},{name:'三大法人合計*',buy:'655.6 億元',sell:'694.7 億元',net:'-39.1 億元',neg:true}]};
const globalMarkets=[{id:'dow',label:'道瓊工業・2026-08-20',value:'52,759.21',change:'-1.32%',direction:'down'},{id:'sp500',label:'S&P 500・2026-08-20',value:'7,641.16',change:'-0.87%',direction:'down'},{id:'nasdaq',label:'Nasdaq・2026-08-20',value:'26,067.17',change:'-1.00%',direction:'down'},{id:'sox',label:'費城半導體・2026-08-20',value:'約 11,800',change:'+0.53%',direction:'up'},{id:'nikkei',label:'日經225・2026-08-20',value:'66,216.79',change:'+1.36%',direction:'up'},{id:'kospi',label:'KOSPI・2026-08-20',value:'6,852.58',change:'+5.89%',direction:'up'},{id:'usd',label:'美元指數・2026-08-20',value:'98.70',change:'-0.13%',direction:'down'},{id:'usdtwd',label:'美元/新台幣',value:'31.93',change:'約平盤',direction:'up'}];
const technicalOverview={note:'依 2026-08-20 收盤後四項條件（股價 vs MA20、MA20 vs MA60、近5日動能、量比）重新分類',columns:[
{id:'add',title:'加碼 (5)',color:'green',items:[{name:'潤隆',score:'4'},{name:'遠東銀',score:'4'},{name:'海悅',score:'4'},{name:'長榮',score:'4'},{name:'三商壽',score:'4'}]},
{id:'hold',title:'續抱 (7)',color:'teal',items:[
{name:'大華優利高填息',score:'1'},{name:'統一台灣高息動能',score:'1'},{name:'國票金',score:'1'},
{name:'材料-KY',score:'0'},{name:'王品',score:'0'},{name:'中鴻',score:'1'},{name:'福邦證',score:'0'}
]},
{id:'watch',title:'觀望 (9)',color:'yellow',grouped:true,groups:[
{industry:'金融／保險',items:[{name:'玉山金',score:'-1'},{name:'群益證',score:'-1'}]},
{industry:'電子／半導體',items:[{name:'台積電',score:'-2'},{name:'廣達',score:'-1'},{name:'原相',score:'-1'}]},
{industry:'ETF／基金',items:[{name:'群益台灣精選高息',score:'0'},{name:'主動野村台灣優選',score:'-1'},{name:'元大台灣價值高息',score:'-1'},{name:'群益ESG投等債20+',score:'-2'}]}
]},
{id:'reduce',title:'減碼 (11)',color:'red',items:[
{name:'智原',score:'-4'},{name:'復華台灣科技優息',score:'-4'},{name:'英業達',score:'-4'},{name:'奕力-KY',score:'-4'},
{name:'華票',score:'-3'},{name:'凱基金',score:'-2'},{name:'技嘉',score:'-2'},{name:'技宸',score:'-3'},
{name:'中信關鍵半導體',score:'-3'},{name:'中信金',score:'-2'},{name:'中信中國高股息',score:'-3'}
]}
]};

export default function MarketReport() {
  const { taiex, tpex, volume, up, down, flat } = marketOverview;
  return (
    <div className="market-report">
      <h1 className="main-title">台股每日市場報告</h1>
      <p className="subtitle">{marketReportMeta.updateNote}</p>
      <section className="mr-section">
        <h2 className="mr-section-title">1. 台股市場概況</h2>
        <div className="index-row">
          <div className="index-card"><div className="label">{taiex.label}</div><div className={`value change ${taiex.direction}`}>{taiex.value}</div><div className={`change ${taiex.direction}`}>{taiex.change}</div></div>
          <div className="index-card"><div className="label">{tpex.label}</div><div className={`value change ${tpex.direction}`}>{tpex.value}</div><div className={`change ${tpex.direction}`}>{tpex.change}</div></div>
        </div>
        <div className="mr-stats-row">
          <div className="mr-stat">上市成交金額 <strong>{volume}</strong></div>
          <div className="mr-stat">上漲 <strong className="up">{up}</strong> 家</div>
          <div className="mr-stat">下跌 <strong className="down">{down}</strong> 家</div>
          <div className="mr-stat">平盤 <strong>{flat}</strong> 家</div>
        </div>
        <div className="mr-sectors">
          <div className="mr-sector-col"><div className="mr-sector-head gain">漲幅前五</div>{sectorPerformance.gainers.map(s=><div key={s.name} className="mr-sector-row"><span>{s.name}</span><span className="up">{s.pct}</span></div>)}</div>
          <div className="mr-sector-col"><div className="mr-sector-head loss">跌幅前五</div>{sectorPerformance.losers.map(s=><div key={s.name} className="mr-sector-row"><span>{s.name}</span><span className="down">{s.pct}</span></div>)}</div>
        </div>
      </section>
      <section className="mr-section">
        <h2 className="mr-section-title">2. 三大法人買賣超</h2>
        <h3 className="mr-sub">上市三大法人 ({institutionalTWSE.date})</h3>
        <div className="mr-table-wrap"><table className="mr-table"><thead><tr><th></th><th>買進</th><th>賣出</th><th>買賣超</th></tr></thead><tbody>{institutionalTWSE.rows.map(r=><tr key={r.name}><td>{r.name}</td><td>{r.buy}</td><td>{r.sell}</td><td className={r.neg?'down':'up'}>{r.net}</td></tr>)}</tbody></table></div>
        <h3 className="mr-sub">上櫃三大法人 ({institutionalTPEx.date})</h3>
        <div className="mr-table-wrap"><table className="mr-table"><thead><tr><th></th><th>買進</th><th>賣出</th><th>買賣超</th></tr></thead><tbody>{institutionalTPEx.rows.map(r=><tr key={r.name}><td>{r.name}</td><td>{r.buy}</td><td>{r.sell}</td><td className={r.neg?'down':'up'}>{r.net}</td></tr>)}</tbody></table></div>
        <p className="mr-note">{institutionalTWSE.note}</p>
      </section>
      <section className="mr-section">
        <h2 className="mr-section-title">3. 國際市場</h2>
        <div className="us-markets mr-global">{globalMarkets.map(m=><div key={m.id} className="us-card"><div className="label">{m.label}</div><div className={`value change ${m.direction}`}>{m.value}</div><div className={`change ${m.direction}`}>{m.change}</div></div>)}</div>
      </section>
      <section className="mr-section">
        <h2 className="mr-section-title">4. 持股技術面總覽</h2>
        <p className="mr-note">{technicalOverview.note}</p>
        <div className="mr-tech-grid">
          {technicalOverview.columns.map(col => (
            <div key={col.id} className={`mr-tech-col ${col.color}`}>
              <div className="mr-tech-head">{col.title}</div>
              {col.grouped ? (
                col.groups.map(g => (
                  <div key={g.industry} className="mr-tech-group">
                    <div className="mr-tech-industry">{g.industry}</div>
                    {g.items.map(item => (
                      <div key={item.name} className="mr-tech-item">
                        <span>{item.name}</span>
                        <span className="score">{item.score}</span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                col.items.map(item => (
                  <div key={item.name} className="mr-tech-item">
                    <span>{item.name}</span>
                    <span className="score">{item.score}</span>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
