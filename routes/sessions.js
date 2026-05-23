const express = require('express');
const Session = require('../models/Session');
const User = require('../models/User');
const QRCode = require('qrcode');
const router = express.Router();

// Middleware to verify API key
const verifyApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'Missing API key' });
  }

  const user = await User.findOne({ apiKey });
  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.userId = user._id;
  next();
};

// Create session
router.post('/create', verifyApiKey, async (req, res) => {
  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newSession = new Session({
      sessionId,
      userId: req.userId,
      status: 'pending'
    });

    await newSession.save();

    // Add to user's sessions
    await User.findByIdAndUpdate(req.userId, {
      $push: { sessions: newSession._id }
    });

    res.json({ sessionId, qrCodeUrl: `/api/session/${sessionId}/qr` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get session QR code
router.get('/:sessionId/qr', verifyApiKey, async (req, res) => {
  try {
    const session = await Session.findOne({
      sessionId: req.params.sessionId,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Generate QR code if not exists
    if (!session.qrCode) {
      const qrCode = await QRCode.toDataURL(session.sessionId);
      session.qrCode = qrCode;
      await session.save();
    }

    res.json({ qrCode: session.qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List sessions
router.get('/', verifyApiKey, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .select('sessionId phoneNumber status createdAt expiresAt');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download credentials
router.get('/:sessionId/download', verifyApiKey, async (req, res) => {
  try {
    const session = await Session.findOne({
      sessionId: req.params.sessionId,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (!session.credentials) {
      return res.status(404).json({ error: 'Credentials not ready' });
    }

    res.json(session.credentials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete session
router.delete('/:sessionId', verifyApiKey, async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      sessionId: req.params.sessionId,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;