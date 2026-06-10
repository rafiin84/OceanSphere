import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Package, Search, Filter, Plus, ChevronRight,
  CheckCircle, Clock, Send, Truck, FileText, TrendingUp, AlertCircle
} from 'lucide-react'
import { purchaseOrders, requisitions, vendors, spareParts } from '@/data/mockData'
import { cn, formatCurrency, getStatusColor, getStatusLabel, formatDate, getPriorityColor } from '@/lib/utils'

type ProcurementTab = 'dashboard' | 'requisitions' | 'purchase-orders' | 'vendors'

const pipelineStages = [
  { id: 'requested', label: 'Requested', icon: FileText, color: 'border-gray-400' },
  { id: 'approved', label: 'Approved', icon: CheckCircle, color: 'border-emerald-400' },
  { id: 'rfq_sent', label: 'RFQ Sent', icon: Send, color: 'border-ocean-400' },
  { id: 'vendor_review', label: 'Vendor Review', icon: Search, color: 'border-teal-400' },
  { id: 'po_issued', label: 'PO Issued', icon: FileText, color: 'border-purple-400' },
  { id: 'delivered', label: 'Delivered', icon: Truck, color: 'border-emerald-500' },
]

function ProcurementPipeline() {
  const getCountForStage = (stage: string) => purchaseOrders.filter(po => po.status === stage).length

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-card p-5 mb-6">
      <div className="text-sm font-semibold mb-4">Procurement Pipeline</div>
      <div className="flex items-center gap-1">
        {pipelineStages.map((stage, i) => (
          <div key={stage.id} className="flex items-center flex-1">
            <div className={cn('flex-1 rounded-xl border-2 p-3 text-center group cursor-pointer hover:shadow-sm transition-all', stage.color, 'bg-secondary/30 hover:bg-white')}>
              <stage.icon className="w-4 h-4 mx-auto mb-1.5 text-muted-foreground" />
              <div className="text-xs font-semibold text-foreground">{stage.label}</div>
              <div className="text-lg font-bold text-foreground mt-1">{getCountForStage(stage.id)}</div>
            </div>
            {i < pipelineStages.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mx-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function POStatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    requested: 'Requested', approved: 'Approved', rfq_sent: 'RFQ Sent',
    vendor_review: 'Vendor Review', po_issued: 'PO Issued', delivered: 'Delivered', cancelled: 'Cancelled',
  }
  const colors: Record<string, string> = {
    requested: 'bg-gray-50 text-gray-700 border-gray-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rfq_sent: 'bg-ocean-50 text-ocean-700 border-ocean-200',
    vendor_review: 'bg-teal-50 text-teal-700 border-teal-200',
    po_issued: 'bg-purple-50 text-purple-700 border-purple-200',
    delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  }
  return <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', colors[status] ?? 'bg-gray-50 text-gray-700 border-gray-200')}>{labels[status] ?? status}</span>
}

export function Procurement() {
  const [activeTab, setActiveTab] = useState<ProcurementTab>('dashboard')

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
    { id: 'requisitions' as const, label: 'Requisitions', icon: FileText },
    { id: 'purchase-orders' as const, label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'vendors' as const, label: 'Vendors', icon: Package },
  ]

  const totalPOValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Procurement</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Purchase orders and supplier management</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary"><Filter className="w-4 h-4" /> Filters</button>
          <button className="btn-primary"><Plus className="w-4 h-4" /> New Requisition</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Open Requisitions', value: requisitions.filter(r => r.status !== 'ordered').length, color: 'text-ocean-700', bg: 'bg-ocean-50', border: 'border-ocean-200', icon: FileText },
          { label: 'Active POs', value: purchaseOrders.length, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', icon: ShoppingCart },
          { label: 'PO Value MTD', value: formatCurrency(totalPOValue), color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', icon: TrendingUp },
          { label: 'Pending Delivery', value: purchaseOrders.filter(p => p.status === 'po_issued').length, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: Truck },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn('rounded-2xl border p-4 flex items-center gap-4', kpi.bg, kpi.border)}
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center bg-white/70', kpi.border, 'border')}>
              <kpi.icon className={cn('w-5 h-5', kpi.color)} />
            </div>
            <div>
              <div className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
            </div>
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
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'dashboard' && (
          <>
            <ProcurementPipeline />
            {/* Recent POs */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="text-sm font-semibold">Recent Purchase Orders</div>
                <button className="text-xs text-ocean-600 hover:text-ocean-800 font-medium" onClick={() => setActiveTab('purchase-orders')}>View All →</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Vendor</th>
                    <th>Vessel</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Expected Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map(po => (
                    <tr key={po.id}>
                      <td className="font-mono font-semibold text-ocean-700">{po.poNumber}</td>
                      <td className="font-medium">{po.vendorName}</td>
                      <td className="text-muted-foreground">{po.vesselName}</td>
                      <td><POStatusBadge status={po.status} /></td>
                      <td className="font-semibold">{formatCurrency(po.totalAmount)}</td>
                      <td className="text-muted-foreground">{formatDate(po.expectedDelivery)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'requisitions' && (
          <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="text-sm font-semibold">Requisitions</div>
              <button className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> New Requisition</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Requisition #</th>
                  <th>Vessel</th>
                  <th>Requested By</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Required Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.map(req => (
                  <tr key={req.id}>
                    <td className="font-mono font-semibold text-ocean-700">{req.requisitionNumber}</td>
                    <td className="font-medium">{req.vesselName}</td>
                    <td className="text-muted-foreground">{req.requestedBy}</td>
                    <td><span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full border', getPriorityColor(req.priority))}>{req.priority}</span></td>
                    <td><span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', getStatusColor(req.status))}>{getStatusLabel(req.status)}</span></td>
                    <td className="text-muted-foreground">{formatDate(req.requiredDate)}</td>
                    <td className="font-semibold">{formatCurrency(req.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'purchase-orders' && (
          <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="text-sm font-semibold">Purchase Orders</div>
              <button className="btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> Create PO</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Vendor</th>
                  <th>Vessel</th>
                  <th>Status</th>
                  <th>Issue Date</th>
                  <th>Expected Delivery</th>
                  <th>Amount</th>
                  <th>Port</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map(po => (
                  <tr key={po.id}>
                    <td className="font-mono font-semibold text-ocean-700">{po.poNumber}</td>
                    <td>
                      <div className="font-medium">{po.vendorName}</div>
                    </td>
                    <td className="text-muted-foreground">{po.vesselName}</td>
                    <td><POStatusBadge status={po.status} /></td>
                    <td className="text-muted-foreground">{formatDate(po.issueDate)}</td>
                    <td className="text-muted-foreground">{formatDate(po.expectedDelivery)}</td>
                    <td className="font-semibold">{formatCurrency(po.totalAmount)}</td>
                    <td className="text-muted-foreground">{po.deliveryPort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="grid grid-cols-2 gap-4">
            {vendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border/60 shadow-card p-5 cursor-pointer hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-sm">{vendor.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{vendor.code} • {vendor.country}</div>
                  </div>
                  <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full border', vendor.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200')}>
                    {vendor.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {vendor.category.map(cat => (
                    <span key={cat} className="text-[10px] font-medium px-2 py-0.5 bg-secondary rounded-lg text-muted-foreground">{cat}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-foreground">{vendor.rating}</div>
                    <div className="text-[10px] text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{vendor.totalOrders}</div>
                    <div className="text-[10px] text-muted-foreground">Total Orders</div>
                  </div>
                  <div>
                    <div className={cn('text-lg font-bold', vendor.onTimeDeliveryRate >= 90 ? 'text-emerald-600' : vendor.onTimeDeliveryRate >= 80 ? 'text-amber-600' : 'text-red-600')}>{vendor.onTimeDeliveryRate}%</div>
                    <div className="text-[10px] text-muted-foreground">On Time</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
