import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category_id: "" });
  const [file, setFile] = useState<File | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ["gallery-photos", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("photos")
        .select("*, categories(id, name)")
        .order("created_at", { ascending: false });
      
      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["gallery-videos", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("videos")
        .select("*, categories(id, name)")
        .order("created_at", { ascending: false });
      
      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const uploadFile = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `photos/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let image_url = "";
      if (file) {
        image_url = await uploadFile(file);
      }
      if (editId) {
        const updates: Record<string, string> = { ...form };
        if (image_url) updates.image_url = image_url;
        const { error } = await supabase.from("photos").update(updates).eq("id", editId);
        if (error) throw error;
      } else {
        if (!image_url) throw new Error("Image requise");
        const { error } = await supabase.from("photos").insert({ ...form, image_url });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-photos"] });
      toast({ title: editId ? "Photo modifiée" : "Photo ajoutée" });
      resetForm();
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("photos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-photos"] });
      toast({ title: "Photo supprimée" });
    },
  });

  const resetForm = () => {
    setForm({ title: "", description: "", category_id: "" });
    setFile(null);
    setEditId(null);
    setOpen(false);
  };

  const openEdit = (photo: any) => {
    setForm({ 
      title: photo.title, 
      description: photo.description || "", 
      category_id: photo.category_id || ""
    });
    setEditId(photo.id);
    setOpen(true);
  };

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
            Découvrez quelques-uns de nos projets récents.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Admin controls */}
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
            <LogIn className="w-4 h-4 mr-2" /> Admin
          </Button>
        </div>

        {photosLoading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : !photos?.length && !videos?.length ? (
          <p className="text-center text-secondary-foreground/60">Aucun contenu pour le moment.</p>
        ) : (
          <>
            {photos?.length ? (
              <>
                <h3 className="text-xl font-display font-semibold text-secondary-foreground mb-6">Photos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {photos.map((photo, i) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-lg shadow-elegant bg-card cursor-pointer"
                      onClick={() => setSelectedPhoto(photo.image_url)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-card-foreground">{photo.title}</h3>
                        {photo.description && <p className="text-sm text-muted-foreground mt-1">{photo.description}</p>}
                        {photo.categories?.name && (
                          <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {photo.categories.name}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : null}

            {videos?.length ? (
              <>
                <h3 className="text-xl font-display font-semibold text-secondary-foreground mb-6">Vidéos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, i) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-lg shadow-elegant bg-card"
                    >
                      <div className="aspect-video overflow-hidden bg-muted">
                        <video
                          src={video.video_url}
                          poster={video.thumbnail_url || undefined}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-card-foreground">{video.title}</h3>
                        {video.description && <p className="text-sm text-muted-foreground mt-1">{video.description}</p>}
                        {video.categories?.name && (
                          <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {video.categories.name}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : videosLoading ? (
              <p className="text-center text-muted-foreground mt-8">Chargement des vidéos...</p>
            ) : null}
          </>
        )}

        {/* Lightbox */}
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl p-2">
            {selectedPhoto && (
              <img src={selectedPhoto} alt="Photo agrandie" className="w-full h-auto rounded" />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
