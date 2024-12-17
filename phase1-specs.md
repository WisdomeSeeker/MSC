# Cahier des Charges - Système de Gestion pour Cabinet de Conseil
## Phase 1 : Fondations du Système

## 1. Contexte du Projet

### 1.1 Présentation
Le projet vise à développer un système de gestion intégré pour les cabinets de conseil au Maroc. La Phase 1 constitue le socle fondamental du système, concentré sur la gestion des projets et la facturation.

### 1.2 Objectifs Phase 1
- Mettre en place une base fonctionnelle robuste
- Gérer les projets et leur suivi basique
- Permettre la facturation et le suivi financier
- Assurer une gestion sécurisée des utilisateurs

### 1.3 Contraintes
- Conformité aux réglementations marocaines
- Support multilingue (Français/Arabe)
- Haute sécurité des données
- Interface intuitive et responsive

## 2. Spécifications Fonctionnelles

### 2.1 Module Core
#### Gestion des Utilisateurs
- Inscription/connexion des utilisateurs
- Gestion des rôles (Admin, Manager, Consultant)
- Gestion des permissions granulaires
- Profils utilisateurs

#### Configuration Système
- Paramètres généraux du cabinet
- Configuration des devises
- Paramètres de facturation
- Templates système

#### Dashboard Principal
- Vue d'ensemble de l'activité
- Indicateurs clés de performance
- Alertes et notifications
- Accès rapide aux fonctions principales

### 2.2 Module Projets
#### Gestion des Projets
- Création de projets
- Information de base (titre, client, dates, budget)
- Description et objectifs
- Équipe projet

#### Suivi de Projet
- États d'avancement
- Jalons principaux
- Documents associés
- Notes et commentaires

#### Gestion Documentaire
- Upload/download de documents
- Versions des documents
- Catégorisation
- Recherche simple

### 2.3 Module Finance
#### Facturation
- Création de factures
- Templates personnalisables
- Calcul automatique des montants
- États des factures

#### Suivi Financier
- État des paiements
- Calcul des marges basiques
- Historique des transactions
- Exports comptables

## 3. Spécifications Techniques

### 3.1 Architecture Technique
```plaintext
Frontend (React) <-> API (Spring Boot) <-> Base de données (PostgreSQL)
```

### 3.2 Stack Technologique
#### Backend
- Spring Boot 3.1.x
- Java 17
- PostgreSQL 15
- Hibernate/JPA
- Spring Security

#### Frontend
- React 18.x
- TypeScript 5.x
- Material-UI 5.x
- Redux Toolkit

#### Infrastructure
- Docker
- Maven
- npm

## 4. Directives pour le Développement avec CursorAI

### 4.1 Structure du Projet
```plaintext
project-root/
├── backend/
│   ├── src/main/java/com/cabinet
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   └── security/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   └── package.json
└── docker-compose.yml
```

### 4.2 Gestion des Dépendances
#### Backend (pom.xml)
```xml
<properties>
    <java.version>17</java.version>
    <spring-boot.version>3.1.x</spring-boot.version>
    <postgresql.version>42.6.0</postgresql.version>
    <jwt.version>0.11.5</jwt.version>
</properties>
```

#### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "@mui/material": "^5.14.x",
    "@reduxjs/toolkit": "^1.9.x",
    "typescript": "^5.0.x"
  }
}
```

### 4.3 Standards de Codage

#### Gestion des Erreurs Backend
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {
        // Gestion standardisée des erreurs
    }
}
```

#### Gestion des Erreurs Frontend
```typescript
const errorHandler = (error: any) => {
  if (error.response) {
    // Gestion des erreurs HTTP
  } else if (error.request) {
    // Gestion des erreurs réseau
  } else {
    // Autres erreurs
  }
};
```

### 4.4 Sécurité
- Implémentation JWT pour l'authentification
- Validation des entrées côté serveur et client
- Hachage des mots de passe avec BCrypt
- Protection CSRF
- Headers de sécurité HTTP

### 4.5 Tests Essentiels
#### Backend
```java
@SpringBootTest
class UserServiceTest {
    @Test
    void createUser_ValidData_Success() {
        // Tests unitaires
    }
}
```

#### Frontend
```typescript
describe('Login Component', () => {
  test('renders login form', () => {
    // Tests unitaires React
  });
});
```

### 4.6 Directives pour CursorAI

#### 1. Organisation du Code
- Utiliser les patterns Repository et Service
- Implémenter des interfaces pour les services
- Suivre le principe SOLID
- Utiliser les DTOs pour les transferts de données

#### 2. Sécurité
- Valider toutes les entrées utilisateur
- Utiliser les prepared statements
- Implémenter le rate limiting
- Logger les actions sensibles

#### 3. Performance
- Paginer les résultats
- Indexer les colonnes fréquemment utilisées
- Mettre en cache les données statiques
- Optimiser les requêtes N+1

#### 4. Tests
- Couvrir les cas limites
- Tester les scénarios d'erreur
- Utiliser les mocks appropriés
- Implémenter des tests d'intégration

#### 5. Documentation
- Documenter les APIs avec Swagger
- Maintenir un README à jour
- Commenter le code complexe
- Inclure des exemples d'utilisation

## 5. Livrables Attendus

### 5.1 Backend
- API REST complète
- Tests unitaires et d'intégration
- Documentation Swagger
- Scripts de migration DB

### 5.2 Frontend
- Interface utilisateur responsive
- Tests unitaires
- Documentation des composants
- Guide d'utilisation

### 5.3 Infrastructure
- Fichiers Docker
- Scripts de déploiement
- Documentation infrastructure
