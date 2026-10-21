const { query } = require('../config/db');

const generateLoanNumber = async ({ branchCode, productCode, customerNumber, branchId, productId }) => {
  const result = await query(
    `SELECT COALESCE(MAX(CAST(SUBSTRING(loan_number FROM '[0-9]+$') AS INTEGER)), 0) + 1 AS next_running
     FROM loans
     WHERE branch_id = $1 AND product_id = $2`,
    [branchId, productId]
  );

  const runningNo = result.rows[0].next_running;
  return `${branchCode}-${productCode}-${customerNumber}-${String(runningNo).padStart(4, '0')}`;
};

module.exports = {
  generateLoanNumber
};
