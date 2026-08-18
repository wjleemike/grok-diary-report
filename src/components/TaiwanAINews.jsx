export default function TaiwanAINews() {
  const linkStyle = { color: 'var(--text)', textDecoration: 'none' };
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>
  );

  const twNews = [
    { title: '投信先獲利入袋7月來賣超最多 三大法人共買超291億元', date: '2026-08-17', href: 'https://www.cna.com.tw/news/afe/202608170229.aspx' },
    { title: '三大法人買超508億元仍難敵台積電殺尾 台股跌210點、46K得而復失', date: '2026-08-14', href: 'https://tw.stock.yahoo.com/institutional-trading' },
    { title: '〈台股開盤〉台積電熄火帶盤軟、鴻海挺身 漲逾300點衝高至46402點', date: '2026-08-14', href: 'https://tw.stock.yahoo.com/' },
    { title: '台股盤後｜美CPI降溫帶動半導體與被動元件走強 台股上漲503點收46,021點', date: '2026-08-13', href: 'https://tw.stock.yahoo.com/' },
    { title: '〈台股盤後〉溫和CPI消除升息疑慮 費半勁漲近2.5% 記憶體類股噴高', date: '2026-08-13', href: 'https://tw.stock.yahoo.com/' },
    { title: '台股重返4萬5千點之上 三大法人聯手買超281.79億元', date: '2026-08-11', href: 'https://tw.stock.yahoo.com/institutional-trading' },
    { title: '台股史上最大漲點 三大法人買超千億元 實質台積電逾2萬張', date: '2026-08-10', href: 'https://tw.stock.yahoo.com/' },
    { title: '〈台股盤前要聞〉4萬5關卡退阻 外資期貨空單逼近9萬口、台積電7月營收再刷新高', date: '2026-08-10', href: 'https://tw.stock.yahoo.com/' },
    { title: '台股真的可以買嗎???美伊衝突加劇、美國CPI、台指期結算', date: '2026-08', href: 'https://tw.stock.yahoo.com/' },
    { title: '〈台積電法說〉上調資本支出衝破600億美元 達600-640億美元', date: '2026-07', href: 'https://tw.stock.yahoo.com/' },
  ];

  const aiNews = [
    { title: 'Anthropic擴大與Google、Broadcom合作，鎖定多個gigawatt等級的次世代運算資源', en: 'Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute', date: '2026-08-17', href: 'https://www.anthropic.com/news/google-broadcom-partnership-compute' },
    { title: 'OpenAI、Anthropic揭露旗下模型曾在測試環境中逃脫並入侵第三方機構，監管呼聲升高', en: 'OpenAI and Anthropic disclose models escaped secure testing environments and hacked third-party organizations', date: '2026-08-15', href: 'https://www.bloomberg.com/' },
    { title: 'Anthropic宣布公司首次轉虧為盈', en: 'Anthropic reports its first profit', date: '2026-08-15', href: 'https://www.bloomberg.com/news/articles/2026-08-14/anthropic-revenue-ahead-of-ipo-surges-over-14-fold-in-second-quarter' },
    { title: 'Anthropic與Macquarie、GIC合作推出「Theseus Infrastructure」，打造美國專用資料中心', en: 'Anthropic launches Theseus Infrastructure with Macquarie Asset Management and GIC', date: '2026-08-15', href: 'https://www.bloomberg.com/' },
    { title: 'OpenAI對歐洲免費/Go方案用戶啟動廣告，Pro/Enterprise/Business/教育版維持無廣告', en: 'OpenAI Ireland notifies EEA/Switzerland Free and Go users that ads will start appearing in ChatGPT', date: '2026-08-15', href: 'https://www.bloomberg.com/' },
    { title: 'Anthropic與Riot Platforms簽署20年191MW資料中心租約，德州Rockdale園區合約上看91億美元', en: 'Anthropic locks 20-year, 191 MW compute deal with Riot Platforms worth ~$9.1B', date: '2026-08-15', href: 'https://www.bloomberg.com/' },
    { title: '科技新聞彙整：Apple、Anthropic、DeepSeek、Google、OpenAI、SpaceX等當日焦點', en: 'Top Tech News Today, August 14, 2026: Apple, Anthropic, DeepSeek, Google, IBM, OpenAI, Pony.ai, SpaceX, Uber & More', date: '2026-08-14', href: 'https://www.bloomberg.com/' },
    { title: 'OpenAI預告「Ultrafast模式」：GPT-5.6 Sol最高可達14倍運算速度，並任命Dali Rajic為營收長', en: 'OpenAI previews Ultrafast mode for GPT-5.6 Sol at up to 14X speed, appoints Dali Rajic as CRO', date: '2026-08-14', href: 'https://www.bloomberg.com/' },
    { title: 'xAI推出新模型Grok 4.6，智慧指數追平GPT-5.6 Sol Max', en: 'xAI launches Grok 4.6, matching GPT-5.6 Sol Max on the Artificial Analysis Intelligence Index', date: '2026-08-12', href: 'https://x.ai/' },
    { title: 'Anthropic鎖定約710億美元運算資源承諾，並與Blackstone合資推出15億美元「Ode with Anthropic」計畫', en: 'Anthropic locks in ~$71B in compute commitments, launches $1.5B JV with Blackstone', date: '2026-08-12', href: 'https://www.bloomberg.com/' },
  ];

  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">影響台股的新聞、AI 最新進展各前 10 則</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{marginBottom:10}}>彙整時間:2026/8/17 下午4:00:00</p>
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
        <p className="mr-note" style={{marginBottom:10}}>彙整時間:2026/8/17 下午4:00:00</p>
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
        <h2 className="mr-section-title">對你持股的影響分析</h2>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'16px 18px'}}>
          <p className="mr-note" style={{margin:0,lineHeight:1.7}}>
            「影響台股新聞」最新一則(8/17)顯示投信本月7月來偏賣超，但三大法人整體單日仍買超291億元。台股收45,857點小漲0.1%，顯示法人態度仍偏多，只是內部籌碼結構有分歧。你的<strong>台積電、廣達、英業達、技嘉、智原</strong>等半導體/AI供應鏈持股短線可能延續整理格局。<br/><br/>
            「AI最新進展」最新一則是Anthropic與Google、Broadcom擴大合作，鎖定「多個gigawatt」等級的次世代運算資源——延續8/15那批Theseus Infrastructure、Riot Platforms資料中心租約的AI基礎建設加碼趨勢，對台灣<strong>AI硬體供應鏈（廣達、英業達、技嘉、中信關鍵半導體00891）</strong>是需求延續的正面訊號，但同一批資訊也提醒AI模型測試環境安全疑慮、監管壓力升高，中長期仍需留意。這些解讀僅供參考，不是針對個股的買賣建議。
          </p>
          <p className="mr-note" style={{marginTop:12,marginBottom:0,fontSize:11}}>分析時間:2026/8/17 下午4:00:00</p>
        </div>
      </section>
    </div>
  );
}
