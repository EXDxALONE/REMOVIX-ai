import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Wand2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Upload Your Image",
    description: "Drag and drop or click to upload. Supports JPG, PNG, and WEBP up to 10MB.",
  },
  {
    num: "02",
    icon: Wand2,
    title: "AI Removes Background",
    description: "Our AI processes your image in seconds, detecting edges with pixel-perfect accuracy.",
  },
  {
    num: "03",
    icon: Download,
    title: "Download Result",
    description: "Preview the before/after comparison and download your transparent PNG instantly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-body text-primary font-semibold uppercase tracking-wider"
          >
            How it Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-bold text-foreground mt-3 mb-4"
          >
            Three simple steps to
            <br /><span className="text-gradient">clean backgrounds.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-premium">
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-body font-bold text-primary uppercase tracking-widest mb-2 block">
                Step {step.num}
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 text-border">
                  <svg viewBox="0 0 24 8" fill="none" className="w-full">
                    <path d="M0 4h20m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="gradient" size="lg" asChild>
            <Link to="/signup">Try It Now — Free</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
