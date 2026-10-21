const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT g.*, l.loan_number
      FROM guarantors g
      LEFT JOIN loans l ON l.id = g.loan_id
      ORDER BY g.id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator', 'loan_officer'), async (req, res, next) => {
  try {
    const {
      loan_id,
      full_name,
      relation,
      phone,
      address,
      monthly_income
    } = req.body;

    if (!loan_id || !full_name || !relation || !phone) {
      return res.status(400).json({ message: 'loan_id, full_name, relation and phone are required' });
    }

    const result = await query(`
      INSERT INTO guarantors (loan_id, full_name, relation, phone, address, monthly_income, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, 'active', NOW())
      RETURNING *
    `, [loan_id, full_name, relation, phone, address || '', monthly_income || 0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
