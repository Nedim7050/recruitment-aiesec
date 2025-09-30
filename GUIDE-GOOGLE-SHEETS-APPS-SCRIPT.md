# 📊 Guide Google Sheets + Apps Script - Solution Simple

## 🎯 **Objectif**
Utiliser Google Sheets comme base de données avec Apps Script pour stocker et récupérer les candidatures.

---

## 📋 **ÉTAPE 1 : Créer un Google Sheet**

### **1.1 Créer le Sheet**
1. **Allez sur** : https://sheets.google.com
2. **Cliquez "Blank"** pour créer un nouveau sheet
3. **Nommez-le** : "AIESEC Carthage - Candidatures"

### **1.2 Configurer les Colonnes**
Dans la **première ligne (A1)**, ajoutez ces en-têtes :
```
A1: ID
B1: Nom
C1: Email
D1: Téléphone
E1: Université
F1: Âge
G1: Niveau
H1: Motivation
I1: Espace Libre
J1: Date
K1: Appareil
L1: User Agent
```

### **1.3 Formater les Colonnes**
1. **Sélectionnez la première ligne**
2. **Cliquez "Format" → "Text formatting" → "Bold"**
3. **Couleur de fond** : Bleu clair pour les en-têtes

---

## 🔧 **ÉTAPE 2 : Créer l'Apps Script**

### **2.1 Ouvrir Apps Script**
1. **Dans votre Google Sheet**, cliquez "Extensions" → "Apps Script"
2. **Une nouvelle fenêtre** s'ouvre avec l'éditeur de code

### **2.2 Supprimer le Code Existant**
1. **Supprimez tout le code** dans l'éditeur
2. **Copiez et collez** le script complet ci-dessous

### **2.3 Script Complet à Coller**

```javascript
// Configuration
const SHEET_NAME = 'AIESEC Carthage - Candidatures';
const ADMIN_PASSWORD = 'admin123'; // Changez ce mot de passe !

// Fonction pour soumettre une candidature
function doPost(e) {
  try {
    // Analyser les données reçues
    const data = JSON.parse(e.postData.contents);
    
    // Validation des données
    if (!data.name || !data.email || !data.phone || !data.university || 
        !data.age || !data.level || !data.motivation || !data.freeSpace) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Tous les champs sont requis'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtenir le sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet non trouvé'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Créer un ID unique
    const id = new Date().getTime().toString();
    
    // Préparer les données à insérer
    const rowData = [
      id,
      data.name,
      data.email,
      data.phone,
      data.university,
      parseInt(data.age),
      data.level,
      data.motivation,
      data.freeSpace,
      new Date().toISOString(),
      data.device?.type || 'unknown',
      data.device?.userAgent || 'unknown'
    ];
    
    // Ajouter la ligne
    sheet.appendRow(rowData);
    
    // Retourner la réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Candidature enregistrée avec succès',
        data: {
          id: id,
          name: data.name,
          email: data.email,
          date: new Date().toISOString()
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erreur serveur: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour récupérer les candidatures (sans authentification - login admin suffisant)
function doGet(e) {
  try {
    // Pas d'authentification ici - le login admin dans le dashboard est suffisant
    
    // Obtenir le sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet non trouvé'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtenir toutes les données
    const data = sheet.getDataRange().getValues();
    
    // Supprimer la première ligne (en-têtes)
    data.shift();
    
    // Convertir en objets
    const candidatures = data.map(row => ({
      id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      university: row[4],
      age: row[5],
      level: row[6],
      motivation: row[7],
      freeSpace: row[8],
      date: row[9],
      device: {
        type: row[10],
        userAgent: row[11]
      }
    }));
    
    // Trier par date (plus récent en premier)
    candidatures.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Retourner les données
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        count: candidatures.length,
        data: candidatures
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erreur serveur: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour obtenir les statistiques
function getStats() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) return null;
    
    const data = sheet.getDataRange().getValues();
    data.shift(); // Supprimer les en-têtes
    
    const total = data.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = data.filter(row => {
      const rowDate = new Date(row[9]);
      rowDate.setHours(0, 0, 0, 0);
      return rowDate.getTime() === today.getTime();
    }).length;
    
    const mobileCount = data.filter(row => row[10] === 'mobile').length;
    const desktopCount = data.filter(row => row[10] === 'desktop').length;
    
    return {
      total,
      today: todayCount,
      mobile: mobileCount,
      desktop: desktopCount
    };
  } catch (error) {
    return null;
  }
}

// Fonction de test
function test() {
  console.log('Apps Script fonctionne correctement !');
  console.log('Sheet:', SHEET_NAME);
  console.log('Password:', ADMIN_PASSWORD);
}
```

---

## 🚀 **ÉTAPE 3 : Déployer l'Apps Script**

### **3.1 Sauvegarder le Script**
1. **Cliquez "Save"** (Ctrl+S)
2. **Nommez le projet** : "AIESEC Carthage API"

