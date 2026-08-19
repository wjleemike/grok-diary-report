/**
 * Grok 每日報告 — 新增交易紀錄寫入 Google Sheet
 *
 * 設定步驟：
 * 1. 開啟試算表 https://docs.google.com/spreadsheets/d/14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w
 * 2. 擴充功能 → Apps Script，貼上本檔全部內容並儲存
 * 3. 部署 → 新增部署 → 類型選「網頁應用程式」
 *    - 執行身分：我
 *    - 具有存取權的使用者：任何人
 * 4. 部署後複製「網頁應用程式網址」，貼到網站 src/config.js 的 SHEETS_WEBAPP_URL
 */

var SHEET_NAME = ''; // 留空 = 使用 gid 593571516 對應分頁；或填分頁名稱如「交易明細」

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById('14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w');
    var sheet = SHEET_NAME
      ? ss.getSheetByName(SHEET_NAME)
      : (function(){ var sheets=ss.getSheets(); for (var i=0;i<sheets.length;i++){ if(sheets[i].getSheetId()==593571516) return sheets[i]; } return ss.getSheets()[0]; })();

    var lastRow = sheet.getLastRow();
    var nextId = lastRow;

    var typeMap = {
      buy: '買',
      sell: '賣',
      cash_div: '股利',
      stock_div: '股利'
    };
    var typeLabel = typeMap[data.type] || data.type;
    var tradeClass = data.tradeClass || '一般';

    var buyShares = '';
    var buyPrice = '';
    var sellShares = '';
    var sellPrice = '';
    var expense = '';
    var income = '';
    var fee = data.fee || 0;

    if (data.type === 'buy') {
      buyShares = Number(data.shares) || 0;
      buyPrice = Number(data.price) || 0;
      expense = Math.round(buyShares * buyPrice + Number(fee));
    } else if (data.type === 'sell') {
      sellShares = Number(data.shares) || 0;
      sellPrice = Number(data.price) || 0;
      income = Math.round(sellShares * sellPrice - Number(fee));
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
      fee || 0,
      fee || 0,
      data.tax || 0,
      '',
      fee || 0,
      expense === '' ? 0 : expense,
      income === '' ? 0 : income,
      '',
      data.reason || '',
      data.feeDiscount || 0.6
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id: nextId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'grok-trade-log' }))
    .setMimeType(ContentService.MimeType.JSON);
}
