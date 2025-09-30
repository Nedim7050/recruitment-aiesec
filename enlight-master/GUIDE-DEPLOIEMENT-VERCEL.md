# 🚀 Guide de Déploiement sur Vercel - AIESEC Carthage

## 📋 Problèmes Corrigés

✅ **Fichier HTML** : Suppression des balises en double `</body>` et `</html>`  
✅ **Configuration Vercel** : Fichier `vercel.json` complété avec routing et headers  
✅ **Manifest PWA** : Configuration correcte pour l'application web progressive  

---

## 🎯 Méthode de Déploiement Recommandée

### **Option 1 : Déploiement depuis GitHub (LA PLUS SIMPLE)**

#### Étape 1 : Préparer votre Repository GitHub

1. **Ouvrez PowerShell dans le dossier du projet** :
   ```powershell
   cd "C:\Users\najdm\Downloads\enlight-master"
   ```

2. **Initialisez Git et commitez vos fichiers** :
   ```powershell
   git init
   git add .
   git commit -m "Configuration initiale AIESEC Carthage"
   git branch -M main
   ```

3. **Créez un nouveau repository sur GitHub** :
   - Allez sur https://github.com/new
   - Nom du repository : `aiesec-carthage-website`
   - Laissez-le **PUBLIC**
   - **NE COCHEZ PAS** "Add a README file"
   - Cliquez sur "Create repository"

4. **Liez votre projet local à GitHub** :
   ```powershell
   git remote add origin https://github.com/Nedim7050/aiesec-carthage-website.git
   git push -u origin main
   ```

#### Étape 2 : Déployer sur Vercel

1. **Connectez-vous à Vercel** :
   - Allez sur https://vercel.com/nedims-projects-07606d3b
   - Connectez-vous avec votre compte GitHub

2. **Créez un nouveau projet** :
   - Cliquez sur **"Add New..."** → **"Project"**
   - Sélectionnez **"Import Git Repository"**
   - Choisissez le repository `aiesec-carthage-website`

3. **Configuration du projet** :
   ```
   Project Name: aiesec-carthage
   Framework Preset: Other (laissez par défaut)
   Root Directory: ./enlight-master
   Build Command: (laissez vide)
   Output Directory: (laissez vide)
   Install Command: (laissez vide)
   ```

4. **Cliquez sur "Deploy"** 🚀

---

### **Option 2 : Déploiement avec Vercel CLI**

#### Étape 1 : Installation de Vercel CLI

```powershell
npm install -g vercel
```

#### Étape 2 : Login à Vercel

```powershell
vercel login
```

#### Étape 3 : Déployer

```powershell
cd "C:\Users\najdm\Downloads\enlight-master\enlight-master"
vercel --prod
```

Suivez les instructions :
- **Set up and deploy?** → Yes
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → No
- **What's your project's name?** → aiesec-carthage
- **In which directory is your code located?** → ./

---

### **Option 3 : Déploiement Drag & Drop (Si les autres ne marchent pas)**

1. **Compressez le dossier** :
   - Faites un clic droit sur `enlight-master`
   - Sélectionnez "Compresser vers ZIP"

2. **Uploadez sur Vercel** :
   - Allez sur https://vercel.com/new
   - Faites glisser le fichier ZIP sur la page
   - Attendez que le déploiement se termine

---

## ⚙️ Configuration Post-Déploiement

### 1. Configurer le Domaine Personnalisé (Optionnel)

Dans le dashboard Vercel :
1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

### 2. Mettre à Jour l'URL de Redirection du Formulaire

Une fois déployé, mettez à jour dans `index.html` :
```html
<input type="hidden" name="_next" value="https://votre-url-vercel.vercel.app/thank-you">
```

Puis recommitez :
```powershell
git add enlight-master/index.html
git commit -m "Mise à jour URL de redirection"
git push
```

### 3. Configurer Analytics (Optionnel)

Dans `index.html`, remplacez :
- `GA_MEASUREMENT_ID` → Votre ID Google Analytics
- `YOUR_PIXEL_ID` → Votre ID Facebook Pixel

---

## 🔍 Vérification du Déploiement

### Checklist Après Déploiement :

✅ **Le site s'affiche correctement**  
✅ **La navigation fonctionne**  
✅ **Le formulaire de recrutement fonctionne**  
✅ **Les images se chargent**  
✅ **Les liens sociaux fonctionnent**  
✅ **Le site est responsive sur mobile**  
✅ **Le PWA est installable**  

### Tests à Effectuer :

1. **Test du Formulaire** :
   - Remplissez le formulaire de recrutement
   - Vérifiez que vous recevez l'email sur Formspree

2. **Test Mobile** :
   - Ouvrez le site sur votre téléphone
   - Testez l'installation en PWA

3. **Test de Performance** :
   - Allez sur https://pagespeed.web.dev/
   - Testez votre URL Vercel

---

## 🐛 Résolution de Problèmes

### Problème : "Error 404 - Page Not Found"

**Solution** :
- Vérifiez que le dossier `enlight-master` contient bien tous les fichiers
- Assurez-vous que `index.html` est à la racine de `enlight-master`

### Problème : "Build Failed"

**Solution** :
- Dans Vercel, allez dans **Settings** → **General**
- Root Directory: `enlight-master`
- Framework Preset: `Other`
- Cliquez sur "Save"
- Redéployez

### Problème : Le Formulaire Ne Fonctionne Pas

**Solution** :
- Vérifiez l'endpoint Formspree dans `index.html` ligne 760
- Testez directement sur https://formspree.io/f/xpwnqkqk

### Problème : Images Ne Se Chargent Pas

**Solution** :
- Les images utilisent Cloudinary CDN (déjà configuré)
- Vérifiez votre connexion internet
- Testez en navigation privée

---

## 📞 Support

Si vous avez encore des problèmes après avoir suivi ce guide :

1. **Vérifiez les logs Vercel** :
   ```powershell
   vercel logs
   ```

2. **Contactez le support** :
   - Email: carthagetm@gmail.com
   - Téléphone: +216 98 521 185

---

## 🎉 Félicitations !

Une fois déployé, votre site sera accessible à l'URL :
```
https://aiesec-carthage.vercel.app
```

Ou à l'URL personnalisée que Vercel vous attribue.

**Bon déploiement ! 🚀**

---

## 📝 Commandes Rapides

```powershell
# Commit et push
git add .
git commit -m "Mise à jour du site"
git push

# Redéployer avec CLI
vercel --prod

# Voir les logs
vercel logs

# Ouvrir le site
vercel --open
```
