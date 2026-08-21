import NewsList from './NewsList.jsx';

const twNews = [
  { title: '台股震盪逾 700 點，終場上漲 214.39 點收 44,933.74（+0.48%），成交約 7,930 億', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200131.aspx', tone: 'good', tag: '大盤' },
  { title: '台積電收 2,375 元漲 25 元（+1.06%）帶領指數止跌，早盤一度站上 45,000', date: '2026-08-20', href: 'https://tw.news.yahoo.com/%E5%8F%B0%E8%82%A1%E6%94%B6%E6%BC%B2214%E9%BB%9E-4%E8%90%AC5%E9%97%9C%E5%8D%A1%E5%BE%97%E8%80%8C%E5%BE%A9%E5%A4%B1-%E5%8F%B0%E7%A9%8D%E9%9B%BB%E6%BC%B225%E5%85%83%E5%A0%B12375-103300889.html', tone: 'good', tag: '半導體' },
  { title: '記憶體、CPO 族群強勢：南亞科 +7.5%、華邦電 +5%；立碁、眾達-KY、旺矽漲逾 7%', date: '2026-08-20', href: 'https://news.pchome.com.tw/finance/cna_business/20260820/index-17872063141863922003.html', tone: 'good', tag: '類股' },
  { title: '三大法人合計賣超約 35 億元：外資轉買超、投信與自營商續賣', date: '2026-08-20', href: 'https://www.cna.com.tw/news/afe/202608200167.aspx', tone: 'bad', tag: '法人' },
  { title: '廣達收 327 元跌 1.21%、技嘉 344 元跌 1.29%、英業達約 64.5 元附近震盪', date: '2026-08-20', href: 'https://tw.stock.yahoo.com/news/%E5%8F%B0%E8%82%A1%E6%94%B6%E7%9B%A4%E6%BC%B2214%E9%BB%9E-%E6%88%90%E4%BA%A4%E9%87%8F%E8%B7%8C%E7%A0%B48%E5%8D%83%E5%84%84%E5%85%83-%E8%81%AF%E7%99%BC%E7%A7%91%E9%87%8D%E6%91%94%E8%BF%914-054243840.html', tone: 'bad', tag: 'ODM' },
  { title: '日經：中國限制／延遲鍺、石英等材料出口台灣，光學與半導體設備供應鏈受阻', date: '2026-08-20', href: 'https://asia.nikkei.com/spotlight/supply-chain/exclusive-china-slows-exports-of-key-optical-aerospace-metals-to-taiwan', tone: 'bad', tag: '供應鏈' },
  { title: 'KOSPI 大漲 5.89%：三星傳 720 億美元股東回饋、SK 海力士庫藏題材發酵', date: '2026-08-20', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tone: 'good', tag: '亞股' },
  { title: '台積電 ADR 8/20 收 416 美元漲約 0.95%，溢價折合台股約 2,656 元', date: '2026-08-20', href: 'https://tw.stock.yahoo.com/news/%E5%8F%B0%E7%A9%8D%E9%9B%BBadr20%E6%97%A5%E4%B8%8A%E6%BC%B23-91%E7%BE%8E%E5%85%83%E6%BC%B2%E5%B9%850-95-%E6%8A%98%E5%8F%B0%E8%82%A12656-16%E5%85%83-215113314.html', tone: 'good', tag: 'ADR' },
  { title: '聯發科重挫近 4% 至 3,700 元，傳 AMD 分食 Google TPU 相關訂單', date: '2026-08-20', href: 'https://tw.stock.yahoo.com/news/%E5%8F%B0%E8%82%A1%E6%94%B6%E7%9B%A4%E6%BC%B2214%E9%BB%9E-%E6%88%90%E4%BA%A4%E9%87%8F%E8%B7%8C%E7%A0%B48%E5%8D%83%E5%84%84%E5%85%83-%E8%81%AF%E7%99%BC%E7%A7%91%E9%87%8D%E6%91%94%E8%BF%914-054243840.html', tone: 'bad', tag: 'IC 設計' },
  { title: '投顧：輝達 8/26 財報前台股仍處反彈格局，有機會挑戰 46,000 點', date: '2026-08-20', href: 'https://news.pchome.com.tw/finance/cna_business/20260820/index-17872063141863922003.html', tone: 'good', tag: '展望' },
];

const aiNews = [
  { title: '三星先進製程晶圓代工報價上調最高 15%，AI 產能吃緊帶動定價權', en: 'Samsung hikes advanced foundry prices up to 15% on AI demand', date: '2026-08-19', href: 'https://www.reuters.com/business/autos-transportation/samsung-hikes-chipmaking-prices-by-up-15-demand-spike-sources-say-2026-08-19/', tone: 'good', tag: '半導體' },
  { title: 'Stripe 以約 75 億美元收購 OpenRouter，強化 AI token 路由與支付基礎設施', en: 'Stripe acquires OpenRouter for about $7.5B', date: '2026-08-19', href: 'https://www.nytimes.com/2026/08/19/business/stripe-openrouter-ai.html', tone: 'good', tag: 'AI 平台' },
  { title: '英國 AI 晶片新創 Fractile 在 Anthropic 約 2.5 億美元訂單後估值上看 65 億美元', en: 'Fractile seeks $6.5B valuation after Anthropic inference deal', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/ai-chip-startup-fractile-in-talks-for-6-5-billion-value-after-anthropic-deal', tone: 'good', tag: 'AI 晶片' },
  { title: '阿里巴巴雲端 AI 營收大增但獲利腰斬，單季 AI 相關資本支出近 100 億美元', en: 'Alibaba profit -75% as AI capex hits ~$10B in a quarter', date: '2026-08-20', href: 'https://www.reuters.com/business/retail-consumer/alibaba-beats-quarterly-revenue-estimates-2026-08-20/', tone: 'neutral', tag: '中國 AI' },
  { title: '日經獨家：中國限制鍺與石英出口台灣，光學、航太與半導體設備供應鏈承壓', en: 'China slows germanium and quartz exports to Taiwan', date: '2026-08-20', href: 'https://asia.nikkei.com/spotlight/supply-chain/exclusive-china-slows-exports-of-key-optical-aerospace-metals-to-taiwan', tone: 'bad', tag: '供應鏈' },
  { title: '三星傳規畫逾 720 億美元股東回饋，SK 海力士同步大額庫藏', en: 'Samsung planning $72B shareholder return amid AI cash boom', date: '2026-08-20', href: 'https://www.bloomberg.com/news/articles/2026-08-20/samsung-planning-shareholder-return-of-72-billion-report-says', tone: 'good', tag: '記憶體' },
  { title: 'Marvell 給予 Google 最高 122 億美元持股認購權，客製化晶片合作加深', en: 'Marvell gives Google right to buy up to $12.2B stock', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-19/marvell-gives-google-right-to-buy-up-to-12-2-billion-in-shares', tone: 'good', tag: '半導體' },
  { title: '資料中心政治阻力升溫：美國中期選情下州長與選民對 AI 電力需求反彈', en: 'Data center politics turn toxic in US midterm races', date: '2026-08-20', href: 'https://www.latimes.com/topic/artificial-intelligence', tone: 'bad', tag: 'AI 基礎設施' },
  { title: 'OpenAI 推出 ChatGPT for Teens 強化未成年防護與家長控制', en: 'OpenAI launches ChatGPT for Teens with stronger safety', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tone: 'good', tag: '產品' },
  { title: 'TSMC 持續受惠 AI 多年度強勁需求，先進製程與 CoWoS 產能仍為瓶頸', en: 'TSMC sees strong multi-year AI demand; packaging remains bottleneck', date: '2026-07-20', href: 'https://www.reuters.com/world/asia-pacific/tsmc-expects-strong-multi-year-demand-ai-chips-it-ramps-up-arizona-investment-2026-07-19/', tone: 'good', tag: '台積電' },
];


export default function TaiwanAINews({ news, reportDate, live }) {
  const tw = news?.tw?.length ? news.tw : twNews;
  const ai = news?.ai?.length ? news.ai : aiNews;

  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">
        紅＝好消息、綠＝壞消息・
        {live ? `即時更新 ${reportDate || ''}` : '資料日 2026/08/20～21'}
        ・點擊卡片開原文
      </p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>
          {live
            ? '來源：Google 新聞「台股」即時 RSS。可用右上角「立即更新」重抓。'
            : '彙整時間：2026/08/20 收盤＋8/21 國際頭條 ・ 今日核心：台股震盪收漲 214 點、台積電 2,375；記憶體／CPO 強、ODM 與聯發科弱；中國鍺石英限制與三星代工漲價為新焦點。'}
        </p>
        <NewsList items={tw} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>
          {live
            ? '來源：Google 新聞 AI／Nvidia／OpenAI 即時 RSS。'
            : '長線算力需求仍強；三星代工漲價與 Fractile／Stripe 交易顯示 AI 基礎設施與軟體層持續獲資本青睞。中國材料限制與美國資料中心政治阻力為供應與需求雙邊風險。'}
        </p>
        <NewsList items={ai} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>台積電 (2330)</strong>：正面偏多。三星先進製程漲價 5–15% 反映全球產能吃緊，有利台積電定價與毛利預期；ADR 溢價仍高。中國鍺／石英限制對先進製程直接衝擊有限，但設備與光學供應鏈需關注。輝達 8/26 財報前動能仍關鍵。<br /><br />
            <strong>廣達 (2382)、技嘉 (2376)、英業達 (2356)</strong>：短線中性偏空。美股科技股 8/20 收黑、資料中心政治阻力升溫可能延後部分資本支出節奏；ODM 股 8/20 同步走弱。長線 AI 伺服器需求未變，但需觀察輝達財報與客戶庫存去化。<br /><br />
            <strong>智原、中信關鍵半導體等</strong>：中性。半導體指數與費半連動；記憶體股東回饋題材偏多，但聯發科等 IC 設計短線受訂單競爭消息拖累。<br /><br />
            <strong>使用方式：</strong>點右上角「立即更新」後，每日分析報告的現價、均線、五日動能、量比與紅黃綠燈會依最新行情重算；本頁新聞列表同步換成當天頭條。<br /><br />
            以上為依公開資訊整理，非投資建議。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>
            {live ? `新聞更新日：${reportDate}` : '分析時間：2026/08/21'}
          </p>
        </div>
      </section>
    </div>
  );
}
