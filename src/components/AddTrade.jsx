import { useState } from 'react';
import { SHEETS_WEBAPP_URL } from '../config.js';
import { lookupStockName } from '../data/stockMap.js';

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
      setMsg('尚未設定 Google Apps Script 網址');
      return;
    }

    const resolvedName = name.trim() || lookupStockName(code);
    const payload = {
      code: code.trim(),
      name: resolvedName,
      type,
      date,
      shares: shares === '' ? null : Number(shares),
      price: price === '' ? null : Number(price),
      reason: reason.trim(),
      tradeClass: /^00|\d{4}[A-Za-z]|[A-Za-z]/.test(code.trim()) ? 'ETF' : '一般',
    };

    setLoading(true);
    setMsg('寫入中（約 3–8 秒）…');
    const started = Date.now();
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

      const sec = ((Date.now() - started) / 1000).toFixed(1);
      if (result && result.ok && result.id != null) {
        setMsg(`已寫入（編號 ${result.id}／${result.sheet || '交易紀錄'}／${result.name || resolvedName}，${sec}s）`);
        setShares('');
        setPrice('');
        setReason('');
      } else if (result && result.ok && result.service) {
        setMsg('腳本不是 v9。請貼上最新 Code.gs 並部署「新版本」，/exec 需顯示 version:9');
      } else {
        setMsg('送出失敗：' + (result?.error || text.slice(0, 120) || '未知'));
      }
    } catch (err) {
      setMsg(
        '回應逾時或網路中斷。請直接看試算表是否已多一列；若有即寫入成功。(' +
          (err?.message || '') +
          ')',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="market-report" style={{ maxWidth: 520 }}>
      <p className="section-label">PORTFOLIO TRADE LOG</p>
      <h1 className="main-title">新增交易紀錄</h1>
      <p className="subtitle">編號 = 最後編號+1；名稱由代號自動帶入</p>

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
          onChange={(e) => {
            const v = e.target.value;
            setCode(v);
            const auto = lookupStockName(v);
            if (auto) setName(auto);
          }}
          onBlur={() => {
            const auto = lookupStockName(code);
            if (auto) setName(auto);
          }}
          placeholder="例如 2330"
          style={inputStyle}
        />

        <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>股票名稱（自動帶入）</label>
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
          </>
        ) : isCashDiv ? (
          <>
            <label className="mr-note" style={{ display: 'block', marginTop: 14, marginBottom: 6 }}>現金股利金額</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" style={inputStyle} />
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
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical', minHeight: 56 }} />

        {msg && (
          <p className="mr-note" style={{ marginTop: 12, color: msg.includes('失敗') || msg.includes('不是') ? '#f87171' : 'var(--teal, #14b8a6)' }}>
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
          {loading ? '寫入中…' : '送出'}
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
