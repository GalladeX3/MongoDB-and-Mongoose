require('dotenv').config();
const express = require('express');
const app = express();

// Pull in your mongoose setup (the challenge wants connect() in myApp.js)
require('./myApp');

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

// IMPORTANT for hosts like Render: use the provided PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

