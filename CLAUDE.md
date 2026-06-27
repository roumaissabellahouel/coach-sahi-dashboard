# CLAUDE.md

Ce fichier guide Claude Code lors du travail sur ce projet.

## Vue d'ensemble du projet

Site web pour un coach sportif en ligne basé en Algérie. Le site a deux parties :
1. **Vitrine publique** : attirer de nouveaux clients
2. **Interface d'administration privée** : gérer les clients existants (le vrai cœur du produit)

Le coach gère beaucoup de clients manuellement (WhatsApp, papier, mémoire) et a besoin d'un outil simple pour centraliser tout ça.

## Contraintes importantes (à respecter strictement)

- **Pas de paiement en ligne.** Les paiements sont en cash/manuel. Toute action de paiement doit rediriger vers WhatsApp ou être enregistrée manuellement par le coach dans le dashboard.
- **Pas d'interface ni de compte client.** Le client ne se connecte jamais au site. Tout passe par le coach (WhatsApp, PDF, appel).
- **Un seul utilisateur admin** (le coach). Pas de gestion multi-utilisateurs/rôles pour l'instant.
- **Simplicité avant tout.** Le coach n'est pas technique. L'interface doit être intuitive, sans jargon.

## Stack technique

- **Frontend** : React + Vite
- **Style** : Tailwind CSS
- **Stockage** : localStorage (ou SQLite léger si besoin de persistance plus robuste) — pas de backend complexe, pas de base de données distante pour le MVP
- **Routing** : React Router
- **PDF** : génération côté client (ex: jsPDF ou react-pdf) pour exporter programmes/bilans
- **Déploiement cible** : hébergement statique simple (Netlify/Vercel) ou VPS basique

## Structure du projet

```
/src
  /pages
    /public          → pages vitrine (Home, Offres, Contact...)
    /admin           → pages dashboard (Login, Dashboard, Clients, ClientDetail, Programmes, Calendrier, Rappels)
  /components
    /public          → composants réutilisables vitrine (Hero, Card, Testimonial...)
    /admin           → composants dashboard (Table, ClientForm, ProgramBuilder...)
  /data              → données de test / mock clients
  /lib               → helpers (storage.js, pdfGenerator.js, whatsappLink.js)
  /styles
```

## Fonctionnalités à implémenter

### Partie vitrine (publique)
- Hero avec CTA WhatsApp (lien `wa.me`)
- À propos du coach
- Offres (3 packs avec prix en DZD) → bouton "S'inscrire via WhatsApp"
- Témoignages clients
- Galerie résultats (avant/après)
- Formulaire de contact (confirmation locale, pas d'envoi email requis pour le MVP)
- Footer (réseaux sociaux, téléphone, localisation)

### Partie admin (privée, derrière login simple par mot de passe)
- **Login** : mot de passe unique stocké en config/env, pas de gestion utilisateur complexe
- **Dashboard** : compteurs (clients actifs, en pause, paiements en attente)
- **Liste clients** : tableau filtrable/recherchable (statut, nom)
- **Fiche client** :
  - Infos perso (nom, téléphone, âge, poids, objectif, date d'inscription)
  - Historique paiements (ajout manuel : date, montant, méthode)
  - Programme d'entraînement assigné
  - Plan nutritionnel
  - Notes coach (horodatées)
  - Upload photos de progression
  - Export PDF du programme
- **Gestion des programmes** : modèles réutilisables, assignables à plusieurs clients
- **Calendrier** : séances planifiées (visio/présentiel)
- **Rappels** : clients à relancer (paiement/séance manquée), marquables "fait"

## Données de test

Au démarrage, le projet doit inclure 5 clients fictifs avec données réalistes (noms algériens, objectifs variés, statuts différents) pour tester immédiatement le dashboard sans saisie manuelle.

## Conventions de code

- Composants fonctionnels React, hooks uniquement (pas de classes)
- Nommage en français pour le contenu visible (textes UI), en anglais pour le code (variables, fonctions, fichiers)
- Un composant = un fichier
- Pas de sur-ingénierie : privilégier la simplicité, ce projet est un MVP destiné à un utilisateur non-technique

## Ce qu'il NE FAUT PAS faire

- Ne pas ajouter de système de paiement en ligne (Stripe, PayPal, CIB, etc.)
- Ne pas créer de compte ou d'interface pour les clients
- Ne pas ajouter d'authentification complexe (OAuth, multi-rôles) — un mot de passe simple suffit
- Ne pas introduire de backend lourd (Node/Express + base distante) sauf demande explicite
- Ne pas casser la séparation claire entre la partie vitrine (publique) et la partie admin (privée)

## Workflow recommandé

Travailler par étapes :
1. Structure du projet + setup Vite/Tailwind
2. Page vitrine complète
3. Login admin + protection de route
4. Dashboard + liste clients
5. Fiche client détaillée
6. Programmes + Calendrier + Rappels
7. Export PDF
8. Polish design + responsive mobile

À chaque étape, valider avec l'utilisateur avant de passer à la suite.