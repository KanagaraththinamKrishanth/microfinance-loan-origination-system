const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM crs_master ORDER BY risk_grade ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator'), async (req, res, next) => {
  try {
    const { product_id, min_score, max_score, risk_grade, status } = req.body;
    if (!product_id || !risk_grade) {
      return res.status(400).json({ message: 'product_id and risk_grade are required' });
    }

    const result = await query(`
      INSERT INTO crs_master (product_id, min_score, max_score, risk_grade, status, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `, [product_id, min_score || 0, max_score || 100, risk_grade, status || 'active']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
