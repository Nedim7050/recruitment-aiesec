// Exemple de script Google Apps Script pour recevoir les données du formulaire
// Remplacez 'VOTRE_SPREADSHEET_ID' par l'ID de votre Google Sheet

function doPost(e) {
  try {
    // Récupérer la feuille de calcul
    const sheet = SpreadsheetApp.openById('VOTRE_SPREADSHEET_ID').getSheetByName('AIESEC Carthage - Candidatures');
    
    // Si la feuille n'existe pas, la créer
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById('VOTRE_SPREADSHEET_ID').insertSheet('AIESEC Carthage - Candidatures');
      // Ajouter les en-têtes
      newSheet.getRange(1, 1, 1, 10).setValues([[
        'ID', 'Nom', 'Email', 'Téléphone', 'Université', 'Âge', 'Niveau', 'Motivation', 'Espace libre', 'Appareil', 'Date'
      ]]);
    }
    
    // Récupérer les données
    let data;
    if (e.postData && e.postData.contents) {
      // Données JSON (méthode fetch)
      data = JSON.parse(e.postData.contents);
    } else {
      // Données de formulaire (méthode HTML)
      data = e.parameter;
    }
    
    // Générer un ID unique
    const id = Date.now();
    
    // Préparer la ligne à ajouter
    const row = [
      id,
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
    
    // Ajouter la ligne à la feuille
    sheet.appendRow(row);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({success: true, id: id, message: 'Candidature enregistrée avec succès'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En cas d'erreur, retourner un message d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Gérer les requêtes GET (pour les tests)
  if (e.parameter.test) {
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Script Apps Script fonctionne'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Traiter les données GET comme POST
  return doPost(e);
}

// Fonction de test pour vérifier le script
function testScript() {
  const testData = {
    nom: 'Test User',
    email: 'test@example.com',
    telephone: '+216 123456789',
    universite: 'Test University',
    age: 22,
    niveau: 'Bachelor',
    motivation: 'Test motivation',
    espace_libre: 'Test free space',
    appareil: 'desktop',
    date: new Date().toLocaleString('fr-FR')
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

