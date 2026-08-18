export default function TaiwanAINews() {
  const linkStyle = { color: 'var(--text)', textDecoration: 'none' };
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>
  );

  const twNews = [
    { title: '投信史上最大單日賣超177億 外資買超454億 三大法人合計買超291億', date: '2026-08-17', href: 'https://www.cna.com.tw/news/afe/202608170229.aspx' },
    { title: '外資連6買累計逾2515億 買超ETF與貨櫃股 長榮、陽明同步走強', date: '2026-08-17', href: 'https://www.cna.com.tw/news/afe/202608170229.aspx' },
    { title: '台股收45,857點小漲0.1% 盤中一度衝上46,189點後震盪收斂', date: '2026-08-17', href: 'https://tw.stock.yahoo.com/' },
    { title: '廣達法說：AI伺服器能見度看至2028 全年營收倍增、產能年底翻倍', date: '2026-08-13', href: 'https://news.cnyes.com/news/id/6575714' },
    { title: '廣達外資連日買超 8/17單日買超約5,525張 收333.5元漲1.83%', date: '2026-08-17', href: 'https://histock.tw/stock/chips.aspx?no=2382' },
    { title: '外資本周買超力積電逾31萬張 記憶體與AI相關仍為布局重心', date: '2026-08-15', href: 'https://udn.com/news/story/7251/9692752' },
    { title: '分析師：外資回補未集中AI主流股 期貨淨空單仍高 籌碼不宜過度樂觀', date: '2026-08-17', href: 'https://tw.stock.yahoo.com/news/%E3%80%90follow%E6%B3%95%E4%BA%BA%E3%80%91%E5%A4%96%E8%B3%87%E6%8E%83%E8%B2%A8%E5%8F%8B%E9%81%9449%E8%90%AC%E5%BC%B5%E5%B1%85%E5%86%A0%EF%BC%81%E7%8B%99%E6%AE%BA%E5%8A%9B%E7%A9%8D%E9%9B%BB68%E8%90%AC%E5%BC%B5-%E7%B5%82%E7%B5%90%E9%80%A34%E8%B2%B7-070623875.html' },
    { title: '台積電守住2400關 川湖漲停創天價 光電與航運族群撐盤', date: '2026-08-17', href: 'https://tw.stock.yahoo.com/' },
    { title: '投信大砍緯創、聯電、台積電 金融股反成投信買超主力', date: '2026-08-17', href: 'https://tw.stock.yahoo.com/' },
    { title: '英業達、仁寶等ODM近期獲外資回補 伺服器與筆電題材續受關注', date: '2026-08-15', href: 'https://udn.com/news/story/7251/9692752' },
  ];

  const aiNews = [
    { title: 'Nvidia 承諾最高約1050億美元信用／保證 支援 OpenAI 俄亥俄資料中心算力', en: 'Nvidia commits up to $105B guarantee for OpenAI Ohio data center with SoftBank', date: '2026-08-17', href: 'https://www.thestateofai.com/category/ai-industry-platforms' },
    { title: 'Anthropic 營收年化跑速傳上看約650億美元 持續擴張運算承諾', en: 'Anthropic revenue run rate tops ~$65 billion, sources say', date: '2026-08-17', href: 'https://economictimes.indiatimes.com/' },
    { title: 'Anthropic 擴大與 Google、Broadcom 合作 鎖定多 gigawatt 次世代運算', en: 'Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-gen compute', date: '2026-08-17', href: 'https://www.anthropic.com/news/google-broadcom-partnership-compute' },
    { title: 'Stripe 擬以逾70億美元收購 AI 路由閘道 OpenRouter', en: 'Stripe to acquire AI gateway OpenRouter for over $7 billion', date: '2026-08-17', href: 'https://n8nlab.io/news' },
    { title: 'OpenAI 傳解散 Preparedness 風險評估團隊 業務併入生物／網路單元', en: 'OpenAI disbands Preparedness team ahead of massive IPO', date: '2026-08-17', href: 'https://n8nlab.io/news' },
    { title: 'xAI Grok 4.6 上架 GitHub Copilot 多 IDE 可選用', en: 'xAI Grok 4.6 reaches GitHub Copilot across multiple IDE surfaces', date: '2026-08-17', href: 'https://ai2india.com/ai-today/' },
    { title: 'Google 推出 Gemini 3.7 Flash 主打 coding／agent 並祭出導入價', en: 'Google launches Gemini 3.7 Flash for coding and agents with introductory pricing', date: '2026-08-14', href: 'https://ai2india.com/ai-today/' },
    { title: 'DeepSeek V4-Pro 全面上市 具備 agent 能力與長上下文', en: 'DeepSeek V4-Pro reaches general availability with agent capabilities', date: '2026-08-12', href: 'https://opendatascience.com/last-week-in-ai-news-august-10-16/' },
    { title: 'Anthropic 對新 Claude 文字導入 SynthID 浮水印 因應歐盟 AI 法案', en: 'Anthropic implements SynthID-Text watermarking on new Claude text globally', date: '2026-08-14', href: 'https://ai2india.com/ai-today/' },
    { title: 'OpenAI 與 Anthropic 商業模式趨同：營收衝高、企業與消費雙軌並進', en: 'OpenAI and Anthropic are racing to become the same company', date: '2026-08-16', href: 'https://www.thestateofai.com/category/ai-industry-platforms' },
  ];

  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">今日核心趨勢：AI 基建與營收規模持續膨脹（Nvidia／OpenAI 算力、Anthropic 營收與 gigawatt 合作），台股則呈現外資買、投信大賣的籌碼分歧。</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{marginBottom:10}}>彙整時間：2026/08/18 ・ 約 10 則</p>
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
        <p className="mr-note" style={{marginBottom:10}}>彙整時間：2026/08/18 ・ 約 10 則（中英文標題・可點原文）</p>
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
            <strong>今日一句話：</strong>全球 AI 算力與營收敘事仍強，但台股籌碼呈現「外資買、投信大賣」，AI 供應鏈宜看長做短、留意整理。<br/><br/>
            <strong>台股籌碼：</strong>8/17 三大法人合計買超約 291 億，外資買超約 454 億、投信賣超約 177 億（史上單日高檔）。指數收 45,857 點（+0.10%）。外資買盤偏 ETF／貨櫃，分析師提醒未明顯集中 AI 主流股，且期貨淨空單仍高，短線不宜過度樂觀。<br/><br/>
            <strong>對你持股的意涵：</strong><br/>
            • <strong>台積電</strong>：守住 2400 關，中長期受 AI 算力擴張（Nvidia／OpenAI／Anthropic gigawatt）支撐，短線隨大盤震盪。<br/>
            • <strong>廣達、英業達、技嘉</strong>：廣達法說能見度至 2028、產能倍增；外資對廣達近幾日偏買。AI 伺服器需求敘事仍在，但需留意法人輪動與大盤整理。<br/>
            • <strong>智原、材料-KY、中信關鍵半導體</strong>：受惠先進製程與 AI 供應鏈題材，與美股費半／AI 基建新聞連動較高。<br/>
            • <strong>金融股（中信金、玉山金、凱基金等）</strong>：投信偏買金融、外資調節部分金控股，短線波動可能加大。<br/>
            • <strong>長榮</strong>：外資買超貨櫃股，航運族群有資金關注，但與 AI 主線相關性較低。<br/><br/>
            以上為依公開資訊之綜合整理，非投資建議。請以即時報價與自身風險承受度為準。
          </p>
          <p className="mr-note" style={{marginTop:12,marginBottom:0,fontSize:11}}>分析時間：2026/08/18</p>
        </div>
      </section>
    </div>
  );
}
