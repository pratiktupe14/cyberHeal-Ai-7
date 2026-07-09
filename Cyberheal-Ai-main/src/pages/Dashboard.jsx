import React, { useState } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import ExecutiveDashboard from '../components/ExecutiveDashboard';
import { useLogs, useOperationalDashboard, useGlobalAgentState, useMonitorState, forceScan, exportReport } from '../api';

export default function Dashboard() {
  const { logs } = useLogs();
  const { operationalData } = useOperationalDashboard();
  const { globalState } = useGlobalAgentState();
  const { monitorState } = useMonitorState();
  const [view, setView] = useState('operational');
  const [isScanning, setIsScanning] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleForceScan = async () => {
    setIsScanning(true);
    try {
      const res = await forceScan();
      if (res.threats_found) {
        alert(res.message + "\nDetails: " + (res.details ? res.details.join(", ") : ''));
      } else {
        alert(res.message || "No threats detected.");
      }
    } catch (err) {
      alert("Failed to run force scan.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      await exportReport('pdf');
    } catch (err) {
      alert("Failed to export report.");
    } finally {
      setIsExporting(false);
    }
  };
  
  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'error':
      case 'critical': return 'bg-error';
      case 'warning': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  return (
    <EnterpriseLayout>
<main className="p-margin-mobile md:p-margin-desktop space-y-stack-lg max-w-[1440px]">
{/* Welcome Header */}
<section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Security Overview</h2>
<p className="text-body-lg text-on-surface-variant">Last incident resolved 14 minutes ago by Autonomous Agent "Epsilon".</p>
</div>
<div className="flex gap-3">
<button 
  onClick={() => setView(view === 'operational' ? 'executive' : 'operational')}
  className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container font-medium rounded-lg shadow-sm hover:translate-y-[-1px] transition-all">
  <span className="material-symbols-outlined text-[18px]" data-icon="dashboard">dashboard</span>
  {view === 'operational' ? 'Executive View' : 'Operational View'}
</button>
<button 
  onClick={handleExportReport}
  disabled={isExporting}
  className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-primary font-medium rounded-lg hover:bg-surface-container transition-all disabled:opacity-50">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                        {isExporting ? 'Exporting...' : 'Export Report'}
                    </button>
<button 
  onClick={handleForceScan}
  disabled={isScanning}
  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-medium rounded-lg shadow-sm hover:translate-y-[-1px] active:translate-y-0 transition-all disabled:opacity-50">
<span className="material-symbols-outlined text-[18px]" data-icon="bolt">bolt</span>
                        {isScanning ? 'Scanning...' : 'Force Scan'}
                    </button>
</div>
</section>

{view === 'executive' ? (
  <ExecutiveDashboard />
) : (
  <>
  {/* KPI Row (Bento Grid Style) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
{/* KPI 1 */}
<div className="bg-surface-container-lowest p-5 rounded-xl card-shadow border border-outline-variant/20">
<div className="flex justify-between items-start mb-2">
<span className="p-2 rounded-lg bg-error-container text-on-error-container">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
</span>
</div>
<p className="text-on-surface-variant text-label-md font-medium">Active Incidents</p>
<h3 className="text-headline-md font-bold mt-1">{operationalData?.active_incidents ?? '-'}</h3>
</div>
{/* KPI 2 */}
<div className="bg-surface-container-lowest p-5 rounded-xl card-shadow border border-outline-variant/20">
<div className="flex justify-between items-start mb-2">
<span className="p-2 rounded-lg bg-tertiary-container text-on-tertiary-container">
<span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
</span>
</div>
<p className="text-on-surface-variant text-label-md font-medium">Threat Detection Rate</p>
<h3 className="text-headline-md font-bold mt-1">{operationalData ? `${operationalData.detection_rate}%` : '-'}</h3>
</div>
{/* KPI 3 */}
<div className="bg-surface-container-lowest p-5 rounded-xl card-shadow border border-outline-variant/20 border-t-2 border-t-primary">
<div className="flex justify-between items-start mb-2">
<span className="p-2 rounded-lg bg-primary-container text-on-primary-container">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
</span>
</div>
<p className="text-on-surface-variant text-label-md font-medium">AI Agent Status</p>
<h3 className="text-headline-md font-bold mt-1">{globalState ? `${Object.values(globalState).filter(a => a.status === 'Active' || a.status === 'Idle').length}/${Object.keys(globalState).length} Active` : '-'}</h3>
</div>
{/* KPI 4 */}
<div className="bg-surface-container-lowest p-5 rounded-xl card-shadow border border-outline-variant/20">
<div className="flex justify-between items-start mb-2">
<span className="p-2 rounded-lg bg-secondary-container text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="health_and_safety">health_and_safety</span>
</span>
</div>
<p className="text-on-surface-variant text-label-md font-medium">System Health</p>
<h3 className="text-headline-md font-bold mt-1">{monitorState?.overall_status ?? '-'}</h3>
</div>
{/* KPI 5 */}
<div className="bg-surface-container-lowest p-5 rounded-xl card-shadow border border-outline-variant/20 bg-error/5 border-error/20">
<div className="flex justify-between items-start mb-2">
<span className="p-2 rounded-lg bg-error text-on-error">
<span className="material-symbols-outlined" data-icon="priority_high">priority_high</span>
</span>
</div>
<p className="text-error text-label-md font-bold">Critical Alerts</p>
<h3 className="text-headline-md font-bold mt-1 text-error">{operationalData?.critical_alerts ?? '-'}</h3>
</div>
</div>
{/* Main Content Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/* Center Section: Map & Table */}
<div className="lg:col-span-2 space-y-gutter">
{/* World Threat Map */}
<div className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden border border-outline-variant/20 relative group h-[380px] flex items-center justify-center">
<div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
<h4 className="font-headline-sm text-on-surface">Global Threat Map</h4>
<p className="text-label-md text-on-surface-variant">Real-time geo-spatial analysis</p>
</div>
<div className="text-on-surface-variant text-body-lg font-medium">
  No live telemetry available
</div>
</div>
{/* Real-time Incident Table */}
<div className="bg-surface-container-lowest rounded-xl card-shadow border border-outline-variant/20 overflow-hidden">
<div className="p-5 border-b border-outline-variant/30 flex justify-between items-center">
<h4 className="font-headline-sm text-on-surface">Active Security Incidents</h4>
<button className="text-primary text-label-md font-bold hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="bg-surface-container-low/50 text-on-surface-variant text-label-md uppercase tracking-wider">
<tr>
<th className="px-6 py-3 font-semibold">Incident ID</th>
<th className="px-6 py-3 font-semibold">Severity</th>
<th className="px-6 py-3 font-semibold">Status</th>
<th className="px-6 py-3 font-semibold">Agent Assigned</th>
<th className="px-6 py-3 font-semibold text-right">Time</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20 text-body-md">
{operationalData?.recent_incidents?.map((incident) => (
<tr key={incident.id} className="hover:bg-surface-container-low/40 transition-colors">
<td className="px-6 py-4 font-mono-label text-primary">#{incident.id.substring(0, 8)}</td>
<td className="px-6 py-4">
<span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
  incident.severity === 'Critical' ? 'bg-error/10 text-error' :
  incident.severity === 'High' ? 'bg-error-container/20 text-on-error-container' :
  incident.severity === 'Medium' ? 'bg-secondary-container/20 text-on-secondary-container' :
  'bg-surface-container-highest text-on-surface-variant'
}`}>
  {incident.severity.toUpperCase()}
</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
  <div className={`w-2 h-2 rounded-full ${incident.status === 'Resolved' ? 'bg-tertiary' : 'bg-primary status-pulse'}`}></div>
  {incident.status}
</div>
</td>
<td className="px-6 py-4 text-on-surface-variant">{incident.assigned_to}</td>
<td className="px-6 py-4 text-right text-on-surface-variant">{new Date(incident.time).toLocaleTimeString()}</td>
</tr>
))}
{(!operationalData?.recent_incidents || operationalData.recent_incidents.length === 0) && (
<tr><td colSpan="5" className="px-6 py-4 text-center text-on-surface-variant">No active incidents</td></tr>
)}
</tbody>
</table>
</div>
</div>
</div>
{/* Right Sidebar: Stats & Activity */}
<div className="space-y-gutter">
{/* Threat Severity Chart */}
<div className="bg-surface-container-lowest p-6 rounded-xl card-shadow border border-outline-variant/20">
<h4 className="font-headline-sm text-on-surface mb-6">Threat Distribution</h4>
<div className="relative flex justify-center py-4">
{/* SVG Chart Dynamic */}
{operationalData ? (() => {
  const total = operationalData.total_today || 1; // Prevent division by zero
  const dist = operationalData.threat_distribution || {};
  const c = dist["Critical"] || 0;
  const h = dist["High"] || 0;
  const m = dist["Medium"] || 0;
  
  const cPct = (c / total) * 100;
  const hPct = (h / total) * 100;
  const mPct = (m / total) * 100;
  
  return (
    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
    <path className="text-outline-variant/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="4"></path>
    <path className="text-error" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${cPct}, 100`} strokeLinecap="round" strokeWidth="4"></path>
    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${hPct}, 100`} strokeDashoffset={`-${cPct}`} strokeLinecap="round" strokeWidth="4"></path>
    <path className="text-tertiary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${mPct}, 100`} strokeDashoffset={`-${cPct + hPct}`} strokeLinecap="round" strokeWidth="4"></path>
    </svg>
  );
})() : <div className="w-40 h-40 rounded-full border-4 border-outline-variant/20"></div>}
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-headline-md font-bold">{operationalData?.total_today ?? 0}</span>
<span className="text-label-md text-on-surface-variant">Total Today</span>
</div>
</div>
<div className="mt-6 space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-error"></div>
<span className="text-body-md">Critical</span>
</div>
<span className="text-body-md font-bold">{operationalData?.threat_distribution?.["Critical"] || 0}</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="text-body-md">High</span>
</div>
<span className="text-body-md font-bold">{operationalData?.threat_distribution?.["High"] || 0}</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-tertiary"></div>
<span className="text-body-md">Medium/Low</span>
</div>
<span className="text-body-md font-bold">{(operationalData?.threat_distribution?.["Medium"] || 0) + (operationalData?.threat_distribution?.["Low"] || 0)}</span>
</div>
</div>
</div>
{/* Live Activity Feed */}
<div className="bg-surface-container-lowest p-6 rounded-xl card-shadow border border-outline-variant/20">
<h4 className="font-headline-sm text-on-surface mb-6">Live Activity</h4>
<div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
  {logs.slice(0, 4).map((log, idx) => (
    <div key={idx} className="relative flex gap-4 pl-8">
      <div className={`absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-4 border-surface z-10 ${getLevelColor(log.LevelDisplayName)}`}></div>
      <div>
        <p className="text-body-md font-medium text-on-surface">{log.Message?.substring(0, 80)}{log.Message?.length > 80 ? '...' : ''}</p>
        <p className="text-label-md text-on-surface-variant">
          {typeof log.TimeCreated === 'string' ? new Date(parseInt(log.TimeCreated.replace(/[^0-9]/g, ''))).toLocaleTimeString() : new Date().toLocaleTimeString()} • {log.ProviderName || 'System'}
        </p>
      </div>
    </div>
  ))}
  {logs.length === 0 && (
    <p className="text-label-md text-on-surface-variant text-center">No recent activity.</p>
  )}
</div>
<button className="w-full mt-6 py-2 text-primary font-bold text-label-md border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                            View Historical Timeline
</button>
</div>
</div>
</div>
  </>
)}
</main>
    </EnterpriseLayout>
  );
}
