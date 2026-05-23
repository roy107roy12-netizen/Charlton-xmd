const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired', 'revoked'],
    default: 'pending'
  },
  credentials: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  qrCode: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // 30 days
  },
  lastUsed: {
    type: Date,
    default: null
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    deviceName: String
  }
});

// Auto-delete expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', sessionSchema);