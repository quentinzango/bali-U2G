import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAROUSEL_SLIDES } from "@/lib/constants";

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Diaporama - Services d'impression à Douala"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={CAROUSEL_SLIDES[current].image}
            alt={`Slide ${current + 1} - ${CAROUSEL_SLIDES[current].message}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/og-image.jpg";
            }}
          />
          <div className="absolute inset-0 bg-secondary/60" />
        </motion.div>
      </AnimatePresence>

      {/* Flèches de défilement */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                <span className="text-gradient-gold">Univers</span> des{" "}
                <span className="text-secondary-foreground">Gadgets</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-foreground mb-8">
                {CAROUSEL_SLIDES[current].message}
              </p>
              <Button size="lg" className="group" asChild>
                <a
                  href={CAROUSEL_SLIDES[current].buttonLink}
                  className="flex items-center justify-center"
                >
                  {CAROUSEL_SLIDES[current].buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Indicateurs */}
          <div className="mt-12 flex gap-2">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-secondary-foreground/40 hover:bg-secondary-foreground/60"
                }`}
                aria-label={`Voir slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
