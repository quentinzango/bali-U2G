import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", service_category: "" });
  const [file, setFile] = useState<File | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { data: photos, isLoading } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
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
    setForm({ title: "", description: "", service_category: "" });
    setFile(null);
    setEditId(null);
    setOpen(false);
  };

  const openEdit = (photo: any) => {
    setForm({ title: photo.title, description: photo.description || "", service_category: photo.service_category || "" });
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

        {/* Admin controls */}
        <div className="flex justify-end gap-2 mb-6">
          {isAdmin ? (
            <>
              <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Ajouter</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editId ? "Modifier la photo" : "Ajouter une photo"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Titre</Label>
                      <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Input value={form.service_category} onChange={(e) => setForm({ ...form, service_category: e.target.value })} placeholder="Ex: laser, sérigraphie..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Image {editId ? "(optionnel)" : ""}</Label>
                      <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required={!editId} />
                    </div>
                    <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                      {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" /> Déconnexion
              </Button>
            </>
          ) : !user ? (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
              <LogIn className="w-4 h-4 mr-2" /> Admin
            </Button>
          ) : null}
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : !photos?.length ? (
          <p className="text-center text-secondary-foreground/60">Aucune photo pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {photo.service_category && (
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {photo.service_category}
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); openEdit(photo); }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(photo.id); }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
