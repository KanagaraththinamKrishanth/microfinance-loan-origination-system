export default function AuditLogsPage() {
  const logs = [
    { action: 'Customer created', by: 'Head Office Admin', at: '2026-10-21 09:00' },
    { action: 'Loan application created', by: 'Branch 01 Creator', at: '2026-10-21 09:15' },
    { action: 'Loan approved', by: 'Branch 01 Authorizer', at: '2026-10-21 10:00' }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="mb-6 text-xl font-bold text-slate-800">Audit Logs</h2>

      <div className="space-y-3">
        {logs.map((log, index) => (
          <div key={index} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <div className="font-medium text-slate-800">{log.action}</div>
              <div className="text-sm text-slate-500">By {log.by}</div>
            </div>
            <div className="text-sm text-slate-500">{log.at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
