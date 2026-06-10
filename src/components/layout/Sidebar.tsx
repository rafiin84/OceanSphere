import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Ship, Wrench, ShoppingCart, Package,
  Users, Shield, Sparkles, Settings, ChevronLeft, ChevronRight,
  Anchor
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/fleet', icon: Ship, label: 'Fleet Operations' },
  { path: '/maintenance', icon: Wrench, label: 'Maintenance' },
  { path: '/procurement', icon: ShoppingCart, label: 'Procurement' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/crewing', icon: Users, label: 'Crewing' },
  { path: '/compliance', icon: Shield, label: 'Compliance' },
  { path: '/ai-copilot', icon: Sparkles, label: 'AI Copilot' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen bg-navy-900 border-r border-white/5 flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center shadow-glow-ocean">
          <Anchor className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-white font-bold text-[15px] leading-none">OceanSphere</div>
              <div className="text-ocean-400 text-[11px] mt-0.5 font-medium tracking-wide">Fleet ERP</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(item => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)

          return (
            <NavLink key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-ocean-600/90 text-white shadow-sm'
                    : 'text-navy-400 hover:text-white hover:bg-white/8'
                )}
              >
                <item.icon
                  className={cn('flex-shrink-0 w-[18px] h-[18px]', isActive ? 'text-white' : 'text-navy-400 group-hover:text-white')}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-xl bg-ocean-600/90 -z-10"
                  />
                )}

                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-navy-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg border border-white/10">
                    {item.label}
                  </div>
                )}
              </motion.div>
            </NavLink>
          )
        })}
      </nav>

      {/* Fleet Status */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3 pb-3"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[10px] font-semibold text-navy-400 uppercase tracking-widest mb-2">Fleet Status</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'At Sea', value: '4', color: 'bg-ocean-500' },
                  { label: 'In Port', value: '1', color: 'bg-teal-500' },
                  { label: 'Maintenance', value: '1', color: 'bg-amber-500' },
                  { label: 'Dry Dock', value: '1', color: 'bg-purple-500' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                    <span className="text-[10px] text-navy-400">{s.label}</span>
                    <span className="text-[10px] text-white font-semibold ml-auto">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3.5 top-[72px] w-7 h-7 rounded-full bg-navy-800 border border-white/15 flex items-center justify-center text-navy-400 hover:text-white hover:border-white/30 transition-all shadow-lg z-10"
      >
        {sidebarCollapsed
          ? <ChevronRight className="w-3.5 h-3.5" />
          : <ChevronLeft className="w-3.5 h-3.5" />
        }
      </button>
    </motion.aside>
  )
}
