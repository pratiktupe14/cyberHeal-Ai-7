import React, { useState, useEffect } from 'react';
import { useLogs, useGlobalAgentState, useMonitorState, useOperationalDashboard, useSystemMetrics, exportReport } from '../api';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import RealTimeMonitoringGraph from '../components/dashboard/RealTimeMonitoringGraph';
export default function LiveMonitoring() {
  const [showToast, setShowToast] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const { logs } = useLogs();
  const { globalState } = useGlobalAgentState();
  const { monitorState } = useMonitorState();
  const { operationalData } = useOperationalDashboard();
  const { systemMetrics } = useSystemMetrics();

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

  const getAttackOrigins = () => {
    if (!logs || logs.length === 0) return [];
    const ips = {};
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
    
    logs.forEach(log => {
      const msg = log.Message || '';
      const found = msg.match(ipRegex);
      if (found) {
        found.forEach(ip => {
          ips[ip] = (ips[ip] || 0) + 1;
        });
      }
    });

    return Object.keys(ips).map(ip => ({ip, count: ips[ip]})).sort((a,b) => b.count - a.count).slice(0,3);
  };
  const attackOrigins = getAttackOrigins();

  const getSeverityBadge = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'critical': return <span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded uppercase">Critical</span>;
      case 'high': return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">High</span>;
      case 'medium': return <span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase">Medium</span>;
      default: return <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase">Low</span>;
    }
  };

  const getStatusStep = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('detect') || s.includes('intake')) return 1;
    if (s.includes('rca') || s.includes('analy')) return 2;
    if (s.includes('plan')) return 3;
    if (s.includes('valid') || s.includes('mitigat') || s.includes('exec')) return 4;
    if (s.includes('recover')) return 5;
    if (s.includes('resolv') || s.includes('close')) return 6;
    return 1;
  };
  
  const latestIncident = operationalData?.recent_incidents?.[0];
  const currentStep = latestIncident ? getStatusStep(latestIncident.status) : 0;

  const renderAgentIcon = (name) => {
    if (name.includes('Sentinel')) return 'visibility';
    if (name.includes('Causor')) return 'psychology';
    if (name.includes('Commander') || name.includes('Plan')) return 'architecture';
    if (name.includes('Intake') || name.includes('Guard')) return 'gpp_good';
    if (name.includes('Scribe') || name.includes('Report')) return 'edit_note';
    return 'smart_toy';
  };
  const renderAgentColor = (name) => {
    if (name.includes('Sentinel')) return 'text-primary';
    if (name.includes('Causor')) return 'text-secondary';
    if (name.includes('Commander') || name.includes('Plan')) return 'text-tertiary';
    if (name.includes('Intake') || name.includes('Guard')) return 'text-error';
    if (name.includes('Scribe') || name.includes('Report')) return 'text-outline';
    return 'text-primary';
  };
  const renderAgentBg = (name) => {
    if (name.includes('Sentinel')) return 'bg-primary';
    if (name.includes('Causor')) return 'bg-secondary';
    if (name.includes('Commander') || name.includes('Plan')) return 'bg-tertiary';
    if (name.includes('Intake') || name.includes('Guard')) return 'bg-error';
    if (name.includes('Scribe') || name.includes('Report')) return 'bg-on-surface-variant';
    return 'bg-primary';
  };

  useEffect(() => {
    // Optionally keep toast for important alerts, but removing the auto-show for now
    // as it might be confusing if it shows a fake alert.
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
<button 
  onClick={handleExportReport}
  disabled={isExporting}
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all shadow-md disabled:opacity-50">
<span className="material-symbols-outlined text-sm">download</span>
<span className="font-label-md">{isExporting ? 'Exporting...' : 'Export Report'}</span>
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
<span className="text-headline-lg font-bold">{operationalData?.active_incidents || (operationalData?.active_incidents === 0 ? '0' : '--')}</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error" style={{width: (operationalData?.active_incidents > 0) ? '100%' : '0%'}}></div>
</div>
</div>
{/*  KPI Card 2: Monitored Assets  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-primary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Monitored Assets</span>
<span className="material-symbols-outlined text-primary text-xl">storage</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">{monitorState ? Object.keys(monitorState).length : '--'}</span>
<span className="text-primary font-mono-label mb-1.5">Nodes</span>
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
<span className="text-headline-lg font-bold">{operationalData?.critical_alerts || (operationalData?.critical_alerts === 0 ? '0' : '--')}</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error" style={{width: (operationalData?.critical_alerts > 0) ? '100%' : '0%'}}></div>
</div>
</div>
{/*  KPI Card 4: System Health  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-tertiary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">System Health</span>
<span className="material-symbols-outlined text-tertiary text-xl">favorite</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">{systemMetrics ? Math.max(0, Math.round(100 - (systemMetrics.cpu_percent + systemMetrics.memory_percent) / 2)) : '--'}%</span>
</div>
<div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary" style={{width: systemMetrics ? `${Math.max(0, Math.round(100 - (systemMetrics.cpu_percent + systemMetrics.memory_percent) / 2))}%` : '0%'}}></div>
</div>
</div>
{/*  KPI Card 5: AI Agents  */}
<div className="bento-card p-5 rounded-xxl border-l-4 border-l-secondary">
<div className="flex justify-between items-start mb-2">
<span className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider">Agents Online</span>
<span className="material-symbols-outlined text-secondary text-xl">bolt</span>
</div>
<div className="flex items-end gap-2">
<span className="text-headline-lg font-bold">{globalState ? Object.values(globalState).filter(a => a.status !== 'Failed').length : '--'}</span>
<span className="text-secondary font-mono-label mb-1.5">Active</span>
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
<span className="text-headline-lg font-bold">{systemMetrics ? systemMetrics.latency_ms : '--'}ms</span>
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
  <RealTimeMonitoringGraph />
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
    <div className="text-center text-on-surface-variant p-4">No live events available.</div>
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
<span className="text-body-md font-mono-label text-primary">{systemMetrics ? (systemMetrics.net_io.bytes_recv / 1024 / 1024 / 1024).toFixed(2) + ' GB' : '--'}</span>
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
<span className="text-label-md font-bold uppercase text-on-surface-variant">Logged Events</span>
<span className="text-body-md font-mono-label text-secondary">{logs ? logs.length : '--'} total</span>
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
<div className="w-12 h-12 rounded-full border-4 border-tertiary flex items-center justify-center text-tertiary font-bold text-xs">{systemMetrics ? systemMetrics.cpu_percent.toFixed(0) : '--'}%</div>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">HEALTHY</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Memory</span>
<div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center text-amber-600 font-bold text-xs">{systemMetrics ? systemMetrics.memory_percent.toFixed(0) : '--'}%</div>
<span className={`mt-2 px-2 py-0.5 ${systemMetrics && systemMetrics.memory_percent > 80 ? 'bg-amber-100 text-amber-700' : 'bg-tertiary/10 text-tertiary'} text-[10px] font-bold rounded uppercase`}>{systemMetrics && systemMetrics.memory_percent > 80 ? 'Warning' : 'HEALTHY'}</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">FastAPI</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">cloud_done</span>
<span className={`mt-2 px-2 py-0.5 ${monitorState?.applications?.status === 'Healthy' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'} text-[10px] font-bold rounded uppercase`}>{monitorState?.applications?.status || 'HEALTHY'}</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Supabase</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">database</span>
<span className={`mt-2 px-2 py-0.5 ${monitorState?.databases?.status === 'Healthy' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'} text-[10px] font-bold rounded uppercase`}>{monitorState?.databases?.status || 'HEALTHY'}</span>
</div>
{/*  Row 2  */}
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Redis</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">flash_on</span>
<span className={`mt-2 px-2 py-0.5 ${monitorState?.databases?.status === 'Healthy' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'} text-[10px] font-bold rounded uppercase`}>{monitorState?.databases?.status === 'Healthy' ? 'ONLINE' : 'DEGRADED'}</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Disk Space</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">storage</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">{systemMetrics ? (100 - systemMetrics.disk_percent).toFixed(1) : '--'}% FREE</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">API Latency</span>
<span className="material-symbols-outlined text-tertiary text-4xl mb-1">timer</span>
<span className="mt-2 px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">{systemMetrics ? systemMetrics.latency_ms : '--'}MS</span>
</div>
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
<span className="text-label-md font-bold text-on-surface-variant mb-3">Firewall</span>
<span className="material-symbols-outlined text-primary text-4xl mb-1">shield</span>
<span className={`mt-2 px-2 py-0.5 ${monitorState?.endpoints?.status === 'Healthy' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'} text-[10px] font-bold rounded uppercase`}>{monitorState?.endpoints?.status === 'Healthy' ? 'SECURE' : 'VULNERABLE'}</span>
</div>
</div>
</div>
</div>
{/*  Third Row: AI Agents  */}
<div className="space-y-stack-md">
<h3 className="font-headline-sm text-headline-sm">Active AI Agents</h3>
<div className="grid grid-cols-1 md:grid-cols-5 gap-gutter">
{globalState && Object.keys(globalState).length > 0 ? (
  Object.entries(globalState).slice(0, 5).map(([agentName, agentData], idx) => {
    const isLive = agentData.status !== 'Failed' && agentData.status !== 'Offline';
    const statusText = isLive ? (agentData.status === 'Idle' ? 'IDLE' : 'LIVE') : 'OFFLINE';
    const eff = agentData.success_rate ? Math.round(agentData.success_rate * 100) : 100;
    
    return (
      <div key={idx} className="bento-card p-5 rounded-xxl flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined ${renderAgentColor(agentName)}`}>{renderAgentIcon(agentName)}</span>
            <span className="font-bold">{agentName.replace('Agent', '')}</span>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-bold ${isLive ? 'text-tertiary' : 'text-error'}`}>
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-tertiary pulse-emerald' : 'bg-error'}`}></span>
            {statusText}
          </span>
        </div>
        <p className="text-label-md text-on-surface-variant mb-4 line-clamp-2">{agentData.current_task || 'Monitoring for new tasks...'}</p>
        <div className="mt-auto">
          <div className="flex justify-between text-[10px] text-outline mb-1">
            <span className="">Efficiency</span>
            <span className="">{eff}%</span>
          </div>
          <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
            <div className={`h-full ${renderAgentBg(agentName)}`} style={{width: `${eff}%`}}></div>
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="text-on-surface-variant col-span-5 p-4 border rounded-xl border-outline-variant/30 text-center">No AI agents active.</div>
)}
</div>
</div>
{/*  Fourth Row: Incident Timeline & Table  */}
<div className="grid grid-cols-1 gap-gutter">
{/*  Alert Timeline  */}
<div className="bento-card rounded-xxl p-6">
<div className="flex justify-between items-center mb-8">
<div>
<h3 className="font-headline-sm text-headline-sm">Active Incident Lifecycle</h3>
<p className="text-body-md text-on-surface-variant">Focus: <span className="font-bold text-error">{latestIncident?.id || 'None'}</span> - {latestIncident ? 'Active Mitigation' : 'No active incidents'}</p>
</div>
<button className="text-primary font-bold text-label-md hover:underline transition-all">View Remediation Plan</button>
</div>
<div className="relative">
{/*  Connecting Line  */}
<div className="absolute top-5 left-0 w-full h-0.5 bg-surface-container z-0"></div>
<div className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-all duration-500" style={{width: `${Math.max(0, (currentStep - 1) * 20)}%`}}></div>
<div className="relative z-10 flex justify-between">
{[
  { step: 1, label: 'Detection' },
  { step: 2, label: 'RCA' },
  { step: 3, label: 'Planning' },
  { step: 4, label: 'Validation' },
  { step: 5, label: 'Recovery' },
  { step: 6, label: 'Resolved' }
].map(s => {
  const isCompleted = currentStep > s.step;
  const isCurrent = currentStep === s.step;
  const isPending = currentStep < s.step;
  
  return (
    <div key={s.step} className={`flex flex-col items-center ${isPending ? 'opacity-40' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
        isCurrent ? 'border-4 border-primary bg-white text-primary animate-pulse shadow-lg' :
        isCompleted ? 'bg-primary text-white shadow-lg' :
        'bg-surface-container text-on-surface-variant'
      }`}>
        {s.step}
      </div>
      <span className={`mt-3 font-bold text-label-md ${isCurrent ? 'text-primary' : ''}`}>{s.label}</span>
      <span className={`text-[10px] font-mono-label ${isCurrent ? 'text-primary' : 'text-outline'}`}>
        {isCompleted ? 'DONE' : isCurrent ? 'IN PROGRESS' : 'PENDING'}
      </span>
    </div>
  );
})}
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
{operationalData?.recent_incidents && operationalData.recent_incidents.length > 0 ? (
  operationalData.recent_incidents.map((inc, idx) => (
    <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
      <td className="px-6 py-4 font-mono-label font-bold text-primary">{inc.id}</td>
      <td className="px-6 py-4">
        {getSeverityBadge(inc.severity)}
      </td>
      <td className="px-6 py-4 text-body-md font-medium">{inc.status}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined ${renderAgentColor(inc.assigned_to)} text-sm`}>{renderAgentIcon(inc.assigned_to)}</span>
          <span className="text-body-md">{inc.assigned_to.replace('Agent', '')}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-body-md text-on-surface-variant">{new Date(inc.time).toLocaleTimeString()}</td>
      <td className="px-6 py-4 text-right">
        <button className="material-symbols-outlined text-outline group-hover:text-primary">open_in_new</button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6" className="px-6 py-8 text-center text-on-surface-variant font-medium">No recent incidents</td>
  </tr>
)}
</tbody>
</table>
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
