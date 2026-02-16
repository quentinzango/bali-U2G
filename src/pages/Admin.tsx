import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Image, Video, Settings } from "lucide-react";
import AdminPhotos from "@/components/admin/AdminPhotos";
import AdminVideos from "@/components/admin/AdminVideos";
import AdminServices from "@/components/admin/AdminServices";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Accès refusé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les droits d'administrateur.</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>Retour</Button>
            <Button variant="ghost" onClick={signOut}>Déconnexion</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-display font-bold text-gradient-gold">
            PRINT<span className="text-secondary-foreground">PRO</span>
            <span className="text-xs text-muted-foreground ml-2 font-body">Admin</span>
          </a>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-secondary-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="photos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="photos" className="gap-2">
              <Image className="w-4 h-4" /> Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="w-4 h-4" /> Vidéos
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Settings className="w-4 h-4" /> Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <AdminPhotos />
          </TabsContent>
          <TabsContent value="videos">
            <AdminVideos />
          </TabsContent>
          <TabsContent value="services">
            <AdminServices />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
