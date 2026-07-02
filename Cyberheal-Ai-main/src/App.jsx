import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LogsPortal from './pages/LogsPortal'
import AiAgents from './pages/AiAgents'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<LogsPortal />} />
        <Route path="/agents" element={<AiAgents />} />
      </Routes>
    </Router>
  )
}

export default App
