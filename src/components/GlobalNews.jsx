import NewsList from './NewsList.jsx';

const CNN = [
  { date: '2026/08/19', tone: 'good', title: '美國財政部加倍回購長天期公債，債券市場暫獲喘息', en: 'Bond market takes a breather after surprise move by Treasury Department', href: 'https://www.cnn.com/business', tag: '債券／利率' },
  { date: '2026/08/19', tone: 'good', title: '美國人有更多錢，開始挑剔餐廳與購物體驗', en: 'Americans have more money. They’re done eating and shopping at places that suck', href: 'https://www.cnn.com/2026/08/19/business/american-economy-consumers-retail-fast-food', tag: '消費' },
  { date: '2026/08/19', tone: 'bad', title: '伊朗已失去荷莫茲海峽重大控制權', en: 'Iran has lost significant control of the Strait of Hormuz', href: 'https://www.cnn.com/2026/08/18/business/iran-strait-of-hormuz-oil', tag: '中東／油價' },
  { date: '2026/08/19', tone: 'bad', title: '能源市場紅燈閃爍，油價再度偏高', en: 'Red lights are flashing in energy markets', href: 'https://www.cnn.com/business', tag: '能源' },
  { date: '2026/08/18', tone: 'bad', title: 'Meta 重回法庭，面對最大規模社群成癮訴訟', en: 'Meta heads back to the courtroom for its biggest social media addiction trial', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments', tag: '科技監管' },
  { date: '2026/08/18', tone: 'good', title: 'OpenAI 推出 ChatGPT for Teens 加強未成年防護', en: 'OpenAI introduces ChatGPT for Teens with stronger safety controls', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tag: 'AI／安全' },
  { date: '2026/08/18', tone: 'neutral', title: '川普延後對加拿大部分商品 50% 關稅', en: 'Trump postpones 50% tariff he threatened for some Canadian goods', href: 'https://www.cnn.com/2026/08/18/economy/canada-tariffs-trump', tag: '貿易' },
  { date: '2026/08/17', tone: 'good', title: 'AI 財富推升舊金山房市「加價百萬」搶購潮', en: 'AI wealth fuels San Francisco housing frenzy with million-dollar overbids', href: 'https://www.cnn.com/2026/08/17/economy/sf-real-estate-ai-wealth', tag: 'AI／房地產' },
  { date: '2026/08/18', tone: 'good', title: '人類型機器人製造商中國 IPO 超額認購創紀錄', en: 'World’s top humanoid robot maker sets record oversubscribed China IPO', href: 'https://www.cnn.com/business', tag: '機器人／IPO' },
  { date: '2026/08/18', tone: 'bad', title: '全球公債大賣壓，可能讓生活成本上升', en: 'Global bond markets are getting hammered — here’s why that could make life more expensive', href: 'https://www.cnn.com/2026/08/18/investing/global-bond-market', tag: '債券' },
];

const BLOOMBERG = [
  { date: '2026/08/19', tone: 'good', title: '美股反彈：財政部加大長債回購，殖利率回落', en: 'Stocks Rise as Treasury Steps In to Support Bonds', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tag: '美股' },
  { date: '2026/08/19', tone: 'good', title: 'Bessent 成為數十年來最積極干預的財政部長', en: 'Bessent Becomes Most Interventionist Treasury Chief in Decades', href: 'https://www.bloomberg.com/', tag: '財政政策' },
  { date: '2026/08/19', tone: 'good', title: 'Moderna 與 Merck 黑色素瘤 mRNA 疫苗三期試驗成功', en: 'Moderna and Merck Revive mRNA Hopes With Melanoma Success', href: 'https://www.bloomberg.com/', tag: '生技' },
  { date: '2026/08/19', tone: 'good', title: 'SK 海力士宣布約 290 億美元庫藏股並註銷', en: 'SK Hynix Plans ~$29 Billion Share Buyback and Cancellation', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tag: '半導體' },
  { date: '2026/08/19', tone: 'neutral', title: '川普延後加拿大 50% 關稅，美加達成初步協議', en: 'Trump Delays 50% Tariffs on Canada Citing Tentative Deal', href: 'https://www.bloomberg.com/', tag: '貿易' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債突破 40 兆美元歷史新高', en: 'US Debt Tops Historic $40 Trillion Mark', href: 'https://www.bloomberg.com/', tag: '財政' },
  { date: '2026/08/19', tone: 'good', title: '亞股可望跟進美股反彈，因長債回購支撐', en: 'Asian Stocks to Gain as US Treasury Supports Bonds', href: 'https://www.bloomberg.com/news/articles/2026-08-19/stock-market-today-dow-s-p-live-updates', tag: '亞洲市場' },
  { date: '2026/08/19', tone: 'bad', title: '阿聯酋切斷與伊朗經濟往來', en: 'UAE Cuts All Economic Ties With Tehran', href: 'https://www.bloomberg.com/', tag: '地緣' },
  { date: '2026/08/19', tone: 'neutral', title: '川普擬將加拿大汽車關稅降至 15%', en: 'Trump Set to Cut Canada Auto Tariffs to 15% in Trade Deal', href: 'https://www.bloomberg.com/', tag: '貿易' },
  { date: '2026/08/19', tone: 'good', title: '黃金因殖利率下滑接近 4,500 美元', en: 'Gold Holds Near $4,500 as US Treasury Buyback Sends Yields Lower', href: 'https://www.bloomberg.com/', tag: '商品' },
];

const FOX = [
  { date: '2026/08/19', tone: 'good', title: '美股上揚，債券殖利率回落', en: 'Stocks climb as bond yields retreat', href: 'https://www.foxbusiness.com/category/markets', tag: '美股' },
  { date: '2026/08/19', tone: 'bad', title: '美國國債首度突破 40 兆美元', en: 'US national debt hits $40 trillion milestone for first time ever', href: 'https://www.foxbusiness.com/economy/us-national-debt-tracker', tag: '財政' },
  { date: '2026/08/19', tone: 'neutral', title: '川普延後對加拿大 50% 關稅，稱達成潛在協議', en: 'Trump pauses 50% tariffs on Canada hours before deadline after announcing potential deal', href: 'https://www.foxbusiness.com/politics/trump-pauses-50-tariffs-canada-hours-before-deadline-after-announcing-new-deal', tag: '貿易' },
  { date: '2026/08/19', tone: 'bad', title: '長債殖利率創多年新高，國債壓力顯現', en: 'Treasury yields hit multi-decade highs amid surging national debt', href: 'https://www.foxbusiness.com/economy/treasury-yields-hit-multi-decade-highs-amid-surging-national-debt', tag: '利率' },
  { date: '2026/08/19', tone: 'good', title: 'Larry Kudlow：硬體商品出現數十年來最大榮景', en: 'Larry Kudlow: There is an enormous boom going on', href: 'https://www.foxbusiness.com/category/economy', tag: '經濟' },
  { date: '2026/08/19', tone: 'neutral', title: 'Major casino operator 對持續經營表達重大疑慮', en: 'Major casino operator discloses substantial doubt over future as debt pressures mount', href: 'https://www.foxbusiness.com/category/markets', tag: '企業' },
  { date: '2026/08/19', tone: 'good', title: 'State Farm 將向客戶發放歷史性 50 億美元退款', en: 'State Farm customers are getting a historic $5B payout', href: 'https://www.foxbusiness.com/category/markets', tag: '保險' },
  { date: '2026/08/19', tone: 'neutral', title: '川普暗示重啟 Keystone 管線', en: 'Trump hints at revival of Keystone pipeline', href: 'https://www.foxbusiness.com/', tag: '能源' },
  { date: '2026/08/18', tone: 'bad', title: 'Meta 被州檢察長指控針對青少年成癮設計', en: 'States accuse Meta of targeting children with Facebook and Instagram addiction design', href: 'https://www.foxbusiness.com/politics/states-accuse-meta-targeting-children-facebook-instagram-addiction-the-young-ones-best-ones', tag: '科技監管' },
  { date: '2026/08/19', tone: 'good', title: 'Steve Moore：美國出現史上最大工業榮景', en: 'Steve Moore declares biggest industrial boom in US history', href: 'https://www.foxbusiness.com/category/economy', tag: '經濟' },
];

export default function GlobalNews() {
  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">資料日期 2026/08/19～20・紅＝好消息、綠＝壞消息・點擊開原文</p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          點擊卡片開啟原文。中文下方為英文標題。
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
          <strong>收盤概況：</strong>三大指數結束連三黑小幅收紅；30 年美債殖利率回落約 10 個基點至約 5.18%。健康護理領漲（S&P 醫療板塊 +3.5%），半導體與部分 AI 基礎設施股仍偏弱。成交量約維持近日水準。
        </p>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          <strong>主要驅動因素：</strong><br />
          1. <strong>財政部加大長債回購</strong>：宣布加倍回購較長天期公債，緩和殖利率急升壓力，支撐風險資產。<br />
          2. <strong>Moderna／Merck 癌症疫苗</strong>：個人化 mRNA 黑色素瘤疫苗三期試驗達標，Moderna 暴漲約 177%、Merck 約 +12.6%，帶動醫療板塊大漲。<br />
          3. <strong>零售財報</strong>：Target 等同店銷售與獲利優於預期，消費力道獲肯定。<br />
          4. <strong>其他</strong>：美國國債突破 40 兆美元；川普延後加拿大 50% 關稅；油價因荷莫茲／伊朗情勢仍高；SK 海力士宣布約 290 億美元庫藏股，緩解部分晶片賣壓。
        </p>
        <p className="mr-note">
          <strong>領漲／領跌：</strong>領漲＝健康護理、部分非必需消費；領跌＝半導體／AI 基礎設施、部分工業。個股焦點：Moderna、Merck、Target、Estée Lauder 相對強；Sandisk 等記憶體／晶片股偏弱。
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
          <strong>台指期夜盤與開盤預估：</strong>8/19 台股收 44,719.35 點（-589.33 點、-1.30%），失守 45,000 與季線。美股止跌＋殖利率回落後，台指期夜盤大漲約 302 點、台積電期貨上漲約 13 元。今日（8/20）開盤預期偏多，有望反彈挑戰季線與 45,000 點附近，短線觀察被動元件、記憶體、機器人、矽光子等族群。
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
              <tr><td style={{ textAlign: 'left' }}>半導體龍頭</td><td style={{ textAlign: 'left' }}>台積電</td><td style={{ textAlign: 'left' }}>費半／ADR 連動；夜盤期貨已轉強</td></tr>
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
