import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/layout/EnterpriseLayout';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [sliderValue, setSliderValue] = useState(85);

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
        
<div className="max-w-[1200px] mx-auto">
{/*  Page Header  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Global System Settings</h2>
<p className="text-body-lg text-on-surface-variant mt-1">Manage enterprise security protocols, AI agent sensitivity, and access controls.</p>
</div>
<div className="flex gap-stack-sm">
<button className="px-6 py-2 rounded-lg border border-outline-variant font-label-md text-on-surface-variant hover:bg-surface-container transition-all">Discard Changes</button>
<button className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:shadow-lg hover:translate-y-[-1px] active:scale-95 transition-all" onClick={() => setShowToast(true)}>Save Changes</button>
</div>
</div>
{/*  Bento Layout for Settings  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/*  Left Column: Navigation Tabs & Profile  */}
<div className="lg:col-span-3 flex flex-col gap-gutter">
{/*  Tab Switcher  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-sm shadow-sm overflow-hidden">
<nav className="flex flex-col gap-unit" id="settings-tabs">
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'profile' ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-surface-container'}`} onClick={() => setActiveTab('profile')}>
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-body-md">User Profile</span>
</button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'ai' ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-surface-container'}`} onClick={() => setActiveTab('ai')}>
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="text-body-md">AI Configuration</span>
</button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'api' ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-surface-container'}`} onClick={() => setActiveTab('api')}>
<span className="material-symbols-outlined" data-icon="key">key</span>
<span className="text-body-md">API Keys</span>
</button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'notifications' ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-surface-container'}`} onClick={() => setActiveTab('notifications')}>
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span className="text-body-md">Notifications</span>
</button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'security' ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-surface-container'}`} onClick={() => setActiveTab('security')}>
<span className="material-symbols-outlined" data-icon="policy">policy</span>
<span className="text-body-md">Security Policies</span>
</button>
</nav>
</div>
{/*  Profile Quick Look  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-6 shadow-sm">
<div className="flex flex-col items-center text-center">
<div className="relative mb-4 group">
<img className="w-24 h-24 rounded-full border-4 border-primary/10" data-alt="Close-up portrait of a tech professional in a high-key studio setting. Professional lighting creates a clean white-canvas feel. The subject is looking directly into the camera with a confident expression. Corporate modern style, ultra-detailed skin textures, and bright primary color accents in the background environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVZ51zA8_MCi5B5xyOYDVBjzNFECbgvM6CYM_9t9G2PInLUyaJG-a8u6nCz11NjX_ZKvGqy7cRpHGmP83YKTrZXLUvFR8F0N9S4djV5yIoWIsTSuoLXVqad1H-jcexwyDPJrKWuCcquGxxfRtInYwATvY-GXfgaDLCR_MvoSQ7zz0WJelxe6YZig9X9SZIrmhfiwUtOuFe_Mb-hL8LAXslO4MAEXHSnzyW4jAJAeYQ-RBcGqXSZJ69" />
<button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
</button>
</div>
<h3 className="font-headline-sm text-headline-sm">Alex Chen</h3>
<p className="text-label-md text-on-surface-variant">Senior SecOps Engineer</p>
<div className="mt-4 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary/20 text-[10px] text-secondary font-bold uppercase tracking-wider">
                                Role: Administrator
                            </div>
</div>
</div>
</div>
{/*  Right Column: Panel Content  */}
<div className="lg:col-span-9">
{/*  Profile Tab Panel  */}
<section className={`tab-panel space-y-gutter ${activeTab === 'profile' ? 'block' : 'hidden'}`} id="panel-profile">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-margin-desktop shadow-sm">
<h4 className="font-headline-sm text-headline-sm mb-stack-lg">Account Information</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
<div className="space-y-unit">
<label className="text-label-md font-bold text-on-surface-variant">Full Name</label>
<input className="w-full bg-surface border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" type="text" value="Alex Chen" />
</div>
<div className="space-y-unit">
<label className="text-label-md font-bold text-on-surface-variant">Email Address</label>
<input className="w-full bg-surface border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" type="email" value="alex.chen@cyberheal.ai" />
</div>
<div className="space-y-unit">
<label className="text-label-md font-bold text-on-surface-variant">Organization</label>
<input className="w-full bg-surface border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary" type="text" value="CyberHeal Enterprise HQ" />
</div>
<div className="space-y-unit">
<label className="text-label-md font-bold text-on-surface-variant">Timezone</label>
<select className="w-full bg-surface border-outline-variant rounded-lg p-3 text-body-md focus:ring-primary focus:border-primary">
<option>Pacific Standard Time (UTC-8)</option>
<option>Eastern Standard Time (UTC-5)</option>
<option>Greenwich Mean Time (UTC+0)</option>
</select>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-margin-desktop shadow-sm border-l-4 border-l-primary">
<div className="flex items-start gap-4">
<div className="p-3 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
</div>
<div>
<h4 className="font-headline-sm text-headline-sm">Two-Factor Authentication</h4>
<p className="text-body-md text-on-surface-variant mt-1">Secure your account with an extra layer of protection. We recommend using a hardware key or authenticator app.</p>
<button className="mt-4 px-6 py-2 bg-primary/10 text-primary font-label-md rounded-lg hover:bg-primary/20 transition-all">Reconfigure 2FA</button>
</div>
</div>
</div>
</section>
{/*  AI Configuration Tab Panel (Hidden by Default)  */}
<section className={`tab-panel space-y-gutter ${activeTab === 'ai' ? 'block' : 'hidden'}`} id="panel-ai">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-margin-desktop shadow-sm border-t-4 border-t-cyan-500">
<div className="flex justify-between items-center mb-stack-lg">
<h4 className="font-headline-sm text-headline-sm">AI Agent Sensitivity</h4>
<span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-[10px] font-bold rounded-full">AGENT GENERATED SETTINGS</span>
</div>
<div className="space-y-stack-lg">
<div>
<div className="flex justify-between mb-2">
<label className="text-label-md font-bold">Threat Detection Threshold</label>
<span className="text-label-md font-mono text-primary">85%</span>
</div>
<input className="w-full h-2 rounded-lg cursor-pointer" max="100" min="0" type="range" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} style={{backgroundSize: `${sliderValue}% 100%`}} />
<p className="text-label-md text-on-surface-variant mt-2 italic">Higher sensitivity may increase false positives but ensures maximum vigilance.</p>
</div>
<div>
<div className="flex justify-between mb-2">
<label className="text-label-md font-bold">Autonomous Action Level</label>
<span className="text-label-md font-mono text-primary">Balanced</span>
</div>
<div className="grid grid-cols-3 gap-stack-sm">
<button className="py-2 border border-outline-variant rounded-lg text-label-md hover:bg-surface-container">Conservative</button>
<button className="py-2 bg-primary/10 border-2 border-primary rounded-lg text-label-md font-bold text-primary">Balanced</button>
<button className="py-2 border border-outline-variant rounded-lg text-label-md hover:bg-surface-container">Aggressive</button>
</div>
</div>
</div>
</div>
</section>
{/*  API Keys Tab Panel (Hidden by Default)  */}
<section className={`tab-panel space-y-gutter ${activeTab === 'api' ? 'block' : 'hidden'}`} id="panel-api">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
<div className="p-margin-desktop border-b border-outline-variant/30 flex justify-between items-center">
<div>
<h4 className="font-headline-sm text-headline-sm">Active API Keys</h4>
<p className="text-body-md text-on-surface-variant">Manage credentials for external tool integrations.</p>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold">
<span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                                    Generate New Key
                                </button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="bg-surface-container-low border-b border-outline-variant/30">
