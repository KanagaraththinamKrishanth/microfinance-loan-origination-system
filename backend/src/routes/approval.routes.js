const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT a.*, l.loan_number, u.full_name AS approver_name
      FROM loan_approvals a
      LEFT JOIN loans l ON l.id = a.loan_id
      LEFT JOIN users u ON u.id = a.approver_user_id
      ORDER BY a.approved_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_authorizer'), async (req, res, next) => {
  try {
    const { loan_id, stage, status, comments } = req.body;

    if (!loan_id || !stage || !status) {
      return res.status(400).json({ message: 'loan_id, stage and status are required' });
    }

    const result = await query(`
      INSERT INTO loan_approvals (loan_id, stage, status, approver_user_id, comments, approved_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `, [loan_id, stage, status, req.user.id, comments || '']);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
