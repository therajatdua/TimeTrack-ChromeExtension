const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'data.json');
function readDB() { try { return JSON.parse(fs.readFileSync(DB_FILE,'utf8')||'{}'); } catch(e){ return { events: [] }; } }
function writeDB(db){ fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/events', (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events)) return res.status(400).json({ error: 'events array required' });
  const db = readDB();
  db.events = db.events.concat(events.map(e=>({ ...e, receivedAt: Date.now() }))).slice(-10000);
  writeDB(db);
  res.json({ ok: true, stored: events.length });
});

app.get('/api/summary', (req, res) => {
  const db = readDB();
  // aggregate by domain for last 7 days
  const weekAgo = Date.now() - 7*24*60*60*1000;
  const agg = {};
  for (const e of db.events || []) {
    if (e.ts < weekAgo) continue;
    agg[e.domain] = (agg[e.domain] || 0) + (e.duration || 0);
  }
  res.json({ summary: agg });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/api/raw', (req, res) => res.json(readDB()));

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Server listening on', port));
