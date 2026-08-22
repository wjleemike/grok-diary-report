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
      '彭博 8/21–22 報導，Anthropic 內部把公開發行規模的目標設在追平、甚至超過 SpaceX 創下的 IPO 紀錄，等於把「哪一家前沿實驗室先上岸」從傳聞推進到可被資本市場檢視的賽程。這與 OpenAI 稍早對員工承諾 2027 年上市形成直接對照：一邊是獲利與企業合約敘事較完整、準備用超大發行量鎖估值錨；一邊是仍在用降價守開發者生態、上市時點更晚。若目標成真，發行規模本身就會重寫 AI 私募輪的定價權，連帶影響雲端長約、GPU 預付與企業採購預算的能見度。對台股而言，這比較像「未來 12–18 個月 capex 會不會被公開市場紀律收斂」的訊號，而不是明天就多一張台積電晶圓訂單。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/anthropic-aims-for-spacex-s-ipo-record',
    published: '2026/08/22 上午08:54',
    source: 'Bloomberg',
    reason:
      '產業格局分數極高：決定 2026–27 年 AI 實驗室估值錨、企業客戶議價與供應鏈長單能見度。信源為彭博、時效落在 24 小時內，爭議點（挑戰太空級 IPO）極適合做成深度片。',
    angles:
      '對標 SpaceX 是敘事還是真實訂單？OpenAI 降價是否為搶 IPO 前市占？台積電／伺服器鏈如何為「上市前資本開支」定價？',
    risk: [
      '內部目標，不是已遞交的 S-1',
      '對標口徑（募資額／市值）可能不一致',
      '安全或監管事件會讓超大 IPO 敘事縮水',
      '非正式招股書，不宜當買賣依據',
    ],
    tone: 'good',
  },
  {
    rank: 2,
    score: 94,
    category: '大模型公司',
    title: 'OpenAI 將前沿 GPT-5.6 Sol 開發者價格砍逾兩成',
    en: 'OpenAI cuts developer pricing for frontier GPT-5.6 Sol model by more than 20%',
    summary:
      '路透 8/21 報導，OpenAI 將前沿模型 GPT-5.6 Sol 的開發者／API 價格調降逾 20%。這不是邊緣產品促銷，而是對「最貴那一檔」動手，背景包括：Anthropic 在企業合約持續搶市、自有推理成本仍高、以及市場開始討論 OpenAI 營收增速不如對手。降價直接改寫中間層（Router、Agent 平台、辦公 Copilot）的單位經濟：同樣 token 預算可以跑更長的 agent 迴圈，但也壓縮轉售與加價空間。產業解讀分裂——樂觀者認為推理效率真的下來了、用量會爆；悲觀者認為這是為上市前做 DAU／API 量、毛利先犧牲。對台鏈較間接：用量升有利雲端與加速器出貨，但若只是價格戰而 capex 不變，伺服器拉貨節奏不會明天就翻倍。',
    href: 'https://www.reuters.com/technology/openai-cuts-developer-pricing-frontier-gpt-5-6-sol-model-2026-08-21/',
    published: '2026/08/22 上午05:30',
    source: 'Reuters',
    reason:
      '直接改寫 API 商業模式與中間層毛利。路透一手、24 小時內，可解釋空間大：為 IPO 做量，還是推理成本真的下降。',
    angles:
      '對 Anthropic／Google 價格帶的擠壓；誰會跟降？對台系雲端／API 代理商是量增還是價崩？',
    risk: [
      '「逾 20%」可能只限特定檔位或限時促銷',
      '監控 overhead 可能吃掉帳面降價',
      '價格戰利多用量、中線利空模型估值',
      '以官網價目表為準',
    ],
    tone: 'good',
  },
  {
    rank: 3,
    score: 92,
    category: '芯片與算力',
    title: 'Nvidia 擬向 Poolside 支付 60 億美元授權並延攬其團隊',
    en: 'Nvidia to Pay Poolside a $6 Billion License, Tap Startup’s Staff',
    summary:
      '彭博 8/21 稱，輝達計畫向法國／歐洲背景的模型新創 Poolside 支付約 60 億美元授權金，並延攬其人員。結構不是經典 100% 收購，而是「大額 IP 授權＋人才吸納」的準收購，讓輝達在繼續當 GPU 供應商的同時，把模型權重、編譯器與人才圈進自家棧。這與稍早 The Information 等「輝達與 Poolside 接觸」的報導同一條線，但金額被提到 60 億美元後，利益衝突變得更刺眼：OpenAI、Anthropic、xAI 都是輝達大客戶，供應商同時養競品模型。若交易落實，客製化晶片與 CUDA 軟體棧會多一條「輝達自有／獨家權重」的投片理由，對台積電先進製程是潛在增量，但時程以季到年計。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/nvidia-to-pay-poolside-a-6-billion-license-tap-startup-s-staff',
    published: '2026/08/22 上午02:14',
    source: 'Bloomberg',
    reason:
      '晶片龍頭向下整合模型層，60 億美元量級對人才市場與客製化晶片路線都是爆點。',
    angles:
      '算不算變相收購、反壟斷會不會出手？對 OpenAI／Anthropic 的供應商中立性？台積電是否多一條輝達自有模型投片？',
    risk: [
      '仍是「擬／據傳」，金額與結構可改',
      '輝達近日已否認其他媒體的中國晶片報導',
      '歐美可能審查「授權掩蓋併購」',
      '交割前不要當成已入帳 capex',
    ],
    tone: 'good',
  },
  {
    rank: 4,
    score: 90,
    category: 'Agent',
    title: 'Nvidia 研究：決定 Agent 成敗的是 harness，不是底模',
    en: 'Nvidia just showed that the harness, not the AI model, is now the real hero',
    summary:
      'TechCrunch 8/21 引 Nvidia 公開研究：同一套 Claude Opus 5，只改 Agentic Variation Operators（AVO）harness——工具、記憶管理、規則——並加上一個「監督代理／CEO」去糾偏，就能把 ARC-AGI-3（無說明的 2D 遊戲、需自行摸規則）從約 30% 拉到 100%。OpenAI 方面的實驗則顯示調 harness 可讓分數約翻三倍，但未到滿分。Databricks 執行長 Ali Ghodsi 補充：選錯 harness，成本可能直接翻倍，大家卻還在只比較「模型貴不貴」。這條新聞的產業含義是：2026 下半年 Agent 戰場從「誰的基座更大」轉到「誰的執行棧、記憶與監督層更穩」。對 AI 辦公、資安（長程任務跑飛、擅自聯網）與開源 harness 生態都是轉折點。Nvidia 同步推開放 agent 棧，商業動機清楚，但實驗本身仍有參考價值。',
    href: 'https://techcrunch.com/2026/08/21/nvidia-just-showed-that-the-harness-not-the-ai-model-is-now-the-real-hero/',
    published: '2026/08/22 上午03:43',
    source: 'TechCrunch',
    reason:
      '反直覺：產業燒在更大模型，論文卻說工具層／監督者才是長程任務瓶頸。',
    angles:
      '開源 harness vs 封閉 Agent 棧；監督者會不會被繞過；只賣模型 API 的定價權。',
    risk: [
      '遊戲基準，外推企業流程會過度樂觀',
      'Nvidia 是開放 agent 棧的利害關係人',
      '多一層監督會增加延遲與 token',
      '監督者本身也可能被越獄',
    ],
    tone: 'good',
  },
  {
    rank: 5,
    score: 88,
    category: 'AI 硬件',
    title: 'Anthropic 挖角 Google 晶片老將，硬體布局升級',
    en: 'Anthropic Taps Google Chip Veteran as Part of Push Into Hardware',
    summary:
      '彭博 8/21 報導 Anthropic 延攬 Google 體系的晶片資深人士，作為公司把觸角伸進加速器／客製化硬體的一環。解讀上這是「模型公司開始碰矽」：企業推論量起來之後，租 GPU 的毛利會被雲端與輝達吃走，自研或深度綁定 TPU／ASIC 才能保住單位經濟。同一天輝達有 Poolside 授權與 Rebellions 洽談，等於供應商在整合模型、客戶在整合晶片，垂直整合從兩頭對開。對台積電、博通、Marvell、智原這類客製化／封裝鏈是中期題材——但從挖角到定義規格、投片、上雲，通常要數個季度到數年，不是下周的營收。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/anthropic-taps-google-chip-veteran-as-part-of-push-into-hardware',
    published: '2026/08/22 上午03:59',
    source: 'Bloomberg',
    reason:
      '技術路線分數高：誰掌握推理晶片，誰就掌握毛利。與輝達整合模型是鏡像動作。',
    angles:
      '走 Google TPU、自研 ASIC 還是 AMD？與既有雲端協議如何並行？',
    risk: [
      '挖角是意圖，沒有製程節點或量產日曆',
      '競業與商业秘密可能卡住實際移轉',
      '若更深綁 TPU，對輝達短單可能是減項',
      '短線不宜當台積電／智原即時催化',
    ],
    tone: 'neutral',
  },
  {
    rank: 6,
    score: 87,
    category: '融資併購',
    title: '美國企業 AI 債務潮開始碰到投資人極限',
    en: 'US corporate AI debt surge tests investor limits as fatigue emerges',
    summary:
      '路透 8/21 盤點：為了蓋資料中心、鎖電、鎖 GPU，美國企業（含雲端、主權基金配對的專案公司、AI 雲如 Nebius）發債與可轉債規模快速堆高，一級與二級市場開始出現「認購變薄、利差要補償」的疲勞。這與輝達牽頭的千億級第三方融資平台、OpenAI／SB Energy 俄亥俄園區擔保、循環融資（供應商借錢給客戶再買自己的晶片）是同一輪信用週期。股價仍可以因主題交易創新高，債市卻先對存續期與再融資風險定價。對台股的傳導是：不是今天砍單，而是「若 8/26 輝達財報指引或 Jackson Hole 偏鷹，ODM／機電長單的能見度會被下修一個季度」。這是估值框架新聞，不是產品新聞。',
    href: 'https://www.reuters.com/business/us-corporate-ai-debt-surge-tests-investor-limits-as-fatigue-emerges-2026-08-21/',
    published: '2026/08/21 下午11:07',
    source: 'Reuters',
    reason:
      '解釋為何股價可以漲、債市已經皺眉。對費半、伺服器是框架而非單則產品。',
    angles:
      '循環融資是否被債市驗證？Jackson Hole 偏鷹誰砍 capex？台系 ODM 長單會否遞延？',
    risk: [
      '債市疲勞 ≠ GPU 或台積電出貨立刻下滑',
      '各發行人信用品質差很大，不能一概而論',
      '輝達 8/26 財報若仍強，雜音可能被忽略',
      '勿因標題做空整段 AI 鏈',
    ],
    tone: 'bad',
  },
  {
    rank: 7,
    score: 85,
    category: '芯片與算力',
    title: 'Nvidia 據傳洽談與韓國晶片新創 Rebellions 的交易',
    en: 'Nvidia in Talks With Chip Startup Rebellions for Potential Deal',
    summary:
      '彭博 8/21 稱輝達與韓國 AI 加速器新創 Rebellions 就潛在交易接觸。Rebellions 走的是推論 NPU／加速器路線，若輝達入股、授權 CUDA 生態或直接收購，等於把韓國本土 NPU 收進 CUDA 護城河，並在三星、SK 海力士的記憶體與 HBM 敘事旁邊再插一根樁。對台韓供應鏈的讀法要拆開：利多是「更多推論晶片仍可能在先進製程／HBM 上碰面」；利空或分流是「若後段放 Samsung Foundry，台積電不是唯一贏家」。目前沒有金額、持股或排他條款，性質與 Poolside 類似——都是輝達用資本把周邊生態焊死。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/nvidia-in-talks-with-chip-startup-rebellions-for-potential-deal',
    published: '2026/08/21 下午15:45',
    source: 'Bloomberg',
    reason:
      '亞洲半導體可操作：韓國 NPU＋CUDA。與三星／海力士股東回饋同一週期。',
    angles:
      '收購還是少數股權？Samsung Foundry vs 台積電訂單分流？',
    risk: [
      '僅 in talks，取消機率不低',
      '韓國可能審查外資控股本土 NPU',
      '出口管制可能拖長文件',
      '不宜當 2330 隔日催化',
    ],
    tone: 'good',
  },
  {
    rank: 8,
    score: 84,
    category: '芯片與算力',
    title: 'Nvidia 投資資料中心開發商 Cloverleaf，鎖定電力瓶頸',
    en: 'Nvidia invests in data center developer Cloverleaf Infrastructure',
    summary:
      '路透與 WSJ 8/21 先後報導，輝達投資或深入洽談資料中心／電力開發商 Cloverleaf Infrastructure，把觸角從 GPU 再往「變電、併網、土地與長約電力」延伸。邏輯很直：現在出貨的上限經常不是晶圓，而是變電站與電。誰能幫客戶把電與園區備好，誰的 GPU 就能先認列收入。這與 SB Energy／OpenAI 俄亥俄案、輝達千億融資平台是同一套「鎖電才能鎖算力」。對台系伺服器、機殼、冷卻、電源模組是中期需求故事——園區若落地，ODM 才有機櫃單；但許可與施工以年計，不能解讀成廣達下周出貨。',
    href: 'https://www.reuters.com/technology/nvidia-invests-data-center-developer-cloverleaf-infrastructure-2026-08-21/',
    published: '2026/08/21 下午22:44',
    source: 'Reuters / WSJ',
    reason:
      '把算力短缺翻譯成電力與土地。解釋 capex 數字為何還能膨脹。',
    angles:
      '輝達是否變成開發商？與俄亥俄 SB Energy 案如何分工？',
    risk: [
      '「投資」與「洽談」用詞不一致，金額未完整披露',
      '地方許可與選情可能卡住園區',
      '施工以年計，不是 ODM 下周出貨',
      '若屬擔保／或有負債，信用影響可能大於帳上投資',
    ],
    tone: 'good',
  },
  {
    rank: 9,
    score: 81,
    category: '科技公司戰略',
    title: '蘋果裁減 Siri、Vision Pro 相關團隊人力',
    en: 'Apple Cuts Jobs in Siri, Vision Pro Immersive Video and Gaming Teams',
    summary:
      '彭博、TechCrunch、The Verge 8/21 交叉報導，蘋果縮編 Siri、Vision Pro 沉浸式影像與遊戲相關團隊，規模描述為「數百人」量級，不是全公司大裁。外界主流解讀：端側大模型與頭顯時程重新排隊——Apple Intelligence 仍在，但「自己養完整語音助理＋頭顯內容工廠」的成本被砍。對照同一週 OpenAI 把 ChatGPT／Codex 插進 Mac 訊息、Google 持續推裝置端模型，蘋果比較像把困難的語言層外包或延後，把資源縮回硬體與系統。對台鏈光學、機構件、驅動 IC 的含義是「頭顯放量再等一代」的機率上升，對 iPhone 主軸影響有限。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/apple-cuts-jobs-in-siri-vision-pro-immersive-video-and-gaming',
    published: '2026/08/22 上午02:45',
    source: 'Bloomberg',
    reason:
      '大廠戰略轉向：還沒賺到錢的裝置 AI 開始縮編。對照 OpenAI 進 Mac 訊息。',
    angles:
      'Siri 是否更依賴外部模型？光學／機構件出貨是否再遞延？',
    risk: [
      '數百人相對總人力很小，易被寫成「放棄 AI」',
      '裁的是內容／特定模組，不代表 iPhone NPU 被砍',
      '台鏈 Vision Pro 營收占比通常不高',
      '以蘋果官方說明為準',
    ],
    tone: 'bad',
  },
  {
    rank: 10,
    score: 79,
    category: '芯片與算力',
    title: '日本再撥約 9.44 億美元給 Rapidus，加碼 AI 晶片競賽',
    en: 'Japan Earmarks Another $944 Million for Rapidus in AI Chip Race',
    summary:
      '彭博 8/21 報導日本政府再向 Rapidus 撥付約 9.44 億美元，延續「國家隊先進製程」路線，目標仍是在 2nm 級節點建立本土產能，服務 AI 與汽車等需求。同日韓國亦有晶片紅利／青年與 AI 投資基金的討論，東亞進入補貼對補貼。對台積電的真實含義分兩層：短線幾乎無訂單位移，因為 Rapidus 良率與產能仍遠落後；中長線則是客戶拿「第二來源＋政府補貼」來談價、以及美國／日本同盟在產地分散上的政治分。Rapidus 每一次注資都在買時間，不保證 2027–28 能量產具競爭力的 AI 晶片。',
    href: 'https://www.bloomberg.com/news/articles/2026-08-21/japan-earmarks-another-944-million-for-rapidus-in-ai-chip-race',
    published: '2026/08/21 下午17:01',
    source: 'Bloomberg',
    reason:
      '政策面決定 2nm 以後的地理分布。是中長期敘事與談判籌碼，不是即時單。',
    angles:
      '量產時程是否又延？台灣政策工具如何對標日韓？',
    risk: [
      '撥付 ≠ 已到帳或已轉成設備訂單',
      'Rapidus 量產時程多次後移',
      '初期產能幾乎動不了台積電營收',
      '短線做多做空 2330 都屬過度解讀',
    ],
    tone: 'neutral',
  },
];
