const validateRequired = (fields, body) => {
  const missing = [];

  fields.forEach((field) => {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      missing.push(field);
    }
  });

  return {
    ok: missing.length === 0,
    missing
  };
};

module.exports = {
  validateRequired
};
