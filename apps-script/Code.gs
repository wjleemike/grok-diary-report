/**
 * Grok 交易紀錄 (v11)
 *
 * 「1900/8/28」= 編號 241 被設成日期格式。
 * 本版會把 A 欄整欄改成數字，並把日期列還原成編號。
 *
 * 第一次請在編輯器選函式 fixTradeIds → 執行（立刻修好現有列）
 * 然後：部署 → 管理部署 → 新版本
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

function dateToSerial_(d) {
  var epoch = new Date(1899, 11, 30);
  return Math.round((d.getTime() - epoch.getTime()) / 86400000);
}

function fixTradeIds() {
  var sheet = getSheet_();
  var last = Math.max(sheet.getLastRow(), 2);
  var range = sheet.getRange(2, 1, last, 1);
  var values = range.getValues();
  var fixed = 0;
  for (var i = 0; i < values.length; i++) {
    var v = values[i][0];
    if (v instanceof Date) {
      values[i][0] = dateToSerial_(v);
      fixed++;
    }
  }
  range.setNumberFormat('0');
  range.setValues(values);
  sheet.getRange('A2:A').setNumberFormat('0');
  Logger.log('fixed ' + fixed + ' ids');
  return { ok: true, fixed: fixed, lastRow: last };
}

function parseId_(raw, display) {
  if (raw instanceof Date) return dateToSerial_(raw);
  var d = String(display || raw || '');
  if (d.indexOf('/') >= 0) return 0;
  var n = parseInt(String(d).replace(/,/g, ''), 10);
  if (isNaN(n) || n < 1 || n > 99999) return 0;
  return n;
}

function scanCursor_(sheet) {
  var last = Math.min(sheet.getLastRow(), 400);
  if (last < 2) return { lastRow: 1, lastId: 0 };
  var raw = sheet.getRange(2, 1, last - 1, 4).getValues();
  var lastRow = 1;
  var lastId = 0;
  for (var i = 0; i < raw.length; i++) {
    var idVal = raw[i][0];
    var code = String(raw[i][3] || '').trim();
    var idNum = 0;
    if (idVal instanceof Date) idNum = dateToSerial_(idVal);
    else idNum = parseId_(idVal, idVal);
    if (!code && !idNum) continue;
    lastRow = i + 2;
    if (idNum > lastId) lastId = idNum;
  }
  return { lastRow: lastRow, lastId: lastId };
}

function parseDate_(s) {
  var m = String(s || '').match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  return new Date();
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getSheet_();
  var cur = scanCursor_(sheet);
  var row = cur.lastRow + 1;
  var tradeId = cur.lastId + 1;

  sheet.getRange('A2:A').setNumberFormat('0');

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

  var idCell = sheet.getRange(row, 1);
  idCell.clearFormat();
  idCell.setNumberFormat('0');
  idCell.setValue(Number(tradeId));

  var dateCell = sheet.getRange(row, 2);
  dateCell.setNumberFormat('yyyy/mm/dd');
  dateCell.setValue(parseDate_(data.date));

  sheet.getRange(row, 3, 1, 8).setValues([[
    typeLabel, code, name, tradeClass, buyShares, buyPrice, sellShares, sellPrice,
  ]]);
  sheet.getRange(row, 4).setNumberFormat('@');

  if (income !== '') sheet.getRange(row, 18).setValue(income);
  if (data.reason) sheet.getRange(row, 20).setValue(data.reason);
  sheet.getRange(row, 21).setValue(0.6);

  return { ok: true, id: tradeId, row: row, sheet: sheet.getName(), name: name };
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.action === 'append' && p.payload) {
      return json_(appendTrade_(JSON.parse(p.payload)));
    }
    if (p.action === 'fixIds') {
      return json_(fixTradeIds());
    }
    return json_({ ok: true, service: 'grok-trade-log', target: SHEET_NAME, version: 11 });
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
