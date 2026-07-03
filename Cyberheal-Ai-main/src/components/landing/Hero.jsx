import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-center">
        {/* Hero Content */}
        <div className="lg:col-span-6 space-y-stack-lg transition-all duration-1000 opacity-100 translate-y-0">
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
                <img className="w-full h-full object-cover" alt="Close up headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVx7GjWD4Pzi0NC4-g4ydzvNjTEcl2d1KoY2wsBUsCndw9NOSq2yqRoZvStqSfzQz4IyrgzMiUUvNl8WbjAVzZEf535MYIgmaA0h24UOFV3ohCy4qQnO0h_eNTeuaCWDQj9siZvs0vTEwuYViHkEiKiWHCoIR5O2AbnwUIgcVa2euWv9ObDmEbPnHYhum4BKnFI0Rsiu3AO1EN0BYLYUnJNkdjlTBWRqQrPfx4-vJUjEujt3BoM7WJ"/>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-300 overflow-hidden">
                <img className="w-full h-full object-cover" alt="Macro portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB0_uVCze9WJXebqrw9pXPYHZB4nH3-80ab0z-4I3PwUEmzPOsT0cBi0eg_gwr8ZVNihzPUtQKvZuit8w2bvbRzXyDJEA6XnNfNvdVLpWc3Edoo9dgZdf5BEwkfaF_2_WQ9Zi0FsM_GtBjKG_S-I-I4HPbly-WpVWk_aPKFMk6jtIN7qM9BW60T9-mIY2mEzY6A6qjqddPJHUM5TGk_zjTDfPk-Qznozgb9UWUzDSh_V273oqlvL6L"/>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-slate-400 overflow-hidden">
                <img className="w-full h-full object-cover" alt="Diverse young woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpvIEaIreCcJEvw4TPJwbNJKcA7fXsX3PxASTudeQVd3kpmt6-19PB7E3ME71LC0Girjtv8oCTkTAAPx-5KVV1s1BZARXQGnFpla0vr0jI0CisVndiVhR52OQ9yEN_NrdoXSlqKS2eqqEkztaANwExUFBWxOvPK5MTV9WcRkPBHPIegILPmtoDnIuLqrO49Gls86lNJF4LqZ8U9bxvrgILfQFF-oAnYxsGzqlVNTTW05T5NLRcR0Or"/>
              </div>
            </div>
            <div className="text-on-surface-variant font-label-md text-label-md">
              <span className="font-bold text-on-surface">500+</span> Global Enterprises Protected
            </div>
          </div>
        </div>
        {/* Hero Illustration / Visualization */}
        <div className="lg:col-span-6 relative transition-all duration-1000 opacity-100 translate-y-0">
          <div className="relative z-10 p-4">
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 glow-effect overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
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
                  <img className="w-full h-full object-contain drop-shadow-2xl" alt="3D visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy45ZSw-1qQTqb3jgohhV5zvv5Gr7JQEk0qjyqOpN1TIy6fs18v8JXFRoHpvuJ5CvK6zQyY6hyGROmobdcNgtnUhAlHQ3rjPlD6N6DarBGeEpy5LQSSQZmDhOIF6RWe6fOfBE2dyYIOFWjAS5Yk7WoEXOhomuKYfhV7xZyMfsi5w8S-PLyajmpDu7Z14OgTqVH5wQmcYl7E0OJNxZdejhCb7RZ8cLWcfIWy6vKaHChBEjxUt2XBnp4"/>
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
  )
}
