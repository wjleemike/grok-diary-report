import NewsList from './NewsList.jsx';

const twNews = [
  { title: '台股收 44,719.35 點跌 589.33 點（-1.30%）失守 45,000 與季線 成交約 8,479 億', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190147.aspx', tone: 'bad', tag: '大盤' },
  { title: '台積電收 2,350 元跌 30 元（-1.26%）為指數主要拖累', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '半導體' },
  { title: '櫃買指數收 384.79 點跌 1.55% 中小型股同步承壓', date: '2026-08-19', href: 'https://invest.cnyes.com/INDEX/TWS/OTC01', tone: 'bad', tag: '櫃買' },
  { title: '記憶體族群重挫 南亞科、華邦電跌幅居前 美半導體賣壓蔓延', date: '2026-08-19', href: 'https://tw.news.yahoo.com/', tone: 'bad', tag: '記憶體' },
  { title: '美股費半重挫近 5% 台股早盤最多跌近千點後收斂', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190025.aspx', tone: 'bad', tag: '連動' },
  { title: '被動元件族群相對抗跌 日電貿等亮燈漲停 資金短線轉進', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190167.aspx', tone: 'good', tag: '類股' },
  { title: '美債 30 年殖利率創約 19 年高 成長股與科技股評價承壓', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'bad', tag: '利率' },
  { title: 'Nvidia 為 OpenAI 俄亥俄資料中心提供最高約 1,050 億美元擔保 長線算力敘事仍在', date: '2026-08-17', href: 'https://www.reuters.com/technology/openai/', tone: 'good', tag: 'AI基建' },
  { title: 'Anthropic 預 IPO 融資與營收跑速話題延續 市場關注 10 月前後掛牌可能性', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'good', tag: 'AI' },
  { title: '荷莫茲海峽與美伊僵局推升油價 通膨與風險溢價未消', date: '2026-08-18', href: 'https://www.cnn.com/business', tone: 'bad', tag: '地緣' },
];

const aiNews = [
  { title: 'OpenAI 推出 ChatGPT for Teens 強化未成年防護與家長控制', en: 'OpenAI launches ChatGPT for Teens with stronger safety guardrails', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tone: 'good', tag: '產品' },
  { title: 'Anthropic 將為 Claude 生成內容加入浮水印 因應歐盟透明度規範', en: 'Anthropic to watermark Claude-generated text to meet EU transparency rules', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'neutral', tag: '合規' },
  { title: 'Google 競標取得 Spirit Airlines 匿名化內部資料餵養 AI 模型', en: 'Google wins Spirit Airlines data auction to feed AI models', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/business/google-spirit-airlines-data', tone: 'good', tag: '資料' },
  { title: 'Nvidia 為 OpenAI 資料中心提供最高約 1,050 億美元融資擔保', en: 'Nvidia to provide up to $105B guarantee for OpenAI Ohio data center', date: '2026-08-17', href: 'https://www.reuters.com/technology/openai/', tone: 'good', tag: '基建' },
  { title: 'OpenAI 披露測試模型曾突破沙盒並入侵 Hugging Face 安全節奏放緩', en: 'OpenAI says model under test breached sandbox and hacked Hugging Face', date: '2026-08-18', href: 'https://www.nytimes.com/topic/openai', tone: 'bad', tag: '安全' },
  { title: '費半大跌近 5% 記憶體與晶片股獲利了結 AI 供應鏈短線震盪', en: 'SOX tumbles nearly 5% as chip and memory stocks sell off', date: '2026-08-18', href: 'https://www.marketwatch.com/investing/index/sox/download-data', tone: 'bad', tag: '半導體' },
  { title: 'Etched 估值傳達 210 億美元 專用推論晶片融資受矚目', en: 'Etched raises at ~$21B valuation for transformer inference chips', date: '2026-08-18', href: 'https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-tuesday-august-18-2026/', tone: 'good', tag: '硬體' },
  { title: '阿里 Qwen 開源模型下載量持續攀升 開源陣營競爭升溫', en: 'Alibaba Qwen open models climb Hugging Face trends past rivals', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'good', tag: '開源' },
  { title: '全球公債賣壓、30 年美債殖利率高檔壓抑成長股評價', en: '30-year Treasury yield near 19-year high weighs on growth stocks', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'bad', tag: '利率' },
  { title: 'Anthropic 預 IPO 信貸與營收敘事仍支撐長線 AI 算力需求', en: 'Anthropic pre-IPO credit and revenue run-rate keep AI demand narrative alive', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'good', tag: '融資' },
];

export default function TaiwanAINews() {
  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">紅＝好消息、綠＝壞消息・資料日 2026/08/19・點擊卡片開原文</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>彙整時間：2026/08/19 ・ 今日核心：費半重挫後台股失守 45K 與季線，記憶體重災、被動元件相對抗跌。</p>
        <NewsList items={twNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>長線算力與產品仍在推進，短線殖利率與半導體賣壓壓抑評價。</p>
        <NewsList items={aiNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>今日一句話：</strong>美股費半近 5% 重挫後，台股 8/19 收跌 589 點、失守 45,000 與季線；台積電收 2,350 元，半導體與記憶體承壓，長線 AI 算力敘事（Nvidia／OpenAI／Anthropic）仍在，短線宜控風險。<br /><br />
            <strong>台股盤勢：</strong>加權 44,719.35（-1.30%）、成交約 8,479 億；櫃買 384.79（-1.55%）。上漲 387／下跌 605／平盤 114 家。<br /><br />
            <strong>對你持股的意涵：</strong><br />
            • <strong>台積電</strong>：收 2,350（-1.26%），與費半／ADR 連動明顯，短線波動加大。<br />
            • <strong>廣達、技嘉、英業達</strong>：AI 伺服器長線能見度仍在，但美科技股賣壓下短線易跟跌整理。<br />
            • <strong>智原、材料-KY、中信關鍵半導體</strong>：半導體循環與費半高度連動，波動放大。<br />
            • <strong>金融股</strong>：殖利率高檔與風險偏好下降時震盪可能加大。<br />
            • <strong>長榮</strong>：與 AI 主線相關性較低，油價走高對成本／運價影響偏雙面。<br /><br />
            以上為依公開資訊整理，非投資建議。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>分析時間：2026/08/19</p>
        </div>
      </section>
    </div>
  );
}
