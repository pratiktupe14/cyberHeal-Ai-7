import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function IncidentManagement() {
  const [selectedIncident, setSelectedIncident] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer;
    if (showToast) {
        timer = setTimeout(() => {
        setShowToast(false);
        }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <EnterpriseLayout>
      <div className="pt-8 min-h-screen pb-20">
        {/* Main Content */}
        
{/*  Page Title & Quick Actions  */}
<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-background">Incident Management</h2>
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
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Total Incidents</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">1,482</h3>
<span className="text-error font-label-md text-xs flex items-center">+12% <span className="material-symbols-outlined text-sm">trending_up</span></span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Active</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">24</h3>
<span className="text-primary font-label-md text-xs">8 Investigating</span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Critical</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold text-error">3</h3>
<span className="status-pulse w-2 h-2 bg-error rounded-full mb-2"></span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">Resolved</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold">1,455</h3>
<span className="text-tertiary font-label-md text-xs">98.1% Rate</span>
</div>
</div>
<div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm border-t-2 border-t-secondary">
<p className="font-label-md text-label-md text-on-surface-variant mb-2">AI Response Rate</p>
<div className="flex items-end justify-between">
<h3 className="font-headline-lg text-headline-lg font-bold text-secondary">98.4%</h3>
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
<div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-wrap items-center gap-4">
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
<span className="text-label-md font-label-md">Last 24 Hours</span>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-lg text-secondary">psychology</span>
<select className="bg-transparent border-none text-label-md font-label-md focus:ring-0 cursor-pointer">
<option>Agent: All</option>
<option>Sentinel</option>
<option>Guardian</option>
</select>
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
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Type</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Detection Time</th>
<th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
<tr className="hover:bg-surface-container-low transition-colors group bg-primary/5 border-l-4 border-l-primary cursor-pointer" onClick={() => setSelectedIncident(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">INC-9042</td>
<td className="px-4 py-4">
<p className="font-label-md text-label-md font-bold text-on-surface">Data Exfiltration Attempt</p>
<p className="font-body-md text-xs text-on-surface-variant">Asset: prod-db-core-01</p>
</td>
<td className="px-4 py-4">
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error uppercase">Critical</span>
</td>
<td className="px-4 py-4">
<span className="flex items-center gap-1.5 text-label-md font-medium text-tertiary">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Mitigated
                                </span>
</td>
<td className="px-4 py-4 font-label-md text-label-md">Exfiltration</td>
<td className="px-4 py-4 font-body-md text-xs text-on-surface-variant">2023-10-24 14:02:11</td>
<td className="px-4 py-4 text-right">
<button className="p-1 hover:bg-surface-variant/20 rounded"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => setSelectedIncident(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">INC-9041</td>
<td className="px-4 py-4">
<p className="font-label-md text-label-md font-bold text-on-surface">SQL Injection Pattern</p>
<p className="font-body-md text-xs text-on-surface-variant">Asset: public-api-gateway</p>
</td>
<td className="px-4 py-4">
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-600 uppercase">High</span>
</td>
<td className="px-4 py-4">
<span className="flex items-center gap-1.5 text-label-md font-medium text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary status-pulse"></span> Active
                                </span>
</td>
<td className="px-4 py-4 font-label-md text-label-md">Injection</td>
<td className="px-4 py-4 font-body-md text-xs text-on-surface-variant">2023-10-24 13:45:00</td>
<td className="px-4 py-4 text-right">
<button className="p-1 hover:bg-surface-variant/20 rounded"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => setSelectedIncident(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">INC-9040</td>
<td className="px-4 py-4">
<p className="font-label-md text-label-md font-bold text-on-surface">SSH Brute Force</p>
<p className="font-body-md text-xs text-on-surface-variant">Asset: dev-jump-host</p>
</td>
<td className="px-4 py-4">
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-600 uppercase">Medium</span>
</td>
<td className="px-4 py-4">
<span className="flex items-center gap-1.5 text-label-md font-medium text-on-surface-variant">
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Resolved
                                </span>
</td>
<td className="px-4 py-4 font-label-md text-label-md">Brute Force</td>
<td className="px-4 py-4 font-body-md text-xs text-on-surface-variant">2023-10-24 12:10:55</td>
<td className="px-4 py-4 text-right">
<button className="p-1 hover:bg-surface-variant/20 rounded"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => setSelectedIncident(true)}>
<td className="px-4 py-4 font-mono-label text-mono-label">INC-9039</td>
<td className="px-4 py-4">
<p className="font-label-md text-label-md font-bold text-on-surface">Unusual Admin Login</p>
<p className="font-body-md text-xs text-on-surface-variant">Asset: iam-service</p>
</td>
<td className="px-4 py-4">
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">Low</span>
</td>
<td className="px-4 py-4">
<span className="flex items-center gap-1.5 text-label-md font-medium text-on-surface-variant">
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Resolved
                                </span>
</td>
<td className="px-4 py-4 font-label-md text-label-md">Auth Anomaly</td>
<td className="px-4 py-4 font-body-md text-xs text-on-surface-variant">2023-10-24 11:30:22</td>
<td className="px-4 py-4 text-right">
<button className="p-1 hover:bg-surface-variant/20 rounded"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
<div className="p-4 border-t border-outline-variant/30 flex items-center justify-between">
<p className="font-body-md text-xs text-on-surface-variant">Showing 4 of 1,482 incidents</p>
<div className="flex gap-2">
<button className="p-1 border border-outline-variant/30 rounded disabled:opacity-30" disabled={true}><span className="material-symbols-outlined">chevron_left</span></button>
<button className="p-1 border border-outline-variant/30 rounded"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
{/*  Detail Side Panel  */}
{selectedIncident && (
<div className="w-[400px] bg-white rounded-xl border border-outline-variant/30 shadow-xl p-0 flex flex-col h-full sticky top-20">
<div className="p-5 border-b border-outline-variant/30 flex justify-between items-start">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-mono-label text-xs font-bold text-primary">INC-9042</span>
<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary/10 text-tertiary uppercase">Mitigated</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-background">Data Exfiltration Attempt</h4>
</div>
<button className="p-1 hover:bg-surface rounded-full" onClick={() => setSelectedIncident(false)}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
</div>
<div className="flex-1 overflow-y-auto p-5 space-y-stack-lg custom-scrollbar">
{/*  Summary Card  */}
<section className="space-y-2">
<h5 className="font-label-md text-label-md font-bold uppercase text-on-surface-variant/70 tracking-wider">Incident Summary</h5>
<div className="bg-surface p-3 rounded-lg border border-outline-variant/20">
<p className="font-body-md text-sm text-on-surface leading-relaxed">
                                High-volume outbound traffic detected from <span className="font-mono-label bg-white px-1">prod-db-core-01</span> to a known malicious IP address in Eastern Europe. Large amounts of encrypted blobs observed.
                            </p>
</div>
</section>
{/*  Threat Intelligence  */}
<section className="grid grid-cols-2 gap-3">
<div className="p-3 bg-white border border-outline-variant/30 rounded-lg">
<p className="text-[10px] font-bold text-on-surface-variant mb-1">SOURCE IP</p>
<p className="font-mono-label text-xs text-primary">45.128.11.233</p>
</div>
<div className="p-3 bg-white border border-outline-variant/30 rounded-lg">
<p className="text-[10px] font-bold text-on-surface-variant mb-1">PORT / PROTOCOL</p>
<p className="font-mono-label text-xs text-on-surface">443 / HTTPS</p>
</div>
</section>
{/*  AI Agent Workflow  */}
<section className="space-y-4">
<div className="flex items-center justify-between">
<h5 className="font-label-md text-label-md font-bold uppercase text-on-surface-variant/70 tracking-wider">AI Agent Workflow</h5>
<span className="px-2 py-0.5 rounded-full text-[10px] bg-secondary/10 text-secondary border border-secondary/20">99.8% Confidence</span>
</div>
<div className="relative pl-8 space-y-6">
{/*  Vertical line  */}
<div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
{/*  Timeline Item 1  */}
<div className="relative">
<div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>radar</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Sentinel <span className="text-on-surface-variant font-normal">detected anomaly</span></p>
<p className="text-xs text-on-surface-variant">Large outbound transfer (4.2GB)</p>
</div>
</div>
{/*  Timeline Item 2  */}
<div className="relative">
<div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Causor <span className="text-on-surface-variant font-normal">performed RCA</span></p>
<p className="text-xs text-on-surface-variant">Linked to compromised service account 'svc_backup'</p>
</div>
</div>
{/*  Timeline Item 3  */}
<div className="relative">
<div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Planner <span className="text-on-surface-variant font-normal">created remediation</span></p>
<p className="text-xs text-on-surface-variant">Recommended: Revoke session + IP block</p>
</div>
</div>
{/*  Timeline Item 4  */}
<div className="relative">
<div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-white shadow-sm ring-4 ring-white">
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Guardian <span className="text-on-surface-variant font-normal">enforced policy</span></p>
<p className="text-xs text-on-surface-variant">Outbound traffic blocked. Service account locked.</p>
</div>
</div>
</div>
</section>
{/*  Map Location (Implicit Data Location)  */}
<div className="rounded-lg overflow-hidden border border-outline-variant/30 h-32 relative">
<img className="w-full h-full object-cover" data-alt="A clean, minimalist high-tech geographic map showing Eastern Europe with a red pulsating target locator over Warsaw, Poland. The map uses a sleek dark blue and grey color scheme typical of modern cybersecurity operation centers." data-location="Warsaw, Poland" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgMOhkg0PGjgVbPlybfAUBSijy619a5ks_QIxvMbRF0bxuB34SVCYhRFP7tVdzW3jLSFzGjsB2rYd-2W9fgun99qz0fsYNeTQGXQin-6iL42dmQf1P2wkBVSC_WtEDoo4mZavUVFbN-gpM0WQ-uvFzgVCvrcp9cCpaZzxp9FWN7KQ6ZGHBVhpQLVwYS_hJBOj7gE9xn-kitdBnKo30A2gbYeu1y_-r1ynpMEUipB-Ec8QpvAqsQMwM"/>
<div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-bold border border-outline-variant/30">Target Origin</div>
</div>
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
        <p className="font-body-md text-xs text-on-surface-variant">Policy updated successfully across all nodes.</p>
        </div>
        <button className="ml-4 text-on-surface-variant hover:text-on-surface" onClick={() => setShowToast(false)}>
        <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </EnterpriseLayout>
  );
}
