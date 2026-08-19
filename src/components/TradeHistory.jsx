import { useEffect, useMemo, useState } from 'react';
import { TRADE_SHEET_CSV, TRADE_SHEET_GVIZ, TRADE_SHEET_URL } from '../config.js';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else q = false;
      } else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n') {
      row.push(cell.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell.replace(/\r$/, ''));
    rows.push(row);
  }
  return rows;
}

function findHeaderIndex(rows) {
  for (let i = 0; i < Math.min(rows.length, 5); i++) {
    const joined = rows[i].join('');
    if (joined.includes('交易編號') && joined.includes('交易日期')) return i;
  }
  return 0;
}

function typeClass(t) {
  if (t === '買') return 'up';
  if (t === '賣') return 'down';
  return '';
}

export default function TradeHistory() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr('');
      const urls = [TRADE_SHEET_CSV, TRADE_SHEET_GVIZ];
      let lastError = '';
      for (const url of urls) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const text = await res.text();
          if (!text || text.includes('<HTML') || text.includes('<html')) {
            throw new Error('not csv');
          }
          const parsed = parseCsv(text);
          const hi = findHeaderIndex(parsed);
          const body = parsed.slice(hi + 1).filter((r) => {
            const id = String(r[0] || '').trim();
            const code = String(r[3] || '').trim();
            return id && !id.includes('交易') && (code || r[4]);
          });
          if (cancelled) return;
          setRows(body);
          setLoading(false);
          return;
        } catch (e) {
          lastError = e?.message || String(e);
        }
      }
      if (!cancelled) {
        setErr(lastError || '無法讀取試算表');
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    const list = [...rows].reverse();
    if (!kw) return list;
    return list.filter((r) =>
      [r[0], r[1], r[2], r[3], r[4], r[5], r[19]].some((c) =>
        String(c || '').toLowerCase().includes(kw),
      ),
    );
  }, [rows, q]);

  return (
    <div className="market-report">
      <p className="section-label">PORTFOLIO TRADE LOG</p>
      <h1 className="main-title">交易紀錄</h1>
      <p className="subtitle">
        即時讀取 Google Sheet「交易紀錄」・共 {rows.length} 筆
        {' · '}
        <a href={TRADE_SHEET_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
          開啟試算表
        </a>
      </p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋代號、股票、類型、原因…"
          style={{
            flex: 1,
            minWidth: 200,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: '#0f1419',
            color: 'var(--text)',
          }}
        />
      </div>

      {loading && <p className="mr-note">讀取試算表中…</p>}
      {err && (
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <p className="mr-note" style={{ margin: 0 }}>
            無法直接讀取（{err}）。若試算表未設「知道連結的任何人可檢視」，請改權限後重新整理。
          </p>
          <iframe
            title="交易紀錄試算表"
            src={`https://docs.google.com/spreadsheets/d/14ZGEQp3AkQIPx2fOEUyZy11sNpEr4mhGkP6Ei3RNs4w/preview?gid=352753194`}
            style={{ width: '100%', height: 520, border: 0, marginTop: 12, borderRadius: 8 }}
          />
        </div>
      )}

      {!loading && !err && (
        <div className="mr-table-wrap">
          <table className="mr-table" style={{ fontSize: 12 }}>
            <thead>
              <tr>
                <th>編號</th>
                <th style={{ textAlign: 'left' }}>日期</th>
                <th>類型</th>
                <th>代號</th>
                <th style={{ textAlign: 'left' }}>股票</th>
                <th>類別</th>
                <th>買入股數</th>
                <th>買入價</th>
                <th>賣出股數</th>
                <th>賣出價</th>
                <th>支出</th>
                <th>收入</th>
                <th style={{ textAlign: 'left' }}>決策原因</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={(r[0] || '') + '-' + i}>
                  <td>{r[0]}</td>
                  <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>{r[1]}</td>
                  <td className={typeClass(r[2])}>{r[2]}</td>
                  <td>{r[3]}</td>
                  <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>{r[4]}</td>
                  <td>{r[5]}</td>
                  <td>{r[6]}</td>
                  <td>{r[7]}</td>
                  <td>{r[8]}</td>
                  <td>{r[9]}</td>
                  <td>{r[16]}</td>
                  <td>{r[17]}</td>
                  <td style={{ textAlign: 'left' }}>{r[19]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
