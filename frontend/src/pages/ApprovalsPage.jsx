export default function ApprovalsPage() {
  const approvals = [
    { loan_number: 'BR01-PRD001-CUS00000001-0001', customer: 'Nimal Perera', stage: 'Initial Review', status: 'Pending' },
    { loan_number: 'BR02-PRD002-CUS00000002-0001', customer: 'Kamal Silva', stage: 'Credit Risk', status: 'Approved' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="mb-6 text-xl font-bold text-slate-800">Approval Workflow</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Loan Number</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((item) => (
              <tr key={item.loan_number} className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium">{item.loan_number}</td>
                <td className="px-4 py-3">{item.customer}</td>
                <td className="px-4 py-3">{item.stage}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {item.status}
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
