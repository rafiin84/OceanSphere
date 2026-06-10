import type {
  Vessel, WorkOrder, Equipment, Defect, SparePart, Requisition,
  PurchaseOrder, Vendor, CrewMember, VesselCertificate, Incident,
  Audit, AIInsight, Alert, FuelTrend, DashboardKPI, CrewRotation
} from '../types'

// ─── Vessels ────────────────────────────────────────────────────────
export const vessels: Vessel[] = [
  {
    id: 'v001', name: 'MV Nordic Star', imoNumber: '9876543', mmsiNumber: '235678901',
    callSign: 'MWNS', flag: 'Marshall Islands', type: 'bulk_carrier', status: 'at_sea',
    position: { lat: 25.7617, lng: -80.1918 }, destination: 'Rotterdam', eta: '2026-06-18T14:00:00Z',
    speed: 14.2, heading: 45, draught: 11.2, grossTonnage: 45000, deadweightTonnage: 82500,
    buildYear: 2019, classification: 'DNV GL', owner: 'Nordic Shipping AS', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 94, fuelEfficiency: 88, lastPort: 'Singapore',
    nextPort: 'Rotterdam', voyageId: 'V2026-0142', crewOnboard: 24, crewCapacity: 26,
    image: 'https://images.unsplash.com/photo-1539601238269-8a50e08da0b7?w=800&q=80',
  },
  {
    id: 'v002', name: 'MT Pacific Endeavour', imoNumber: '8765432', mmsiNumber: '345789012',
    callSign: 'MWPE', flag: 'Liberia', type: 'tanker', status: 'in_port',
    position: { lat: 51.9244, lng: 4.4777 }, destination: 'Antwerp', eta: '2026-06-11T08:00:00Z',
    speed: 0, heading: 0, draught: 13.5, grossTonnage: 62000, deadweightTonnage: 105000,
    buildYear: 2017, classification: 'Lloyd\'s Register', owner: 'Pacific Holdings Ltd', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 78, fuelEfficiency: 82, lastPort: 'Rotterdam',
    nextPort: 'Antwerp', voyageId: 'V2026-0141', crewOnboard: 28, crewCapacity: 30,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  },
  {
    id: 'v003', name: 'MV Atlantic Bridge', imoNumber: '7654321', mmsiNumber: '456890123',
    callSign: 'MWAB', flag: 'Bahamas', type: 'container', status: 'at_sea',
    position: { lat: 35.6762, lng: 139.6503 }, destination: 'Los Angeles', eta: '2026-06-22T18:00:00Z',
    speed: 18.5, heading: 92, draught: 12.8, grossTonnage: 95000, deadweightTonnage: 142000,
    buildYear: 2021, classification: 'Bureau Veritas', owner: 'Atlantic Lines', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 97, fuelEfficiency: 93, lastPort: 'Shanghai',
    nextPort: 'Los Angeles', voyageId: 'V2026-0143', crewOnboard: 22, crewCapacity: 24,
    image: 'https://images.unsplash.com/photo-1605745341075-1b7b5a91c0b2?w=800&q=80',
  },
  {
    id: 'v004', name: 'MV Southern Cross', imoNumber: '6543210', mmsiNumber: '567901234',
    callSign: 'MWSC', flag: 'Singapore', type: 'bulk_carrier', status: 'under_maintenance',
    position: { lat: 1.3521, lng: 103.8198 }, destination: 'Singapore', eta: '2026-06-25T00:00:00Z',
    speed: 0, heading: 180, draught: 8.5, grossTonnage: 38000, deadweightTonnage: 75000,
    buildYear: 2015, classification: 'ClassNK', owner: 'Southern Shipping Corp', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 62, fuelEfficiency: 74, lastPort: 'Singapore',
    nextPort: 'Port Hedland', voyageId: 'V2026-0144', crewOnboard: 20, crewCapacity: 26,
    image: 'https://images.unsplash.com/photo-1504889551-b5e3d34f0048?w=800&q=80',
  },
  {
    id: 'v005', name: 'MT Horizon Voyager', imoNumber: '5432109', mmsiNumber: '678012345',
    callSign: 'MWHV', flag: 'Malta', type: 'tanker', status: 'at_sea',
    position: { lat: 22.3193, lng: 114.1694 }, destination: 'Fujairah', eta: '2026-06-15T12:00:00Z',
    speed: 13.8, heading: 215, draught: 14.2, grossTonnage: 58000, deadweightTonnage: 98000,
    buildYear: 2018, classification: 'ABS', owner: 'Horizon Maritime', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 88, fuelEfficiency: 86, lastPort: 'Hong Kong',
    nextPort: 'Fujairah', voyageId: 'V2026-0145', crewOnboard: 26, crewCapacity: 28,
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80',
  },
  {
    id: 'v006', name: 'MV Coral Princess', imoNumber: '4321098', mmsiNumber: '789123456',
    callSign: 'MWCP', flag: 'Norway', type: 'ro_ro', status: 'dry_dock',
    position: { lat: 59.9139, lng: 10.7522 }, destination: 'Oslo', eta: '2026-07-15T00:00:00Z',
    speed: 0, heading: 0, draught: 7.2, grossTonnage: 28000, deadweightTonnage: 52000,
    buildYear: 2012, classification: 'DNV GL', owner: 'Nordic Ferries AS', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 55, fuelEfficiency: 71, lastPort: 'Bergen',
    nextPort: 'Hamburg', voyageId: 'V2026-0146', crewOnboard: 18, crewCapacity: 22,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
  },
  {
    id: 'v007', name: 'MV Emerald Trader', imoNumber: '3210987', mmsiNumber: '890234567',
    callSign: 'MWET', flag: 'Cyprus', type: 'general_cargo', status: 'at_sea',
    position: { lat: -33.8688, lng: 151.2093 }, destination: 'Brisbane', eta: '2026-06-12T10:00:00Z',
    speed: 11.5, heading: 330, draught: 9.8, grossTonnage: 22000, deadweightTonnage: 38000,
    buildYear: 2016, classification: 'ClassNK', owner: 'Emerald Maritime Ltd', operator: 'OceanSphere Marine',
    manager: 'OceanSphere Fleet Mgmt', healthScore: 91, fuelEfficiency: 90, lastPort: 'Sydney',
    nextPort: 'Brisbane', voyageId: 'V2026-0147', crewOnboard: 16, crewCapacity: 18,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  },
]

