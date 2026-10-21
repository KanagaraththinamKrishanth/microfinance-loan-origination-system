export default function BranchesPage() {
  const branches = [
    { code: 'BR01', name: 'Colombo Branch', city: 'Colombo', status: 'active' },
    { code: 'BR02', name: 'Kandy Branch', city: 'Kandy', status: 'active' },
    { code: 'BR03', name: 'Galle Branch', city: 'Galle', status: 'active' },
    { code: 'BR04', name: 'Jaffna Branch', city: 'Jaffna', status: 'active' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Branch Master</h2>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Add Branch</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Branch Code</th>
              <th className="px-4 py-3">Branch Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.code} className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium">{branch.code}</td>
                <td className="px-4 py-3">{branch.name}</td>
                <td className="px-4 py-3">{branch.city}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {branch.status}
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
