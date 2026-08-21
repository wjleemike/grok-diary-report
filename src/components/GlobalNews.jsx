import NewsList from './NewsList.jsx';

const CNN = [
  { date: '2026/08/20', tone: 'bad', title: '美股收跌：道瓊 -1.32%、S&P -0.87%、那斯達克 -1%，油價與殖利率回升拖累', en: 'US stocks close lower as oil jumps and yields rebound', href: 'https://english.news.cn/20260821/ebb0014a97ed4b5783c1993eb1c7b964/c.html', tag: '美股' },
  { date: '2026/08/20', tone: 'bad', title: '中國限制／延遲鍺與石英等關鍵材料出口台灣，光學與半導體設備供應鏈受阻', en: 'China slows exports of germanium and quartz to Taiwan', href: 'https://asia.nikkei.com/spotlight/supply-chain/exclusive-china-slows-exports-of-key-optical-aerospace-metals-to-taiwan', tag: '供應鏈／地緣' },
  { date: '2026/08/20', tone: 'bad', title: '川普加強對伊朗經濟與石油施壓，荷莫茲爭奪仍未歇', en: 'Trump is squeezing Iran\'s economy and oil sales', href: 'https://www.cnn.com/2026/08/20/business/iran-economy-war-leverage-intl', tag: '中東／油價' },
  { date: '2026/08/20', tone: 'neutral', title: '資料中心政治化：中期選情下州長與選民對 AI 電力需求反彈', en: 'Governors races buffeted by toxic politics of data centers', href: 'https://www.latimes.com/topic/artificial-intelligence', tag: 'AI 基礎設施' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債提前觸及 40 兆美元', en: 'US debt hits $40 trillion sooner than expected', href: 'https://www.cnn.com/2026/08/19/economy/national-debt-hits-40-trillion-dollars-vis', tag: '財政' },
  { date: '2026/08/19', tone: 'good', title: 'Moderna 與 Merck 黑色素瘤 mRNA 疫苗三期試驗成功', en: 'Moderna and Merck mRNA melanoma vaccine Phase 3 success', href: 'https://www.bloomberg.com/news/articles/2026-08-19/moderna-merck-mrna-shot-helped-cut-melanoma-recurrence-in-big-trial', tag: '生技' },
  { date: '2026/08/18', tone: 'neutral', title: '川普延後對加拿大部分商品 50% 關稅', en: 'Trump postpones 50% tariff he threatened for some Canadian goods', href: 'https://www.cnn.com/2026/08/18/economy/canada-tariffs-trump', tag: '貿易' },
  { date: '2026/08/18', tone: 'bad', title: 'Meta 重回法庭，面對最大規模社群成癮訴訟', en: 'Meta heads back to the courtroom for social media addiction trial', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments', tag: '科技監管' },
  { date: '2026/08/18', tone: 'good', title: 'OpenAI 推出 ChatGPT for Teens 加強未成年防護', en: 'OpenAI introduces ChatGPT for Teens with stronger safety controls', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tag: 'AI／安全' },
  { date: '2026/08/18', tone: 'neutral', title: '亞洲科技「既競爭又合作」：誰能稱霸供應鏈', en: 'From heated rivalry to frenemies: ruling tech in Asia', href: 'https://www.cnn.com/2026/08/18/tech/asia-tech-frenemy-intl-hnk', tag: '亞洲科技' },
];


const BLOOMBERG = [
  { date: '2026/08/20', tone: 'bad', title: '阿里巴巴獲利大減 75%，AI 資本支出單季近 100 億美元', en: 'Alibaba profit falls 75% after ramping AI infrastructure spending', href: 'https://www.bloomberg.com/news/articles/2026-08-20/alibaba-s-revenue-climbs-9-in-testament-to-china-s-ai-boom', tag: '中國科技／AI' },
  { date: '2026/08/20', tone: 'good', title: '三星傳規畫逾 720 億美元股東回饋，SK 海力士同步加碼', en: 'Samsung Planning Shareholder Return of $72 Billion', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tag: '半導體' },
  { date: '2026/08/20', tone: 'good', title: 'SK 海力士與工會就薪資達成初步協議', en: 'SK Hynix Reaches Tentative Deal With Union on Wages', href: 'https://www.bloomberg.com/news/articles/2026-08-20/sk-hynix-reaches-tentative-deal-with-union-on-wages-yonhap-says', tag: '半導體' },
  { date: '2026/08/19', tone: 'good', title: '三星先進製程晶圓代工報價上調最高 15%（AI 產能吃緊）', en: 'Samsung hikes advanced chipmaking prices by up to 15%', href: 'https://www.reuters.com/business/autos-transportation/samsung-hikes-chipmaking-prices-by-up-15-demand-spike-sources-say-2026-08-19/', tag: '半導體' },
  { date: '2026/08/19', tone: 'good', title: 'Stripe 收購 OpenRouter 約 75 億美元，強化 AI token 路由與支付', en: 'Stripe buys OpenRouter for about $7.5 billion', href: 'https://www.nytimes.com/2026/08/19/business/stripe-openrouter-ai.html', tag: 'AI／支付' },
  { date: '2026/08/19', tone: 'good', title: '英國 AI 晶片新創 Fractile 在 Anthropic 訂單後估值上看 65 億美元', en: 'Fractile seeks $6.5B valuation after Anthropic deal', href: 'https://www.bloomberg.com/news/articles/2026-08-19/ai-chip-startup-fractile-in-talks-for-6-5-billion-value-after-anthropic-deal', tag: 'AI 晶片' },
  { date: '2026/08/19', tone: 'good', title: 'Marvell 給予 Google 最高 122 億美元持股認購權', en: 'Marvell Gives Google Right to Buy $12.2 Billion Stock', href: 'https://www.bloomberg.com/news/articles/2026-08-19/marvell-gives-google-right-to-buy-up-to-12-2-billion-in-shares', tag: '半導體' },
  { date: '2026/08/19', tone: 'good', title: 'SK 海力士宣布約 290 億美元庫藏股並註銷', en: 'SK Hynix Moves to Calm Market With $29 Billion Share Buyback', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tag: '半導體' },
  { date: '2026/08/19', tone: 'bad', title: 'UAE 切斷與伊朗經貿往來', en: 'UAE Cuts Economic Ties With Iran', href: 'https://www.bloomberg.com/news/articles/2026-08-19/uae-cuts-economic-ties-with-iran-after-missiles-target-territory', tag: '地緣' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債突破 40 兆美元歷史新高', en: 'US Public Debt Hits $40 Trillion', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tag: '財政' },
];


const FOX = [
  { date: '2026/08/20', tone: 'bad', title: '美股收黑：Walmart 拖累消費股，長債殖利率回升', en: 'Stocks fall as yields rebound and Walmart weighs', href: 'https://wtop.com/news/2026/08/how-major-us-stock-indexes-fared-thursday-8-20-2026/', tag: '美股' },
  { date: '2026/08/19', tone: 'neutral', title: '川普延後對加拿大 50% 關稅，稱達成潛在協議', en: 'Trump pauses 50% tariffs on Canada', href: 'https://www.foxbusiness.com/politics/trump-pauses-50-tariffs-canada-hours-before-deadline-after-announcing-new-deal', tag: '貿易' },
  { date: '2026/08/19', tone: 'bad', title: '長債殖利率創多年新高，國債壓力顯現', en: 'Treasury yields hit multi-decade highs', href: 'https://www.foxbusiness.com/economy/treasury-yields-hit-multi-decade-highs-amid-surging-national-debt', tag: '利率' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債首度突破 40 兆美元', en: 'US national debt hits $40 trillion', href: 'https://www.foxbusiness.com/economy/us-national-debt-tracker', tag: '財政' },
  { date: '2026/08/19', tone: 'bad', title: 'Meta 被州檢察長指控針對青少年成癮設計', en: 'States accuse Meta of targeting children', href: 'https://www.foxbusiness.com/politics/states-accuse-meta-targeting-children-facebook-instagram-addiction-the-young-ones-best-ones', tag: '科技監管' },
  { date: '2026/08/19', tone: 'good', title: 'Costco 進軍高齡醫療，與 Medicare 合作', en: 'Costco plots major expansion into senior healthcare', href: 'https://www.foxbusiness.com/retail/costco-plots-major-expansion-senior-healthcare-medicare-partnership', tag: '零售' },
  { date: '2026/08/19', tone: 'good', title: '哈佛豪賭 SpaceX：大舉投資約 22 億美元', en: 'Harvard makes massive $2.2B SpaceX bet', href: 'https://www.foxbusiness.com/markets/harvard-makes-massive-spacex-bet-elon-musks-rocket-company', tag: '太空／投資' },
  { date: '2026/08/19', tone: 'neutral', title: 'Home Depot：消費者轉向小型居家工程', en: 'Home Depot customers stick to smaller projects', href: 'https://www.foxbusiness.com/economy/home-depot-sales-small-projects-housing-costs', tag: '消費' },
  { date: '2026/08/19', tone: 'neutral', title: 'Ford 擴大美國 Lincoln 產能，逐步淘汰中國進口', en: 'Ford boosts US Lincoln production', href: 'https://www.foxbusiness.com/industrials/ford-boosts-us-lincoln-production-phases-out-imports-china', tag: '汽車' },
  { date: '2026/08/19', tone: 'neutral', title: 'L3Harris 因行為違規撤換執行長', en: 'L3Harris ousts CEO over conduct violation', href: 'https://www.foxbusiness.com/markets/l3harris-ousts-ceo-kubasik-over-conduct-violation', tag: '企業治理' },
];

export default function GlobalNews({ news, usMarkets, reportDate, live }) {
  const cnn = news?.cnn?.length ? news.cnn : CNN;
  const bbg = news?.bloomberg?.length ? news.bloomberg : BLOOMBERG;
  const fox = news?.fox?.length ? news.fox : FOX;
  const liveUs = usMarkets?.length ? usMarkets : null;

  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">
        {live ? `即時更新 ${reportDate || ''}`.trim() : '資料日期 2026/08/20～21'}
        ・每則標題繁體中文・紅＝好消息、綠＝壞消息・點擊開原文
        {live ? ' ・ 來源：Google News／各大媒體 RSS' : ''}
      </p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          點擊卡片開啟原文。每則標題皆為繁體中文；若有英文原文會顯示在下方。CNN 固定列出 10 則重大財經／地緣新聞。可用右上角「立即更新」重抓並自動翻譯。
        </p>

        <h3 className="mr-sub">CNN（10 則重大新聞）</h3>
        <NewsList items={cnn} />

        <h3 className="mr-sub">Bloomberg</h3>
        <NewsList items={bbg} />

        <h3 className="mr-sub">Fox Business</h3>
        <NewsList items={fox} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">2. 美股指數（最新）</h2>
        {liveUs ? (
          <div className="us-markets mr-global" style={{ marginBottom: 16 }}>
            {liveUs.map((x) => (
              <div className="us-card" key={x.id}>
                <div className="label">{x.label}</div>
                <div className={`value change ${x.direction}`}>{x.value}</div>
                <div className={`change ${x.direction}`}>{x.change}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="us-markets mr-global" style={{ marginBottom: 16 }}>
            <div className="us-card"><div className="label">道瓊 Dow</div><div className="value change down">52,759.21</div><div className="change down">-703.84 (-1.32%)</div></div>
            <div className="us-card"><div className="label">S&P 500</div><div className="value change down">7,641.16</div><div className="change down">-66.82 (-0.87%)</div></div>
            <div className="us-card"><div className="label">Nasdaq</div><div className="value change down">26,067.17</div><div className="change down">-263.92 (-1.00%)</div></div>
            <div className="us-card"><div className="label">費半 SOX</div><div className="value change up">約 11,800</div><div className="change up">+0.53%（盤後參考）</div></div>
          </div>
        )}
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>說明：</strong>指數為 2026/08/20 美股收盤。驅動因素：川普對伊朗施壓推升油價、長債殖利率回升、Walmart 銷售警示拖累消費股。以下盤勢解析供背景參考。
        </p>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>8/20 收盤概況：</strong>三大指數收黑；道瓊跌幅最大。前一日財政部加碼長債回購的利多被油價與殖利率回升抵銷。半導體族群相對抗跌，費半小漲。
        </p>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">3. 對台北股市的影響評估</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>產業連動路徑：</strong><br />
          • <strong>半導體／AI</strong>：費半與台積電 ADR 連動高；三星代工漲價與韓系股東回饋支撐亞洲半導體情緒；中國限制鍺／石英出口則增加台灣光學與設備供應鏈風險。<br />
          • <strong>科技／ODM</strong>：廣達、技嘉、英業達短線受美科技股與 AI 資本支出預期牽動；資料中心政治阻力可能影響長期需求節奏。<br />
          • <strong>金融</strong>：利率與風險偏好變化影響金控股。<br />
          • <strong>航運／傳產</strong>：油價、全球貿易與風險情緒。
        </p>
        <h3 className="mr-sub">受美股影響較大的相關持股</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>類別</th>
                <th style={{ textAlign: 'left' }}>相關持股</th>
                <th style={{ textAlign: 'left' }}>影響邏輯</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ textAlign: 'left' }}>半導體龍頭</td><td style={{ textAlign: 'left' }}>台積電</td><td style={{ textAlign: 'left' }}>費半／ADR 連動；代工漲價與產能吃緊偏多</td></tr>
              <tr><td style={{ textAlign: 'left' }}>IC 設計／材料</td><td style={{ textAlign: 'left' }}>智原、材料-KY、原相、奕力-KY</td><td style={{ textAlign: 'left' }}>美科技股與半導體循環；鍺石英限制為材料風險</td></tr>
              <tr><td style={{ textAlign: 'left' }}>伺服器／ODM</td><td style={{ textAlign: 'left' }}>廣達、技嘉、英業達、技宸</td><td style={{ textAlign: 'left' }}>AI 伺服器資本支出與美股情緒；資料中心政治為中長期變數</td></tr>
              <tr><td style={{ textAlign: 'left' }}>半導體 ETF</td><td style={{ textAlign: 'left' }}>中信關鍵半導體</td><td style={{ textAlign: 'left' }}>直接追蹤半導體族群</td></tr>
              <tr><td style={{ textAlign: 'left' }}>高息／科技 ETF</td><td style={{ textAlign: 'left' }}>復華台灣科技優息、群益台灣精選高息等</td><td style={{ textAlign: 'left' }}>大盤與科技權值連動</td></tr>
              <tr><td style={{ textAlign: 'left' }}>金融</td><td style={{ textAlign: 'left' }}>中信金、玉山金、凱基金、國票金</td><td style={{ textAlign: 'left' }}>利率回升與風險偏好變化</td></tr>
              <tr><td style={{ textAlign: 'left' }}>航運</td><td style={{ textAlign: 'left' }}>長榮</td><td style={{ textAlign: 'left' }}>油價、全球貿易與風險情緒</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mr-note">※ 以上為依公開市場資訊之綜合評估，非投資建議。</p>
      </section>
    </div>
  );
}