// ─── Work Orders ────────────────────────────────────────────────────
export const workOrders: WorkOrder[] = [
  {
    id: 'wo001', workOrderNumber: 'WO-2026-4521', vesselId: 'v001', vesselName: 'MV Nordic Star',
    equipmentId: 'eq001', equipmentName: 'Main Engine MAN B&W 6S60MC-C', title: 'Main Engine Top Overhaul',
    description: 'Scheduled top overhaul of main engine — cylinder heads, piston rings, and liners inspection.',
    priority: 'high', status: 'in_progress', scheduledDate: '2026-06-15', dueDate: '2026-06-20',
    estimatedHours: 72, actualHours: 24, assignedTo: ['eng_001', 'eng_002'],
    primaryInterval: '3 MONTH', secondaryInterval: '3000 HOURS', lastDoneHours: 21500, nextDueHours: 24500,
    isRiskAssessmentRequired: true, isWorkPermitRequired: true,
    spareParts: [{ partId: 'sp001', partName: 'Cylinder Head Gasket', quantity: 6, unit: 'PCS' }],
    defects: [], attachments: ['ra_001.pdf', 'procedure_001.pdf'],
  },
  {
    id: 'wo002', workOrderNumber: 'WO-2026-4522', vesselId: 'v002', vesselName: 'MT Pacific Endeavour',
    equipmentId: 'eq005', equipmentName: 'Cargo Pump Unit 1', title: 'Cargo Pump Annual Inspection',
    description: 'Annual overhaul and inspection per manufacturer requirements and class requirements.',
    priority: 'critical', status: 'open', scheduledDate: '2026-06-10', dueDate: '2026-06-10',
    estimatedHours: 16, assignedTo: ['eng_003'],
    primaryInterval: '1 YEAR', secondaryInterval: '8000 HOURS', lastDoneHours: 31200, nextDueHours: 39200,
    isRiskAssessmentRequired: true, isWorkPermitRequired: true,
    spareParts: [], defects: [], attachments: [],
  },
  {
    id: 'wo003', workOrderNumber: 'WO-2026-4523', vesselId: 'v001', vesselName: 'MV Nordic Star',
    equipmentId: 'eq002', equipmentName: 'Auxiliary Engine Gen 1 - Wärtsilä 6L20', title: '4000hr Routine Service',
    description: 'Routine service at 4000 running hours including injector overhaul, filter changes, and valve clearance check.',
    priority: 'medium', status: 'assigned', scheduledDate: '2026-06-25', dueDate: '2026-06-28',
    estimatedHours: 8, assignedTo: ['eng_002'],
    primaryInterval: '4000 HOURS', secondaryInterval: '6 MONTH', lastDoneHours: 16200, nextDueHours: 20200,
    isRiskAssessmentRequired: false, isWorkPermitRequired: false,
    spareParts: [
      { partId: 'sp002', partName: 'Fuel Injector', quantity: 6, unit: 'PCS' },
      { partId: 'sp003', partName: 'Lube Oil Filter', quantity: 3, unit: 'PCS' },
    ],
    defects: [], attachments: [],
  },
  {
    id: 'wo004', workOrderNumber: 'WO-2026-4524', vesselId: 'v004', vesselName: 'MV Southern Cross',
    equipmentId: 'eq008', equipmentName: 'Steering Gear Hydraulic Unit', title: '6 Monthly Routine',
    description: 'Inspection and testing of steering gear hydraulic system per SMS requirements.',
    priority: 'high', status: 'open', scheduledDate: '2026-06-08', dueDate: '2026-06-08',
    estimatedHours: 6, assignedTo: ['eng_004'],
    primaryInterval: '6 MONTH', secondaryInterval: '',
    lastDoneHours: 0, nextDueHours: 0,
    isRiskAssessmentRequired: false, isWorkPermitRequired: false,
    spareParts: [], defects: [], attachments: [],
  },
  {
    id: 'wo005', workOrderNumber: 'WO-2026-4501', vesselId: 'v003', vesselName: 'MV Atlantic Bridge',
    equipmentId: 'eq003', equipmentName: 'Deck Crane No.1', title: '500 HOUR Routine',
    description: 'Lubrication, wire inspection, and load testing per manufacturer schedule.',
    priority: 'low', status: 'completed', scheduledDate: '2026-06-01', dueDate: '2026-06-05',
    completedDate: '2026-06-03', estimatedHours: 4, actualHours: 3.5, assignedTo: ['bos_001'],
    primaryInterval: '500 HOURS', secondaryInterval: '3 MONTH', lastDoneHours: 3500, nextDueHours: 4000,
    isRiskAssessmentRequired: false, isWorkPermitRequired: false,
    spareParts: [], defects: [], attachments: [],
  },
  {
    id: 'wo006', workOrderNumber: 'WO-2026-4525', vesselId: 'v005', vesselName: 'MT Horizon Voyager',
    equipmentId: 'eq009', equipmentName: 'Inert Gas Generator', title: 'Combustion System Check',
    description: 'Pre-departure combustion system verification and O2 analyzer calibration.',
    priority: 'critical', status: 'in_progress', scheduledDate: '2026-06-11', dueDate: '2026-06-11',
    estimatedHours: 3, actualHours: 1, assignedTo: ['eng_005'],
    primaryInterval: 'PRE-VOYAGE', secondaryInterval: '1 MONTH',
    lastDoneHours: 0, nextDueHours: 0,
    isRiskAssessmentRequired: true, isWorkPermitRequired: false,
    spareParts: [], defects: [], attachments: [],
  },
  {
    id: 'wo007', workOrderNumber: 'WO-2026-4526', vesselId: 'v001', vesselName: 'MV Nordic Star',
    equipmentId: 'eq004', equipmentName: 'Boiler Unit 1', title: 'Boiler Tube Inspection',
    description: 'Annual inspection of fire tubes, smoke tubes and refractory.',
    priority: 'medium', status: 'open', scheduledDate: '2026-06-30', dueDate: '2026-07-05',
    estimatedHours: 12, assignedTo: [],
    primaryInterval: '1 YEAR', secondaryInterval: '',
    lastDoneHours: 0, nextDueHours: 0,
    isRiskAssessmentRequired: true, isWorkPermitRequired: true,
    spareParts: [], defects: [], attachments: [],
  },
]

