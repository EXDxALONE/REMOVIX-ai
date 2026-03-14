import { motion } from "framer-motion";
import { MessageCircle, Phone, Video, Users, Shield, Lock, Image, MapPin } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Encrypted Chat",
    description: "End-to-end encrypted messaging with read receipts, chat lock, and unlimited messages.",
  },
  {
    icon: Phone,
    title: "Voice Calls",
    description: "Crystal-clear encrypted voice calls at ₹10/min with automatic wallet deduction.",
  },
  {
    icon: Video,
    title: "Video Rooms",
    description: "HD video calls and study rooms at ₹20/min. Screen sharing and collaborative spaces.",
  },
  {
    icon: Users,
    title: "Communities",
    description: "Create public or private groups with voice channels, video rooms, and admin tools.",
  },
  {
    icon: Shield,
    title: "ID Verified",
    description: "Government ID and photo verification ensures every member is real and accountable.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Chat lock, optional permissions, and strict moderation keep your conversations safe.",
  },
  {
    icon: Image,
    title: "Media Sharing",
    description: "Share photos with daily limits. Upgrade your plan for more sharing capacity.",
  },
  {
    icon: MapPin,
    title: "Location Sharing",
    description: "Share your location with permission-based controls and full privacy respect.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
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
            className="text-sm font-body text-primary font-medium uppercase tracking-wider"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-light text-foreground mt-3 mb-4"
          >
            Everything you need,
            <br />nothing you don't.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-body"
          >
            A carefully curated set of features designed for meaningful communication.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-card gold-dust-border hover:shadow-card transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
