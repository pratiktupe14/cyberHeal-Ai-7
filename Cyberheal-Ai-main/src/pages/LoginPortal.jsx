import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPortal() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <div className="flex flex-col md:flex-row min-h-screen w-full">
<!-- Left Section: Branding & Info -->
<section className="hidden md:flex md:w-1/2 bg-surface-container-low p-12 lg:p-24 flex-col justify-between relative overflow-hidden">
<!-- Background Decoration (Grid/Pattern) -->
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "radial-gradient(#004ac6 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
<div className="relative z-10">
<!-- Branding -->
<div className="flex items-center gap-3 mb-16">
<div className="w-10 h-10 bg-primary-container text-white flex items-center justify-center rounded-lg shadow-lg">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span>
</div>
<span className="text-2xl font-black tracking-tight text-on-surface">CyberHeal AI&nbsp;</span>
</div>
<!-- Hero Content -->
<div className="max-w-xl">
<h1 className="text-5xl font-black leading-tight tracking-tight text-on-surface mb-6">
                        Secure Access to Autonomous <span className="text-primary-container">Cyber Defense</span>
</h1>
<p className="text-lg text-on-surface-variant leading-relaxed mb-10">
                        Empowering SOC teams with multi-agent AI for real-time threat detection and autonomous response. Experience the next generation of digital safety.
                    </p>
<!-- Feature List -->
<div className="space-y-6">
<div className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
<span className="material-symbols-outlined">radar</span>
</div>
<span className="font-semibold text-on-surface">AI-Powered Threat Detection</span>
</div>
<div className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
<span className="material-symbols-outlined">auto_fix_high</span>
</div>
<span className="font-semibold text-on-surface">Autonomous Incident Response</span>
</div>
<div className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
<span className="material-symbols-outlined">insights</span>
</div>
<span className="font-semibold text-on-surface">Real-Time Monitoring</span>
</div>
<div className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
<span className="material-symbols-outlined">verified_user</span>
</div>
<span className="font-semibold text-on-surface">Enterprise-Grade Security</span>
</div>
<div className="flex items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
<span className="material-symbols-outlined">hub</span>
</div>
<span className="font-semibold text-on-surface">Multi-Agent AI Defense</span>
</div>
</div>
</div>
</div>
<!-- Visual Asset Placeholder -->
<div className="mt-20 rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video relative">
<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1u_6zK-tBmzLHGDSwQ4jJYV3ovbISRA7G2J73mwpV9jSZ_mzQ2ganY-uUotRZy5FZIuAIjz9tHnueLevOBmKZSlaKCV8XnIZFl3-SfJdm2g6hmFX0zCgveUC0PSyOH8nZKncDrDrtTiOV6-_EUlLgfquP8Av4nGiTGk6gHs0oBfxfIJAiqF5hY2hVbGGIQWkP_pNECRvg5zfZoI5wI0RgtrNa1d9emRhd9n5JQUAYM1qFQExge27" alt="CyberHeal AI 2.0 Enterprise Security Dashboard" />
</div>
</section>
<!-- Right Section: Login Form -->
<main className="w-full md:w-1/2 flex flex-col bg-white dark:bg-inverse-surface items-center justify-center p-6 lg:p-12 relative">
<!-- Floating Header -->
<div className="absolute top-8 right-8 flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant" id="theme-toggle" onClick={toggleTheme} title="Toggle Light/Dark Mode">
<span className="material-symbols-outlined dark:hidden">dark_mode</span>
<span className="material-symbols-outlined hidden dark:block">light_mode</span>
</button>
</div>
<!-- Login Card Container -->
<div className="w-full max-w-md">
<div className="glass-card p-8 lg:p-10 rounded-[16px] shadow-2xl">
<div className="text-center md:text-left mb-10">
<h2 className="text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
<p className="text-on-surface-variant">Sign in to continue to CyberHeal AI&nbsp;</p>
</div>
<form className="space-y-6" onSubmit={handleLogin}>
<!-- Email -->
<div className="space-y-2">
<label className="text-sm font-semibold text-on-surface ml-1" htmlFor="email">Email address</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
<input className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="email" placeholder="name@company.com" type="email" />
</div>
</div>
<!-- Password -->
<div className="space-y-2">
<div className="flex justify-between items-center px-1">
<label className="text-sm font-semibold text-on-surface" htmlFor="password">Password</label>
<a className="text-xs font-bold text-primary hover:underline" href="#">Forgot Password?</a>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
<input className="w-full pl-12 pr-12 py-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} />
<button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" onClick={togglePassword} type="button">
<span className="material-symbols-outlined" id="pw-icon">{showPassword ? "visibility_off" : "visibility"}</span>
</button>
</div>
</div>
<!-- Remember & Meta -->
<div className="flex items-center gap-2">
<input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" id="remember" type="checkbox" />
<label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember this device</label>
</div>
<!-- Primary CTA -->
<button className="w-full bg-primary-container text-white py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            Sign In
                            <span className="material-symbols-outlined">login</span>
</button>
<!-- Divider -->
<div className="flex items-center gap-4 py-2">
<div className="h-px grow bg-outline-variant"></div>
<span className="text-xs font-bold text-outline uppercase tracking-widest">Or continue with</span>
<div className="h-px grow bg-outline-variant"></div>
</div>
<!-- Social Auth -->
<div className="grid grid-cols-2 gap-4">
<button className="flex items-center justify-center gap-3 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-semibold text-on-surface text-sm">
<svg className="w-5 h-5" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
</svg>
                                Google
                            </button>
<button className="flex items-center justify-center gap-3 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-semibold text-on-surface text-sm">
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
</svg>
                                GitHub
                            </button>
</div>
</form>
<div className="mt-10 text-center">
<p className="text-on-surface-variant text-sm">
                            Don't have an account? 
                            <a className="text-primary font-bold hover:underline ml-1" href="#">Sign Up</a>
</p>
</div>
</div>
<!-- Trust Badges & Links -->
<div className="mt-8 flex flex-col items-center gap-6">
<div className="flex items-center gap-6 opacity-60">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm">encrypted</span>
<span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">SSL Encrypted</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm">verified</span>
<span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Secure Login</span>
</div>
</div>
<div className="flex gap-4 text-xs font-medium text-outline">
<a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<span className="">•</span>
<a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
<span className="">•</span>
<a className="hover:text-primary transition-colors" href="#">Contact Support</a>
</div>
</div>
</div>
<!-- Subtle background blob -->
<div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -z-10 translate-x-1/2 translate-y-1/2"></div>
</main>
</div>
        </div>
    );
}
