import NewsList from './NewsList.jsx';

const CNN = [
  { date: '2026/08/19', tone: 'good', title: '美國人有更多錢，開始挑剔餐廳與購物體驗', en: 'Americans have more money. They\'re done eating and shopping at places that suck', href: 'https://www.cnn.com/2026/08/19/business/american-economy-consumers-retail-fast-food', tag: '消費' },
  { date: '2026/08/18', tone: 'bad', title: '伊朗已失去荷莫茲海峽重大控制權', en: 'Iran has lost significant control of the Strait of Hormuz', href: 'https://www.cnn.com/2026/08/18/business/iran-strait-of-hormuz-oil', tag: '中東／油價' },
  { date: '2026/08/18', tone: 'neutral', title: '川普延後對加拿大部分商品 50% 關稅', en: 'Trump postpones 50% tariff he threatened for some Canadian goods', href: 'https://www.cnn.com/2026/08/18/economy/canada-tariffs-trump', tag: '貿易' },
  { date: '2026/08/18', tone: 'bad', title: 'Meta 重回法庭，面對最大規模社群成癮訴訟', en: 'Meta heads back to the courtroom for its biggest social media addiction trial', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments', tag: '科技監管' },
  { date: '2026/08/18', tone: 'good', title: 'OpenAI 推出 ChatGPT for Teens 加強未成年防護', en: 'OpenAI introduces ChatGPT for Teens with stronger safety controls', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tag: 'AI／安全' },
  { date: '2026/08/18', tone: 'bad', title: 'Disney 控告川普 FCC「報復性」行動，捍衛 ABC 執照', en: 'Disney sues Trump\'s FCC over retaliatory campaign against ABC', href: 'https://www.cnn.com/2026/08/18/media/disney-abc-fcc-trump-lawsuit-the-view-retaliatory', tag: '媒體／監管' },
  { date: '2026/08/18', tone: 'bad', title: '全球公債大賣壓，可能讓生活成本上升', en: 'Global bond markets are getting hammered — here\'s why that could make life more expensive', href: 'https://www.cnn.com/2026/08/18/investing/global-bond-market', tag: '債券' },
  { date: '2026/08/18', tone: 'neutral', title: 'OpenAI 強化 AI 測試與訓練，因應駭客事件', en: 'OpenAI is hardening AI testing and training in light of hacking incidents', href: 'https://www.cnn.com/2026/08/18/business/openai-testing-training', tag: 'AI／資安' },
  { date: '2026/08/17', tone: 'good', title: 'AI 財富推升舊金山房市「加價百萬」搶購潮', en: 'AI wealth fuels San Francisco housing frenzy with million-dollar overbids', href: 'https://www.cnn.com/2026/08/17/economy/sf-real-estate-ai-wealth', tag: 'AI／房地產' },
  { date: '2026/08/18', tone: 'neutral', title: '亞洲科技「既競爭又合作」：誰能稱霸供應鏈', en: 'From heated rivalry to frenemies: Inside the cutthroat business of ruling tech in Asia', href: 'https://www.cnn.com/2026/08/18/tech/asia-tech-frenemy-intl-hnk', tag: '亞洲科技' },
];

const BLOOMBERG = [
  { date: '2026/08/19', tone: 'good', title: '美股反彈：財政部加大長債回購，殖利率回落', en: 'Stocks Rise as Treasury Steps In to Support Bonds', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tag: '美股' },
  { date: '2026/08/19', tone: 'good', title: 'Moderna 與 Merck 黑色素瘤 mRNA 疫苗三期試驗成功', en: 'Moderna and Merck Revive mRNA Hopes With Melanoma Success', href: 'https://www.bloomberg.com/news/articles/2026-08-19/moderna-merck-mrna-shot-helped-cut-melanoma-recurrence-in-big-trial', tag: '生技' },
  { date: '2026/08/19', tone: 'good', title: '美加擬貿易協議：鋼鋁關稅可能減半', en: 'US Said to Halve Tariffs on Canada Steel, Aluminum in Trade Deal', href: 'https://www.bloomberg.com/news/articles/2026-08-19/us-said-to-halve-tariffs-on-canada-steel-aluminum-in-trade-deal', tag: '貿易' },
  { date: '2026/08/19', tone: 'good', title: 'AI 雲端公司 Nebius 擬發行 45 億美元可轉債', en: 'AI Cloud Firm Nebius Seeks $4.5 Billion in Convertible Bonds', href: 'https://www.bloomberg.com/news/articles/2026-08-19/ai-cloud-firm-nebius-offers-4-5-billion-of-convertible-bonds', tag: 'AI／融資' },
  { date: '2026/08/19', tone: 'good', title: 'Marvell 給予 Google 最高 122 億美元持股認購權', en: 'Marvell Gives Client Google Right to Buy $12.2 Billion Stock', href: 'https://www.bloomberg.com/news/articles/2026-08-19/marvell-gives-google-right-to-buy-up-to-12-2-billion-in-shares', tag: '半導體' },
  { date: '2026/08/20', tone: 'good', title: '三星傳規畫 720 億美元股東回饋計畫', en: 'Samsung Planning Shareholder Return of $72 Billion, Report Says', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tag: '半導體' },
  { date: '2026/08/20', tone: 'neutral', title: '本世紀成長故事是氣候行動，而非 AI：Stern', en: 'This Century\'s Growth Story Is Climate Action More Than AI, Stern Says', href: 'https://www.bloomberg.com/news/articles/2026-08-20/this-century-s-growth-story-is-climate-action-more-than-ai-stern-says', tag: '氣候／AI' },
  { date: '2026/08/19', tone: 'bad', title: 'UAE 切斷與伊朗經貿往來', en: 'UAE Cuts Economic Ties With Iran After Missiles Target Territory', href: 'https://www.bloomberg.com/news/articles/2026-08-19/uae-cuts-economic-ties-with-iran-after-missiles-target-territory', tag: '地緣' },
  { date: '2026/08/19', tone: 'good', title: 'SK 海力士宣布約 290 億美元庫藏股', en: 'SK Hynix Moves to Calm Market With $29 Billion Share Buyback', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tag: '半導體' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債突破 40 兆美元歷史新高', en: 'US Public Debt Hits $40 Trillion, Raising Doom Loop Risk', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tag: '財政' },
];

const FOX = [
  { date: '2026/08/19', tone: 'neutral', title: '川普延後對加拿大 50% 關稅，稱達成潛在協議', en: 'Trump pauses 50% tariffs on Canada hours before deadline after announcing potential deal', href: 'https://www.foxbusiness.com/politics/trump-pauses-50-tariffs-canada-hours-before-deadline-after-announcing-new-deal', tag: '貿易' },
  { date: '2026/08/19', tone: 'bad', title: '長債殖利率創多年新高，國債壓力顯現', en: 'Treasury yields hit multi-decade highs amid surging national debt', href: 'https://www.foxbusiness.com/economy/treasury-yields-hit-multi-decade-highs-amid-surging-national-debt', tag: '利率' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債首度突破 40 兆美元', en: 'US national debt hits $40 trillion milestone for first time ever', href: 'https://www.foxbusiness.com/economy/us-national-debt-tracker', tag: '財政' },
  { date: '2026/08/19', tone: 'bad', title: 'Meta 被州檢察長指控針對青少年成癮設計', en: 'States accuse Meta of targeting children with Facebook and Instagram addiction design', href: 'https://www.foxbusiness.com/politics/states-accuse-meta-targeting-children-facebook-instagram-addiction-the-young-ones-best-ones', tag: '科技監管' },
  { date: '2026/08/19', tone: 'good', title: 'Costco 進軍高齡醫療，與 Medicare 合作', en: 'Costco plots major expansion into senior healthcare with Medicare partnership', href: 'https://www.foxbusiness.com/retail/costco-plots-major-expansion-senior-healthcare-medicare-partnership', tag: '零售' },
  { date: '2026/08/19', tone: 'good', title: '哈佛豪賭 SpaceX：大舉投資約 22 億美元', en: 'Harvard makes massive $2.2B SpaceX bet on Elon Musk\'s rocket company', href: 'https://www.foxbusiness.com/markets/harvard-makes-massive-spacex-bet-elon-musks-rocket-company', tag: '太空／投資' },
  { date: '2026/08/19', tone: 'neutral', title: 'Home Depot：消費者轉向小型居家工程', en: 'Home Depot customers stick to smaller projects as housing costs stay high', href: 'https://www.foxbusiness.com/economy/home-depot-sales-small-projects-housing-costs', tag: '消費' },
  { date: '2026/08/19', tone: 'neutral', title: 'Ford 擴大美國 Lincoln 產能，逐步淘汰中國進口', en: 'Ford boosts US Lincoln production, phases out imports from China', href: 'https://www.foxbusiness.com/industrials/ford-boosts-us-lincoln-production-phases-out-imports-china', tag: '汽車' },
  { date: '2026/08/19', tone: 'neutral', title: 'L3Harris 因行為違規撤換執行長', en: 'L3Harris ousts CEO Kubasik over conduct violation', href: 'https://www.foxbusiness.com/markets/l3harris-ousts-ceo-kubasik-over-conduct-violation', tag: '企業治理' },
  { date: '2026/08/19', tone: 'neutral', title: 'Lakers 股權爭奪：Jeanie Buss 與手足對峙', en: 'Jeanie Buss battling siblings over sale of remaining Lakers shares', href: 'https://www.foxbusiness.com/sports/jeanie-buss-battling-siblings-over-sale-remaining-lakers-shares-new-ownership-group-reports', tag: '企業' },
];

export default function GlobalNews() {
  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">資料日期 2026/08/19～20・紅＝好消息、綠＝壞消息・點擊開原文</p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          點擊卡片開啟原文。中文下方為英文標題。已全部改為可直接開啟的文章連結。
        </p>

        <h3 className="mr-sub">CNN Business</h3>
        <NewsList items={CNN} />

        <h3 className="mr-sub">Bloomberg</h3>
        <NewsList items={BLOOMBERG} />

        <h3 className="mr-sub">Fox Business</h3>
        <NewsList items={FOX} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">2. 昨日美股收盤解析（2026/08/19）</h2>
        <div className="us-markets mr-global" style={{ marginBottom: 16 }}>
          <div className="us-card"><div className="label">道瓊 Dow</div><div className="value change up">53,463.05</div><div className="change up">+119.65 (+0.22%)</div></div>
          <div className="us-card"><div className="label">S&P 500</div><div className="value change up">7,707.98</div><div className="change up">+16.22 (+0.21%)</div></div>
          <div className="us-card"><div className="label">Nasdaq</div><div className="value change up">26,331.09</div><div className="change up">+41.38 (+0.16%)</div></div>
          <div className="us-card"><div className="label">費半 SOX</div><div className="value change down">弱勢</div><div className="change down">晶片股續弱</div></div>
        </div>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>收盤概況：</strong>三大指數結束連三黑小幅收紅；30 年美債殖利率回落約 10 個基點至約 5.18%。健康護理領漲（S&P 醫療板塊 +3.5%），半導體與部分 AI 基礎設施股仍偏弱。
        </p>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>主要驅動因素：</strong><br />
          1. <strong>財政部加大長債回購</strong>：宣布加倍回購較長天期公債，緩和殖利率急升壓力，支撐風險資產。<br />
          2. <strong>Moderna／Merck 癌症疫苗</strong>：個人化 mRNA 黑色素瘤疫苗三期試驗達標，Moderna 暴漲約 177%、Merck 約 +12.6%，帶動醫療板塊大漲。<br />
          3. <strong>零售財報</strong>：Target 等同店銷售與獲利優於預期，消費力道獲肯定。<br />
          4. <strong>其他</strong>：美國國債突破 40 兆美元；川普延後加拿大 50% 關稅；油價因荷莫茲／伊朗情勢仍高；SK 海力士宣布約 290 億美元庫藏股。
        </p>
        <p className="mr-note">
          <strong>領漲／領跌：</strong>領漲＝健康護理、部分非必需消費；領跌＝半導體／AI 基礎設施、部分工業。個股焦點：Moderna、Merck、Target 相對強；Sandisk 等記憶體／晶片股偏弱。
        </p>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">3. 對台北股市的影響評估</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>產業連動路徑：</strong><br />
          • <strong>半導體／AI</strong>：美股晶片股仍弱，但 SK 海力士大額庫藏與殖利率回落可緩解部分壓力 → 台積電、智原、中信關鍵半導體短線可望止跌反彈。<br />
          • <strong>科技／ODM</strong>：Nasdaq 小漲、AI 情緒稍穩 → 廣達、技嘉、英業達等有機會跟漲整理。<br />
          • <strong>金融</strong>：長債殖利率回落對評價偏正面 → 中信金等利率敏感股震盪可望收斂。<br />
          • <strong>航運／能源</strong>：油價高檔對成本與運價仍有雙面影響。
        </p>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>台指期夜盤與開盤預估：</strong>美股止跌＋殖利率回落後，台指期夜盤轉強。今日開盤預期偏多整理，短線觀察台積電與 AI 伺服器供應鏈表現。
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
              <tr><td style={{ textAlign: 'left' }}>半導體龍頭</td><td style={{ textAlign: 'left' }}>台積電</td><td style={{ textAlign: 'left' }}>費半／ADR 連動</td></tr>
              <tr><td style={{ textAlign: 'left' }}>IC 設計／材料</td><td style={{ textAlign: 'left' }}>智原、材料-KY、原相、奕力-KY</td><td style={{ textAlign: 'left' }}>美科技股與半導體循環</td></tr>
              <tr><td style={{ textAlign: 'left' }}>伺服器／ODM</td><td style={{ textAlign: 'left' }}>廣達、技嘉、英業達、技宸</td><td style={{ textAlign: 'left' }}>AI 伺服器資本支出與美股情緒</td></tr>
              <tr><td style={{ textAlign: 'left' }}>半導體 ETF</td><td style={{ textAlign: 'left' }}>中信關鍵半導體</td><td style={{ textAlign: 'left' }}>直接追蹤半導體族群</td></tr>
              <tr><td style={{ textAlign: 'left' }}>高息／科技 ETF</td><td style={{ textAlign: 'left' }}>復華台灣科技優息、群益台灣精選高息等</td><td style={{ textAlign: 'left' }}>大盤與科技權值連動</td></tr>
              <tr><td style={{ textAlign: 'left' }}>金融</td><td style={{ textAlign: 'left' }}>中信金、玉山金、凱基金、國票金</td><td style={{ textAlign: 'left' }}>利率回落與風險偏好改善</td></tr>
              <tr><td style={{ textAlign: 'left' }}>航運</td><td style={{ textAlign: 'left' }}>長榮</td><td style={{ textAlign: 'left' }}>油價、全球貿易與風險情緒</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mr-note">※ 以上為依公開市場資訊之綜合評估，非投資建議。</p>
      </section>
    </div>
  );
}
