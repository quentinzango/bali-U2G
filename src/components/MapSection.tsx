import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <section id="location" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Où nous trouver</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Notre Localisation
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <p>2MRV+6V6, Douala — Cameroun</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-elegant"
        >
          <iframe
            title="Univers des Gadgets - Douala"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.7!3d4.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z2MRV+6V6!5e0!3m2!1sfr!2scm!4v1700000000000!5m2!1sfr!2scm"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
