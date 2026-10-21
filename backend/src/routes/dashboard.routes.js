const express = require('express');
const { query } = require('../config/db');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/summary', auth, async (req, res, next) => {
  try {
    const [customers, loans, approvals, branches] = await Promise.all([
      query('SELECT COUNT(*) AS total FROM customers'),
      query('SELECT COUNT(*) AS total FROM loans'),
      query('SELECT COUNT(*) AS total FROM loan_approvals WHERE status = $1', ['approved']),
      query('SELECT COUNT(*) AS total FROM branches')
    ]);

    res.json({
      customers: Number(customers.rows[0].total),
      loans: Number(loans.rows[0].total),
      approved_loans: Number(approvals.rows[0].total),
      branches: Number(branches.rows[0].total)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
