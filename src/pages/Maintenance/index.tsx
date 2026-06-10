import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, Plus, Wrench, AlertTriangle, Clock, CheckCircle,
  ChevronRight, ChevronDown, Activity, Calendar, User, Tag,
  AlertCircle, Circle, Layers, ArrowRight, RefreshCw
} from 'lucide-react'
import { workOrders, defects, equipmentTree } from '@/data/mockData'
import { cn, getPriorityColor, getStatusColor, getStatusLabel, formatDate } from '@/lib/utils'
import type { WorkOrder, Equipment } from '@/types'

type MaintenanceTab = 'work-orders' | 'equipment' | 'defects' | 'trigger'

function StatusDot({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    open: 'bg-orange-500', assigned: 'bg-ocean-500', in_progress: 'bg-teal-500',
    completed: 'bg-emerald-500', deferred: 'bg-gray-400', cancelled: 'bg-red-500',
  }
  return <div className={cn('w-2 h-2 rounded-full flex-shrink-0', colorMap[status] ?? 'bg-gray-400')} />
}

function KanbanCard({ wo }: { wo: WorkOrder }) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="bg-white rounded-xl border border-border/70 p-3.5 shadow-sm cursor-pointer group hover:border-ocean-300 transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{wo.workOrderNumber}</div>
        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', getPriorityColor(wo.priority))}>
          {wo.priority}
        </span>
      </div>
      <div className="text-sm font-semibold text-foreground mb-1 leading-tight">{wo.title}</div>
      <div className="text-xs text-muted-foreground mb-3 line-clamp-2">{wo.equipmentName}</div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(wo.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{wo.estimatedHours}h est.</span>
        </div>
      </div>
      {wo.isWorkPermitRequired && (
        <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 rounded-lg px-2 py-1 border border-amber-200">
          <AlertTriangle className="w-3 h-3" />
          Work Permit Required
        </div>
      )}
    </motion.div>
  )
}

