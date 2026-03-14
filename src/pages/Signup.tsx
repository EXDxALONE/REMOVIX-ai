import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Mail, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <span className="font-display text-secondary font-semibold">A</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-light text-foreground">Join AIdea</h1>
          <p className="text-muted-foreground font-body mt-2">Create your verified account</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-primary" : s < step ? "w-8 bg-primary/50" : "w-8 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-premium gold-dust-border">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
            >
              <div className="space-y-2">
                <Label htmlFor="username" className="font-body text-sm text-foreground">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="username" placeholder="Choose a username" className="pl-10 h-12 rounded-xl bg-background font-body" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-body text-sm text-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10 h-12 rounded-xl bg-background font-body" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-sm text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12 rounded-xl bg-background font-body" />
                </div>
              </div>
              <Button variant="gold" size="lg" className="w-full" type="submit">Continue</Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
              onSubmit={(e) => { e.preventDefault(); setStep(3); }}
            >
              <div className="space-y-2">
                <Label htmlFor="password" className="font-body text-sm text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    className="pr-10 h-12 rounded-xl bg-background font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-body text-sm text-foreground">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="h-12 rounded-xl bg-background font-body" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1" type="button" onClick={() => setStep(1)}>Back</Button>
                <Button variant="gold" size="lg" className="flex-1" type="submit">Continue</Button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Identity Verification</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Upload your Government ID and a selfie for verification. 
                  This keeps our community safe and trusted.
                </p>
              </div>
              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-body text-muted-foreground">
                  📄 Upload Government ID
                </button>
                <button className="w-full p-4 rounded-xl border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-body text-muted-foreground">
                  📸 Take a Selfie
                </button>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button variant="gold" size="lg" className="flex-1">Complete</Button>
              </div>
            </motion.div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm font-body text-muted-foreground">
              Already a member?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
