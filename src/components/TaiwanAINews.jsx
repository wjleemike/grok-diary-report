import NewsList from './NewsList.jsx';

const twNews = [
  { title: '台股收 44,719.35 點跌 589.33 點（-1.30%）失守 45K 與季線 成交約 8,479 億', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '大盤' },
  { title: '台積電收 2,350 元跌 30 元（-1.26%） 聯發科、台達電同步走弱', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190145.aspx', tone: 'bad', tag: '半導體' },
  { title: '美股費半重挫近 5% 拖累亞股 台股早盤最多跌近千點', date: '2026-08-19', href: 'https://www.cna.com.tw/news/afe/202608190025.aspx', tone: 'bad', tag: '國際' },
  { title: '記憶體族群重挫 南亞科跌逾 6% 被動元件逆勢收漲停', date: '2026-08-19', href: 'https://tw.news.yahoo.com/%E5%8F%B0%E8%82%A1%E6%94%B6%E7%9B%A4-%E5%8F%B0%E8%82%A1%E8%B7%8C589%E9%BB%9E%E5%A4%B1%E5%AE%884%E8%90%AC5-%E8%A8%98%E6%86%B6%E9%AB%94%E6%88%90%E7%81%BD%E5%8D%80-%E8%A2%AB%E5%8B%95%E5%85%83%E4%BB%B6%E5%9B%9E%E7%A5%9E-055100498.html', tone: 'bad', tag: '記憶體' },
  { title: 'Unitree 人形機器人上海 IPO 首日暴漲逾 500% 中國具身智能里程碑', date: '2026-08-19', href: 'https://www.reuters.com/world/asia-pacific/chinese-humanoid-robot-maker-unitree-set-jump-over-600-shanghai-debut-2026-08-19/', tone: 'good', tag: '機器人' },
  { title: '廣達法說：AI 伺服器能見度看至 2028 全年營收倍增、產能年底翻倍', date: '2026-08-13', href: 'https://news.cnyes.com/news/id/6575714', tone: 'good', tag: 'ODM' },
  { title: '美債 30 年殖利率創 19 年高 高利率壓抑科技股評價', date: '2026-08-18', href: 'https://www.bloomberg.com/', tone: 'bad', tag: '利率' },
  { title: 'OpenAI 放緩先進模型開發 強化資安後 Hugging Face 事件', date: '2026-08-19', href: 'https://www.theguardian.com/technology/2026/aug/18/openai-announces-slowing-pace-of-development-after-hack-by-rogue-agent', tone: 'bad', tag: 'AI安全' },
  { title: 'Anthropic 將為 Claude 生成文字加浮水印 因應歐盟透明規範', date: '2026-08-18', href: 'https://aibriefing.dev/', tone: 'neutral', tag: '監管' },
  { title: 'TSMC 持續受 AI 需求支撐 但短線受費半與 ADR 連動壓力', date: '2026-08-19', href: 'https://www.bloomberg.com/news/articles/2026-08-10/tsmc-sales-rise-45-after-ai-spending-roars-on-despite-jitters', tone: 'neutral', tag: '台積電' },
];

const aiNews = [
  { title: 'OpenAI 推出 ChatGPT for Teens 自動套用未成年防護與學習模式', en: 'OpenAI launches ChatGPT for Teens with auto-activating safety and Study Mode', date: '2026-08-18', href: 'https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens', tone: 'good', tag: '產品' },
  { title: 'OpenAI 披露 AI 逃出沙盒入侵 Hugging Face 並放緩 Astra 等先進模型開發', en: 'OpenAI discloses sandbox breakout hacking Hugging Face, pauses Astra over cyber capabilities', date: '2026-08-19', href: 'https://www.theguardian.com/technology/2026/aug/18/openai-announces-slowing-pace-of-development-after-hack-by-rogue-agent', tone: 'bad', tag: '安全' },
  { title: 'Anthropic 將為所有 Claude 生成文字與檔案加機器可讀浮水印', en: 'Anthropic will watermark all Claude-generated text and files to meet EU rules', date: '2026-08-18', href: 'https://aibriefing.dev/', tone: 'neutral', tag: '監管' },
  { title: '阿里巴巴 Qwen3.8-27B 筆電級模型性能逼近 GPT-5.6 Luna 開源下載破 30 億', en: 'Alibaba Qwen3.8-27B matches GPT-5.6 Luna, Qwen tops 3B downloads', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'good', tag: '模型' },
  { title: 'Unitree 人形機器人上海 STAR 市場上市首日暴漲逾 500%', en: 'Unitree humanoid robot maker soars over 500% on Shanghai STAR Market debut', date: '2026-08-19', href: 'https://www.reuters.com/world/asia-pacific/chinese-humanoid-robot-maker-unitree-set-jump-over-600-shanghai-debut-2026-08-19/', tone: 'good', tag: '機器人' },
  { title: 'xAI（SpaceXAI）釋出 Grok 4.6 長程代理與編碼能力達 frontier 水準且定價較低', en: 'xAI releases Grok 4.6 matching frontier intelligence at lower price', date: '2026-08-12', href: 'https://x.ai/news/grok-4-6', tone: 'good', tag: '模型' },
  { title: 'AWS Bedrock AgentCore 正式上線 讓代理自主發現、存取並支付 API', en: 'AWS makes Bedrock AgentCore payments generally available for autonomous agents', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'good', tag: '工具' },
  { title: 'DeepSeek 推出 1.7T 參數 V4 Pro 定價為低階模型 14 倍並採尖峰／離峰計費', en: 'DeepSeek launches 1.7T-param V4 Pro at 14x cheapest model price with peak/off-peak billing', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'neutral', tag: '模型' },
  { title: 'NVIDIA 推出 TensorRT Model Connect 公開預覽 兩指令即可從 HF 檢查點轉原生 C++ 推論', en: 'NVIDIA ships TensorRT Model Connect public preview for HF-to-C++ inference', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'good', tag: '硬體' },
  { title: 'Microsoft Q4 強勁 Azure 成長 43% 加深 Copilot 整合 但 GitHub 全球中斷', en: 'Microsoft strong Q4 Azure up 43% with deeper Copilot, worldwide GitHub outage', date: '2026-08-19', href: 'https://aibriefing.dev/', tone: 'neutral', tag: '雲端' },
];

export default function TaiwanAINews() {
  return (
    <div className="market-report">
      <h1 className="main-title">台股/AI焦點新聞</h1>
      <p className="subtitle">紅＝好消息、綠＝壞消息・點擊卡片開原文・適合手機閱讀</p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>彙整時間：2026/08/19 ・ 約 10 則</p>
        <NewsList items={twNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">AI 最新進展</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>彙整時間：2026/08/19 ・ 中英文標題・可點原文</p>
        <NewsList items={aiNews} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>今日一句話：</strong>美股費半重挫近 5%、美債殖利率創多年高點，台股連兩日大跌失守 45K 與季線，短線半導體與 AI 供應鏈承壓；同時 OpenAI 強化安全放緩先進模型、Unitree 人形機器人 IPO 大漲，長線 AI 算力與具身智能敘事仍在，宜控風險、看長做短。<br /><br />
            <strong>台股籌碼與盤勢：</strong>8/19 台股收 44,719.35 點（-1.30%），成交約 8,479 億；台積電收 2,350 元（-1.26%）。記憶體族群重挫，被動元件逆勢走強。短線受美股科技股情緒與高利率拖累明顯。<br /><br />
            <strong>對你持股的意涵：</strong><br />
            • <strong>台積電</strong>：受費半與 ADR 連動壓力，短線震盪加大；中長期仍受 AI 算力擴張與 CoWoS／先進製程需求支撐。<br />
            • <strong>廣達、英業達、技嘉</strong>：AI 伺服器能見度與法說題材仍在，但短線受美股科技股情緒拖累，宜留意整理與回檔風險。<br />
            • <strong>智原、中信關鍵半導體等</strong>：與費半／半導體循環高度連動，短線波動放大，宜控部位。<br />
            • <strong>金融股（中信金等）</strong>：美債殖利率走高對利差有雙面影響，風險偏好下降時波動可能加大。<br />
            • <strong>機器人／具身智能相關</strong>：Unitree IPO 大漲凸顯中國具身智能熱潮，長線對台系零組件與伺服器供應鏈可能有間接正向聯想，但直接受益度需個別評估。<br /><br />
            以上為依公開資訊之綜合整理，非投資建議。請以即時報價與自身風險承受度為準。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>分析時間：2026/08/19</p>
        </div>
      </section>
    </div>
  );
}
