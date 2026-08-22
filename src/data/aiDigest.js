/** 過去 24 小時 AI 產業要聞（評分榜種子；立即更新會覆寫） */
export const AI_WINDOW = '2026-08-21 10:47 ～ 2026-08-22 10:47（台北）';

export const AI_TREND =
  '今日主軸不是新模型發布，而是「錢、電、棧」三件事同時變貴、變緊：一流實驗室加速走向資本市場（Anthropic 對標 SpaceX IPO），開發者價格開始下殺（OpenAI 砍 GPT-5.6 Sol），輝達則用授權、挖角、電力開發商把供應鏈鎖更死。Agent 層出現反直覺訊號——Nvidia 研究顯示 harness／監督代理比底模更能決定長程任務成敗。短線解讀：算力與客製化晶片需求仍在，但 AI 企業債與循環融資疲勞正在定價，輝達週中財報與 Jackson Hole 會是下一道壓力測試。';

export const AI_LONGFORM = {
  rank: 1,
  title: 'Anthropic 放話 IPO 規模要對標或超越 SpaceX 紀錄',
  why: '一條就能串起三條主線：實驗室估值競賽（對 OpenAI 2027 上市承諾）、AI 債務／循環融資疲勞、以及「誰先用公開市場證明獲利故事」。適合寫成長文：Anthropic 獲利敘事 vs OpenAI 降價搶開發者、輝達同時當供應商與財務贊助者的利益衝突。',
};