// ─── Equipment ──────────────────────────────────────────────────────
export const equipmentTree: Equipment[] = [
  {
    id: 'eq001', vesselId: 'v001', code: '601.001.01', name: 'Main Engine MAN B&W 6S60MC-C',
    category: 'Propulsion', subCategory: 'Main Engine', manufacturer: 'MAN Energy Solutions',
    model: '6S60MC-C', serialNumber: 'ME-2019-001', installDate: '2019-03-15',
    lastMaintained: '2026-02-20', nextMaintenance: '2026-06-20',
    status: 'operational', healthScore: 87, runningHours: 24156,
    criticalityLevel: 'critical',
    children: [
      {
        id: 'eq001a', vesselId: 'v001', code: '601.001.01.01', name: 'Cylinder Unit 1',
        category: 'Propulsion', subCategory: 'Main Engine Components', manufacturer: 'MAN Energy Solutions',
        model: 'S60MC Cylinder', serialNumber: 'CYL-1-001', installDate: '2019-03-15',
        lastMaintained: '2026-02-20', nextMaintenance: '2026-06-20',
        status: 'operational', healthScore: 85, runningHours: 24156,
        criticalityLevel: 'critical', parentId: 'eq001',
      },
    ],
  },
  {
    id: 'eq002', vesselId: 'v001', code: '602.001.01', name: 'Auxiliary Engine Gen 1 - Wärtsilä 6L20',
    category: 'Power Generation', subCategory: 'Auxiliary Engine', manufacturer: 'Wärtsilä',
    model: '6L20', serialNumber: 'AE-2019-001', installDate: '2019-03-15',
    lastMaintained: '2026-01-10', nextMaintenance: '2026-06-25',
    status: 'operational', healthScore: 92, runningHours: 20156,
    criticalityLevel: 'critical',
  },
  {
    id: 'eq003', vesselId: 'v003', code: '403.01.01', name: 'Deck Crane No.1',
    category: 'Deck Equipment', subCategory: 'Cranes', manufacturer: 'MacGregor',
    model: 'RAM 40T', serialNumber: 'DCR-2021-001', installDate: '2021-05-20',
    lastMaintained: '2026-06-03', nextMaintenance: '2026-09-03',
    status: 'operational', healthScore: 96, runningHours: 3500,
    criticalityLevel: 'essential',
  },
  {
    id: 'eq005', vesselId: 'v002', code: '701.001.01', name: 'Cargo Pump Unit 1',
    category: 'Cargo Systems', subCategory: 'Cargo Pumps', manufacturer: 'Framo',
    model: 'CP1200', serialNumber: 'CP-2017-001', installDate: '2017-08-10',
    lastMaintained: '2025-06-10', nextMaintenance: '2026-06-10',
    status: 'degraded', healthScore: 68, runningHours: 39100,
    criticalityLevel: 'critical',
  },
  {
    id: 'eq008', vesselId: 'v004', code: '403.02.01', name: 'Steering Gear Hydraulic Unit',
    category: 'Navigation', subCategory: 'Steering', manufacturer: 'Rolls-Royce',
    model: 'RAP 145', serialNumber: 'SG-2015-001', installDate: '2015-04-12',
    lastMaintained: '2025-12-10', nextMaintenance: '2026-06-08',
    status: 'degraded', healthScore: 71, runningHours: 48000,
    criticalityLevel: 'critical',
  },
]

// ─── Defects ────────────────────────────────────────────────────────
export const defects: Defect[] = [
  {
    id: 'd001', vesselId: 'v002', equipmentId: 'eq005', reportedBy: 'Chief Engineer Nakamura',
    reportedDate: '2026-06-08', description: 'Cargo pump unit 1 showing abnormal vibration and reduced flow rate during loading operations.',
    priority: 'critical', status: 'in_progress', workOrderId: 'wo002',
  },
  {
    id: 'd002', vesselId: 'v004', equipmentId: 'eq008', reportedBy: 'Master Petrov',
    reportedDate: '2026-06-05', description: 'Steering gear hydraulic pressure fluctuating — loss of 15 bar observed during hardover test.',
    priority: 'high', status: 'investigating',
  },
  {
    id: 'd003', vesselId: 'v001', equipmentId: 'eq002', reportedBy: '2nd Engineer Santos',
    reportedDate: '2026-05-28', description: 'AE Gen 1 fuel rack sticking intermittently causing load fluctuations.',
    priority: 'medium', status: 'open',
  },
]

