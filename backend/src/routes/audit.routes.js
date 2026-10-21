const express = require('express');
const { query } = require('../config/db');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(`
      SELECT a.*, u.full_name AS user_name
      FROM audit_logs a
      LEFT JOIN users u ON u.id = a.user_id
      ORDER BY a.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
