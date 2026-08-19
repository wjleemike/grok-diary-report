/**
 * Grok 交易紀錄寫入 Sheet (v5)
 * 寫在「可見且有資料」的最後一列下方
 */

var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';

function testListSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log(ss.getSheets().map(function (s) { return s.getName(); }).join(' | '));
}

function testAppend() {
  var result = appendTrade_({
    code: 'TEST', name: '測試', type: 'buy',
    date: '2026-08-19', shares: 1, price: 1, reason: 'editor-test',
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

/** 只掃前 500 列或有內容的範圍，且只在「有資料」的列檢查隱藏 */
function findLastVisibleDataRow_(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 1;
  // 限制掃描上限，避免預填公式列導致超時
  var scanTo = Math.min(last, 500);
  var values = sheet.getRange(1, 1, scanTo, 4).getValues();
  for (var r = scanTo; r >= 2; r--) {
    var a = values[r - 1][0];
    var b = values[r - 1][1];
    var d = values[r - 1][3];
    if (a === '' || a == null) {
      if (b === '' || b == null) {
        if (d === '' || d == null) continue;
      }
    }
    // 有資料才檢查是否隱藏
    try {
      if (sheet.isRowHiddenByUser(r)) continue;
    } catch (e) {}
    return r;
  }
  return 1;
}

function nextTradeId_(sheet, upToRow) {
  if (upToRow < 2) return 1;
  var ids = sheet.getRange(2, 1, upToRow, 1).getValues();
  var max = 0;
  for (var i = 0; i < ids.length; i++) {
    var n = Number(ids[i][0]);
    if (!isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getTargetSheet_();
  var lastData = findLastVisibleDataRow_(sheet);
  var insertRow = lastData + 1;
  var tradeId = nextTradeId_(sheet, lastData);

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || String(data.type || '');
  var tradeClass = data.tradeClass || '一般';
  var fee = Number(data.fee) || 0;

  var buyShares = '';
  var buyPrice = '';
  var sellShares = '';
  var sellPrice = '';
  var expense = 0;
  var income = 0;

  if (data.type === 'buy') {
    buyShares = Number(data.shares) || 0;
    buyPrice = Number(data.price) || 0;
    expense = Math.round(buyShares * buyPrice + fee);
  } else if (data.type === 'sell') {
    sellShares = Number(data.shares) || 0;
    sellPrice = Number(data.price) || 0;
    income = Math.round(sellShares * sellPrice - fee);
  } else if (data.type === 'cash_div') {
    income = Number(data.price) || Number(data.amount) || 0;
  } else if (data.type === 'stock_div') {
    buyShares = Number(data.shares) || 0;
    buyPrice = 0;
  }

  var row = [
    tradeId, data.date || '', typeLabel, String(data.code || ''), data.name || '', tradeClass,
    buyShares, buyPrice, sellShares, sellPrice, '',
    fee, fee, Number(data.tax) || 0, '', fee, expense, income, '',
    data.reason || '', data.feeDiscount != null ? data.feeDiscount : 0.6,
  ];

  sheet.getRange(insertRow, 1, 1, row.length).setValues([row]);
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
      version: 5,
      note: 'insert below last visible data row',
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
