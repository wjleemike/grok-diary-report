/**
 * Grok 每日報告 — 新增交易紀錄寫入 Google Sheet
 *
 * 設定：
 * 1. 貼上本檔 → 儲存
 * 2. 部署 → 管理部署 → 編輯 → 版本選「新版本」→ 部署
 *    （或新增部署：網頁應用程式 / 執行身分：我 / 任何人）
 * 3. 網址維持貼在網站 src/config.js
 *
 * 寫入方式：GET ?action=append&payload=<URL-encoded JSON>
 */

var SPREADSHEET_ID = '14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w';
var SHEET_GID = 593571516;
var SHEET_NAME = ''; // 可改成實際分頁名稱，例如「交易明細」

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  if (SHEET_NAME) {
    var byName = ss.getSheetByName(SHEET_NAME);
    if (byName) return byName;
  }
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() == SHEET_GID) return sheets[i];
  }
  return ss.getSheets()[0];
}

function appendTrade_(data) {
  var sheet = getTargetSheet_();
  var nextId = sheet.getLastRow();

  var typeMap = { buy: '買', sell: '賣', cash_div: '股利', stock_div: '股利' };
  var typeLabel = typeMap[data.type] || data.type || '';
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
    nextId,
    data.date || '',
    typeLabel,
    String(data.code || ''),
    data.name || '',
    tradeClass,
    buyShares === '' ? '' : buyShares,
    buyPrice === '' ? '' : buyPrice,
    sellShares === '' ? '' : sellShares,
    sellPrice === '' ? '' : sellPrice,
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
    data.feeDiscount != null ? data.feeDiscount : 0.6
  ];

  sheet.appendRow(row);
  return { ok: true, id: nextId, sheet: sheet.getName() };
}

function doGet(e) {
  try {
    e = e || { parameter: {} };
    var p = e.parameter || {};

    if (p.action === 'append' && p.payload) {
      var data = JSON.parse(p.payload);
      var result = appendTrade_(data);
      return json_(result);
    }

    return json_({ ok: true, service: 'grok-trade-log', hint: 'use ?action=append&payload=JSON' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err1) {
        if (e.parameter && e.parameter.payload) {
          data = JSON.parse(e.parameter.payload);
        } else {
          throw err1;
        }
      }
    } else if (e.parameter && e.parameter.payload) {
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
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
