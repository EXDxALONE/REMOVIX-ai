import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Get started with basics",
    features: [
      "5 images per day",
      "Standard resolution",
      "JPG, PNG, WEBP support",
      "Before/after preview",
      "Basic support",
    ],
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For professionals & creators",
    features: [
      "Unlimited images",
      "Full HD resolution",
      "Priority processing",
      "API access (1000 calls/mo)",
      "Batch upload",
      "Priority support",
    ],
    popular: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "₹1,999",
    period: "/month",
    description: "For teams & businesses",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Team management",
    ],
    popular: false,
    icon: Crown,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-body text-primary font-semibold uppercase tracking-wider"
            >
              Pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-display font-bold text-foreground mt-3 mb-4"
            >
              Simple, transparent <span className="text-gradient">pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-lg"
            >
              Start free. Upgrade when you need more.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "glass-card neon-border shadow-premium"
                    : "glass-card shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-primary text-white text-xs font-body font-bold uppercase tracking-wide">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1 text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm font-body text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-body text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/signup">{plan.price === "₹0" ? "Get Started Free" : `Get ${plan.name}`}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Credit packs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <div className="glass-card rounded-2xl p-6 neon-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Pay-per-use Credit Packs</h3>
              <div className="flex items-center justify-center gap-8 text-sm font-body text-muted-foreground">
                <div>
                  <span className="font-mono text-lg text-foreground font-bold">₹99</span>
                  <span className="text-muted-foreground"> / 50 credits</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <span className="font-mono text-lg text-foreground font-bold">₹199</span>
                  <span className="text-muted-foreground"> / 150 credits</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <span className="font-mono text-lg text-foreground font-bold">₹499</span>
                  <span className="text-muted-foreground"> / 500 credits</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-3">
                1 credit = 1 image processed. Credits never expire.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Pricing;
