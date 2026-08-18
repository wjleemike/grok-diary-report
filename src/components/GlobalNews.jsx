export default function GlobalNews() {
  return (
    <div className="market-report">
      <h1 className="main-title">國際財經頭條</h1>
      <p className="subtitle">資料日期 2026/08/17～18・美股收盤解析與台股影響評估</p>

      <section className="mr-section">
        <h2 className="mr-section-title">1. 全球財經頭條（三大媒體精選）</h2>
        <p className="mr-note" style={{marginBottom:12}}>以下整理 CNN Business、Bloomberg、Fox Business 近期主要財經頭條（依公開報導彙整，實際以各媒體官網為準）。</p>

        <h3 className="mr-sub">CNN Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}>荷莫茲海峽石油實際流通量如何？</td><td>中東地緣風險</td></tr>
              <tr><td style={{textAlign:'left'}}>川普政府稱石油已恢復正常流通，但問題仍在</td><td>油價／通膨</td></tr>
              <tr><td style={{textAlign:'left'}}>Exxon 上季日賺 1.6 億美元，油價上揚受惠</td><td>能源股</td></tr>
              <tr><td style={{textAlign:'left'}}>AI 財富推升舊金山房市「加價百萬」搶購潮</td><td>AI／房地產</td></tr>
              <tr><td style={{textAlign:'left'}}>迪士尼樂園與郵輪兩年來最佳成長</td><td>消費／旅遊</td></tr>
              <tr><td style={{textAlign:'left'}}>監管單位放行川普相關企業設銀行引爭議</td><td>金融監管</td></tr>
              <tr><td style={{textAlign:'left'}}>水牛城 Bills 新球場票價與視野爭議</td><td>體育商業</td></tr>
              <tr><td style={{textAlign:'left'}}>讀寫能力下降，科技能否解方？</td><td>科技／社會</td></tr>
              <tr><td style={{textAlign:'left'}}>油價與中東談判僵局牽動市場情緒</td><td>全球市場</td></tr>
              <tr><td style={{textAlign:'left'}}>企業 AI 內容氾濫，平台開始清理「AI 垃圾」</td><td>科技治理</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Bloomberg</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}>亞股承壓、油價續漲：中東僵局與通膨疑慮</td><td>亞洲／油價</td></tr>
              <tr><td style={{textAlign:'left'}}>美股收跌後，亞太期指偏空開盤</td><td>全球連動</td></tr>
              <tr><td style={{textAlign:'left'}}>Anthropic 營收暴增，晶片股獲支撐</td><td>AI／半導體</td></tr>
              <tr><td style={{textAlign:'left'}}>美伊 60 日備忘錄到期，談判希望淡化</td><td>地緣政治</td></tr>
              <tr><td style={{textAlign:'left'}}>公債殖利率攀升，30 年期創多年高</td><td>債券／利率</td></tr>
              <tr><td style={{textAlign:'left'}}>科技股受 AI 信心提振，但大盤仍收黑</td><td>美股結構</td></tr>
              <tr><td style={{textAlign:'left'}}>美元走弱，聯準會升息押注降溫</td><td>匯市／Fed</td></tr>
              <tr><td style={{textAlign:'left'}}>以色列與真主黨衝突再起，中東風險升溫</td><td>地緣</td></tr>
              <tr><td style={{textAlign:'left'}}>WTI 原油月內高點，通膨壓力再現</td><td>能源</td></tr>
              <tr><td style={{textAlign:'left'}}>零售財報周將至，市場觀望消費力道</td><td>財報／消費</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mr-sub">Fox Business</h3>
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead><tr><th style={{textAlign:'left'}}>標題</th><th>重點</th></tr></thead>
            <tbody>
              <tr><td style={{textAlign:'left'}}>川普：美伊備忘錄到期，美方條件未獲滿足</td><td>美伊談判</td></tr>
              <tr><td style={{textAlign:'left'}}>油價與油氣成本政治效應升溫</td><td>能源政治</td></tr>
              <tr><td style={{textAlign:'left'}}>L3Harris 因行為調查撤換執行長</td><td>企業治理</td></tr>
              <tr><td style={{textAlign:'left'}}>Russell 2000 再創高，小型股走強</td><td>美股結構</td></tr>
              <tr><td style={{textAlign:'left'}}>大科技資本支出持續支撐經濟</td><td>AI 基建</td></tr>
              <tr><td style={{textAlign:'left'}}>零售財報前夕，消費信心與通膨受關注</td><td>消費</td></tr>
              <tr><td style={{textAlign:'left'}}>能源部推動美國石油自動化增產</td><td>能源政策</td></tr>
              <tr><td style={{textAlign:'left'}}>Stellantis 近百萬輛車召回（相機軟體）</td><td>汽車</td></tr>
              <tr><td style={{textAlign:'left'}}>國債規模與財政負擔持續擴大</td><td>財政</td></tr>
              <tr><td style={{textAlign:'left'}}>Meta 面臨社群成癮訴訟，可能天價求償</td><td>科技監管</td></tr>
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
          1. <strong>地緣政治</strong>：美伊 60 日備忘錄到期、談判僵局；川普對阿曼相關表態推升油價與風險溢價。<br/>
          2. <strong>油價與公債</strong>：WTI 上漲約 2%～2.6%，30 年期美債殖利率升至 2007 年以來高點，壓抑成長股與消費股評價。<br/>
          3. <strong>AI 對沖力道</strong>：Anthropic 初步季營收強勁（約年增十倍以上），帶動記憶體／晶片股（如 SanDisk 大漲），費半收紅。<br/>
          4. <strong>個股拖累</strong>：Nike 重挫（道瓊權值）、部分通訊與軟體股走弱；航空股受燃油成本疑慮下跌。
        </p>
        <p className="mr-note">
          <strong>領漲／領跌：</strong>領漲偏向能源、部分半導體與 AI 供應鏈；領跌為通訊服務、消費必需品、部分零售與航空。代表性個股：SanDisk 大漲、Nike／Meta 走弱。
        </p>
      </section>

      <section className="mr-section">
        <h2 className="mr-section-title">3. 對台北股市的影響評估</h2>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>產業連動路徑：</strong><br/>
          • <strong>半導體／AI</strong>：美股費半收紅、Anthropic 等 AI 營收亮眼 → 有利台積電、智原、材料-KY、中信關鍵半導體等供應鏈評價。<br/>
          • <strong>科技／ODM</strong>：Nasdaq 僅小跌、AI 資本支出題材延續 → 廣達、技嘉、英業達等伺服器／筆電相關仍具支撐，但若美債殖利率續升，評價面壓力仍在。<br/>
          • <strong>金融</strong>：美債殖利率走高、全球風險偏好降溫 → 台股金融股（中信金、玉山金、凱基金等）可能震盪，利差與資本利得看法分歧。<br/>
          • <strong>航運／原物料</strong>：油價上漲對長榮等有雙面影響（運價 vs 成本）；中東風險若升高，避險情緒可能壓抑週期股。
        </p>
        <p className="mr-note" style={{marginBottom:12}}>
          <strong>台指期與開盤預估（僅供參考）：</strong><br/>
          美股小跌但費半收紅，且台股 8/17 已收紅，預期今日（8/18）加權指數開盤偏<strong>平盤附近震盪至小幅低開</strong>，若半導體權值穩定，盤中仍有機會守穩前收附近。需緊盯油價、美債殖利率及權值股早盤量價。
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
        <p className="mr-note">※ 以上為依公開市場資訊之綜合評估，非投資建議。請以即時報價與個人風險承受度為準。</p>
      </section>
    </div>
  );
}
