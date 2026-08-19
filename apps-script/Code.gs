/**
 * Grok 交易紀錄寫入 Sheet (v7)
 * 交易編號強制純數字，避免被格式成 1900/x/x
 */

var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';
var COLS = 21;

function testAppend() {
  return appendTrade_({
    code: '2330', name: '台積電', type: 'buy',
    date: '2026-08-19', shares: 1, price: 100, reason: 'v7-test',
  });
}

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME)
    || ss.getSheetByName('交易明細')
    || ss.getSheetByName('交易記錄')
    || ss.getSheets()[0];
}

function isBadIdDisplay_(s) {
  s = String(s || '');
  return s.indexOf('/') >= 0 || s.indexOf('-') >= 0 && s.length > 8;
}

function findLastVisibleDataRow_(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 1;
  var scanTo = Math.min(last, 500);
  var values = sheet.getRange(1, 1, scanTo, 4).getDisplayValues();
  for (var r = scanTo; r >= 2; r--) {
    var a = values[r - 1][0];
    var b = values[r - 1][1];
    var d = values[r - 1][3];
    if (!a && !b && !d) continue;
    // 略過編號已壞成日期的列（例如 1900/8/28），往上找正常列
    if (a && isBadIdDisplay_(a) && !d) continue;
    try {
      if (sheet.isRowHiddenByUser(r)) continue;
    } catch (e) {}
    return r;
  }
  return 1;
}

function nextTradeId_(sheet, upToRow) {
  if (upToRow < 2) return 1;
  var ids = sheet.getRange(2, 1, upToRow, 1).getDisplayValues();
  var max = 0;
  for (var i = 0; i < ids.length; i++) {
    var raw = String(ids[i][0]).replace(/,/g, '').trim();
    if (!raw || isBadIdDisplay_(raw)) continue;
    var n = parseInt(raw, 10);
    if (!isNaN(n) && n > max && n < 100000) max = n;
  }
  return max > 0 ? max + 1 : 1;
}

function parseDate_(s) {
  var m = String(s || '').match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Date();
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getTargetSheet_();
  var lastData = findLastVisibleDataRow_(sheet);
  var insertRow = lastData + 1;
  var tradeId = nextTradeId_(sheet, lastData);

  // 先複製上一列（下拉、自動區公式、顏色）
  if (lastData >= 2) {
    sheet.getRange(lastData, 1, 1, COLS).copyTo(sheet.getRange(insertRow, 1, 1, COLS));
  }

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var tradeClass = data.tradeClass || '一般';

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
  }

  // —— 交易編號：清格式後強制純數字（避免 1900/8/28）——
  var idCell = sheet.getRange(insertRow, 1);
  idCell.clearFormat();
  idCell.setNumberFormat('0');
  idCell.setValue(Number(tradeId));

  // 交易日期
  var dateCell = sheet.getRange(insertRow, 2);
  dateCell.setValue(parseDate_(data.date));
  dateCell.setNumberFormat('yyyy/mm/dd');

  sheet.getRange(insertRow, 3).setValue(typeLabel);
  sheet.getRange(insertRow, 4).setNumberFormat('@').setValue(String(data.code || ''));
  sheet.getRange(insertRow, 5).setValue(data.name || '');
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

  // 再寫一次編號，防止 copyTo 後被格式蓋掉
  idCell.setNumberFormat('0');
  idCell.setValue(Number(tradeId));

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
      version: 7,
      note: 'force numeric trade id',
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
