require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Initialize mongoose (connect happens inside myApp.js)
require('./myApp');

// Root
app.get('/', (req, res) => {
  res.send('FCC MongoDB & Mongoose is running ✅');
});

// --- Debug helpers (don’t hurt FCC, help you verify) ---
app.get('/db-check', (req, res) => {
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  res.json({ readyState: require('mongoose').connection.readyState });
});

app.get('/uri-check', (req, res) => {
  const v = process.env.MONGO_URI || '';
  const type = v.startsWith('mongodb+srv://') ? 'srv'
             : v.startsWith('mongodb://')     ? 'standard'
             : 'unknown';
  const masked = v.replace(/\/\/.*?:.*?@/, '//<user>:<pass>@');
  res.json({ type, startsWith: v.slice(0, 20), maskedQuery: masked.slice(-60) });
});

app.get('/env-check', (req, res) => {
  const pick = Object.fromEntries(
    Object.entries(process.env).filter(([k]) => k.toUpperCase().startsWith('MONGO'))
  );
  const masked = Object.fromEntries(
    Object.entries(pick).map(([k, v]) => [k, (v || '').replace(/\/\/.*?:.*?@/, '//<user>:<pass>@')])
  );
  res.json(masked);
});

// --- FCC helper routes (let FCC verify version & connection) ---
app.get('/_api/package.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'package.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).type('text').send('package.json not found');
    res.type('application/json').send(data);
  });
});

app.get('/_api/is-mongoose-ok', (req, res) => {
  const state = require('mongoose').connection.readyState; // 1 = connected
  res.json({ isOk: state === 1, readyState: state });
});

// Start server (Render supplies PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

