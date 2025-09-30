// Configuration
const SHEET_NAME = 'AIESEC Carthage - Candidatures';

// Fonction pour soumettre une candidature (POST)
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
          message: 'Sheet non trouvé: ' + SHEET_NAME
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Générer un ID unique
    const id = new Date().getTime();
    
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

// Fonction pour récupérer les candidatures (GET) - SANS AUTHENTIFICATION
function doGet(e) {
  try {
    // Obtenir le sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet non trouvé: ' + SHEET_NAME
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtenir toutes les données
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    // Si pas de données (seulement les en-têtes)
    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          data: [],
          message: 'Aucune candidature trouvée'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Convertir en objets
    const headers = values[0];
    const candidatures = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const candidature = {};
      
      for (let j = 0; j < headers.length; j++) {
        candidature[headers[j]] = row[j];
      }
      
      candidatures.push(candidature);
    }
    
    // Retourner les données
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: candidatures,
        total: candidatures.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erreur lors de la récupération: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction de test
function test() {
  console.log('Apps Script fonctionne correctement !');
  console.log('Sheet:', SHEET_NAME);
}
