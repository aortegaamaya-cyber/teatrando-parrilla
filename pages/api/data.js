// pages/api/data.js
// Proxy para JSONBin.io - base de datos JSON gratuita y persistente
// Configurar: JSONBIN_BIN_ID y JSONBIN_API_KEY en Vercel Environment Variables

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!BIN_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing JSONBIN_BIN_ID or JSONBIN_API_KEY env vars' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${BASE_URL}/latest`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const json = await response.json();
      const data = json.record?.data || null;
      return res.status(200).json({ data });
    } catch (e) {
      return res.status(500).json({ error: 'Error reading data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ data })
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error saving data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
