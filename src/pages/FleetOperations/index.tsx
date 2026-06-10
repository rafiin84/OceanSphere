import { useState } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Search, Filter, Grid3x3, List, MapPin, Navigation, Fuel, Activity, ChevronRight, Ship, Clock, Users } from 'lucide-react'
import { vessels } from '@/data/mockData'
import { cn, getStatusColor, getStatusLabel, getVesselTypeLabel, getHealthColor, getHealthBg, formatDate } from '@/lib/utils'
import type { Vessel } from '@/types'

function VesselStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusColor(status))}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5',
        status === 'at_sea' ? 'bg-ocean-500' : status === 'in_port' ? 'bg-teal-500' :
        status === 'under_maintenance' ? 'bg-amber-500' : status === 'dry_dock' ? 'bg-purple-500' : 'bg-gray-400'
      )} />
      {getStatusLabel(status)}
    </span>
  )
}

function VesselCard({ vessel, onClick }: { vessel: Vessel; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -2, shadow: '0 8px 30px rgba(0,0,0,0.1)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-border/60 shadow-card hover:shadow-card-hover overflow-hidden cursor-pointer group transition-all duration-200"
    >
      {/* Vessel Image */}
      <div className="relative h-36 bg-gradient-to-br from-ocean-800 to-teal-800 overflow-hidden">
        <img
          src={vessel.image}
          alt={vessel.name}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <VesselStatusBadge status={vessel.status} />
          <div className="bg-white/15 backdrop-blur rounded-lg px-2 py-1 text-white text-xs font-medium border border-white/20">
            {getVesselTypeLabel(vessel.type)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-sm text-foreground">{vessel.name}</h3>
            <div className="text-xs text-muted-foreground mt-0.5">IMO {vessel.imoNumber} • {vessel.flag}</div>
          </div>
          <div className={cn('text-xl font-bold', getHealthColor(vessel.healthScore))}>{vessel.healthScore}</div>
        </div>

        <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
          <div className={cn('h-full rounded-full', getHealthBg(vessel.healthScore))} style={{ width: `${vessel.healthScore}%` }} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Navigation className="w-3 h-3 text-ocean-500" />
            <span className="truncate">{vessel.destination}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3 h-3 text-teal-500" />
            <span className="truncate">ETA {formatDate(vessel.eta)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>{vessel.speed} kts</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3 h-3 text-purple-500" />
            <span>{vessel.crewOnboard}/{vessel.crewCapacity} crew</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function VesselDetail({ vessel, onBack }: { vessel: Vessel; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview')
  const tabs = ['Overview', 'Performance', 'Voyage', 'Crew', 'Maintenance']

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      {/* Back button */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Fleet
      </button>

      {/* Hero */}
      <div className="relative h-52 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-ocean-800 to-navy-900">
        <img src={vessel.image} alt={vessel.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{vessel.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <VesselStatusBadge status={vessel.status} />
              <span className="text-white/70 text-sm">{getVesselTypeLabel(vessel.type)}</span>
              <span className="text-white/70 text-sm">IMO {vessel.imoNumber}</span>
            </div>
          </div>
          <div className="text-right">
            <div className={cn('text-4xl font-bold', getHealthColor(vessel.healthScore))}>{vessel.healthScore}</div>
            <div className="text-white/60 text-xs mt-0.5">Health Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-2xl p-1 mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all', activeTab === tab.toLowerCase() ? 'bg-ocean-700 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-3 gap-5">
          {/* Vessel Info */}
          <div className="col-span-2 bg-white rounded-2xl border border-border/60 shadow-card p-5">
            <h3 className="text-sm font-semibold mb-4">Vessel Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                { label: 'IMO Number', value: vessel.imoNumber },
                { label: 'MMSI Number', value: vessel.mmsiNumber },
                { label: 'Call Sign', value: vessel.callSign },
                { label: 'Flag State', value: vessel.flag },
                { label: 'Vessel Type', value: getVesselTypeLabel(vessel.type) },
                { label: 'Build Year', value: vessel.buildYear },
                { label: 'Classification', value: vessel.classification },
                { label: 'Gross Tonnage', value: `${vessel.grossTonnage.toLocaleString()} GT` },
                { label: 'Deadweight', value: `${vessel.deadweightTonnage.toLocaleString()} DWT` },
                { label: 'Owner', value: vessel.owner },
                { label: 'Operator', value: vessel.operator },
                { label: 'Manager', value: vessel.manager },
              ].map(item => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground mt-0.5">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Position */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
              <h3 className="text-sm font-semibold mb-3">Live Position</h3>
              <div className="space-y-2">
                {[
                  { label: 'Lat / Lon', value: `${vessel.position.lat.toFixed(4)}°, ${vessel.position.lng.toFixed(4)}°` },
                  { label: 'Speed', value: `${vessel.speed} knots` },
                  { label: 'Heading', value: `${vessel.heading}°` },
                  { label: 'Draught', value: `${vessel.draught}m` },
                  { label: 'Last Port', value: vessel.lastPort },
                  { label: 'Next Port', value: vessel.nextPort },
                  { label: 'ETA', value: formatDate(vessel.eta) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground text-xs">{item.label}</span>
                    <span className="font-medium text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
              <h3 className="text-sm font-semibold mb-3">Crew Status</h3>
              <div className="text-3xl font-bold text-foreground">{vessel.crewOnboard}<span className="text-base font-normal text-muted-foreground">/{vessel.crewCapacity}</span></div>
              <div className="text-xs text-muted-foreground mb-2">Crew onboard</div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-ocean-500" style={{ width: `${(vessel.crewOnboard / vessel.crewCapacity) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'Fuel Efficiency', value: `${vessel.fuelEfficiency}%`, desc: 'vs fleet benchmark', color: 'text-emerald-600' },
            { label: 'Health Score', value: vessel.healthScore, desc: 'Overall condition', color: getHealthColor(vessel.healthScore) },
            { label: 'Average Speed', value: `${vessel.speed} kts`, desc: 'Current voyage', color: 'text-ocean-600' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
              <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
              <div className={cn('text-3xl font-bold', item.color)}>{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === 'voyage' || activeTab === 'crew' || activeTab === 'maintenance') && (
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-8 text-center">
          <Ship className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <div className="text-muted-foreground text-sm">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} details are available in the respective modules.
          </div>
        </div>
      )}
    </motion.div>
  )
}

function FleetList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null)
  const navigate = useNavigate()

  const filtered = vessels.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.imoNumber.includes(search) || v.flag.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || v.status === statusFilter
    return matchSearch && matchStatus
  })

  if (selectedVessel) {
    return <VesselDetail vessel={selectedVessel} onBack={() => setSelectedVessel(null)} />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fleet Operations</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{vessels.length} vessels managed</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary"><Filter className="w-4 h-4" /> Filters</button>
          <button className="btn-primary"><Ship className="w-4 h-4" /> Add Vessel</button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vessels..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm outline-none focus:border-ocean-400 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'at_sea', label: 'At Sea' },
            { value: 'in_port', label: 'In Port' },
            { value: 'under_maintenance', label: 'Maintenance' },
            { value: 'dry_dock', label: 'Dry Dock' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', statusFilter === f.value ? 'bg-ocean-700 text-white' : 'text-muted-foreground hover:text-foreground')}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1">
          <button onClick={() => setView('grid')} className={cn('p-1.5 rounded-lg transition-colors', view === 'grid' ? 'bg-secondary text-foreground' : 'text-muted-foreground')}><Grid3x3 className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={cn('p-1.5 rounded-lg transition-colors', view === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground')}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Fleet Grid */}
      {view === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map((vessel, i) => (
            <motion.div
              key={vessel.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <VesselCard vessel={vessel} onClick={() => setSelectedVessel(vessel)} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vessel Name</th>
                <th>IMO</th>
                <th>Type</th>
                <th>Status</th>
                <th>Destination</th>
                <th>ETA</th>
                <th>Speed</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.id} onClick={() => setSelectedVessel(v)}>
                  <td>
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.flag}</div>
                  </td>
                  <td className="text-muted-foreground">{v.imoNumber}</td>
                  <td className="text-muted-foreground">{getVesselTypeLabel(v.type)}</td>
                  <td><VesselStatusBadge status={v.status} /></td>
                  <td className="text-muted-foreground">{v.destination}</td>
                  <td className="text-muted-foreground">{formatDate(v.eta)}</td>
                  <td className="text-muted-foreground">{v.speed} kts</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', getHealthBg(v.healthScore))} style={{ width: `${v.healthScore}%` }} />
                      </div>
                      <span className={cn('text-xs font-semibold', getHealthColor(v.healthScore))}>{v.healthScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export function FleetOperations() {
  return <FleetList />
}
