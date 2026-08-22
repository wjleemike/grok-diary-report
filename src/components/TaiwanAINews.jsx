import NewsList from './NewsList.jsx';
import { AI_DIGEST, AI_TREND, AI_LONGFORM, AI_WINDOW } from '../data/aiDigest.js';

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

function isDigest(items) {
  return Array.isArray(items) && items.length && (items[0].score != null || items[0].summary);
}

function asList(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean);
  return String(v)
    .split(/\n|(?=\d[）)])/)
    .map((s) => s.replace(/^\d[）)]/, '').trim())
    .filter(Boolean);
}

export default function TaiwanAINews({ news, reportDate, live }) {
  const tw = news?.tw?.length ? news.tw : twNews;
  const digest = isDigest(news?.ai) ? news.ai : AI_DIGEST;
  const meta = news?.aiMeta || {};
  const trend = meta.trend || AI_TREND;
  const longform = meta.longform || AI_LONGFORM;
  const windowLabel = live ? `即時窗 ${reportDate || ''}（過去 24 小時）` : `時間窗 ${AI_WINDOW}`;

  return (
    <div className="market-report">
      <h1 className="main-title">台股／AI 焦點新聞</h1>
      <p className="subtitle">
        {windowLabel}・紅＝好消息、綠＝壞消息・AI 區為優先級評分榜（滿分 100）
      </p>

      <section className="mr-section">
        <h2 className="mr-section-title">影響台股新聞</h2>
        <p className="mr-note" style={{ marginBottom: 10 }}>
          {live
            ? '來源：Google 新聞「台股」即時 RSS。可用右上角「立即更新」重抓。'
            : '彙整時間：2026/08/20 收盤＋8/21 國際頭條。'}
        </p>
        <NewsList items={tw} />
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">過去 24 小時 AI 產業要聞（評分榜）</h2>
        <p className="mr-note" style={{ marginBottom: 12 }}>
          範圍：大模型、芯片與算力、應用、Agent、辦公工具、機器人、硬體、開源、融資併購、監管、科技公司戰略。
          信源優先 Reuters／Bloomberg／WSJ／FT／The Information／TechCrunch／The Verge／官網。
          分數＝產業影響力＋內容爆點＋信源質量＋時效＋可解釋空間＋帳號適配。
        </p>

        <div className="aid-insight">
          <div className="aid-insight-k">今日整體趨勢</div>
          <p>{trend}</p>
        </div>
        <div className="aid-insight long">
          <div className="aid-insight-k">最適合做深度長文</div>
          <p>
            <strong>#{longform.rank}</strong> {longform.title}
            <span className="aid-insight-why"> {longform.why}</span>
          </p>
        </div>

        <div className="aid-list">
          {digest.slice(0, 10).map((n, i) => {
            const rank = n.rank || i + 1;
            const score = n.score ?? '—';
            return (
              <article key={(n.href || '') + n.title} className={`aid-card ${n.tone || 'neutral'}`}>
                <header className="aid-head">
                  <div className="aid-badges">
                    <div className="aid-rank">#{rank}</div>
                    <div className="aid-score-wrap">
                      <div className="aid-score">{score}</div>
                      <div className="aid-score-label">優先級</div>
                    </div>
                  </div>
                  <div className="aid-head-main">
                    <div className="aid-cats">
                      {n.category && <span className="news-tag">{n.category}</span>}
                      {n.source && <span className="news-tag">{n.source}</span>}
                    </div>
                    <a className="aid-title" href={n.href} target="_blank" rel="noopener noreferrer">
                      {n.title}
                    </a>
                    {n.en && <div className="news-en">{n.en}</div>}
                  </div>
                </header>
                {n.summary && <p className="aid-summary">{n.summary}</p>}
                <dl className="aid-fields">
                  {n.reason && (
                    <>
                      <dt>推薦理由</dt>
                      <dd>{n.reason}</dd>
                    </>
                  )}
                  {n.angles && (
                    <>
                      <dt>可延展選題</dt>
                      <dd>{n.angles}</dd>
                    </>
                  )}
                  {n.risk && (
                    <>
                      <dt>風險提示</dt>
                      <dd>
                        <ul className="aid-risk">
                          {asList(n.risk).map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}
                </dl>
                <div className="news-meta">
                  <span>{n.published || n.date}</span>
                  {n.href && (
                    <a href={n.href} target="_blank" rel="noopener noreferrer">
                      來源連結
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">對我的持股影響分析</h2>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
          <p className="mr-note" style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--text)' }}>
            <strong>台積電 (2330)</strong>：輝達鎖算力／鎖電（Poolside、Cloverleaf、Rebellions）＋三星代工漲價，對先進製程與 CoWoS 偏多；ADR 溢價仍高。中國鍺／石英限制對先進製程直接衝擊有限。<br /><br />
            <strong>廣達、技嘉、英業達</strong>：資料中心電力與 AI 債務疲勞是短線雜音，長線仍看輝達 8/26 財報指引。OpenAI 降價有利推理量，但 capex 節奏要等財報。<br /><br />
            <strong>智原、中信關鍵半導體</strong>：客製化／NPU 敘事（Anthropic 挖晶片人才、韓國 Rebellions）中性偏多，仍跟費半。<br /><br />
            以上為依公開資訊整理，非投資建議。
          </p>
          <p className="mr-note" style={{ marginTop: 12, marginBottom: 0 }}>
            {live ? `新聞更新：${reportDate}` : `評分基準：${AI_WINDOW}`}
          </p>
        </div>
      </section>
    </div>
  );
}
