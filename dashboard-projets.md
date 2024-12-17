# Prompt pour Amélioration Dashboard Projets

Créer une interface moderne et fonctionnelle pour le dashboard des projets d'un cabinet de conseil avec les spécifications suivantes :

## 1. Composants d'En-tête
- Créer une barre supérieure avec :
  - Logo et nom "MSC - Gestion de Projets" à gauche
  - Menu utilisateur avec photo de profil et dropdown à droite
  - Notification bell avec badge pour les alertes
  - Thème light/dark mode toggle

## 2. Zone de Recherche et Filtres
- Barre de recherche avec auto-complétion
- Filtres avancés dans un dropdown incluant :
  - Status (Actif, En pause, Terminé)
  - Budget (ranges prédéfinis)
  - Date (période personnalisable)
  - Chef de projet
  - Client
- Tags pour filtres actifs avec possibilité de les supprimer
- Bouton "Réinitialiser les filtres"

## 3. Affichage des Projets
- Vue en cartes avec possibilité de basculer en vue liste
- Pour chaque projet, afficher :
  - Badge de statut coloré (vert=actif, orange=pause, gris=terminé)
  - Titre du projet avec lien vers détails
  - Client avec logo
  - Dates (début-fin) avec barre de progression temporelle
  - Budget avec visualisation graphique du consommé
  - Équipe avec photos des membres clés
  - KPIs principaux en mini-cartes
  - Menu actions rapides (...)

## 4. Fonctionnalités Interactives
- Tri par colonnes (drag & drop)
- Groupement par client/statut/chef de projet
- Preview au survol des cartes
- Actions par lot avec sélection multiple
- Export des données filtrées (Excel, PDF)

## 5. Design System
- Palette de couleurs :
  - Principal : #3B82F6 (bleu)
  - Succès : #10B981 (vert)
  - Attention : #F59E0B (orange)
  - Erreur : #EF4444 (rouge)
- Typography :
  - Titres : Inter (semi-bold)
  - Corps : Inter (regular)
- Espacements : système 4/8/12/16/24/32px
- Ombres : 3 niveaux (sm/md/lg)
- Coins arrondis : 8px par défaut

## 6. Améliorations UX
- Animations douces sur les interactions
- Loading states élégants
- Messages de confirmation pour les actions
- Tooltips informatifs
- Raccourcis clavier
- Responsive design complet

## 7. Tableau de Bord Analytics
- Ajouter une section statistiques au-dessus des projets :
  - Nombre total de projets actifs
  - Budget total en cours
  - Taux de complétion moyen
  - Projets en retard
- Mini graphiques de tendances
- Filtres rapides pré-configurés

## 8. Performance
- Pagination côté serveur
- Lazy loading des images
- Mise en cache des données fréquentes
- Debounce sur la recherche
- Virtualisation pour les longues listes

## 9. Bonus Features
- Mode présentation pour les réunions
- Widgets personnalisables
- Templates de projets favoris
- Système de tags personnalisés
- Recherche globale avec raccourci
- Timeline des activités récentes

## 10. Accessibilité
- Support ARIA labels
- Navigation au clavier
- Messages d'erreur vocaux
- Contraste suffisant
- Focus visibles
- Support lecteur d'écran

Instructions techniques :
- Utiliser React avec TypeScript
- Styling avec Tailwind CSS
- Composants modulaires réutilisables
- Tests unitaires requis
- Documentation des composants
- Gestion d'état avec Redux Toolkit
- Respect des performances Lighthouse

Contraintes :
- Support navigateurs modernes uniquement
- Mobile-first approach
- Temps de chargement initial < 2s
- Bundle size optimisé
- Pas de dépendances externes lourdes
