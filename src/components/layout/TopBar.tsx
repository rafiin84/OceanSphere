import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Bell, ChevronDown, Sun, Moon, Zap, Globe,
  AlertTriangle, Info, CheckCircle, X, User, Settings, LogOut
} from 'lucide-react'
import { useAppStore } from '@/store'
import { cn, formatDate } from '@/lib/utils'

export function TopBar() {
  const { alerts, unreadAlerts, acknowledgeAlert, darkMode, toggleDarkMode } = useAppStore()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getAlertIcon = (type: string) => {
    if (type === 'critical') return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-500" />
    return <Info className="w-4 h-4 text-ocean-500" />
  }

  return (
    <header className="h-14 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-border flex items-center px-5 gap-4 sticky top-0 z-30 flex-shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search vessels, crew, work orders..."
          className="w-full pl-9 pr-4 py-2 bg-secondary/60 dark:bg-white/5 border border-transparent focus:border-ocean-300 rounded-xl text-sm outline-none transition-all placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Fleet Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary/60 hover:bg-secondary rounded-xl text-sm font-medium text-foreground transition-colors border border-transparent hover:border-border">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span>All Vessels</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl bg-secondary/60 hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Quick Actions */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-700 hover:bg-ocean-800 text-white rounded-xl text-sm font-medium transition-colors">
          <Zap className="w-3.5 h-3.5" />
          <span>Quick Action</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(v => !v); setShowProfile(false) }}
            className="relative w-9 h-9 rounded-xl bg-secondary/60 hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadAlerts > 9 ? '9+' : unreadAlerts}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-96 bg-white dark:bg-navy-800 rounded-2xl shadow-panel border border-border overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div>
                    <div className="font-semibold text-sm">Alerts & Notifications</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{unreadAlerts} unread</div>
                  </div>
                  <button onClick={() => setShowNotifications(false)} className="w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="max-h-[420px] overflow-y-auto">
                  {alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={cn('flex gap-3 px-4 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer', !alert.acknowledged && 'bg-ocean-50/50 dark:bg-ocean-900/20')}
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium truncate">{alert.title}</div>
                          {!alert.acknowledged && <div className="w-2 h-2 rounded-full bg-ocean-500 flex-shrink-0 mt-1.5" />}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{formatDate(alert.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <button className="text-xs text-ocean-600 hover:text-ocean-800 font-medium">View all alerts</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(v => !v); setShowNotifications(false) }}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
              ZO
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold leading-none">Zoho Admin</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Fleet Manager</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-52 bg-white dark:bg-navy-800 rounded-2xl shadow-panel border border-border overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <div className="font-semibold text-sm">Zoho Admin</div>
                  <div className="text-xs text-muted-foreground">mohammed.n@zohocorp.com</div>
                </div>
                {[
                  { icon: User, label: 'Profile' },
                  { icon: Settings, label: 'Settings' },
                ].map(item => (
                  <button key={item.label} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-border">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {(showNotifications || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifications(false); setShowProfile(false) }} />
      )}
    </header>
  )
}
