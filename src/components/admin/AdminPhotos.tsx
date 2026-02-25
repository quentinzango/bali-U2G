import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil } from "lucide-react";

const AdminPhotos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", service_category: "" });
  const [file, setFile] = useState<File | null>(null);

  const { data: photos, isLoading } = useQuery({
    queryKey: ["admin-photos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadFile = async (file: File) => {
    console.log("Début upload fichier:", file.name);
    const ext = file.name.split(".").pop();
    const path = `photos/${Date.now()}.${ext}`;
    console.log("Chemin fichier:", path);
    
    const { error, data } = await supabase.storage.from("media").upload(path, file);
    console.log("Résultat upload:", { error, data });
    
    if (error) {
      console.error("Erreur upload:", error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    console.log("URL publique:", urlData.publicUrl);
    return urlData.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      console.log("Début mutation sauvegarde");
      console.log("Formulaire:", form);
      console.log("Fichier:", file);
      console.log("EditId:", editId);
      
      let image_url = "";
      if (file) {
        image_url = await uploadFile(file);
        console.log("Image URL obtenue:", image_url);
      }

      if (editId) {
        console.log("Mode édition");
        const updates: any = { ...form };
        if (image_url) updates.image_url = image_url;
        console.log("Updates:", updates);
        const { error } = await supabase.from("photos").update(updates).eq("id", editId);
        if (error) {
          console.error("Erreur update:", error);
          throw error;
        }
      } else {
        console.log("Mode création");
        if (!image_url) {
          console.error("Pas d'image URL");
          throw new Error("Image requise");
        }
        const insertData = { ...form, image_url };
        console.log("Insert data:", insertData);
        const { error } = await supabase.from("photos").insert(insertData);
        if (error) {
          console.error("Erreur insert:", error);
          throw error;
        }
      }
      console.log("Sauvegarde réussie");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-photos"] });
      toast({ title: editId ? "Photo modifiée" : "Photo ajoutée" });
      resetForm();
    },
    onError: (e: any) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("photos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-photos"] });
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-foreground">Gestion des Photos</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Ajouter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Modifier la photo" : "Ajouter une photo"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { 
              console.log("Formulaire soumis");
              e.preventDefault(); 
              saveMutation.mutate(); 
            }} className="space-y-4">
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
                {console.log("État bouton:", { isPending: saveMutation.isPending, file: !!file, formTitle: form.title })}
                {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : !photos?.length ? (
        <p className="text-muted-foreground">Aucune photo pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{photo.title}</p>
                  {photo.service_category && <p className="text-xs text-muted-foreground">{photo.service_category}</p>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(photo)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(photo.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPhotos;
