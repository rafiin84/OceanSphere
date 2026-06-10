import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Plus, AlertTriangle, Calendar, ChevronRight, Shield, Award, Clock, MapPin } from 'lucide-react'
import { crewMembers, crewRotations } from '@/data/mockData'
import { cn, getStatusColor, getStatusLabel, getRankLabel, formatDate, daysUntil } from '@/lib/utils'
import type { CrewMember } from '@/types'

type CrewTab = 'dashboard' | 'crew-list' | 'certificates' | 'rotations'

function CertStatusBadge({ expiryDate }: { expiryDate: string }) {
  const days = daysUntil(expiryDate)
  if (days < 0) return <span className="badge-status-red">Expired</span>
  if (days < 60) return <span className="badge-status-amber">Exp. {days}d</span>
  return <span className="badge-status-green">Valid</span>
}

function CrewCard({ crew, onClick }: { crew: CrewMember; onClick: () => void }) {
  const expiringCerts = crew.certificates.filter(c => c.status === 'expiring_soon' || c.status === 'expired').length

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-border/60 shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-all group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {crew.firstName[0]}{crew.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-foreground truncate">{crew.firstName} {crew.lastName}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{getRankLabel(crew.rank)}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{crew.nationality}</div>
        </div>
        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0', getStatusColor(crew.status))}>
          {getStatusLabel(crew.status)}
        </span>
      </div>

      {crew.vesselName && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <MapPin className="w-3 h-3 text-ocean-500" />
          <span className="font-medium text-foreground">{crew.vesselName}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Medical Expiry</span>
          <CertStatusBadge expiryDate={crew.medicalExpiry} />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Passport</span>
          <CertStatusBadge expiryDate={crew.passportExpiry} />
        </div>
      </div>

      {expiringCerts > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-xl px-2.5 py-1.5 border border-amber-200">
          <AlertTriangle className="w-3 h-3" />
          {expiringCerts} certificate{expiringCerts > 1 ? 's' : ''} expiring soon
        </div>
      )}

      {crew.signOffDate && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Sign off: {formatDate(crew.signOffDate)}
        </div>
      )}
    </motion.div>
  )
}

