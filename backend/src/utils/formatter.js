const formatCustomerNumber = (value) => {
  const num = Number(value || 0);
  return `CUS${String(num).padStart(8, '0')}`;
};

const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

module.exports = {
  formatCustomerNumber,
  formatDate
};