// ─── Spare Parts ────────────────────────────────────────────────────
export const spareParts: SparePart[] = [
  {
    id: 'sp001', partNumber: 'MAN-CYL-HG-60', name: 'Cylinder Head Gasket', description: 'OEM cylinder head gasket for MAN B&W S60MC',
    category: 'Engine Parts', manufacturer: 'MAN Energy Solutions', compatibleEquipment: ['6S60MC-C', '7S60MC-C'],
    unit: 'PCS', stockLevel: 8, minStockLevel: 6, maxStockLevel: 24, reorderPoint: 8,
    unitCost: 2850, currency: 'USD', location: 'Store Room A-12', leadTimeDays: 45,
    criticality: 'critical', lastOrdered: '2025-11-15', lastReceived: '2026-01-10',
  },
  {
    id: 'sp002', partNumber: 'WAR-INJ-6L20', name: 'Fuel Injector Assembly', description: 'Fuel injector for Wärtsilä 6L20 auxiliary engine',
    category: 'Engine Parts', manufacturer: 'Wärtsilä', compatibleEquipment: ['6L20', '8L20'],
    unit: 'PCS', stockLevel: 3, minStockLevel: 6, maxStockLevel: 18, reorderPoint: 6,
    unitCost: 4200, currency: 'USD', location: 'Store Room A-15', leadTimeDays: 60,
    criticality: 'critical', lastOrdered: '2025-08-20', lastReceived: '2025-10-05',
  },
  {
    id: 'sp003', partNumber: 'HY-SEAL-RAP145', name: 'Hydraulic Seal Kit', description: 'Complete seal kit for Rolls-Royce RAP 145 steering gear',
    category: 'Deck Machinery', manufacturer: 'Rolls-Royce', compatibleEquipment: ['RAP 145', 'RAP 165'],
    unit: 'SET', stockLevel: 0, minStockLevel: 2, maxStockLevel: 6, reorderPoint: 2,
    unitCost: 1850, currency: 'USD', location: 'Store Room B-04', leadTimeDays: 30,
    criticality: 'critical', lastOrdered: '2025-09-10', lastReceived: '2025-10-01',
  },
  {
    id: 'sp004', partNumber: 'FRA-CP1200-IMP', name: 'Cargo Pump Impeller', description: 'Replacement impeller for Framo CP1200 cargo pump',
    category: 'Cargo Equipment', manufacturer: 'Framo', compatibleEquipment: ['CP1200', 'CP1400'],
    unit: 'PCS', stockLevel: 1, minStockLevel: 2, maxStockLevel: 4, reorderPoint: 2,
    unitCost: 8500, currency: 'USD', location: 'Engine Room Store', leadTimeDays: 90,
    criticality: 'critical', lastOrdered: '2025-12-05', lastReceived: '2026-03-20',
  },
  {
    id: 'sp005', partNumber: 'GEN-LUBE-OIL-20W40', name: 'Lube Oil 20W40 Marine', description: 'System 4 cylinder lube oil, 20W40',
    category: 'Consumables', manufacturer: 'Shell', compatibleEquipment: ['All 4-stroke engines'],
    unit: 'LTR', stockLevel: 850, minStockLevel: 500, maxStockLevel: 2000, reorderPoint: 600,
    unitCost: 4.20, currency: 'USD', location: 'Lube Oil Store', leadTimeDays: 7,
    criticality: 'essential', lastOrdered: '2026-05-15', lastReceived: '2026-05-25',
  },
  {
    id: 'sp006', partNumber: 'AIR-FILT-COMP-01', name: 'Air Filter Main Engine Turbocharger', description: 'Air filter element for main engine TC',
    category: 'Filters', manufacturer: 'MAN Energy Solutions', compatibleEquipment: ['6S60MC-C'],
    unit: 'PCS', stockLevel: 4, minStockLevel: 4, maxStockLevel: 12, reorderPoint: 4,
    unitCost: 320, currency: 'USD', location: 'Store Room A-08', leadTimeDays: 21,
    criticality: 'essential', lastOrdered: '2026-03-10', lastReceived: '2026-04-01',
  },
]

// ─── Purchase Orders ─────────────────────────────────────────────────
export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'po001', poNumber: 'PO-2026-1142', vendorId: 'ven001', vendorName: 'MAN Energy Solutions GmbH',
    vesselId: 'v001', vesselName: 'MV Nordic Star', status: 'po_issued',
    issueDate: '2026-06-01', expectedDelivery: '2026-07-15',
    items: [{ id: 'poi001', partNumber: 'MAN-CYL-HG-60', description: 'Cylinder Head Gasket', quantity: 12, unit: 'PCS', unitPrice: 2850, totalPrice: 34200 }],
    totalAmount: 34200, currency: 'USD', paymentTerms: 'Net 30', deliveryPort: 'Rotterdam',
  },
  {
    id: 'po002', poNumber: 'PO-2026-1143', vendorId: 'ven002', vendorName: 'Framo AS',
    vesselId: 'v002', vesselName: 'MT Pacific Endeavour', status: 'rfq_sent',
    issueDate: '2026-06-05', expectedDelivery: '2026-09-10',
    items: [{ id: 'poi002', partNumber: 'FRA-CP1200-IMP', description: 'Cargo Pump Impeller CP1200', quantity: 2, unit: 'PCS', unitPrice: 8500, totalPrice: 17000 }],
    totalAmount: 17000, currency: 'USD', paymentTerms: 'Net 60', deliveryPort: 'Antwerp',
  },
  {
    id: 'po003', poNumber: 'PO-2026-1144', vendorId: 'ven003', vendorName: 'Wärtsilä Corporation',
    vesselId: 'v001', vesselName: 'MV Nordic Star', status: 'vendor_review',
    issueDate: '2026-06-03', expectedDelivery: '2026-08-05',
    items: [{ id: 'poi003', partNumber: 'WAR-INJ-6L20', description: 'Fuel Injector Assembly 6L20', quantity: 12, unit: 'PCS', unitPrice: 4200, totalPrice: 50400 }],
    totalAmount: 50400, currency: 'USD', paymentTerms: 'Net 45', deliveryPort: 'Hamburg',
  },
]

