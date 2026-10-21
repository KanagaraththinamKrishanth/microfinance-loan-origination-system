export default function ProductsPage() {
  const products = [
    { code: 'PRD001', name: 'Micro Enterprise Loan', type: 'business', interest_rate: '18.00%', status: 'active' },
    { code: 'PRD002', name: 'Agriculture Loan', type: 'agri', interest_rate: '15.00%', status: 'active' },
    { code: 'PRD003', name: 'Education Loan', type: 'education', interest_rate: '12.00%', status: 'active' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Product Master</h2>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Add Product</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.code} className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium">{product.code}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 capitalize">{product.type}</td>
                <td className="px-4 py-3">{product.interest_rate}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {product.status}
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
