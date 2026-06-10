import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    at_sea: 'text-ocean-600 bg-ocean-50 border-ocean-200',
    in_port: 'text-teal-700 bg-teal-50 border-teal-200',
    under_maintenance: 'text-amber-700 bg-amber-50 border-amber-200',
    dry_dock: 'text-purple-700 bg-purple-50 border-purple-200',
    idle: 'text-gray-600 bg-gray-50 border-gray-200',
    operational: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    degraded: 'text-amber-700 bg-amber-50 border-amber-200',
    failed: 'text-red-700 bg-red-50 border-red-200',
    good: 'text-emerald-700',
    fair: 'text-amber-700',
    critical: 'text-red-700',
    open: 'text-orange-700 bg-orange-50 border-orange-200',
    in_progress: 'text-ocean-700 bg-ocean-50 border-ocean-200',
    completed: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    compliant: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    non_compliant: 'text-red-700 bg-red-50 border-red-200',
    expired: 'text-red-700 bg-red-50 border-red-200',
    valid: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    expiring_soon: 'text-amber-700 bg-amber-50 border-amber-200',
    onboard: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    on_leave: 'text-blue-700 bg-blue-50 border-blue-200',
    available: 'text-teal-700 bg-teal-50 border-teal-200',
  }
  return map[status] ?? 'text-gray-600 bg-gray-50 border-gray-200'
}

export function getStatusLabel(status: string): string {
  return status
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function getVesselTypeLabel(type: string): string {
  const map: Record<string, string> = {
    bulk_carrier: 'Bulk Carrier', tanker: 'Tanker', container: 'Container Ship',
    ro_ro: 'Ro-Ro', passenger: 'Passenger', offshore: 'Offshore Vessel',
    ferry: 'Ferry', general_cargo: 'General Cargo',
  }
  return map[type] ?? type
}

export function getHealthColor(score: number): string {
  if (score >= 85) return 'text-emerald-600'
  if (score >= 70) return 'text-amber-600'
  return 'text-red-600'
}

export function getHealthBg(score: number): string {
  if (score >= 85) return 'bg-emerald-500'
  if (score >= 70) return 'bg-amber-500'
  return 'bg-red-500'
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    critical: 'text-red-700 bg-red-50 border-red-200',
    high: 'text-orange-700 bg-orange-50 border-orange-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-gray-600 bg-gray-50 border-gray-200',
  }
  return map[priority] ?? 'text-gray-600 bg-gray-50 border-gray-200'
}

export function getRankLabel(rank: string): string {
  const map: Record<string, string> = {
    master: 'Master (Captain)', chief_officer: 'Chief Officer', second_officer: '2nd Officer',
    third_officer: '3rd Officer', chief_engineer: 'Chief Engineer', second_engineer: '2nd Engineer',
    third_engineer: '3rd Engineer', fourth_engineer: '4th Engineer', bosun: 'Bosun',
    ab_seaman: 'AB Seaman', oiler: 'Oiler', cook: 'Cook', cadet: 'Cadet',
    electrician: 'Electro-Technical Officer',
  }
  return map[rank] ?? rank
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
