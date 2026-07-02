import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LogsPortal from './pages/LogsPortal'
import AiAgents from './pages/AiAgents'
import ThreatAnalytics from './pages/ThreatAnalytics'
import LiveMonitoring from './pages/LiveMonitoring'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<LogsPortal />} />
        <Route path="/agents" element={<AiAgents />} />
        <Route path="/analytics" element={<ThreatAnalytics />} />
        <Route path="/monitoring" element={<LiveMonitoring />} />
      </Routes>
    </Router>
  )
}

export default App
