import NewsList from './NewsList.jsx';

const twNews = [
  { title: '台指期夜盤大漲約 302 點、台積電期貨漲約 13 元，今開盤有望止跌反彈', date: '2026-08-20', href: 'https://tw.news.yahoo.com/%E5%8F%B0%E8%82%A1%E7%9B%A4%E5%89%8D-%E7%BE%8E%E5%82%B5%E9%99%8D%E6%BA%AB%E7%BE%8E%E8%82%A1%E6%AD%A23%E9%BB%91-%E5%8F%B0%E6%8C%87%E5%A4%9C%E7%9B%A4%E5%BD%88302%E9%BB%9E-%E5%8F%B0%E8%82%A1%E4%BB%8A%E6%8B%9A%E4%B8%AD%E6%AD%A2%E8%B7%8C%E5%8B%A2-222700048.html', tone: 'good', tag: '夜盤' },
  { title: '台股 8/19 收 44,719.35 點跌 589.33 點（-1.30%）失守 45,000 與季線 成交約 8,479 億', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '大盤' },
  { title: '台積電收 2,350 元跌 30 元（-1.26%）為指數主要拖累', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '半導體' },
  { title: '三大法人 8/19 合計賣超約 700～750 億元，外資賣超逾 400 億', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '法人' },
  { title: '記憶體族群重挫 南亞科、華邦電跌幅居前 美半導體賣壓蔓延', date: '2026-08-19', href: 'https://tw.news.yahoo.com/', tone: 'bad', tag: '記憶體' },
  { title: '被動元件族群相對抗跌 日電貿等亮燈漲停 資金短線轉進', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190167.aspx', tone: 'good', tag: '類股' },
  { title: 'SK 海力士宣布約 290 億美元庫藏股並註銷，緩解記憶體賣壓', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tone: 'good', tag: '半導體' },
  { title: '美財政部加倍回購長天期公債，殖利率回落支撐風險資產', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tone: 'good', tag: '利率' },
  { title: '美股三大指數止跌小漲，健康護理因 Moderna／Merck 大漲領軍', date: '2026-08-19', href: 'https://www.reuters.com/business/us-stock-futures-steady-after-tech-slump-investors-focus-middle-east-tensions-2026-08-19/', tone: 'good', tag: '美股' },
  { title: '荷莫茲海峽與美伊僵局推升油價 通膨與風險溢價未消', date: '2026-08-19', href: 'https://www.cnn.com/business', tone: 'bad', tag: '地緣' },
];

const aiNews = [
  { title: 'SK 海力士宣布約 290 億美元庫藏股並註銷，強化股東回饋', en: 'SK Hynix plans ~$29B share buyback and cancellation on AI cash flow', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tone: 'good', tag: '半導體' },
  { title: 'Moderna 與 Merck 個人化 mRNA 黑色素瘤疫苗三期試驗達標', en: 'Moderna and Merck personalized mRNA melanoma vaccine meets Phase 3 goals', date: '2026-08-19', href: 'https://www.bloomberg.com/', tone: 'good', tag: '生技／mRNA' },
  { title: 'OpenAI 推出 ChatGPT for Teens 強化未成年防護與家長控制', en: 'OpenAI launches ChatGPT for Teens with stronger safety guardrails', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tone: 'good', tag: '產品' },
  { title: '美國財政部加大長債回購，緩解 AI 相關舉債與殖利率壓力', en: 'US Treasury boosts longer-dated buybacks to ease yield pressure', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tone: 'good', tag: '利率／AI融資' },
  { title: 'Meta 州檢察長成癮訴訟開庭，社群平台監管風險升溫', en: 'Meta faces state AGs’ social media addiction trial opening', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments', tone: 'bad', tag: '監管' },
  { title: 'TSMC 持續受惠 AI 多年度強勁需求，亞利桑那擴產推進', en: 'TSMC sees strong multi-year AI chip demand as Arizona expansion ramps', date: '2026-07-20', href: 'https://www.reuters.com/world/asia-pacific/tsmc-expects-strong-multi-year-demand-ai-chips-it-ramps-up-arizona-investment-2026-07-19/', tone: 'good', tag: '台積電' },
  { title: '美國國債突破 40 兆美元，長端利率與成長股評價仍敏感', en: 'US debt tops $40 trillion; long yields remain a headwind for growth stocks', date: '2026-08-19', href: 'https://www.bloomberg.com/', tone: 'bad', tag: '財政' },
  { title: 'Anthropic／OpenAI 營收與融資敘事仍支撐長線算力需求', en: 'Anthropic and OpenAI revenue/financing narratives keep AI compute demand alive', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'good', tag: 'AI' },
  { title: '中國 AI 模型與美國差距縮小，價格競爭加劇', en: 'US lead in AI race with China is rapidly narrowing', date: '2026-08-19', href: 'https://www.bloomberg.com/', tone: 'neutral', tag: '競爭' },
  { title: '荷莫茲與中東情勢推升油價，通膨與風險溢價未消', en: 'Hormuz and Middle East tensions keep oil elevated', date: '2026-08-19', href: 'https://www.cnn.com/business', tone: 'bad', tag: '地緣' },
];

export default function TaiwanAINews() {
  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">紅＝好消息、綠＝壞消息・資料日 2026/08/20・點擊卡片開原文</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>彙整時間：2026/08/20 ・ 今日核心：美股止跌＋殖利率回落，台指夜盤反彈約 300 點；SK 海力士庫藏、Moderna 題材與半導體情緒改善。</p>
        <NewsList items={twNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>長線算力與產品仍在推進；短線因殖利率回落與 SK 海力士庫藏，半導體評價壓力稍緩。</p>
        <NewsList items={aiNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>今日一句話：</strong>美股 8/19 止跌小漲（道瓊 +0.22%、S&P +0.21%、Nasdaq +0.16%），財政部長債回購使殖利率回落；台指期夜盤大漲約 302 點，今日台股有望止跌反彈挑戰季線／45,000 點。<br /><br />
            <strong>台股盤勢（8/19）：</strong>加權 44,719.35（-1.30%）、成交約 8,479 億；台積電 2,350（-1.26%）。法人偏賣超。夜盤已轉強。<br /><br />
            <strong>對你持股的意涵：</strong><br />
            • <strong>台積電</strong>：夜盤期貨上漲約 13 元，若開盤跟隨反彈，有利指數收復；長線 AI 多年度需求敘事仍在。<br />
            • <strong>廣達、技嘉、英業達</strong>：AI 伺服器長線能見度仍在，美科技股止跌後短線有機會跟漲整理。<br />
            • <strong>智原、材料-KY、中信關鍵半導體</strong>：SK 海力士大額庫藏與費半壓力緩解，短線波動可望收斂，但仍須觀察記憶體與 AI 資本支出情緒。<br />
            • <strong>金融股</strong>（中信金等）：長債殖利率回落對評價偏正面，風險偏好改善時震盪可望降低。<br />
            • <strong>長榮</strong>：與 AI 主線相關性較低，油價高檔對成本／運價影響偏雙面。<br /><br />
            以上為依公開資訊整理，非投資建議。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>分析時間：2026/08/20</p>
        </div>
      </section>
    </div>
  );
}
