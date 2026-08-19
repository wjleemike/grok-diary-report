import { useState } from 'react';

const TYPES = [
  { id: 'buy', label: '買' },
  { id: 'sell', label: '賣' },
  { id: 'cash_div', label: '現金股利' },
  { id: 'stock_div', label: '股票股利' },
];

export default function AddTrade() {
  const [code, setCode] = useState('');
  const [type, setType] = useState('stock_div');
  const [date, setDate] = useState('2026-08-19');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  const isStockDiv = type === 'stock_div';
  const isCashDiv = type === 'cash_div';
  const needPrice = type === 'buy' || type === 'sell';

  function handleSubmit(e) {
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
    setMsg('已記錄（目前為前端示範；正式寫入 Google Sheet／資料庫需再串接）');
    setTimeout(() => setMsg(''), 4000);
  }

  return (
    <div className="market-report" style={{ maxWidth: 520 }}>
      <p className="section-label">PORTFOLIO TRADE LOG</p>
      <h1 className="main-title">新增交易紀錄</h1>
      <p className="subtitle">送出後會即時更新持股清單（正式串接 Sheet 後生效）</p>

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
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="例如 2330"
          style={inputStyle}
        />

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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        {isStockDiv ? (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>配股股數</label>
            <input
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              type="number"
              min="0"
              step="1"
              style={inputStyle}
            />
            <p className="mr-note" style={{ marginTop: 6, fontSize: 11 }}>
              配股會按現有均價自動稀釋（股數增加、總成本不變），不用填價格
            </p>
          </>
        ) : isCashDiv ? (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>現金股利金額</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              placeholder="例如 1500"
              style={inputStyle}
            />
          </>
        ) : (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>股數</label>
            <input
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              type="number"
              min="0"
              step="1"
              style={inputStyle}
            />
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>價格</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              style={inputStyle}
            />
          </>
        )}

        <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>決策原因（選填）</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
        />

        {msg && (
          <p className="mr-note" style={{ marginTop: 12, color: 'var(--teal, #14b8a6)' }}>{msg}</p>
        )}

        <button
          type="submit"
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
            cursor: 'pointer',
          }}
        >
          送出
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