export const AI_DIGEST = [
  {
    rank: 1,
    score: 96,
    category: '融資併購',
    title: 'Anthropic 放話 IPO 規模要對標或超越 SpaceX 紀錄',
    en: 'Anthropic Expects to Match or Top SpaceX’s Record IPO Size',
    summary:
      '彭博報導 Anthropic 內部目標是公開發行規模追平甚至超過 SpaceX 紀錄，把「實驗室誰先上岸」從傳聞推進到資本市場賽程。這與 OpenAI 先前對員工承諾 2027 上市形成直接對照。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/anthropic-aims-for-spacex-s-ipo-record',
    published: '2026/08/22 上午08:54',
    source: 'Bloomberg',
    reason:
      '產業格局分數極高：決定 2026–27 年 AI 實驗室估值錨、企業客戶議價與供應鏈長單能見度。信源為彭博、時效落在 24 小時內，爭議點（未獲利也能挑戰太空級 IPO）極適合做成深度片。',
    angles:
      '對標 SpaceX 是敘事還是真實訂單？OpenAI 降價是否為搶 IPO 前市占？台積電／伺服器鏈如何為「上市前資本開支」定價？',
    risk: '報導可能含目標而非已遞件；規模數字易被市場過度解讀。非正式招股書。',
    tone: 'good',
  },
  {
    rank: 2,
    score: 94,
    category: '大模型公司',
    title: 'OpenAI 將前沿 GPT-5.6 Sol 開發者價格砍逾兩成',
    en: 'OpenAI cuts developer pricing for frontier GPT-5.6 Sol model by more than 20%',
    summary:
      '路透：OpenAI 對前沿模型 GPT-5.6 Sol 的 API／開發者價格降幅超過 20%。這是在 Anthropic 企業市場攻勢與自有算力成本高漲背景下，明確轉向「用價格守開發者生態」。',
    href: 'https://www.reuters.com/technology/openai-cuts-developer-pricing-frontier-gpt-5-6-sol-model-2026-08-21/',
    published: '2026/08/22 上午05:30',
    source: 'Reuters',
    reason:
      '直接改寫 API 商業模式與中間層（Router、Agent 平台）毛利。路透一手、24 小時內、可解釋空間大：降價是為 IPO 做量、還是推理成本真的下來了。',
    angles:
      '對 Anthropic／Google 價格帶的擠壓；誰會跟降？對台系雲端／API 代理商是量增還是價崩？',
    risk: '實際價目表分級、是否限時促銷尚未完全公開；「逾 20%」可能只適用特定檔位。',
    tone: 'good',
  },
  {
    rank: 3,
    score: 92,
    category: '芯片與算力',
    title: 'Nvidia 擬向 Poolside 支付 60 億美元授權並延攬其團隊',
    en: 'Nvidia to Pay Poolside a $6 Billion License, Tap Startup’s Staff',
    summary:
      '彭博：輝達計畫以約 60 億美元向 AI 模型新創 Poolside 取得授權，並延攬其人員。這不是傳統併購，而是「授權＋挖角」的準收購，顯示輝達要同時握住晶片與模型人才。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/nvidia-to-pay-poolside-a-6-billion-license-tap-startup-s-staff',
    published: '2026/08/22 上午02:14',
    source: 'Bloomberg',
    reason:
      '利益衝突與格局分數都高：晶片龍頭向下整合模型層，強化「賣鏟的人開始挖礦」。60 億美元量級對人才市場與客製化晶片路線都是爆點。',
    angles:
      '這算不算變相收購、反壟斷會不會出手？對 OpenAI／Anthropic 的供應商中立性？台積電先進製程是否多一條「輝達自有模型」投片？',
    risk: '仍是「in talks／計畫」層級，金額與交割條件可能縮水；The Information 先前相關報導亦有修正紀錄。',
    tone: 'good',
  },
  {
    rank: 4,
    score: 90,
    category: 'Agent',
    title: 'Nvidia 研究：決定 Agent 成敗的是 harness，不是底模',
    en: 'Nvidia just showed that the harness, not the AI model, is now the real hero',
    summary:
      'TechCrunch 引 Nvidia 論文：為 Claude Opus 5 加上 AVO harness 與「監督代理」後，ARC-AGI-3 從約 30% 拉到 100%。Databricks 執行長亦稱選錯 harness 可能讓成本翻倍。',
    href: 'https://techcrunch.com/2026/08/21/nvidia-just-showed-that-the-harness-not-the-ai-model-is-now-the-real-hero/',
    published: '2026/08/22 上午03:43',
    source: 'TechCrunch',
    reason:
      '反直覺、極適合做成選題：產業一年燒在「更大模型」，論文卻說工具層／記憶／監督者才是長程任務瓶頸。對 Agent、AI 辦公、資安都有延展。',
    angles:
      '開源 harness vs 封閉 Agent 棧；資安（監督者會不會被繞過）；對「只賣模型 API」公司的定價權。',
    risk: '基準是遊戲式推理（ARC-AGI-3），外推到企業工作流需打折；Nvidia 有推自己開放 Agent 棧的動機。',
    tone: 'good',
  },
  {
    rank: 5,
    score: 88,
    category: 'AI 硬件',
    title: 'Anthropic 挖角 Google 晶片老將，硬體布局升級',
    en: 'Anthropic Taps Google Chip Veteran as Part of Push Into Hardware',
    summary:
      '彭博：Anthropic 延攬 Google 晶片資深人士，強化自研／客製化加速器路線，降低對單一 GPU 供應商的依賴。與輝達 Poolside 授權、Rebellions 洽談同一天出現，等於「模型公司開始碰矽」。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/anthropic-taps-google-chip-veteran-as-part-of-push-into-hardware',
    published: '2026/08/22 上午03:59',
    source: 'Bloomberg',
    reason:
      '技術路線分數高：誰掌握推理晶片，誰就掌握毛利。對台積電 CoWoS、客製化 ASIC、博通／Marvell 生態都有連動。',
    angles:
      'Anthropic 會走 Google TPU 還是自研 ASIC？與 AMD 先前伺服器協議如何並行？',
    risk: '挖角≠量產時程；硬體計畫從聘人到投片通常以年計。',
    tone: 'neutral',
  },
  {
    rank: 6,
    score: 87,
    category: '融資併購',
    title: '美國企業 AI 債務潮開始碰到投資人極限',
    en: 'US corporate AI debt surge tests investor limits as fatigue emerges',
    summary:
      '路透盤點：企業為蓋資料中心大舉發債，投資人開始喊累。這與輝達千億級融資擔保、OpenAI／SB Energy 俄亥俄園區、Nebius 可轉債同一個資金週期。',
    href: 'https://www.reuters.com/business/us-corporate-ai-debt-surge-tests-investor-limits-as-fatigue-emerges-2026-08-21/',
    published: '2026/08/21 下午11:07',
    source: 'Reuters',
    reason:
      '解釋「為什麼股價可以漲、債市已經皺眉」。對費半、伺服器、IP 類股是估值框架，不是單則產品新聞。',
    angles:
      '循環融資指控是否被債市驗證？若 Jackson Hole 偏鷹，誰的 capex 會砍？台系 ODM 長單會不會遞延？',
    risk: '「疲勞」是情緒指標，不等于訂單立刻消失；需對照輝達 8/26 財報指引。',
    tone: 'bad',
  },
  {
    rank: 7,
    score: 85,
    category: '芯片與算力',
    title: 'Nvidia 據傳洽談與韓國晶片新創 Rebellions 的交易',
    en: 'Nvidia in Talks With Chip Startup Rebellions for Potential Deal',
    summary:
      '彭博：輝達與韓國 AI 晶片新創 Rebellions 接觸潛在交易。若落實，等於在韓系記憶體／加速器生態再下一城，並可能影響三星、SK 海力士與本土 NPU 敘事。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/nvidia-in-talks-with-chip-startup-rebellions-for-potential-deal',
    published: '2026/08/21 下午15:45',
    source: 'Bloomberg',
    reason:
      '亞洲半導體板塊可操作：韓國 NPU + 輝達 CUDA 護城河。與三星／海力士股東回饋同一週期，適合對照台韓供應鏈。',
    angles:
      '收購還是投資？對 Samsung Foundry vs 台積電的訂單分流？',
    risk: '僅「in talks」；韓國監管與美國出口管制都可能卡關。',
    tone: 'good',
  },
  {
    rank: 8,
    score: 84,
    category: '芯片與算力',
    title: 'Nvidia 投資資料中心開發商 Cloverleaf，鎖定電力瓶頸',
    en: 'Nvidia invests in data center developer Cloverleaf Infrastructure',
    summary:
      '路透／WSJ：輝達入股或洽談投資 Cloverleaf，從晶片再往「電與土地」延伸。誰能拿到變電與併網，誰就能出貨 GPU。',
    href: 'https://www.reuters.com/technology/nvidia-invests-data-center-developer-cloverleaf-infrastructure-2026-08-21/',
    published: '2026/08/21 下午22:44',
    source: 'Reuters / WSJ',
    reason:
      '把「算力短缺」翻譯成電力與房地產。對台系機電、冷卻、伺服器機殼是中期題材，也解釋為何 capex 數字能再膨脹。',
    angles:
      '輝達是否變成資料中心開發商？與 SB Energy 俄亥俄案如何分工？',
    risk: '投資金額與持股比例未完全披露；電力案許可週期長。',
    tone: 'good',
  },
  {
    rank: 9,
    score: 81,
    category: '科技公司戰略',
    title: '蘋果裁減 Siri、Vision Pro 相關團隊人力',
    en: 'Apple Cuts Jobs in Siri, Vision Pro Immersive Video and Gaming Teams',
    summary:
      '彭博／TechCrunch：蘋果縮編 Siri、Vision Pro 沉浸式影像與遊戲團隊。外界解讀為端側 AI 與頭顯時程重新排序，而非全面放棄 Apple Intelligence。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/apple-cuts-jobs-in-siri-vision-pro-immersive-video-and-gaming',
    published: '2026/08/22 上午02:45',
    source: 'Bloomberg',
    reason:
      '大廠戰略轉向訊號：誰還願意為「還沒賺到錢的裝置 AI」養團隊。對照 OpenAI 打進 Mac 訊息、Google 裝置端模型，衝突感足夠。',
    angles:
      'Siri 是否更依賴外部模型？台鏈光學／機構件出貨是否再遞延？',
    risk: '「數百人」相對蘋果總人力有限，不宜直接外推 iPhone 出貨。',
    tone: 'bad',
  },
  {
    rank: 10,
    score: 79,
    category: '芯片與算力',
    title: '日本再撥約 9.44 億美元給 Rapidus，加碼 AI 晶片競賽',
    en: 'Japan Earmarks Another $944 Million for Rapidus in AI Chip Race',
    summary:
      '彭博：日本政府再向 Rapidus 注資約 9.44 億美元，延續國家隊先進製程路線。同日韓國亦討論晶片紅利基金，東亞進入「補貼對補貼」。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/japan-earmarks-another-944-million-for-rapidus-in-ai-chip-race',
    published: '2026/08/21 下午17:01',
    source: 'Bloomberg',
    reason:
      '政策面：補貼決定 2nm 以後的地理分布。對台積電不是即時單，但是中長期競爭敘事與客戶「第二來源」談判籌碼。',
    angles:
      'Rapidus 量產時程是否又延？台灣政策工具如何對標日韓？',
    risk: '注資≠良率；Rapidus 商業產能仍遠落後台積電，短線對持股影響有限。',
    tone: 'neutral',
  },
];
