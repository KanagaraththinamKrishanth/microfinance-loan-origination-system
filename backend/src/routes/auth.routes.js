const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const env = require('../config/env');
const { auth } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');

const router = express.Router();

const createToken = (user) => jwt.sign(
  { userId: user.id, role: user.role, branchId: user.branch_id },
  env.JWT_SECRET,
  { expiresIn: env.JWT_EXPIRES_IN }
);

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateRequired(['email', 'password'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const result = await query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const validPassword =
      (await bcrypt.compare(password, user.password_hash)) ||
      user.password_hash === password;

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
        status: user.status
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { full_name, email, password, role, branch_id } = req.body;

    const validation = validateRequired(['full_name', 'email', 'password', 'role'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO users (full_name, email, password_hash, role, branch_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'active', NOW())
       RETURNING id, full_name, email, role, branch_id, status, created_at`,
      [full_name, email, passwordHash, role, branch_id || null]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

router.get('/me', auth, async (req, res) => {
  const user = req.user;
  res.json({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    branch_id: user.branch_id,
    status: user.status
  });
});

router.post('/logout', auth, async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
