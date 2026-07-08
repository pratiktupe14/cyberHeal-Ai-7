import React from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useGlobalAgentState, useScribeState } from '../api';

export default function AiAgents() {
  const { globalState } = useGlobalAgentState();
  const { scribeState } = useScribeState();

  const agents = globalState?.agents || [];
  const logs = scribeState || [];
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
        {agents.map((agent, index) => {
          // Dynamic colors based on index for variety
          const colors = ['primary', 'secondary', 'tertiary', 'error', 'outline'];
          const color = colors[index % colors.length];
          const isActive = agent.status.includes('Active');

          return (
            <div key={agent.id} className="glass-card agent-card-hover border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full bg-${color}`}></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center text-${color}`}>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{agent.icon || 'smart_toy'}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm">{agent.name}</h3>
                    <p className="text-label-md text-on-surface-variant">{agent.role}</p>
                  </div>
                </div>
                {isActive ? (
                  <div className={`flex items-center gap-1.5 px-3 py-1 bg-${color}/10 text-${color} rounded-full border border-${color}/20`}>
                    <span className={`w-2 h-2 rounded-full bg-${color} animate-pulse`}></span>
                    <span className="text-label-md font-bold">{agent.status}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full border border-outline-variant/20">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="text-label-md font-bold">{agent.status}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center text-body-md">
                  <span className="text-on-surface-variant">Last Execution</span>
                  <span className="font-mono-label font-bold">{agent.last_execution}</span>
                </div>
                <div className="flex justify-between items-center text-body-md">
                  <span className="text-on-surface-variant">Success Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`bg-${color} h-full`} style={{ width: `${agent.success_rate}%` }}></div>
                    </div>
                    <span className="font-mono-label font-bold">{agent.success_rate}%</span>
                  </div>
                </div>
              </div>
              {/* Mini Sparkline Simulation */}
              <div className="h-16 w-full flex items-end gap-1 mt-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`bg-${color}${isActive ? '' : '/20'} h-[${Math.floor(Math.random() * 80 + 20)}%] w-full rounded-t-sm transition-all duration-500`}></div>
                ))}
              </div>
            </div>
          );
        })}

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
      <div className="divide-y divide-outline-variant/20 max-h-[400px] overflow-y-auto">
        {logs.length > 0 ? (
          logs.map((log, idx) => {
            const timeStr = new Date(log.timestamp * 1000).toLocaleTimeString();
            return (
              <div key={idx} className="p-4 flex items-center gap-4 hover:bg-surface-container/30 transition-colors">
                <span className="font-mono-label text-on-surface-variant text-xs">{timeStr}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/10 text-primary uppercase">{log.agent_name || 'SCRIBE'}</span>
                <p className="text-body-md truncate">{log.message}</p>
              </div>
            );
          })
        ) : (
          <div className="p-4 flex items-center justify-center text-on-surface-variant">
            No recent agent activity.
          </div>
        )}
      </div>
      </div>
      </section>
      </main>
      
    </EnterpriseLayout>
  );
}
