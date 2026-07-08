import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useLogs, useCommanderState } from '../api';

export default function IncidentManagement() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { logs, isConnected } = useLogs();
  const { commanderState } = useCommanderState();

  useEffect(() => {
    let timer;
    if (showToast) {
        timer = setTimeout(() => {
        setShowToast(false);
        }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const totalIncidents = logs.length;
  const criticalCount = logs.filter(l => l.LevelDisplayName === 'Error' || l.LevelDisplayName === 'Critical').length;
  const activeCount = logs.filter(l => l.LevelDisplayName === 'Warning').length;
  const resolvedCount = Math.max(0, totalIncidents - criticalCount - activeCount);

  const getLevelStyles = (level) => {
    if (level === 'Error' || level === 'Critical') {
      return { colorClass: 'text-error', bgClass: 'bg-error/10' };
    } else if (level === 'Warning') {
      return { colorClass: 'text-orange-600', bgClass: 'bg-orange-500/10' };
    }
    return { colorClass: 'text-tertiary', bgClass: 'bg-tertiary/10' };
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "Unknown Time";
    if (timeStr.includes('/Date(')) {
        return new Date(parseInt(timeStr.substr(6))).toLocaleString();
    }
    return new Date(timeStr).toLocaleString();
  };

  return (
    <EnterpriseLayout>
      <div className="pt-8 min-h-screen pb-20">
        {/* Main Content */}
        
{/*  Page Title & Quick Actions  */}
<div className="flex justify-between items-end mb-stack-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-background">Incident Management {isConnected ? '(Live)' : '(Connecting...)'}</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Real-time threat detection and AI-assisted response orchestration.</p>
</div>
<div className="flex gap-stack-sm">
<button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/30 text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm">
<span className="material-symbols-outlined text-lg">download</span>
                    Export CSV
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-lg">add</span>
                    Create Incident
                </button>
</div>
</div>
{/*  KPI Grid  */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-gutter mb-stack-lg">
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Total Incidents</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">{totalIncidents}</h3>
<span className="text-emerald-600 font-label-md text-xs flex items-center">Live <span className="material-symbols-outlined text-sm">trending_up</span></span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Active</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">{activeCount}</h3>
<span className="text-primary font-label-md text-xs">Investigating</span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Critical</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold text-error">{criticalCount}</h3>
<span className="status-pulse w-2 h-2 bg-error rounded-full mb-2"></span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Resolved</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">{resolvedCount}</h3>
<span className="text-tertiary font-label-md text-xs">Auto-closed</span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm border-t-2 border-t-secondary">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">AI Response Rate</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold text-secondary">0.0%</h3>
<span className="material-symbols-outlined text-secondary">bolt</span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Avg Resolution</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">14m</h3>
<span className="text-on-surface-variant font-label-md text-xs">-2m YoY</span>
</div>
</div>
</div>
{/*  Filter Bar  */}
<div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-wrap items-center gap-4 mb-stack-md">
<div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-lg text-on-surface-variant">filter_list</span>
<select className="bg-transparent border-none text-label-md font-label-md focus:ring-0 cursor-pointer">
<option>Severity: All</option>
<option>Critical</option>
<option>High</option>
</select>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-outline-variant/30">
<select className="bg-transparent border-none text-label-md font-label-md focus:ring-0 cursor-pointer">
<option>Status: All</option>
<option>Active</option>
<option>Mitigated</option>
</select>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-outline-variant/30">
<select className="bg-transparent border-none text-label-md font-label-md focus:ring-0 cursor-pointer">
<option>Threat: All Types</option>
<option>SQL Injection</option>
<option>Brute Force</option>
</select>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-lg text-on-surface-variant">calendar_today</span>
<span className="text-label-md font-label-md">Live Stream</span>
</div>
<button className="ml-auto text-primary font-label-md text-label-md hover:underline">Clear Filters</button>
</div>
<div className="flex gap-gutter items-start">
{/*  Incidents Table  */}
<div className="flex-1 bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant/30">
<tr>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">ID</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Incident Title</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Severity</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Status</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Provider</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Detection Time</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
  {logs.map((log, i) => {
    const { bgClass, colorClass } = getLevelStyles(log.LevelDisplayName);
    return (
      <tr key={i} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => setSelectedIncident(log)}>
        <td className="px-4 py-4 font-mono-label text-mono-label">{log.Id || 'N/A'}</td>
        <td className="px-4 py-4">
          <p className="font-label-md text-label-md font-bold text-on-surface">
            {log.Message ? (log.Message.length > 40 ? log.Message.substring(0, 40) + "..." : log.Message) : "Unknown Incident"}
          </p>
          <p className="font-body-md text-xs text-on-surface-variant">Source: Local System</p>
        </td>
        <td className="px-4 py-4">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bgClass} ${colorClass} uppercase`}>{log.LevelDisplayName || 'Info'}</span>
        </td>
        <td className="px-4 py-4">
          <span className="flex items-center gap-1.5 text-label-md font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary status-pulse"></span> Active
          </span>
        </td>
        <td className="px-4 py-4 font-label-md text-label-md">{log.ProviderName || 'System'}</td>
        <td className="px-4 py-4 font-body-md text-xs text-on-surface-variant">{formatTime(log.TimeCreated)}</td>
        <td className="px-4 py-4 text-right">
          <button className="p-1 hover:bg-surface-variant/20 rounded"><span className="material-symbols-outlined">more_vert</span></button>
        </td>
      </tr>
    );
  })}
  {logs.length === 0 && (
    <tr>
      <td colSpan="7" className="px-4 py-8 text-center text-on-surface-variant font-body-md">
        No incidents found.
      </td>
    </tr>
  )}
</tbody>
</table>
<div className="p-4 border-t border-outline-variant/30 flex items-center justify-between">
<p className="font-body-md text-xs text-on-surface-variant">Showing live incidents ({totalIncidents})</p>
<div className="flex gap-2">
<button className="p-1 border border-outline-variant/30 rounded disabled:opacity-30" disabled={true}><span className="material-symbols-outlined">chevron_left</span></button>
<button className="p-1 border border-outline-variant/30 rounded disabled:opacity-30" disabled={true}><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
{/*  Detail Side Panel  */}
{selectedIncident && (
<div className="w-[400px] bg-white rounded-xl border border-outline-variant/30 shadow-xl p-0 flex flex-col h-full sticky top-20">
<div className="p-5 border-b border-outline-variant/30 flex justify-between items-start">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-mono-label text-xs font-bold text-primary">ID: {selectedIncident.Id || 'N/A'}</span>
<span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getLevelStyles(selectedIncident.LevelDisplayName).bgClass} ${getLevelStyles(selectedIncident.LevelDisplayName).colorClass} uppercase`}>
  {selectedIncident.LevelDisplayName || 'Info'}
</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-background">Live Incident</h4>
</div>
<button className="p-1 hover:bg-surface rounded-full" onClick={() => setSelectedIncident(null)}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
</div>
<div className="flex-1 overflow-y-auto p-5 space-y-stack-lg custom-scrollbar">
{/*  Summary Card  */}
<section className="space-y-2">
<h5 className="font-label-md text-label-md font-bold uppercase text-on-surface-variant/70 tracking-wider">Incident Summary</h5>
<div className="bg-surface p-3 rounded-lg border border-outline-variant/20">
<p className="font-body-md text-sm text-on-surface leading-relaxed">
    {selectedIncident.Message || 'No detailed message provided by the Windows event log.'}
</p>
</div>
</section>
{/*  Threat Intelligence  */}
<section className="grid grid-cols-2 gap-3">
<div className="p-3 bg-white border border-outline-variant/30 rounded-lg">
<p className="text-[10px] font-bold text-on-surface-variant mb-1">PROVIDER</p>
<p className="font-mono-label text-xs text-primary">{selectedIncident.ProviderName || 'System'}</p>
</div>
<div className="p-3 bg-white border border-outline-variant/30 rounded-lg">
<p className="text-[10px] font-bold text-on-surface-variant mb-1">TIME</p>
<p className="font-mono-label text-xs text-on-surface">{formatTime(selectedIncident.TimeCreated)}</p>
</div>
</section>
{/*  AI Agent Workflow  */}
<section className="space-y-4">
<div className="flex items-center justify-between">
<h5 className="font-label-md text-label-md font-bold uppercase text-on-surface-variant/70 tracking-wider">AI Agent Workflow</h5>
{commanderState && Object.values(commanderState).find(w => w.data?.Id === selectedIncident?.Id) ? (
  <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary border border-primary/20">
    {Object.values(commanderState).find(w => w.data?.Id === selectedIncident?.Id).status}
  </span>
) : (
  <span className="px-2 py-0.5 rounded-full text-[10px] bg-secondary/10 text-secondary border border-secondary/20">Waiting...</span>
)}
</div>
<div className="relative pl-8 space-y-6">
{/*  Vertical line  */}
<div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
{/*  Timeline Item  */}
{commanderState && Object.values(commanderState).find(w => w.data?.Id === selectedIncident?.Id) ? (
  Object.values(commanderState).find(w => w.data?.Id === selectedIncident?.Id).plan.map((step, idx) => (
    <div key={idx} className="relative">
      <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>radar</span>
      </div>
      <div>
      <p className="font-label-md text-label-md font-bold">{step} <span className="text-on-surface-variant font-normal">in plan</span></p>
      <p className="text-xs text-on-surface-variant">
        {Object.values(commanderState).find(w => w.data?.Id === selectedIncident?.Id).current_step === step ? 'Currently Executing' : 'Pending / Completed'}
      </p>
      </div>
    </div>
  ))
) : (
  <div className="relative">
  <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>radar</span>
  </div>
  <div>
  <p className="font-label-md text-label-md font-bold">System <span className="text-on-surface-variant font-normal">detected event</span></p>
  <p className="text-xs text-on-surface-variant">Windows Event Log</p>
  </div>
  </div>
)}
</div>
</section>
</div>
{/*  Footer Actions  */}
<div className="p-5 border-t border-outline-variant/30 bg-surface-container-low flex gap-2">
<button className="flex-1 py-2 bg-white border border-outline-variant/30 text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Report
                    </button>
<button className="flex-1 py-2 bg-white border border-outline-variant/30 text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">forward</span>
                        Escalate
                    </button>
<button className="flex-1 py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-lg shadow-primary/20" onClick={() => setShowToast(true)}>Close Case</button>
</div>
</div>
)}
</div>
      </div>
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-margin-desktop right-margin-desktop glass border border-outline-variant/30 rounded-lg p-4 shadow-2xl flex items-center gap-3 transition-all duration-300 z-[100] ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <div className="w-1 h-10 bg-tertiary rounded-full"></div>
        <div>
        <p className="font-label-md text-label-md font-bold text-on-surface">Action Enforced</p>
        <p className="font-body-md text-xs text-on-surface-variant">Case closed and policy updated successfully.</p>
        </div>
        <button className="ml-4 text-on-surface-variant hover:text-on-surface" onClick={() => setShowToast(false)}>
        <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </EnterpriseLayout>
  );
}
