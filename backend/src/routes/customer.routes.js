const express = require('express');
const { query } = require('../config/db');
const { auth, requireRole } = require('../middleware/auth');
const { validateRequired } = require('../middleware/validate');
const { formatCustomerNumber } = require('../utils/formatter');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT c.*, b.name AS branch_name
      FROM customers c
      LEFT JOIN branches b ON b.id = c.branch_id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, requireRole('super_admin', 'branch_creator', 'loan_officer'), async (req, res, next) => {
  try {
    const {
      branch_id,
      first_name,
      last_name,
      dob,
      gender,
      marital_status,
      phone,
      email,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      occupation,
      monthly_income,
      kyc_status
    } = req.body;

    const validation = validateRequired(['branch_id', 'first_name', 'last_name', 'phone'], req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: `Missing required fields: ${validation.missing.join(', ')}` });
    }

    const serial = await query(`
      SELECT COALESCE(MAX(CAST(SUBSTRING(customer_number FROM 'CUS([0-9]+)$') AS INTEGER)), 0) + 1 AS next_serial
      FROM customers
    `);

    const nextSerial = Number(serial.rows[0].next_serial);
    const customerNumber = formatCustomerNumber(nextSerial);

    const result = await query(`
      INSERT INTO customers (
        branch_id, customer_number, first_name, last_name, dob, gender, marital_status,
        phone, email, address_line1, address_line2, city, state, pincode, occupation,
        monthly_income, kyc_status, created_by, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
      RETURNING *
    `, [
      branch_id,
      customerNumber,
      first_name,
      last_name,
      dob || null,
      gender || null,
      marital_status || null,
      phone,
      email || null,
      address_line1 || '',
      address_line2 || '',
      city || '',
      state || '',
      pincode || '',
      occupation || '',
      monthly_income || 0,
      kyc_status || 'pending',
      req.user.id
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, requireRole('super_admin', 'branch_creator', 'loan_officer'), async (req, res, next) => {
  try {
    const result = await query(`
      UPDATE customers
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          dob = COALESCE($3, dob),
          gender = COALESCE($4, gender),
          marital_status = COALESCE($5, marital_status),
          phone = COALESCE($6, phone),
          email = COALESCE($7, email),
          address_line1 = COALESCE($8, address_line1),
          address_line2 = COALESCE($9, address_line2),
          city = COALESCE($10, city),
          state = COALESCE($11, state),
          pincode = COALESCE($12, pincode),
          occupation = COALESCE($13, occupation),
          monthly_income = COALESCE($14, monthly_income),
          kyc_status = COALESCE($15, kyc_status),
          updated_at = NOW()
      WHERE id = $16
      RETURNING *
    `, [
      req.body.first_name,
      req.body.last_name,
      req.body.dob,
      req.body.gender,
      req.body.marital_status,
      req.body.phone,
      req.body.email,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.state,
      req.body.pincode,
      req.body.occupation,
      req.body.monthly_income,
      req.body.kyc_status,
      req.params.id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
