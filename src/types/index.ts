// ─── Fleet & Vessel Types ──────────────────────────────────────────
export type VesselStatus = 'at_sea' | 'in_port' | 'under_maintenance' | 'dry_dock' | 'idle'
export type VesselType = 'bulk_carrier' | 'tanker' | 'container' | 'ro_ro' | 'passenger' | 'offshore' | 'ferry' | 'general_cargo'
export type HealthStatus = 'good' | 'fair' | 'critical'

export interface Position {
  lat: number
  lng: number
}

export interface Vessel {
  id: string
  name: string
  imoNumber: string
  mmsiNumber: string
  callSign: string
  flag: string
  type: VesselType
  status: VesselStatus
  position: Position
  destination: string
  eta: string
  speed: number
  heading: number
  draught: number
  grossTonnage: number
  deadweightTonnage: number
  buildYear: number
  classification: string
  owner: string
  operator: string
  manager: string
  healthScore: number
  fuelEfficiency: number
  image: string
  lastPort: string
  nextPort: string
  voyageId: string
  crewOnboard: number
  crewCapacity: number
}

export interface VoyageDetail {
  id: string
  vesselId: string
  voyageNumber: string
  departurePort: string
  arrivalPort: string
  departureDate: string
  arrivalDate: string
  eta: string
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
  cargo: string
  distance: number
  fuelConsumed: number
  averageSpeed: number
}

// ─── Maintenance Types ─────────────────────────────────────────────
export type MaintenancePriority = 'critical' | 'high' | 'medium' | 'low'
export type WorkOrderStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'deferred' | 'cancelled'
export type EquipmentStatus = 'operational' | 'degraded' | 'failed' | 'under_maintenance'

export interface Equipment {
  id: string
  vesselId: string
  code: string
  name: string
  category: string
  subCategory: string
  manufacturer: string
  model: string
  serialNumber: string
  installDate: string
  lastMaintained: string
  nextMaintenance: string
  status: EquipmentStatus
  healthScore: number
  runningHours: number
  criticalityLevel: 'critical' | 'essential' | 'support'
  parentId?: string
  children?: Equipment[]
}

export interface WorkOrder {
  id: string
  workOrderNumber: string
  vesselId: string
  vesselName: string
  equipmentId: string
  equipmentName: string
  title: string
  description: string
  priority: MaintenancePriority
  status: WorkOrderStatus
  scheduledDate: string
  dueDate: string
  completedDate?: string
  estimatedHours: number
  actualHours?: number
  assignedTo: string[]
  primaryInterval: string
  secondaryInterval: string
  lastDoneHours: number
  nextDueHours: number
  isRiskAssessmentRequired: boolean
  isWorkPermitRequired: boolean
  spareParts: SparePartUsage[]
  defects: Defect[]
  attachments: string[]
}

export interface Defect {
  id: string
  vesselId: string
  equipmentId: string
  reportedBy: string
  reportedDate: string
  description: string
  rootCause?: string
  priority: MaintenancePriority
  status: 'open' | 'investigating' | 'in_progress' | 'resolved' | 'closed'
  resolvedDate?: string
  workOrderId?: string
}

// ─── Procurement & Inventory Types ────────────────────────────────
export type ProcurementStatus = 'requested' | 'approved' | 'rfq_sent' | 'vendor_review' | 'po_issued' | 'delivered' | 'cancelled'
export type RequisitionStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'ordered'

export interface SparePartUsage {
  partId: string
  partName: string
  quantity: number
  unit: string
}

export interface SparePart {
  id: string
  partNumber: string
  name: string
  description: string
  category: string
  manufacturer: string
  compatibleEquipment: string[]
  unit: string
  stockLevel: number
  minStockLevel: number
  maxStockLevel: number
  reorderPoint: number
  unitCost: number
  currency: string
  location: string
  leadTimeDays: number
  criticality: 'critical' | 'essential' | 'standard'
  lastOrdered: string
  lastReceived: string
}

export interface Requisition {
  id: string
  requisitionNumber: string
  vesselId: string
  vesselName: string
  requestedBy: string
  requestedDate: string
  requiredDate: string
  status: RequisitionStatus
  items: RequisitionItem[]
  totalAmount: number
  currency: string
  approvedBy?: string
  approvedDate?: string
  comments: string
  priority: 'urgent' | 'high' | 'normal' | 'low'
}

export interface RequisitionItem {
  id: string
  partId: string
  partName: string
  partNumber: string
  quantity: number
  unit: string
  estimatedUnitCost: number
  purpose: string
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  vendorId: string
  vendorName: string
  vesselId: string
  vesselName: string
  status: ProcurementStatus
  issueDate: string
  expectedDelivery: string
  deliveredDate?: string
  items: POItem[]
  totalAmount: number
  currency: string
  paymentTerms: string
  deliveryPort: string
}

