import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
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
    window.open(`https://wa.me/237697320490?text=${msg}`, "_blank");
  };

  const handleEmail = () => {
    if (!form.name || !form.email || !form.service) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Demande de service: ${form.service}`);
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:contact@universdegadgets.com?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Contactez-nous</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Demandez un Devis
            </h2>
            <p className="text-secondary-foreground/70 mb-8 max-w-md">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais. 
              Vous pouvez aussi nous contacter directement via WhatsApp.
            </p>
            <div className="space-y-4 text-secondary-foreground/60 text-sm">
              <p>📍 2MRV+6V6, Douala — Cameroun</p>
              <p>📞 +237 697 320 490</p>
              <p>💬 WhatsApp: 697 320 490</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-lg p-6 md:p-8 shadow-elegant"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nom *</label>
                  <Input
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone *</label>
                  <Input
                    placeholder="+237..."
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  maxLength={255}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Type de service *</label>
                <Select onValueChange={(val) => handleChange("service", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  maxLength={1000}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleEmail}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer par Email
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[hsl(142,70%,35%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(142,70%,30%)]"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Envoyer via WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;
