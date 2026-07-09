import React from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useGlobalAgentState, useScribeState, useSystemMetrics } from '../api';

export default function AiAgents() {
  const { globalState } = useGlobalAgentState();
  const { scribeState } = useScribeState();
  const { systemMetrics } = useSystemMetrics();

  const agents = globalState ? Object.values(globalState) : [];
  const logs = scribeState || [];

  const totalAgents = agents.length;
  const runningAgents = agents.filter(a => a.status === 'Running' || a.status === 'Busy').length;
  const failedAgents = agents.filter(a => a.status === 'Failed').length;
  const offlineAgents = agents.filter(a => a.status === 'Offline').length;

  return (
    <EnterpriseLayout>
      <div className="p-margin-desktop space-y-stack-lg max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2 className="font-headline-lg text-on-surface">AI Agent Control Center</h2>
            <p className="font-body-lg text-on-surface-variant">Monitor, control, and orchestrate all CyberHeal AI agents in real time.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-outline-variant rounded-xl font-bold text-on-surface hover:bg-surface-container-low transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">history</span>
              Agent Logs
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              Start All Agents
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-error text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined text-sm">stop</span>
              Stop All Agents
            </button>
          </div>
        </div>

        {/* Bento Grid Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-gutter">
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Total Agents</p>
            <p className="font-display-lg text-primary">{totalAgents}</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Running</p>
            <p className="font-display-lg text-emerald-600">{runningAgents}</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Failed</p>
            <p className="font-display-lg text-error">{failedAgents}</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Offline</p>
            <p className="font-display-lg text-on-surface-variant/40">{offlineAgents}</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] col-span-1 md:col-span-1">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Health</p>
            <p className="font-display-lg text-tertiary">99.8%</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] col-span-1 md:col-span-1">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">CPU</p>
            <p className="font-display-lg text-secondary">{systemMetrics ? systemMetrics.cpu_percent.toFixed(0) : '--'}%</p>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] col-span-1 md:col-span-1">
            <p className="text-label-md text-on-surface-variant font-medium uppercase tracking-tight mb-1">Memory</p>
            <p className="font-display-lg text-secondary">{systemMetrics ? systemMetrics.memory_percent.toFixed(0) : '--'}%</p>
          </div>
        </div>

        {/* Dashboard Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Master Control & Workflow (Left Side) */}
          <div className="lg:col-span-8 space-y-gutter">
            {/* Workflow Visual Panel */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">account_tree</span>
                  <h3 className="font-headline-sm text-on-surface">Live Workflow Pipeline</h3>
                </div>
                <span className="bg-tertiary-container/10 text-tertiary px-3 py-1 rounded-full text-label-md font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
                  ACTIVE SESSION: SYS-01
                </span>
              </div>
              
              <div className="flex items-center justify-between no-scrollbar overflow-x-auto pb-4 px-2">
                <div className="flex items-center gap-0 min-w-max">
                  {['Intake', 'Sentinel', 'ThreatIntel', 'Commander', 'Diagnosis', 'Causor', 'Planner', 'Guardian'].map((step, idx) => {
                    const agentState = globalState?.[step + 'Agent'];
                    const isLive = agentState && agentState.status !== 'Offline' && agentState.status !== 'Failed';
                    const isBusy = agentState && (agentState.status === 'Running' || agentState.status === 'Busy');
                    
                    return (
                      <React.Fragment key={step}>
                        <div className={lex flex-col items-center gap-2 }>
                          <div className={w-12 h-12 rounded-full flex items-center justify-center text-label-md font-bold }>
                            {step[0]}
                          </div>
                          <span className={	ext-label-md }>{step}</span>
                        </div>
                        {idx < 7 && (
                          <div className={w-8 h-0.5 }></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AI Agents Table */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="p-stack-lg border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-headline-sm text-on-surface">Active Agent Fleet</h3>
                <div className="flex gap-2">
                  <input className="text-body-md border-outline-variant/50 rounded-lg bg-surface px-4 py-1.5 focus:ring-primary focus:border-primary" placeholder="Filter agents..." type="text" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface text-on-surface-variant font-label-md uppercase tracking-wider">
                    <tr>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Agent Name</th>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Status</th>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Health</th>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Current Task</th>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Success Rate</th>
                      <th className="px-stack-lg py-4 border-b border-outline-variant/10">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md">
                    {agents.map((agent, idx) => {
                      let statusColor = 'text-on-surface-variant';
                      let dotColor = 'bg-outline-variant';
                      if (agent.status === 'Running' || agent.status === 'Busy') {
                        statusColor = 'text-emerald-600';
                        dotColor = 'bg-emerald-600 animate-pulse';
                      } else if (agent.status === 'Idle') {
                        statusColor = 'text-secondary';
                        dotColor = 'bg-secondary';
                      } else if (agent.status === 'Failed') {
                        statusColor = 'text-error';
                        dotColor = 'bg-error';
                      }
                      
                      const eff = agent.success_rate ? Math.round(agent.success_rate * 100) : 100;
                      
                      return (
                        <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10 font-bold">{agent.name.replace('Agent', '')}</td>
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10">
                            <span className={lex items-center gap-2 font-bold }>
                              <span className={w-2 h-2 rounded-full }></span>
                              {agent.status}
                            </span>
                          </td>
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10">
                            <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: \\%\ }}></div>
                            </div>
                          </td>
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10 text-on-surface-variant">{agent.current_task || 'Ready'}</td>
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10 font-mono-label">{eff}%</td>
                          <td className="px-stack-lg py-4 border-b border-outline-variant/10">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-sm">pause</span></button>
                              <button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-sm">refresh</span></button>
                              <button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-sm">list_alt</span></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Control Panels & Stream (Right Side) */}
          <div className="lg:col-span-4 space-y-gutter">
            {/* Master Control Panel */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-headline-sm text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings_suggest</span>
                Master Controls
              </h3>
              <div className="space-y-4">
                {['Auto Recovery', 'Auto Learning (RLM)', 'Live Monitoring', 'Auto Remediation'].map((label, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-xl border border-outline-variant/5">
                    <div>
                      <p className="font-body-md font-bold">{label}</p>
                      <p className="text-label-md text-on-surface-variant">System default setting</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked={idx < 3} className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Knowledge Base */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-headline-sm text-on-surface mb-4">AI Knowledge Base</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface p-4 rounded-xl text-center border border-outline-variant/5">
                  <p className="text-label-md text-on-surface-variant mb-1">Learned Incidents</p>
                  <p className="font-headline-md font-black text-primary">12,402</p>
                </div>
                <div className="bg-surface p-4 rounded-xl text-center border border-outline-variant/5">
                  <p className="text-label-md text-on-surface-variant mb-1">Success Rate</p>
                  <p className="font-headline-md font-black text-tertiary">96%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-label-md font-bold">
                  <span className="">Learning Progress</span>
                  <span className="text-primary">88%</span>
                </div>
                <div className="w-full bg-outline-variant/10 h-3 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                  <div className="bg-primary h-full rounded-full w-[88%] shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
                </div>
              </div>
            </div>

            {/* Live Event Stream */}
            <div className="bg-inverse-surface text-surface-container-lowest p-stack-lg rounded-2xl shadow-xl overflow-hidden flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-md uppercase tracking-widest font-black text-primary-fixed">Live Event Stream</h3>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              <div className="flex-1 font-mono-label space-y-3 overflow-y-auto no-scrollbar pr-2 text-xs opacity-90">
                {logs.length > 0 ? (
                  logs.map((log, idx) => {
                    const timeStr = new Date(log.timestamp * 1000).toLocaleTimeString('en-GB', { hour12: false });
                    return (
                      <div key={idx} className="flex gap-3 animate-pulse-once">
                        <span className="text-white/40 shrink-0">{timeStr}</span>
                        <span className="text-primary-fixed">[{log.agent_name ? log.agent_name.toUpperCase() : 'SYSTEM'}]</span>
                        <span className="">{log.message}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-white/40">No recent events.</div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-label-md font-bold opacity-60">CONSOLE CONNECTED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pb-margin-desktop">
          <div className="bg-surface-container-lowest p-stack-lg rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-md uppercase font-bold text-on-surface-variant">Agent Response Time (ms)</h4>
              <span className="text-label-md text-emerald-600 font-bold">-4.2% from avg</span>
            </div>
            <div className="h-24 w-full flex items-end gap-1 px-1">
              {[60, 55, 70, 45, 50, 65, 80, 75, 90, 85, 95, 82].map((h, i) => (
                <div key={i} className={lex-1 bg-primary rounded-t-sm transition-all duration-300 hover:bg-primary-fixed hover:h-[100%]} style={{ height: \\%\ }}></div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-lowest p-stack-lg rounded-2xl border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-md uppercase font-bold text-on-surface-variant">Workflow Success Rate</h4>
              <span className="text-label-md text-primary font-bold">99.98% peak</span>
            </div>
            <div className="h-24 w-full flex items-end gap-1 px-1">
              {[80, 85, 82, 88, 90, 92, 85, 94, 96, 98, 100, 99].map((h, i) => (
                <div key={i} className={lex-1 bg-tertiary rounded-t-sm transition-all duration-300 hover:bg-tertiary-fixed hover:h-[100%]} style={{ height: \\%\ }}></div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </EnterpriseLayout>
  );
}
