import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LogsPortal from './pages/LogsPortal'
import AiAgents from './pages/AiAgents'
import ThreatAnalytics from './pages/ThreatAnalytics'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<LogsPortal />} />
        <Route path="/agents" element={<AiAgents />} />
        <Route path="/analytics" element={<ThreatAnalytics />} />
      </Routes>
    </Router>
  )
}

export default App
