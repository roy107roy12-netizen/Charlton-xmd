const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  apiKey: {
    type: String,
    unique: true,
    required: true
  },
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    autoDeleteExpired: { type: Boolean, default: true }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate API Key
userSchema.statics.generateApiKey = function() {
  return `sk_${Date.now()}_${Math.random().toString(36).substr(2, 20)}`;
};

module.exports = mongoose.model('User', userSchema);
