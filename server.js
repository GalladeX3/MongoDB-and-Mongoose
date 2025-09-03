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


// IMPORTANT for hosts like Render: use the provided PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

