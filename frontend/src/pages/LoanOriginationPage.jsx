export default function LoanOriginationPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="mb-6 text-xl font-bold text-slate-800">Loan Origination</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Branch</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
              <option>Branch 01</option>
              <option>Branch 02</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Product</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
              <option>Micro Enterprise Loan</option>
              <option>Agriculture Loan</option>
              <option>Education Loan</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Customer Number</label>
            <input value="CUS00000001" readOnly className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Loan Amount</label>
            <input type="number" value={250000} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Purpose</label>
            <textarea rows={4} defaultValue="Working capital expansion" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tenure (Months)</label>
            <input type="number" value={24} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Repayment Mode</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
              <option>EMI</option>
              <option>Bullet</option>
              <option>Reducing Balance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Generated Loan Number</div>
            <div className="mt-1 text-xl font-bold text-slate-900">BR01-PRD001-CUS00000001-0001</div>
          </div>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Submit Loan
          </button>
        </div>
      </div>
    </div>
  );
}
