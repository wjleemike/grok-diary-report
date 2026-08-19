/**
 * Grok 交易紀錄 (v9)
 * - 交易編號 = 最後有效編號 + 1（略過日期格式的錯誤列）
 * - 編號以文字寫入，避免 1900/x/x
 * - 一次寫入多欄，加快速度
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

function findLastDataRow_(sheet) {
  var vals = sheet.getRange('D2:D300').getDisplayValues();
  for (var i = vals.length - 1; i >= 0; i--) {
    if (String(vals[i][0]).trim() !== '') return i + 2;
  }
  return 1;
}

/** 最後有效編號 + 1；略過 Date / 1900/x/x */
function nextTradeId_(sheet, upToRow) {
  if (upToRow < 2) return 1;
  var vals = sheet.getRange(2, 1, upToRow, 1).getValues();
  var displays = sheet.getRange(2, 1, upToRow, 1).getDisplayValues();
  var max = 0;
  for (var i = 0; i < vals.length; i++) {
    var v = vals[i][0];
    var d = String(displays[i][0] || '');
    if (v instanceof Date) continue;
    if (d.indexOf('/') >= 0) continue;
    var n = parseInt(d.replace(/,/g, ''), 10);
    if (!isNaN(n) && n > max && n < 100000) max = n;
  }
  return max + 1;
}

function parseDate_(s) {
  var m = String(s || '').match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  return new Date();
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getSheet_();
  var lastData = findLastDataRow_(sheet);
  var row = lastData + 1;
  var tradeId = nextTradeId_(sheet, lastData);

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var code = String(data.code || '').trim();
  var name = (data.name || NAME_MAP[code] || '') + '';
  var tradeClass = data.tradeClass || '一般';

  var buyShares = '', buyPrice = '', sellShares = '', sellPrice = '';
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

  // A-J 一次寫入（較快）
  // A 用字串編號，避免被當成日期序號
  sheet.getRange(row, 1, 1, 10).setValues([[
    String(tradeId),
    parseDate_(data.date),
    typeLabel,
    code,
    name,
    tradeClass,
    buyShares,
    buyPrice,
    sellShares,
    sellPrice,
  ]]);

  // 強制格式：A 文字、B 日期、D 文字
  sheet.getRange(row, 1).setNumberFormat('@');
  sheet.getRange(row, 2).setNumberFormat('yyyy/mm/dd');
  sheet.getRange(row, 4).setNumberFormat('@');

  if (income !== '') sheet.getRange(row, 18).setValue(income);
  sheet.getRange(row, 20).setValue(data.reason || '');
  sheet.getRange(row, 21).setValue(0.6);

  return { ok: true, id: tradeId, row: row, sheet: sheet.getName(), name: name };
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.action === 'append' && p.payload) {
      return json_(appendTrade_(JSON.parse(p.payload)));
    }
    return json_({ ok: true, service: 'grok-trade-log', target: SHEET_NAME, version: 9 });
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
