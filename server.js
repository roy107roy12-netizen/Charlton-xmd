const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/charlton-xmd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log('DB Error:', err));

// Models
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, required: true },
  phoneNumber: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  credentials: mongoose.Schema.Types.Mixed,
  qrCode: String,
  status: { type: String, enum: ['pending', 'active', 'expired'], default: 'pending' },
  apiKey: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: String, // Should be hashed
  apiKey: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  sessions: [sessionSchema],
});

const Session = mongoose.model('Session', sessionSchema);
const User = mongoose.model('User', userSchema);

// Routes

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Create new session
app.post('/api/session/create', async (req, res) => {
  try {
    const sessionId = `session_${Date.now()}`;
    const newSession = new Session({
      sessionId,
      status: 'pending',
      apiKey: req.headers['x-api-key'],
    });
    await newSession.save();
    res.json({ sessionId, qrCodeUrl: `/api/session/${sessionId}/qr` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get session QR code
app.get('/api/session/:sessionId/qr', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ qrCode: session.qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download credentials
app.get('/api/downloadCreds/:sessionId', async (req, res) => {
  try {
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session || session.status !== 'active') {
      return res.status(404).json({ error: 'Session not found or not active' });
    }
    res.json(session.credentials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sessions for user
app.get('/api/sessions', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    const sessions = await Session.find({ apiKey });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete session
app.delete('/api/session/:sessionId', async (req, res) => {
  try {
    await Session.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const apiKey = `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newUser = new User({ username, email, password, apiKey });
    await newUser.save();
    
    res.json({ message: 'User registered', apiKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // In production, compare hashed passwords
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    res.json({ apiKey: user.apiKey, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
