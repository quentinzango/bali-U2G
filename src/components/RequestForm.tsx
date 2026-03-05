import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT, CONTACT_BG } from "@/lib/constants";

const defaultServiceOptions = [
  "Impression Laser",
  "Personnalisation d'Objets",
  "Impression de Bâches",
  "Roll-Up",
  "Sérigraphie",
];

const RequestForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    description: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { data: services } = useQuery({
    queryKey: ["public-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const serviceOptions = services?.map((s) => s.title) ?? defaultServiceOptions;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildMessage = () => {
    return `Bonjour Univers des Gadgets! Je suis ${form.name}.\n\nService: ${form.service}\nDescription: ${form.description}\nTéléphone: ${form.phone}\nEmail: ${form.email}`;
  };

  const handleWhatsApp = () => {
    if (!form.name || !form.phone || !form.service) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${CONTACT.whatsappNumber}?text=${msg}`, "_blank");
  };

  const handleEmail = () => {
    if (!form.name || !form.email || !form.service) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Demande de service: ${form.service}`);
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Image de fond — chemins: public/images/contact-bg.jpg */}
      <div className="absolute inset-0">
        <img
          src={CONTACT_BG}
          alt=""
          className="w-full h-full object-cover object-center sm:object-center md:object-cover lg:object-cover"
          aria-hidden
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/og-image.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/30 to-secondary/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête — texte blanc pour visibilité maximale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-3"
          >
            Contactez-nous
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2 drop-shadow-lg">
            Demandez un Devis
          </h2>
          <p className="text-white/90 mt-4 max-w-xl mx-auto text-lg drop-shadow-md">
            Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Colonne gauche — infos contact */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-2xl h-full flex flex-col justify-center">
              <p className="text-white text-lg mb-8 leading-relaxed">
                Vous pouvez aussi nous contacter directement via WhatsApp ou par email.
                Notre équipe est à votre écoute pour concrétiser vos projets.
              </p>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>{CONTACT.address}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a href={`tel:${CONTACT.phoneTel}`} className="text-white hover:text-primary transition-colors">
                    {CONTACT.phoneDisplay}
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href={`https://wa.me/${CONTACT.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    WhatsApp: {CONTACT.whatsappDisplay}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite — formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-2xl blur opacity-60" />
            <div className="relative bg-white/98 dark:bg-background/98 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-2xl border-2 border-primary/20">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    animate={focusedField === "name" ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">Nom *</label>
                    <Input
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      maxLength={100}
                      className="h-12 border-2 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                    />
                  </motion.div>
                  <motion.div
                    animate={focusedField === "phone" ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">Téléphone *</label>
                    <Input
                      placeholder="+237..."
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      maxLength={20}
                      className="h-12 border-2 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                    />
                  </motion.div>
                </div>

                <motion.div
                  animate={focusedField === "email" ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    maxLength={255}
                    className="h-12 border-2 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                  />
                </motion.div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Type de service *</label>
                  <Select onValueChange={(val) => handleChange("service", val)}>
                    <SelectTrigger className="h-12 border-2 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl">
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <motion.div
                  animate={focusedField === "description" ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <Textarea
                    placeholder="Décrivez votre projet..."
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField(null)}
                    maxLength={1000}
                    className="border-2 border-muted focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all resize-none"
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleEmail}
                    size="lg"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold hover:shadow-gold/70 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer par Email
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    size="lg"
                    className="flex-1 bg-[hsl(142,70%,35%)] text-white hover:bg-[hsl(142,70%,30%)] transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Envoyer via WhatsApp
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;
