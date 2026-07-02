import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function Reports() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer;
    if (showToast) {
        timer = setTimeout(() => {
        setShowToast(false);
        }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <EnterpriseLayout>
      <div className="pt-8 min-h-screen pb-20">
        {/* Main Content */}
        
{/*  TopNavBar (Execution from JSON)  */}
<header className="sticky top-0 w-full z-40 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant dark:border-outline shadow-sm">
<div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-[calc(1440px-260px)]">
<div className="flex items-center gap-stack-md flex-1">
<div className="relative w-full max-w-md hidden md:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-body-lg">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/50" placeholder="Search reports, audits, or users..." type="text" />
</div>
</div>
<div className="flex items-center gap-stack-md">
<button className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="help">help</span>
</button>
<button className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="apps">apps</span>
</button>
<div className="ml-2 w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a cybersecurity administrator, clean background, sharp corporate attire, high quality photographic style, bright neutral lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClF5CoyMI07ZJeVcjw-9q9oCbawbM4joGtjAm5vu0EBTJv6boLSeIFAs6pa1dgN3E-eB9GHcdAnnMAGXVJrSr9c-zSFA8KBrzXvuFwuEpeBxbHElQc1RinpelcemF4CjahucpQYYM_WdA815wCgpzuCYgG7cYzu8Bry3Sn2u8UQ4QBLzDNNpUibVmiZXWqf70lzwY5PZPPOZ5fFqxgmQZlcu0WjvsW5B81on8DwwwzcSk4DojwHHMN" />
</div>
</div>
</div>
</header>
{/*  Page Canvas  */}
<div className="p-stack-lg max-w-container-max mx-auto space-y-stack-lg">
{/*  Page Header & Main Actions  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-background">Enterprise Reporting</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Audit, compliance, and historical security data overview.</p>
</div>
<div className="flex items-center gap-stack-md">
<button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-md hover:shadow-lg transition-all active:scale-[0.98]" onClick={() => setShowToast(true)}>
<span className="material-symbols-outlined text-[20px]" data-icon="file_download">file_download</span>
<span>Export All Data</span>
</button>
<button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high border border-outline-variant text-on-surface rounded-lg font-label-md hover:bg-surface-container-highest transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="add_chart">add_chart</span>
<span>Generate Custom Report</span>
</button>
</div>
</div>
{/*  Bento Grid - Compliance Summary Section  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/*  Compliance Card 1  */}
<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
<div className="flex justify-between items-start">
<div>
<p className="text-label-md text-on-surface-variant font-medium mb-1">SOC2 Type II</p>
<h3 className="text-headline-md font-bold text-on-surface">Compliant</h3>
</div>
<div className="w-12 h-12 bg-emerald-100 flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined text-emerald-700" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
</div>
<div className="mt-6">
<div className="flex justify-between text-xs mb-1.5">
<span className="text-on-surface-variant">Annual Review</span>
<span className="text-on-surface font-semibold">92% Complete</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[92%]"></div>
</div>
<p className="text-[11px] text-on-surface-variant mt-2">Next audit: Sept 14, 2024</p>
</div>
</div>
{/*  Compliance Card 2  */}
<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
<div className="flex justify-between items-start">
<div>
<p className="text-label-md text-on-surface-variant font-medium mb-1">GDPR Compliance</p>
<h3 className="text-headline-md font-bold text-on-surface">Ready</h3>
</div>
<div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined text-primary" data-icon="policy">policy</span>
</div>
</div>
<div className="mt-6">
<div className="flex justify-between text-xs mb-1.5">
<span className="text-on-surface-variant">Data Sovereignty</span>
<span className="text-on-surface font-semibold">Verified</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-full"></div>
</div>
<p className="text-[11px] text-on-surface-variant mt-2">No outstanding requests</p>
</div>
</div>
{/*  Compliance Card 3 (Action Required)  */}
<div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
<div className="absolute top-0 left-0 w-1.5 h-full bg-error"></div>
<div className="flex justify-between items-start">
<div>
<p className="text-label-md text-on-surface-variant font-medium mb-1">ISO 27001</p>
<h3 className="text-headline-md font-bold text-on-surface">Action Required</h3>
</div>
<div className="w-12 h-12 bg-error-container/20 flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined text-error" data-icon="warning">warning</span>
</div>
</div>
<div className="mt-6">
<p className="text-body-md text-on-surface-variant leading-tight">3 policy documents require administrator signature by EOD.</p>
<button className="mt-4 text-primary font-bold text-body-md flex items-center gap-1 hover:underline">
                            Review Documents <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
{/*  Main Content Split  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
{/*  Historical Security Reports (List)  */}
<div className="lg:col-span-1 space-y-4">
<div className="flex items-center justify-between mb-2">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Recent Reports</h4>
<button className="text-primary text-label-md hover:underline">View Archive</button>
</div>
{/*  Report Item  */}
<div className="group bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer">
<div className="flex items-center gap-4">
<div className="p-3 bg-surface-container rounded-lg group-hover:bg-primary-container/10 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="analytics">analytics</span>
</div>
<div className="flex-1">
<h5 className="font-body-md font-semibold text-on-surface">Monthly Threat Analysis</h5>
<p className="text-xs text-on-surface-variant">Aug 01 - Aug 31, 2023</p>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:bg-surface-container rounded transition-all" title="PDF"><span className="material-symbols-outlined text-[18px]" data-icon="picture_as_pdf">picture_as_pdf</span></button>
<button className="p-1.5 hover:bg-surface-container rounded transition-all" title="CSV"><span className="material-symbols-outlined text-[18px]" data-icon="csv">csv</span></button>
</div>
</div>
</div>
{/*  Report Item  */}
<div className="group bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer">
<div className="flex items-center gap-4">
<div className="p-3 bg-surface-container rounded-lg group-hover:bg-primary-container/10 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="security">security</span>
</div>
<div className="flex-1">
<h5 className="font-body-md font-semibold text-on-surface">Firewall Integrity Audit</h5>
<p className="text-xs text-on-surface-variant">Weekly Sync • Aug 27</p>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:bg-surface-container rounded transition-all" title="PDF"><span className="material-symbols-outlined text-[18px]" data-icon="picture_as_pdf">picture_as_pdf</span></button>
</div>
</div>
</div>
{/*  Report Item  */}
<div className="group bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer">
<div className="flex items-center gap-4">
<div className="p-3 bg-surface-container rounded-lg group-hover:bg-primary-container/10 transition-colors">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="diversity_3">diversity_3</span>
</div>
<div className="flex-1">
<h5 className="font-body-md font-semibold text-on-surface">IAM Access Review</h5>
<p className="text-xs text-on-surface-variant">Q3 Corporate Review</p>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 hover:bg-surface-container rounded transition-all" title="PDF"><span className="material-symbols-outlined text-[18px]" data-icon="picture_as_pdf">picture_as_pdf</span></button>
<button className="p-1.5 hover:bg-surface-container rounded transition-all" title="CSV"><span className="material-symbols-outlined text-[18px]" data-icon="csv">csv</span></button>
</div>
</div>
</div>
{/*  AI Insights Mini-Card  */}
<div className="p-4 bg-gradient-to-br from-primary to-primary-container rounded-2xl text-on-primary shadow-lg mt-6">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-[20px]" data-icon="auto_awesome">auto_awesome</span>
<span className="text-label-md font-bold uppercase tracking-wider">AI Intelligence</span>
</div>
<p className="text-body-md mb-4 leading-snug">Agent-X has detected a 14% increase in credential stuffing attempts this month. We recommend regenerating the Audit Log summary.</p>
<button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg font-label-md transition-all">Generate AI Summary</button>
</div>
</div>
{/*  Detailed Audit Logs Table  */}
<div className="lg:col-span-2 space-y-4">
<div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-full">
<div className="p-6 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Detailed Audit Logs</h4>
<div className="flex items-center gap-2">
<div className="flex bg-surface-container-low p-1 rounded-lg">
<button className="px-3 py-1.5 bg-surface-container-lowest text-on-surface rounded-md shadow-sm text-label-md font-semibold">All</button>
<button className="px-3 py-1.5 text-on-surface-variant text-label-md">System</button>
<button className="px-3 py-1.5 text-on-surface-variant text-label-md">Users</button>
</div>
<button className="p-2 hover:bg-surface-container rounded-lg border border-outline-variant/50">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="filter_list">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto grow">
<table className="w-full text-left">
<thead className="bg-surface-container-low border-b border-outline-variant/20">
<tr>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Timestamp</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">User</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Action</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">ID</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">
{/*  Log Row  */}
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4 font-mono-label text-on-surface">2023-08-31 14:22</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">JD</div>
<span className="text-body-md text-on-surface">Jane Doe</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface">Modified IAM Policy</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">Success</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant text-xs">#AX-2041</td>
</tr>
{/*  Log Row  */}
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4 font-mono-label text-on-surface">2023-08-31 13:58</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-[14px]" data-icon="smart_toy">smart_toy</span></div>
<span className="text-body-md text-on-surface">Agent-Sigma</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface">Auto-block IP 192.x.x.4</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">Success</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant text-xs">#AX-2040</td>
</tr>
{/*  Log Row  */}
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4 font-mono-label text-on-surface">2023-08-31 12:10</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center text-[10px] font-bold">MK</div>
<span className="text-body-md text-on-surface">Mike Kevins</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface">Exported Audit CSV</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase">Failed</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant text-xs">#AX-2039</td>
</tr>
{/*  Log Row  */}
<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4 font-mono-label text-on-surface">2023-08-31 09:45</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-[14px]" data-icon="person">person</span></div>
<span className="text-body-md text-on-surface">SysAdmin</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface">Update global SSL certs</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">Success</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant text-xs">#AX-2038</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-outline-variant/20 flex items-center justify-between">
<span className="text-label-md text-on-surface-variant">Showing 1-10 of 4,203 entries</span>
<div className="flex gap-2">
<button className="p-2 hover:bg-surface-container rounded border border-outline-variant/30 text-on-surface-variant disabled:opacity-30" disabled="">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="p-2 hover:bg-surface-container rounded border border-outline-variant/30 text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/*  Atmospheric Data Visualization (Bottom)  */}
<div className="relative h-64 w-full rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 group">
<div className="absolute inset-0 z-0">

</div>
<div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-2xl">
<h3 className="font-headline-md text-headline-md text-on-background mb-2">Network Behavioral Analytics</h3>
<p className="text-body-lg text-on-surface-variant">Real-time correlation of audit logs and network traffic. High-velocity anomalous activity is flagged automatically by our heuristic engine.</p>
<div className="mt-6 flex gap-4">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="text-label-md font-semibold">Standard Access</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-tertiary"></span>
<span className="text-label-md font-semibold">Privileged Action</span>
</div>
</div>
</div>
</div>
</div>

      </div>
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 z-[100] transform transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-surface-container-lowest glass border border-outline-variant/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px]">
          <div className="w-1 bg-primary h-12 rounded-full"></div>
          <div className="flex-1">
            <h6 className="font-semibold text-on-surface text-body-md">Export Started</h6>
            <p className="text-xs text-on-surface-variant">Your report is being compiled. It will download automatically.</p>
          </div>
          <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setShowToast(false)}>
            <span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
          </button>
        </div>
      </div>
    </EnterpriseLayout>
  );
}
