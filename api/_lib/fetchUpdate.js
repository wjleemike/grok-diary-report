/**
 * Server-side market + news fetcher (Vite middleware & Vercel /api/update).
 * Yahoo Finance charts for MA / 量能；證交所 MIS 即時價；Google News / RSS 頭條。
 */

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function isOtc(code, market) {
  const c = String(code || '').trim().toUpperCase();
  const m = String(market || '').toUpperCase();
  return m === 'TPEX' || m === 'TWO' || m === 'OTC' || /B$/.test(c);
}

export function yahooSymbol(code, market) {
  const c = String(code || '').trim().toUpperCase();
  if (!c) return null;
  return isOtc(code, market) ? `${c}.TWO` : `${c}.TW`;
}

function misKey(code, market) {
  const c = String(code || '').trim();
  if (!c) return null;
  return isOtc(code, market) ? `otc_${c}.tw` : `tse_${c}.tw`;
}

async function fetchText(url, timeout = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: '*/*' },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson(url, timeout = 12000) {
  const text = await fetchText(url, timeout);
  return JSON.parse(text);
}

function sma(arr, n) {
  const a = arr.filter((x) => x != null && Number.isFinite(x));
  if (!a.length) return null;
  const slice = a.length >= n ? a.slice(-n) : a;
  return slice.reduce((s, x) => s + x, 0) / slice.length;
}

function volRatio(vols) {
  const a = vols.filter((v) => v != null && v > 0);
  if (a.length < 3) return null;
  const last = a[a.length - 1];
  const window = a.slice(-20);
  const avg = window.reduce((s, x) => s + x, 0) / window.length;
  if (!avg) return null;
  return last / avg;
}

function roundPrice(p) {
  if (p == null || !Number.isFinite(p)) return null;
  if (p >= 500) return Math.round(p);
  if (p >= 50) return Math.round(p * 10) / 10;
  return Math.round(p * 100) / 100;
}

function statsFromChart(result) {
  const meta = result?.meta || {};
  const quote = (result?.indicators?.quote || [{}])[0] || {};
  const closes = quote.close || [];
  const vols = quote.volume || [];
  const valid = [];
  const validVol = [];
  for (let i = 0; i < closes.length; i++) {
    if (closes[i] != null && Number.isFinite(closes[i])) {
      valid.push(closes[i]);
      validVol.push(vols[i] || 0);
    }
  }
  const price = meta.regularMarketPrice ?? valid[valid.length - 1] ?? null;
  const prev =
    meta.chartPreviousClose ??
    meta.previousClose ??
    (valid.length >= 2 ? valid[valid.length - 2] : null);
  let dayChangePct = null;
  if (valid.length >= 2) {
    dayChangePct = ((valid[valid.length - 1] / valid[valid.length - 2]) - 1) * 100;
  } else if (price != null && prev) {
    dayChangePct = ((price / prev) - 1) * 100;
  } else if (meta.regularMarketChangePercent != null) {
    dayChangePct = meta.regularMarketChangePercent;
  }

  let chg5d = null;
  if (valid.length >= 6) {
    chg5d = ((valid[valid.length - 1] / valid[valid.length - 6]) - 1) * 100;
  }

  return {
    price,
    prev,
    dayChangePct,
    ma5: sma(valid, 5),
    ma20: sma(valid, 20),
    ma60: sma(valid, 60),
    chg5d,
    volRatio: volRatio(validVol),
    asOf: meta.regularMarketTime || null,
  };
}

async function fetchChart(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=4mo`;
  const data = await fetchJson(url);
  const result = data?.chart?.result?.[0];
  if (!result) throw new Error(`no chart ${symbol}`);
  return statsFromChart(result);
}

async function fetchSparkBatch(symbols) {
  if (!symbols.length) return {};
  const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${encodeURIComponent(symbols.join(','))}&range=4mo&interval=1d`;
  const data = await fetchJson(url, 15000);
  const map = {};
  for (const r of data?.spark?.result || []) {
    const resp = (r.response || [])[0];
    if (!resp) continue;
    map[r.symbol] = statsFromChart(resp);
  }
  return map;
}

