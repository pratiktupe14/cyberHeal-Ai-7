import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LogsPortal from './pages/LogsPortal'
import IncidentManagement from './pages/IncidentManagement'
import AiAgents from './pages/AiAgents'
import ThreatAnalytics from './pages/ThreatAnalytics'
import LiveMonitoring from './pages/LiveMonitoring'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<LogsPortal />} />
        <Route path="/incidents" element={<IncidentManagement />} />
        <Route path="/agents" element={<AiAgents />} />
        <Route path="/analytics" element={<ThreatAnalytics />} />
        <Route path="/monitoring" element={<LiveMonitoring />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
