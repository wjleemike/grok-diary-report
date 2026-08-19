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
      setMsg('尚未設定 Google Apps Script 網址，請先完成 Sheet 串接');
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
      const qs = new URLSearchParams({
        action: 'append',
        payload: JSON.stringify(payload),
      });
      const res = await fetch(`${SHEETS_WEBAPP_URL}?${qs.toString()}`, {
        method: 'GET',
        redirect: 'follow',
      });
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }

      // 舊版腳本只回 {ok:true, service:...}，沒有 id → 其實沒寫入
      if (result && result.ok && (result.id != null || result.sheet)) {
        setMsg(`已寫入 Google Sheet（列編號 ${result.id}${result.sheet ? '／分頁 ' + result.sheet : ''}）`);
        setShares('');
        setPrice('');
        setReason('');
      } else if (result && result.ok && result.service) {
        setMsg('腳本仍是舊版，尚未寫入 Sheet。請在 Apps Script 貼上新版 Code.gs → 儲存 → 部署「新版本」（或新增部署），完成後再試。');
      } else {
        setMsg('送出失敗：' + (result?.error || text.slice(0, 160) || '未知錯誤'));
      }
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
          <p className="mr-note" style={{ marginTop: 12, color: msg.includes('失敗') || msg.includes('舊版') || msg.includes('尚未') ? '#f87171' : 'var(--teal, #14b8a6)' }}>
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
