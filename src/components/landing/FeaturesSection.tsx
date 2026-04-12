import { motion } from "framer-motion";
import { Zap, Shield, Image, Download, Sparkles, Code, CreditCard, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Remove backgrounds in under 5 seconds with our AI pipeline. No waiting.",
  },
  {
    icon: Sparkles,
    title: "Pixel-Perfect AI",
    description: "Advanced edge detection preserves hair, fur, and complex details flawlessly.",
  },
  {
    icon: Image,
    title: "Any Format",
    description: "Support for JPG, PNG, and WEBP. Up to 10MB and 5000×5000 resolution.",
  },
  {
    icon: Download,
    title: "HD Downloads",
    description: "Download full-resolution transparent PNGs. No watermarks on any plan.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Images auto-delete after 24 hours. Your files are never stored permanently.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with rate limiting, usage tracking, and comprehensive docs.",
  },
  {
    icon: CreditCard,
    title: "Flexible Pricing",
    description: "Free tier with 5 images/day. Pro plans and credit packs for power users.",
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Upload multiple images and process them all at once. Save hours of work.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-body text-primary font-semibold uppercase tracking-wider"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-bold text-foreground mt-3 mb-4"
          >
            Everything you need for
            <br /><span className="text-gradient">perfect results.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-body text-lg"
          >
            Professional background removal made simple for everyone.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl glass-card hover:neon-border hover:shadow-premium transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:glow-blue transition-all">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
