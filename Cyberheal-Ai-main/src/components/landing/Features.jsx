export default function Features() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 space-y-stack-sm transition-all duration-1000 opacity-100 translate-y-0">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Engineered for Complexity</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Traditional security is reactive. CyberHeal AI 2.0 is predictive, utilizing a swarm of specialized agents to monitor every packet and process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg transition-all duration-1000 opacity-100 translate-y-0">
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
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Crystalline neural core" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcN0ljww9rU4BdmvvSfn-OLGrcltHyV_TCKzQokPi4J3am2E6eyzrdwtVdtJNmsFeoV0ycDQwVx-lwzcNymmFCrIZICacHUD1StfyoQ9BFucbWdljCAivNsGNsSvjLl2heYnXIIssg68R3OFiM0SB7em2cZQJ8Ed-DA1dxlifD0s3eW5lqBpy704-hy4To7ksf5Ssjj1U-miqKy6SwuMtZPeg-dYcI4rUkw0Qy1XABRmV_Ffzj3ylE"/>
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
  )
}