function CrewDetail({ crew, onBack }: { crew: CrewMember; onBack: () => void }) {
  const [tab, setTab] = useState('profile')
  const tabs = ['Profile', 'Certificates', 'Sea Service', 'Documents']

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors">
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Crew
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-card p-6 mb-5">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {crew.firstName[0]}{crew.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{crew.firstName} {crew.lastName}</h2>
                <div className="text-sm text-muted-foreground mt-0.5">{getRankLabel(crew.rank)} • {crew.nationality}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Employee ID: {crew.employeeId}</div>
              </div>
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full border', getStatusColor(crew.status))}>
                {getStatusLabel(crew.status)}
              </span>
            </div>
            <div className="flex items-center gap-6 mt-4">
              {crew.vesselName && (
                <div className="text-sm"><span className="text-muted-foreground">Vessel: </span><span className="font-semibold">{crew.vesselName}</span></div>
              )}
              {crew.signOnDate && (
                <div className="text-sm"><span className="text-muted-foreground">Sign On: </span><span className="font-semibold">{formatDate(crew.signOnDate)}</span></div>
              )}
              {crew.signOffDate && (
                <div className="text-sm"><span className="text-muted-foreground">Sign Off: </span><span className="font-semibold">{formatDate(crew.signOffDate)}</span></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-2xl p-1 mb-5 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all', tab === t.toLowerCase() ? 'bg-ocean-700 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
            <h3 className="text-sm font-semibold mb-4">Personal Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: `${crew.firstName} ${crew.lastName}` },
                { label: 'Date of Birth', value: formatDate(crew.dateOfBirth) },
                { label: 'Nationality', value: crew.nationality },
                { label: 'Email', value: crew.email },
                { label: 'Phone', value: crew.phone },
                { label: 'Passport Expiry', value: formatDate(crew.passportExpiry) },
                { label: 'Medical Expiry', value: formatDate(crew.medicalExpiry) },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
            <h3 className="text-sm font-semibold mb-4">Emergency Contact</h3>
            <div className="space-y-3">
              {[
                { label: 'Name', value: crew.emergencyContact.name },
                { label: 'Relationship', value: crew.emergencyContact.relationship },
                { label: 'Phone', value: crew.emergencyContact.phone },
                { label: 'Address', value: crew.emergencyContact.address },
              ].map(item => (
                <div key={item.label} className="flex flex-col border-b border-border/50 pb-2 last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-medium mt-0.5">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'certificates' && (
        <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Certificate</th><th>Category</th><th>Issue Date</th><th>Expiry Date</th><th>Issuing Authority</th><th>Status</th></tr></thead>
            <tbody>
              {crew.certificates.map(cert => (
                <tr key={cert.id}>
                  <td className="font-medium">{cert.type}</td>
                  <td className="text-muted-foreground capitalize">{cert.category.replace('_', ' ')}</td>
                  <td className="text-muted-foreground">{formatDate(cert.issueDate)}</td>
                  <td>{formatDate(cert.expiryDate)}</td>
                  <td className="text-muted-foreground">{cert.issuingAuthority}</td>
                  <td><CertStatusBadge expiryDate={cert.expiryDate} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {crew.certificates.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">No certificates on record</div>
          )}
        </div>
      )}

      {(tab === 'sea service' || tab === 'documents') && (
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-8 text-center">
          <Award className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <div className="text-muted-foreground text-sm capitalize">{tab} records will appear here.</div>
        </div>
      )}
    </motion.div>
  )
}

export function Crewing() {
  const [activeTab, setActiveTab] = useState<CrewTab>('dashboard')
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null)
  const [search, setSearch] = useState('')

  const expiringCount = crewMembers.reduce((sum, c) => sum + c.certificates.filter(cert => cert.status === 'expiring_soon' || cert.status === 'expired').length, 0)
  const onboardCount = crewMembers.filter(c => c.status === 'onboard').length
  const onLeaveCount = crewMembers.filter(c => c.status === 'on_leave').length

  const tabs = [
    { id: 'dashboard' as CrewTab, label: 'Dashboard', icon: Users },
    { id: 'crew-list' as CrewTab, label: 'Crew Profiles', icon: Users },
    { id: 'certificates' as CrewTab, label: 'Certificates', icon: Shield },
    { id: 'rotations' as CrewTab, label: 'Rotations', icon: Calendar },
  ]

  if (selectedCrew) {
    return <CrewDetail crew={selectedCrew} onBack={() => setSelectedCrew(null)} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crewing</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Seafarer management and certification</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Add Crew</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Crew', value: crewMembers.length, color: 'text-ocean-700', bg: 'bg-ocean-50 border-ocean-200' },
          { label: 'Onboard', value: onboardCount, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
          { label: 'On Leave', value: onLeaveCount, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
          { label: 'Certs Expiring', value: expiringCount, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={cn('rounded-2xl border p-4', kpi.bg)}>
            <div className={cn('text-3xl font-bold', kpi.color)}>{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-2xl p-1 mb-5 w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all', activeTab === tab.id ? 'bg-ocean-700 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {(activeTab === 'dashboard' || activeTab === 'crew-list') && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crew..." className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm outline-none focus:border-ocean-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {crewMembers.filter(c => c.firstName.toLowerCase().includes(search.toLowerCase()) || c.lastName.toLowerCase().includes(search.toLowerCase())).map((crew, i) => (
                <motion.div key={crew.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <CrewCard crew={crew} onClick={() => setSelectedCrew(crew)} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">Certificate Tracker — All Crew</div>
              <div className="text-xs text-muted-foreground">{expiringCount} certificates requiring attention</div>
            </div>
            <table className="data-table">
              <thead><tr><th>Seafarer</th><th>Rank</th><th>Vessel</th><th>Certificate Type</th><th>Expiry Date</th><th>Days Left</th><th>Status</th></tr></thead>
              <tbody>
                {crewMembers.flatMap(crew =>
                  crew.certificates.map(cert => ({
                    ...cert,
                    crewName: `${crew.firstName} ${crew.lastName}`,
                    rank: crew.rank,
                    vesselName: crew.vesselName ?? 'N/A',
                  }))
                ).filter(c => c.status !== 'valid').sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()).map(cert => {
                  const days = daysUntil(cert.expiryDate)
                  return (
                    <tr key={cert.id}>
                      <td className="font-medium">{cert.crewName}</td>
                      <td className="text-muted-foreground text-xs">{getRankLabel(cert.rank)}</td>
                      <td className="text-muted-foreground">{cert.vesselName}</td>
                      <td>{cert.type}</td>
                      <td>{formatDate(cert.expiryDate)}</td>
                      <td>
                        <span className={cn('font-bold', days < 0 ? 'text-red-600' : days < 30 ? 'text-red-600' : 'text-amber-600')}>
                          {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d`}
                        </span>
                      </td>
                      <td><CertStatusBadge expiryDate={cert.expiryDate} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rotations' && (
          <div className="space-y-3">
            {crewRotations.map((rot, i) => (
              <motion.div key={rot.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border/60 shadow-card p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold">{rot.vesselName}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{getRankLabel(rot.rank)}</span>
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border ml-auto',
                      rot.status === 'planned' ? 'bg-ocean-50 text-ocean-700 border-ocean-200' :
                      rot.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                    )}>{rot.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="text-xs text-muted-foreground">Relieving</div>
                      <div className="font-medium">{rot.incumbentName}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-1.5">
                      <div className="text-xs text-muted-foreground">Relief</div>
                      <div className="font-medium">{rot.reliefName ?? 'TBC'}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-muted-foreground">Sign Off / Sign On</div>
                  <div className="font-semibold mt-0.5">{formatDate(rot.signOffDate)}</div>
                  <div className="text-muted-foreground mt-0.5">{rot.port}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
