import React, { useState, useEffect } from 'react';
import { useLogs } from '../api';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function LiveMonitoring() {
  const [showToast, setShowToast] = useState(false);
  const { logs } = useLogs();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EnterpriseLayout>
      <div className="pt-8 min-h-screen pb-20">
        {/* Main Content */}
        
<div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg space-y-stack-lg">
{/*  Page Header  */}
<div className="flex items-center justify-between">
<div>
<h1 className="font-display-lg text-headline-lg text-on-surface tracking-tight">Live Monitoring</h1>
<p className="text-on-surface-variant font-body-md">Real-time surveillance across 14 infrastructure nodes</p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">filter_list</span>
<span className="font-label-md">Filter View</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all shadow-md">
<span className="material-symbols-outlined text-sm">download</span>
<span className="font-label-md">Export Report</span>
</button>
</div>
</div>
{/*  KPI Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-gutter">
{/*  KPI Card 1: Active Threats  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-error">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Active Threats</span>
<span className="material-symbols-outlined text-error text-xl">gpp_maybe</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">12</span>
<span className="text-error font-mono-label mb-1.5">+3 (2h)</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error w-3/4"></div>
</div>
</div>
{/*  KPI Card 2: Monitored Assets  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-primary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Monitored Assets</span>
<span className="material-symbols-outlined text-primary text-xl">storage</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">4.2k</span>
<span className="text-primary font-mono-label mb-1.5">Stable</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-full"></div>
</div>
</div>
{/*  KPI Card 3: Critical Alerts  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-error">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Critical Alerts</span>
<span className="material-symbols-outlined text-error text-xl">priority_high</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">04</span>
<span className="text-on-surface-variant font-mono-label mb-1.5">Normal</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error w-1/4"></div>
</div>
</div>
{/*  KPI Card 4: System Health  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-tertiary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">System Health</span>
<span className="material-symbols-outlined text-tertiary text-xl">favorite</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">99%</span>
<span className="text-tertiary font-mono-label mb-1.5">Optimal</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[99%]"></div>
</div>
</div>
{/*  KPI Card 5: AI Agents  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-secondary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Agents Online</span>
<span className="material-symbols-outlined text-secondary text-xl">bolt</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">05</span>
<span className="text-secondary font-mono-label mb-1.5">All Active</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary w-full"></div>
</div>
</div>
{/*  KPI Card 6: API Status  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-tertiary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">API Status</span>
<span className="material-symbols-outlined text-tertiary text-xl">api</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">24ms</span>
<span className="text-tertiary font-mono-label mb-1.5">-2ms</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-full"></div>
</div>
</div>
</div>
{/*  Dashboard Center Piece: Threat Map & Live Feed  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/*  Real-Time Threat Map  */}
<div className="lg:col-span-2 bento-card rounded-xxl overflow-hidden flex flex-col min-h-[400px]">
<div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface/50">

<div className="flex items-center gap-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>

</div>

</div>
</div>
<div className="relative flex-1 bg-slate-50 overflow-hidden">
{/*  Simulated Map with WebGL Placeholder  */}
<div className="absolute inset-0 z-0">
<img className="w-full h-full object-cover opacity-80" alt="A high-tech, professional line graph showing network traffic activity. The graph features multiple overlapping waves in shades of blue and cyan against a clean white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOSXWkkFawIbzh_1OFK_Z7bAvMR8Siv8CSRpV1ZgfFdt1LUjYH4hjSPHpzWyy_07IJWlvLPh_-JnT2qy0ev4cAapGQbHWKLzMwWTahtAnBw4-ltNYWTl-wNrRQSzSeqK7dMuYdK6FXXqyg29bomzoRfZp60pO3rPQj0YOyuFchCEfg-lH0kPTS_TqGgVh4xQ0tkvCv1a-ltuJeu4wUP2IILbH3K9g1GmfBf8xfVfbP9izVIM5V5P-n" />
</div>
{/*  UI Overlay on Map  */}
<div className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl border border-outline-variant shadow-lg z-10">
<div className="text-label-md font-bold text-on-surface-variant uppercase mb-2">Top Attack Origins</div>
<div className="space-y-2">
<div className="flex justify-between gap-8 items-center">
<span className="text-body-md font-medium">Moscow, RU</span>
<span className="text-body-md font-mono-label text-error">4,211</span>
</div>
<div className="flex justify-between gap-8 items-center">
<span className="text-body-md font-medium">Shenzhen, CN</span>
<span className="text-body-md font-mono-label text-error">2,840</span>
</div>
<div className="flex justify-between gap-8 items-center">
<span className="text-body-md font-medium">Ashburn, US</span>
<span className="text-body-md font-mono-label text-error">1,902</span>
</div>
</div>
</div>
</div>
</div>
{/*  Live Security Event Feed  */}
<div className="bento-card rounded-xxl flex flex-col max-h-[400px]">
<div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
<h3 className="font-headline-sm text-headline-sm">Event Stream</h3>
<span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold rounded uppercase">Real-time</span>
</div>
<div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
  {logs.slice(0, 10).map((log, idx) => {
    let severityClass = "bg-surface-container-highest text-on-surface-variant";
    let borderClass = "";
    if (log.LevelDisplayName === "Error" || log.LevelDisplayName === "Critical") {
      severityClass = "bg-error text-white";
      borderClass = "border-l-4 border-l-error";
    } else if (log.LevelDisplayName === "Warning") {
      severityClass = "bg-secondary-container/20 text-secondary";
      borderClass = "border-l-4 border-l-secondary";
    }

    let timeStr = '';
    if (log.TimeCreated) {
      if (log.TimeCreated.includes('/Date(')) {
        timeStr = new Date(parseInt(log.TimeCreated.substr(6))).toLocaleTimeString();
      } else {
        timeStr = new Date(log.TimeCreated).toLocaleTimeString();
      }
    }

    return (
      <div key={idx} className={`p-3 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors ${borderClass}`}>
        <div className="flex justify-between mb-1">
          <span className="font-mono-label text-[11px] text-outline">{timeStr}</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${severityClass} uppercase`}>{log.LevelDisplayName || 'INFO'}</span>
        </div>
        <div className="font-body-md font-semibold text-on-surface mb-1 truncate">
          {log.Message ? (log.Message.length > 50 ? log.Message.substring(0, 50) + '...' : log.Message) : 'System Event'}
        </div>
        <div className="flex justify-between text-label-md text-on-surface-variant">
          <span className="truncate max-w-[150px]">{log.ProviderName || 'System'}</span>
          <span className={log.LevelDisplayName === 'Error' ? 'text-error font-bold' : 'text-primary'}>Logged</span>
        </div>
      </div>
    );
  })}
  {logs.length === 0 && (
    <div className="text-center text-on-surface-variant p-4">Waiting for live events...</div>
  )}
</div>
<button className="p-3 text-center text-primary font-label-md border-t border-outline-variant/30 hover:bg-surface-container transition-colors">
                        View Historical Logs
                    </button>
</div>
</div>
{/*  Second Row: Network & Health  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
{/*  Network Traffic Monitor  */}
<div className="bento-card rounded-xxl p-6">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline-sm text-headline-sm">Network Traffic Monitor</h3>
<div className="flex gap-2">
<span className="px-3 py-1 bg-surface-container rounded-lg text-label-md font-medium border border-outline-variant">Live</span>
<span className="px-3 py-1 bg-surface rounded-lg text-label-md font-medium border border-outline-variant cursor-pointer hover:bg-surface-container transition-all">Historical</span>
</div>
</div>
<div className="grid grid-cols-2 gap-8 h-48">
{/*  Inbound Chart Placeholder  */}
<div className="relative group cursor-crosshair">
<div className="flex justify-between items-end mb-4">
<span className="text-label-md font-bold uppercase text-on-surface-variant">Inbound Bandwidth</span>
<span className="text-body-md font-mono-label text-primary">48.2 Gbps</span>
</div>
<div className="absolute bottom-0 w-full h-32 overflow-hidden flex items-end gap-1">
<div className="w-full h-full bg-primary/5 rounded-t-lg relative">
<div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary/20 border-t-2 border-primary"></div>
<div className="absolute bottom-0 left-0 w-full h-1/3 bg-primary/30 border-t-2 border-primary animate-pulse"></div>
</div>
</div>
</div>
{/*  Frequency Chart Placeholder  */}
<div className="relative group cursor-crosshair">
<div className="flex justify-between items-end mb-4">
<span className="text-label-md font-bold uppercase text-on-surface-variant">Request Frequency</span>
<span className="text-body-md font-mono-label text-secondary">1.2M rps</span>
</div>
<div className="absolute bottom-0 w-full h-32 overflow-hidden flex items-end gap-1">
<div className="w-full h-full bg-secondary/5 rounded-t-lg relative">
<div className="absolute bottom-0 left-0 w-full h-[60%] bg-secondary/20 border-t-2 border-secondary"></div>
<div className="absolute bottom-0 left-0 w-full h-[45%] bg-secondary/30 border-t-2 border-secondary animate-pulse"></div>
</div>
</div>
</div>
</div>
</div>
{/*  System Health Panel  */}
<div className="bento-card rounded-xxl p-6">
<h3 className="font-headline-sm text-headline-sm mb-6">System Health Status</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">CPU Load</span>
<div className="w-12 h-12 rounded-full border-4 border-tertiary flex items-center justify-center text-tertiary font-bold text-xs">42%</div>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">HEALTHY</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Memory</span>
<div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center text-amber-600 font-bold text-xs">88%</div>
<span className="mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">Warning</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">FastAPI</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">cloud_done</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">HEALTHY</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Supabase</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">database</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">HEALTHY</span>
</div>
{/*  Row 2  */}
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Redis</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">flash_on</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">ONLINE</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Disk Space</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">storage</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">1.2 TB FREE</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">API Latency</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">timer</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">12MS</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Firewall</span>
<span className="material-symbols-outlined text-primary text-4xl mb-1">shield</span>
<span className="mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">SECURE</span>
</div>
</div>
</div>
</div>
{/*  Third Row: AI Agents  */}
<div className="space-y-stack-md">
<h3 className="font-headline-sm text-headline-sm">Active AI Agents</h3>
<div className="grid grid-cols-1 md:grid-cols-5 gap-gutter">
{/*  Sentinel Card  */}
<div className="bento-card p-5 rounded-xxl flex flex-col">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">visibility</span>
<span className="font-bold">Sentinel</span>
</div>
<span className="flex items-center gap-1 text-[10px] font-bold text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary pulse-emerald"></span>
                                LIVE
                            </span>
</div>
<p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">Scanning network perimeter for polymorphic malware variants...</p>
<div className="mt-auto">
<div className="flex justify-between text-[10px] text-outline mb-1">
<span className="">Efficiency</span>
<span className="">94%</span>
</div>
<div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-[94%]"></div>
</div>
</div>
</div>
{/*  Causor Card  */}
<div className="bento-card p-5 rounded-xxl flex flex-col">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">psychology</span>
<span className="font-bold">Causor</span>
</div>
<span className="flex items-center gap-1 text-[10px] font-bold text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary pulse-emerald"></span>
                                LIVE
                            </span>
</div>
<p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">Analyzing root cause for recent API latency spike in node-v4.</p>
<div className="mt-auto">
<div className="flex justify-between text-[10px] text-outline mb-1">
<span className="">Efficiency</span>
<span className="">88%</span>
</div>
<div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[88%]"></div>
</div>
</div>
</div>
{/*  Planner Card  */}
<div className="bento-card p-5 rounded-xxl flex flex-col">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">architecture</span>
<span className="font-bold">Planner</span>
</div>
<span className="flex items-center gap-1 text-[10px] font-bold text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary pulse-emerald"></span>
                                LIVE
                            </span>
</div>
<p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">Orchestrating container migration to isolate infected nodes.</p>
<div className="mt-auto">
<div className="flex justify-between text-[10px] text-outline mb-1">
<span className="">Efficiency</span>
<span className="">91%</span>
</div>
<div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[91%]"></div>
</div>
</div>
</div>
{/*  Guardian Card  */}
<div className="bento-card p-5 rounded-xxl flex flex-col">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error">gpp_good</span>
<span className="font-bold">Guardian</span>
</div>
<span className="flex items-center gap-1 text-[10px] font-bold text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary pulse-emerald"></span>
                                LIVE
                            </span>
</div>
<p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">Enforcing zero-trust protocols across dynamic asset groups.</p>
<div className="mt-auto">
<div className="flex justify-between text-[10px] text-outline mb-1">
<span className="">Efficiency</span>
<span className="">99%</span>
</div>
<div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error w-[99%]"></div>
</div>
</div>
</div>
{/*  Scribe Card  */}
<div className="bento-card p-5 rounded-xxl flex flex-col">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline">edit_note</span>
<span className="font-bold">Scribe</span>
</div>
<span className="flex items-center gap-1 text-[10px] font-bold text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary pulse-emerald"></span>
                                LIVE
                            </span>
</div>
<p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">Compiling real-time compliance audit for Incident INC-4022.</p>
<div className="mt-auto">
<div className="flex justify-between text-[10px] text-outline mb-1">
<span className="">Efficiency</span>
<span className="">85%</span>
</div>
<div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-on-surface-variant w-[85%]"></div>
</div>
</div>
</div>
</div>
</div>
{/*  Fourth Row: Incident Timeline & Table  */}
<div className="grid grid-cols-1 gap-gutter">
{/*  Alert Timeline  */}
<div className="bento-card rounded-xxl p-6">
<div className="flex justify-between items-center mb-8">
<div>
<h3 className="font-headline-sm text-headline-sm">Active Incident Lifecycle</h3>
<p className="text-body-md text-on-surface-variant">Focus: <span className="font-bold text-error">INC-4022</span> - SQL Injection Cluster</p>
</div>
<button className="text-primary font-bold text-label-md hover:underline transition-all">View Remediation Plan</button>
</div>
<div className="relative">
{/*  Connecting Line  */}
<div className="absolute top-5 left-0 w-full h-0.5 bg-surface-container z-0"></div>
<div className="absolute top-5 left-0 w-3/5 h-0.5 bg-primary z-0"></div>
<div className="relative z-10 flex justify-between">
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">1</div>
<span className="mt-3 font-bold text-label-md">Detection</span>
<span className="text-[10px] text-outline font-mono-label">12:10 PM</span>
</div>
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">2</div>
<span className="mt-3 font-bold text-label-md">RCA</span>
<span className="text-[10px] text-outline font-mono-label">12:15 PM</span>
</div>
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">3</div>
<span className="mt-3 font-bold text-label-md">Planning</span>
<span className="text-[10px] text-outline font-mono-label">12:22 PM</span>
</div>
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full border-4 border-primary bg-white text-primary flex items-center justify-center font-bold animate-pulse">4</div>
<span className="mt-3 font-bold text-label-md text-primary">Validation</span>
<span className="text-[10px] text-primary font-mono-label">IN PROGRESS</span>
</div>
<div className="flex flex-col items-center opacity-40">
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold">5</div>
<span className="mt-3 font-bold text-label-md">Recovery</span>
<span className="text-[10px] text-outline font-mono-label">PENDING</span>
</div>
<div className="flex flex-col items-center opacity-40">
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold">6</div>
<span className="mt-3 font-bold text-label-md">Resolved</span>
<span className="text-[10px] text-outline font-mono-label">--:--</span>
</div>
</div>
</div>
</div>
{/*  Recent Incidents Table  */}
<div className="bento-card rounded-xxl overflow-hidden">
<div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
<h3 className="font-headline-sm text-headline-sm">Recent Incidents</h3>
<div className="flex gap-2">
<span className="px-2 py-1 bg-surface-container rounded-lg text-label-md font-medium text-on-surface-variant">Last 24 Hours</span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface">
<tr>
<th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase">ID</th>
<th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase">Severity</th>
<th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase">Status</th>
<th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase">Assigned Agent</th>
<th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase">Last Updated</th>
<th className="px-6 py-4"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono-label font-bold text-primary">INC-4022</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded uppercase">Critical</span>
</td>
<td className="px-6 py-4 text-body-md font-medium">Mitigating</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm">visibility</span>
<span className="text-body-md">Sentinel</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface-variant">2m ago</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-outline group-hover:text-primary">open_in_new</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono-label font-bold text-primary">INC-4021</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">High</span>
</td>
<td className="px-6 py-4 text-body-md font-medium">RCA</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm">psychology</span>
<span className="text-body-md">Causor</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface-variant">14m ago</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-outline group-hover:text-primary">open_in_new</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono-label font-bold text-primary">INC-4019</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase">Medium</span>
</td>
<td className="px-6 py-4 text-body-md font-medium">Resolved</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-outline">
<span className="material-symbols-outlined text-sm">edit_note</span>
<span className="text-body-md">Scribe</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface-variant">1h ago</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-outline group-hover:text-primary">open_in_new</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono-label font-bold text-primary">INC-4015</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase">Low</span>
</td>
<td className="px-6 py-4 text-body-md font-medium">Auto-Closed</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-tertiary">
<span className="material-symbols-outlined text-sm">check_circle</span>
<span className="text-body-md">System</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface-variant">4h ago</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-outline group-hover:text-primary">open_in_new</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

      </div>
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 z-[100] transform transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-outline-variant/50 p-4 flex gap-4 min-w-[320px] relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div>
            <h4 className="font-bold text-body-md">Intelligence Update</h4>
            <p className="text-on-surface-variant text-label-md">Causor Agent has identified a new attack pattern.</p>
            <button className="mt-2 text-primary font-bold text-label-md hover:underline">Review Findings</button>
          </div>
          <button className="material-symbols-outlined text-outline text-sm ml-auto" onClick={() => setShowToast(false)}>close</button>
        </div>
      </div>
    </EnterpriseLayout>
  );
}