// ─── Requisitions ───────────────────────────────────────────────────
export const requisitions: Requisition[] = [
  {
    id: 'req001', requisitionNumber: 'REQ-2026-5521', vesselId: 'v004', vesselName: 'MV Southern Cross',
    requestedBy: 'Chief Engineer Kowalski', requestedDate: '2026-06-08', requiredDate: '2026-06-15',
    status: 'pending_approval', priority: 'urgent',
    items: [
      { id: 'ri001', partId: 'sp003', partName: 'Hydraulic Seal Kit RAP 145', partNumber: 'HY-SEAL-RAP145', quantity: 2, unit: 'SET', estimatedUnitCost: 1850, purpose: 'Steering gear repair — urgent operational requirement' },
    ],
    totalAmount: 3700, currency: 'USD', comments: 'Urgent — steering gear inoperable without this repair.',
  },
  {
    id: 'req002', requisitionNumber: 'REQ-2026-5522', vesselId: 'v005', vesselName: 'MT Horizon Voyager',
    requestedBy: '2nd Engineer Hassan', requestedDate: '2026-06-07', requiredDate: '2026-06-30',
    status: 'approved', priority: 'normal',
    items: [
      { id: 'ri002', partId: 'sp005', partName: 'Lube Oil 20W40 Marine', partNumber: 'GEN-LUBE-OIL-20W40', quantity: 1000, unit: 'LTR', estimatedUnitCost: 4.20, purpose: 'Planned consumption for next voyage' },
    ],
    totalAmount: 4200, currency: 'USD', approvedBy: 'Fleet Technical Manager', approvedDate: '2026-06-08',
    comments: 'Approved for local procurement at Fujairah.',
  },
]

// ─── Vendors ────────────────────────────────────────────────────────
export const vendors: Vendor[] = [
  { id: 'ven001', name: 'MAN Energy Solutions GmbH', code: 'MAN-DE-001', country: 'Germany', email: 'marine@man-es.com', phone: '+49 89 360 900', category: ['Engine Parts', 'Technical Services'], rating: 4.8, status: 'approved', totalOrders: 145, onTimeDeliveryRate: 94 },
  { id: 'ven002', name: 'Framo AS', code: 'FRA-NO-001', country: 'Norway', email: 'spares@framo.no', phone: '+47 56 34 36 00', category: ['Cargo Equipment', 'Pumps'], rating: 4.6, status: 'approved', totalOrders: 89, onTimeDeliveryRate: 88 },
  { id: 'ven003', name: 'Wärtsilä Corporation', code: 'WAR-FI-001', country: 'Finland', email: 'spares@wartsila.com', phone: '+358 10 709 0000', category: ['Engine Parts', 'Propulsion'], rating: 4.7, status: 'approved', totalOrders: 201, onTimeDeliveryRate: 91 },
  { id: 'ven004', name: 'Rolls-Royce Marine', code: 'RRM-UK-001', country: 'United Kingdom', email: 'marine.spares@rolls-royce.com', phone: '+44 1332 242424', category: ['Steering', 'Deck Machinery'], rating: 4.5, status: 'approved', totalOrders: 67, onTimeDeliveryRate: 86 },
]

