import { motion } from 'framer-motion'
import { Settings, Bell, Shield, Database, Palette, Globe, Users, Anchor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const sections = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'fleet', label: 'Fleet Config', icon: Anchor },
  { id: 'users', label: 'Users & Access', icon: Users },
]

export function SettingsPage() {
  const [active, setActive] = useState('general')

  return (
    <div className="flex gap-6">
      {/* Left nav */}
      <div className="w-48 flex-shrink-0">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</div>
        <nav className="space-y-0.5">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} className={cn('flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all text-left', active === s.id ? 'bg-ocean-700 text-white' : 'text-muted-foreground hover:text-foreground hover:bg-white/80')}>
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {active === 'general' && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">General Settings</h2>
              <div className="bg-white rounded-2xl border border-border/60 shadow-card p-6 space-y-5">
                <h3 className="text-sm font-semibold">Company Information</h3>
                {[
                  { label: 'Company Name', value: 'OceanSphere Fleet Management' },
                  { label: 'Fleet Code', value: 'OSF-001' },
                  { label: 'Primary Contact', value: 'Fleet Manager' },
                  { label: 'Timezone', value: 'UTC+0 (GMT)' },
                  { label: 'Currency', value: 'USD' },
                  { label: 'Date Format', value: 'DD/MMM/YYYY' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <input defaultValue={item.value} className="px-3 py-1.5 bg-secondary/50 border border-border rounded-xl text-sm outline-none focus:border-ocean-400 w-64" />
                  </div>
                ))}
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {active !== 'general' && (
            <div className="bg-white rounded-2xl border border-border/60 shadow-card p-8 text-center">
              <Settings className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <div className="text-sm text-muted-foreground capitalize">{active} settings panel</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
