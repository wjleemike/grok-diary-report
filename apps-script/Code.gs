/**
 * Grok 交易紀錄 (v8) — 加速 + 編號純文字 + 名稱對照
 */
var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';
var COLS = 21;

var NAME_MAP = {
  '2330': '台積電', '2382': '廣達', '2356': '英業達', '2376': '技嘉',
  '3035': '智原', '3227': '原相', '2603': '長榮', '2891': '中信金',
  '2884': '玉山金', '2883': '凱基金', '2727': '王品', '2014': '中鴻',
  '00929': '復華台灣科技優息', '00919': '群益台灣精選高息',
  '00937B': '群益ESG投等債20+', '00882': '中信中國高股息',
  '00940': '元大台灣價值高息', '00939': '統一台灣高息動能',
  '00918': '大華優利高填息30',
};

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME)
    || ss.getSheetByName('交易明細')
    || ss.getSheets()[0];
}

/** 只掃代號欄，最快 */
function findLastDataRow_(sheet) {
  var vals = sheet.getRange('D2:D400').getDisplayValues();
  for (var i = vals.length - 1; i >= 0; i--) {
    if (String(vals[i][0]).trim() !== '') return i + 2;
  }
  return 1;
}

function nextTradeId_(sheet, upToRow) {
  if (upToRow < 2) return 1;
  var ids = sheet.getRange(2, 1, upToRow, 1).getDisplayValues();
  var max = 0;
  for (var i = 0; i < ids.length; i++) {
    var raw = String(ids[i][0]).replace(/,/g, '').trim();
    if (!raw || raw.indexOf('/') >= 0) continue;
    var n = parseInt(raw, 10);
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
  var sheet = getTargetSheet_();
  var lastData = findLastDataRow_(sheet);
  var insertRow = lastData + 1;
  var tradeId = nextTradeId_(sheet, lastData);

  // 只複製自動區公式 + 下拉（比整列 copy 快）
  if (lastData >= 2) {
    sheet.getRange(lastData, 3).copyTo(sheet.getRange(insertRow, 3), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
    sheet.getRange(lastData, 6).copyTo(sheet.getRange(insertRow, 6), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
    sheet.getRange(lastData, 11, 1, 9).copyTo(sheet.getRange(insertRow, 11, 1, 9)); // K-S 自動區
  }

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var code = String(data.code || '').trim();
  var name = data.name || NAME_MAP[code] || NAME_MAP[code.toUpperCase()] || '';
  var tradeClass = data.tradeClass || '一般';

  var buyShares = '', buyPrice = '', sellShares = '', sellPrice = '', incomeManual = '';
  if (data.type === 'buy') {
    buyShares = Number(data.shares) || 0;
    buyPrice = Number(data.price) || 0;
  } else if (data.type === 'sell') {
    sellShares = Number(data.shares) || 0;
    sellPrice = Number(data.price) || 0;
  } else if (data.type === 'cash_div') {
    incomeManual = Number(data.price) || Number(data.amount) || 0;
  } else if (data.type === 'stock_div') {
    buyShares = Number(data.shares) || 0;
  }

  // 編號用「文字」寫入，徹底避免變成日期
  sheet.getRange(insertRow, 1).setNumberFormat('@').setValue(String(tradeId));
  sheet.getRange(insertRow, 2).setValue(parseDate_(data.date)).setNumberFormat('yyyy/mm/dd');
  sheet.getRange(insertRow, 3).setValue(typeLabel);
  sheet.getRange(insertRow, 4).setNumberFormat('@').setValue(code);
  sheet.getRange(insertRow, 5).setValue(name);
  sheet.getRange(insertRow, 6).setValue(tradeClass);
  sheet.getRange(insertRow, 7).setValue(buyShares === '' ? '' : buyShares);
  sheet.getRange(insertRow, 8).setValue(buyPrice === '' ? '' : buyPrice);
  sheet.getRange(insertRow, 9).setValue(sellShares === '' ? '' : sellShares);
  sheet.getRange(insertRow, 10).setValue(sellPrice === '' ? '' : sellPrice);
  if (data.type === 'cash_div' && incomeManual !== '') {
    sheet.getRange(insertRow, 18).setValue(incomeManual);
  }
  sheet.getRange(insertRow, 20).setValue(data.reason || '');
  sheet.getRange(insertRow, 21).setValue(data.feeDiscount != null ? data.feeDiscount : 0.6);

  return { ok: true, id: tradeId, row: insertRow, sheet: sheet.getName(), name: name };
}

function doGet(e) {
  try {
    var p = e && e.parameter ? e.parameter : {};
    if (p.action === 'append' && p.payload) {
      return json_(appendTrade_(JSON.parse(p.payload)));
    }
    return json_({ ok: true, service: 'grok-trade-log', target: SHEET_NAME, version: 8 });
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
