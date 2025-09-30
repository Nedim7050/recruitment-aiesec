// Configuration
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbz-jgAxjw8fWp7ZkVbd9smlWBdkM3dX2AuovkqnnWviRqzu6gtNChNdTmfWdM2NiDr0/exec';

// Gestionnaire du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                device: getDeviceType(),
                timestamp: new Date().toISOString()
            };
            
            // Valider les données
            if (!formData.name || !formData.email || !formData.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Envoyer les données
            submitToGoogleSheets(formData);
        });
    }
});

// Fonction pour envoyer les données à Google Sheets
async function submitToGoogleSheets(data) {
    try {
        showMessage('Sending message...', 'info');
        
        const response = await fetch(GOOGLE_SHEETS_API, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // En cas de succès (même avec no-cors)
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        
        // Sauvegarder en local en cas de problème
        saveToLocalStorage(data);
        
        // Réinitialiser le formulaire
        document.getElementById('contact-form').reset();
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('There was an error sending your message. Please try again.', 'error');
        
        // Sauvegarder en local
        saveToLocalStorage(data);
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