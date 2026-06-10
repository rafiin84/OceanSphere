import { motion } from 'framer-motion'
import { Ship, Anchor, Wrench, TrendingUp, TrendingDown, Fuel, Users, Shield, AlertTriangle, CheckCircle, Clock, Zap, ChevronRight, Activity } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { dashboardKPI, fuelTrends, weeklyFuelData, complianceScores, aiInsights, alerts, vessels } from '@/data/mockData'
import { cn, getStatusColor, getStatusLabel, formatNumber, getHealthColor, getHealthBg } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
}

function KPICard({ title, value, subtitle, icon: Icon, trend, trendLabel, color = 'ocean', delay = 0 }: {
  title: string; value: string | number; subtitle?: string; icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral'; trendLabel?: string; color?: string; delay?: number;
}) {
  const colorMap: Record<string, string> = {
    ocean: 'bg-ocean-50 text-ocean-700 border-ocean-100',
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className="stat-card group hover:scale-[1.01]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center', colorMap[color] ?? colorMap.ocean)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', trend === 'up' ? 'text-emerald-700 bg-emerald-50' : trend === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50')}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendLabel}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-foreground tracking-tight">{value}</div>
      <div className="text-sm font-medium text-muted-foreground mt-0.5">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{subtitle}</div>}
    </motion.div>
  )
}

