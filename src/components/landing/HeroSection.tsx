import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Zap, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden pt-16">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium neon-border">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Background Removal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground mb-6"
          >
            Remove backgrounds
            <br />
            <span className="text-gradient">in seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload any image and get a clean, transparent background instantly.
            Powered by advanced AI for pixel-perfect results every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="gradient" size="xl" asChild>
              <Link to="/signup">
                <Upload className="w-5 h-5" />
                Start Removing — Free
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground font-body"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan" />
              <span>&lt;5s Processing</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span>HD Downloads</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>5 Free Images/Day</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
