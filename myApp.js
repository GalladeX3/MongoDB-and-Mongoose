const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || '';

const mask = s => s
  ? s.replace(/\/\/.*?:.*?@/, '//<user>:<pass>@').slice(0, 80) + '...'
  : '(empty)';

console.log('MONGO_URI present?', !!uri);
console.log('MONGO_URI startsWith:', uri.slice(0, 14)); // should be "mongodb+srv://"
console.log('MONGO_URI masked:', mask(uri));

mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', err => console.error('❌ MongoDB error:', err.message));

// If you STILL have a non-SRV string, this forces db name anyway:
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fccdb'
});

module.exports = mongoose;



