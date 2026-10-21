export default function ReportsPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="mb-6 text-xl font-bold text-slate-800">Reports</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-sm text-slate-500">Loan Portfolio</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">LKR 245M</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-sm text-slate-500">Disbursement</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">LKR 58.5M</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-sm text-slate-500">Collection Efficiency</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">92.4%</div>
        </div>
      </div>
    </div>
  );
}
