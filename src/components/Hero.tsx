import { motion } from "framer-motion";
import { ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-printing.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" aria-label="Section principale - Services d'impression à Douala">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Atelier d'impression professionnel avec machines laser et équipements" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Printer className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Douala — Cameroun</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            <span className="text-gradient-gold">Univers</span> des{" "}
            <span className="text-secondary-foreground">Gadgets</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary-foreground/80 mb-8"
          >
            Impression laser, gravure et personnalisation d'objets à Douala
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="group" asChild>
              <a href="#services" className="flex items-center justify-center">
                Découvrir nos services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact" className="flex items-center justify-center">
                Demander un devis
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 max-w-xs"
          >
            {[
              { value: "500+", label: "Projets réalisés" },
              { value: "100%", label: "Satisfaction client" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-secondary-foreground/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
