export default function StatCard({ title, value, tone = 'blue', icon }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    violet: 'bg-violet-50 text-violet-700 border-violet-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100'
  };

  return (
    <div className={`rounded-xl border p-4 shadow-soft ${tones[tone] || tones.blue}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium opacity-80">{title}</div>
          <div className="mt-2 text-3xl font-bold">{value}</div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/70 text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}
