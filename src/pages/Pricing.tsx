import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Image, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";

const plans = [
  {
    name: "Silver",
    price: "₹199",
    period: "/month",
    photos: "10 photos/day",
    features: [
      "Unlimited messaging",
      "10 photos per day",
      "Voice calls at ₹10/min",
      "Video calls at ₹20/min",
      "Join public communities",
      "Basic support",
    ],
    popular: false,
  },
  {
    name: "Gold",
    price: "₹499",
    period: "/month",
    photos: "20 photos/day",
    features: [
      "Everything in Silver",
      "20 photos per day",
      "Priority voice/video",
      "Create private groups",
      "Screen sharing in calls",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Diamond",
    price: "₹999",
    period: "/month",
    photos: "40 photos/day",
    features: [
      "Everything in Gold",
      "40 photos per day",
      "HD video quality",
      "Admin moderation tools",
      "Custom community branding",
      "Dedicated support",
    ],
    popular: false,
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
              className="text-sm font-body text-primary font-medium uppercase tracking-wider"
            >
              Membership
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-display font-light text-foreground mt-3 mb-4"
            >
              Choose your plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-lg"
            >
              Free members get 3 photos per day. Upgrade for more.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-secondary text-secondary-foreground shadow-premium gold-dust-border"
                    : "bg-card text-foreground gold-dust-border shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-gold text-secondary text-xs font-body font-medium">
                      <Crown className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-medium mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-light">{plan.price}</span>
                    <span className={`text-sm font-body ${plan.popular ? "text-secondary-foreground/60" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Image className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-body text-primary font-medium">{plan.photos}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className={`text-sm font-body ${plan.popular ? "text-secondary-foreground/80" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "gold" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/signup">Get {plan.name}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Call rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <div className="bg-card rounded-2xl p-6 gold-dust-border shadow-card">
              <h3 className="font-display text-xl text-foreground mb-3">Pay-per-minute calling</h3>
              <div className="flex items-center justify-center gap-8 text-sm font-body text-muted-foreground">
                <div>
                  <span className="font-mono text-lg text-foreground">₹10</span>
                  <span className="text-muted-foreground">/min voice</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <span className="font-mono text-lg text-foreground">₹20</span>
                  <span className="text-muted-foreground">/min video</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-3">
                Deducted from your wallet. Top up anytime via UPI.
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
