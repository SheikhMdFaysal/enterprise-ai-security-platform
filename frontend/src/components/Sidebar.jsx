import { NavLink } from 'react-router-dom'
const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/scenarios', label: 'Attack Scenarios' },
  { to: '/tests', label: 'Security Tests' },
  { to: '/results', label: 'Results' },
  { to: '/compliance', label: 'Compliance' },
]
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-red-500">AI Security</h1>
        <p className="text-xs text-gray-500">Red Teaming Platform</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-red-500/10 text-red-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
