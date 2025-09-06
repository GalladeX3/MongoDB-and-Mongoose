/** # MONGOOSE SETUP #
/*  ================== */

const mongoose = require('mongoose');

// FCC expects MONGO_URI to come from env
const uri = (process.env.MONGO_URI || '').trim();

if (!uri) {
  console.warn('⚠️  MONGO_URI is empty. Set it in your host environment.');
}

// Mask creds in logs (safe)
const mask = s => s ? s.replace(/\/\/.*?:.*?@/, '//<user>:<pass>@') : '(empty)';
console.log('[MONGO] using:', uri.startsWith('mongodb+srv://') ? 'srv' :
                           uri.startsWith('mongodb://') ? 'standard' : 'unknown',
            mask(uri));

mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', err => console.error('❌ MongoDB error:', err.message));

// FCC wants connect with options
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
