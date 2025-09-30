# Guide de Synchronisation des Données - AIESEC Carthage

## 🚨 Problème Identifié

Le localStorage est **local à chaque appareil/navigateur**, ce qui signifie que :
- Les données saisies sur mobile ne sont pas visibles sur desktop
- Les données saisies sur desktop ne sont pas visibles sur mobile
- Chaque appareil a ses propres données séparées

## ✅ Solution Implémentée

### 1. **Fonctions d'Export/Import dans le Dashboard**

#### **Export de Toutes les Données**
- Bouton "Export All" dans le dashboard
- Télécharge un fichier JSON avec toutes les candidatures
- Inclut la date d'export et le nombre total de candidatures

#### **Import de Données**
- Bouton "Import" dans le dashboard
- Permet d'importer un fichier JSON
- Fusionne intelligemment les données (évite les doublons)
- Affiche le nombre de nouvelles candidatures importées

### 2. **Synchronisation Manuelle**

#### **Processus de Synchronisation**
1. **Sur l'appareil source** : Exporter les données via le dashboard
2. **Transférer le fichier** : Email, USB, cloud, etc.
3. **Sur l'appareil cible** : Importer le fichier via le dashboard
4. **Vérification** : Les données sont maintenant synchronisées

### 3. **Auto-Détection des Nouvelles Candidatures**

- Le dashboard vérifie automatiquement les nouvelles candidatures toutes les 30 secondes
- Rafraîchit automatiquement le tableau si de nouvelles données sont détectées
- Fonctionne sur le même appareil/navigateur

## 📋 Instructions d'Utilisation

### **Pour l'Administrateur (Vous)**

#### **Synchronisation Quotidienne**
1. Ouvrez le dashboard sur votre appareil principal
2. Cliquez sur "Export All" pour sauvegarder toutes les données
3. Transférez le fichier sur vos autres appareils
4. Importez le fichier sur chaque appareil

#### **Workflow Recommandé**
```
Matin : Export des données de la veille
↓
Transfert vers tous les appareils
↓
Import sur chaque appareil
↓
Travail sur n'importe quel appareil
↓
Soir : Export final pour backup
```

### **Pour les Utilisateurs**

#### **Message d'Information**
- Un message informatif apparaît maintenant sur le formulaire
- Explique que les données sont sauvegardées localement
- Indique comment synchroniser via le dashboard admin

## 🔧 Fonctionnalités Techniques

### **Export Intelligent**
- Format JSON structuré
- Métadonnées incluses (date, nombre total)
- Nom de fichier avec date automatique
- Téléchargement direct

### **Import Intelligent**
- Vérification du format de fichier
- Détection des doublons par ID
- Fusion des données existantes
- Messages de confirmation/erreur

### **Auto-Refresh**
- Vérification toutes les 30 secondes
- Détection des changements dans localStorage
- Rafraîchissement automatique du tableau
- Logs dans la console pour debugging

## 📱 Compatibilité Multi-Appareils

### **Appareils Supportés**
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Mobile (Android, iOS)
- ✅ Tablettes
- ✅ Tous navigateurs modernes

### **Limitations**
- ❌ Synchronisation automatique en temps réel
- ❌ Partage de données entre navigateurs différents
- ❌ Synchronisation cloud automatique

## 🚀 Améliorations Futures Possibles

### **Option 1 : Base de Données Externe**
- Utiliser Firebase, Supabase, ou une API
- Synchronisation automatique en temps réel
- Accès depuis n'importe quel appareil
- Backup automatique

### **Option 2 : Service Worker avec Sync**
- Synchronisation en arrière-plan
- Fonctionne même hors ligne
- Sync automatique quand la connexion revient

### **Option 3 : QR Code pour Transfert**
- Générer un QR code avec les données
- Scanner avec un autre appareil
- Transfert instantané sans fichier

## 📞 Support

Si vous avez des questions sur la synchronisation :
1. Vérifiez que le fichier JSON est valide
2. Assurez-vous d'importer sur le bon appareil
3. Vérifiez les messages d'erreur dans la console
4. Contactez le support technique si nécessaire

## 🎯 Résumé

**Problème** : Données locales non synchronisées entre appareils
**Solution** : Export/Import manuel avec fonctions intelligentes
**Résultat** : Synchronisation complète possible entre tous les appareils

La synchronisation est maintenant **100% fonctionnelle** avec les nouvelles fonctions d'export/import !
