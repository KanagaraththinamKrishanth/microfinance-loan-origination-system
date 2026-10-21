const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT u.*, b.name AS branch_name
      FROM users u
      LEFT JOIN branches b ON b.id = u.branch_id
      ORDER BY u.id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT u.*, b.name AS branch_name
      FROM users u
      LEFT JOIN branches b ON b.id = u.branch_id
      WHERE u.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const { full_name, email, password, role, branch_id, status } = req.body;
    const validation = validateRequired(['full_name', 'email', 'password', 'role'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(`
      INSERT INTO users (full_name, email, password_hash, role, branch_id, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `, [full_name, email, passwordHash, role, branch_id || null, status || 'active']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const { full_name, email, role, branch_id, status } = req.body;

    const result = await query(`
      UPDATE users
      SET full_name = COALESCE($1, full_name),
          email = COALESCE($2, email),
          role = COALESCE($3, role),
          branch_id = COALESCE($4, branch_id),
          status = COALESCE($5, status),
          updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `, [full_name, email, role, branch_id, status, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
