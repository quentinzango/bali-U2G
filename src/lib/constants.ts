// Contact entreprise — un seul endroit à modifier
export const CONTACT = {
  whatsappNumber: "237697320490",
  whatsappDisplay: "+237 697320490",
  phoneDisplay: "+237 697320490",
  phoneTel: "+237697320490",
  address: "2MRV+6V6, Douala — Cameroun",
  email: "quentinzango470@gmail.com",
} as const;

// Réseaux sociaux — URLs à adapter selon vos comptes
export const SOCIAL = {
  facebook: "https://facebook.com/universdesgadgets",
  instagram: "https://instagram.com/universdesgadgets",
  tiktok: "https://tiktok.com/@universdesgadgets",
  whatsapp: `https://wa.me/${CONTACT.whatsappNumber}`,
} as const;

// Carousel homepage — 5 images avec message et bouton par slide
// Chemins: public/images/carousel-1.jpg ... carousel-5.jpg (ou public/images/carousel/carousel-1.jpg)
export const CAROUSEL_SLIDES = [
  {
    image: "/images/carousel-1.jpg",
    message: "Univers des Gadgets — Votre partenaire d'impression à Douala",
    buttonText: "Découvrir nos services",
    buttonLink: "#services",
  },
  {
    image: "/images/carousel-2.jpg",
    message: "Impression laser, gravure et personnalisation d'objets",
    buttonText: "Voir la galerie",
    buttonLink: "#gallery",
  },
  {
    image: "/images/carousel-3.jpg",
    message: "Qualité professionnelle pour tous vos projets",
    buttonText: "Demander un devis",
    buttonLink: "#contact",
  },
  {
    image: "/images/carousel-4.jpg",
    message: "500+ projets réalisés, 100% satisfaction client",
    buttonText: "Nous contacter",
    buttonLink: "#contact",
  },
  {
    image: "/images/carousel-5.jpg",
    message: "Douala — Cameroun — Au service de votre créativité",
    buttonText: "Appelez-nous",
    buttonLink: `tel:${CONTACT.phoneTel}`,
  },
] as const;

// Témoignages — 4 témoignages avec photo
// Images à placer dans: public/images/
export const TESTIMONIALS = [
  {
    name: "Marie T.",
    role: "Entrepreneure",
    comment: "Excellente qualité d'impression et délais respectés. Je recommande vivement Univers des Gadgets pour tous vos projets !",
    image: "/images/temoignage-1.jpg",
  },
  {
    name: "Jean-Pierre N.",
    role: "Responsable marketing",
    comment: "Le meilleur partenaire d'impression à Douala. Nos bâches et roll-up ont fait sensation lors du salon.",
    image: "/images/temoignage-2.jpg",
  },
  {
    name: "Sarah M.",
    role: "Artisan",
    comment: "Personnalisation parfaite sur nos articles. Équipe à l'écoute et résultats au-delà de nos attentes.",
    image: "/images/temoignage-3.jpg",
  },
  {
    name: "David K.",
    role: "Chef d'entreprise",
    comment: "Depuis 3 ans, nous collaborons pour nos cartes de visite et supports marketing. Toujours professionnel.",
    image: "/images/temoignage-4.jpg",
  },
] as const;

// Image de fond pour la section Témoignages
// À placer dans: public/images/temoignages-bg.jpg
export const TESTIMONIALS_BG = "/images/temoignages-bg.jpeg";

// Image de fond pour la section Contact
// À placer dans: public/images/contact-bg.jpg
export const CONTACT_BG = "/images/contact-bg.jpg";

// Image de fond pour la page À propos
// À placer dans: public/images/a-propos-bg.jpg
export const ABOUT_BG = "/images/a-propos-bg.jpeg";
