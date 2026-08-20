const marketReportMeta={dataDate:'2026/08/19',updateNote:'資料日期 2026/08/19 收盤・大盤已更新；國際市場已更新至 8/19 美股收盤；法人表仍為 8/17 參考'};
const marketOverview={taiex:{label:'加權指數 TAIEX',value:'44,719.35',change:'-589.33 (-1.30%)',direction:'down'},tpex:{label:'櫃買指數 TPEx',value:'384.79',change:'-6.04 (-1.55%)',direction:'down'},volume:'8,478.57 億元',up:387,down:605,flat:114};
const sectorPerformance={gainers:[{name:'光電類指數',pct:'+4.86%'},{name:'航運類指數',pct:'+4.00%'},{name:'電子零組件類指數',pct:'+2.41%'},{name:'其他資產類指數',pct:'+2.22%'},{name:'造紙類指數',pct:'+1.72%'}],losers:[{name:'生技醫療類指數',pct:'-3.24%'},{name:'塑膠類指數',pct:'-2.70%'},{name:'電子通路類指數',pct:'-2.33%'},{name:'電器電纜類指數',pct:'-2.30%'},{name:'化學生技醫療類指數',pct:'-2.16%'}]};
const institutionalTWSE={date:'2026/08/17',rows:[{name:'自營商(自行買賣)',buy:'11.4 億元',sell:'78.7 億元',net:'-67.4 億元',neg:true},{name:'自營商(避險)',buy:'357.5 億元',sell:'379 億元',net:'-21.5 億元',neg:true},{name:'投信',buy:'260.9 億元',sell:'438.6 億元',net:'-177.8 億元',neg:true},{name:'外資及陸資(不含自營商)',buy:'3,696.5 億元',sell:'3,242.2 億元',net:'+454.5 億元',neg:false},{name:'外資自營商',buy:'0 億元',sell:'0 億元',net:'+0 億元',neg:false},{name:'合計',buy:'4,429.2 億元',sell:'4,138.4 億元',net:'+290.9 億元',neg:false}],note:'法人表為 8/17 參考；8/19 大盤與國際市場已更新。8/19 三大法人偏賣超約 700～750 億。'};
const institutionalTPEx={date:'2026/08/17',rows:[{name:'外資及陸資合計',buy:'497.8 億元',sell:'544.4 億元',net:'-46.6 億元',neg:true},{name:'投信',buy:'35.5 億元',sell:'48.6 億元',net:'-13.1 億元',neg:true},{name:'自營商合計',buy:'58.8 億元',sell:'57.8 億元',net:'+0.9 億元',neg:false},{name:'三大法人合計*',buy:'592 億元',sell:'650.8 億元',net:'-58.8 億元',neg:true}]};
const globalMarkets=[{id:'dow',label:'道瓊工業・2026-08-19',value:'53,463.05',change:'+0.22%',direction:'up'},{id:'sp500',label:'S&P 500・2026-08-19',value:'7,707.98',change:'+0.21%',direction:'up'},{id:'nasdaq',label:'Nasdaq・2026-08-19',value:'26,331.09',change:'+0.16%',direction:'up'},{id:'sox',label:'費城半導體・2026-08-19',value:'偏弱',change:'晶片續弱',direction:'down'},{id:'nikkei',label:'日經225・2026-08-19',value:'偏弱',change:'前日亞股承壓',direction:'down'},{id:'kospi',label:'KOSPI・2026-08-19',value:'重挫後',change:'SK海力士庫藏',direction:'down'},{id:'usd',label:'美元指數・2026-08-19',value:'三個月低',change:'殖利率回落',direction:'down'},{id:'usdtwd',label:'美元/新台幣',value:'約 31.8',change:'觀望',direction:'down'}];
const technicalOverview={note:'依 2026-08-19 收盤後綜合評估（技術燈號暫沿用前次）；夜盤已轉強，今日可觀察反彈力道',columns:[
{id:'add',title:'加碼 (1)',color:'green',items:[{name:'潤隆',score:'3'}]},
{id:'hold',title:'續抱 (13)',color:'teal',items:[
{name:'台積電',score:'2.0'},{name:'長榮',score:'1.9'},{name:'王品',score:'1.9'},
{name:'材料-KY',score:'1.7'},{name:'廣達',score:'1.6'},{name:'玉山金',score:'1.4'},
{name:'智原',score:'1.3'},{name:'奕力-KY',score:'1.3'},{name:'遠東銀',score:'1'},
{name:'統一台灣高息動能',score:'1'},{name:'凱基金',score:'1'},{name:'技嘉',score:'1'},
{name:'大華優利高填息',score:'1'}
]},
{id:'watch',title:'觀望 (17)',color:'yellow',grouped:true,groups:[
{industry:'金融／保險',items:[{name:'三商壽',score:'0.7'},{name:'國票金',score:'0.5'},{name:'華票',score:'0.3'},{name:'福邦證',score:'0.2'},{name:'中信金',score:'-0.1'},{name:'群益證',score:'-0.8'}]},
{industry:'鋼鐵',items:[{name:'中鴻',score:'0.9'}]},
{industry:'電子／半導體',items:[{name:'技宸',score:'0.4'},{name:'英業達',score:'-0.1'},{name:'原相',score:'-0.3'}]},
{industry:'營建',items:[{name:'海悅',score:'-0.3'}]},
{industry:'ETF／基金',items:[{name:'群益台灣精選高息',score:'0.3'},{name:'復華台灣科技優息',score:'0'},{name:'元大台灣價值高息',score:'-0.1'},{name:'主動野村台灣優選',score:'-0.3'},{name:'中信關鍵半導體',score:'-0.3'},{name:'群益ESG投等債20+',score:'-0.7'}]}
]},
{id:'reduce',title:'減碼 (1)',color:'red',items:[{name:'中信中國高股息',score:'-1'}]}
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
