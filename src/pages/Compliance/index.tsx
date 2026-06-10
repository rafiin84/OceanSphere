import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Clock, Plus, ChevronRight, FileCheck, Target, Activity } from 'lucide-react'
import { vesselCertificates, incidents, audits, complianceScores } from '@/data/mockData'
import { cn, getStatusColor, getStatusLabel, formatDate, daysUntil } from '@/lib/utils'

type ComplianceTab = 'dashboard' | 'certificates' | 'incidents' | 'audits'

function RiskMatrix() {
  const cells = [
    { row: 4, col: 1, label: 'H', bg: 'bg-amber-400' }, { row: 4, col: 2, label: 'H', bg: 'bg-amber-400' },
    { row: 4, col: 3, label: 'E', bg: 'bg-red-500' }, { row: 4, col: 4, label: 'E', bg: 'bg-red-600' },
    { row: 4, col: 5, label: 'E', bg: 'bg-red-700' },
    { row: 3, col: 1, label: 'M', bg: 'bg-amber-200' }, { row: 3, col: 2, label: 'H', bg: 'bg-amber-400' },
    { row: 3, col: 3, label: 'H', bg: 'bg-amber-400' }, { row: 3, col: 4, label: 'E', bg: 'bg-red-500' },
    { row: 3, col: 5, label: 'E', bg: 'bg-red-600' },
    { row: 2, col: 1, label: 'L', bg: 'bg-emerald-200' }, { row: 2, col: 2, label: 'M', bg: 'bg-amber-200' },
    { row: 2, col: 3, label: 'H', bg: 'bg-amber-400' }, { row: 2, col: 4, label: 'H', bg: 'bg-amber-400' },
    { row: 2, col: 5, label: 'E', bg: 'bg-red-500' },
    { row: 1, col: 1, label: 'L', bg: 'bg-emerald-100' }, { row: 1, col: 2, label: 'L', bg: 'bg-emerald-200' },
    { row: 1, col: 3, label: 'M', bg: 'bg-amber-200' }, { row: 1, col: 4, label: 'H', bg: 'bg-amber-400' },
    { row: 1, col: 5, label: 'H', bg: 'bg-amber-400' },
  ]

  const incidents_placed = [
    { row: 2, col: 1, count: 1, label: 'Near Miss' },
    { row: 1, col: 2, count: 1, label: 'Property Dmg' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
      <div className="text-sm font-semibold mb-4">Risk Matrix</div>
      <div className="flex">
        {/* Y-axis label */}
        <div className="flex flex-col items-center justify-center mr-2 w-8">
          <div className="text-[10px] text-muted-foreground font-semibold rotate-[-90deg] whitespace-nowrap">Likelihood →</div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-0.5">
            {[4, 3, 2, 1].map(row =>
              [1, 2, 3, 4, 5].map(col => {
                const cell = cells.find(c => c.row === row && c.col === col)
                const placed = incidents_placed.find(i => i.row === row && i.col === col)
                return (
                  <div key={`${row}-${col}`} className={cn('relative h-14 rounded-lg flex items-center justify-center font-bold text-xs text-white/90', cell?.bg ?? 'bg-gray-200')}>
                    <span className="opacity-60">{cell?.label}</span>
                    {placed && (
                      <div className="absolute inset-1 rounded bg-white/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-sm font-black">{placed.count}</div>
                          <div className="text-white/80 text-[9px] leading-none">{placed.label}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
          <div className="flex mt-1.5">
            {['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'].map(label => (
              <div key={label} className="flex-1 text-center text-[9px] text-muted-foreground">{label}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3 text-[10px]">
        {[
          { color: 'bg-emerald-200', label: 'Low' }, { color: 'bg-amber-200', label: 'Medium' },
          { color: 'bg-amber-400', label: 'High' }, { color: 'bg-red-500', label: 'Extreme' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1">
            <div className={cn('w-3 h-3 rounded', item.color)} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Compliance() {
  const [activeTab, setActiveTab] = useState<ComplianceTab>('dashboard')

  const tabs = [
    { id: 'dashboard' as ComplianceTab, label: 'Dashboard', icon: Shield },
    { id: 'certificates' as ComplianceTab, label: 'Vessel Certs', icon: FileCheck },
    { id: 'incidents' as ComplianceTab, label: 'Incidents', icon: AlertTriangle },
    { id: 'audits' as ComplianceTab, label: 'Audits', icon: Target },
  ]

  const expiredCerts = vesselCertificates.filter(c => c.status === 'expired').length
  const openIncidents = incidents.filter(i => i.status !== 'closed').length
  const upcomingAudits = audits.filter(a => a.status === 'scheduled').length

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance & HSEQ</h1>
          <p className="text-sm text-muted-foreground mt-0.5">ISM, ISPS, MARPOL, MLC, and Class compliance</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Report Incident</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Compliance Score', value: '82%', color: 'text-ocean-700', bg: 'bg-ocean-50 border-ocean-200', icon: Shield },
          { label: 'Expired Certs', value: expiredCerts, color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: AlertTriangle },
          { label: 'Open Incidents', value: openIncidents, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Activity },
          { label: 'Upcoming Audits', value: upcomingAudits, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200', icon: Target },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={cn('rounded-2xl border p-4 flex items-center gap-4', kpi.bg)}>
            <kpi.icon className={cn('w-8 h-8 flex-shrink-0', kpi.color)} />
            <div>
              <div className={cn('text-3xl font-bold', kpi.color)}>{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
            </div>
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
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-12 gap-5">
            {/* Compliance Scorecards */}
            <div className="col-span-7 bg-white rounded-2xl border border-border/60 shadow-card p-5">
              <div className="text-sm font-semibold mb-4">Compliance Scorecards</div>
              <div className="space-y-3">
                {[
                  { category: 'ISM — International Safety Management', score: 92, items: 48, closed: 44, status: 'good' },
                  { category: 'ISPS — International Ship & Port Security', score: 88, items: 32, closed: 28, status: 'good' },
                  { category: 'MARPOL — Marine Pollution Prevention', score: 74, items: 56, closed: 41, status: 'fair' },
                  { category: 'MLC — Maritime Labour Convention', score: 95, items: 38, closed: 36, status: 'good' },
                  { category: 'Flag State Requirements', score: 68, items: 22, closed: 15, status: 'critical' },
                  { category: 'Class Requirements', score: 82, items: 65, closed: 53, status: 'good' },
                ].map(item => (
                  <div key={item.category} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-foreground mb-1.5">{item.category}</div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', item.score >= 90 ? 'bg-emerald-500' : item.score >= 75 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                    <div className={cn('text-lg font-bold w-12 text-right', item.score >= 90 ? 'text-emerald-600' : item.score >= 75 ? 'text-amber-600' : 'text-red-600')}>{item.score}%</div>
                    <div className="text-xs text-muted-foreground w-16 text-right">{item.closed}/{item.items} items</div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Matrix */}
            <div className="col-span-5">
              <RiskMatrix />

              {/* Recent Audit Summary */}
              <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4 mt-4">
                <div className="text-sm font-semibold mb-3">Audit Status</div>
                <div className="space-y-2">
                  {audits.map(aud => (
                    <div key={aud.id} className="flex items-center gap-2 text-xs">
                      <div className={cn('w-2 h-2 rounded-full flex-shrink-0',
                        aud.status === 'completed' ? 'bg-emerald-500' : aud.status === 'in_progress' ? 'bg-ocean-500' : 'bg-amber-500'
                      )} />
                      <span className="flex-1 truncate font-medium">{aud.vesselName}</span>
                      <span className="text-muted-foreground capitalize">{aud.type.replace('_', ' ')}</span>
                      <span className={cn('px-1.5 py-0.5 rounded-md text-[10px] font-semibold',
                        aud.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : aud.status === 'in_progress' ? 'bg-ocean-50 text-ocean-700' : 'bg-amber-50 text-amber-700'
                      )}>{aud.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">Vessel Certificates</div>
              <button className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> Add Certificate</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Certificate</th>
                  <th>Vessel</th>
                  <th>Issued By</th>
                  <th>Category</th>
                  <th>Issue Date</th>
                  <th>Expiry Date</th>
                  <th>Next Survey</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vesselCertificates.map(cert => {
                  const days = daysUntil(cert.expiryDate)
                  return (
                    <tr key={cert.id}>
                      <td className="font-medium">{cert.type}</td>
                      <td className="text-muted-foreground">{cert.vesselId === 'v001' ? 'MV Nordic Star' : cert.vesselId === 'v002' ? 'MT Pacific Endeavour' : cert.vesselId === 'v003' ? 'MV Atlantic Bridge' : cert.vesselId === 'v004' ? 'MV Southern Cross' : 'Other'}</td>
                      <td className="text-muted-foreground text-xs">{cert.issuedBy}</td>
                      <td><span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">{cert.category}</span></td>
                      <td className="text-muted-foreground">{formatDate(cert.issueDate)}</td>
                      <td className={cn('font-medium', days < 0 ? 'text-red-600' : days < 90 ? 'text-amber-600' : 'text-foreground')}>{formatDate(cert.expiryDate)}</td>
                      <td className="text-muted-foreground">{formatDate(cert.nextSurveyDate)}</td>
                      <td>
                        <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', getStatusColor(cert.status))}>
                          {getStatusLabel(cert.status)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {incidents.map((inc, i) => (
              <motion.div key={inc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-semibold text-ocean-700">{inc.incidentNumber}</span>
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase',
                        inc.severity === 'critical' ? 'bg-red-50 text-red-700 border-red-200' :
                        inc.severity === 'serious' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      )}>{inc.severity}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">{inc.type.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{inc.description}</div>
                  </div>
                  <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', getStatusColor(inc.status))}>
                    {getStatusLabel(inc.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(inc.date)}</span>
                  <span>{inc.vesselName}</span>
                  <span>{inc.location}</span>
                  <span>Reported by {inc.reportedBy}</span>
                </div>
                {inc.rootCause && (
                  <div className="text-xs bg-secondary/50 rounded-xl px-3 py-2 mb-3">
                    <span className="font-semibold text-foreground">Root Cause: </span>{inc.rootCause}
                  </div>
                )}
                {inc.correctiveActions.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Corrective Actions</div>
                    <div className="space-y-1.5">
                      {inc.correctiveActions.map(ca => (
                        <div key={ca.id} className="flex items-start gap-2 text-xs">
                          <div className={cn('w-2 h-2 rounded-full mt-0.5 flex-shrink-0', ca.status === 'completed' ? 'bg-emerald-500' : ca.status === 'in_progress' ? 'bg-ocean-500' : 'bg-amber-500')} />
                          <span className="flex-1">{ca.description}</span>
                          <span className="text-muted-foreground">Due {formatDate(ca.targetDate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="space-y-4">
            {audits.map((aud, i) => (
              <motion.div key={aud.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border/60 shadow-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold">{aud.vesselName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 capitalize">{aud.type.replace('_', ' ')} Audit • {aud.auditor}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {aud.grade && (
                      <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border',
                        aud.grade === 'satisfactory' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        aud.grade === 'minor_findings' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'
                      )}>{aud.grade.replace('_', ' ')}</span>
                    )}
                    <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', getStatusColor(aud.status))}>{getStatusLabel(aud.status)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Scheduled: {formatDate(aud.scheduledDate)}</span>
                  {aud.completedDate && <span>Completed: {formatDate(aud.completedDate)}</span>}
                </div>
                {aud.findings.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{aud.findings.length} Finding{aud.findings.length > 1 ? 's' : ''}</div>
                    <div className="space-y-1.5">
                      {aud.findings.map(f => (
                        <div key={f.id} className="flex items-start gap-2 text-xs bg-secondary/50 rounded-xl px-3 py-2">
                          <span className={cn('font-bold flex-shrink-0', f.type === 'major_non_conformity' ? 'text-red-600' : f.type === 'non_conformity' ? 'text-orange-600' : f.type === 'deficiency' ? 'text-amber-600' : 'text-muted-foreground')}>{f.type.replace(/_/g, ' ').toUpperCase()}</span>
                          <span className="flex-1">{f.description}</span>
                          <span className={cn('px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0',
                            f.status === 'closed' ? 'bg-emerald-50 text-emerald-700' : f.status === 'responded' ? 'bg-ocean-50 text-ocean-700' : 'bg-amber-50 text-amber-700'
                          )}>{f.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Import needed
import { Calendar } from 'lucide-react'
