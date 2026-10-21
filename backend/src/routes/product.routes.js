const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM products ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator'), async (req, res, next) => {
  try {
    const { code, name, product_type, min_amount, max_amount, interest_rate, tenure_months, status } = req.body;

    const validation = validateRequired(['code', 'name', 'product_type'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const result = await query(`
      INSERT INTO products (code, name, product_type, min_amount, max_amount, interest_rate, tenure_months, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `, [code, name, product_type, min_amount || 0, max_amount || 0, interest_rate || 0, tenure_months || 12, status || 'active']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, requireRole('super_admin', 'branch_creator'), async (req, res, next) => {
  try {
    const result = await query(`
      UPDATE products
      SET code = COALESCE($1, code),
          name = COALESCE($2, name),
          product_type = COALESCE($3, product_type),
          min_amount = COALESCE($4, min_amount),
          max_amount = COALESCE($5, max_amount),
          interest_rate = COALESCE($6, interest_rate),
          tenure_months = COALESCE($7, tenure_months),
          status = COALESCE($8, status),
          updated_at = NOW()
      WHERE id = $9
      RETURNING *
    `, [req.body.code, req.body.name, req.body.product_type, req.body.min_amount, req.body.max_amount, req.body.interest_rate, req.body.tenure_months, req.body.status, req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, requireRole('super_admin'), async (req, res, next) => {
  try {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
