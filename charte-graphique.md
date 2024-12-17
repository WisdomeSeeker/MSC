# Charte Graphique TRUSTED ENERGY
*L'ingénierie de l'excellence*

## 1. Logo et Identité

### 1.1 Logo
- Logo principal : "E" stylisé dans un cercle dentelé vert
- Version horizontale : Logo + "TRUSTED ENERGY" en texte
- Zone de protection : Espace minimal équivalent à la hauteur du "E"
- Taille minimale : 32px de hauteur pour la version symbolique

### 1.2 Signature
- Baseline : "L'INGENIERIE DE L'EXCELLENCE"
- Position : Sous le logo, centré

## 2. Palette de Couleurs

### 2.1 Couleurs Principales
- Vert TRUSTED : #8CC63E 
  - Usage : Logo, éléments principaux, CTAs
  - RGB: 140, 198, 62
  - CMYK: 57, 0, 100, 0

- Blanc : #FFFFFF
  - Usage : Arrière-plans, texte sur fonds sombres
  - RGB: 255, 255, 255
  - CMYK: 0, 0, 0, 0

- Gris Foncé : #333333
  - Usage : Texte principal
  - RGB: 51, 51, 51
  - CMYK: 70, 65, 64, 73

### 2.2 Couleurs Secondaires
- Bleu Professionnel : #3B82F6
  - Usage : Liens, éléments interactifs
  - RGB: 59, 130, 246
  - CMYK: 76, 47, 0, 4

- Vert Clair : #A4D65E
  - Usage : Survols, variations
  - RGB: 164, 214, 94
  - CMYK: 43, 0, 85, 0

- Gris Clair : #F3F4F6
  - Usage : Fonds alternatifs
  - RGB: 243, 244, 246
  - CMYK: 4, 2, 2, 0

### 2.3 Couleurs Fonctionnelles
- Succès : #10B981
- Avertissement : #F59E0B
- Erreur : #EF4444
- Information : #3B82F6

## 3. Typographie

### 3.1 Police Principale : Inter
```css
/* CDN Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

#### Utilisations
- Titres (H1)
```css
font-family: 'Inter';
font-weight: 600;
font-size: 2.5rem;
letter-spacing: -0.02em;
line-height: 1.2;
```

- Sous-titres (H2)
```css
font-family: 'Inter';
font-weight: 600;
font-size: 2rem;
letter-spacing: -0.01em;
line-height: 1.3;
```

- Corps de texte
```css
font-family: 'Inter';
font-weight: 400;
font-size: 1rem;
line-height: 1.6;
```

## 4. Composants UI

### 4.1 Boutons
```css
.button-primary {
    background-color: #8CC63E;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.button-secondary {
    background-color: white;
    color: #8CC63E;
    border: 2px solid #8CC63E;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
}
```

### 4.2 Cards
```css
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease;
}
```

### 4.3 Navigation
```css
.nav-item {
    font-weight: 500;
    color: #333333;
    padding: 0.5rem 1rem;
    transition: color 0.3s ease;
}

.nav-item:hover {
    color: #8CC63E;
}
```

## 5. Grille et Espacement

### 5.1 Système de Grid
- Container max-width: 1280px
- Gutters: 24px
- Colonnes: 12
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### 5.2 Espacements
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

## 6. Iconographie

### 6.1 Style d'Icônes
- Utilisation d'icônes linéaires
- Épaisseur de trait : 1.5px
- Coins arrondis
- Tailles standard : 16px, 20px, 24px, 32px

### 6.2 Collection d'Icônes
- Utilisation de la bibliothèque Lucide React
- Couleur adaptative selon le contexte
- Alignement avec la ligne de base du texte

## 7. Photographie

### 7.1 Style Photographique
- Images professionnelles haute résolution
- Focus sur l'industrie et la technologie
- Traitement : contraste modéré, clarté augmentée
- Overlay vert (#8CC63E) avec opacité 10-20% sur les images de fond

### 7.2 Formats
- Hero images: 1920x1080px
- Cards: 800x600px
- Thumbnails: 400x300px
- Format: JPG (photos), PNG (graphiques avec transparence)

## 8. Animations et Transitions

### 8.1 Transitions Générales
```css
transition: all 0.3s ease;
```

### 8.2 Hover States
```css
transform: translateY(-2px);
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

## 9. Accessibilité

### 9.1 Contraste
- Texte sur fond clair : #333333
- Texte sur fond foncé : #FFFFFF
- Rapport de contraste minimal : 4.5:1

### 9.2 Focus States
```css
outline: 2px solid #8CC63E;
outline-offset: 2px;
```

## 10. Responsive Design

### 10.1 Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 10.2 Typography Responsive
```css
h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
}
```
