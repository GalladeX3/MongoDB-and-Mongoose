require('dotenv').config();
const express = require('express');
const app = express();

// Pull in your mongoose setup (the challenge wants connect() in myApp.js)
require('./myApp');

app.get('/', (req, res) => {
  res.send('FCC MongoDB & Mongoose is running ✅');
});

// IMPORTANT for hosts like Render: use the provided PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

