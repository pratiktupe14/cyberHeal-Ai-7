import React from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useLogs } from '../api';

export default function LogsPortal() {
  const { logs, isConnected } = useLogs();

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'error':
      case 'critical': return 'bg-error/10 text-error';
      case 'warning': return 'bg-secondary/10 text-secondary';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <EnterpriseLayout>
<main className="p-margin-mobile md:p-margin-desktop">
<div className="max-w-container-max mx-auto space-y-stack-lg">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter">
<div className="space-y-1">
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">System &amp; Security Logs</h2>
<p className="text-body-lg text-on-surface-variant opacity-80">Audit, access, and agent execution logs across the enterprise infrastructure.</p>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full">
<span className="text-body-md font-medium text-on-surface-variant">Live Streaming</span>
<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-outline-variant transition-colors focus:outline-none" id="live-toggle" onclick="this.classList.toggle('bg-primary'); this.querySelector('span').classList.toggle('translate-x-5')">
<span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
</button>
</div>
<button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:translate-y-[-1px] transition-all active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="download">download</span>
<span>Export Logs</span>
</button>
</div>
</div>
{/* Bento Grid Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* Log Volume Chart */}
<div className="md:col-span-8 bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-stack-md">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="bar_chart">bar_chart</span>
                            Log Volume (24h)
                        </h3>
<span className="text-label-md bg-secondary/10 text-secondary px-2 py-1 rounded">+12.5% vs Yesterday</span>
</div>
<div className="flex-1 flex items-end justify-between gap-2 h-40 pt-4">
{/* Simple Mock Bar Chart */}
<div className="w-full bg-primary/10 rounded-t-sm h-[30%]" title="00:00 - 1.2k logs"></div>
<div className="w-full bg-primary/10 rounded-t-sm h-[25%]" title="02:00 - 0.9k logs"></div>
<div className="w-full bg-primary/10 rounded-t-sm h-[45%]" title="04:00 - 1.8k logs"></div>
<div className="w-full bg-primary/20 rounded-t-sm h-[60%]" title="06:00 - 2.4k logs"></div>
<div className="w-full bg-primary/40 rounded-t-sm h-[85%]" title="08:00 - 3.2k logs"></div>
<div className="w-full bg-primary/60 rounded-t-sm h-[75%]" title="10:00 - 2.8k logs"></div>
<div className="w-full bg-primary/80 rounded-t-sm h-[95%]" title="12:00 - 3.8k logs"></div>
<div className="w-full bg-primary rounded-t-sm h-[70%]" title="14:00 - 2.6k logs"></div>
<div className="w-full bg-primary/30 rounded-t-sm h-[40%]" title="16:00 - 1.5k logs"></div>
<div className="w-full bg-primary/20 rounded-t-sm h-[30%]" title="18:00 - 1.2k logs"></div>
<div className="w-full bg-primary/10 rounded-t-sm h-[20%]" title="20:00 - 0.8k logs"></div>
<div className="w-full bg-primary/10 rounded-t-sm h-[25%]" title="22:00 - 1.0k logs"></div>
</div>
<div className="flex justify-between text-label-md text-outline">
<span>00:00</span>
<span>06:00</span>
<span>12:00</span>
<span>18:00</span>
<span>23:59</span>
</div>
</div>
{/* Top Sources Mini List */}
<div className="md:col-span-4 bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-stack-md">
<h3 className="font-headline-sm text-headline-sm flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="source">source</span>
                        Top Sources
                    </h3>
<div className="space-y-3">
<div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-default">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-sm" data-icon="shield">shield</span>
</div>
<span className="text-body-md font-medium">Agent Sentinel</span>
</div>
<span className="font-mono-label text-outline">4.2k</span>
</div>
<div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-default">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-sm" data-icon="lan">lan</span>
</div>
<span className="text-body-md font-medium">Edge Firewall</span>
</div>
<span className="font-mono-label text-outline">2.8k</span>
</div>
<div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-default">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-sm" data-icon="database">database</span>
</div>
<span className="text-body-md font-medium">Auth Core</span>
</div>
<span className="font-mono-label text-outline">1.5k</span>
</div>
<div className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors cursor-default">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-error/10 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-sm" data-icon="psychology">psychology</span>
</div>
<span className="text-body-md font-medium">Guardian AI</span>
</div>
<span className="font-mono-label text-outline">842</span>
</div>
</div>
</div>
</div>
{/* Filter Bar */}
<div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant/30">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
<div className="lg:col-span-2 relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="manage_search">manage_search</span>
<input className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary/20" placeholder="Search logs, IPs, or agents..." type="text"/>
</div>
<div className="relative">
<select className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-body-md appearance-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
<option value="">Log Level: All</option>
<option value="info">Info</option>
<option value="warning">Warning</option>
<option value="error">Error</option>
<option value="critical">Critical</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="filter_alt">filter_alt</span>
</div>
<div className="relative">
<select className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-body-md appearance-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
<option value="">Source: All</option>
<option value="system">System</option>
<option value="ai">AI Agents</option>
<option value="network">Network</option>
<option value="auth">User Auth</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="dns">dns</span>
</div>
<div className="relative">
<input className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-primary/20 cursor-pointer" type="date"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="calendar_today">calendar_today</span>
</div>
</div>
</div>
{/* Main Data Table Section */}
<div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant/30">
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Timestamp</th>
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Level</th>
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Source</th>
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Event</th>
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">IP / Resource</th>
<th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
  {logs.map((log, idx) => (
    <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
      <td className="px-gutter py-4 font-mono-label text-outline whitespace-nowrap">
        {typeof log.TimeCreated === 'string' ? new Date(parseInt(log.TimeCreated.replace(/[^0-9]/g, ''))).toLocaleString() : log.TimeCreated?.value || new Date().toLocaleString()}
      </td>
      <td className="px-gutter py-4">
        <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-tighter ${getLevelColor(log.LevelDisplayName)}`}>
          {log.LevelDisplayName || 'Info'}
        </span>
      </td>
      <td className="px-gutter py-4 text-body-md font-medium">{log.ProviderName || 'System'}</td>
      <td className="px-gutter py-4 text-body-md">{log.Message?.substring(0, 100) || 'No message'}{log.Message?.length > 100 ? '...' : ''}</td>
      <td className="px-gutter py-4 font-mono-label text-on-surface-variant">{log.Id || 'N/A'}</td>
      <td className="px-gutter py-4 text-right">
        <button className="p-1 hover:bg-primary/10 rounded text-outline hover:text-primary">
          <span className="material-symbols-outlined text-[18px]" data-icon="visibility">visibility</span>
        </button>
      </td>
    </tr>
  ))}
  {logs.length === 0 && (
    <tr><td colSpan="6" className="text-center py-8 text-on-surface-variant">No logs available.</td></tr>
  )}
</tbody>
</table>
</div>
{/* Pagination */}
<div className="px-gutter py-4 flex items-center justify-between border-t border-outline-variant/30 bg-surface-container-low/50">
<span className="text-label-md text-on-surface-variant">Showing 1-6 of 2,492 logs</span>
<div className="flex items-center gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-outline transition-colors disabled:opacity-30" disabled="">
<span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-label-md">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface font-label-md">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface font-label-md">3</button>
<span className="px-1 text-outline">...</span>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface font-label-md">416</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-outline transition-colors">
<span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
    </EnterpriseLayout>
  );
}
