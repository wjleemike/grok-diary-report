import { fetchMarketUpdate } from './_lib/fetchUpdate.js';

export const config = { maxDuration: 30 };

async function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  try {
    const body = req.method === 'POST' ? await readBody(req) : {};
    const data = await fetchMarketUpdate(body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}
