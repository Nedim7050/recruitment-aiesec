# 📋 Guide de Configuration du Formulaire de Recrutement

## 🚀 Solutions Recommandées pour Vercel (Sans Backend)

### **1. Formspree (Solution Recommandée)**

#### **Étapes de Configuration :**

1. **Créer un compte Formspree :**
   - Aller sur [formspree.io](https://formspree.io)
   - Créer un compte gratuit
   - Vérifier votre email

2. **Créer un nouveau formulaire :**
   - Cliquer sur "New Form"
   - Nommer le formulaire : "AIESEC Carthage Recruitment"
   - Copier l'ID du formulaire (ex: `xvgkqjqw`)

3. **Mettre à jour le code :**
   - Dans `index.html`, remplacer `YOUR_FORM_ID` par votre ID
   - Remplacer `https://your-domain.vercel.app` par votre URL Vercel

4. **Configuration avancée :**
   - Activer les notifications email
   - Configurer les réponses automatiques
   - Ajouter des règles de validation

#### **Avantages :**
- ✅ Gratuit jusqu'à 50 soumissions/mois
- ✅ Interface simple et intuitive
- ✅ Notifications email automatiques
- ✅ Protection anti-spam intégrée
- ✅ Compatible avec Vercel

---

### **2. Netlify Forms (Alternative)**

Si vous préférez Netlify :

1. **Ajouter l'attribut `netlify` :**
```html
<form id="recruitment-form" netlify name="recruitment" method="POST">
```

2. **Déployer sur Netlify :**
   - Connecter votre repository GitHub
   - Les soumissions apparaîtront dans le dashboard Netlify

---

### **3. EmailJS (Solution JavaScript)**

Pour une solution 100% frontend :

1. **Créer un compte EmailJS :**
   - Aller sur [emailjs.com](https://emailjs.com)
   - Créer un service email (Gmail, Outlook, etc.)

2. **Intégrer dans le code :**
```javascript
// Dans custom.js
emailjs.send('service_id', 'template_id', {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    university: formData.university,
    motivation: formData.motivation
});
```

---

## 📧 Configuration Email

### **Pour Formspree :**

1. **Notifications :**
   - Email de destination : `aiesec.tunisia.carthage@gmail.com`
   - Sujet personnalisé : "New AIESEC Carthage Application"

2. **Réponse automatique :**
   - Créer un template de confirmation
   - Personnaliser le message de remerciement

### **Champs du Formulaire :**
- **Name** : Nom complet
- **Email** : Adresse email
- **Phone** : Numéro de téléphone
- **University** : Université
- **Motivation** : Message de motivation

---

## 🔧 Configuration Vercel

### **Variables d'Environnement :**
```bash
# .env.local
FORMSPREE_ID=your_form_id_here
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### **Déploiement :**
1. Connecter votre repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

---

## 📱 Test du Formulaire

### **Checklist de Test :**
- [ ] Formulaire se soumet correctement
- [ ] Email de notification reçu
- [ ] Réponse automatique envoyée
- [ ] Redirection vers page de remerciement
- [ ] Validation des champs obligatoires
- [ ] Protection anti-spam fonctionnelle

---

## 🛡️ Sécurité et Conformité

### **Protection Anti-Spam :**
- Formspree inclut une protection intégrée
- Captcha optionnel disponible
- Limitation du taux de soumission

### **RGPD/Confidentialité :**
- Ajouter une politique de confidentialité
- Mentionner l'utilisation des données
- Option de désinscription

---

## 📊 Analytics et Suivi

### **Google Analytics :**
```javascript
// Suivi des soumissions
gtag('event', 'form_submit', {
    'event_category': 'engagement',
    'event_label': 'recruitment_form'
});
```

### **Métriques à Suivre :**
- Nombre de soumissions par jour/semaine
- Taux de conversion (visiteurs → candidatures)
- Sources de trafic les plus performantes

---

## 🚨 Dépannage

### **Problèmes Courants :**

1. **Formulaire ne se soumet pas :**
   - Vérifier l'ID Formspree
   - Contrôler la console pour les erreurs
   - Tester avec un formulaire simple

2. **Emails non reçus :**
   - Vérifier le dossier spam
   - Contrôler la configuration email
   - Tester avec une autre adresse

3. **Redirection ne fonctionne pas :**
   - Vérifier l'URL de redirection
   - S'assurer que la page existe
   - Tester la redirection manuellement

---

## 📞 Support

Pour toute question :
- **Formspree** : [help.formspree.io](https://help.formspree.io)
- **Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **EmailJS** : [emailjs.com/docs](https://emailjs.com/docs)

---

*Dernière mise à jour : Janvier 2025*

