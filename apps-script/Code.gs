/**
 * Grok 交易紀錄 (v10)
 * - 編號 = 最後有效編號 + 1（略過 1900/x/x）
 * - 編號以純文字寫入（先設格式再寫值）
 * - 用快取減少掃描，加快寫入
 *
 * 更新：貼上 → 儲存 → 部署 → 管理部署 → 新版本
 */
var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';

var NAME_MAP = {
  '2330': '台積電', '2382': '廣達', '2356': '英業達', '2376': '技嘉',
  '3035': '智原', '3227': '原相', '2603': '長榮', '2891': '中信金',
  '2884': '玉山金', '2883': '凱基金', '2727': '王品', '2014': '中鴻',
  '00929': '復華台灣科技優息', '00919': '群益台灣精選高息',
  '00937B': '群益ESG投等債20+', '00882': '中信中國高股息',
  '00940': '元大台灣價值高息', '00939': '統一台灣高息動能',
  '00918': '大華優利高填息30',
};

function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.getSheetByName('交易明細') || ss.getSheets()[0];
}

function parseId_(raw, display) {
  if (raw instanceof Date) return 0;
  var d = String(display || raw || '');
  if (d.indexOf('/') >= 0 || d.indexOf('-') >= 4) return 0;
  var n = parseInt(String(d).replace(/,/g, ''), 10);
  if (isNaN(n) || n < 1 || n > 99999) return 0;
  return n;
}

function scanCursor_(sheet) {
  var last = Math.min(sheet.getLastRow(), 350);
  if (last < 2) return { lastRow: 1, lastId: 0 };
  var block = sheet.getRange(2, 1, last - 1, 4).getDisplayValues();
  var lastRow = 1;
  var lastId = 0;
  for (var i = 0; i < block.length; i++) {
    var code = String(block[i][3] || '').trim();
    var idDisp = String(block[i][0] || '').trim();
    if (!code && !idDisp) continue;
    lastRow = i + 2;
    var n = parseId_(idDisp, idDisp);
    if (n > lastId) lastId = n;
  }
  return { lastRow: lastRow, lastId: lastId };
}

function getCursor_(sheet) {
  var p = PropertiesService.getScriptProperties();
  var lastRow = Number(p.getProperty('lastRow') || 0);
  var lastId = Number(p.getProperty('lastId') || 0);
  if (lastRow >= 2 && lastId >= 1) return { lastRow: lastRow, lastId: lastId };
  var c = scanCursor_(sheet);
  p.setProperties({ lastRow: String(c.lastRow), lastId: String(c.lastId) });
  return c;
}

function saveCursor_(row, id) {
  PropertiesService.getScriptProperties().setProperties({
    lastRow: String(row),
    lastId: String(id),
  });
}

function parseDate_(s) {
  var m = String(s || '').match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  return new Date();
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getSheet_();
  var cur = getCursor_(sheet);
  var row = cur.lastRow + 1;
  var tradeId = cur.lastId + 1;

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var code = String(data.code || '').trim();
  var name = String(data.name || NAME_MAP[code] || '');
  var tradeClass = data.tradeClass || '一般';

  var buyShares = '';
  var buyPrice = '';
  var sellShares = '';
  var sellPrice = '';
  var income = '';
  if (data.type === 'buy') {
    buyShares = Number(data.shares) || 0;
    buyPrice = Number(data.price) || 0;
  } else if (data.type === 'sell') {
    sellShares = Number(data.shares) || 0;
    sellPrice = Number(data.price) || 0;
  } else if (data.type === 'cash_div') {
    income = Number(data.price) || Number(data.amount) || 0;
  } else if (data.type === 'stock_div') {
    buyShares = Number(data.shares) || 0;
  }

  var a = sheet.getRange(row, 1);
  a.setNumberFormat('@');
  a.setValue(String(tradeId));

  var b = sheet.getRange(row, 2);
  b.setNumberFormat('yyyy/mm/dd');
  b.setValue(parseDate_(data.date));

  sheet.getRange(row, 3, 1, 8).setValues([[
    typeLabel, code, name, tradeClass, buyShares, buyPrice, sellShares, sellPrice,
  ]]);
  sheet.getRange(row, 4).setNumberFormat('@');

  if (income !== '') sheet.getRange(row, 18).setValue(income);
  if (data.reason) sheet.getRange(row, 20).setValue(data.reason);
  sheet.getRange(row, 21).setValue(0.6);

  saveCursor_(row, tradeId);
  return { ok: true, id: tradeId, row: row, sheet: sheet.getName(), name: name };
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.action === 'append' && p.payload) {
      return json_(appendTrade_(JSON.parse(p.payload)));
    }
    if (p.action === 'resetCursor') {
      PropertiesService.getScriptProperties().deleteAllProperties();
      var c = scanCursor_(getSheet_());
      saveCursor_(c.lastRow, c.lastId);
      return json_({ ok: true, reset: c, version: 10 });
    }
    return json_({ ok: true, service: 'grok-trade-log', target: SHEET_NAME, version: 10 });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var data = e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : JSON.parse(e.parameter.payload);
    return json_(appendTrade_(data));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
