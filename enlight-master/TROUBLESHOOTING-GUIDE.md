# 🔧 Guide de Dépannage - Formulaire de Recrutement

## Problème : Message de succès affiché mais données non reçues dans Google Sheet

### ✅ Solutions Appliquées

1. **Format des données corrigé** : Les données sont maintenant envoyées avec les noms de champs attendus par Apps Script
2. **Méthodes multiples** : 3 méthodes de fallback pour assurer l'envoi
3. **Script de test** : `test-connection.html` pour diagnostiquer les problèmes

### 🔍 Étapes de Diagnostic

#### 1. Vérifiez votre Script Apps Script

Votre script doit avoir une fonction `doPost` qui ressemble à ceci :

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('VOTRE_SPREADSHEET_ID').getSheetByName('AIESEC Carthage - Candidatures');
    
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    const row = [
      Date.now(),
      data.nom || '',
      data.email || '',
      data.telephone || '',
      data.universite || '',
      data.age || '',
      data.niveau || '',
      data.motivation || '',
      data.espace_libre || '',
      data.appareil || '',
      data.date || new Date().toLocaleString('fr-FR')
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### 2. Vérifiez les Autorisations

- **Script déployé** : Assurez-vous que votre script est déployé en tant qu'application web
- **Autorisations** : "Tout le monde, même les utilisateurs anonymes"
- **Accès** : "Tout le monde"

#### 3. Vérifiez l'ID de votre Google Sheet

Remplacez `VOTRE_SPREADSHEET_ID` par l'ID réel de votre Google Sheet dans l'URL :
```
https://docs.google.com/spreadsheets/d/VOTRE_SPREADSHEET_ID/edit
```

#### 4. Testez avec le Script de Diagnostic

1. Ouvrez `test-connection.html` dans votre navigateur
2. Cliquez sur "Test avec Données"
3. Vérifiez si les données apparaissent dans votre Google Sheet

### 🚨 Problèmes Courants et Solutions

#### Problème 1 : "Script non trouvé"
- **Cause** : URL incorrecte ou script non déployé
- **Solution** : Vérifiez l'URL et redéployez le script

#### Problème 2 : "Accès refusé"
- **Cause** : Autorisations incorrectes
- **Solution** : Redéployez avec "Tout le monde, même les utilisateurs anonymes"

#### Problème 3 : "Feuille non trouvée"
- **Cause** : Nom de feuille incorrect ou feuille inexistante
- **Solution** : Vérifiez le nom exact de votre feuille "AIESEC Carthage - Candidatures"

#### Problème 4 : "Données reçues mais pas ajoutées"
- **Cause** : Erreur dans le script Apps Script
- **Solution** : Vérifiez les logs d'exécution dans Apps Script

### 📋 Checklist de Vérification

- [ ] Script Apps Script déployé correctement
- [ ] Autorisations définies sur "Tout le monde"
- [ ] ID de Google Sheet correct
- [ ] Nom de feuille exact : "AIESEC Carthage - Candidatures"
- [ ] Fonction `doPost` implémentée
- [ ] Test avec `test-connection.html` réussi

### 🔄 Redéploiement du Script

Si vous modifiez votre script Apps Script :

1. Sauvegardez le script
2. Cliquez sur "Déployer" → "Nouveau déploiement"
3. Choisissez "Application web"
4. Autorisations : "Tout le monde, même les utilisateurs anonymes"
5. Accès : "Tout le monde"
6. Copiez la nouvelle URL et mettez à jour `form-handler.js`

### 📞 Support

Si le problème persiste :
1. Vérifiez les logs d'exécution dans Apps Script
2. Testez avec `test-connection.html`
3. Vérifiez la console du navigateur (F12)
4. Contactez le support technique

