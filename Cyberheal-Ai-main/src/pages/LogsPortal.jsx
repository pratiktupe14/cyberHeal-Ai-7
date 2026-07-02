import React, { useState } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useLogs } from '../api';

export default function LogsPortal() {
  const [selectedLog, setSelectedLog] = useState(null);
  const { logs, isConnected } = useLogs();

  const totalLogs = logs.length;
  const criticalLogs = logs.filter(l => l.LevelDisplayName === 'Error' || l.LevelDisplayName === 'Critical').length;
  const warningLogs = logs.filter(l => l.LevelDisplayName === 'Warning').length;

  const getLevelStyles = (level) => {
    if (level === 'Error' || level === 'Critical') {
      return { colorClass: 'text-error', bgClass: 'bg-error/10' };
    } else if (level === 'Warning') {
      return { colorClass: 'text-orange-600', bgClass: 'bg-orange-100' };
    }
    return { colorClass: 'text-emerald-600', bgClass: 'bg-emerald-500/10' };
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
        
{/*  Page Title & Actions  */}
<div className="flex justify-between items-end mb-stack-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">System Logs {isConnected ? '(Live)' : '(Connecting...)'}</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Real-time comprehensive forensic history and AI agent audit trail.</p>
</div>
<div className="flex gap-stack-sm">
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl font-label-md text-label-md hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                    Export CSV
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl font-label-md text-label-md hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]" data-icon="ios_share">ios_share</span>
                    Share Log
                </button>
</div>
</div>
{/*  KPI Grid  */}
<div className="grid grid-cols-5 gap-stack-md mb-stack-lg">
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Total Logs</p>
<h3 className="text-headline-md font-headline-md font-bold text-on-surface">{totalLogs}</h3>
<div className="flex items-center gap-1 mt-2 text-emerald-600 text-label-md font-label-md">
<span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
<span>Live Feed</span>
</div>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Critical Events</p>
<h3 className="text-headline-md font-headline-md font-bold text-error">{criticalLogs}</h3>
<div className="flex items-center gap-1 mt-2 text-error text-label-md font-label-md">
<span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
<span>Urgent Action</span>
</div>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Warnings</p>
<h3 className="text-headline-md font-headline-md font-bold text-on-secondary-container">{warningLogs}</h3>
<p className="text-label-md font-label-md text-outline mt-2">Active Monitor</p>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm border-t-2 border-t-secondary-container">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">AI Agent Activities</p>
<h3 className="text-headline-md font-headline-md font-bold text-primary">0</h3>
<p className="text-label-md font-label-md text-outline mt-2">Autonomous Operations</p>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Today's Logs</p>
<h3 className="text-headline-md font-headline-md font-bold text-on-surface">{totalLogs}</h3>
<p className="text-label-md font-label-md text-outline mt-2">Retention: 30 days</p>
</div>
</div>
{/*  Filtering Section  */}
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm mb-stack-md">
<div className="flex flex-wrap gap-stack-md items-center">
<div className="flex-1 min-w-[200px]">
<label className="block text-label-md font-label-md text-on-surface-variant mb-2">Date Range</label>
<div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/50">
<span className="material-symbols-outlined text-[18px] text-outline" data-icon="calendar_today">calendar_today</span>
<input className="bg-transparent border-none p-0 text-body-md font-body-md w-full focus:ring-0" type="text" value="Live Feed Active" readOnly />
</div>
</div>
<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-2">Severity</label>
<select className="bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-3 pr-8 text-body-md font-body-md focus:ring-2 focus:ring-primary/20">
<option>All Severities</option>
<option className="text-error">Critical</option>
<option className="text-orange-600">High</option>
<option className="text-yellow-600">Warning</option>
<option className="text-on-surface-variant">Info</option>
</select>
</div>
<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-2">AI Agent</label>
<select className="bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-3 pr-8 text-body-md font-body-md focus:ring-2 focus:ring-primary/20">
<option>All Agents</option>
<option>Sentinel</option>
<option>Causor</option>
<option>Guardian</option>
</select>
</div>
<div>
<label className="block text-label-md font-label-md text-on-surface-variant mb-2">Event Type</label>
<select className="bg-surface-container-low border border-outline-variant/50 rounded-lg py-2 pl-3 pr-8 text-body-md font-body-md focus:ring-2 focus:ring-primary/20">
<option>All Types</option>
</select>
</div>
<div className="pt-6">
<button className="bg-primary text-white p-2 rounded-lg hover:brightness-110 transition-all flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
</button>
</div>
</div>
</div>
{/*  Log Table  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low">
<tr>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Timestamp</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">ID</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">AI Agent / Provider</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Event Type</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Severity</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Source</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Status</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
  {logs.map((log, index) => {
    const { bgClass, colorClass } = getLevelStyles(log.LevelDisplayName);
    return (
      <tr key={index} className="hover:bg-surface-container transition-colors cursor-pointer" onClick={() => setSelectedLog(log)}>
        <td className="px-4 py-4 font-mono-label text-mono-label">{formatTime(log.TimeCreated)}</td>
        <td className="px-4 py-4 font-body-md text-body-md font-semibold text-primary">{log.Id || 'N/A'}</td>
        <td className="px-4 py-4 font-body-md text-body-md">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            {log.ProviderName || 'System'}
          </span>
        </td>
        <td className="px-4 py-4 font-body-md text-body-md">
          {log.Message ? (log.Message.length > 50 ? log.Message.substring(0, 50) + "..." : log.Message) : "Unknown Event"}
        </td>
        <td className="px-4 py-4">
          <span className={`px-2 py-1 rounded ${bgClass} ${colorClass} font-label-md text-[11px] font-bold uppercase tracking-wider`}>
            {log.LevelDisplayName || 'Info'}
          </span>
        </td>
        <td className="px-4 py-4 font-mono-label text-mono-label">Local System</td>
        <td className="px-4 py-4">
          <span className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px]" data-icon="check">check</span>
            Logged
          </span>
        </td>
        <td className="px-4 py-4 text-right">
          <button className="px-3 py-1 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-md font-label-md text-label-md transition-all">View Details</button>
        </td>
      </tr>
    );
  })}
  {logs.length === 0 && (
    <tr>
      <td colSpan="8" className="px-4 py-8 text-center text-on-surface-variant font-body-md">
        No logs found. Connection status: {isConnected ? 'Connected' : 'Disconnected'}
      </td>
    </tr>
  )}
</tbody>
</table>
{/*  Pagination  */}
<div className="bg-surface-container-low px-4 py-3 flex items-center justify-between border-t border-outline-variant/30">
<p className="text-label-md font-label-md text-outline">Showing live logs ({logs.length})</p>
<div className="flex gap-2">
<button className="p-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all" disabled>
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="px-3 py-1 bg-primary text-white rounded-lg font-label-md text-label-md">1</button>
<button className="p-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all" disabled>
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>

      </div>
      
      {/* Sidebar Details */}
      {selectedLog && (
        <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] w-[380px] bg-surface-container-lowest border-l border-outline-variant z-40 flex flex-col overflow-hidden">
{/*  Panel Header  */}
<div className="p-stack-md border-b border-outline-variant/30">
<div className="flex justify-between items-start mb-2">
<span className={`px-2 py-0.5 rounded ${getLevelStyles(selectedLog.LevelDisplayName).bgClass} ${getLevelStyles(selectedLog.LevelDisplayName).colorClass} font-label-md text-[10px] font-bold uppercase`}>
  {selectedLog.LevelDisplayName || 'Info'}
</span>
<button className="material-symbols-outlined text-outline hover:text-on-surface" data-icon="close" onClick={() => setSelectedLog(null)}>close</button>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Log ID: {selectedLog.Id || 'N/A'}</h3>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Provider: {selectedLog.ProviderName}</p>
</div>
{/*  Scrollable Details  */}
<div className="flex-1 overflow-y-auto p-stack-md custom-scrollbar">
{/*  Metadata Bento Segment  */}
<div className="space-y-stack-md">
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Core Metadata</h4>
<div className="grid grid-cols-2 gap-3">
<div className="p-3 bg-surface-container-low rounded-lg col-span-2">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Message</p>
<p className="text-body-md font-semibold text-primary">{selectedLog.Message || 'No Message'}</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Source</p>
<p className="text-body-md font-mono-label">Local System</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Time</p>
<p className="text-body-md font-mono-label">{formatTime(selectedLog.TimeCreated)}</p>
</div>
</div>
</div>
{/*  Timeline  */}
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Event Timeline</h4>
<div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
<div className="relative">
<div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
<p className="text-label-md font-label-md font-bold">{formatTime(selectedLog.TimeCreated)}</p>
<p className="text-body-md text-on-surface-variant">Event Generated by Windows Event Log.</p>
</div>
</div>
</div>
{/*  Audit Trail  */}
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Audit Trail</h4>
<div className="space-y-3">
<div className="flex justify-between items-center text-body-md border-b border-outline-variant/10 pb-2">
<span className="text-on-surface-variant">Viewed by</span>
<span className="font-semibold">Current User</span>
</div>
<div className="flex justify-between items-center text-body-md">
<span className="text-on-surface-variant">System</span>
<span className="font-semibold text-secondary">CyberHeal Live Feeds</span>
</div>
</div>
</div>
</div>
</div>
{/*  Panel Footer  */}
<div className="p-stack-md bg-surface-container-low flex gap-2">
<button className="flex-1 py-2 bg-primary text-white rounded-lg font-label-md text-label-md font-bold">Acknowledge</button>
</div>
</aside>
      )}
    </EnterpriseLayout>
  );
}
