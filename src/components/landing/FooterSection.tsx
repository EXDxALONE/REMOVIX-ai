import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-card border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="font-display text-white font-bold text-sm">R</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Removix <span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              AI-powered background removal platform. Fast, accurate, and easy to use.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-foreground/80 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-foreground/80 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-sm mb-4 text-foreground/80 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-body">
            © 2026 Removix AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
