import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT } from "@/lib/constants";
import { ABOUT_BG } from "@/lib/constants";

const APropos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero section avec image de fond */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={ABOUT_BG}
              alt="Univers des Gadgets - À propos"
              className="w-full h-full object-cover object-center sm:object-center md:object-cover lg:object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/og-image.jpg";
              }}
            />
            <div className="absolute inset-0 bg-secondary/85" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-gold mb-4">
              À propos
            </h1>
            <p className="text-xl text-secondary-foreground/90 max-w-2xl mx-auto">
              Univers des Gadgets — Votre partenaire d'impression à Douala
            </p>
          </motion.div>
        </section>

        {/* Contenu */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Qui sommes-nous ?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong>Univers des Gadgets</strong> est une entreprise spécialisée dans l'impression
                laser, la gravure et la personnalisation d'objets à Douala, au Cameroun. Depuis
                notre création, nous accompagnons entreprises et particuliers dans leurs projets
                d'impression : documents professionnels, supports promotionnels, bâches, roll-up,
                sérigraphie et personnalisation d'articles.
              </p>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6 mt-12">
                Notre mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Offrir une qualité professionnelle, des délais respectés et un service personnalisé
                à chaque client. Nous mettons notre expertise et notre créativité au service de vos
                projets, qu'ils soient modestes ou ambitieux.
              </p>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6 mt-12">
                Nos valeurs
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li>Qualité et durabilité</li>
                <li>Écoute et personnalisation</li>
                <li>Rapidité et fiabilité</li>
                <li>Créativité et innovation</li>
              </ul>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6 mt-12">
                Contactez-nous
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>{CONTACT.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-primary transition-colors">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
