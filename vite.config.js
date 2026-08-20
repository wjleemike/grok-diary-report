import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchMarketUpdate } from './api/_lib/fetchUpdate.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function marketApiPlugin() {
  const handle = async (req, res, next) => {
    const url = (req.url || '').split('?')[0];
    if (url !== '/api/update') return next();
    if (req.method !== 'GET' && req.method !== 'POST') return next();
    try {
      const body = req.method === 'POST' ? await readJsonBody(req) : {};
      const data = await fetchMarketUpdate(body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify(data));
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ ok: false, error: String(e?.message || e) }));
    }
  };
  return {
    name: 'market-api',
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

export default defineConfig({
  plugins: [react(), marketApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
});
