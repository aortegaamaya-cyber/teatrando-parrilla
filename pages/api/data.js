// pages/api/data.js
// API route para guardar y cargar datos de la parrilla
// Usa el filesystem de Vercel (persiste entre requests en el mismo deployment)
// Para persistencia real entre deployments, conectar Vercel KV más adelante

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join('/tmp', 'teatrando_data.json');

export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return res.status(200).json({ data });
      }
      return res.status(200).json({ data: null });
    } catch (e) {
      return res.status(500).json({ error: 'Error reading data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      fs.writeFileSync(DATA_FILE, data, 'utf8');
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error saving data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
