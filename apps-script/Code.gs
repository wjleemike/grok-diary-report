/**
 * Grok 交易紀錄寫入 Sheet (v6)
 * - 寫在可見最後資料列下方
 * - 複製上一列格式／下拉／公式（自動區）
 * - 交易編號強制數字、日期格式與表內一致
 */

var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';
var COLS = 21;

function testListSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(ss.getSheets().map(function (s) { return s.getName(); }).join(' | '));
}

function testAppend() {
  var result = appendTrade_({
    code: '2330', name: '台積電', type: 'buy',
    date: '2026-08-19', shares: 1, price: 100, reason: 'format-test',
  });
  Logger.log(JSON.stringify(result));
  return result;
}

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME)
    || ss.getSheetByName('交易明細')
    || ss.getSheetByName('交易記錄');
  if (sheet) return sheet;
  sheet = ss.insertSheet(SHEET_NAME);
  sheet.appendRow([
    '交易編號', '交易日期', '買/賣/股利', '代號', '股票', '交易類別',
    '買入股數', '買入價格', '賣出股數', '賣出價格', '現價',
    '手續費', '折讓後手續費', '交易稅', '成交價金', '交易成本',
    '支出', '收入', '買入比現價高', '決策原因', '手續費折數',
  ]);
  return sheet;
}

function findLastVisibleDataRow_(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 1;
  var scanTo = Math.min(last, 500);
  var values = sheet.getRange(1, 1, scanTo, 4).getValues();
  for (var r = scanTo; r >= 2; r--) {
    var a = values[r - 1][0];
    var b = values[r - 1][1];
    var d = values[r - 1][3];
    var emptyA = a === '' || a == null;
    var emptyB = b === '' || b == null;
    var emptyD = d === '' || d == null;
    if (emptyA && emptyB && emptyD) continue;
    // 略過誤寫成日期的編號列仍算有資料
    try {
      if (sheet.isRowHiddenByUser(r)) continue;
    } catch (e) {}
    return r;
  }
  return 1;
}

function nextTradeId_(sheet, upToRow) {
  if (upToRow < 2) return 1;
  // 用顯示值，避免日期序號干擾
  var ids = sheet.getRange(2, 1, upToRow, 1).getDisplayValues();
  var max = 0;
  for (var i = 0; i < ids.length; i++) {
    var raw = String(ids[i][0]).replace(/,/g, '').trim();
    // 跳過像 1900/8/28 的日期顯示
    if (raw.indexOf('/') >= 0) continue;
    var n = parseInt(raw, 10);
    if (!isNaN(n) && n > max && n < 100000) max = n;
  }
  return max + 1;
}

function parseDate_(s) {
  if (!s) return new Date();
  // 支援 2026-08-19 或 2026/8/19
  var m = String(s).match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  var d = new Date(s);
  return isNaN(d.getTime()) ? new Date() : d;
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getTargetSheet_();
  var lastData = findLastVisibleDataRow_(sheet);
  var insertRow = lastData + 1;
  var tradeId = nextTradeId_(sheet, lastData);

  // 複製上一列：格式、下拉選單、自動區公式
  if (lastData >= 2) {
    sheet.getRange(lastData, 1, 1, COLS).copyTo(sheet.getRange(insertRow, 1, 1, COLS));
  }

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var tradeClass = data.tradeClass || '一般';
  if (String(data.code || '').indexOf('00') === 0 || /[A-Za-z]/.test(String(data.code || ''))) {
    // ETF 代號常含字母或 00 開頭；前端也有判斷，這裡再保險
  }
  if (data.tradeClass) tradeClass = data.tradeClass;

  var buyShares = '';
  var buyPrice = '';
  var sellShares = '';
  var sellPrice = '';
  var incomeManual = '';

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
    buyPrice = '';
  }

  // 只覆寫「手動輸入區」欄位，保留自動區公式
  // A 交易編號
  sheet.getRange(insertRow, 1).setValue(tradeId).setNumberFormat('0');
  // B 交易日期
  sheet.getRange(insertRow, 2).setValue(parseDate_(data.date)).setNumberFormat('yyyy/mm/dd');
  // C 買/賣/股利
  sheet.getRange(insertRow, 3).setValue(typeLabel);
  // D 代號（文字，避免前導 0 消失）
  sheet.getRange(insertRow, 4).setValue(String(data.code || '')).setNumberFormat('@');
  // E 股票
  sheet.getRange(insertRow, 5).setValue(data.name || '');
  // F 交易類別
  sheet.getRange(insertRow, 6).setValue(tradeClass);
  // G-J 股數價格
  sheet.getRange(insertRow, 7).setValue(buyShares === '' ? '' : buyShares);
  sheet.getRange(insertRow, 8).setValue(buyPrice === '' ? '' : buyPrice);
  sheet.getRange(insertRow, 9).setValue(sellShares === '' ? '' : sellShares);
  sheet.getRange(insertRow, 10).setValue(sellPrice === '' ? '' : sellPrice);

  // 現金股利：寫入「收入」欄（R = 18）
  if (data.type === 'cash_div' && incomeManual !== '') {
    sheet.getRange(insertRow, 18).setValue(incomeManual);
  }

  // T 決策原因 (20)
  sheet.getRange(insertRow, 20).setValue(data.reason || '');
  // U 手續費折數 (21) 預設 0.6
  sheet.getRange(insertRow, 21).setValue(data.feeDiscount != null ? data.feeDiscount : 0.6);

  return { ok: true, id: tradeId, row: insertRow, sheet: sheet.getName() };
}

function doGet(e) {
  try {
    var p = e && e.parameter ? e.parameter : {};
    if (p.action === 'append' && p.payload) {
      return json_(appendTrade_(JSON.parse(p.payload)));
    }
    return json_({
      ok: true,
      service: 'grok-trade-log',
      target: SHEET_NAME,
      version: 6,
      note: 'format match + copy formulas',
    });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var data;
    if (e && e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);
    else if (e && e.parameter && e.parameter.payload) data = JSON.parse(e.parameter.payload);
    else throw new Error('no payload');
    return json_(appendTrade_(data));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
