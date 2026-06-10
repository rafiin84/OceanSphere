import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Search, Plus, AlertTriangle, TrendingDown, Filter } from 'lucide-react'
import { spareParts } from '@/data/mockData'
import { cn, formatCurrency } from '@/lib/utils'

export function Inventory() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = spareParts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ? true :
      filter === 'critical' ? p.stockLevel === 0 :
      filter === 'low' ? p.stockLevel < p.minStockLevel : true
    return matchSearch && matchFilter
  })

  const criticalCount = spareParts.filter(p => p.stockLevel === 0).length
  const lowStockCount = spareParts.filter(p => p.stockLevel < p.minStockLevel && p.stockLevel > 0).length
  const totalValue = spareParts.reduce((sum, p) => sum + p.stockLevel * p.unitCost, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Spare parts and consumables management</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Parts', value: spareParts.length, icon: Package, color: 'text-ocean-700', bg: 'bg-ocean-50 border-ocean-200' },
          { label: 'Zero Stock (Critical)', value: criticalCount, icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'Low Stock', value: lowStockCount, icon: TrendingDown, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Inventory Value', value: formatCurrency(totalValue), icon: Package, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={cn('rounded-2xl border p-4 flex items-center gap-3', kpi.bg)}>
            <kpi.icon className={cn('w-8 h-8', kpi.color)} />
            <div>
              <div className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts..." className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm outline-none focus:border-ocean-400" />
        </div>
        <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1">
          {[{ value: 'all', label: 'All' }, { value: 'critical', label: 'Zero Stock' }, { value: 'low', label: 'Low Stock' }].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', filter === f.value ? 'bg-ocean-700 text-white' : 'text-muted-foreground hover:text-foreground')}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((part, i) => {
          const stockPct = Math.min(100, (part.stockLevel / part.maxStockLevel) * 100)
          const isZero = part.stockLevel === 0
          const isLow = part.stockLevel < part.minStockLevel && part.stockLevel > 0

          return (
            <motion.div key={part.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={cn('bg-white rounded-2xl border shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-all', isZero ? 'border-red-200' : isLow ? 'border-amber-200' : 'border-border/60')}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{part.partNumber}</div>
                  <div className="text-sm font-semibold text-foreground mt-0.5 leading-tight">{part.name}</div>
                </div>
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0',
                  part.criticality === 'critical' ? 'bg-red-50 text-red-700 border-red-200' :
                  part.criticality === 'essential' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                )}>{part.criticality}</span>
              </div>

              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Stock</span>
                <span className={cn('font-bold text-lg', isZero ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-emerald-600')}>
                  {part.stockLevel} <span className="text-xs font-normal text-muted-foreground">{part.unit}</span>
                </span>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1">
                <div className={cn('h-full rounded-full transition-all', isZero ? 'bg-red-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${stockPct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
                <span>Min: {part.minStockLevel}</span>
                <span>Max: {part.maxStockLevel}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{part.location}</span>
                <span className="font-semibold text-foreground">{formatCurrency(part.unitCost)}/{part.unit}</span>
              </div>

              {(isZero || isLow) && (
                <button className={cn('w-full mt-3 py-1.5 rounded-xl text-xs font-semibold transition-colors', isZero ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white')}>
                  {isZero ? 'Emergency Order Required' : 'Reorder Required'}
                </button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
