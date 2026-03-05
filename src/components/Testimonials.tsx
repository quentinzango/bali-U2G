import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_BG } from "@/lib/constants";

const Testimonials = () => {
  return (
    <section
      id="temoignages"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src={TESTIMONIALS_BG}
          alt=""
          className="w-full h-full object-cover object-center md:object-cover lg:object-cover"
          aria-hidden
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/og-image.jpg";
          }}
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mt-3">
            Ce que disent nos clients
          </h2>
          <p className="text-secondary-foreground/70 mt-4 max-w-lg mx-auto">
            La satisfaction de nos clients est notre priorité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/20 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <Quote className="w-10 h-10 text-primary/70 mb-4 group-hover:text-primary transition-colors" />
              <p className="text-secondary-foreground text-sm leading-relaxed mb-6 line-clamp-4">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/og-image.jpg";
                  }}
                />
                <div>
                  <p className="font-display font-semibold text-secondary-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-secondary-foreground/80">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
