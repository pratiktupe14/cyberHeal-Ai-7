export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 pt-20 pb-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-stack-lg mb-16">
          <div className="col-span-2 space-y-stack-md">
            <div className="flex items-center gap-stack-sm mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
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
  )
}
