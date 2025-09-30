# 🚀 Instructions Rapides de Déploiement

## ✅ Correctifs Appliqués

1. ✅ Fichier `index.html` - Suppression des balises HTML en double
2. ✅ Fichier `vercel.json` - Configuration complète ajoutée
3. ✅ Fichier `.gitignore` - Protection des fichiers sensibles
4. ✅ Script de déploiement automatique créé

---

## 🎯 DÉPLOIEMENT EN 3 ÉTAPES SIMPLES

### Étape 1 : Créer le Repository GitHub

1. Allez sur : https://github.com/new
2. Nom du repository : `aiesec-carthage-website`
3. **PUBLIC** (cochez)
4. **NE COCHEZ PAS** "Add a README"
5. Cliquez "Create repository"

### Étape 2 : Exécuter le Script

Double-cliquez sur : `deploy-github-vercel.bat`

Le script va automatiquement :
- ✅ Initialiser Git
- ✅ Ajouter tous les fichiers
- ✅ Créer un commit
- ✅ Configurer la branche main
- ✅ Ajouter le remote GitHub

### Étape 3 : Push vers GitHub

Dans PowerShell (dans le dossier enlight-master) :

```powershell
git push -u origin main
```

Si on vous demande de vous connecter :
- Utilisez votre nom d'utilisateur GitHub : `Nedim7050`
- Utilisez un Personal Access Token comme mot de passe
  (Créez-en un ici : https://github.com/settings/tokens)

### Étape 4 : Déployer sur Vercel

1. Allez sur : https://vercel.com/new
2. Cliquez "Import Git Repository"
3. Sélectionnez `Nedim7050/aiesec-carthage-website`
4. Configuration :
   - **Root Directory** : `enlight-master`
   - **Framework Preset** : Other
   - Laissez le reste par défaut
5. Cliquez **"Deploy"** 🚀

---

## 🎉 C'EST TOUT !

Votre site sera accessible à une URL comme :
```
https://aiesec-carthage-website.vercel.app
```

---

## 🔄 Mises à Jour Futures

Pour mettre à jour votre site :

```powershell
git add .
git commit -m "Mise à jour du site"
git push
```

Vercel redéploiera automatiquement ! ✨

---

## ⚡ Alternative : Vercel CLI

Si GitHub ne marche pas, utilisez Vercel CLI :

```powershell
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd enlight-master
vercel --prod
```

---

## 📞 Besoin d'Aide ?

**Erreurs communes et solutions :**

❌ **"Git not found"**
→ Installez Git : https://git-scm.com/download/win

❌ **"Permission denied"**
→ Créez un Personal Access Token sur GitHub

❌ **"Build failed" sur Vercel**
→ Vérifiez que Root Directory = `enlight-master`

❌ **"404 Not Found"**
→ Assurez-vous que `index.html` est dans `enlight-master/`

---

## 📊 Structure Attendue

```
enlight-master/
├── index.html          ✅ Corrigé
├── vercel.json         ✅ Corrigé
├── manifest.json       ✅ OK
├── .gitignore          ✅ Créé
├── package.json        ✅ OK
├── css/                ✅ OK
├── js/                 ✅ OK
├── img/                ✅ OK
└── fonts/              ✅ OK
```

**Tout est prêt pour le déploiement ! 🚀**
