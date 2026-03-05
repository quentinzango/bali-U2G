import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { downloadFile } from "@/lib/download";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MediaCard from "@/components/MediaCard";

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>("all");

  const { data: services } = useQuery({
    queryKey: ["services-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("title", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ["gallery-photos", selectedService],
    queryFn: async () => {
      let query = supabase
        .from("photos")
        .select("*, services(id, title)")
        .order("created_at", { ascending: false });

      if (selectedService !== "all") {
        query = query.eq("service_id", selectedService);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["gallery-videos", selectedService],
    queryFn: async () => {
      let query = supabase
        .from("videos")
        .select("*, services(id, title)")
        .order("created_at", { ascending: false });

      if (selectedService !== "all") {
        query = query.eq("service_id", selectedService);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="gallery" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Nos Réalisations</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mt-3">
            Galerie
          </h2>
          <p className="text-secondary-foreground/60 mt-4 max-w-lg mx-auto">
            Découvrez nos réalisations ou explorez par service.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les services</SelectItem>
              {services?.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {photosLoading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : !photos?.length && !videos?.length ? (
          <p className="text-center text-secondary-foreground/60 py-12">
            Aucun contenu pour le moment. Visitez nos services pour découvrir nos réalisations.
          </p>
        ) : (
          <>
            {photos && photos.length > 0 && (
              <>
                <h3 className="text-xl font-display font-semibold text-gradient-gold mb-6">Photos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                  {photos.map((photo) => (
                    <div key={photo.id}>
                      <MediaCard
                        type="photo"
                        src={photo.image_url}
                        title={photo.title}
                        description={photo.description || undefined}
                        onPreview={() => setSelectedPhoto(photo.image_url)}
                      />
                      {photo.services && (
                        <Link
                          to={`/services/${photo.services.id}`}
                          className="inline-block mt-2 text-xs text-primary hover:underline"
                        >
                          Voir le service: {photo.services.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {videos && videos.length > 0 && (
              <>
                <h3 className="text-xl font-display font-semibold text-gradient-gold mb-6">Vidéos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <div key={video.id}>
                      <MediaCard
                        type="video"
                        src={video.video_url}
                        title={video.title}
                        description={video.description || undefined}
                      />
                      {video.services && (
                        <Link
                          to={`/services/${video.services.id}`}
                          className="inline-block mt-2 text-xs text-primary hover:underline"
                        >
                          Voir le service: {video.services.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {videosLoading && (
              <p className="text-center text-muted-foreground mt-8">Chargement des vidéos...</p>
            )}
          </>
        )}

        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl p-2">
            {selectedPhoto && (
              <div className="relative">
                <img src={selectedPhoto} alt="Photo agrandie" className="w-full h-auto rounded" />
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
      </div>
    </section>
  );
};

export default Gallery;
