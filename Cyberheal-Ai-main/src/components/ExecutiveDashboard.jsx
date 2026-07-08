import React from 'react';
import { useExecutiveDashboard, useMonitorState, useGlobalAgentState } from '../api';
import './ExecutiveDashboard.css';

const ExecutiveDashboard = () => {
  const { executiveData } = useExecutiveDashboard();
  const { monitorState } = useMonitorState();
  const { globalState } = useGlobalAgentState();

  if (!executiveData) {
    return <div className="loading-state">Initializing Executive Telemetry...</div>;
  }

  const {
    global_security_score,
    compliance_status,
    active_incidents,
    critical_threats,
    sla,
    mitre_tactics,
    threat_intel_feed
  } = executiveData;

  // Calculate infrastructure health from MonitorAgent if available
  const infraStatus = monitorState?.overall_status || 'HEALTHY';
  
  // Calculate AI health
  const totalAgents = globalState ? Object.keys(globalState).length : 17;
  const activeAgents = globalState ? Object.values(globalState).filter(a => a.status === 'Active' || a.status === 'Idle').length : 17;

  return (
    <div className="executive-dashboard">
      <header className="exec-header">
        <h1>Executive SOC Overview</h1>
        <div className="status-badges">
          <span className={`badge ${infraStatus === 'HEALTHY' ? 'success' : 'danger'}`}>
            INFRA: {infraStatus}
          </span>
          <span className={`badge ${compliance_status === 'Compliant' ? 'success' : 'warning'}`}>
            COMPLIANCE: {compliance_status.toUpperCase()}
          </span>
          <span className="badge info">AI AGENTS: {activeAgents}/{totalAgents} ONLINE</span>
        </div>
      </header>

      <div className="exec-grid">
        {/* KPI Row */}
        <div className="exec-card score-card">
          <h3>Global Security Score</h3>
          <div className={`score-value ${global_security_score < 50 ? 'danger-text' : global_security_score < 80 ? 'warning-text' : 'success-text'}`}>
            {global_security_score}
          </div>
          <p>Risk Heatmap: {global_security_score < 50 ? 'High Risk' : global_security_score < 80 ? 'Elevated' : 'Low Risk'}</p>
        </div>

        <div className="exec-card">
          <h3>Active Incidents</h3>
          <div className="metric-value">{active_incidents}</div>
          <p className="danger-text">{critical_threats} Critical Threats</p>
        </div>

        <div className="exec-card">
          <h3>SLA & Response Metrics</h3>
          <div className="sla-stats">
            <div>
              <span className="sla-label">Avg Response:</span>
              <span className="sla-value">{sla.response_time_ms}ms</span>
            </div>
            <div>
              <span className="sla-label">Avg Recovery:</span>
              <span className="sla-value">{sla.recovery_time_s}s</span>
            </div>
          </div>
        </div>

        {/* MITRE Map */}
        <div className="exec-card col-span-2">
          <h3>MITRE ATT&CK Timeline Mapping</h3>
          <div className="mitre-grid">
            {Object.entries(mitre_tactics).map(([tactic, count]) => (
              <div key={tactic} className="mitre-cell">
                <div className="mitre-count">{count}</div>
                <div className="mitre-tactic">{tactic}</div>
              </div>
            ))}
            {Object.keys(mitre_tactics).length === 0 && <p>No mapped tactics.</p>}
          </div>
        </div>

        {/* Threat Intel Feed */}
        <div className="exec-card col-span-2">
          <h3>Live Threat Intelligence Feed</h3>
          <div className="ti-feed">
            {threat_intel_feed.map((feed, idx) => (
              <div key={idx} className="ti-item">
                <span className="ti-time">{new Date(feed.timestamp * 1000).toLocaleTimeString()}</span>
                <span className="ti-provider">[{feed.provider}]</span>
                <span className="ti-indicator">{feed.indicator}</span>
                <span className="ti-details">
                  {feed.threat?.reputation || feed.threat?.cvss || "Matched signature"}
                </span>
              </div>
            ))}
            {threat_intel_feed.length === 0 && <p>No recent threat intel events.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
