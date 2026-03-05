import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["public-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("title", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const displayServices = services && services.length > 0
    ? services
    : [
        { id: "fallback-1", title: "Impression Laser", description: "Documents, flyers, cartes de visite et plus.", image_url: "/og-image.jpg" },
        { id: "fallback-2", title: "Personnalisation d'Objets", description: "Mugs, t-shirts, casquettes et articles promotionnels.", image_url: "/og-image.jpg" },
        { id: "fallback-3", title: "Impression de Bâches", description: "Bâches grand format pour événements et publicité.", image_url: "/og-image.jpg" },
        { id: "fallback-4", title: "Roll-Up", description: "Supports roll-up professionnels pour salons et expositions.", image_url: "/og-image.jpg" },
        { id: "fallback-5", title: "Sérigraphie", description: "Impression sérigraphique sur textile, haute durabilité.", image_url: "/og-image.jpg" },
      ];

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
        </motion.div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Chargement des services...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, i) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative alibaba-image-card rounded-2xl overflow-hidden bg-card cursor-pointer border border-border/40 shadow-lg hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={service.image_url || "/og-image.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                      <span className="flex items-center gap-2 text-white font-medium">
                        Voir les réalisations
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 rounded-b-2xl bg-card">
                    <h3 className="text-lg font-display font-semibold text-gradient-gold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