// ─── Crew Members ───────────────────────────────────────────────────
export const crewMembers: CrewMember[] = [
  {
    id: 'cr001', employeeId: 'EMP-4521', firstName: 'Alexei', lastName: 'Petrov', nationality: 'Russian',
    dateOfBirth: '1975-03-12', rank: 'master', vesselId: 'v001', vesselName: 'MV Nordic Star',
    status: 'onboard', signOnDate: '2026-04-15', signOffDate: '2026-10-15',
    email: 'a.petrov@oceansphere.com', phone: '+7 921 555 1234',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexei',
    medicalExpiry: '2026-08-15', passportExpiry: '2028-03-12', seafarerBookExpiry: '2027-03-12',
    emergencyContact: { name: 'Natasha Petrova', relationship: 'Spouse', phone: '+7 921 555 5678', address: 'St. Petersburg, Russia' },
    certificates: [
      { id: 'cert001', type: 'Master Mariner STCW II/2', category: 'stcw', issueDate: '2020-06-10', expiryDate: '2025-06-10', issuingAuthority: 'Russian Register of Shipping', certificateNumber: 'RUS-MM-2020-4521', status: 'expired' },
      { id: 'cert002', type: 'GMDSS GOC', category: 'stcw', issueDate: '2021-09-15', expiryDate: '2026-09-15', issuingAuthority: 'Russian Register of Shipping', certificateNumber: 'RUS-GMDSS-2021-4521', status: 'valid' },
      { id: 'cert003', type: 'Medical Certificate ENG1', category: 'medical', issueDate: '2024-08-15', expiryDate: '2026-08-15', issuingAuthority: 'IMO Approved Doctor', certificateNumber: 'MED-2024-4521', status: 'expiring_soon' },
    ],
    seaService: [
      { id: 'ss001', vesselName: 'MV Baltic Carrier', vesselType: 'bulk_carrier', rank: 'master', signOnDate: '2024-10-01', signOffDate: '2026-04-15', portOfEngagement: 'Rotterdam', portOfDischarge: 'Singapore', totalDays: 562 },
    ],
  },
  {
    id: 'cr002', employeeId: 'EMP-4522', firstName: 'Hiroshi', lastName: 'Nakamura', nationality: 'Japanese',
    dateOfBirth: '1980-07-22', rank: 'chief_engineer', vesselId: 'v002', vesselName: 'MT Pacific Endeavour',
    status: 'onboard', signOnDate: '2026-02-01', signOffDate: '2026-08-01',
    email: 'h.nakamura@oceansphere.com', phone: '+81 3 555 2345',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi',
    medicalExpiry: '2027-02-01', passportExpiry: '2029-07-22', seafarerBookExpiry: '2028-07-22',
    emergencyContact: { name: 'Yuki Nakamura', relationship: 'Spouse', phone: '+81 3 555 6789', address: 'Yokohama, Japan' },
    certificates: [
      { id: 'cert004', type: 'Chief Engineer STCW III/2', category: 'stcw', issueDate: '2022-01-20', expiryDate: '2027-01-20', issuingAuthority: 'Japan Coast Guard', certificateNumber: 'JPN-CE-2022-4522', status: 'valid' },
    ],
    seaService: [],
  },
  {
    id: 'cr003', employeeId: 'EMP-4523', firstName: 'Carlos', lastName: 'Santos', nationality: 'Filipino',
    dateOfBirth: '1988-11-03', rank: 'second_engineer', vesselId: 'v001', vesselName: 'MV Nordic Star',
    status: 'onboard', signOnDate: '2026-05-01', signOffDate: '2026-11-01',
    email: 'c.santos@oceansphere.com', phone: '+63 2 555 3456',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    medicalExpiry: '2027-05-01', passportExpiry: '2027-11-03', seafarerBookExpiry: '2026-07-15',
    emergencyContact: { name: 'Maria Santos', relationship: 'Spouse', phone: '+63 2 555 7890', address: 'Manila, Philippines' },
    certificates: [
      { id: 'cert005', type: 'Officer of the Watch III/1', category: 'stcw', issueDate: '2022-11-03', expiryDate: '2027-11-03', issuingAuthority: 'MARINA Philippines', certificateNumber: 'PHL-OW-2022-4523', status: 'valid' },
      { id: 'cert006', type: 'Seafarer Book', category: 'flag_state', issueDate: '2021-07-15', expiryDate: '2026-07-15', issuingAuthority: 'MARINA Philippines', certificateNumber: 'SB-2021-4523', status: 'expiring_soon' },
    ],
    seaService: [],
  },
  {
    id: 'cr004', employeeId: 'EMP-4524', firstName: 'Kwame', lastName: 'Mensah', nationality: 'Ghanaian',
    dateOfBirth: '1985-04-17', rank: 'chief_officer', vesselId: 'v003', vesselName: 'MV Atlantic Bridge',
    status: 'onboard', signOnDate: '2026-03-20', signOffDate: '2026-09-20',
    email: 'k.mensah@oceansphere.com', phone: '+233 30 555 4567',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
    medicalExpiry: '2027-12-01', passportExpiry: '2027-04-17', seafarerBookExpiry: '2028-04-17',
    emergencyContact: { name: 'Abena Mensah', relationship: 'Spouse', phone: '+233 30 555 8901', address: 'Accra, Ghana' },
    certificates: [
      { id: 'cert007', type: 'Chief Officer STCW II/2', category: 'stcw', issueDate: '2023-04-17', expiryDate: '2028-04-17', issuingAuthority: 'Ghana Maritime Authority', certificateNumber: 'GHA-CO-2023-4524', status: 'valid' },
    ],
    seaService: [],
  },
  {
    id: 'cr005', employeeId: 'EMP-4525', firstName: 'Dmitri', lastName: 'Volkov', nationality: 'Ukrainian',
    dateOfBirth: '1990-09-25', rank: 'second_officer',
    status: 'on_leave', email: 'd.volkov@oceansphere.com', phone: '+380 44 555 5678',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitri',
    medicalExpiry: '2026-06-30', passportExpiry: '2026-09-25', seafarerBookExpiry: '2028-09-25',
    emergencyContact: { name: 'Olena Volkova', relationship: 'Spouse', phone: '+380 44 555 9012', address: 'Kyiv, Ukraine' },
    certificates: [
      { id: 'cert008', type: 'Medical Certificate ENG1', category: 'medical', issueDate: '2024-06-30', expiryDate: '2026-06-30', issuingAuthority: 'Ukrainian MCC', certificateNumber: 'MED-2024-4525', status: 'expiring_soon' },
    ],
    seaService: [],
  },
  {
    id: 'cr006', employeeId: 'EMP-4526', firstName: 'Ananya', lastName: 'Sharma', nationality: 'Indian',
    dateOfBirth: '1992-12-08', rank: 'third_engineer', vesselId: 'v005', vesselName: 'MT Horizon Voyager',
    status: 'onboard', signOnDate: '2026-04-01', signOffDate: '2026-10-01',
    email: 'a.sharma@oceansphere.com', phone: '+91 22 555 6789',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    medicalExpiry: '2027-09-08', passportExpiry: '2030-12-08', seafarerBookExpiry: '2029-12-08',
    emergencyContact: { name: 'Raj Sharma', relationship: 'Father', phone: '+91 22 555 0123', address: 'Mumbai, India' },
    certificates: [],
    seaService: [],
  },
]

// ─── Crew Rotations ─────────────────────────────────────────────────
export const crewRotations: CrewRotation[] = [
  { id: 'rot001', vesselId: 'v001', vesselName: 'MV Nordic Star', rank: 'master', incumbentId: 'cr001', incumbentName: 'Capt. Alexei Petrov', reliefId: 'cr007', reliefName: 'Capt. James Mitchell', signOffDate: '2026-10-15', signOnDate: '2026-10-14', status: 'planned', port: 'Rotterdam' },
  { id: 'rot002', vesselId: 'v002', vesselName: 'MT Pacific Endeavour', rank: 'chief_engineer', incumbentId: 'cr002', incumbentName: 'CE Hiroshi Nakamura', reliefId: 'cr008', reliefName: 'CE Viktor Ivanenko', signOffDate: '2026-08-01', signOnDate: '2026-07-31', status: 'confirmed', port: 'Antwerp' },
  { id: 'rot003', vesselId: 'v001', vesselName: 'MV Nordic Star', rank: 'second_engineer', incumbentId: 'cr003', incumbentName: '2/E Carlos Santos', reliefId: 'cr009', reliefName: '2/E Abdullah Al-Rashid', signOffDate: '2026-11-01', signOnDate: '2026-10-30', status: 'planned', port: 'Hamburg' },
]

