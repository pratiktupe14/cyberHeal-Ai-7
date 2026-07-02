import React, { useState } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function LogsPortal() {
  const [selectedLog, setSelectedLog] = useState(false);

  return (
    <EnterpriseLayout>
      <div className="pt-8 min-h-screen pb-20">
        {/* Main Content */}
        
{/*  Page Title & Actions  */}
<div className="flex justify-between items-end mb-stack-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">System Logs</h2>
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
<h3 className="text-headline-md font-headline-md font-bold text-on-surface">1.2M</h3>
<div className="flex items-center gap-1 mt-2 text-emerald-600 text-label-md font-label-md">
<span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
<span>4.2%</span>
</div>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Critical Events</p>
<h3 className="text-headline-md font-headline-md font-bold text-error">42</h3>
<div className="flex items-center gap-1 mt-2 text-error text-label-md font-label-md">
<span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
<span>Urgent Action</span>
</div>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Warnings</p>
<h3 className="text-headline-md font-headline-md font-bold text-on-secondary-container">128</h3>
<p className="text-label-md font-label-md text-outline mt-2">Active Monitor</p>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm border-t-2 border-t-secondary-container">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">AI Agent Activities</p>
<h3 className="text-headline-md font-headline-md font-bold text-primary">850</h3>
<p className="text-label-md font-label-md text-outline mt-2">Autonomous Operations</p>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm">
<p className="text-label-md font-label-md text-on-surface-variant mb-2">Today's Logs</p>
<h3 className="text-headline-md font-headline-md font-bold text-on-surface">12.4k</h3>
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
<input className="bg-transparent border-none p-0 text-body-md font-body-md w-full focus:ring-0" type="text" value="May 20, 2024 - May 21, 2024" />
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
<option>Brute Force</option>
<option>DDoS</option>
<option>Malware Detection</option>
<option>User Login</option>
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
<th className="px-4 py-3 font-label-md text-label-md text-outline">AI Agent</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Event Type</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Severity</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Source</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline">Status</th>
<th className="px-4 py-3 font-label-md text-label-md text-outline text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
{/*  Row 1 (Active)  */}
<tr className="hover:bg-surface-container transition-colors bg-primary/5 cursor-pointer" onClick={() => setSelectedLog(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">2024-05-20 14:22:01.442</td>
<td className="px-4 py-4 font-body-md text-body-md font-semibold text-primary">LX-9042</td>
<td className="px-4 py-4 font-body-md text-body-md">
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                                Sentinel
                            </span>
</td>
<td className="px-4 py-4 font-body-md text-body-md">Brute Force Detection</td>
<td className="px-4 py-4">
<span className="px-2 py-1 rounded bg-error/10 text-error font-label-md text-[11px] font-bold uppercase tracking-wider">Critical</span>
</td>
<td className="px-4 py-4 font-mono-label text-mono-label">192.168.1.14</td>
<td className="px-4 py-4">
<span className="flex items-center gap-2 text-emerald-600 font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]" data-icon="check_circle">check_circle</span>
                                Mitigated
                            </span>
</td>
<td className="px-4 py-4 text-right">
<button className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-md font-label-md text-label-md transition-all">View Details</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container transition-colors cursor-pointer" onClick={() => setSelectedLog(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">2024-05-20 14:18:45.102</td>
<td className="px-4 py-4 font-body-md text-body-md font-semibold">LX-9041</td>
<td className="px-4 py-4 font-body-md text-body-md">
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                                Guardian
                            </span>
</td>
<td className="px-4 py-4 font-body-md text-body-md">Policy Update</td>
<td className="px-4 py-4">
<span className="px-2 py-1 rounded bg-on-surface-variant/10 text-on-surface-variant font-label-md text-[11px] font-bold uppercase tracking-wider">Info</span>
</td>
<td className="px-4 py-4 font-mono-label text-mono-label">System Admin</td>
<td className="px-4 py-4">
<span className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]" data-icon="check">check</span>
                                Success
                            </span>
</td>
<td className="px-4 py-4 text-right">
<button className="px-3 py-1 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-md font-label-md text-label-md transition-all">View Details</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container transition-colors cursor-pointer" onClick={() => setSelectedLog(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">2024-05-20 14:15:22.881</td>
<td className="px-4 py-4 font-body-md text-body-md font-semibold">LX-9040</td>
<td className="px-4 py-4 font-body-md text-body-md">
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
                                Causor
                            </span>
</td>
<td className="px-4 py-4 font-body-md text-body-md">DDoS Pattern Observed</td>
<td className="px-4 py-4">
<span className="px-2 py-1 rounded bg-orange-100 text-orange-600 font-label-md text-[11px] font-bold uppercase tracking-wider">High</span>
</td>
<td className="px-4 py-4 font-mono-label text-mono-label">88.102.4.52</td>
<td className="px-4 py-4">
<span className="flex items-center gap-2 text-orange-600 font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]" data-icon="monitoring">monitoring</span>
                                Under Review
                            </span>
</td>
<td className="px-4 py-4 text-right">
<button className="px-3 py-1 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-md font-label-md text-label-md transition-all">View Details</button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container transition-colors cursor-pointer" onClick={() => setSelectedLog(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">2024-05-20 14:12:00.003</td>
<td className="px-4 py-4 font-body-md text-body-md font-semibold">LX-9039</td>
<td className="px-4 py-4 font-body-md text-body-md">
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                                Sentinel
                            </span>
</td>
<td className="px-4 py-4 font-body-md text-body-md">SSH Unauthorized Access</td>
<td className="px-4 py-4">
<span className="px-2 py-1 rounded bg-error/10 text-error font-label-md text-[11px] font-bold uppercase tracking-wider">Critical</span>
</td>
<td className="px-4 py-4 font-mono-label text-mono-label">10.0.42.11</td>
<td className="px-4 py-4">
<span className="flex items-center gap-2 text-emerald-600 font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]" data-icon="block">block</span>
                                Blocked
                            </span>
</td>
<td className="px-4 py-4 text-right">
<button className="px-3 py-1 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-md font-label-md text-label-md transition-all">View Details</button>
</td>
</tr>
</tbody>
</table>
{/*  Pagination  */}
<div className="bg-surface-container-low px-4 py-3 flex items-center justify-between border-t border-outline-variant/30">
<p className="text-label-md font-label-md text-outline">Showing 1 to 10 of 1.2M logs</p>
<div className="flex gap-2">
<button className="p-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="px-3 py-1 bg-primary text-white rounded-lg font-label-md text-label-md">1</button>
<button className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all font-label-md text-label-md">2</button>
<button className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all font-label-md text-label-md">3</button>
<span className="px-2">...</span>
<button className="p-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg hover:bg-surface-container transition-all">
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
<span className="px-2 py-0.5 rounded bg-error/10 text-error font-label-md text-[10px] font-bold uppercase">Critical Alert</span>
<button className="material-symbols-outlined text-outline hover:text-on-surface" data-icon="close" onClick={() => setSelectedLog(false)}>close</button>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Log ID: LX-9042</h3>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Brute Force Detection on Main SSH Gateway</p>
</div>
{/*  Scrollable Details  */}
<div className="flex-1 overflow-y-auto p-stack-md custom-scrollbar">
{/*  Metadata Bento Segment  */}
<div className="space-y-stack-md">
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Core Metadata</h4>
<div className="grid grid-cols-2 gap-3">
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Incident Link</p>
<p className="text-body-md font-semibold text-primary">INC-4022</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Source IP</p>
<p className="text-body-md font-mono-label">192.168.1.14</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Dest Port</p>
<p className="text-body-md font-mono-label">22 (SSH)</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg">
<p className="text-[10px] font-bold text-outline uppercase mb-1">Retries</p>
<p className="text-body-md font-semibold">142/min</p>
</div>
</div>
</div>
{/*  Timeline  */}
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Event Timeline</h4>
<div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
<div className="relative">
<div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
<p className="text-label-md font-label-md font-bold">14:22:01.442 - Detection</p>
<p className="text-body-md text-on-surface-variant">Sentinel flagged anomalous login volume from single source.</p>
</div>
<div className="relative">
<div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary/10"></div>
<p className="text-label-md font-label-md font-bold">14:22:03.110 - RCA</p>
<p className="text-body-md text-on-surface-variant">Causor identified malicious intent via fingerprinting.</p>
</div>
<div className="relative">
<div className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10"></div>
<p className="text-label-md font-label-md font-bold">14:22:05.892 - Remediation</p>
<p className="text-body-md text-on-surface-variant">Guardian applied temporary firewall drop to source IP.</p>
</div>
</div>
</div>
{/*  AI Decision Log  */}
<div className="p-stack-md bg-primary/5 border border-primary/10 rounded-xl">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="psychology">psychology</span>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-primary">AI Decision Log</h4>
</div>
<p className="text-body-md font-body-md italic text-on-surface-variant leading-relaxed">
                        "Sentinel detected pattern, Causor confirmed intent, Guardian applied block. Threat severity categorized as 'High' based on previous lateral movement attempts from similar subnets."
                    </p>
</div>
{/*  Audit Trail  */}
<div>
<h4 className="text-label-md font-label-md font-bold uppercase tracking-widest text-outline mb-3">Audit Trail</h4>
<div className="space-y-3">
<div className="flex justify-between items-center text-body-md border-b border-outline-variant/10 pb-2">
<span className="text-on-surface-variant">Viewed by</span>
<span className="font-semibold">Admin (A. Chen)</span>
</div>
<div className="flex justify-between items-center text-body-md border-b border-outline-variant/10 pb-2">
<span className="text-on-surface-variant">Modified at</span>
<span className="font-semibold">N/A</span>
</div>
<div className="flex justify-between items-center text-body-md">
<span className="text-on-surface-variant">Policy Trigger</span>
<span className="font-semibold text-secondary">Global-SSH-04</span>
</div>
</div>
</div>
</div>
</div>
{/*  Panel Footer  */}
<div className="p-stack-md bg-surface-container-low flex gap-2">
<button className="flex-1 py-2 bg-primary text-white rounded-lg font-label-md text-label-md font-bold">Acknowledge</button>
<button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-label-md text-label-md">Investigate</button>
</div>
</aside>
      )}
    </EnterpriseLayout>
  );
}
