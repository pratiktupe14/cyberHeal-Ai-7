import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 20) {
          nav.classList.add('shadow-md');
        } else {
          nav.classList.remove('shadow-md');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
      if (!el.classList.contains('opacity-100')) {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
        el.classList.remove('opacity-100', 'translate-y-0');
      }
      observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      animatedElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
<nav className="sticky top-0 w-full z-50 glass-header border-b border-outline-variant/30">
<div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
<div className="flex items-center gap-stack-sm">
<div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container shadow-sm">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1", }}>security</span>
</div>
<span className="font-headline-md text-headline-md font-bold text-primary">CyberHeal AI</span>
</div>
<div className="hidden md:flex items-center gap-stack-lg">
<a className="font-label-md text-label-md text-primary font-bold" href="#">Solutions</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Agents</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Enterprise</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
</div>
<div className="flex items-center gap-stack-md">
<button className="hidden sm:block font-label-md text-label-md text-primary px-4 py-2 hover:bg-surface-container transition-all rounded-lg">Sign In</button>
<button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all">
                    Get Started
                </button>
</div>
</div>
</nav>
<main className="relative overflow-hidden hero-gradient">
{/* Hero Section */}
<section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-32">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-center">
{/* Hero Content */}
<div className="lg:col-span-6 space-y-stack-lg">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/20 text-on-secondary-container rounded-full border border-secondary-container/30">
<span className="flex h-2 w-2 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-mono-label text-mono-label uppercase tracking-wider">Version 2.0 Live Now</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-background tracking-tight">
                        The Future of <span className="text-primary italic">Autonomous</span> Cyber Defense
                    </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                        CyberHeal AI 2.0 leverages multi-agent intelligence to predict, neutralize, and recover from sophisticated threats in milliseconds. Defend your enterprise with an immune system that never sleeps.
                    </p>
<div className="flex flex-col sm:flex-row gap-stack-md pt-stack-sm">
<button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-on-primary px-8 py-4 rounded-xl font-headline-sm text-headline-sm shadow-xl hover:shadow-primary/20 transition-all group">
                            Get Started Free
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<button className="flex items-center justify-center gap-2 bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface px-8 py-4 rounded-xl font-headline-sm text-headline-sm transition-all shadow-sm">
<span className="material-symbols-outlined text-primary">play_circle</span>
                            Live Demo
                        </button>
</div>
<div className="flex items-center gap-stack-lg pt-stack-lg border-t border-outline-variant/20">
<div className="flex -space-x-3">
<div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-200 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Close up headshot of a professional female cybersecurity analyst in a high-tech modern office environment with soft blue accent lighting, looking confident and focused. Corporate minimalist style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVx7GjWD4Pzi0NC4-g4ydzvNjTEcl2d1KoY2wsBUsCndw9NOSq2yqRoZvStqSfzQz4IyrgzMiUUvNl8WbjAVzZEf535MYIgmaA0h24UOFV3ohCy4qQnO0h_eNTeuaCWDQj9siZvs0vTEwuYViHkEiKiWHCoIR5O2AbnwUIgcVa2euWv9ObDmEbPnHYhum4BKnFI0Rsiu3AO1EN0BYLYUnJNkdjlTBWRqQrPfx4-vJUjEujt3BoM7WJ"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-300 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Macro portrait of a male tech lead with glasses, smiling warmly. The background is a clean, bright minimalist tech office with lush greenery and white furniture, creating a trust-focused atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB0_uVCze9WJXebqrw9pXPYHZB4nH3-80ab0z-4I3PwUEmzPOsT0cBi0eg_gwr8ZVNihzPUtQKvZuit8w2bvbRzXyDJEA6XnNfNvdVLpWc3Edoo9dgZdf5BEwkfaF_2_WQ9Zi0FsM_GtBjKG_S-I-I4HPbly-WpVWk_aPKFMk6jtIN7qM9BW60T9-mIY2mEzY6A6qjqddPJHUM5TGk_zjTDfPk-Qznozgb9UWUzDSh_V273oqlvL6L"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-400 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A diverse young woman in professional attire, laughing in a sun-drenched collaborative workspace. Soft focus background featuring high-end architectural details and a professional corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpvIEaIreCcJEvw4TPJwbNJKcA7fXsX3PxASTudeQVd3kpmt6-19PB7E3ME71LC0Girjtv8oCTkTAAPx-5KVV1s1BZARXQGnFpla0vr0jI0CisVndiVhR52OQ9yEN_NrdoXSlqKS2eqqEkztaANwExUFBWxOvPK5MTV9WcRkPBHPIegILPmtoDnIuLqrO49Gls86lNJF4LqZ8U9bxvrgILfQFF-oAnYxsGzqlVNTTW05T5NLRcR0Or"/>
</div>
</div>
<div className="text-on-surface-variant font-label-md text-label-md">
<span className="font-bold text-on-surface">500+</span> Global Enterprises Protected
                        </div>
