export default function CTA() {
  return (
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-margin-mobile text-center space-y-stack-lg relative z-10 transition-all duration-1000 opacity-100 translate-y-0">
        <h2 className="font-display-lg text-display-lg text-on-background">Ready to secure your future?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Join the 500+ enterprises that trust CyberHeal AI 2.0 to protect their mission-critical data.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-stack-md">
          <button className="bg-primary hover:bg-primary/95 text-on-primary px-10 py-5 rounded-2xl font-headline-sm text-headline-sm shadow-xl active:scale-95 transition-all">
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
  )
}
