export default function TrustBar() {
  return (
    <section className="py-16 border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 transition-all duration-1000 opacity-100 translate-y-0">
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
  )
}
