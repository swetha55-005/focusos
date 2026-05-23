import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/tasks',     icon: '✅', label: 'Tasks'     },
  { path: '/notes',     icon: '📝', label: 'Notes'     },
  { path: '/goals',     icon: '🎯', label: 'Goals'     },
  { path: '/analytics', icon: '📊', label: 'Analytics' },
]

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0A0A0F] border-r border-white/10 flex flex-col px-3 py-4">

      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-white font-bold text-lg">FocusOS</span>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200
              ${isActive
                ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar