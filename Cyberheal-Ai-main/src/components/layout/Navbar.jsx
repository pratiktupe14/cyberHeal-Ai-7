import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 glass-header border-b border-outline-variant/30">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-sm">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
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
          <Link to="/dashboard" className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md font-bold shadow-md active:scale-95 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
