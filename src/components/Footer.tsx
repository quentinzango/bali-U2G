import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-bold text-gradient-gold tracking-tight mb-4">
              PRINT<span className="text-secondary-foreground">PRO</span>
            </h3>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Votre partenaire d'impression professionnelle à Douala. 
              Qualité, rapidité et créativité au service de vos projets.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/60">
              <li>Impression Laser</li>
              <li>Personnalisation d'Objets</li>
              <li>Impression de Bâches</li>
              <li>Roll-Up</li>
              <li>Sérigraphie</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-secondary-foreground/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Bali, Douala — Cameroun</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contact@printpro-douala.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/10 text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} PrintPro Douala. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
