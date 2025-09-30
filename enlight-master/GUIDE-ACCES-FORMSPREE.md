# 🔑 Guide d'Accès à Formspree - AIESEC Carthage

## 📋 Vue d'Ensemble

Toutes vos candidatures sont automatiquement envoyées à Formspree. Voici comment y accéder.

---

## 🚀 Accès Rapide à Formspree

### **Lien Direct**
👉 **https://formspree.io**

### **Votre Formulaire**
- **Endpoint actuel :** `https://formspree.io/f/xpwnqkqk`
- **ID du formulaire :** `xpwnqkqk`

---

## 🔐 Étapes de Connexion

### **Étape 1 : Aller sur Formspree**
```
https://formspree.io
```

### **Étape 2 : Se Connecter**

#### **Option A : Vous avez déjà un compte**
1. Cliquez sur "Log in"
2. Entrez votre email
3. Entrez votre mot de passe
4. Cliquez "Log in"

#### **Option B : Créer un nouveau compte**
1. Cliquez sur "Sign up"
2. Entrez votre email (utilisez l'email qui reçoit les notifications)
3. Créez un mot de passe
4. Vérifiez votre email
5. Cliquez sur le lien de confirmation
6. Connectez-vous

---

## 📊 Voir Vos Candidatures

### **Une fois connecté :**

1. **Dashboard :** Vous verrez la liste de vos formulaires

2. **Trouvez votre formulaire :**
   - Nom : "AIESEC Carthage" ou similaire
   - ID : `xpwnqkqk`

3. **Cliquez dessus**

4. **Vous verrez :**
   ```
   📧 Submissions Tab
   ├─ Toutes les candidatures
   ├─ Nom, Email, Téléphone
   ├─ Université, Âge, Niveau
   ├─ Motivation, Questions
   └─ Date de soumission
   ```

---

## 💾 Exporter les Données

### **Format CSV (Excel)**

1. Dans votre formulaire, cliquez sur **"Submissions"**
2. Cliquez sur **"Export"** ou **"Download CSV"**
3. Choisissez la période :
   - Tout
   - Dernier mois
   - Période personnalisée
4. Téléchargez le fichier
5. Ouvrez avec Excel/Google Sheets

### **Format JSON (Développeurs)**

1. Même processus
2. Sélectionnez "JSON" au lieu de "CSV"
3. Parfait pour importer dans le dashboard

---

## 📧 Configuration Email

### **Recevoir des Notifications**

1. Allez dans **"Settings"** du formulaire
2. Section **"Email Notifications"**
3. Configurez :
   ```
   ✅ Send email notification on new submission
   ✅ Email to: votre@email.com
   ✅ Reply-to: email du candidat
   ```

### **Template d'Email Personnalisé**

```
Nouvelle candidature AIESEC !

Nom: {{name}}
Email: {{email}}
Téléphone: {{phone}}
Université: {{university}}
Âge: {{age}}
Niveau: {{level}}

Motivation:
{{motivation}}

Questions:
{{free-space}}

---
Soumis le: {{date}}
```

---

## 🔧 Si Vous N'Avez Pas Accès

### **Scénario 1 : Formulaire Créé avec un Autre Email**

**Solution :**
1. Vérifiez quel email reçoit les notifications de candidatures
2. Utilisez CET email pour vous connecter à Formspree
3. Vous devriez voir le formulaire

---

### **Scénario 2 : Compte Perdu / Mot de Passe Oublié**

**Solution :**
1. Sur https://formspree.io, cliquez "Forgot password?"
2. Entrez votre email
3. Suivez le lien de réinitialisation
4. Créez un nouveau mot de passe

---

### **Scénario 3 : Créer un NOUVEAU Formulaire**

Si vous ne trouvez vraiment pas l'ancien :

#### **Étape 1 : Créer le Formulaire**
1. Connectez-vous à Formspree
2. Cliquez "New Form"
3. Nom : "AIESEC Carthage Recruitment"
4. Email : votre email principal
5. Créez

#### **Étape 2 : Obtenir le Nouveau ID**
```
Vous recevrez : https://formspree.io/f/NOUVEAU_ID
```

#### **Étape 3 : Mettre à Jour le Site**

Dans `index.html`, ligne 771, remplacez :
```html
<!-- AVANT -->
action="https://formspree.io/f/xpwnqkqk"

<!-- APRÈS -->
action="https://formspree.io/f/VOTRE_NOUVEAU_ID"
```

#### **Étape 4 : Déployer**
```bash
git add index.html
git commit -m "Update Formspree endpoint"
git push
```

---

## 📱 Application Mobile Formspree

Formspree n'a pas d'app mobile officielle, mais :
- ✅ Le site web est responsive
- ✅ Fonctionne parfaitement sur mobile
- ✅ Accédez depuis n'importe où

---

## 💰 Limites du Plan Gratuit

### **Plan Free de Formspree**
```
✅ 50 soumissions/mois
✅ Stockage illimité des anciennes soumissions
✅ Export CSV/JSON
✅ Notifications email
✅ 1 utilisateur
```

### **Si Vous Dépassez 50/mois**
- Upgrade vers le plan payant
- OU Créez plusieurs formulaires
- OU Utilisez un autre service

---

## 🔍 Vérifier Que Ça Marche

### **Test Complet**

1. **Remplissez votre formulaire** sur le site
2. **Vérifiez votre boîte email** : email de notification reçu ?
3. **Connectez-vous à Formspree**
4. **Allez dans "Submissions"**
5. **Vérifiez** que la soumission test apparaît

---

## 🆘 Support Formspree

### **Si Vous Avez Besoin d'Aide**

**Email Support :**
- support@formspree.io

**Documentation :**
- https://help.formspree.io

**Status :**
- https://status.formspree.io

---

## 📊 Alternative : Vérifier les Emails

### **Si Vous Ne Trouvez Pas Votre Compte Formspree**

Vous recevez quand même un email pour chaque candidature !

**Dans votre boîte mail :**
1. Cherchez "AIESEC" ou "New submission"
2. Tous les emails de candidatures sont là
3. Vous avez toutes les infos dans les emails

**Pour organiser :**
- Créez un dossier/label "AIESEC Candidatures"
- Déplacez tous les emails dedans
- Vous avez un backup automatique !

---

## ✅ Checklist de Vérification

### **Avant de Chercher sur Formspree**

- [ ] Quel email reçoit les notifications ?
- [ ] Avez-vous vérifié cet email sur Formspree ?
- [ ] Avez-vous cherché "AIESEC" dans vos emails ?
- [ ] Le formulaire envoie-t-il des emails ?

### **Pour Créer un Nouveau Formulaire**

- [ ] Compte Formspree créé
- [ ] Nouveau formulaire créé
- [ ] Nouvel ID récupéré
- [ ] index.html mis à jour
- [ ] Site déployé sur Vercel
- [ ] Test de soumission effectué
- [ ] Email de notification reçu

---

## 🎯 En Résumé

### **Accès Normal**
1. https://formspree.io
2. Login avec votre email
3. Cliquez sur votre formulaire
4. Voyez toutes les soumissions

### **Si Problème**
1. Vérifiez quel email reçoit les notifications
2. Utilisez cet email pour vous connecter
3. OU créez un nouveau formulaire

### **Backup Automatique**
- Chaque candidature → Email dans votre boîte
- Vous avez toujours un backup !

---

**Besoin d'aide ? Vérifiez d'abord vos emails reçus. Vous y trouverez peut-être toutes vos candidatures ! 📧**
