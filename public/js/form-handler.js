// Configuration
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbw1DNcOCFE0Pcbpm1iL8YOJ8kPk9EzJ_VG3FLQ7BMicxi9uUyuc7vPu6Qj7yvfAd9-7/exec';

// Gestionnaire du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        console.log('✅ Formulaire de contact trouvé et configuré');
        console.log('📡 URL API:', GOOGLE_SHEETS_API);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('📝 Formulaire soumis');
            
            // Récupérer les données du formulaire avec la structure attendue par Apps Script
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                device: {
                    type: getDeviceType(),
                    userAgent: navigator.userAgent
                },
                timestamp: new Date().toISOString()
            };
            
            console.log('📊 Données du formulaire:', formData);
            
            // Valider les données
            if (!formData.name || !formData.email || !formData.message) {
                console.error('❌ Validation échouée - champs manquants');
                showMessage('Veuillez remplir tous les champs requis.', 'error');
                return;
            }
            
            console.log('✅ Validation OK - Envoi en cours...');
            
            // Envoyer les données
            submitToGoogleSheets(formData);
        });
    } else {
        console.error('❌ Formulaire contact-form non trouvé !');
    }
});

// Fonction pour envoyer les données à Google Sheets
async function submitToGoogleSheets(data) {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Désactiver le bouton et afficher un loader
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Envoi en cours...';
        
        console.log('📤 Envoi des données:', data);
        console.log('📤 URL API:', GOOGLE_SHEETS_API);
        
        // Créer un iframe caché pour la soumission (si pas déjà créé)
        let iframe = document.getElementById('hidden_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'hidden_iframe';
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            console.log('✅ Iframe créé');
        }
        
        // Créer un formulaire HTML pour soumettre les données
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = GOOGLE_SHEETS_API;
        form.target = 'hidden_iframe';
        form.style.display = 'none';
        
        // Ajouter les champs avec les noms exacts
        const fields = {
            'name': data.name,
            'email': data.email,
            'message': data.message,
            'device': JSON.stringify(data.device),
            'timestamp': data.timestamp
        };
        
        console.log('📝 Champs du formulaire:', fields);
        
        Object.keys(fields).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            form.appendChild(input);
        });
        
        document.body.appendChild(form);
        
        // Soumettre le formulaire
        console.log('📤 Soumission du formulaire vers Google Apps Script...');
        form.submit();
        
        // Attendre que la soumission soit complète
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Nettoyer le formulaire temporaire
        if (form.parentNode) {
            document.body.removeChild(form);
        }
        
        console.log('✅ Formulaire soumis avec succès');
        
        // Afficher le message de succès
        showMessage('✅ Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.', 'success');
        
        // Sauvegarder en local comme backup
        saveToLocalStorage(data);
        
        // Réinitialiser le formulaire original
        document.getElementById('contact-form').reset();
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        showMessage('❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error');
        
        // Sauvegarder en local
        saveToLocalStorage(data);
    } finally {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Fonction pour sauvegarder en local
function saveToLocalStorage(data) {
    try {
        const existingData = JSON.parse(localStorage.getItem('aiesec_contacts') || '[]');
        existingData.push(data);
        localStorage.setItem('aiesec_contacts', JSON.stringify(existingData));
        console.log('Data saved locally:', data);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Fonction pour afficher les messages
function showMessage(message, type) {
    // Supprimer les anciens messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'}`;
    messageDiv.textContent = message;
    messageDiv.style.marginTop = '10px';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '4px';
    
    // Ajouter le message au formulaire
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Fonction pour détecter le type d'appareil
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
        return 'Mobile';
    } else if (/Tablet|iPad/.test(userAgent)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}