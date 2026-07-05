export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SECRET_KEY,
    'Authorization': `Bearer ${SUPABASE_SECRET_KEY}`,
  };
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/parrilla_data?id=eq.julio_2026&select=data`, { headers });
      const json = await r.json();
      if (json && json[0] && json[0].data) {
        res.status(200).json({ data: json[0].data });
      } else {
        res.status(200).json({ data: null });
      }
    } catch(e) { res.status(500).json({ error: e.message }); }
  } else if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const r = await fetch(`${SUPABASE_URL}/rest/v1/parrilla_data?id=eq.julio_2026`, {
        method: 'PATCH',
        headers: { ...headers, 'Prefer': 'return=minimal' },
        body: JSON.stringify({ data, updated_at: new Date().toISOString() })
      });
      res.status(r.ok ? 200 : 500).json({ ok: r.ok });
    } catch(e) { res.status(500).json({ error: e.message }); }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
