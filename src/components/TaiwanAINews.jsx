import NewsList from './NewsList.jsx';

const twNews = [
  { title: '台股震盪逾 700 點，終場上漲 214.39 點收 44,933.74（+0.48%），成交約 7,930 億', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200131.aspx', tone: 'good', tag: '大盤' },
  { title: '台積電收 2,375 元漲 25 元（+1.06%）帶領指數止跌，早盤一度站上 45,000', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200144.aspx', tone: 'good', tag: '半導體' },
  { title: '記憶體、CPO 族群強勢：南亞科 +7.5%、華邦電 +5.1%；立碁、眾達-KY、旺矽漲逾 7%', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200144.aspx', tone: 'good', tag: '類股' },
  { title: '三大法人賣超台股 35.37 億元：外資轉買超、投信與自營商續賣', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200167.aspx', tone: 'bad', tag: '法人' },
  { title: '櫃買指數收 389.96 點漲 5.17 點（+1.34%），中小型股相對抗跌', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200131.aspx', tone: 'good', tag: '櫃買' },
  { title: '電腦週邊類指跌 1.67%、金融保險跌 0.66%，ODM 與金控股分歧', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200131.aspx', tone: 'bad', tag: '類股' },
  { title: 'KOSPI 大漲 5.89%：三星傳 720 億美元股東回饋、SK 海力士庫藏題材發酵', date: '2026-08-20', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tone: 'good', tag: '亞股' },
  { title: 'SK 海力士宣布約 290 億美元庫藏股並註銷，為韓國史上最大註銷案', date: '2026-08-19', href: 'https://www.reuters.com/legal/transactional/sk-hynix-buy-back-cancel-29-billion-worth-treasury-shares-2026-08-19/', tone: 'good', tag: '半導體' },
  { title: '費城半導體 8/19 跌 2.12% 至 11,738.23，美股三大指數僅小漲', date: '2026-08-19', href: 'https://www.cnn.com/business', tone: 'bad', tag: '美股' },
  { title: '投顧：輝達 8/26 財報前台股仍處反彈格局，有機會挑戰 46,000 點', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200144.aspx', tone: 'good', tag: '展望' },
];

const aiNews = [
  { title: '三星傳規畫逾 720 億美元股東回饋，與 SK 海力士同步加碼回饋', en: 'Samsung planning shareholder return of $72 billion amid AI cash boom', date: '2026-08-20', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tone: 'good', tag: '半導體' },
  { title: 'SK 海力士宣布約 290 億美元庫藏股並註銷，強化股東回饋', en: 'SK Hynix plans ~$29B share buyback and cancellation on AI cash flow', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/sk-hynix-announces-28-6-billion-share-buy-back-on-ai-boom', tone: 'good', tag: '半導體' },
  { title: 'SK 海力士與工會就薪資達成初步協議', en: 'SK Hynix reaches tentative wage deal with union', date: '2026-08-20', href: 'https://www.bloomberg.com/news/articles/2026-08-20/sk-hynix-reaches-tentative-deal-with-union-on-wages-yonhap-says', tone: 'good', tag: '半導體' },
  { title: 'Moderna 與 Merck 個人化 mRNA 黑色素瘤疫苗三期試驗達標', en: 'Moderna and Merck personalized mRNA melanoma vaccine meets Phase 3 goals', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/moderna-merck-mrna-shot-helped-cut-melanoma-recurrence-in-big-trial', tone: 'good', tag: '生技／mRNA' },
  { title: 'Marvell 給予 Google 最高 122 億美元持股認購權，客製化晶片合作加深', en: 'Marvell gives Google right to buy up to $12.2 billion in shares', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/marvell-gives-google-right-to-buy-up-to-12-2-billion-in-shares', tone: 'good', tag: '半導體' },
  { title: 'OpenAI 推出 ChatGPT for Teens 強化未成年防護與家長控制', en: 'OpenAI launches ChatGPT for Teens with stronger safety guardrails', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tone: 'good', tag: '產品' },
  { title: '美國財政部加大長債回購，緩解 AI 相關舉債與殖利率壓力', en: 'US Treasury boosts longer-dated buybacks to ease yield pressure', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates', tone: 'good', tag: '利率／AI融資' },
  { title: 'TSMC 持續受惠 AI 多年度強勁需求，亞利桑那擴產推進', en: 'TSMC sees strong multi-year AI chip demand as Arizona expansion ramps', date: '2026-07-20', href: 'https://www.reuters.com/world/asia-pacific/tsmc-expects-strong-multi-year-demand-ai-chips-it-ramps-up-arizona-investment-2026-07-19/', tone: 'good', tag: '台積電' },
  { title: '美國國債突破 40 兆美元，長端利率與成長股評價仍敏感', en: 'US debt tops $40 trillion; long yields remain a headwind for growth stocks', date: '2026-08-19', href: 'https://www.cnn.com/2026/08/19/economy/national-debt-hits-40-trillion-dollars-vis', tone: 'bad', tag: '財政' },
  { title: '川普加強對伊朗石油與經濟施壓，荷莫茲風險溢價未消', en: 'Trump squeezes Iran oil sales; Hormuz risk premium remains', date: '2026-08-20', href: 'https://www.cnn.com/2026/08/20/business/iran-economy-war-leverage-intl', tone: 'bad', tag: '地緣' },
];


export default function TaiwanAINews({ news, reportDate, live }) {
  const tw = news?.tw?.length ? news.tw : twNews;
  const ai = news?.ai?.length ? news.ai : aiNews;

  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">
        紅＝好消息、綠＝壞消息・
        {live ? `即時更新 ${reportDate || ''}` : '資料日 2026/08/20'}
        ・點擊卡片開原文
      </p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>
          {live
            ? '來源：Google 新聞「台股」即時 RSS。可用右上角「立即更新」重抓。'
            : '彙整時間：2026/08/20 收盤 ・ 今日核心：台股震盪收漲 214 點、台積電 2,375；記憶體／CPO 強、電腦週邊與金融弱；韓股股東回饋帶動亞洲半導體情緒。'}
        </p>
        <NewsList items={tw} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>
          {live
            ? '來源：Google 新聞 AI／Nvidia／OpenAI 即時 RSS。'
            : '長線算力與產品仍在推進；短線因三星／SK 海力士大額股東回饋，亞洲記憶體與半導體評價壓力明顯緩解。'}
        </p>
        <NewsList items={ai} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>使用方式：</strong>點右上角「立即更新」後，每日分析報告的現價、均線、五日動能、量比與紅黃綠燈會依最新行情重算；本頁新聞列表同步換成當天頭條。<br /><br />
            <strong>解讀順序：</strong>先看加權／費半方向，再對照台積電、ODM（廣達、技嘉、英業達）、金融與高息 ETF 的燈號（股價 vs MA20、MA20 vs MA60、近 5 日、量比）。<br /><br />
            以上為依公開資訊整理，非投資建議。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>
            {live ? `新聞更新日：${reportDate}` : '分析時間：2026/08/20'}
          </p>
        </div>
      </section>
    </div>
  );
}
