import { create } from 'zustand'
import type { Vessel, Alert, AIInsight } from '../types'
import { vessels as mockVessels, alerts as mockAlerts, aiInsights as mockInsights } from '../data/mockData'

interface AppState {
  // UI
  sidebarCollapsed: boolean
  darkMode: boolean
  selectedVesselId: string | null
  activeFleet: string

  // Data
  vessels: Vessel[]
  alerts: Alert[]
  insights: AIInsight[]
  unreadAlerts: number

  // Actions
  toggleSidebar: () => void
  toggleDarkMode: () => void
  selectVessel: (id: string | null) => void
  acknowledgeAlert: (id: string) => void
  setActiveFleet: (fleet: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: false,
  darkMode: false,
  selectedVesselId: null,
  activeFleet: 'All Vessels',
  vessels: mockVessels,
  alerts: mockAlerts,
  insights: mockInsights,
  unreadAlerts: mockAlerts.filter(a => !a.acknowledged).length,

  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  toggleDarkMode: () => {
    const next = !get().darkMode
    set({ darkMode: next })
    document.documentElement.classList.toggle('dark', next)
  },

  selectVessel: (id) => set({ selectedVesselId: id }),

  acknowledgeAlert: (id) => set(state => {
    const alerts = state.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
    return { alerts, unreadAlerts: alerts.filter(a => !a.acknowledged).length }
  }),

  setActiveFleet: (fleet) => set({ activeFleet: fleet }),
}))
