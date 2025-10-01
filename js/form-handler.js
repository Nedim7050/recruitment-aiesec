// Configuration - Pour le formulaire de recrutement
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxo3a4Monbjv0Pg_UnCSKNNH54aFQjOHSc2IEEreyMsXJBecTQEy4s83IRWdFblPD3g/exec';

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
                phone: formData.phone,
                university: formData.university,
                age: formData.age,
                level: formData.level,
                motivation: formData.motivation,
                freeSpace: formData.freeSpace,
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
                'phone': formData.phone,
                'university': formData.university,
                'age': formData.age,
                'level': formData.level,
                'motivation': formData.motivation,
                'freeSpace': formData.freeSpace,
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
                const existingData = JSON.parse(localStorage.getItem('aiesec_candidates') || '[]');
                const candidateData = {
                    ...formData,
                    id: Date.now(),
                    timestamp: new Date().toISOString()
                };
                existingData.push(candidateData);
                localStorage.setItem('aiesec_candidates', JSON.stringify(existingData));
                console.log('💾 Données sauvegardées en localStorage comme fallback');
            } catch (storageError) {
                console.error('❌ Erreur localStorage:', storageError);
            }
            
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
                successMessage.innerHTML = `
                    <i class="icon-checkmark"></i> 
                    <strong>Merci !</strong> Votre candidature a été enregistrée avec succès dans notre système.<br>
                    <small>Nous vous contacterons bientôt via email ou téléphone.</small>
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
            errorMessage.innerHTML = `
                <i class="icon-cross"></i> 
                <strong>Erreur !</strong> Impossible d'enregistrer votre candidature.<br>
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