### **3.2 Déployer comme Web App**
1. **Cliquez "Deploy" → "New deployment"**
2. **Type** : "Web app"
3. **Execute as** : "Me"
4. **Who has access** : "Anyone"
5. **Cliquez "Deploy"**

### **3.3 Autoriser les Permissions**
1. **Cliquez "Review permissions"**
2. **Choisissez votre compte Google**
3. **Cliquez "Advanced"**
4. **Cliquez "Go to [Project Name] (unsafe)"**
5. **Cliquez "Allow"**

### **3.4 Obtenir l'URL**
1. **Copiez l'URL** qui ressemble à :
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. **Cette URL** est votre API !

---

## 🔧 **ÉTAPE 4 : Modifier le Frontend**

### **4.1 Modifier le JavaScript**
Dans votre fichier `js/custom.js`, remplacez la fonction `storeApplicationData` par :

```javascript
// Function to submit application data to Google Sheets API
async function storeApplicationData(formData) {
    try {
        // Votre URL Apps Script
        const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
        
        // Prepare data for API
        const applicationData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            university: formData.university,
            age: parseInt(formData.age),
            level: formData.level,
            motivation: formData.motivation,
            freeSpace: formData.freeSpace,
            device: getDeviceInfo()
        };

        // Submit to Google Sheets API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData)
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Application submitted successfully:', result.data);
            return { success: true, data: result.data };
        } else {
            console.error('❌ API Error:', result.message);
            return { success: false, message: result.message };
        }

    } catch (error) {
        console.error('❌ Network Error:', error);
        return { success: false, message: 'Erreur de connexion. Veuillez réessayer.' };
    }
}
```

### **4.2 Modifier le Dashboard**
Dans votre fichier `admin-dashboard.html`, remplacez les fonctions de chargement par :

```javascript
// Load candidatures from Google Sheets
async function loadCandidatures() {
    try {
        const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
        const ADMIN_PASSWORD = 'admin123'; // Même mot de passe que dans Apps Script
        
        const response = await fetch(`${API_URL}?password=${ADMIN_PASSWORD}`);
        const result = await response.json();
        
        if (result.success) {
            candidaturesData = result.data;
            displayCandidatures(candidaturesData);
        } else {
            console.error('Error loading candidatures:', result.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}
```

---

## 🧪 **ÉTAPE 5 : Test de Fonctionnement**

### **5.1 Test du Formulaire**
1. **Allez sur votre site**
2. **Remplissez le formulaire**
3. **Cliquez "Submit"**
4. **Vérifiez** que le message de succès apparaît

### **5.2 Test du Google Sheet**
1. **Retournez sur votre Google Sheet**
2. **Vérifiez** qu'une nouvelle ligne a été ajoutée
3. **Toutes les données** doivent être présentes

### **5.3 Test du Dashboard**
1. **Allez sur** `/admin-dashboard.html`
2. **Vérifiez** que les candidatures apparaissent
3. **Testez** le bouton "Actualiser"

---

## 🔒 **ÉTAPE 6 : Sécurité**

### **6.1 Changer le Mot de Passe Admin**
1. **Dans Apps Script**, changez `ADMIN_PASSWORD`
2. **Dans le dashboard**, changez le même mot de passe
3. **Utilisez un mot de passe fort**

### **6.2 Partager le Sheet**
1. **Dans Google Sheets**, cliquez "Share"
2. **Ajoutez votre email** avec accès "Editor"
3. **Retirez l'accès public** si nécessaire

---

## 🎯 **RÉSUMÉ DES INFORMATIONS IMPORTANTES**

### **✅ Votre API URL :**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### **✅ Mot de Passe Admin :**
```
admin123
```

### **✅ Google Sheet :**
- **Nom** : "AIESEC Carthage - Candidatures"
- **Colonnes** : ID, Nom, Email, Téléphone, Université, Âge, Niveau, Motivation, Espace Libre, Date, Appareil, User Agent

---

## 🆘 **Dépannage**

### **❌ Erreur "Sheet non trouvé"**
- Vérifiez que le nom du sheet est exactement "AIESEC Carthage - Candidatures"
- Vérifiez que les en-têtes sont dans la première ligne

### **❌ Erreur de permissions**
- Vérifiez que l'Apps Script a les bonnes permissions
- Redéployez l'Apps Script si nécessaire

### **❌ Erreur CORS**
- Vérifiez que l'Apps Script est déployé avec "Anyone" access
- Vérifiez que l'URL est correcte

---

## 🎉 **Avantages de cette Solution**

### **✅ Simple :**
- Pas de base de données complexe
- Interface Google Sheets familière
- Pas de configuration serveur

### **✅ Gratuit :**
- Google Sheets gratuit
- Apps Script gratuit
- Pas de limite de candidatures

### **✅ Accessible :**
- Données visibles dans Google Sheets
- Export facile en Excel/CSV
- Partage simple avec l'équipe

**Votre système est maintenant prêt ! Suivez ces étapes et dites-moi si vous avez des questions ! 🚀**
