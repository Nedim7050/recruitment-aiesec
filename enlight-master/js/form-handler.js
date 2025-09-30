// Configuration
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxo3a4Monbjv0Pg_UnCSKNNH54aFQjOHSc2IEEreyMsXJBecTQEy4s83IRWdFblPD3g/exec';

// Fonction pour détecter le type d'appareil
function getDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobile ? 'mobile' : 'desktop';
}

// Fonction pour envoyer les données au Google Sheet
async function submitToGoogleSheets(formData) {
    try {
        console.log('🚀 Envoi des données au Google Sheet:', formData);
        
        const response = await fetch(GOOGLE_SHEETS_API, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('✅ Données envoyées avec succès au Google Sheet');
        return { success: true };
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi:', error);
        return { success: false, error: error.message };
    }
}

// Gestionnaire du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recruitment-form');
    
    if (!form) {
        console.error('❌ Formulaire non trouvé');
        return;
    }
    
    console.log('✅ Formulaire trouvé, configuration en cours...');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('🚀 Soumission du formulaire démarrée');
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            university: document.getElementById('university').value.trim(),
            age: parseInt(document.getElementById('age').value),
            level: document.getElementById('level').value.trim(),
            motivation: document.getElementById('motivation').value.trim(),
            freeSpace: document.getElementById('free-space').value.trim(),
            device: getDeviceType(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Données du formulaire:', formData);
        
        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.university || 
            !formData.age || !formData.level || !formData.motivation) {
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
                submitBtn.innerHTML = '<i class="icon-checkmark"></i> Envoyé avec succès !';
                submitBtn.className = 'btn btn-success btn-lg';
                
                // Afficher message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = '<i class="icon-checkmark"></i> <strong>Merci !</strong> Votre candidature a été enregistrée avec succès.';
                form.appendChild(successMessage);
                
                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = 'btn btn-aiesec btn-lg';
                    submitBtn.disabled = false;
                    successMessage.remove();
                }, 3000);
                
                console.log('✅ Candidature enregistrée avec succès');
                
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
            errorMessage.innerHTML = '<i class="icon-cross"></i> <strong>Erreur !</strong> Impossible d\'enregistrer votre candidature. Veuillez réessayer.';
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
});
