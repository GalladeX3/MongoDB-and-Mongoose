require('dotenv').config();
const express = require('express');
const path = require('path');      // for reading package.json
const fs = require('fs');          // for reading package.json
const app = express();

// Initialize mongoose (connect happens inside myApp.js)
require('./myApp');

// -------- Your existing routes --------
app.get('/', (req, res) => {
  res.send('FCC MongoDB & Mongoose is running ✅');
});

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
// --------------------------------------

// -------- NEW: env-check (see which Mongo env vars exist) --------
app.get('/env-check', (req, res) => {
  // pick only vars whose name starts with MONGO*
  const pick = Object.fromEntries(
    Object.entries(process.env).filter(([k]) => k.toUpperCase().startsWith('MONGO'))
  );
  // mask credentials in any URLs
  const masked = Object.fromEntries(
    Object.entries(pick).map(([k, v]) => [k, (v || '').replace(/\/\/.*?:.*?@/, '//<user>:<pass>@')])
  );
  res.json(masked);
});
// -----------------------------------------------------------------

// -------- FCC helper routes --------
// Lets FCC read your package.json to verify "mongoose": "^5.11.15"
app.get('/_api/package.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'package.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).type('text').send('package.json not found');
    res.type('application/json').send(data); // send raw JSON text
  });
});

// Lets FCC verify mongoose is connected
app.get('/_api/is-mongoose-ok', (req, res) => {
  const state = require('mongoose').connection.readyState; // 1 = connected
  res.json({ isOk: state === 1, readyState: state });
});
// ------------------------------------

// IMPORTANT for hosts like Render: use the provided PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