<tr>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Key Name</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Status</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Created</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Last Used</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/20">
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="font-body-md font-medium">SIEM_Production_Main</span>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">ACTIVE</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant">2023-10-12</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant">2 minutes ago</td>
<td className="px-6 py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-lg transition-all material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="font-body-md font-medium">Testing_Dev_Sandbox</span>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded">INACTIVE</span>
</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant">2023-08-05</td>
<td className="px-6 py-4 font-mono-label text-on-surface-variant">2 months ago</td>
<td className="px-6 py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-lg transition-all material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
{/*  Notifications Tab Panel (Hidden by Default)  */}
<section className={`tab-panel space-y-gutter ${activeTab === 'notifications' ? 'block' : 'hidden'}`} id="panel-notifications">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-margin-desktop shadow-sm">
<h4 className="font-headline-sm text-headline-sm mb-stack-lg">Notification Preferences</h4>
<div className="space-y-stack-md">
<div className="flex items-center justify-between py-4 border-b border-outline-variant/20">
<div>
<p className="font-body-md font-bold text-on-surface">Critical Incident Alerts</p>
<p className="text-label-md text-on-surface-variant">Immediate push notifications for P0/P1 security breaches.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between py-4 border-b border-outline-variant/20">
<div>
<p className="font-body-md font-bold text-on-surface">Weekly Performance Digest</p>
<p className="text-label-md text-on-surface-variant">Summary of AI agent performance and threat mitigation statistics.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between py-4">
<div>
<p className="font-body-md font-bold text-on-surface">System Maintenance</p>
<p className="text-label-md text-on-surface-variant">Notifications regarding downtime and software updates.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</section>
{/*  Security Policies Tab Panel (Hidden by Default)  */}
<section className={`tab-panel space-y-gutter ${activeTab === 'security' ? 'block' : 'hidden'}`} id="panel-security">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-margin-desktop shadow-sm">
<h4 className="font-headline-sm text-headline-sm mb-stack-lg">Global Security Policies</h4>
<div className="space-y-stack-sm">
<div className="p-4 bg-surface rounded-lg border border-outline-variant/30 flex items-center justify-between hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" data-icon="lock_open">lock_open</span>
<div>
<p className="font-body-md font-bold">Brute Force Prevention</p>
<p className="text-label-md text-on-surface-variant">Automatically lock IPs after 5 failed attempts.</p>
</div>
</div>
<button className="text-primary font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Configure</button>
</div>
<div className="p-4 bg-surface rounded-lg border border-outline-variant/30 flex items-center justify-between hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" data-icon="cloud_done">cloud_done</span>
<div>
<p className="font-body-md font-bold">Data Sovereignty Rule #12</p>
<p className="text-label-md text-on-surface-variant">Enforce EU-only storage for GDPR-sensitive metadata.</p>
</div>
</div>
<button className="text-primary font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Configure</button>
</div>
<div className="p-4 bg-surface rounded-lg border border-outline-variant/30 flex items-center justify-between hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" data-icon="shield">shield</span>
<div>
<p className="font-body-md font-bold">Agent Zero-Trust Validation</p>
<p className="text-label-md text-on-surface-variant">Verify agent identity before allowing payload execution.</p>
</div>
</div>
<button className="text-primary font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Configure</button>
</div>
</div>
</div>
</section>
</div>
</div>
</div>

      </div>
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-margin-desktop right-margin-desktop bg-surface-container-lowest border border-outline-variant/30 shadow-xl rounded-xl p-4 flex items-center gap-4 transition-all duration-300 z-[100] ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <div className="w-1 h-10 bg-emerald-500 rounded-full"></div>
        <div className="flex-1">
          <h5 className="text-body-md font-bold text-on-surface">Settings Saved Successfully</h5>
          <p className="text-label-md text-on-surface-variant">System configurations have been updated globally.</p>
        </div>
        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface" data-icon="close" onClick={() => setShowToast(false)}>close</button>
      </div>
    </EnterpriseLayout>
  );
}
