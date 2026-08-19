import { useState } from 'react';
import { SHEETS_WEBAPP_URL } from '../config.js';

const TYPES = [
  { id: 'buy', label: '買' },
  { id: 'sell', label: '賣' },
  { id: 'cash_div', label: '現金股利' },
  { id: 'stock_div', label: '股票股利' },
];

export default function AddTrade() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('buy');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const isStockDiv = type === 'stock_div';
  const isCashDiv = type === 'cash_div';
  const needPrice = type === 'buy' || type === 'sell';
  const configured = Boolean(SHEETS_WEBAPP_URL && SHEETS_WEBAPP_URL.includes('script.google.com'));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim()) {
      setMsg('請填寫股票代號');
      return;
    }
    if (isStockDiv && !shares) {
      setMsg('請填寫配股股數');
      return;
    }
    if (needPrice && (!shares || !price)) {
      setMsg('請填寫股數與價格');
      return;
    }
    if (isCashDiv && !price) {
      setMsg('請填寫現金股利金額');
      return;
    }
    if (!configured) {
      setMsg('尚未設定 Google Apps Script 網址，請先完成 Sheet 串接（見下方說明）');
      return;
    }

    const payload = {
      code: code.trim(),
      name: name.trim(),
      type,
      date,
      shares: shares === '' ? null : Number(shares),
      price: price === '' ? null : Number(price),
      reason: reason.trim(),
      tradeClass: code.trim().length >= 4 && code.trim().startsWith('00') ? 'ETF' : '一般',
    };

    setLoading(true);
    setMsg('');
    try {
      await fetch(SHEETS_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setMsg('已送出至 Google Sheet（請至試算表確認是否出現新列）');
      setShares('');
      setPrice('');
      setReason('');
    } catch (err) {
      setMsg('送出失敗：' + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="market-report" style={{ maxWidth: 520 }}>
      <p className="section-label">PORTFOLIO TRADE LOG</p>
      <h1 className="main-title">新增交易紀錄</h1>
      <p className="subtitle">送出後寫入你的 Google Sheet 交易明細</p>

      {!configured && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--text)',
          }}
        >
          <strong>尚未串接 Google Sheet</strong>
          <ol style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>開啟試算表 → 擴充功能 → Apps Script</li>
            <li>貼上專案內 <code>apps-script/Code.gs</code> 內容並儲存</li>
            <li>部署 → 網頁應用程式 → 執行身分「我」→ 存取權「任何人」</li>
            <li>複製網址，貼到 <code>src/config.js</code> 的 <code>SHEETS_WEBAPP_URL</code> 後重新部署網站</li>
          </ol>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '20px 22px',
        }}
      >
        <label className="mr-note" style={{ display: 'block', marginBottom: 6 }}>股票代號</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="例如 2330" style={inputStyle} />

        <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>股票名稱（選填）</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="例如 台積電" style={inputStyle} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, margin: '14px 0' }}>
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              style={{
                ...typeBtn,
                background: type === t.id ? 'var(--teal, #14b8a6)' : 'transparent',
                color: type === t.id ? '#0a0a0a' : 'var(--text)',
                borderColor: type === t.id ? 'var(--teal, #14b8a6)' : 'var(--border)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="mr-note" style={{ display: 'block', marginBottom: 6 }}>交易日期</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />

        {isStockDiv ? (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>配股股數</label>
            <input value={shares} onChange={(e) => setShares(e.target.value)} type="number" min="0" step="1" style={inputStyle} />
            <p className="mr-note" style={{ marginTop: 6, fontSize: 11 }}>
              配股會按現有均價自動稀釋（股數增加、總成本不變），不用填價格
            </p>
          </>
        ) : isCashDiv ? (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>現金股利金額</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" placeholder="例如 1500" style={inputStyle} />
          </>
        ) : (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>股數</label>
            <input value={shares} onChange={(e) => setShares(e.target.value)} type="number" min="0" step="1" style={inputStyle} />
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>價格</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" style={inputStyle} />
          </>
        )}

        <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>決策原因（選填）</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }} />

        {msg && (
          <p className="mr-note" style={{ marginTop: 12, color: msg.includes('失敗') || msg.includes('尚未') ? '#f87171' : 'var(--teal, #14b8a6)' }}>
            {msg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: 10,
            border: 'none',
            background: 'var(--teal, #14b8a6)',
            color: '#0a0a0a',
            fontWeight: 600,
            fontSize: 15,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? '送出中…' : '送出'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: '#0f1419',
  color: 'var(--text)',
  fontSize: 14,
};

const typeBtn = {
  padding: '10px 8px',
  borderRadius: 8,
  border: '1px solid',
  fontSize: 13,
  cursor: 'pointer',
  fontWeight: 500,
};
