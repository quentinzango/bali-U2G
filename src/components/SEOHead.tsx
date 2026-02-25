import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title = "Univers des Gadgets — Impression Laser & Personnalisation à Douala, Cameroun",
  description = "Univers des Gadgets : impression laser, gravure, personnalisation d'objets, bâches, roll-up et sérigraphie à Douala. Services professionnels d'impression pour entreprises et particuliers au Cameroun.",
  keywords = "impression laser douala, gravure douala, personnalisation objets cameroun, impression professionnelle, sérigraphie douala, bâches publicitaires, roll-up, gravure sur bois, marquage industriel, univers des gadgets",
  image = "/og-image.jpg",
  url = "https://univers-des-gadgets.com/",
  type = "website"
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Univers des Gadgets" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Univers des Gadgets - Services d'impression et personnalisation à Douala" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Univers des Gadgets - Services d'impression et personnalisation à Douala" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Univers des Gadgets",
          "description": "Services professionnels d'impression laser, gravure et personnalisation à Douala, Cameroun",
          "url": url,
          "telephone": "+237697320490",
          "email": "quentinzango470@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2MRV+6V6",
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
          "serviceType": [
            "Impression Laser",
            "Gravure",
            "Personnalisation d'objets",
            "Sérigraphie",
            "Bâches publicitaires",
            "Roll-up"
          ],
          "areaServed": "Douala, Cameroun",
          "priceRange": "$$",
          "sameAs": []
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