async function fetchAllYahoo(chartItems) {
  const symbols = [...new Set(chartItems.map((it) => it.symbol).filter(Boolean))];
  const chunks = [];
  for (let i = 0; i < symbols.length; i += 10) chunks.push(symbols.slice(i, i + 10));
  const maps = await Promise.all(chunks.map((c) => fetchSparkBatch(c).catch(() => ({}))));
  const bySymbol = Object.assign({}, ...maps);
  const missing = chartItems.filter((it) => it.symbol && !bySymbol[it.symbol]);
  if (missing.length) {
    const extras = await mapPool(missing, 4, async (it) => {
      try {
        const stats = await fetchChart(it.symbol);
        return { symbol: it.symbol, stats };
      } catch {
        const alt = it.symbol.endsWith('.TWO') ? `${it.code}.TW` : `${String(it.code).toUpperCase()}.TWO`;
        try {
          const stats = await fetchChart(alt);
          return { symbol: it.symbol, stats };
        } catch (e) {
          return { symbol: it.symbol, error: String(e.message || e) };
        }
      }
    });
    for (const row of extras) {
      if (row?.stats) bySymbol[row.symbol] = row.stats;
    }
  }
  return bySymbol;
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      try {
        out[idx] = await fn(items[idx], idx);
      } catch (e) {
        out[idx] = { error: String(e.message || e) };
      }
    }
  }
  const n = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: n }, worker));
  return out;
}

