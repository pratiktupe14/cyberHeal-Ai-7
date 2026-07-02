import React from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function AiAgents() {
  return (
    <EnterpriseLayout>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full">
      {/* Page Header Section */}
      <section className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface">AI Autonomous Agents</h2>
      <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">Manage and monitor your specialized security intelligence units. Each agent operates independently to maintain ecosystem health.</p>
      </div>
      <div className="flex gap-stack-sm">
      <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all">
      <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
      <span>Deploy Agent</span>
      </button>
      </div>
      </section>
      {/* Agents Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {/* Sentinel Card (Threat Detection) */}
      <div className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
      <span className="material-symbols-outlined text-3xl" data-icon="security" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-headline-sm">Sentinel</h3>
      <p className="text-label-md text-on-surface-variant">Threat Detection</p>
      </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container/10 text-tertiary rounded-full border border-tertiary/20">
      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
      <span className="text-label-md font-bold">Active</span>
      </div>
      </div>
      <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Last Execution</span>
      <span className="font-mono-label font-bold">2.4s ago</span>
      </div>
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Success Rate</span>
      <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
      <div className="bg-primary h-full w-[99.8%]"></div>
      </div>
      <span className="font-mono-label font-bold">99.8%</span>
      </div>
      </div>
      </div>
      {/* Mini Sparkline Simulation */}
      <div className="h-16 w-full flex items-end gap-1 mt-2">
      <div className="bg-primary/20 h-[60%] w-full rounded-t-sm"></div>
      <div className="bg-primary/20 h-[40%] w-full rounded-t-sm"></div>
      <div className="bg-primary/20 h-[70%] w-full rounded-t-sm"></div>
      <div className="bg-primary/20 h-[90%] w-full rounded-t-sm"></div>
      <div className="bg-primary h-[85%] w-full rounded-t-sm"></div>
      <div className="bg-primary h-[95%] w-full rounded-t-sm"></div>
      <div className="bg-primary h-[70%] w-full rounded-t-sm"></div>
      </div>
      </div>
      {/* Causor Card (Root Cause Analysis) */}
      <div className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary">
      <span className="material-symbols-outlined text-3xl" data-icon="troubleshoot" style={{ fontVariationSettings: "'FILL' 1" }}>troubleshoot</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-headline-sm">Causor</h3>
      <p className="text-label-md text-on-surface-variant">Root Cause Analysis</p>
      </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container/10 text-tertiary rounded-full border border-tertiary/20">
      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
      <span className="text-label-md font-bold">Active</span>
      </div>
      </div>
      <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Last Execution</span>
      <span className="font-mono-label font-bold">12m ago</span>
      </div>
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Success Rate</span>
      <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
      <div className="bg-secondary h-full w-[94.2%]"></div>
      </div>
      <span className="font-mono-label font-bold">94.2%</span>
      </div>
      </div>
      </div>
      <div className="h-16 w-full flex items-end gap-1 mt-2">
      <div className="bg-secondary/20 h-[30%] w-full rounded-t-sm"></div>
      <div className="bg-secondary/20 h-[50%] w-full rounded-t-sm"></div>
      <div className="bg-secondary/20 h-[40%] w-full rounded-t-sm"></div>
      <div className="bg-secondary h-[60%] w-full rounded-t-sm"></div>
      <div className="bg-secondary h-[45%] w-full rounded-t-sm"></div>
      <div className="bg-secondary h-[35%] w-full rounded-t-sm"></div>
      <div className="bg-secondary h-[50%] w-full rounded-t-sm"></div>
      </div>
      </div>
      {/* Planner Card (Recovery Planning) */}
      <div className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-tertiary-container"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
      <span className="material-symbols-outlined text-3xl" data-icon="route" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-headline-sm">Planner</h3>
      <p className="text-label-md text-on-surface-variant">Recovery Planning</p>
      </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full border border-outline-variant/20">
      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
      <span className="text-label-md font-bold">Idle</span>
      </div>
      </div>
      <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Last Execution</span>
      <span className="font-mono-label font-bold">1h 22m ago</span>
      </div>
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Success Rate</span>
      <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
      <div className="bg-tertiary h-full w-[100%]"></div>
      </div>
      <span className="font-mono-label font-bold">100%</span>
      </div>
      </div>
      </div>
      <div className="h-16 w-full flex items-end gap-1 mt-2">
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      <div className="bg-tertiary/20 h-[20%] w-full rounded-t-sm"></div>
      </div>
      </div>
      {/* Guardian Card (Safety Validation) */}
      <div className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-error-container/10 flex items-center justify-center text-error">
      <span className="material-symbols-outlined text-3xl" data-icon="admin_panel_settings" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-headline-sm">Guardian</h3>
      <p className="text-label-md text-on-surface-variant">Safety Validation</p>
      </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container/10 text-tertiary rounded-full border border-tertiary/20">
      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
      <span className="text-label-md font-bold">Active</span>
      </div>
      </div>
      <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Last Execution</span>
      <span className="font-mono-label font-bold">3.1s ago</span>
      </div>
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Success Rate</span>
      <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
      <div className="bg-error h-full w-[99.9%]"></div>
      </div>
      <span className="font-mono-label font-bold">99.9%</span>
      </div>
      </div>
      </div>
      <div className="h-16 w-full flex items-end gap-1 mt-2">
      <div className="bg-error/20 h-[80%] w-full rounded-t-sm"></div>
      <div className="bg-error/20 h-[75%] w-full rounded-t-sm"></div>
      <div className="bg-error/20 h-[85%] w-full rounded-t-sm"></div>
      <div className="bg-error h-[90%] w-full rounded-t-sm"></div>
      <div className="bg-error h-[95%] w-full rounded-t-sm"></div>
      <div className="bg-error h-[80%] w-full rounded-t-sm"></div>
      <div className="bg-error h-[85%] w-full rounded-t-sm"></div>
      </div>
      </div>
      {/* Scribe Card (Audit Logging) */}
      <div className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-outline"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-outline/10 flex items-center justify-center text-outline">
      <span className="material-symbols-outlined text-3xl" data-icon="history_edu" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-headline-sm">Scribe</h3>
      <p className="text-label-md text-on-surface-variant">Audit Logging</p>
      </div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container/10 text-tertiary rounded-full border border-tertiary/20">
      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
      <span className="text-label-md font-bold">Active</span>
      </div>
      </div>
      <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Last Execution</span>
      <span className="font-mono-label font-bold">0.1s ago</span>
      </div>
      <div className="flex justify-between items-center text-body-md">
      <span className="text-on-surface-variant">Success Rate</span>
      <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
      <div className="bg-outline h-full w-[100%]"></div>
      </div>
      <span className="font-mono-label font-bold">100%</span>
      </div>
      </div>
      </div>
      <div className="h-16 w-full flex items-end gap-1 mt-2">
      <div className="bg-outline/20 h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline/20 h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline/20 h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline h-[100%] w-full rounded-t-sm"></div>
      <div className="bg-outline h-[100%] w-full rounded-t-sm"></div>
      </div>
      </div>
      {/* Deploy New Agent Template */}
      <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center hover:bg-surface-container transition-all cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
      </div>
      <div>
      <h3 className="font-headline-sm text-on-surface">Deploy Template</h3>
      <p className="text-label-md text-on-surface-variant">Create specialized security logic</p>
      </div>
      </div>
      </div>
      {/* AI Agent Insights / Global Log Section */}
      <section className="mt-stack-lg">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
      <h3 className="font-headline-sm">Agent Activity Feed</h3>
      </div>
      <button className="text-primary font-bold text-label-md hover:underline">View History</button>
      </div>
      <div className="divide-y divide-outline-variant/20">
      <div className="p-4 flex items-center gap-4 hover:bg-surface-container/30 transition-colors">
      <span className="font-mono-label text-on-surface-variant text-xs">14:22:01</span>
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/10 text-primary uppercase">SENTINEL</span>
      <p className="text-body-md">Mitigated potential cross-site scripting attempt on Endpoint-721.</p>
      </div>
      <div className="p-4 flex items-center gap-4 hover:bg-surface-container/30 transition-colors">
      <span className="font-mono-label text-on-surface-variant text-xs">14:18:45</span>
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container/10 text-secondary uppercase">CAUSOR</span>
      <p className="text-body-md">Identified misconfigured firewall rule as origin of anomaly traffic.</p>
      </div>
      <div className="p-4 flex items-center gap-4 hover:bg-surface-container/30 transition-colors">
      <span className="font-mono-label text-on-surface-variant text-xs">14:15:10</span>
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container/10 text-error uppercase">GUARDIAN</span>
      <p className="text-body-md">Validation check failed for auto-remediation plan. Re-routing to Human-in-loop.</p>
      </div>
      </div>
      </div>
      </section>
      </main>
      
    </EnterpriseLayout>
  );
}
