export default function GlobalNews() {
  const linkStyle = { color: 'var(--accent)', textDecoration: 'none' };
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>
  );

  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">資料日期 2026/08/18～19・美股收盤解析與台股影響評估</p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{marginBottom:12}}>點擊標題可開啟原文（新分頁）。以下為 CNN Business、Bloomberg、Fox Business 近期主要財經頭條。</p>

        <h3 className="mr-sub">CNN Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/18/tech/meta-attorneys-general-addiction-trial-opening-arguments">Meta 重回法庭，面對最大規模社群成癮訴訟開庭</A></td><td>科技監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/18/business/google-spirit-airlines-data">Google 收購 Spirit Airlines 全部資料餵養 AI 模型</A></td><td>AI／資料</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/18/media/disney-abc-fcc-trump-lawsuit-the-view-retaliatory">Disney 控告川普 FCC「報復性」行動，捍衛 ABC 執照</A></td><td>媒體／監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">荷莫茲海峽石油實際流通量與「暗線」航線變化</A></td><td>中東／油價</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">全球公債大賣壓，殖利率升至多年高點</A></td><td>債券／利率</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/18/tech/openai-chatgpt-for-teens">OpenAI 推出 ChatGPT for Teens 加強未成年防護</A></td><td>AI／安全</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/economy/sf-real-estate-ai-wealth">AI 財富推升舊金山房市「加價百萬」搶購潮</A></td><td>AI／房地產</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">美伊衝突下油價與美國汽油價格追蹤</A></td><td>能源</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/investing/trump-crypto-bank-world-liberty">監管單位放行川普相關企業設銀行引爭議</A></td><td>金融監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">人類型機器人製造商中國 IPO 超額認購創紀錄</A></td><td>機器人／IPO</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Bloomberg</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates">全球公債大賣壓，30 年美債殖利率創 2007 年以來高點</A></td><td>債券／利率</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates">晶片股重挫拖累美股，費半大跌近 5%</A></td><td>半導體</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-18/anthropic-pre-ipo-credit-facility-set-to-climb-past-10-billion">Anthropic 預 IPO 信貸額度上看逾 100 億美元</A></td><td>AI／融資</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">美加關稅談判陷入僵局，50% 關稅威脅逼近</A></td><td>貿易</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">川普對伊朗採強硬路線，荷莫茲海峽緊張常態化</A></td><td>地緣政治</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-18/stock-market-today-dow-s-p-live-updates">亞股受美股科技股賣壓影響偏空開盤</A></td><td>亞洲市場</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">Home Depot 財報表現與消費力道觀察</A></td><td>消費</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">Meta 面臨州檢察長成癮訴訟，可能天價求償</A></td><td>科技監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">超高淨值稅務策略與 Schwab／Fidelity 觀望</A></td><td>財富管理</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">油價因中東僵局維持高檔</A></td><td>能源</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Fox Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">美國國債逼近 40 兆美元，長債殖利率創多年新高</A></td><td>財政／利率</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">David Malpass 警告 AI 循環性與美債風險</A></td><td>AI／債務</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/politics/states-accuse-meta-targeting-children-facebook-instagram-addiction-the-young-ones-best-ones">Meta 被 29 州指控針對青少年成癮設計</A></td><td>科技監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">Amazon／AWS 成長與科技股波動分析</A></td><td>科技股</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/markets/l3harris-ousts-ceo-kubasik-over-conduct-violation">L3Harris 因行為調查撤換執行長</A></td><td>企業治理</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/">OpenAI 為青少年打造專屬 ChatGPT 體驗</A></td><td>AI／安全</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">美加關稅談判僵局，50% 關稅威脅</A></td><td>貿易</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">Home Depot 財報：消費者轉向小型居家工程</A></td><td>消費</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">國會民主黨擬推動對阿曼的戰爭權力決議</A></td><td>地緣</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">能源部推動美國油井自動化增產</A></td><td>能源政策</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">2. 昨日美股收盤解析（2026/08/18）</h2>
        <div className="us-markets mr-global" style={{marginBottom:16}}>
          <div className="us-card"><div className="label">道瓊 Dow</div><div className="value">53,343.40</div><div className="change down">-116.38 (-0.22%)</div></div>
          <div className="us-card"><div className="label">S&P 500</div><div className="value">7,691.76</div><div className="change down">-53.30 (-0.69%)</div></div>
          <div className="us-card"><div className="label">Nasdaq</div><div className="value">26,289.71</div><div className="change down">-355.20 (-1.33%)</div></div>
          <div className="us-card"><div className="label">費半 SOX</div><div className="value">~11,992</div><div className="change down">約 -4.98%</div></div>
        </div>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>收盤概況：</strong>三大指數全面收黑，那斯達克與費半跌幅最重；30 年美債殖利率一度升至 5.32%～5.34%（約 19 年新高），半導體與記憶體股重挫成為主要拖累。
        </p>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>主要驅動因素：</strong><br/>
          1. <strong>公債殖利率暴衝</strong>：30 年期美債創約 19 年高點，10 年期約 4.74%；市場憂心通膨、赤字與 AI 相關大規模舉債。<br/>
          2. <strong>半導體／記憶體重挫</strong>：費半大跌近 5%，Micron、Western Digital、Sandisk、Seagate 等跌幅 7%～9% 不等。<br/>
          3. <strong>地緣政治</strong>：美伊停火備忘錄到期、川普無意延長，荷莫茲海峽再有船隻遇襲，油價走高強化通膨與風險溢價。<br/>
          4. <strong>個股</strong>：Caterpillar 重挫約 4.5% 拖累道瓊；Meta 因成癮訴訟開庭下跌；能源、製藥相對抗跌。
        </p>
        <p className="mr-note">
          <strong>領漲／領跌：</strong>領漲偏向能源、健康護理／製藥；領跌為資訊科技（尤其半導體）、工業、部分通訊服務。
        </p>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">3. 對台北股市的影響評估</h2>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>產業連動路徑：</strong><br/>
          • <strong>半導體／AI</strong>：費半重挫近 5%、記憶體與 AI 股賣壓 → 直接衝擊台積電、聯發科、智原、材料-KY、中信關鍵半導體等。<br/>
          • <strong>科技／ODM</strong>：Nasdaq 與 AI 伺服器情緒轉弱 → 廣達、技嘉、英業達等短線承壓。<br/>
          • <strong>金融</strong>：美債殖利率走高 → 中信金、玉山金、凱基金等可能震盪加大。<br/>
          • <strong>航運</strong>：油價上漲對成本與運價有雙面影響。
        </p>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>台指期夜盤與開盤預估：</strong>8/18 台股收 45,308.68 點（-1.20%）。夜盤台指期明顯走弱，失守 45,000 點，跌幅約 500～560 點區間；台積電期貨同步下跌。今日（8/19）開盤預期偏空，可能低開 300～600 點以上，45,000 點為重要多空攻防關卡。
        </p>
        <h3 className="mr-sub">受美股影響較大的相關持股</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>類別</th><th style={{textAlign:'left'}}>相關持股</th><th style={{textAlign:'left'}}>影響邏輯</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}>半導體龍頭</td><td style={{textAlign:'left'}}>台積電</td><td style={{textAlign:'left'}}>費半／AI 需求、ADR 連動</td></tr>
              <tr><td style={{textAlign:'left'}}>IC 設計／材料</td><td style={{textAlign:'left'}}>智原、材料-KY、原相、奕力-KY</td><td style={{textAlign:'left'}}>美科技股與半導體循環</td></tr>
              <tr><td style={{textAlign:'left'}}>伺服器／ODM</td><td style={{textAlign:'left'}}>廣達、技嘉、英業達、技宸</td><td style={{textAlign:'left'}}>AI 伺服器資本支出與美股情緒</td></tr>
              <tr><td style={{textAlign:'left'}}>半導體 ETF</td><td style={{textAlign:'left'}}>中信關鍵半導體</td><td style={{textAlign:'left'}}>直接追蹤半導體族群</td></tr>
              <tr><td style={{textAlign:'left'}}>高息／科技 ETF</td><td style={{textAlign:'left'}}>復華台灣科技優息、群益台灣精選高息等</td><td style={{textAlign:'left'}}>大盤與科技權值連動</td></tr>
              <tr><td style={{textAlign:'left'}}>金融</td><td style={{textAlign:'left'}}>中信金、玉山金、凱基金、國票金</td><td style={{textAlign:'left'}}>利率、風險偏好、市場量能</td></tr>
              <tr><td style={{textAlign:'left'}}>航運</td><td style={{textAlign:'left'}}>長榮</td><td style={{textAlign:'left'}}>油價、全球貿易與風險情緒</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mr-note">※ 以上為依公開市場資訊之綜合評估，非投資建議。</p>
      </section>
    </div>
  );
}
