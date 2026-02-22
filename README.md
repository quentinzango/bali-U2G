# Univers des Gadgets — Douala Print Hub

Site vitrine et back-office pour **Univers des Gadgets** (impression et personnalisation à Douala, Cameroun).

- **Stack** : React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase (Auth, Base, Storage).
- **Fonctionnalités** : vitrine (services, galerie photos & vidéos, contact, carte), authentification, espace admin (CRUD photos, vidéos, services).

Le logo du site se trouve dans `public/logo.png` (affiché dans la navbar).

## Prérequis

- Node.js 18+ et npm

## Installation

```bash
# Cloner (si besoin) puis entrer dans le projet
cd douala-print-hub

# Installer les dépendances
npm install

# Copier les variables d'environnement et les remplir avec ton projet Supabase
cp .env.example .env
```

## Variables d'environnement

Crée un fichier `.env` à la racine (voir `.env.example`) avec :

- `VITE_SUPABASE_URL` : URL du projet Supabase (Settings > API > Project URL).
- `VITE_SUPABASE_PUBLISHABLE_KEY` : clé **anon public** (Settings > API > Project API keys > anon public).

Ne commite jamais `.env`. Utilise la clé **anon**, pas la clé service.

## Configurer le backend Supabase (ton propre projet)

1. Crée un projet sur [supabase.com](https://supabase.com) (ton compte).
2. Dans le **SQL Editor**, exécute le script complet :
   - Fichier : `supabase/schema-complet.sql`
3. Crée ton premier admin :
   - Authentication > Users : crée un utilisateur (ou inscris-toi via l’app sur `/auth`).
   - Copie son **UID**.
   - Dans le SQL Editor :
     ```sql
     INSERT INTO public.user_roles (user_id, role)
     VALUES ('COLLE-ICI-L-UID', 'admin');
     ```
4. Dans l’app, renseigne `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` dans `.env`.

## Lancer le projet

```bash
npm run dev
```

Ouvre [http://localhost:8080](http://localhost:8080).

- **Build** : `npm run build`
- **Preview** : `npm run preview`
- **Tests** : `npm run test`
- **Lint** : `npm run lint`

## Structure utile

- `src/pages/` : Index, Auth, Admin, NotFound
- `src/components/` : Navbar, Hero, Services, Gallery, RequestForm, MapSection, Footer
- `src/components/admin/` : AdminPhotos, AdminVideos, AdminServices
- `src/integrations/supabase/` : client et types Supabase
- `src/hooks/useAuth.tsx` : session et rôle admin

Ce projet est indépendant de Lovable ; tu en as le contrôle total.
