const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT b.*, o.name AS organization_name
      FROM branches b
      LEFT JOIN organizations o ON o.id = b.organization_id
      ORDER BY b.code ASC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT b.*, o.name AS organization_name
      FROM branches b
      LEFT JOIN organizations o ON o.id = b.organization_id
      WHERE b.id = $1
    `, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Branch not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const { organization_id, code, name, address, city, state, status } = req.body;

    const validation = validateRequired(['organization_id', 'code', 'name'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const result = await query(`
      INSERT INTO branches (organization_id, code, name, address, city, state, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `, [organization_id, code, name, address || '', city || '', state || '', status || 'active']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const { code, name, address, city, state, status } = req.body;

    const result = await query(`
      UPDATE branches
      SET code = COALESCE($1, code),
          name = COALESCE($2, name),
          address = COALESCE($3, address),
          city = COALESCE($4, city),
          state = COALESCE($5, state),
          status = COALESCE($6, status),
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [code, name, address, city, state, status, req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Branch not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const result = await query('DELETE FROM branches WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Branch not found' });
    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
