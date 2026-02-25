// Utilitaires SEO pour le projet Univers des Gadgets

export const SEO_CONFIG = {
  siteName: "Univers des Gadgets",
  siteUrl: "https://univers-des-gadgets.com",
  defaultTitle: "Univers des Gadgets — Impression Laser & Personnalisation à Douala, Cameroun",
  defaultDescription: "Univers des Gadgets : impression laser, gravure, personnalisation d'objets, bâches, roll-up et sérigraphie à Douala. Services professionnels d'impression pour entreprises et particuliers au Cameroun.",
  defaultKeywords: [
    "impression laser douala",
    "gravure douala", 
    "personnalisation objets cameroun",
    "impression professionnelle",
    "sérigraphie douala",
    "bâches publicitaires",
    "roll-up",
    "gravure sur bois",
    "marquage industriel",
    "univers des gadgets"
  ].join(", "),
  social: {
    twitter: "@universgadgets",
    facebook: "universdesgadgets",
    instagram: "@universgadgets"
  },
  contact: {
    phone: "+237697320490",
    email: "quentinzango470@gmail.com",
    address: "2MRV+6V6, Douala, Cameroun"
  }
} as const;

export const generateStructuredData = (type: "LocalBusiness" | "Service" = "LocalBusiness") => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": SEO_CONFIG.siteName,
    "url": SEO_CONFIG.siteUrl,
    "telephone": SEO_CONFIG.contact.phone,
    "email": SEO_CONFIG.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SEO_CONFIG.contact.address.split(",")[0],
      "addressLocality": "Douala",
      "addressCountry": "CM",
      "addressRegion": "Littoral"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "4.0483",
      "longitude": "9.7043"
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "areaServed": "Douala, Cameroun",
    "priceRange": "$$"
  };

  if (type === "LocalBusiness") {
    return {
      ...baseData,
      "description": SEO_CONFIG.defaultDescription,
      "serviceType": [
        "Impression Laser",
        "Gravure",
        "Personnalisation d'objets",
        "Sérigraphie",
        "Bâches publicitaires",
        "Roll-up"
      ],
      "sameAs": Object.values(SEO_CONFIG.social).filter(Boolean)
    };
  }

  return baseData;
};

export const generatePageTitle = (pageTitle?: string) => {
  return pageTitle ? `${pageTitle} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
};

export const generateMetaDescription = (description?: string) => {
  return description || SEO_CONFIG.defaultDescription;
};

export const generateCanonicalUrl = (path?: string) => {
  return path ? `${SEO_CONFIG.siteUrl}${path}` : SEO_CONFIG.siteUrl;
};

// Fonction pour générer les alt textes optimisés
export const generateAltText = (context: string, subject: string) => {
  const contexts = {
    service: "Service d'impression et personnalisation",
    gallery: "Réalisation d'impression laser",
    hero: "Atelier professionnel d'impression",
    contact: "Contact et localisation"
  };
  
  return `${contexts[context as keyof typeof contexts] || context} - ${subject} à Douala, Cameroun`;
};

// Mots-clés par service pour le référencement local
export const SERVICE_KEYWORDS = {
  "impression-laser": [
    "impression laser douala",
    "gravure laser cameroun", 
    "découpe laser douala",
    "marquage laser professionnel"
  ],
  "serigraphie": [
    "sérigraphie douala",
    "impression textile cameroun",
    "sérigraphie professionnelle",
    "impression sur tissu"
  ],
  "baches": [
    "bâches publicitaires douala",
    "bâches promotionnelles cameroun",
    "impression grand format",
    "bâches personnalisées"
  ],
  "roll-up": [
    "roll-up douala",
    "présentoirs publicitaires",
    "roll-up personnalisés cameroun",
    "supports d'exposition"
  ],
  "gravure": [
    "gravure sur bois douala",
    "gravure sur métal cameroun",
    "personnalisation d'objets",
    "gravure industrielle"
  ]
} as const;
