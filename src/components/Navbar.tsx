import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Galerie", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Localisation", href: "#location" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#home" className="text-xl font-display font-bold text-gradient-gold tracking-tight">
          PRINT<span className="text-secondary-foreground">PRO</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+237600000000">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold">
              <Phone className="w-4 h-4 mr-2" />
              Appelez-nous
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-secondary-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary border-t border-border/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-secondary-foreground/70 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a href="tel:+237600000000">
                <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Appelez-nous
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
