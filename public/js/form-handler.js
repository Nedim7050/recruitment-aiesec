// Configuration
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbz-jgAxjw8fWp7ZkVbd9smlWBdkM3dX2AuovkqnnWviRqzu6gtNChNdTmfWdM2NiDr0/exec';

// Fonction de test de connectivité
async function testConnection() {
    try {
        console.log('🧪 Test de connectivité avec Apps Script...');
        const testUrl = `${GOOGLE_SHEETS_API}?test=1`;
        const img = new Image();
        img.onload = () => console.log('✅ Connexion Apps Script OK');
        img.onerror = () => console.log('❌ Connexion Apps Script échouée');
        img.src = testUrl;
    } catch (error) {
        console.error('❌ Erreur test connexion:', error);
    }
}

// Fonction pour détecter le type d'appareil
function getDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobile ? 'mobile' : 'desktop';
}

// Fonction pour envoyer les données au Google Sheet
async function submitToGoogleSheets(formData) {
    try {
        console.log('🚀 Envoi des données au Google Sheet:', formData);
        
        // Méthode 1: Essayer avec fetch (mode no-cors) - Format pour Apps Script
        try {
            // Format exact pour votre script Apps Script
            const sheetData = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                device: {
                    type: formData.device,
                    userAgent: navigator.userAgent
                }
            };
            
            const response = await fetch(GOOGLE_SHEETS_API, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sheetData)
            });
            
            console.log('✅ Données envoyées au Google Sheet (format Apps Script)');
            return { success: true };
            
        } catch (fetchError) {
            console.log('⚠️ Fetch échoué, essai avec méthode alternative...');
            
            // Méthode 2: Utiliser un formulaire HTML traditionnel (plus fiable avec Apps Script)
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = GOOGLE_SHEETS_API;
            form.target = '_blank';
            form.style.display = 'none';
            
            // Ajouter les champs avec les noms attendus par votre script Apps Script
            const fields = {
                'name': formData.name,
                'email': formData.email,
                'message': formData.message,
                'device': JSON.stringify({
                    type: formData.device,
                    userAgent: navigator.userAgent
                })
            };
            
            Object.keys(fields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            });
            
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            
            console.log('✅ Données envoyées via formulaire HTML');
            return { success: true };
        }
        
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            
            // Fallback: Sauvegarder en localStorage en cas d'échec
            try {
                const existingData = JSON.parse(localStorage.getItem('aiesec_contacts') || '[]');
                const contactData = {
                    ...formData,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                };
                existingData.push(contactData);
                localStorage.setItem('aiesec_contacts', JSON.stringify(existingData));
                console.log('💾 Données de contact sauvegardées en localStorage comme fallback');
            } catch (storageError) {
                console.error('❌ Erreur localStorage:', storageError);
            }
            
            return { success: false, error: error.message };
        }
}

// Gestionnaire du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (!form) {
        console.error('❌ Formulaire de contact non trouvé');
        return;
    }
    
    console.log('✅ Formulaire de contact trouvé, configuration en cours...');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('🚀 Soumission du formulaire de contact démarrée');
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            device: getDeviceType(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Données du formulaire:', formData);
        
        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('❌ Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        // Changer le bouton de soumission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="icon-spinner"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Envoyer au Google Sheet
            const result = await submitToGoogleSheets(formData);
            
            if (result.success) {
                // Succès
                submitBtn.innerHTML = '<i class="icon-checkmark"></i> Message envoyé !';
                submitBtn.className = 'btn btn-success btn-lg';
                
                // Afficher message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = `
                    <i class="icon-checkmark"></i> 
                    <strong>Merci !</strong> Votre message a été envoyé avec succès.<br>
                    <small>Nous vous répondrons bientôt via email.</small>
                `;
                form.appendChild(successMessage);
                
                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = 'btn btn-aiesec btn-lg';
                    submitBtn.disabled = false;
                    successMessage.remove();
                }, 3000);
                
                console.log('✅ Message de contact envoyé avec succès');
                
            } else {
                throw new Error(result.error || 'Erreur inconnue');
            }
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            
            // Erreur
            submitBtn.innerHTML = '<i class="icon-cross"></i> Erreur';
            submitBtn.className = 'btn btn-danger btn-lg';
            
            // Afficher message d'erreur
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-3';
            errorMessage.innerHTML = `
                <i class="icon-cross"></i> 
                <strong>Erreur !</strong> Impossible d'envoyer votre message.<br>
                <small>Veuillez vérifier votre connexion internet et réessayer. Si le problème persiste, contactez-nous directement.</small>
            `;
            form.appendChild(errorMessage);
            
            // Restaurer le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.className = 'btn btn-aiesec btn-lg';
                submitBtn.disabled = false;
                errorMessage.remove();
            }, 3000);
        }
    });
    
    console.log('✅ Gestionnaire du formulaire configuré');
    
    // Tester la connexion au chargement
    testConnection();
});
