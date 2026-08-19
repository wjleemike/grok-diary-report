/**
 * Grok 交易紀錄寫入 Sheet
 * 1. 貼上 → 儲存
 * 2. 先執行 testListSheets（授權）
 * 3. 部署 → 新增部署 → 網頁應用程式 → 任何人
 */

var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_NAME = '交易紀錄';

/** 在編輯器執行這個：授權 + 列出所有分頁名稱 */
function testListSheets() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var names = ss.getSheets().map(function (s) {
    return s.getName();
  });
  Logger.log(names.join(' | '));
  return names;
}

/** 在編輯器執行：測試寫入一列到「交易紀錄」 */
function testAppend() {
  var result = appendTrade_({
    code: 'TEST',
    name: '測試',
    type: 'buy',
    date: '2026-08-19',
    shares: 1,
    price: 1,
    reason: 'editor-test',
  });
  Logger.log(JSON.stringify(result));
  return result;
}

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  // 常見別名
  sheet =
    ss.getSheetByName('交易明細') ||
    ss.getSheetByName('交易記錄') ||
    ss.getSheetByName('交易记录');
  if (sheet) return sheet;

  // 沒有就新建「交易紀錄」並寫表頭
  sheet = ss.insertSheet(SHEET_NAME);
  sheet.appendRow([
    '交易編號',
    '交易日期',
    '買/賣/股利',
    '代號',
    '股票',
    '交易類別',
    '買入股數',
    '買入價格',
    '賣出股數',
    '賣出價格',
    '現價',
    '手續費',
    '折讓後手續費',
    '交易稅',
    '成交價金',
    '交易成本',
    '支出',
    '收入',
    '買入比現價高',
    '決策原因',
    '手續費折數',
  ]);
  return sheet;
}

function appendTrade_(data) {
  data = data || {};
  var sheet = getTargetSheet_();
  var nextId = sheet.getLastRow();

  var typeMap = {
    buy: '買',
    sell: '賣',
    cash_div: '股利',
    stock_div: '股利',
  };
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

  sheet.appendRow([
    nextId,
    data.date || '',
    typeLabel,
    String(data.code || ''),
    data.name || '',
    tradeClass,
    buyShares,
    buyPrice,
    sellShares,
    sellPrice,
    '',
    fee,
    fee,
    Number(data.tax) || 0,
    '',
    fee,
    expense,
    income,
    '',
    data.reason || '',
    data.feeDiscount != null ? data.feeDiscount : 0.6,
  ]);

  return { ok: true, id: nextId, sheet: sheet.getName() };
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
      version: 3,
    });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else {
      throw new Error('no payload');
    }
    return json_(appendTrade_(data));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