</div>
</div>
{/* Hero Illustration / Visualization */}
<div className="lg:col-span-6 relative">
<div className="relative z-10 p-4">
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 glow-effect overflow-hidden">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1", }}>hub</span>
<span className="font-headline-sm text-headline-sm">Threat Topology</span>
</div>
<div className="flex gap-2">
<div className="h-2 w-12 bg-primary/10 rounded-full overflow-hidden">
<div className="h-full bg-primary w-2/3"></div>
</div>
<div className="h-2 w-12 bg-secondary-container/10 rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-1/2"></div>
</div>
</div>
</div>
<div className="aspect-square relative flex items-center justify-center">
{/* Network Visualization Placeholder */}
<div className="absolute inset-0 bg-[radial-gradient(#e0e3e5_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
<div className="relative w-full h-full flex items-center justify-center">
<img className="w-full h-full object-contain drop-shadow-2xl" data-alt="A sophisticated 3D visualization of a global neural network, featuring intricate glowing blue nodes and connections. The style is ultra-modern and clean with a white-canvas aesthetic, utilizing glassmorphism effects and soft ambient occlusion shadows. The mood is high-tech, precise, and authoritative." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy45ZSw-1qQTqb3jgohhV5zvv5Gr7JQEk0qjyqOpN1TIy6fs18v8JXFRoHpvuJ5CvK6zQyY6hyGROmobdcNgtnUhAlHQ3rjPlD6N6DarBGeEpy5LQSSQZmDhOIF6RWe6fOfBE2dyYIOFWjAS5Yk7WoEXOhomuKYfhV7xZyMfsi5w8S-PLyajmpDu7Z14OgTqVH5wQmcYl7E0OJNxZdejhCb7RZ8cLWcfIWy6vKaHChBEjxUt2XBnp4"/>
{/* Dynamic Badge */}
<div className="absolute top-1/4 right-4 bg-surface/90 backdrop-blur-md p-4 rounded-xl border border-primary/20 shadow-lg animate-bounce duration-[3000ms]">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
</div>
<div>
<div className="text-[10px] font-bold uppercase tracking-tighter text-outline">Threat Isolated</div>
<div className="text-[14px] font-bold text-on-surface">Agent Alpha-7</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Decorative Background Blobs */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
<div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container/10 rounded-full blur-2xl -z-10"></div>
</div>
</div>
</section>
{/* Bento Features Section */}
<section className="bg-surface-container-low py-24">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="text-center mb-16 space-y-stack-sm">
<h2 className="font-headline-lg text-headline-lg text-on-background">Engineered for Complexity</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                        Traditional security is reactive. CyberHeal AI 2.0 is predictive, utilizing a swarm of specialized agents to monitor every packet and process.
                    </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
{/* Large Bento Card */}
<div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-[32px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow group">
<div className="flex flex-col md:flex-row gap-8 items-center">
<div className="flex-1 space-y-stack-md">
<span className="inline-block p-3 bg-primary/10 text-primary rounded-2xl">
<span className="material-symbols-outlined text-[32px]">psychology</span>
</span>
<h3 className="font-headline-md text-headline-md">Self-Evolving AI Agents</h3>
<p className="text-on-surface-variant leading-relaxed">
                                    Our proprietary Multi-Agent System (MAS) allows agents to collaborate, share threat intelligence in real-time, and dynamically restructure defense protocols without human intervention.
                                </p>
<ul className="space-y-2 pt-2">
<li className="flex items-center gap-2 text-on-surface font-label-md">
<span className="material-symbols-outlined text-emerald-500">check_circle</span>
                                        Sub-second response latency
                                    </li>
<li className="flex items-center gap-2 text-on-surface font-label-md">
<span className="material-symbols-outlined text-emerald-500">check_circle</span>
                                        Context-aware behavioral analysis
                                    </li>
</ul>
</div>
<div className="w-full md:w-64 aspect-square rounded-2xl bg-slate-50 overflow-hidden relative border border-outline-variant/20">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A conceptual 3D render of a crystalline neural core glowing with soft blue light. The object is floating in a clean white digital void with light shadows, representing advanced artificial intelligence architecture. Minimalist, premium, corporate tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcN0ljww9rU4BdmvvSfn-OLGrcltHyV_TCKzQokPi4J3am2E6eyzrdwtVdtJNmsFeoV0ycDQwVx-lwzcNymmFCrIZICacHUD1StfyoQ9BFucbWdljCAivNsGNsSvjLl2heYnXIIssg68R3OFiM0SB7em2cZQJ8Ed-DA1dxlifD0s3eW5lqBpy704-hy4To7ksf5Ssjj1U-miqKy6SwuMtZPeg-dYcI4rUkw0Qy1XABRmV_Ffzj3ylE"/>
</div>
</div>
</div>
{/* Small Bento Card */}
<div className="bg-surface-container-lowest p-8 rounded-[32px] border border-outline-variant/30 shadow-sm flex flex-col justify-between group">
<div className="space-y-stack-md">
<span className="inline-block p-3 bg-tertiary-container/10 text-tertiary rounded-2xl">
<span className="material-symbols-outlined text-[32px]">analytics</span>
</span>
<h3 className="font-headline-sm text-headline-sm">Predictive Analytics</h3>
<p className="text-on-surface-variant text-body-md">
                                Anticipate zero-day vulnerabilities before they are exploited using advanced pattern recognition.
                            </p>
</div>
<div className="mt-8 pt-4 border-t border-outline-variant/10">
<div className="flex justify-between items-end">
<div className="text-display-lg text-primary font-bold">99%</div>
<div className="text-on-surface-variant font-label-md pb-2">Accuracy Rate</div>
</div>
</div>
</div>
{/* Small Bento Card 2 */}
<div className="bg-surface-container-lowest p-8 rounded-[32px] border border-outline-variant/30 shadow-sm flex flex-col justify-between">
<div className="space-y-stack-md">
<span className="inline-block p-3 bg-secondary-container/10 text-secondary rounded-2xl">
<span className="material-symbols-outlined text-[32px]">terminal</span>
</span>
<h3 className="font-headline-sm text-headline-sm">Automated Recovery</h3>
<p className="text-on-surface-variant text-body-md">
                                Instantaneous state restoration ensuring zero downtime even during major incidents.
                            </p>
</div>
<div className="mt-8 flex gap-2">
<div className="h-1 w-full bg-primary rounded-full"></div>
<div className="h-1 w-full bg-primary/20 rounded-full"></div>
<div className="h-1 w-full bg-primary/20 rounded-full"></div>
</div>
</div>
{/* Medium Bento Card */}
<div className="md:col-span-2 bg-primary text-on-primary p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
<div className="relative z-10 flex flex-col justify-between h-full">
<div className="space-y-stack-md max-w-md">
<h3 className="font-headline-md text-headline-md">Enterprise-Grade Resilience</h3>
<p className="text-on-primary/80 leading-relaxed">
                                    Deployed across the world's most critical infrastructures, from financial hubs to power grids. Experience the gold standard of autonomous defense.
                                </p>
</div>
<div className="mt-8 flex items-center gap-stack-md">
<button className="bg-surface text-primary px-6 py-3 rounded-xl font-bold hover:bg-surface-container transition-all">Explore Enterprise</button>
<span className="material-symbols-outlined animate-pulse text-[40px] opacity-40">security_update_good</span>
</div>
</div>
{/* Background decoration */}
<div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
</div>
</div>
</div>
</section>
{/* Dynamic Trust Bar */}
<section className="py-16 border-y border-outline-variant/30">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden">
<div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
<p className="font-mono-label text-mono-label text-outline whitespace-nowrap uppercase">Trusted By Leaders</p>
<div className="flex-1 flex justify-between items-center opacity-40 grayscale gap-8 md:gap-0 overflow-x-auto no-scrollbar">
<span className="font-bold text-headline-md">NEXUS</span>
<span className="font-bold text-headline-md italic">QUANTUM</span>
<span className="font-bold text-headline-md tracking-widest">FORGE</span>
<span className="font-bold text-headline-md">APEX</span>
<span className="font-bold text-headline-md">VELOCITY</span>
</div>
</div>
</div>
</section>
{/* Final CTA */}
<section className="py-32 relative">
<div className="max-w-4xl mx-auto px-margin-mobile text-center space-y-stack-lg relative z-10">
<h2 className="font-display-lg text-display-lg text-on-background">Ready to secure your future?</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
                    Join the 500+ enterprises that trust CyberHeal AI 2.0 to protect their mission-critical data.
                </p>
<div className="flex flex-col sm:flex-row justify-center gap-stack-md">
<button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/95 text-on-primary px-10 py-5 rounded-2xl font-headline-sm text-headline-sm shadow-xl active:scale-95 transition-all">
                        Get Started for Free
                    </button>
<button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-10 py-5 rounded-2xl font-headline-sm text-headline-sm transition-all">
                        Talk to an Expert
                    </button>
</div>
</div>
{/* Decorative atmospheric elements */}
<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_rgba(0,74,198,0.05),_transparent_70%)] pointer-events-none"></div>
</section>
</main>
<footer className="bg-surface-container-lowest border-t border-outline-variant/30 pt-20 pb-10">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-stack-lg mb-16">
<div className="col-span-2 space-y-stack-md">
<div className="flex items-center gap-stack-sm mb-4">
<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1", }}>security</span>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-primary">CyberHeal AI</span>
</div>
<p className="text-on-surface-variant max-w-xs">
                        Autonomous multi-agent cyber defense for the modern enterprise. Intelligent, vigilant, authoritative.
                    </p>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6">Product</h4>
<ul className="space-y-4 text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Agents</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6">Company</h4>
<ul className="space-y-4 text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">About</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6">Resources</h4>
<ul className="space-y-4 text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
<li><a className="hover:text-primary transition-colors" href="#">API Reference</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Case Studies</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Whitepapers</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6">Legal</h4>
<ul className="space-y-4 text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Security Policy</a></li>
</ul>
</div>
</div>
<div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-outline-variant/20 gap-4">
<p className="text-on-surface-variant font-label-md text-label-md">© 2024 CyberHeal AI. All rights reserved.</p>
<div className="flex gap-6">
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
</div>
</div>
</div>
</footer>
    </>
  );
}