// ─── Vessel Certificates ────────────────────────────────────────────
export const vesselCertificates: VesselCertificate[] = [
  { id: 'vc001', vesselId: 'v001', type: 'Safety Management Certificate (SMC)', category: 'safety', issuedBy: 'DNV GL', issueDate: '2023-05-10', expiryDate: '2028-05-10', lastSurveyDate: '2023-05-10', nextSurveyDate: '2025-05-10', status: 'compliant', remarks: '' },
  { id: 'vc002', vesselId: 'v001', type: 'International Load Line Certificate', category: 'safety', issuedBy: 'DNV GL', issueDate: '2022-03-15', expiryDate: '2027-03-15', lastSurveyDate: '2025-03-15', nextSurveyDate: '2026-03-15', status: 'compliant', remarks: '' },
  { id: 'vc003', vesselId: 'v002', type: 'International Oil Pollution Prevention Certificate (IOPP)', category: 'environmental', issuedBy: "Lloyd's Register", issueDate: '2022-08-20', expiryDate: '2027-08-20', lastSurveyDate: '2022-08-20', nextSurveyDate: '2024-08-20', status: 'non_compliant', remarks: 'Annual survey overdue — action required' },
  { id: 'vc004', vesselId: 'v003', type: 'Safety Equipment Certificate', category: 'safety', issuedBy: 'Bureau Veritas', issueDate: '2024-11-01', expiryDate: '2026-11-01', lastSurveyDate: '2024-11-01', nextSurveyDate: '2025-11-01', status: 'compliant', remarks: '' },
  { id: 'vc005', vesselId: 'v004', type: 'Document of Compliance (DOC)', category: 'safety', issuedBy: 'ClassNK', issueDate: '2021-04-12', expiryDate: '2026-04-12', lastSurveyDate: '2024-04-12', nextSurveyDate: '2025-04-12', status: 'expired', remarks: 'URGENT: Certificate expired — contact class surveyor' },
]

// ─── Incidents ──────────────────────────────────────────────────────
export const incidents: Incident[] = [
  {
    id: 'inc001', incidentNumber: 'INC-2026-0042', vesselId: 'v002', vesselName: 'MT Pacific Endeavour',
    type: 'near_miss', severity: 'minor', date: '2026-06-04', location: 'Engine Room',
    description: 'Hot work near fuel tank without proper ventilation — permit void discovered.',
    rootCause: 'Procedural non-compliance — permit system bypass',
    status: 'corrective_action', reportedBy: 'Chief Officer Williams',
    correctiveActions: [
      { id: 'ca001', description: 'Mandatory hot work permit refresher training for all crew', responsible: 'Master', targetDate: '2026-06-20', status: 'in_progress' },
      { id: 'ca002', description: 'Update company SMS hot work procedure', responsible: 'Fleet HSE Manager', targetDate: '2026-06-30', status: 'open' },
    ],
  },
  {
    id: 'inc002', incidentNumber: 'INC-2026-0041', vesselId: 'v004', vesselName: 'MV Southern Cross',
    type: 'property_damage', severity: 'minor', date: '2026-05-28', location: 'Deck',
    description: 'Minor mooring wire parted during port operations — no injuries.',
    rootCause: 'Wire fatigue — exceeded replacement intervals',
    status: 'closed', reportedBy: 'Chief Officer Park',
    correctiveActions: [{ id: 'ca003', description: 'Replace all mooring wires per maintenance schedule', responsible: 'Chief Officer', targetDate: '2026-06-10', completedDate: '2026-06-08', status: 'completed' }],
  },
]

// ─── Audits ─────────────────────────────────────────────────────────
export const audits: Audit[] = [
  {
    id: 'aud001', vesselId: 'v001', vesselName: 'MV Nordic Star', type: 'ism', auditor: 'DNV GL Surveyor',
    scheduledDate: '2026-07-15', status: 'scheduled',
    findings: [], grade: undefined,
  },
  {
    id: 'aud002', vesselId: 'v002', vesselName: 'MT Pacific Endeavour', type: 'port_state_control', auditor: 'Paris MOU Inspector',
    scheduledDate: '2026-06-12', status: 'in_progress',
    findings: [
      { id: 'af001', type: 'deficiency', description: 'IOPP Certificate annual survey overdue', regulation: 'MARPOL 73/78 Annex I Reg 5', status: 'open' },
      { id: 'af002', type: 'observation', description: 'Bridge team management procedures not fully documented', regulation: 'STCW A-VIII/2', status: 'responded' },
    ],
    grade: 'minor_findings',
  },
  {
    id: 'aud003', vesselId: 'v003', vesselName: 'MV Atlantic Bridge', type: 'internal', auditor: 'DPA Internal Team',
    scheduledDate: '2026-05-20', completedDate: '2026-05-22', status: 'completed',
    findings: [], grade: 'satisfactory',
  },
]