async function fetchMisPrices(items) {
  const keys = ['tse_t00.tw', 'otc_o00.tw'];
  for (const it of items) {
    const k = misKey(it.code, it.market);
    if (k) keys.push(k);
  }
  const unique = [...new Set(keys)];
  const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${unique.join('|')}&json=1&delay=0`;
  const data = await fetchJson(url, 10000);
  const map = {};
  for (const row of data?.msgArray || []) {
    const code = String(row.c || '').toUpperCase();
    const z = row.z;
    const y = row.y;
    const price = z && z !== '-' ? Number(z) : null;
    const prev = y && y !== '-' ? Number(y) : null;
    map[code] = {
      price: Number.isFinite(price) ? price : null,
      prev: Number.isFinite(prev) ? prev : null,
      name: row.n,
    };
  }
  return map;
}

function fmtNum(n, digits = 2) {
  if (n == null || !Number.isFinite(n)) return '—';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function fmtIndexValue(n) {
  if (n == null || !Number.isFinite(n)) return '—';
  if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function taipeiParts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const parts = Object.fromEntries(fmt.formatToParts(d).map((p) => [p.type, p.value]));
  return parts;
}

export function formatLastUpdate(d = new Date()) {
  const p = taipeiParts(d);
  const ampm = p.dayPeriod === 'PM' || p.dayPeriod === 'pm' ? '下午' : '上午';
  return `${p.year}/${p.month}/${p.day} ${ampm}${p.hour}:${p.minute}:${p.second}`;
}

export function formatReportDate(d = new Date()) {
  const p = taipeiParts(d);
  const mm = String(p.month).padStart(2, '0');
  const dd = String(p.day).padStart(2, '0');
  return `${p.year}-${mm}-${dd}`;
}

function decodeXml(s) {
  if (!s) return '';
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  let t = String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  t = t.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, ent) => {
    const e = String(ent).toLowerCase();
    if (e.charAt(0) === '#') {
      const n = e.charAt(1) === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1));
      return Number.isFinite(n) ? String.fromCharCode(n) : ' ';
    }
    return named[e] != null ? named[e] : ' ';
  });
  return t.trim();
}

function cleanNewsText(s) {
  let t = decodeXml(s || '');
  t = decodeXml(t);
  t = t.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  t = t.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/https?:\/\/\S+/gi, ' ');
  t = t.replace(/\b(?:href|src)\s*=\s*["']?[^"'>\s]+/gi, ' ');
  t = t.replace(/&[a-z]+;|&#\d+;/gi, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  if (/^(<|href=|src=)/i.test(t)) return '';
  return t;
}

function xmlTag(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i');
  const m = block.match(re);
  return m ? m[1] : '';
}

function fmtNewsDate(pub) {
  if (!pub) return '';
  const d = new Date(pub);
  if (Number.isNaN(d.getTime())) return '';
  return formatReportDate(d).replace(/-/g, '/');
}

const GOOD_RE =
  /漲|創新高|突破|回饋|買超|達標|反彈|成長|大增|大漲|收紅|強勢|surge|rally|beat|record|buyback|soar|jump|gain|rise|boost|deal/i;
const BAD_RE =
  /跌|崩|賣超|戰爭|關稅|債務|衰退|下滑|重挫|大跌|收黑|危機|fall|drop|war|debt|tariff|crash|slump|loss|plunge|selloff/i;

function toneOf(title) {
  if (GOOD_RE.test(title) && !BAD_RE.test(title)) return 'good';
  if (BAD_RE.test(title) && !GOOD_RE.test(title)) return 'bad';
  if (GOOD_RE.test(title) && BAD_RE.test(title)) return 'neutral';
  return 'neutral';
}

/** 判斷標題是否以英文為主（需翻成繁中） */
function isMostlyEnglish(text) {
  if (!text || typeof text !== 'string') return false;
  const s = text.replace(/\s+/g, '');
  if (s.length < 4) return false;
  const latin = (s.match(/[A-Za-z]/g) || []).length;
  const cjk = (s.match(/[\u4e00-\u9fff]/g) || []).length;
  return latin >= 8 && latin > cjk * 2;
}

async function translateToZhTw(text) {
  if (!text || !isMostlyEnglish(text)) return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=en|zh-TW`;
    const data = await fetchJson(url, 8000);
    const out = data?.responseData?.translatedText;
    if (out && typeof out === 'string' && out.trim() && !/^MYMEMORY/i.test(out)) {
      return out.trim();
    }
  } catch {
    /* keep original */
  }
  return text;
}

/** 將英文標題翻成繁中；原文保留在 en */
async function ensureZhTitles(items) {
  if (!Array.isArray(items) || !items.length) return items || [];
  const out = [];
  for (const it of items) {
    const raw = (it.title || '').trim();
    if (!raw) {
      out.push(it);
      continue;
    }
    if (!isMostlyEnglish(raw)) {
      out.push({ ...it, title: raw, tone: toneOf(raw) });
      continue;
    }
    const zh = await translateToZhTw(raw);
    out.push({
      ...it,
      title: zh,
      en: it.en || raw,
      tone: toneOf(zh + ' ' + raw),
    });
  }
  return out;
}

function parseRss(xml, limit = 10) {
  const items = [];
  const re = /<item\b[\s\S]*?<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) && items.length < limit) {
    const b = m[0];
    let title = decodeXml(xmlTag(b, 'title'));
    let href = decodeXml(xmlTag(b, 'link')) || decodeXml(xmlTag(b, 'guid'));
    const pub = decodeXml(xmlTag(b, 'pubDate') || xmlTag(b, 'published') || xmlTag(b, 'updated'));
    let source = decodeXml(xmlTag(b, 'source'));
    if (!title || !href) continue;
    let tag = source;
    const dash = title.lastIndexOf(' - ');
    if (dash > 12 && dash > title.length - 24) {
      tag = title.slice(dash + 3).trim() || tag;
      title = title.slice(0, dash).trim();
    }
    items.push({
      title,
      href,
      date: fmtNewsDate(pub),
      published: pub ? formatLastUpdate(new Date(pub)) : fmtNewsDate(pub),
      source: tag || undefined,
      tag: tag || undefined,
      summary: cleanNewsText(xmlTag(b, 'description')).slice(0, 220),
      tone: toneOf(title),
    });
  }
  return items;
}

