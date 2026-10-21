const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { query } = require('../config/db');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const userResult = await query(
      `SELECT id, full_name, email, role, branch_id, status, created_at
       FROM users
       WHERE id = $1`,
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    const user = userResult.rows[0];
    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'User account is inactive' });
    }

    req.user = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      branch_id: user.branch_id,
      status: user.status,
      created_at: user.created_at
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role privileges' });
  }

  next();
};

const requireAnyRole = (...roles) => requireRole(...roles);

module.exports = {
  auth,
  requireRole,
  requireAnyRole
};
