export default function CustomersPage() {
  const customers = [
    { customer_number: 'CUS00000001', first_name: 'Nimal', last_name: 'Perera', phone: '+94771234567', city: 'Colombo', kyc: 'verified' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Customer Creation</h2>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Add Customer</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer No</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">KYC</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_number} className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium">{customer.customer_number}</td>
                <td className="px-4 py-3">{customer.first_name} {customer.last_name}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.city}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {customer.kyc}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
