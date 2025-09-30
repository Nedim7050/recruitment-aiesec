# 📊 Guide d'Utilisation - Dashboard Admin AIESEC Carthage

## 🎯 Vue d'ensemble

Le dashboard admin a été entièrement mis à jour pour récupérer et afficher les données de votre Google Sheet "AIESEC Carthage - Candidatures" de manière professionnelle et intuitive.

## 🔐 Connexion

1. **Accès** : Cliquez sur le bouton "Login" sur votre site principal
2. **Mot de passe** : `admin123`
3. **Accès automatique** : Le dashboard se charge automatiquement après connexion

## 📈 Tableau de Bord

### Statistiques en Temps Réel

- **Total Candidatures** : Nombre total de candidatures reçues
- **Mobile** : Candidatures soumises depuis un appareil mobile
- **Desktop** : Candidatures soumises depuis un ordinateur
- **Aujourd'hui** : Candidatures reçues aujourd'hui

### Actualisation Automatique

- ⏰ **Actualisation automatique** : Toutes les 30 secondes
- 🔄 **Actualisation manuelle** : Bouton "Actualiser"
- 📊 **Mise à jour en temps réel** : Les statistiques se mettent à jour automatiquement

## 📋 Tableau des Candidatures

### Colonnes Affichées

1. **ID** : Identifiant unique de la candidature
2. **Nom** : Nom complet du candidat
3. **Email** : Adresse email (cliquable pour envoyer un email)
4. **Téléphone** : Numéro de téléphone (cliquable pour appeler)
5. **Université** : Université du candidat
6. **Âge** : Âge du candidat
7. **Niveau** : Niveau d'études
8. **Motivation** : Texte de motivation (tronqué avec tooltip)
9. **Espace Libre** : Informations supplémentaires (tronqué avec tooltip)
10. **Date** : Date de soumission
11. **Appareil** : Type d'appareil utilisé (badge coloré)
12. **Actions** : Boutons d'action

### Fonctionnalités du Tableau

- 🔍 **Recherche** : Recherche dans toutes les colonnes
- 📄 **Pagination** : 25 candidatures par page
- 🔄 **Tri** : Tri par colonne (sauf Motivation et Espace Libre)
- 📱 **Responsive** : Adaptation automatique aux écrans mobiles
- 🎨 **Design moderne** : Interface claire et professionnelle

## 👁️ Visualisation des Détails

### Modal de Détails

Cliquez sur l'icône 👁️ pour voir les détails complets d'une candidature :

- **Informations Personnelles** : ID, Nom, Email, Téléphone, Âge
- **Informations Académiques** : Université, Niveau, Appareil, Date
- **Motivation** : Texte complet de motivation
- **Informations Supplémentaires** : Contenu de l'espace libre (si rempli)

### Fonctionnalités du Modal

- 📧 **Liens cliquables** : Email et téléphone
- 🎨 **Design organisé** : Informations groupées par catégorie
- 📱 **Responsive** : Adaptation aux écrans mobiles
- ❌ **Fermeture facile** : Bouton fermer ou clic à l'extérieur

## 📥 Export des Données

### Export Individuel

- **Bouton** : Icône 📥 dans la colonne Actions
- **Format** : Fichier JSON
- **Nom** : `candidature_[Nom]_[ID].json`
- **Contenu** : Toutes les informations de la candidature

### Export Global

- **Bouton** : "Exporter Tout" (vert)
- **Format** : Fichier CSV
- **Nom** : `candidatures_aiesec_[Date].csv`
- **Contenu** : Toutes les candidatures
- **Utilisation** : Compatible avec Excel, Google Sheets, etc.

## 🔄 Gestion des Données

### Sources de Données

- **Google Sheet** : "AIESEC Carthage - Candidatures"
- **API** : Votre script Apps Script
- **Actualisation** : Automatique toutes les 30 secondes

### Gestion des Erreurs

- **Notifications** : Messages d'erreur/succès en temps réel
- **Indicateurs** : Boutons de chargement pendant les requêtes
- **Fallback** : Gestion gracieuse des erreurs de connexion

## 🎨 Améliorations Visuelles

### Design Moderne

- **Gradients** : Couleurs dégradées pour les boutons
- **Animations** : Effets de survol sur les cartes
- **Badges** : Indicateurs colorés pour les types d'appareils
- **Icônes** : Font Awesome pour une interface claire

### Expérience Utilisateur

- **Notifications** : Messages temporaires en haut à droite
- **Chargement** : Indicateurs visuels pendant les opérations
- **Responsive** : Adaptation parfaite aux mobiles
- **Accessibilité** : Tooltips et labels descriptifs

## 🚀 Fonctionnalités Avancées

### Recherche et Filtrage

- **Recherche globale** : Dans toutes les colonnes
- **Tri dynamique** : Par n'importe quelle colonne
- **Pagination** : Navigation facile entre les pages

### Export et Partage

- **Export CSV** : Compatible avec tous les tableurs
- **Export JSON** : Pour l'intégration avec d'autres systèmes
- **Noms de fichiers** : Automatiques avec date et identifiants

## 🔧 Configuration Technique

### API et Connexion

- **URL** : Votre script Apps Script
- **Méthode** : GET pour récupérer les données
- **Format** : JSON
- **Actualisation** : Automatique + manuelle

### Sécurité

- **Authentification** : Mot de passe requis
- **Session** : Maintien de la connexion
- **Déconnexion** : Bouton de déconnexion sécurisé

## 📱 Compatibilité

### Navigateurs Supportés

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Appareils

- 💻 **Desktop** : Interface complète
- 📱 **Mobile** : Interface adaptée
- 📟 **Tablette** : Interface responsive

## 🎉 Résultat Final

Votre dashboard admin est maintenant :

- ✅ **Fonctionnel** : Récupère les vraies données du Google Sheet
- ✅ **Moderne** : Design professionnel et attrayant
- ✅ **Intuitif** : Interface claire et facile à utiliser
- ✅ **Complet** : Toutes les fonctionnalités nécessaires
- ✅ **Responsive** : Fonctionne sur tous les appareils

Le dashboard est prêt à être utilisé pour gérer efficacement les candidatures AIESEC Carthage ! 🚀

