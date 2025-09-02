const mongoose = require('mongoose');

const uri = process.env.MONGO_URI; // defined in .env or host env
if (!uri) {
  console.warn('Warning: MONGO_URI not set yet.');
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Exporting mongoose is optional; it can help in other files
module.exports = mongoose;

