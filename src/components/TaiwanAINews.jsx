export default function TaiwanAINews() {
  const linkStyle = { color: 'var(--text)', textDecoration: 'none' };
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>
  );

  const twNews = [
    { title: '台股收 45,308.68 點跌 548.59 點（-1.20%） 成交約 9,584 億 半導體與記憶體承壓', date: '2026-08-18', href: 'https://focustaiwan.tw/business/202608180017' },
    { title: '美股費半重挫近 5% 台指期夜盤失守 45K 跌約 500～560 點 開盤恐再挫', date: '2026-08-18', href: 'https://udn.com/news/story/7255/9699710' },
    { title: '台積電收 2,380 元跌 0.83% 聯發科跌逾 4% 記憶體相關股普遍走弱', date: '2026-08-18', href: 'https://www.taiwannews.com.tw/en/news/6423533' },
    { title: '三大法人 8/18 合計賣超約 257 億 外資賣超約 120 億、自營商賣超約 176 億', date: '2026-08-18', href: 'https://tw.news.yahoo.com/' },
    { title: '外資期貨淨空單仍高 約 8.3 萬口 籌碼面偏空', date: '2026-08-18', href: 'https://www.cna.com.tw/news/afe/202608180156.aspx' },
    { title: '廣達法說：AI 伺服器能見度看至 2028 全年營收倍增、產能年底翻倍', date: '2026-08-13', href: 'https://news.cnyes.com/news/id/6575714' },
    { title: '美債 30 年殖利率創 19 年高 全球債券賣壓拖累成長股與科技股評價', date: '2026-08-18', href: 'https://www.bloomberg.com/' },
    { title: '荷莫茲海峽緊張 油價走高 通膨與風險溢價再起', date: '2026-08-18', href: 'https://www.cnn.com/business' },
    { title: 'Meta 成癮訴訟開庭 科技監管風險升溫', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments' },
    { title: 'Anthropic 預 IPO 信貸額度上看逾 100 億 長期 AI 算力需求敘事仍在', date: '2026-08-18', href: 'https://www.bloomberg.com/news/articles/2026-08-18/anthropic-pre-ipo-credit-facility-set-to-climb-past-10-billion' },
  ];

  const aiNews = [
    { title: 'Anthropic 預 IPO 信貸額度上看逾 100 億美元 為上市做準備', en: 'Anthropic pre-IPO credit facility set to climb past $10 billion', date: '2026-08-18', href: 'https://www.bloomberg.com/news/articles/2026-08-18/anthropic-pre-ipo-credit-facility-set-to-climb-past-10-billion' },
    { title: 'Anthropic 營收年化跑速傳上看約 650 億美元 持續擴張運算承諾', en: 'Anthropic revenue run rate tops ~$65 billion, sources say', date: '2026-08-17', href: 'https://www.bloomberg.com/' },
    { title: 'OpenAI 推出 ChatGPT for Teens 加強未成年防護與家長控制', en: 'OpenAI builds dedicated ChatGPT experience for teens with parental controls', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens' },
    { title: 'Google 收購 Spirit Airlines 全部資料餵養 AI 模型', en: 'Google is buying all of Spirit Airlines’ data to feed its AI models', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/business/google-spirit-airlines-data' },
    { title: 'Nvidia 等大型 AI 基建敘事仍在 但短線受公債殖利率與評價壓力', en: 'AI infrastructure narrative intact but rates weigh on growth stocks', date: '2026-08-18', href: 'https://www.bloomberg.com/' },
    { title: '記憶體與儲存股重挫 費半大跌近 5% 反映 AI 供應鏈短線獲利了結', en: 'Memory and storage stocks lead semiconductor selloff, SOX down ~5%', date: '2026-08-18', href: 'https://www.reuters.com/business/us-stock-futures-drop-fading-iran-peace-hopes-lift-oil-bond-yields-2026-08-18/' },
    { title: 'David Malpass 警告 AI 循環性與美債風險', en: 'David Malpass warns of AI circularity and rising US debt', date: '2026-08-18', href: 'https://www.foxbusiness.com/category/markets' },
    { title: 'Meta 面臨州檢察長成癮訴訟 科技監管風險升溫', en: 'States seek damages from Meta over child social media addiction claims', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments' },
    { title: '全球公債大賣壓 30 年美債殖利率創 19 年高 壓抑成長股評價', en: '30-year Treasury yield hits highest since 2007 amid global bond rout', date: '2026-08-18', href: 'https://www.bloomberg.com/' },
    { title: 'AI 財富推升舊金山房市 加價百萬搶購潮延續', en: 'AI wealth fueling housing market frenzy in San Francisco', date: '2026-08-17', href: 'https://www.cnn.com/2026/08/17/economy/sf-real-estate-ai-wealth' },
  ];

  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">今日核心趨勢：美股科技股與費半重挫、美債殖利率創多年高點，台指期夜盤失守 45K；長線 AI 算力與營收敘事仍在，但短線籌碼與評價壓力升溫。</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{marginBottom:10}}>彙整時間：2026/08/19 ・ 約 10 則</p>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead>
              <tr>
                <th style={{textAlign:'left'}}>標題</th>
                <th style={{width:110}}>發布時間</th>
              </tr>
            </thead>
            <tbody>
              {twNews.map((n, i) => (
                <tr key={i}>
                  <td style={{textAlign:'left'}}><A href={n.href}>{n.title}</A></td>
                  <td>{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{marginBottom:10}}>彙整時間：2026/08/19 ・ 約 10 則（中英文標題・可點原文）</p>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead>
              <tr>
                <th style={{textAlign:'left'}}>標題</th>
                <th style={{width:110}}>發布時間</th>
              </tr>
            </thead>
            <tbody>
              {aiNews.map((n, i) => (
                <tr key={i}>
                  <td style={{textAlign:'left'}}>
                    <A href={n.href}>{n.title}</A>
                    {n.en && <div style={{fontSize:11,color:'var(--dim)',marginTop:2}}>{n.en}</div>}
                  </td>
                  <td>{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'16px 18px'}}>
          <p className="mr-note" style={{margin:0,lineHeight:1.75}}>
            <strong>今日一句話：</strong>美股科技股與費半重挫、美債殖利率創多年高點，台指期夜盤失守 45K，短線半導體與 AI 供應鏈承壓；長線 AI 算力與營收敘事（Anthropic／OpenAI）仍在，宜控風險、看長做短。<br/><br/>
            <strong>台股籌碼與盤勢：</strong>8/18 台股收 45,308.68 點（-1.20%），三大法人合計賣超約 257 億；夜盤台指期跌約 500～560 點、失守 45,000 點。外資期貨淨空單仍高，籌碼偏空。<br/><br/>
            <strong>對你持股的意涵：</strong><br/>
            • <strong>台積電</strong>：受費半與 ADR 連動壓力，短線震盪加大；中長期仍受 AI 算力擴張支撐。<br/>
            • <strong>廣達、英業達、技嘉</strong>：AI 伺服器能見度與法說題材仍在，但短線受美股科技股情緒拖累，宜留意整理。<br/>
            • <strong>智原、材料-KY、中信關鍵半導體</strong>：與費半／半導體循環高度連動，短線波動放大。<br/>
            • <strong>金融股（中信金等）</strong>：美債殖利率走高對利差有雙面影響，風險偏好下降時波動可能加大。<br/>
            • <strong>長榮</strong>：油價上漲對成本與運價有雙面影響，與 AI 主線相關性較低。<br/><br/>
            以上為依公開資訊之綜合整理，非投資建議。請以即時報價與自身風險承受度為準。
          </p>
          <p className="mr-note" style={{marginTop:12,marginBottom:0,fontSize:11}}>分析時間：2026/08/19</p>
        </div>
      </section>
    </div>
  );
}
