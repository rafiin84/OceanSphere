import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { FleetOperations } from './pages/FleetOperations'
import { Maintenance } from './pages/Maintenance'
import { Procurement } from './pages/Procurement'
import { Inventory } from './pages/Inventory'
import { Crewing } from './pages/Crewing'
import { Compliance } from './pages/Compliance'
import { AICopilot } from './pages/AICopilot'
import { SettingsPage } from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="fleet/*" element={<FleetOperations />} />
        <Route path="maintenance/*" element={<Maintenance />} />
        <Route path="procurement/*" element={<Procurement />} />
        <Route path="inventory/*" element={<Inventory />} />
        <Route path="crewing/*" element={<Crewing />} />
        <Route path="compliance/*" element={<Compliance />} />
        <Route path="ai-copilot" element={<AICopilot />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
