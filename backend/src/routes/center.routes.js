const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT c.*, b.name AS branch_name
      FROM centers c
      LEFT JOIN branches b ON b.id = c.branch_id
      ORDER BY c.name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator'), async (req, res, next) => {
  try {
    const { branch_id, code, name, location, meeting_day, status } = req.body;
    const validation = validateRequired(['branch_id', 'code', 'name'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const result = await query(`
      INSERT INTO centers (branch_id, code, name, location, meeting_day, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `, [branch_id, code, name, location || '', meeting_day || 'Monday', status || 'active']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
