export default function GlobalNews() {
  const linkStyle = { color: 'var(--accent)', textDecoration: 'none' };
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>
  );

  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">資料日期 2026/08/17～18・美股收盤解析與台股影響評估</p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{marginBottom:12}}>點擊標題可開啟原文（新分頁）。以下為 CNN Business、Bloomberg、Fox Business 近期主要財經頭條。</p>

        <h3 className="mr-sub">CNN Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/business/oil-market-strait-of-hormuz-trump">荷莫茲海峽石油實際流通量如何？</A></td><td>中東地緣風險</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/business/oil-market-strait-of-hormuz-trump">川普政府稱石油已恢復正常流通，但問題仍在</A></td><td>油價／通膨</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">Exxon 上季日賺可觀，油價上揚受惠</A></td><td>能源股</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/economy/sf-real-estate-ai-wealth">AI 財富推升舊金山房市「加價百萬」搶購潮</A></td><td>AI／房地產</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">迪士尼樂園與郵輪成長受關注</A></td><td>消費／旅遊</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/investing/trump-crypto-bank-world-liberty">監管單位放行川普相關企業設銀行引爭議</A></td><td>金融監管</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">水牛城 Bills 新球場票價與視野爭議</A></td><td>體育商業</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">讀寫能力下降，科技能否解方？</A></td><td>科技／社會</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/2026/08/17/business/oil-market-strait-of-hormuz-trump">油價與中東談判僵局牽動市場情緒</A></td><td>全球市場</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.cnn.com/business">企業 AI 內容氾濫，平台開始清理「AI 垃圾」</A></td><td>科技治理</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Bloomberg</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-17/stock-market-today-dow-s-p-live-updates">亞股承壓、油價續漲：中東僵局與通膨疑慮</A></td><td>亞洲／油價</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-17/stock-market-today-dow-s-p-live-updates">美股收跌後，亞太期指偏空開盤</A></td><td>全球連動</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-14/anthropic-revenue-ahead-of-ipo-surges-over-14-fold-in-second-quarter">Anthropic 營收暴增，晶片股獲支撐</A></td><td>AI／半導體</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-17/stock-market-today-dow-s-p-live-updates">美伊 60 日備忘錄到期，談判希望淡化</A></td><td>地緣政治</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/videos/2026-08-17/the-close-8-17-2026-video">公債殖利率攀升，30 年期創多年高</A></td><td>債券／利率</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-14/anthropic-revenue-ahead-of-ipo-surges-over-14-fold-in-second-quarter">科技股受 AI 信心提振，但大盤仍收黑</A></td><td>美股結構</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/">美元走弱，聯準會升息押注降溫</A></td><td>匯市／Fed</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-17/stock-market-today-dow-s-p-live-updates">以色列與真主黨衝突再起，中東風險升溫</A></td><td>地緣</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/videos/2026-08-17/the-close-8-17-2026-video">WTI 原油月內高點，通膨壓力再現</A></td><td>能源</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.bloomberg.com/news/articles/2026-08-17/stock-market-today-dow-s-p-live-updates">零售財報周將至，市場觀望消費力道</A></td><td>財報／消費</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Fox Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">川普：美伊備忘錄到期，美方條件未獲滿足</A></td><td>美伊談判</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">油價與油氣成本政治效應升溫</A></td><td>能源政治</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/markets/l3harris-ousts-ceo-kubasik-over-conduct-violation">L3Harris 因行為調查撤換執行長</A></td><td>企業治理</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">Russell 2000 再創高，小型股走強</A></td><td>美股結構</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">大科技資本支出持續支撐經濟</A></td><td>AI 基建</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">零售財報前夕，消費信心與通膨受關注</A></td><td>消費</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">能源部推動美國石油自動化增產</A></td><td>能源政策</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/">Stellantis 近百萬輛車召回（相機軟體）</A></td><td>汽車</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/category/markets">國債規模與財政負擔持續擴大</A></td><td>財政</td></tr>
              <tr><td style={{textAlign:'left'}}><A href="https://www.foxbusiness.com/">Meta 面臨社群成癮訴訟，可能天價求償</A></td><td>科技監管</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">2. 昨日美股收盤解析（2026/08/17）</h2>
        <div className="us-markets mr-global" style={{marginBottom:16}}>
          <div className="us-card"><div className="label">道瓊 Dow</div><div className="value">53,459.78</div><div className="change down">-272.63 (-0.51%)</div></div>
          <div className="us-card"><div className="label">S&P 500</div><div className="value">7,745.06</div><div className="change down">-40.70 (-0.52%)</div></div>
          <div className="us-card"><div className="label">Nasdaq</div><div className="value">26,644.91</div><div className="change down">-84.25 (-0.32%)</div></div>
          <div className="us-card"><div className="label">費半 SOX</div><div className="value">12,621</div><div className="change up">+1.64%</div></div>
        </div>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>收盤概況：</strong>三大指數同步收黑，但跌幅有限；半導體／AI 相關相對抗跌甚至收紅。NYSE 下跌家數明顯多於上漲，顯示賣壓較廣。
        </p>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>主要驅動因素：</strong><br/>
          1. <strong>地緣政治</strong>：美伊 60 日備忘錄到期、談判僵局；油價與風險溢價上升。<br/>
          2. <strong>油價與公債</strong>：WTI 上漲約 2%～2.6%，30 年期美債殖利率升至 2007 年以來高點，壓抑成長股與消費股評價。<br/>
          3. <strong>AI 對沖力道</strong>：Anthropic 初步季營收強勁，帶動記憶體／晶片股，費半收紅。<br/>
          4. <strong>個股拖累</strong>：Nike 重挫（道瓊權值）、部分通訊與軟體股走弱；航空股受燃油成本疑慮下跌。
        </p>
        <p className="mr-note">
          <strong>領漲／領跌：</strong>領漲偏向能源、部分半導體與 AI 供應鏈；領跌為通訊服務、消費必需品、部分零售與航空。
        </p>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">3. 對台北股市的影響評估</h2>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>產業連動路徑：</strong><br/>
          • <strong>半導體／AI</strong>：美股費半收紅、AI 營收亮眼 → 有利台積電、智原、材料-KY、中信關鍵半導體等。<br/>
          • <strong>科技／ODM</strong>：Nasdaq 僅小跌、AI 資本支出題材延續 → 廣達、技嘉、英業達等仍具支撐。<br/>
          • <strong>金融</strong>：美債殖利率走高 → 中信金、玉山金、凱基金等可能震盪。<br/>
          • <strong>航運</strong>：油價上漲對長榮有雙面影響。
        </p>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>開盤預估（僅供參考）：</strong>美股小跌但費半收紅，預期加權指數開盤偏平盤附近震盪至小幅低開，若半導體權值穩定，盤中仍有機會守穩前收附近。
        </p>
        <h3 className="mr-sub">受美股影響較大的相關持股</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>類別</th><th style={{textAlign:'left'}}>相關持股</th><th style={{textAlign:'left'}}>影響邏輯</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}>半導體龍頭</td><td style={{textAlign:'left'}}>台積電</td><td style={{textAlign:'left'}}>費半／AI 需求、ADR 連動</td></tr>
              <tr><td style={{textAlign:'left'}}>IC 設計／材料</td><td style={{textAlign:'left'}}>智原、材料-KY、原相、奕力-KY</td><td style={{textAlign:'left'}}>美科技股與半導體循環</td></tr>
              <tr><td style={{textAlign:'left'}}>伺服器／ODM</td><td style={{textAlign:'left'}}>廣達、技嘉、英業達、技宸</td><td style={{textAlign:'left'}}>AI 伺服器資本支出</td></tr>
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
