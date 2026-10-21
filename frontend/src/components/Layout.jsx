import { Link, NavLink } from 'react-router-dom';
import { BarChart3, Building2, CreditCard, FileText, LogOut, ShieldCheck, UserCog, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/', icon: BarChart3 },
  { name: 'Branches', path: '/branches', icon: Building2 },
  { name: 'Users', path: '/users', icon: UserCog },
  { name: 'Products', path: '/products', icon: CreditCard },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Loans', path: '/loans', icon: FileText },
  { name: 'Approvals', path: '/approvals', icon: ShieldCheck }
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 bg-slate-900 text-slate-100">
        <div className="border-b border-slate-700 px-6 py-5">
          <div className="text-xl font-bold">MFI Origination</div>
          <div className="mt-1 text-sm text-slate-300">Head Office</div>
        </div>

        <nav className="mt-6 space-y-2 px-3">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`
              }
            >
              <Icon className="h-4 w-4" />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
          <div className="mb-3 text-sm text-slate-300">
            {user?.full_name || 'System User'}
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Microfinance</div>
            <h1 className="text-3xl font-bold text-slate-900">Loan Origination System</h1>
          </div>
          <Link to="/loans" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700">
            New Loan
          </Link>
        </div>

        {children}
      </main>
    </div>
  );
}
