import { motion } from "framer-motion";
import { MapPin, Navigation2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

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
            <p>{CONTACT.address}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                if (!navigator.geolocation) {
                  const url =
                    "https://www.google.com/maps/dir/?api=1&destination=4.04053,9.69466";
                  window.open(url, "_blank");
                  return;
                }

                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=4.04053,9.69466`;
                    window.open(url, "_blank");
                  },
                  () => {
                    const url =
                      "https://www.google.com/maps/dir/?api=1&destination=4.04053,9.69466";
                    window.open(url, "_blank");
                  },
                );
              }}
            >
              <Navigation2 className="w-4 h-4" />
              <span>Itinéraire</span>
            </Button>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1989.9!2d9.6938!3d4.0415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be2e1fe43%3A0x5b44e4b8cb81a789!2s2MRV%2B6V6%2C%20Douala!5e0!3m2!1sfr!2scm!4v1700000000000!5m2!1sfr!2scm"
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
