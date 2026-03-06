import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaCard from "@/components/MediaCard";
import { downloadFile } from "@/lib/download";
import { useState } from "react";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description, image_url")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: photos } = useQuery({
    queryKey: ["service-photos", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("service_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ["service-videos", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("service_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Service introuvable</h1>
          <Button asChild variant="outline">
            <Link to="/services">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux services
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const hasContent = (photos?.length ?? 0) > 0 || (videos?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link to="/services" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Retour aux services
            </Link>
          </Button>

          {/* En-tête avec image du service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Image du service */}
            {service.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-auto max-h-96 object-cover object-center"
                />
              </div>
            )}
            
            {/* Titre et description */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {service.title}
            </h1>
            {service.description && (
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                {service.description}
              </p>
            )}
            <Button asChild>
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </motion.div>

          {hasContent ? (
            <>
              {photos && photos.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-16"
                >
                  <h2 className="text-2xl font-display font-semibold text-gradient-gold mb-6">
                    Photos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {photos.map((photo) => (
                      <MediaCard
                        key={photo.id}
                        type="photo"
                        src={photo.image_url}
                        title={photo.title}
                        description={photo.description || undefined}
                        onPreview={() => setSelectedPhoto(photo.image_url)}
                      />
                    ))}
                  </div>
                </motion.section>
              )}

              {videos && videos.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-display font-semibold text-gradient-gold mb-6">
                    Vidéos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <MediaCard
                        key={video.id}
                        type="video"
                        src={video.video_url}
                        title={video.title}
                        description={video.description || undefined}
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-center py-12"
            >
              Aucune photo ou vidéo pour ce service pour le moment.
            </motion.p>
          )}
        </div>
      </main>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-2">
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto}
                alt="Photo agrandie"
                className="w-full h-auto rounded"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 shadow-lg"
                onClick={() => downloadFile(selectedPhoto, "photo.jpg")}
              >
                Télécharger
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
