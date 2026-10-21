import { ArrowUpRight, Building2, CreditCard, TrendingUp, Users } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Customers" value="1,245" tone="blue" icon={<Users />} />
        <StatCard title="Active Loans" value="486" tone="green" icon={<CreditCard />} />
        <StatCard title="Approved Today" value="32" tone="amber" icon={<ArrowUpRight />} />
        <StatCard title="Portfolio" value="LKR 245M" tone="violet" icon={<TrendingUp />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Branch Performance</h2>
            <Building2 className="text-slate-400" />
          </div>

          <div className="space-y-4">
            {[
              { branch: 'BR01 Colombo', customers: 145, amount: 'LKR 42.5M' },
              { branch: 'BR02 Kandy', customers: 128, amount: 'LKR 39.2M' },
              { branch: 'BR03 Galle', customers: 119, amount: 'LKR 34.8M' }
            ].map((item) => (
              <div key={item.branch} className="rounded-xl bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{item.branch}</span>
                  <span className="text-sm text-slate-500">{item.customers} customers</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[78%] rounded-full bg-brand-500" />
                </div>
                <div className="mt-2 text-sm text-slate-600">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Recent KPIs</h2>
          <div className="space-y-4">
            {[
              ['Disbursement Volume', 'LKR 58.5M'],
              ['Approval Rate', '92.4%'],
              ['NPA Ratio', '3.8%'],
              ['Avg. Turnaround', '4.2 days']
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-slate-600">{label}</span>
                <span className="font-bold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