function KanbanBoard() {
  const columns = [
    { id: 'open', label: 'Open', color: 'border-orange-400 bg-orange-50', headerColor: 'text-orange-700', count: workOrders.filter(w => w.status === 'open').length },
    { id: 'assigned', label: 'Assigned', color: 'border-ocean-400 bg-ocean-50', headerColor: 'text-ocean-700', count: workOrders.filter(w => w.status === 'assigned').length },
    { id: 'in_progress', label: 'In Progress', color: 'border-teal-400 bg-teal-50', headerColor: 'text-teal-700', count: workOrders.filter(w => w.status === 'in_progress').length },
    { id: 'completed', label: 'Completed', color: 'border-emerald-400 bg-emerald-50', headerColor: 'text-emerald-700', count: workOrders.filter(w => w.status === 'completed').length },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map(col => (
        <div key={col.id} className={cn('rounded-2xl border-t-2 bg-secondary/30 p-3', col.color.split(' ')[0], col.color.split(' ')[1])}>
          <div className="flex items-center justify-between mb-3">
            <div className={cn('text-xs font-bold uppercase tracking-wider', col.headerColor)}>{col.label}</div>
            <span className="text-xs font-semibold bg-white rounded-full px-2 py-0.5 border border-border">{col.count}</span>
          </div>
          <div className="space-y-2.5">
            {workOrders.filter(w => w.status === col.id).map(wo => (
              <KanbanCard key={wo.id} wo={wo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EquipmentNode({ eq, depth = 0 }: { eq: Equipment; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = eq.children && eq.children.length > 0

  const statusColor = eq.status === 'operational' ? 'text-emerald-500' : eq.status === 'degraded' ? 'text-amber-500' : 'text-red-500'

  return (
    <div>
      <div
        className={cn('flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors group', depth > 0 && 'ml-6')}
        onClick={() => hasChildren && setExpanded(v => !v)}
      >
        {hasChildren ? (
          <ChevronDown className={cn('w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform', !expanded && '-rotate-90')} />
        ) : (
          <div className="w-3.5 h-3.5 flex-shrink-0" />
        )}
        <Activity className={cn('w-3.5 h-3.5 flex-shrink-0', statusColor)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{eq.code}</span>
            <span className="text-sm font-medium text-foreground truncate">{eq.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground">
          <span>{eq.runningHours.toLocaleString()}h</span>
          <span className={cn('font-semibold', eq.healthScore >= 85 ? 'text-emerald-600' : eq.healthScore >= 70 ? 'text-amber-600' : 'text-red-600')}>{eq.healthScore}</span>
        </div>
        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', getStatusColor(eq.status))}>{getStatusLabel(eq.status)}</span>
      </div>
      {expanded && hasChildren && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {eq.children!.map(child => <EquipmentNode key={child.id} eq={child} depth={depth + 1} />)}
        </motion.div>
      )}
    </div>
  )
}

function TriggerJobOrder() {
  const [dateFilter, setDateFilter] = useState('')
  const [hourFilter, setHourFilter] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const filtered = workOrders.filter(wo =>
    wo.title.toLowerCase().includes(search.toLowerCase()) ||
    wo.vesselName.toLowerCase().includes(search.toLowerCase()) ||
    wo.equipmentName.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4 mb-5">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Equipment Code</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search Equipment Code" className="w-full pl-9 pr-3 py-2 border border-border rounded-xl text-sm outline-none focus:border-ocean-400" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Safety Level</label>
            <select className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-none focus:border-ocean-400 bg-white">
              <option>Select All</option>
              <option>Critical</option>
              <option>Essential</option>
              <option>Support</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Date</label>
            <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-none focus:border-ocean-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Running Hours</label>
            <input type="number" placeholder="Enter Hour" value={hourFilter} onChange={e => setHourFilter(e.target.value)} className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-none focus:border-ocean-400" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="rounded" /> Show Sublevel Equipment
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer ml-4">
              <input type="checkbox" className="rounded" /> Existing Job Orders
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer ml-4">
              <input type="checkbox" className="rounded" /> Future Date
            </label>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-ocean-700 text-white rounded-xl text-sm font-medium hover:bg-ocean-800 transition-colors">
              <ArrowRight className="w-4 h-4" /> Apply Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Search & Count */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{filtered.length} records found</span>
          {selected.length > 0 && (
            <button className="btn-primary text-xs">
              <CheckCircle className="w-3.5 h-3.5" /> Trigger {selected.length} Job{selected.length > 1 ? 's' : ''}
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-ocean-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-10"><input type="checkbox" className="rounded" onChange={e => setSelected(e.target.checked ? filtered.map(w => w.id) : [])} /></th>
              <th>RA</th>
              <th>WF</th>
              <th>Equipment Code</th>
              <th>Equipment Name</th>
              <th>Job Title</th>
              <th>Job Description</th>
              <th>Present RHrs.</th>
              <th>Primary Interval</th>
              <th>Secondary Interval</th>
              <th>Last Done Hrs.</th>
              <th>Next Due Hrs.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(wo => (
              <tr key={wo.id} className={cn(selected.includes(wo.id) && 'bg-ocean-50')}>
                <td><input type="checkbox" className="rounded" checked={selected.includes(wo.id)} onChange={() => toggleSelect(wo.id)} /></td>
                <td>
                  {wo.isRiskAssessmentRequired && (
                    <button title="Risk Assessment Required" className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center hover:bg-orange-100 transition-colors">
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                    </button>
                  )}
                </td>
                <td>
                  {wo.isWorkPermitRequired && (
                    <button title="Work Permit Required" className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                    </button>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full flex-shrink-0',
                      wo.priority === 'critical' ? 'bg-red-500' : wo.priority === 'high' ? 'bg-orange-500' : wo.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-400'
                    )} />
                    <span className="font-mono text-xs font-medium text-ocean-700">{wo.vesselId === 'v001' ? '#601.001.01' : '#' + Math.random().toString().slice(2, 10)}</span>
                  </div>
                </td>
                <td className="font-medium">{wo.vesselName}</td>
                <td>
                  <div className="max-w-[180px] truncate text-sm font-medium">{wo.title}</div>
                </td>
                <td>
                  <div className="max-w-[180px] truncate text-xs text-muted-foreground">{wo.description}</div>
                </td>
                <td className="font-mono text-sm">{wo.lastDoneHours > 0 ? wo.lastDoneHours.toLocaleString() : '—'}</td>
                <td>
                  <span className="text-xs font-semibold text-ocean-700 bg-ocean-50 border border-ocean-200 px-2 py-0.5 rounded-full">
                    {wo.primaryInterval}
                  </span>
                </td>
                <td>
                  {wo.secondaryInterval && (
                    <span className="text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                      {wo.secondaryInterval}
                    </span>
                  )}
                </td>
                <td className="font-mono text-sm">{wo.lastDoneHours > 0 ? wo.lastDoneHours.toLocaleString() : '—'}</td>
                <td className="font-mono text-sm font-semibold">
                  {wo.nextDueHours > 0 ? wo.nextDueHours.toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Page size</span>
            <select className="border border-border rounded-lg px-2 py-1 text-xs bg-white outline-none">
              <option>100</option>
              <option>50</option>
              <option>25</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map(p => (
              <button key={p} className={cn('w-7 h-7 rounded-lg text-xs font-medium', p === 1 ? 'bg-ocean-700 text-white' : 'hover:bg-secondary')}>{p}</button>
            ))}
          </div>
          <div>1 - {filtered.length} of {filtered.length} items</div>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <span>Counter Not Available</span>
        <div className="w-3 h-3 rounded-full bg-amber-500 ml-3" />
        <span>Counter Present</span>
      </div>
    </div>
  )
}

function DefectList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Defect Management</h2>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Report Defect</button>
      </div>
      <div className="space-y-3">
        {defects.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-border/60 shadow-card p-4 cursor-pointer hover:border-ocean-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', getPriorityColor(d.priority))}>{d.priority}</span>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', getStatusColor(d.status))}>{getStatusLabel(d.status)}</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{d.description}</div>
                <div className="text-xs text-muted-foreground mt-1">Reported by {d.reportedBy} • {formatDate(d.reportedDate)}</div>
                {d.rootCause && <div className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1.5"><span className="font-medium text-foreground">Root Cause:</span> {d.rootCause}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function Maintenance() {
  const [activeTab, setActiveTab] = useState<MaintenanceTab>('trigger')

  const tabs: { id: MaintenanceTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'trigger', label: 'Trigger Job Order', icon: Calendar },
    { id: 'work-orders', label: 'Work Orders', icon: Wrench },
    { id: 'equipment', label: 'Equipment Registry', icon: Layers },
    { id: 'defects', label: 'Defects', icon: AlertTriangle },
  ]

  const stats = [
    { label: 'Open Jobs', value: workOrders.filter(w => w.status === 'open').length, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { label: 'In Progress', value: workOrders.filter(w => w.status === 'in_progress').length, color: 'text-ocean-600', bg: 'bg-ocean-50', border: 'border-ocean-200' },
    { label: 'Overdue', value: 3, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { label: 'Completed (30d)', value: workOrders.filter(w => w.status === 'completed').length, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Open Defects', value: defects.filter(d => d.status !== 'closed').length, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Planned Maintenance System (PMS)</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> New Work Order</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn('rounded-2xl border p-4', s.bg, s.border)}
          >
            <div className={cn('text-2xl font-bold', s.color)}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-2xl p-1 mb-5 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all', activeTab === tab.id ? 'bg-ocean-700 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === 'trigger' && <TriggerJobOrder />}
        {activeTab === 'work-orders' && <KanbanBoard />}
        {activeTab === 'equipment' && (
          <div className="bg-white rounded-2xl border border-border/60 shadow-card">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">Equipment Registry</div>
              <div className="text-xs text-muted-foreground">{equipmentTree.length} top-level systems</div>
            </div>
            <div className="divide-y divide-border/50 p-2">
              {equipmentTree.map(eq => <EquipmentNode key={eq.id} eq={eq} />)}
            </div>
          </div>
        )}
        {activeTab === 'defects' && <DefectList />}
      </motion.div>
    </div>
  )
}