async function fetchRss(url, limit = 10) {
  const xml = await fetchText(url, 12000);
  return parseRss(xml, limit);
}

function gnews(q, hl = 'zh-TW', gl = 'TW', ceid = 'TW:zh-Hant') {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}&ceid=${encodeURIComponent(ceid)}`;
}

const CNN_SKIP_RE =
  /underscored|dyson|crocs|haveli|recipe|curly hair|fashion|coachella|playboy|cocktail|helipad|ballroom|snowplow|tiktok|potato|grenade|mansion|straighten/i;

const CNN_MAJOR_RE =
  /Iran|Hormuz|oil|Fed|rate|debt|tariff|stock|market|econom|China|Taiwan|TSMC|Nvidia|AI\b|war|semiconductor|inflation|jobs|GDP|Treasury|bond|recession|bank|Trump|energy|trade|missile|UAE|OpenAI|Meta|Apple|Google|Microsoft|Evergrande|consumer|retail|Canada/i;

function cnnTag(title) {
  const t = title || '';
  if (/Iran|Hormuz|oil|energy|gas/i.test(t)) return '中東／油價';
  if (/debt|Treasury|bond|yield/i.test(t)) return '財政';
  if (/tariff|trade|Canada/i.test(t)) return '貿易';
  if (/Fed|rate|inflation/i.test(t)) return '利率';
  if (/AI|OpenAI|Nvidia|semiconductor|TSMC|chip/i.test(t)) return 'AI／半導體';
  if (/stock|market|S&P|Nasdaq|Dow/i.test(t)) return '美股';
  if (/war|missile|military|wounded/i.test(t)) return '地緣';
  if (/China|Taiwan|Evergrande/i.test(t)) return '中國／亞洲';
  if (/Meta|Apple|Google|tech/i.test(t)) return '科技';
  if (/econom|GDP|jobs|consumer|retail/i.test(t)) return '經濟';
  return 'CNN';
}

function newsDedupeKey(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ')
    .trim()
    .slice(0, 72);
}

function scoreCnnItem(it) {
  const t = `${it.title || ''} ${it.href || ''}`;
  if (CNN_SKIP_RE.test(t)) return -100;
  if (/White House (vision|construction)|helipad|ballroom|special stone/i.test(t)) return -20;
  let s = 1;
  if (CNN_MAJOR_RE.test(t)) s += 6;
  if (/Iran|Hormuz|oil|tariff|debt|Fed|Taiwan|TSMC|Evergrande/i.test(t)) s += 5;
  if (/\/business\/|\/economy\/|\/markets\//i.test(it.href || '')) s += 2;
  return s;
}

function pickMajorNews(items, n = 10) {
  const seen = new Set();
  const scored = [];
  for (const it of items) {
    const k = newsDedupeKey(it.title);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    const sc = scoreCnnItem(it);
    if (sc < 0) continue;
    scored.push({ it: { ...it, tag: cnnTag(it.title) }, sc });
  }
  scored.sort((a, b) => b.sc - a.sc);
  return scored.slice(0, n).map((x) => x.it);
}

/** CNN：合併多組 Google News，篩重大財經／地緣，固定回傳 10 則 */
async function fetchCnnMajor() {
  const en = (q) => gnews(q, 'en-US', 'US', 'US:en');
  const lists = await Promise.all([
    fetchRss(
      en('site:cnn.com (Iran OR Hormuz OR oil OR Fed OR tariff OR debt OR stocks OR markets OR economy)'),
      25
    ).catch(() => []),
    fetchRss(
      en('site:cnn.com (China OR Taiwan OR AI OR semiconductor OR Nvidia OR Trump OR war)'),
      20
    ).catch(() => []),
    fetchRss(en('site:cnn.com (business OR markets OR economy)'), 15).catch(() => []),
  ]);
  let picked = pickMajorNews(lists.flat(), 10);
  if (picked.length >= 10) return picked;
  const extra = await fetchRss(en('site:cnn.com'), 40).catch(() => []);
  picked = pickMajorNews([...picked, ...extra], 10);
  return picked;
}

function aiCategory(t) {
  const s = t || '';
  if (/agent|harness|AVO|Codex|監督/i.test(s)) return 'Agent';
  if (/robot|humanoid|Unitree|機器人/i.test(s)) return '機器人';
  if (/IPO|funding|debt|unicorn|授權|融資|併購|billion/i.test(s)) return '融資併購';
  if (/chip|GPU|TSMC|Rapidus|Rebellions|semiconductor|晶片|算力|data center|電力/i.test(s)) return '芯片與算力';
  if (/open.?source|open.?weight|開源/i.test(s)) return '開源模型';
  if (/regulat|export|White House|safety|監管/i.test(s)) return '監管政策';
  if (/Siri|layoff|Apple|裁員|戰略/i.test(s)) return '科技公司戰略';
  if (/office|Copilot|accounting|Rillet|辦公/i.test(s)) return 'AI 辦公工具';
  if (/OpenAI|Anthropic|Google|Meta|xAI|GPT|Claude/i.test(s)) return '大模型公司';
  if (/hardware|ASIC|TPU|硬體/i.test(s)) return 'AI 硬件';
  return 'AI 應用';
}

function scoreAiItem(it) {
  const t = `${it.title || ''} ${it.source || ''} ${it.tag || ''} ${it.href || ''}`;
  let s = 42;
  if (/Reuters|Bloomberg|WSJ|Wall Street Journal|Financial Times|The Information/i.test(t)) s += 22;
  else if (/TechCrunch|The Verge|CNBC|Nikkei|MIT/i.test(t)) s += 14;
  else s += 5;
  if (/OpenAI|Nvidia|Anthropic|Google|TSMC|台積|輝達/i.test(t)) s += 12;
  if (/IPO|billion|chip|agent|harness|debt|GPU|robot/i.test(t)) s += 10;
  if (/layoff|裁員|circular|fatigue/i.test(t)) s += 6;
  return Math.max(55, Math.min(97, s));
}

function toAiDigestItem(it, rank) {
  const blob = `${it.title} ${it.en || ''} ${it.summary || ''}`;
  const category = aiCategory(blob);
  const score = it.score || scoreAiItem(it);
  return {
    rank,
    score,
    category,
    title: it.title,
    en: it.en,
    summary: cleanNewsText(it.summary).slice(0, 220),
    href: it.href,
    published: it.published || it.date,
    date: it.date,
    source: it.source || it.tag,
    reason: `信源「${it.source || it.tag || '媒體'}」；歸類 ${category}。綜合產業影響力、時效與可追蹤性給 ${score} 分。`,
    angles: '可往競爭格局、資本開支、對台積電／伺服器鏈的訂單能見度延伸。',
    risk: ['即時 RSS 摘要可能不完整', '請點來源連結核對原文與時戳'],
    tone: it.tone || toneOf(it.title),
  };
}

async function fetchAiDigest() {
  const en = (q) => gnews(q, 'en-US', 'US', 'US:en');
  const lists = await Promise.all([
    fetchRss(en('site:reuters.com (OpenAI OR Nvidia OR Anthropic OR AI) when:1d'), 20).catch(() => []),
    fetchRss(en('site:bloomberg.com (OpenAI OR Nvidia OR Anthropic OR AI) when:1d'), 20).catch(() => []),
    fetchRss(en('site:techcrunch.com (AI OR OpenAI OR Nvidia OR agent) when:1d'), 15).catch(() => []),
    fetchRss(en('(OpenAI OR Nvidia OR Anthropic OR "AI agent") (WSJ OR "Financial Times" OR "The Information") when:1d'), 15).catch(() => []),
  ]);
  const seen = new Set();
  const merged = [];
  for (const it of lists.flat()) {
    const k = newsDedupeKey(it.title);
    if (!k || seen.has(k)) continue;
    if (/Walmart|Apple Pay|Pixel|Patreon|YouTube|Oura|sleep-track|LinkedIn.?AI slop/i.test(it.title)) continue;
    seen.add(k);
    merged.push({ ...it, score: scoreAiItem(it) });
  }
  merged.sort((a, b) => b.score - a.score);
  const top = merged.slice(0, 10);
  const zh = await ensureZhTitles(top);
  const items = zh.map((it, i) => toAiDigestItem(it, i + 1));
  const long = items[0];
  const cats = [...new Set(items.map((x) => x.category))].slice(0, 4).join('、');
  return {
    items,
    meta: {
      longform: long
        ? {
            rank: long.rank,
            title: long.title,
            why: `本日最高分（${long.score}）。${long.reason}`,
          }
        : null,
      trend: `過去 24 小時高質量信源集中在「${cats}」。立即更新後的榜單依 Reuters／Bloomberg／WSJ／TechCrunch 等加權，分數為啟發式（非人工複核）。`,
    },
  };
}

async function fetchUsIndices() {
  const url =
    'https://query1.finance.yahoo.com/v7/finance/spark?symbols=%5EGSPC,%5EIXIC,%5EDJI,%5ESOX&range=5d&interval=1d';
  const data = await fetchJson(url);
  const results = data?.spark?.result || [];
  const by = {};
  for (const r of results) {
    const resp = (r.response || [])[0] || {};
    const st = statsFromChart(resp);
    const meta = resp.meta || {};
    const ts = meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000) : new Date();
    const day = ts.toLocaleDateString('sv-SE', { timeZone: 'America/New_York' });
    by[r.symbol] = { price: st.price, chg: st.dayChangePct, day };
  }
  const mk = (id, label, sym) => {
    const x = by[sym] || {};
    const dir = (x.chg || 0) >= 0 ? 'up' : 'down';
    const chgStr =
      x.chg == null ? '—' : `${x.chg >= 0 ? '+' : ''}${x.chg.toFixed(2)}%`;
    return {
      id,
      label: `${label} • ${x.day || ''}`,
      value: fmtIndexValue(x.price),
      change: chgStr,
      direction: dir,
    };
  };
  return [
    mk('sp500', 'S&P 500', '^GSPC'),
    mk('nasdaq', 'Nasdaq', '^IXIC'),
    mk('sox', '費半 SOX', '^SOX'),
    mk('dow', '道瓊 Dow', '^DJI'),
  ];
}

function indexCard(id, label, price, prev) {
  const chg = price != null && prev ? price - prev : null;
  const pct = price != null && prev ? ((price / prev) - 1) * 100 : null;
  const dir = (chg || 0) >= 0 ? 'up' : 'down';
  const change =
    chg == null
      ? '—'
      : `${chg >= 0 ? '+' : ''}${fmtNum(chg, 2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;
  return { id, label, value: fmtIndexValue(price), change, direction: dir };
}

export async function fetchMarketUpdate(body = {}) {
  const items = Array.isArray(body.items) ? body.items : [];
  const wanted = items.filter((it) => it && it.code);

  const jobs = [
    fetchUsIndices().catch((e) => ({ error: String(e.message || e) })),
    fetchMisPrices(wanted).catch(() => ({})),
    fetchRss(gnews('台股 OR 加權指數 OR 台積電'), 10).catch(() => []),
    fetchAiDigest().catch(() => ({ items: [], meta: null })),
    fetchCnnMajor().catch(() => []),
    fetchRss(gnews('site:bloomberg.com (markets OR stocks OR AI)'), 10).catch(() => []),
    fetchRss(gnews('site:foxbusiness.com')).then((list) =>
      list.length
        ? list
        : fetchRss('https://moxie.foxbusiness.com/google-publisher/latest.xml', 10)
    ).catch(() => []),
  ];

  const chartItems = wanted.map((it) => ({
    ...it,
    symbol: yahooSymbol(it.code, it.market),
  }));

  const yahooPromise = fetchAllYahoo([...chartItems, { symbol: '^TWII', code: '^TWII' }]).catch(() => ({}));

  const [usMarkets, mis, twNews, aiPack, cnn, bloomberg, fox, bySymbol] = await Promise.all([
    ...jobs,
    yahooPromise,
  ]);

  const quotes = {};
  for (const it of chartItems) {
    const stats = { ...(it.symbol && bySymbol?.[it.symbol] ? bySymbol[it.symbol] : {}) };
    const misRow = mis?.[String(it.code).toUpperCase()] || mis?.[it.code];
    if (misRow?.price != null) {
      stats.price = roundPrice(misRow.price);
      if (misRow.prev != null) {
        stats.prev = roundPrice(misRow.prev);
        stats.dayChangePct = ((misRow.price / misRow.prev) - 1) * 100;
      }
      stats.source = 'mis+yahoo';
    } else if (stats.price != null) {
      stats.price = roundPrice(stats.price);
      stats.ma5 = roundPrice(stats.ma5);
      stats.ma20 = roundPrice(stats.ma20);
      stats.ma60 = roundPrice(stats.ma60);
      stats.source = 'yahoo';
    }
    if (stats.ma5 != null) stats.ma5 = roundPrice(stats.ma5);
    if (stats.ma20 != null) stats.ma20 = roundPrice(stats.ma20);
    if (stats.ma60 != null) stats.ma60 = roundPrice(stats.ma60);
    if (stats.price != null) quotes[it.code] = stats;
  }

  const twii = mis?.T00 || mis?.t00;
  const tpex = mis?.O00 || mis?.o00;
  const yahooTwii = bySymbol?.['^TWII'] || null;

  const taiwanIndices = [
    indexCard(
      'taiex',
      '加權指數 TAIEX',
      twii?.price ?? yahooTwii?.price,
      twii?.prev ?? yahooTwii?.prev
    ),
    indexCard('tpex', '櫃買指數 TPEx', tpex?.price, tpex?.prev),
  ];

  const aiNews = Array.isArray(aiPack) ? aiPack : aiPack?.items || [];
  const aiMetaIn = Array.isArray(aiPack) ? null : aiPack?.meta;

  // 國際／AI 頭條：英文標題一律翻成繁體中文（原文進 en）
  const [cnnZh, bbgZh, foxZh, aiZh, twZh] = await Promise.all([
    ensureZhTitles(cnn || []),
    ensureZhTitles(bloomberg || []),
    ensureZhTitles(fox || []),
    Promise.resolve(aiNews || []),
    ensureZhTitles(twNews || []),
  ]);

  const quoteOk = Object.values(quotes).filter((q) => q && q.price != null).length;
  const newsCount =
    (twZh?.length || 0) +
    (aiZh?.length || 0) +
    (cnnZh?.length || 0) +
    (bbgZh?.length || 0) +
    (foxZh?.length || 0);

  return {
    ok: true,
    lastUpdate: formatLastUpdate(),
    reportDate: formatReportDate(),
    quotes,
    taiwanIndices,
    usMarkets: Array.isArray(usMarkets) ? usMarkets : [],
    news: {
      tw: twZh,
      ai: aiZh,
      aiMeta: aiMetaIn || undefined,
      cnn: cnnZh,
      bloomberg: bbgZh,
      fox: foxZh,
    },
    fetched: { quotes: quoteOk, news: newsCount },
  };
}
