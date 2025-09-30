# 🎛️ Guide de Configuration du Dashboard Admin

## 🚀 Configuration Complète du Système d'Administration

### **📋 Vue d'Ensemble**

Le système d'administration AIESEC Carthage comprend :
- **Page de Login** (`login.html`) - Authentification sécurisée
- **Dashboard** (`dashboard.html`) - Visualisation des candidatures
- **Intégration Formspree** - Récupération des données

---

## 🔐 Configuration de l'Authentification

### **1. Identifiants par Défaut**
```
Username: admin
Password: aiesec2025
```

### **2. Personnalisation des Identifiants**

#### **Option A : Modification Simple**
Dans `login.html`, ligne 200 environ :
```javascript
if (username === 'admin' && password === 'aiesec2025') {
    // Login successful
}
```

#### **Option B : Authentification Avancée**
```javascript
// Ajouter dans login.html
const validCredentials = {
    'admin': 'aiesec2025',
    'lcp': 'lcp2025',
    'vp': 'vp2025'
};

if (validCredentials[username] === password) {
    // Login successful
}
```

---

## 📊 Intégration avec Formspree

### **1. Récupération des Données**

#### **API Formspree (Recommandé)**
```javascript
// Dans dashboard.html
async function fetchApplications() {
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID/submissions', {
            headers: {
                'Authorization': 'Bearer YOUR_API_TOKEN'
            }
        });
        const data = await response.json();
        return data.submissions;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
```

#### **Webhook Formspree (Automatique)**
```javascript
// Configuration webhook dans Formspree
const webhookUrl = 'https://your-domain.vercel.app/api/webhook';
```

### **2. Configuration de l'API Token**

1. **Se connecter à Formspree**
2. **Aller dans Settings > API**
3. **Générer un token API**
4. **Remplacer `YOUR_API_TOKEN` dans le code**

---

## 🗄️ Stockage des Données

### **Option 1 : Airtable (Recommandé)**

#### **Configuration Airtable**
```javascript
// Configuration Airtable
const AIRTABLE_API_KEY = 'your_api_key';
const AIRTABLE_BASE_ID = 'your_base_id';
const AIRTABLE_TABLE_NAME = 'Applications';

async function fetchFromAirtable() {
    const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
        {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        }
    );
    return response.json();
}
```

### **Option 2 : Google Sheets**

#### **Configuration Google Sheets API**
```javascript
// Configuration Google Sheets
const GOOGLE_SHEETS_API_KEY = 'your_api_key';
const SHEET_ID = 'your_sheet_id';

async function fetchFromGoogleSheets() {
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`
    );
    return response.json();
}
```

### **Option 3 : Base de Données Simple**

#### **JSON Server (Développement)**
```bash
npm install -g json-server
json-server --watch db.json --port 3001
```

---

## 🔄 Mise à Jour en Temps Réel

### **1. WebSocket (Temps Réel)**
```javascript
// Configuration WebSocket
const ws = new WebSocket('wss://your-websocket-server.com');

ws.onmessage = function(event) {
    const newApplication = JSON.parse(event.data);
    addApplicationToTable(newApplication);
    updateStats();
};
```

### **2. Polling (Vérification Périodique)**
```javascript
// Vérification toutes les 30 secondes
setInterval(async () => {
    const newData = await fetchApplications();
    if (newData.length > applicationsData.length) {
        updateTable(newData);
        showNotification('New application received!');
    }
}, 30000);
```

---

## 📧 Notifications Email

### **1. Configuration EmailJS**
```javascript
// Configuration EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

function sendNotification(application) {
    emailjs.send('service_id', 'template_id', {
        to_email: 'aiesec.tunisia.carthage@gmail.com',
        applicant_name: application.name,
        applicant_email: application.email,
        application_date: application.date
    });
}
```

### **2. Notifications Push**
```javascript
// Service Worker pour notifications push
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Demander permission pour notifications
Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        // Envoyer notification
        new Notification('New AIESEC Application', {
            body: `${application.name} has applied to AIESEC Carthage`,
            icon: '/favicon.png'
        });
    }
});
```

---

## 📊 Analytics et Rapports

### **1. Google Analytics**
```javascript
// Suivi des actions admin
gtag('event', 'admin_login', {
    'event_category': 'admin',
    'event_label': 'dashboard_access'
});

gtag('event', 'application_view', {
    'event_category': 'admin',
    'event_label': 'application_details'
});
```

### **2. Rapports Automatiques**
```javascript
// Génération de rapports hebdomadaires
function generateWeeklyReport() {
    const weekData = getApplicationsForWeek();
    const report = {
        totalApplications: weekData.length,
        topUniversities: getTopUniversities(weekData),
        conversionRate: calculateConversionRate(weekData)
    };
    
    // Envoyer par email
    sendReportEmail(report);
}
```

---

## 🛡️ Sécurité

### **1. Authentification Renforcée**
```javascript
// JWT Token
const token = localStorage.getItem('auth_token');
if (!token || isTokenExpired(token)) {
    window.location.href = 'login.html';
}

// Vérification de session
setInterval(() => {
    if (!isUserActive()) {
        logout();
    }
}, 300000); // 5 minutes
```

### **2. Protection CSRF**
```javascript
// Token CSRF
const csrfToken = generateCSRFToken();
fetch('/api/applications', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken
    }
});
```

---

## 📱 Responsive et Accessibilité

### **1. Optimisation Mobile**
```css
@media (max-width: 768px) {
    .dashboard-content {
        padding: 15px;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
```

### **2. Accessibilité**
```html
<!-- ARIA Labels -->
<button aria-label="View application details" onclick="viewApplication(id)">
    <i class="fas fa-eye"></i>
</button>

<!-- Keyboard Navigation -->
<div tabindex="0" onkeydown="handleKeyPress(event)">
    Application Row
</div>
```

---

## 🚀 Déploiement

### **1. Variables d'Environnement**
```bash
# .env.local
FORMSPREE_API_TOKEN=your_token_here
AIRTABLE_API_KEY=your_key_here
GOOGLE_SHEETS_API_KEY=your_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password
```

### **2. Configuration Vercel**
```json
// vercel.json
{
    "env": {
        "FORMSPREE_API_TOKEN": "@formspree_token",
        "AIRTABLE_API_KEY": "@airtable_key"
    }
}
```

---

## 🔧 Maintenance

### **1. Sauvegarde Automatique**
```javascript
// Sauvegarde quotidienne
function dailyBackup() {
    const data = getAllApplications();
    const backup = {
        date: new Date().toISOString(),
        data: data
    };
    
    // Sauvegarder dans le cloud
    saveToCloud(backup);
}
```

### **2. Monitoring**
```javascript
// Surveillance des erreurs
window.addEventListener('error', function(e) {
    // Envoyer l'erreur à un service de monitoring
    sendErrorReport(e.error);
});
```

---

## 📞 Support et Dépannage

### **Problèmes Courants :**

1. **Login ne fonctionne pas :**
   - Vérifier les identifiants dans le code
   - Contrôler la console pour les erreurs

2. **Données ne se chargent pas :**
   - Vérifier l'API token
   - Contrôler les permissions CORS

3. **Notifications ne s'envoient pas :**
   - Vérifier la configuration EmailJS
   - Contrôler les quotas d'envoi

### **Contact Support :**
- **Formspree** : [help.formspree.io](https://help.formspree.io)
- **Airtable** : [airtable.com/support](https://airtable.com/support)
- **Vercel** : [vercel.com/docs](https://vercel.com/docs)

---

*Dernière mise à jour : Janvier 2025*

