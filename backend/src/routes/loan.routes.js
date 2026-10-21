const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');
const { generateLoanNumber } = require('../services/loanNumberService');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT l.*, c.first_name, c.last_name, p.name AS product_name, b.code AS branch_code
      FROM loans l
      LEFT JOIN customers c ON c.id = l.customer_id
      LEFT JOIN products p ON p.id = l.product_id
      LEFT JOIN branches b ON b.id = l.branch_id
      ORDER BY l.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT l.*, c.first_name, c.last_name, p.name AS product_name
      FROM loans l
      LEFT JOIN customers c ON c.id = l.customer_id
      LEFT JOIN products p ON p.id = l.product_id
      WHERE l.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Loan not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator', 'loan_officer'), async (req, res, next) => {
  try {
    const {
      branch_id,
      product_id,
      customer_id,
      loan_amount,
      purpose,
      tenure_months,
      interest_rate,
      repayment_mode,
      status
    } = req.body;

    const validation = validateRequired(['branch_id', 'product_id', 'customer_id', 'loan_amount', 'purpose'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const branchResult = await query('SELECT code FROM branches WHERE id = $1', [branch_id]);
    const productResult = await query('SELECT code FROM products WHERE id = $1', [product_id]);
    const customerResult = await query('SELECT customer_number FROM customers WHERE id = $1', [customer_id]);

    if (branchResult.rows.length === 0) return res.status(400).json({ message: 'Invalid branch_id' });
    if (productResult.rows.length === 0) return res.status(400).json({ message: 'Invalid product_id' });
    if (customerResult.rows.length === 0) return res.status(400).json({ message: 'Invalid customer_id' });

    const loanNumber = await generateLoanNumber({
      branchCode: branchResult.rows[0].code,
      productCode: productResult.rows[0].code,
      customerNumber: customerResult.rows[0].customer_number,
      branchId: branch_id,
      productId: product_id
    });

    const result = await query(`
      INSERT INTO loans (
        branch_id, product_id, customer_id, loan_number, loan_amount, purpose,
        tenure_months, interest_rate, repayment_mode, status, created_by, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING *
    `, [
      branch_id,
      product_id,
      customer_id,
      loanNumber,
      loan_amount,
      purpose,
      tenure_months || 12,
      interest_rate || 0,
      repayment_mode || 'EMI',
      status || 'draft',
      req.user.id
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, requireRole('super_admin', 'branch_creator', 'loan_officer', 'branch_authorizer'), async (req, res, next) => {
  try {
    const result = await query(`
      UPDATE loans
      SET loan_amount = COALESCE($1, loan_amount),
          purpose = COALESCE($2, purpose),
          tenure_months = COALESCE($3, tenure_months),
          interest_rate = COALESCE($4, interest_rate),
          repayment_mode = COALESCE($5, repayment_mode),
          status = COALESCE($6, status),
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [
      req.body.loan_amount,
      req.body.purpose,
      req.body.tenure_months,
      req.body.interest_rate,
      req.body.repayment_mode,
      req.body.status,
      req.params.id
    ]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Loan not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
