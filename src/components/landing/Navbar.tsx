import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Community", href: "#community" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
            <span className="font-display text-secondary font-semibold text-sm">A</span>
          </div>
          <span className="font-display text-2xl font-light tracking-tight text-foreground">AIdea</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="gold" size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-body text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-body text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="gold" size="sm" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
