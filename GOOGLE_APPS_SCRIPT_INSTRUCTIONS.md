# Instructions pour Google Apps Script et Google Sheets

## Modifications nécessaires après transformation du formulaire de recrutement en formulaire de contact

### 1. Modifications dans Google Apps Script

#### Code Apps Script à mettre à jour :

```javascript
function doPost(e) {
  try {
    // Récupérer les données du formulaire de contact
    const data = JSON.parse(e.postData.contents);
    
    // Nouvelle structure pour le formulaire de contact
    const contactData = {
      name: data.name,
      email: data.email,
      message: data.message,
      device: data.device.type,
      userAgent: data.device.userAgent,
      timestamp: new Date().toISOString()
    };
    
    // Ouvrir la feuille de calcul
    const sheet = SpreadsheetApp.openById('VOTRE_SHEET_ID').getActiveSheet();
    
    // Ajouter les en-têtes si c'est la première ligne
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Nom', 'Email', 'Message', 'Appareil', 'User Agent', 'Timestamp']
      ]);
    }
    
    // Ajouter les données de contact
    sheet.appendRow([
      contactData.name,
      contactData.email,
      contactData.message,
      contactData.device,
      contactData.userAgent,
      contactData.timestamp
    ]);
    
    // Optionnel: Envoyer un email de notification
    const emailBody = `
      Nouveau message de contact reçu:
      
      Nom: ${contactData.name}
      Email: ${contactData.email}
      Message: ${contactData.message}
      Appareil: ${contactData.device}
      Timestamp: ${contactData.timestamp}
    `;
    
    MailApp.sendEmail({
      to: 'carthagetm@gmail.com',
      subject: 'Nouveau message de contact - AIESEC Carthage',
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erreur:', error);
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour tester le script
function doGet(e) {
  if (e.parameter.test === '1') {
    return ContentService.createTextOutput('Script fonctionnel');
  }
  return ContentService.createTextOutput('API Contact AIESEC Carthage');
}
```

### 2. Modifications dans Google Sheets

#### Structure de la feuille de calcul :

| Colonne A | Colonne B | Colonne C | Colonne D | Colonne E | Colonne F |
|-----------|-----------|-----------|-----------|-----------|-----------|
| **Nom**   | **Email** | **Message** | **Appareil** | **User Agent** | **Timestamp** |

#### Étapes pour configurer la feuille :

1. **Créer une nouvelle feuille** ou utiliser l'existante
2. **Ajouter les en-têtes** dans la première ligne :
   - A1: "Nom"
   - B1: "Email" 
   - C1: "Message"
   - D1: "Appareil"
   - E1: "User Agent"
   - F1: "Timestamp"

3. **Configurer le formatage** :
   - Largeur des colonnes : A=150px, B=200px, C=300px, D=100px, E=200px, F=180px
   - Alignement du texte : Centré pour les en-têtes, Gauche pour le contenu
   - Mise en forme conditionnelle pour les nouvelles entrées

### 3. Déploiement du script

#### Étapes de déploiement :

1. **Ouvrir Google Apps Script** : https://script.google.com
2. **Créer un nouveau projet** ou modifier l'existant
3. **Coller le nouveau code** (remplacer l'ancien)
4. **Sauvegarder le projet** (Ctrl+S)
5. **Déployer le script** :
   - Cliquer sur "Déployer" → "Nouveau déploiement"
   - Type : "Application web"
   - Exécuter en tant que : "Moi"
   - Accès : "Tout le monde"
   - Cliquer sur "Déployer"
6. **Copier l'URL du déploiement** et la mettre à jour dans `form-handler.js`

### 4. Mise à jour de l'URL dans le code

#### Dans le fichier `js/form-handler.js` :

```javascript
// URL mise à jour (déjà configurée) :
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbz-jgAxjw8fWp7ZkVbd9smlWBdkM3dX2AuovkqnnWviRqzu6gtNChNdTmfWdM2NiDr0/exec';
```

✅ **URL déjà mise à jour dans le code !**

### 5. Test du nouveau système

#### Pour tester :

1. **Tester l'API directement** :
   ```
   https://script.google.com/macros/s/AKfycbz-jgAxjw8fWp7ZkVbd9smlWBdkM3dX2AuovkqnnWviRqzu6gtNChNdTmfWdM2NiDr0/exec?test=1
   ```

2. **Tester le formulaire** :
   - Aller sur le site
   - Remplir le formulaire de contact
   - Vérifier que les données apparaissent dans Google Sheets

3. **Vérifier les emails** :
   - S'assurer que les emails de notification sont reçus

### 6. Différences principales avec l'ancien système

| Ancien (Recrutement) | Nouveau (Contact) |
|---------------------|-------------------|
| 8 champs requis | 3 champs requis |
| phone, university, age, level, motivation, freeSpace | message |
| Stockage complexe | Stockage simplifié |
| Candidature | Demande d'information |

### 7. Avantages du nouveau système

- ✅ **Plus simple** : Moins de champs à remplir
- ✅ **Plus flexible** : Permet tous types de questions
- ✅ **Plus accessible** : Moins intimidant pour les visiteurs
- ✅ **Meilleure conversion** : Barrière d'entrée plus faible
- ✅ **Redirection vers Tally** : Pour les candidatures sérieuses

### 8. Maintenance

#### Surveillance recommandée :

1. **Vérifier régulièrement** les données dans Google Sheets
2. **Répondre rapidement** aux messages de contact
3. **Monitorer** les emails de notification
4. **Tester périodiquement** le formulaire

#### Sauvegarde :

- Exporter périodiquement les données de Google Sheets
- Sauvegarder le code Apps Script
- Documenter les modifications apportées

---

**Note importante** : N'oubliez pas de mettre à jour l'URL du script dans `form-handler.js` après le déploiement du nouveau code Apps Script.