// ─── AI Insights ────────────────────────────────────────────────────
export const aiInsights: AIInsight[] = [
  {
    id: 'ai001', type: 'maintenance', severity: 'critical', category: 'Predictive Maintenance',
    title: 'Main Engine Top Overhaul Due in 7 Days', description: 'MV Nordic Star main engine is approaching its 3000-hour interval. Running hours at 24,156 — projected overdue by June 20.',
    vesselId: 'v001', vesselName: 'MV Nordic Star',
    recommendation: 'Schedule 72-hour maintenance window at Rotterdam port call. Pre-position spare parts (gaskets in stock).',
    estimatedSaving: '$180,000 in unplanned downtime prevention', confidence: 94, timestamp: '2026-06-10T06:00:00Z',
  },
  {
    id: 'ai002', type: 'fuel', severity: 'warning', category: 'Fuel Analytics',
    title: 'Fuel Consumption Anomaly Detected', description: 'MT Horizon Voyager is consuming 8.2% more fuel than fleet benchmark for this voyage profile. Possible hull fouling or propeller pitch issue.',
    vesselId: 'v005', vesselName: 'MT Horizon Voyager',
    recommendation: 'Schedule underwater inspection at Fujairah. Consider propeller pitch optimization.',
    estimatedSaving: '$42,000 per month', confidence: 87, timestamp: '2026-06-10T05:30:00Z',
  },
  {
    id: 'ai003', type: 'crew', severity: 'warning', category: 'Crew Management',
    title: '3 Critical Certificates Expiring This Month', description: 'Capt. Petrov (Master Mariner), 2/E Santos (Seafarer Book), and 2/O Volkov (Medical) certificates expire before end of June.',
    recommendation: 'Initiate certificate renewal processes immediately. Volkov medical — arrange shore leave for medical examination.',
    confidence: 99, timestamp: '2026-06-10T04:00:00Z',
  },
  {
    id: 'ai004', type: 'inventory', severity: 'warning', category: 'Inventory',
    title: 'Critical Spares Below Minimum Stock Level', description: 'Hydraulic Seal Kit RAP145 (stock: 0), Fuel Injector 6L20 (stock: 3, min: 6) are below minimum levels.',
    recommendation: 'Emergency procurement for RAP145 seal kit — currently 0 stock and MV Southern Cross requires for urgent steering gear repair.',
    confidence: 100, timestamp: '2026-06-10T03:00:00Z',
  },
  {
    id: 'ai005', type: 'compliance', severity: 'critical', category: 'Compliance',
    title: 'MV Southern Cross DOC Certificate Expired', description: 'Document of Compliance for MV Southern Cross expired April 2026. Vessel cannot legally operate without valid DOC.',
    vesselId: 'v004', vesselName: 'MV Southern Cross',
    recommendation: 'Immediate contact with ClassNK for emergency survey. Vessel to remain in port until certificate reinstated.',
    confidence: 100, timestamp: '2026-06-10T02:00:00Z',
  },
  {
    id: 'ai006', type: 'performance', severity: 'info', category: 'Performance',
    title: 'MV Atlantic Bridge Fleet Performance Leader', description: 'MV Atlantic Bridge achieved 97/100 health score this quarter — best in fleet. Speed efficiency at 93%.',
    vesselId: 'v003', vesselName: 'MV Atlantic Bridge',
    recommendation: 'Apply Atlantic Bridge maintenance model as fleet benchmark. Share CE Li Wei best practices.',
    confidence: 92, timestamp: '2026-06-10T01:00:00Z',
  },
]

// ─── Alerts ─────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id: 'al001', type: 'critical', category: 'compliance', title: 'DOC Certificate Expired — MV Southern Cross', description: 'Document of Compliance expired April 12, 2026. Immediate action required.', vesselId: 'v004', vesselName: 'MV Southern Cross', timestamp: '2026-06-10T02:00:00Z', acknowledged: false },
  { id: 'al002', type: 'critical', category: 'maintenance', title: 'Steering Gear Failure — MV Southern Cross', description: 'Steering gear hydraulic pressure below safe operating limits. Port operation restricted.', vesselId: 'v004', vesselName: 'MV Southern Cross', timestamp: '2026-06-10T01:30:00Z', acknowledged: false },
  { id: 'al003', type: 'warning', category: 'maintenance', title: 'Cargo Pump Overdue Maintenance — MT Pacific Endeavour', description: 'Cargo Pump Unit 1 annual inspection 3 days overdue.', vesselId: 'v002', vesselName: 'MT Pacific Endeavour', timestamp: '2026-06-10T00:00:00Z', acknowledged: false },
  { id: 'al004', type: 'warning', category: 'crew', title: 'Certificate Expiry — Capt. Petrov (Master Mariner)', description: 'Master Mariner certificate expired June 10, 2025. Renewal required.', vesselId: 'v001', vesselName: 'MV Nordic Star', timestamp: '2026-06-09T20:00:00Z', acknowledged: true },
  { id: 'al005', type: 'warning', category: 'inventory', title: 'Zero Stock — Hydraulic Seal Kit RAP145', description: 'Critical spare at zero stock level. Required for MV Southern Cross urgent repair.', timestamp: '2026-06-09T18:00:00Z', acknowledged: false },
  { id: 'al006', type: 'warning', category: 'compliance', title: 'IOPP Annual Survey Overdue — MT Pacific Endeavour', description: 'IOPP Certificate annual survey is 6 months overdue. PSC risk high.', vesselId: 'v002', vesselName: 'MT Pacific Endeavour', timestamp: '2026-06-09T16:00:00Z', acknowledged: false },
]

// ─── Dashboard KPIs ──────────────────────────────────────────────────
export const dashboardKPI: DashboardKPI = {
  totalVessels: 7,
  atSea: 4,
  inPort: 1,
  underMaintenance: 1,
  dryDock: 1,
  fleetHealthScore: 81,
  maintenanceCompliance: 78,
  overdueJobs: 3,
  upcomingJobs: 14,
  totalCrew: 154,
  expiringCertificates: 8,
  criticalAlerts: 4,
  fuelConsumptionMTD: 4820,
  fuelConsumptionTarget: 5200,
  pendingRequisitions: 6,
  openPOs: 12,
}

// ─── Fuel Trends ─────────────────────────────────────────────────────
export const fuelTrends: FuelTrend[] = [
  { date: 'Jan', actual: 4950, target: 5200 }, { date: 'Feb', actual: 5100, target: 5200 },
  { date: 'Mar', actual: 4870, target: 5200 }, { date: 'Apr', actual: 5320, target: 5200 },
  { date: 'May', actual: 4990, target: 5200 }, { date: 'Jun', actual: 4820, target: 5200 },
]

export const weeklyFuelData = [
  { day: 'Mon', consumption: 720 }, { day: 'Tue', consumption: 695 }, { day: 'Wed', consumption: 745 },
  { day: 'Thu', consumption: 710 }, { day: 'Fri', consumption: 680 }, { day: 'Sat', consumption: 635 },
  { day: 'Sun', consumption: 635 },
]

export const complianceScores = [
  { category: 'ISM', score: 92, total: 100, status: 'good' as const },
  { category: 'ISPS', score: 88, total: 100, status: 'good' as const },
  { category: 'MARPOL', score: 74, total: 100, status: 'fair' as const },
  { category: 'MLC', score: 95, total: 100, status: 'good' as const },
  { category: 'Flag State', score: 68, total: 100, status: 'fair' as const },
  { category: 'Class', score: 82, total: 100, status: 'good' as const },
]
