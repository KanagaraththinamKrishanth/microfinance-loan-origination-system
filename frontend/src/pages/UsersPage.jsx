export default function UsersPage() {
  const users = [
    { full_name: 'Head Office Admin', role: 'super_admin', branch: 'Head Office', status: 'active' },
    { full_name: 'Branch 01 Creator', role: 'branch_creator', branch: 'Branch 01', status: 'active' },
    { full_name: 'Branch 01 Authorizer', role: 'branch_authorizer', branch: 'Branch 01', status: 'active' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">User Management</h2>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Add User</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.full_name} className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium">{user.full_name}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{user.branch}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {user.status}
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
