import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                <span className="font-display text-secondary font-semibold text-sm">A</span>
              </div>
              <span className="font-display text-2xl font-light text-secondary-foreground">AIdea</span>
            </div>
            <p className="text-sm text-secondary-foreground/60 font-body leading-relaxed">
              India's premium verified communication platform.
            </p>
          </div>
          <div>
            <h4 className="font-body font-medium text-sm mb-4 text-secondary-foreground/80 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm font-body text-secondary-foreground/60">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="#community" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-medium text-sm mb-4 text-secondary-foreground/80 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm font-body text-secondary-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-medium text-sm mb-4 text-secondary-foreground/80 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm font-body text-secondary-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/40 font-body">
            © 2026 AIdea. All rights reserved. Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
