const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required.' });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, username: admin.username });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST /api/auth/setup — One-time admin setup (disable after use)
router.post('/setup', async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }
    const admin = await Admin.create({
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'Vinayaga@2024'
    });
    res.json({ success: true, message: 'Admin created. Change password immediately!' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin.' });
  }
});

// GET /api/auth/verify — Verify token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
