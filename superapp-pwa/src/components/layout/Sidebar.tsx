import { NavLink } from 'react-router-dom'
import { cn } from '../ui/cn'

const items = [
  { to: '/franchisee', label: 'DASHBOARD', end: true },
  { to: '/franchisee/orders', label: 'ORDERS' },
  { to: '/franchisee/analytics', label: 'ANALYTICS' },
  { to: '/franchisee/settings', label: 'SETTINGS' },
] as const

export function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0 border-r border-[#E0E0E0] px-8 py-10">
      <div className="text-sm font-medium uppercase tracking-wider text-black">AVISHU</div>
      <div className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#AAAAAA]">
        MANAGEMENT PORTAL
      </div>

      <nav className="mt-16 space-y-6">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={'end' in item ? item.end : false}
            className={({ isActive }) =>
              cn(
                'block border-l-[3px] pl-5 text-xs font-medium uppercase tracking-wider',
                isActive ? 'border-black text-black' : 'border-transparent text-[#888888] hover:text-black',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

