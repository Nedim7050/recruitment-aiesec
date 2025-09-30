# 📊 Guide Dashboard - Stockage Local des Candidatures

## ✅ Comment Ça Fonctionne

Votre système est **DÉJÀ configuré** pour fonctionner ainsi :

### **Processus Automatique**

```
1. Utilisateur remplit le formulaire sur index.html
   ↓
2. Validation des données (age, email, téléphone, etc.)
   ↓
3. Données envoyées à DEUX endroits en même temps :
   • Formspree (email + backup cloud)
   • localStorage (dashboard local)
   ↓
4. Dashboard lit les données depuis localStorage
   ↓
5. Affichage dans le tableau du dashboard
```

---

## 🔧 Configuration Actuelle

### **Fichier : `js/custom.js` (lignes 125-221)**

Le formulaire stocke automatiquement dans `localStorage` :

```javascript
function storeApplicationData(formData) {
  // Récupère les candidatures existantes
  var existingApplications = JSON.parse(
    localStorage.getItem('aiesecApplications') || '[]'
  );
  
  // Crée une nouvelle candidature avec ID unique
  var newApplication = {
    id: Date.now(),
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    university: formData.university,
    age: parseInt(formData.age),
    level: formData.level,
    motivation: formData.motivation,
    freeSpace: formData.freeSpace,
    date: new Date().toISOString()
  };
  
  // Ajoute aux existantes
  existingApplications.push(newApplication);
  
  // Sauvegarde dans localStorage
  localStorage.setItem('aiesecApplications', JSON.stringify(existingApplications));
}
```

---

## ❗ Le Problème du Cache

### **Pourquoi les données disparaissent**

```
❌ Quand vous videz le cache du navigateur
   → localStorage est AUSSI effacé
   → Toutes les candidatures disparaissent

❌ Quand l'URL change (http → https, www → sans www)
   → localStorage est lié au domaine exact
   → Données non accessibles

❌ Mode navigation privée
   → localStorage temporaire
   → Effacé à la fermeture
```

---

## ✅ Solutions pour Ne Jamais Perdre les Données

### **Solution 1 : Export Automatique Régulier** (RECOMMANDÉ)

Ajoutez cette fonctionnalité au dashboard pour sauvegarder automatiquement :

```javascript
// Dans dashboard.html, ajoutez ce code

// Export automatique toutes les heures
setInterval(function() {
  autoBackupApplications();
}, 3600000); // 1 heure

function autoBackupApplications() {
  var applications = JSON.parse(localStorage.getItem('aiesecApplications') || '[]');
  if (applications.length > 0) {
    var dataStr = JSON.stringify(applications, null, 2);
    var dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    var link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `aiesec-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
}
```

---

### **Solution 2 : Synchronisation avec Formspree**

Vos données sont DÉJÀ sauvegardées sur Formspree ! Pour les récupérer :

1. **Connectez-vous à Formspree**
   ```
   https://formspree.io
   Login → Votre formulaire
   ```

2. **Exportez les données**
   - Cliquez sur "Export"
   - Format : CSV ou JSON
   - Toutes vos candidatures sont là

3. **Importez dans le Dashboard**
   ```javascript
   // Fonction d'import à ajouter au dashboard
   function importFromCSV(csvFile) {
     // Lire le CSV
     // Convertir en JSON
     // Sauvegarder dans localStorage
   }
   ```

---

### **Solution 3 : Backup Avant Vider le Cache**

**Avant CHAQUE vidage de cache :**

1. Ouvrez le Dashboard
2. Cliquez sur "Export Data"
3. Sauvegardez le fichier JSON
4. Après avoir vidé le cache, importez ce fichier

---

## 🎯 Recommandation Finale

### **Utilisez les DEUX systèmes**

```
Formspree (Cloud) = Source de vérité principale
    ↓
  + ↓ +
    ↓
LocalStorage = Visualisation rapide locale
```

### **Workflow Idéal**

1. **Les candidatures arrivent → Formspree + localStorage**

2. **Consultation rapide → Dashboard localStorage**

3. **Backup permanent → Formspree + Export mensuel**

4. **Si localStorage vide → Import depuis Formspree**

---

## 📋 Checklist de Maintenance

### **Chaque Semaine**
- [ ] Vérifier que le formulaire fonctionne
- [ ] Tester l'envoi d'une candidature test
- [ ] Vérifier que les données apparaissent dans le dashboard

### **Chaque Mois**
- [ ] Exporter les données du dashboard (backup)
- [ ] Vérifier les données sur Formspree
- [ ] Sauvegarder le fichier export dans un lieu sûr

### **Avant de Vider le Cache**
- [ ] Exporter les données du dashboard
- [ ] Sauvegarder le fichier export
- [ ] Après vidage : importer le fichier si nécessaire

---

## 🔍 Debug : Vérifier les Données

### **Console du Navigateur (F12)**

```javascript
// Voir toutes les candidatures
var apps = JSON.parse(localStorage.getItem('aiesecApplications') || '[]');
console.log('Candidatures:', apps);
console.log('Nombre total:', apps.length);

// Voir la dernière candidature
console.log('Dernière:', apps[apps.length - 1]);

// Effacer toutes les données (ATTENTION!)
// localStorage.removeItem('aiesecApplications');
```

---

## 💡 Points Importants

### **À Savoir**

✅ **Le formulaire fonctionne :**
- Envoie à Formspree ✓
- Stocke dans localStorage ✓
- Validation des données ✓

✅ **Les données sont en sécurité SI :**
- Vous ne videz pas le cache
- Vous exportez régulièrement
- Vous comptez sur Formspree comme backup

❌ **Les données DISPARAISSENT SI :**
- Vous videz le cache sans export
- Vous changez de navigateur
- Vous utilisez mode privé
- L'URL change

---

## 🎓 Formation Rapide

### **Pour les Admins**

1. **Accéder au Dashboard :**
   ```
   https://votre-site.vercel.app/dashboard
   Login: admin
   Password: aiesec2025
   ```

2. **Voir les Candidatures :**
   - Tableau avec toutes les infos
   - Tri, recherche, pagination

3. **Exporter les Données :**
   - Bouton "Export" en haut
   - Sauvegardez le fichier JSON

4. **Importer si Nécessaire :**
   - Bouton "Import"
   - Sélectionnez le fichier JSON

---

## 🚀 En Résumé

**Votre système fonctionne déjà !**

✅ Formulaire → localStorage automatiquement
✅ Dashboard lit localStorage
✅ Formspree = backup cloud

**Le seul problème :**
❌ localStorage effacé avec le cache

**La solution :**
✅ Comptez sur Formspree comme source principale
✅ Exportez régulièrement pour backup local
✅ Ne videz le cache qu'après export

---

**Vos données sont en sécurité tant que vous ne videz pas le cache !** 🔒
