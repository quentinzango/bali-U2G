import { motion } from "framer-motion";
import serviceLaser from "@/assets/service-laser.jpg";
import serviceCustom from "@/assets/service-custom.jpg";
import serviceBanner from "@/assets/service-banner.jpg";
import serviceRollup from "@/assets/service-rollup.jpg";
import serviceScreen from "@/assets/service-screen.jpg";

const services = [
  {
    title: "Impression Laser",
    description: "Documents, flyers, cartes de visite et plus avec une qualité d'impression supérieure.",
    image: serviceLaser,
  },
  {
    title: "Personnalisation d'Objets",
    description: "Mugs, t-shirts, casquettes et articles promotionnels à votre image.",
    image: serviceCustom,
  },
  {
    title: "Impression de Bâches",
    description: "Bâches grand format pour événements, publicité extérieure et signalétique.",
    image: serviceBanner,
  },
  {
    title: "Roll-Up",
    description: "Supports roll-up professionnels pour salons, expositions et présentations.",
    image: serviceRollup,
  },
  {
    title: "Sérigraphie",
    description: "Impression sérigraphique sur textile et supports variés, haute durabilité.",
    image: serviceScreen,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Ce que nous faisons</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Nos Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Des solutions d'impression professionnelles adaptées à tous vos besoins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-elegant bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-card-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
