import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const rooms = [
  { name: "UPSC Prep", members: 1240, icon: BookOpen, active: true },
  { name: "JEE Advanced", members: 890, icon: BookOpen, active: false },
  { name: "Music Lounge", members: 340, icon: Headphones, active: true },
  { name: "Book Club", members: 560, icon: Users, active: false },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-body text-primary font-medium uppercase tracking-wider"
            >
              Study Halls
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-light text-foreground mt-3 mb-6"
            >
              Your digital
              <br />study sanctuary.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-lg leading-relaxed mb-8"
            >
              Join curated study halls and community rooms. Collaborate with verified 
              peers in voice and video rooms designed for focused learning.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="gold" size="lg" asChild>
                <Link to="/signup">Explore Halls</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {rooms.map((room, i) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between p-4 rounded-2xl bg-background gold-dust-border shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <room.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-foreground">{room.name}</h4>
                    <p className="text-sm text-muted-foreground font-body">{room.members.toLocaleString()} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {room.active && (
                    <span className="flex items-center gap-1.5 text-xs font-body text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-gold-pulse" />
                      Live
                    </span>
                  )}
                  <Button variant="outline" size="sm">Join</Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
