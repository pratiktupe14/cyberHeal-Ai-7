import React from 'react';
import { Link } from 'react-router-dom';

export default function EnterpriseLayout({ children }) {
  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      <aside className="fixed left-0 top-0 h-full w-[260px] hidden md:flex flex-col bg-surface/80 backdrop-blur-md shadow-sm z-50 transition-all border-r border-outline-variant/30">
<div className="flex flex-col gap-unit py-stack-lg h-full">
<div className="px-6 mb-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">CyberHeal AI</h1>
<p className="text-on-surface-variant text-label-md">V2.0 Enterprise</p>
</div>
<nav className="flex-1 px-4 space-y-1">
{/* Dashboard Active */}
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-primary/5 transition-all" to="/dashboard">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body-md text-body-md">Dashboard</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="/logs">
<span className="material-symbols-outlined" data-icon="security">security</span>
<span className="font-body-md text-body-md">Incidents</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="#">
<span className="material-symbols-outlined" data-icon="monitor_heart">monitor_heart</span>
<span className="font-body-md text-body-md">Live Monitoring</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="/agents">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
<span className="font-body-md text-body-md">AI Agents</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-body-md text-body-md">Threat Analytics</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="#">
<span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
<span className="font-body-md text-body-md">Logs</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="#">
<span className="material-symbols-outlined" data-icon="description">description</span>
<span className="font-body-md text-body-md">Reports</span>
</Link>
</nav>
<div className="px-6 py-4 mt-auto border-t border-outline-variant/30">
<div className="flex items-center gap-2 mb-4">
<div className="w-2 h-2 rounded-full bg-tertiary status-pulse"></div>
<span className="text-label-md font-medium text-tertiary">System Status: Active</span>
</div>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" to="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body-md text-body-md">Settings</span>
</Link>
</div>
</div>
</aside>
      <div className="md:ml-[260px] flex flex-col min-h-screen">
        <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop">
<div className="flex items-center gap-gutter flex-1">
<div className="relative w-full max-w-md hidden md:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search threats, agents, or logs..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="help">help</span>
</button>
<div className="h-8 w-px bg-outline-variant mx-2"></div>
<div className="flex items-center gap-3 pl-2">
<div className="text-right hidden sm:block">
<p className="text-body-md font-bold text-on-surface">Admin</p>
<p className="text-label-md text-on-surface-variant">Security Lead</p>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border-2 border-surface shadow-sm">
<img className="w-full h-full object-cover" data-alt="Close-up portrait of a professional technology administrator with short dark hair, wearing glasses and a focused expression. The background is a blurred corporate office with soft blue and white lighting, maintaining a clean enterprise aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6dwoP9SeI1UQhAAkRXAR426tKNBeSGuHRMDDAYv_Hw9FUxxi3_Ep7Qub9vuveSF2nZkwDK4OXb2xJfbfb8hCDex8qCcNLKk9h2pOP9stGrX6bZeOgmp4hL2FoUIutlX1xEzyp0rV8gk1-Cr6OeGJhgbPaygQkuQrVs-A376zjVkovIu0XLVmg4MvHF61emU0bx1PcAns_SLYdiLTKxu8x3Nv_UfTTtGWyrtV9hvaGxejfSnBVRFvm"/>
</div>
</div>
</div>
</header>
        {children}
      </div>
    </div>
  );
}