export interface POItem {
  id: string
  partNumber: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

export interface Vendor {
  id: string
  name: string
  code: string
  country: string
  email: string
  phone: string
  category: string[]
  rating: number
  status: 'approved' | 'pending' | 'suspended'
  totalOrders: number
  onTimeDeliveryRate: number
}

// ─── Crewing Types ─────────────────────────────────────────────────
export type CrewRank = 'master' | 'chief_officer' | 'second_officer' | 'third_officer' | 'chief_engineer' | 'second_engineer' | 'third_engineer' | 'fourth_engineer' | 'bosun' | 'ab_seaman' | 'oiler' | 'cook' | 'cadet' | 'electrician'
export type CrewStatus = 'onboard' | 'on_leave' | 'available' | 'training' | 'off_signed'

export interface CrewMember {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  nationality: string
  dateOfBirth: string
  rank: CrewRank
  vesselId?: string
  vesselName?: string
  status: CrewStatus
  signOnDate?: string
  signOffDate?: string
  email: string
  phone: string
  photo: string
  certificates: Certificate[]
  seaService: SeaServiceRecord[]
  emergencyContact: EmergencyContact
  medicalExpiry: string
  passportExpiry: string
  visaExpiry?: string
  seafarerBookExpiry: string
  nextVessel?: string
}

export interface Certificate {
  id: string
  type: string
  category: 'stcw' | 'medical' | 'flag_state' | 'company' | 'training'
  issueDate: string
  expiryDate: string
  issuingAuthority: string
  certificateNumber: string
  status: 'valid' | 'expiring_soon' | 'expired' | 'revalidation_required'
}

export interface SeaServiceRecord {
  id: string
  vesselName: string
  vesselType: VesselType
  rank: CrewRank
  signOnDate: string
  signOffDate: string
  portOfEngagement: string
  portOfDischarge: string
  totalDays: number
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
  address: string
}

export interface CrewRotation {
  id: string
  vesselId: string
  vesselName: string
  rank: CrewRank
  incumbentId?: string
  incumbentName?: string
  reliefId?: string
  reliefName?: string
  signOffDate: string
  signOnDate: string
  status: 'planned' | 'confirmed' | 'in_transit' | 'completed'
  port: string
}

// ─── Compliance Types ──────────────────────────────────────────────
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'partially_compliant' | 'under_review' | 'expired'

export interface ComplianceItem {
  id: string
  category: 'ism' | 'isps' | 'marpol' | 'mlc' | 'flag_state' | 'class' | 'port_state'
  title: string
  description: string
  vesselId: string
  dueDate: string
  status: ComplianceStatus
  responsible: string
  lastReviewDate: string
  evidence: string[]
}

export interface VesselCertificate {
  id: string
  vesselId: string
  type: string
  category: 'safety' | 'environmental' | 'statutory' | 'class' | 'commercial'
  issuedBy: string
  issueDate: string
  expiryDate: string
  lastSurveyDate: string
  nextSurveyDate: string
  status: ComplianceStatus
  remarks: string
}

export interface Incident {
  id: string
  incidentNumber: string
  vesselId: string
  vesselName: string
  type: 'injury' | 'near_miss' | 'property_damage' | 'environmental' | 'security' | 'collision'
  severity: 'critical' | 'serious' | 'minor' | 'negligible'
  date: string
  location: string
  description: string
  rootCause?: string
  correctiveActions: CorrectiveAction[]
  status: 'open' | 'investigating' | 'corrective_action' | 'closed'
  reportedBy: string
}

export interface CorrectiveAction {
  id: string
  description: string
  responsible: string
  targetDate: string
  completedDate?: string
  status: 'open' | 'in_progress' | 'completed'
}

export interface Audit {
  id: string
  vesselId: string
  vesselName: string
  type: 'ism' | 'isps' | 'flag_state' | 'port_state_control' | 'class' | 'internal'
  scheduledDate: string
  completedDate?: string
  auditor: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  findings: AuditFinding[]
  grade?: 'satisfactory' | 'minor_findings' | 'major_findings' | 'detained'
}

export interface AuditFinding {
  id: string
  type: 'observation' | 'non_conformity' | 'major_non_conformity' | 'deficiency'
  description: string
  regulation: string
  closedDate?: string
  status: 'open' | 'responded' | 'closed'
}

// ─── AI & Analytics Types ──────────────────────────────────────────
export interface AIInsight {
  id: string
  type: 'maintenance' | 'fuel' | 'crew' | 'inventory' | 'compliance' | 'performance'
  severity: 'critical' | 'warning' | 'info' | 'success'
  title: string
  description: string
  vesselId?: string
  vesselName?: string
  recommendation: string
  estimatedSaving?: string
  confidence: number
  timestamp: string
  category: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  attachments?: string[]
  relatedItems?: {
    type: 'vessel' | 'crew' | 'work_order' | 'po' | 'certificate'
    id: string
    name: string
  }[]
}

// ─── Dashboard KPIs ────────────────────────────────────────────────
export interface DashboardKPI {
  totalVessels: number
  atSea: number
  inPort: number
  underMaintenance: number
  dryDock: number
  fleetHealthScore: number
  maintenanceCompliance: number
  overdueJobs: number
  upcomingJobs: number
  totalCrew: number
  expiringCertificates: number
  criticalAlerts: number
  fuelConsumptionMTD: number
  fuelConsumptionTarget: number
  pendingRequisitions: number
  openPOs: number
}

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  category: 'maintenance' | 'compliance' | 'crew' | 'fuel' | 'safety' | 'inventory'
  title: string
  description: string
  vesselId?: string
  vesselName?: string
  timestamp: string
  acknowledged: boolean
  actionUrl?: string
}

export interface FuelTrend {
  date: string
  actual: number
  target: number
  vessel?: string
}

export interface ComplianceScore {
  category: string
  score: number
  total: number
  status: HealthStatus
}
