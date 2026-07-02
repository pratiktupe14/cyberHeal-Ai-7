import React, { useState } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';
import { useLogs } from '../api';

export default function LogsPortal() {
  const { logs } = useLogs();
  const [selectedIncident, setSelectedIncident] = useState(null);

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'error':
      case 'critical': return 'bg-error/10 text-error border-error/20';
      case 'warning': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  const getStatusColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'error':
      case 'critical': return 'bg-error animate-pulse';
      case 'warning': return 'bg-orange-400';
      default: return 'bg-emerald-500';
    }
  };
  
  const getStatusText = (level) => {
    switch(level?.toLowerCase()) {
      case 'error':
      case 'critical': return 'Planning';
      case 'warning': return 'RCA';
      default: return 'Resolved';
    }
  };

  return (
    <EnterpriseLayout>
      <div className="flex-1 flex overflow-hidden">
        {/* Table Section */}
        <section className="flex-1 flex flex-col p-stack-lg overflow-hidden">
          <div className="flex items-center justify-between mb-stack-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Incident Management</h2>
              <p className="text-on-surface-variant">Review and resolve active security threats across the infrastructure.</p>
            </div>
            <div className="flex items-center gap-stack-sm">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all font-medium">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:shadow-lg transition-all font-medium">
                <span className="material-symbols-outlined text-sm">add</span>
                Manual Log
              </button>
            </div>
          </div>
          {/* Incident Stats */}
          <div className="grid grid-cols-4 gap-gutter mb-stack-lg">
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-label-md text-on-surface-variant font-medium uppercase mb-1">Total Active</p>
              <p className="text-headline-md font-bold">{logs.length > 0 ? logs.length : '128'}</p>
              <div className="mt-2 text-xs text-error font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +12% from avg
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-label-md text-on-surface-variant font-medium uppercase mb-1">Unassigned</p>
              <p className="text-headline-md font-bold">14</p>
              <div className="mt-2 text-xs text-on-surface-variant font-medium">Requires immediate triage</div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-label-md text-on-surface-variant font-medium uppercase mb-1">Mean Time to Resolve</p>
              <p className="text-headline-md font-bold">42m</p>
              <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_down</span> -8m improvement
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 border-l-4 border-error">
              <p className="text-label-md text-error font-medium uppercase mb-1">Critical Priority</p>
              <p className="text-headline-md font-bold">03</p>
              <div className="mt-2 text-xs text-error font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">warning</span> High risk exposure
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
            <div className="overflow-y-auto scroll-hide">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface-container-low/95 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Incident ID</th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Type &amp; Description</th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-center">Severity</th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {logs.map((log, idx) => {
                    const isSelected = selectedIncident === log;
                    return (
                      <tr 
                        key={idx} 
                        className={`hover:bg-surface-container-low cursor-pointer transition-colors group ${isSelected ? 'bg-primary/5 border-l-4 border-primary' : ''}`} 
                        onClick={() => setSelectedIncident(log)}
                      >
                        <td className="px-6 py-4 font-mono-label text-primary font-bold">{log.Id || `INC-90${42-idx}`}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-on-surface">{log.ProviderName || 'System Event'}</p>
                          <p className="text-xs text-on-surface-variant">{log.Message?.substring(0, 80) || 'No description provided'}{log.Message?.length > 80 ? '...' : ''}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getLevelColor(log.LevelDisplayName)}`}>{log.LevelDisplayName || 'Low'}</span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">
                          {typeof log.TimeCreated === 'string' ? new Date(parseInt(log.TimeCreated.replace(/[^0-9]/g, ''))).toLocaleString() : new Date().toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(log.LevelDisplayName)}`}></span>
                            <span className="text-sm font-medium">{getStatusText(log.LevelDisplayName)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`material-symbols-outlined text-on-surface-variant transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>chevron_right</span>
                        </td>
                      </tr>
                    );
                  })}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-on-surface-variant">No incidents available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* Incident Details Panel */}
        {selectedIncident && (
          <aside className="w-[400px] bg-surface-container-lowest border-l border-outline-variant/30 flex flex-col transition-all duration-300" id="details-panel">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Incident Details</h3>
                <p className="text-primary font-mono-label font-bold text-xs">{selectedIncident.Id || 'INC-9042'}</p>
              </div>
              <button onClick={() => setSelectedIncident(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 scroll-hide">
              {/* Status Timeline */}
              <div className="mb-stack-lg">
                <h4 className="text-label-md font-bold text-on-surface-variant uppercase mb-6">Remediation Status</h4>
                <div className="relative pl-8 space-y-8">
                  {/* Status Line visual hack */}
                  <div className="absolute top-6 bottom-0 left-[11px] w-[2px] bg-outline-variant/30 z-0"></div>
                  {/* Step 1 */}
                  <div className="relative z-10">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white z-10">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Detected</p>
                      <p className="text-xs text-on-surface-variant">{selectedIncident.Message?.substring(0, 60)}...</p>
                      <p className="text-[10px] text-outline font-mono-label mt-1">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="relative z-10">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-white z-10">
                      <span className="material-symbols-outlined text-[14px]">history</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Root Cause Analysis (RCA)</p>
                      <p className="text-xs text-on-surface-variant">Analyzing packet origin and payload signatures...</p>
                      <p className="text-[10px] text-primary font-bold animate-pulse mt-1">In Progress (Agent AI Active)</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="relative z-10 opacity-40">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-outline-variant flex items-center justify-center text-white z-10">
                      <span className="material-symbols-outlined text-[14px]">assignment</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Planning</p>
                      <p className="text-xs text-on-surface-variant">Drafting containment strategy</p>
                    </div>
                  </div>
                  {/* Step 4 */}
                  <div className="relative z-10 opacity-40">
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-outline-variant flex items-center justify-center text-white z-10">
                      <span className="material-symbols-outlined text-[14px]">rule</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Validation</p>
                      <p className="text-xs text-on-surface-variant">Security integrity check</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* AI Insights Card */}
              <div className="p-4 bg-primary/5 rounded-xl border-t-2 border-primary border-r border-b border-l border-outline-variant/10 mb-stack-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  <h5 className="text-sm font-bold text-primary">AI Insight: Data Exfiltration</h5>
                </div>
                <p className="text-xs text-on-surface leading-relaxed mb-3">
                  Current outbound pattern matches <span className="font-bold">Apt28 (Fancy Bear)</span> footprint. Recommendation: Immediate isolation of Instance-042 and credential rotation for all associated service accounts.
                </p>
                <button className="w-full py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-container transition-colors">
                  Apply Automated Patch
                </button>
              </div>
              {/* Evidence & Logs */}
              <div>
                <h4 className="text-label-md font-bold text-on-surface-variant uppercase mb-3">Associated Artifacts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/20 hover:border-primary/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">description</span>
                      <p className="text-xs font-medium">network_trace_{selectedIncident.Id || '9041'}.pcap</p>
                    </div>
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">download</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/20 hover:border-primary/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">image</span>
                      <p className="text-xs font-medium">process_dump_snapshot.png</p>
                    </div>
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">download</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low/50">
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-white border border-outline-variant text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-container-highest transition-all">
                  Add Note
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-container transition-all">
                  Assigned to Me
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </EnterpriseLayout>
  );
}
