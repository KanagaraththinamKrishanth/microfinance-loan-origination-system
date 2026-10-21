const express = require('express');
const { query } = require('../config/db');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/branch-summary', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT b.name AS branch_name, COUNT(c.id) AS customers, COUNT(l.id) AS loans
      FROM branches b
      LEFT JOIN customers c ON c.branch_id = b.id
      LEFT JOIN loans l ON l.branch_id = b.id
      GROUP BY b.id, b.name
      ORDER BY b.name ASC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/loan-portfolio', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT p.name AS product_name, SUM(l.loan_amount) AS total_amount, COUNT(l.id) AS loan_count
      FROM loans l
      LEFT JOIN products p ON p.id = l.product_id
      GROUP BY p.id, p.name
      ORDER BY total_amount DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