function OceanMap() {
  return (
    <div className="relative w-full h-full ocean-map-bg rounded-2xl overflow-hidden">
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Continent outlines (simplified SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        {/* North America */}
        <path d="M 80 80 L 140 70 L 180 90 L 185 130 L 160 160 L 140 170 L 120 150 L 90 140 Z" fill="white" />
        {/* Europe */}
        <path d="M 370 75 L 420 70 L 435 85 L 425 105 L 400 110 L 375 100 Z" fill="white" />
        {/* Africa */}
        <path d="M 390 120 L 425 115 L 440 140 L 435 200 L 410 220 L 385 200 L 380 160 Z" fill="white" />
        {/* Asia */}
        <path d="M 450 60 L 580 55 L 620 80 L 600 120 L 560 130 L 500 120 L 460 100 Z" fill="white" />
        {/* Australia */}
        <path d="M 580 210 L 640 205 L 660 230 L 645 260 L 600 265 L 575 245 Z" fill="white" />
        {/* South America */}
        <path d="M 185 170 L 220 165 L 235 200 L 225 260 L 200 280 L 180 255 L 175 210 Z" fill="white" />
      </svg>

      {/* Route lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        <path d="M 250 190 Q 350 160 440 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.6" />
        <path d="M 560 110 Q 620 140 680 180" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.6" />
        <path d="M 650 180 Q 580 200 500 215" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.5" />
      </svg>

      {/* Vessel dots */}
      {[
        { x: '32%', y: '48%', name: 'MV Nordic Star', status: 'at_sea', color: '#38bdf8' },
        { x: '47%', y: '35%', name: 'MT Pacific Endeavour', status: 'in_port', color: '#2dd4bf' },
        { x: '72%', y: '30%', name: 'MV Atlantic Bridge', status: 'at_sea', color: '#38bdf8' },
        { x: '13%', y: '40%', name: 'MV Southern Cross', status: 'under_maintenance', color: '#f59e0b' },
        { x: '62%', y: '42%', name: 'MT Horizon Voyager', status: 'at_sea', color: '#38bdf8' },
        { x: '47%', y: '22%', name: 'MV Coral Princess', status: 'dry_dock', color: '#a78bfa' },
        { x: '81%', y: '58%', name: 'MV Emerald Trader', status: 'at_sea', color: '#38bdf8' },
      ].map((v, i) => (
        <div key={v.name} className="absolute group" style={{ left: v.x, top: v.y, transform: 'translate(-50%, -50%)' }}>
          {/* Pulse ring */}
          {v.status === 'at_sea' && (
            <div className="absolute -inset-2 rounded-full border" style={{ borderColor: v.color, opacity: 0.3, animation: `vessel-pulse ${2 + i * 0.3}s ease-in-out infinite` }} />
          )}
          {/* Dot */}
          <div className="relative w-3 h-3 rounded-full border-2 border-white/80 shadow-lg cursor-pointer hover:scale-150 transition-transform"
            style={{ backgroundColor: v.color }} />
          {/* Tooltip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-navy-900/90 backdrop-blur text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 z-10">
            <div>{v.name}</div>
            <div className="text-[10px] mt-0.5 capitalize" style={{ color: v.color }}>{getStatusLabel(v.status)}</div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-navy-900/60 backdrop-blur border border-white/10 rounded-xl px-3 py-2 flex items-center gap-4">
        {[
          { color: '#38bdf8', label: 'At Sea' },
          { color: '#2dd4bf', label: 'In Port' },
          { color: '#f59e0b', label: 'Maintenance' },
          { color: '#a78bfa', label: 'Dry Dock' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-white/80 text-[10px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Top overlay */}
      <div className="absolute top-4 right-4 bg-navy-900/60 backdrop-blur border border-white/10 rounded-xl px-3 py-2">
        <div className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Live Fleet Tracking</div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">7 vessels tracked</span>
        </div>
      </div>
    </div>
  )
}

function AlertFeed() {
  const unacknowledged = alerts.filter(a => !a.acknowledged)
  return (
    <div className="space-y-2">
      {unacknowledged.slice(0, 5).map((alert, i) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            'flex items-start gap-3 p-3 rounded-xl border text-sm cursor-pointer hover:shadow-sm transition-all',
            alert.type === 'critical' ? 'bg-red-50 border-red-200' : alert.type === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-ocean-50 border-ocean-200'
          )}
        >
          <AlertTriangle className={cn('w-4 h-4 flex-shrink-0 mt-0.5', alert.type === 'critical' ? 'text-red-500' : 'text-amber-500')} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs text-foreground truncate">{alert.title}</div>
            {alert.vesselName && <div className="text-xs text-muted-foreground mt-0.5">{alert.vesselName}</div>}
          </div>
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase flex-shrink-0',
            alert.type === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
            {alert.type}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function InsightCard({ insight, index }: { insight: typeof aiInsights[0]; index: number }) {
  const iconMap = { critical: '🚨', warning: '⚠️', info: '💡', success: '✅' }
  const colorMap = {
    critical: 'border-red-200 bg-red-50/50',
    warning: 'border-amber-200 bg-amber-50/50',
    info: 'border-ocean-200 bg-ocean-50/50',
    success: 'border-emerald-200 bg-emerald-50/50',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn('p-3.5 rounded-xl border cursor-pointer hover:shadow-sm transition-all group', colorMap[insight.severity])}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">{iconMap[insight.severity]}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-foreground leading-tight">{insight.title}</div>
          <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{insight.recommendation}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-[10px] text-muted-foreground">{insight.category}</div>
            <div className="text-[10px] text-muted-foreground">•</div>
            <div className="text-[10px] text-muted-foreground">{insight.confidence}% confidence</div>
          </div>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
      </div>
    </motion.div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const kpi = dashboardKPI

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeUp} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Fleet Command Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time overview — <span className="text-emerald-600 font-medium">7 vessels</span> • <span className="font-medium">Live tracking</span></p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white border border-border rounded-xl px-3 py-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="font-medium text-foreground">System Operational</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>
      </motion.div>

      {/* Fleet Status KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <KPICard title="Total Vessels" value={kpi.totalVessels} subtitle="OceanSphere fleet" icon={Ship} color="ocean" delay={0.05} />
        <KPICard title="At Sea" value={kpi.atSea} subtitle="Active voyages" icon={Anchor} trend="up" trendLabel="+1" color="ocean" delay={0.1} />
        <KPICard title="In Port" value={kpi.inPort} subtitle="Discharging / Loading" icon={Anchor} color="teal" delay={0.15} />
        <KPICard title="Maintenance" value={kpi.underMaintenance} subtitle="Planned repairs" icon={Wrench} color="amber" delay={0.2} />
        <KPICard title="Dry Dock" value={kpi.dryDock} subtitle="Major overhaul" icon={Wrench} color="purple" delay={0.25} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Fleet Map — large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-8 bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden"
          style={{ height: 380 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <div className="text-sm font-semibold">Live Fleet Map</div>
              <div className="text-xs text-muted-foreground mt-0.5">Real-time AIS vessel positions</div>
            </div>
            <button
              onClick={() => navigate('/fleet')}
              className="text-xs text-ocean-600 hover:text-ocean-800 font-medium flex items-center gap-1"
            >
              Full Map View <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-[calc(100%-52px)]">
            <OceanMap />
          </div>
        </motion.div>

        {/* Fleet Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="col-span-4 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="text-sm font-semibold mb-4">Fleet Health Score</div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#0369a1" strokeWidth="10"
                  strokeDasharray={`${kpi.fleetHealthScore * 3.14} 314`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{kpi.fleetHealthScore}</span>
                <span className="text-xs text-muted-foreground font-medium">/ 100</span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {vessels.map(v => (
              <div key={v.id} className="flex items-center gap-2">
                <div className="text-[11px] text-muted-foreground w-28 truncate">{v.name}</div>
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', getHealthBg(v.healthScore))} style={{ width: `${v.healthScore}%` }} />
                </div>
                <div className={cn('text-[11px] font-semibold w-7 text-right', getHealthColor(v.healthScore))}>{v.healthScore}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-12 gap-5">
        {/* Fuel Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="col-span-5 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Fuel Consumption</div>
              <div className="text-xs text-muted-foreground mt-0.5">MTD: {formatNumber(kpi.fuelConsumptionMTD)} MT vs {formatNumber(kpi.fuelConsumptionTarget)} MT target</div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              7.3% below target
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={fuelTrends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0369a1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0369a1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', fontSize: 12 }} />
              <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} fill="none" strokeDasharray="4 3" name="Target" />
              <Area type="monotone" dataKey="actual" stroke="#0369a1" strokeWidth={2.5} fill="url(#fuelGrad)" name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Maintenance Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="col-span-4 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="text-sm font-semibold mb-4">Maintenance Compliance</div>
          <div className="flex items-center gap-5 mb-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{kpi.maintenanceCompliance}%</div>
              <div className="text-xs text-muted-foreground mt-0.5">Compliance</div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Overdue</span>
                <span className="font-semibold text-red-600">{kpi.overdueJobs} jobs</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-red-500" style={{ width: `${(kpi.overdueJobs / 40) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Due Soon</span>
                <span className="font-semibold text-amber-600">{kpi.upcomingJobs} jobs</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-amber-500" style={{ width: `${(kpi.upcomingJobs / 40) * 100}%` }} />
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={weeklyFuelData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', fontSize: 11 }} />
              <Bar dataKey="consumption" fill="#0369a1" radius={[4, 4, 0, 0]} name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Crew Readiness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="col-span-3 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="text-sm font-semibold mb-4">Crew Readiness</div>
          <div className="space-y-3">
            {[
              { label: 'Active Crew', value: kpi.totalCrew, unit: 'seafarers', icon: Users, color: 'text-ocean-600' },
              { label: 'Expiring Certs', value: kpi.expiringCertificates, unit: 'this month', icon: AlertTriangle, color: 'text-amber-600' },
              { label: 'Crew Changes', value: 3, unit: 'upcoming', icon: Clock, color: 'text-teal-600' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40">
                <item.icon className={cn('w-4 h-4 flex-shrink-0', item.color)} />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-bold text-foreground">{item.value} <span className="text-xs font-normal text-muted-foreground">{item.unit}</span></div>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/crewing')} className="w-full mt-2 text-xs text-ocean-600 hover:text-ocean-800 font-medium flex items-center justify-center gap-1 py-1.5">
              View Crew <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-12 gap-5">
        {/* Compliance Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="col-span-4 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">Compliance Overview</div>
            <button onClick={() => navigate('/compliance')} className="text-xs text-ocean-600 hover:text-ocean-800 font-medium">View →</button>
          </div>
          <div className="space-y-2.5">
            {complianceScores.map(c => (
              <div key={c.category} className="flex items-center gap-3">
                <div className="text-xs font-medium w-16 text-muted-foreground">{c.category}</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', c.score >= 90 ? 'bg-emerald-500' : c.score >= 75 ? 'bg-amber-500' : 'bg-red-500')}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
                <div className={cn('text-xs font-semibold w-9 text-right', c.score >= 90 ? 'text-emerald-600' : c.score >= 75 ? 'text-amber-600' : 'text-red-600')}>
                  {c.score}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Critical Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="col-span-4 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Critical Alerts</div>
              <div className="text-xs text-muted-foreground mt-0.5">{alerts.filter(a => !a.acknowledged).length} unacknowledged</div>
            </div>
            <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
              {kpi.criticalAlerts} Critical
            </span>
          </div>
          <AlertFeed />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="col-span-4 bg-white rounded-2xl border border-border/60 shadow-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-teal-500" />
                AI Copilot Insights
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Powered by OceanSphere AI</div>
            </div>
            <button onClick={() => navigate('/ai-copilot')} className="text-xs text-teal-600 hover:text-teal-800 font-medium">Open →</button>
          </div>
          <div className="space-y-2">
            {aiInsights.slice(0, 4).map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
