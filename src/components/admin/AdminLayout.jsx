import { useState, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  Menu,
  X,
  Dumbbell,
  ChevronRight,
} from 'lucide-react'
import { logout, getClients } from '../../lib/storage'

const DONE_KEY = 'coach_rappels_done'
function getPendingCount() {
  try {
    const done = new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]'))
    return getClients().filter(
      (c) => (c.status === 'pending_payment' || c.status === 'paused') && !done.has(`${c.status === 'pending_payment' ? 'payment' : 'pause'}_${c.id}`)
    ).length
  } catch { return 0 }
}

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/clients', icon: Users, label: 'Clients' },
  { to: '/admin/rappels', icon: Bell, label: 'Rappels', badge: true },
]

function SidebarContent({ onClose }) {
  const navigate = useNavigate()
  const pendingCount = useMemo(() => getPendingCount(), [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-surface-border flex items-center justify-between">
        <span className="font-display text-xl tracking-widest select-none">
          SAHI <span className="text-gold">ADMIN</span>
        </span>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-gold text-surface'
                  : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-surface' : 'text-white/40 group-hover:text-white'} />
                {label}
                {badge && pendingCount > 0 && !isActive && (
                  <span className="ml-auto bg-red-400 text-white text-[0.6rem] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                    {pendingCount}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="ml-auto text-surface/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-surface-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-surface-card border-r border-surface-border fixed top-0 left-0 h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-surface-card border-r border-surface-border h-full z-50">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-surface-border px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 text-white/50 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-white font-semibold text-base">{title}</h1>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Dumbbell size={13} className="text-gold" />
            Coach Sahi
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
