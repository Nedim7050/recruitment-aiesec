# 🚀 Guide de Déploiement Complet - Backend + Frontend

## 📋 **Vue d'Ensemble**

Ce guide vous explique comment déployer votre site avec :
- ✅ **Backend Node.js + Express** (API REST)
- ✅ **Base de données MongoDB Atlas** (cloud)
- ✅ **Frontend HTML/CSS/JS** (statique)
- ✅ **Déploiement Vercel** (gratuit)

---

## 🗄️ **Étape 1 : Configuration MongoDB Atlas**

### **1.1 Créer un Compte MongoDB Atlas**
1. Allez sur [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Cliquez sur "Try Free"
3. Créez un compte gratuit

### **1.2 Créer un Cluster**
1. Choisissez "Shared Clusters" (gratuit)
2. Sélectionnez un provider (AWS, Google Cloud, Azure)
3. Choisissez une région proche de vous
4. Nommez votre cluster (ex: "aiesec-carthage")
5. Cliquez "Create Cluster"

### **1.3 Configurer l'Accès**
1. **Database Access** :
   - Cliquez "Add New Database User"
   - Username: `aiesec-admin`
   - Password: `votre-mot-de-passe-securise`
   - Database User Privileges: "Read and write to any database"
   - Cliquez "Add User"

2. **Network Access** :
   - Cliquez "Add IP Address"
   - Cliquez "Allow Access from Anywhere" (0.0.0.0/0)
   - Cliquez "Confirm"

### **1.4 Obtenir l'URI de Connexion**
1. Cliquez "Connect" sur votre cluster
2. Choisissez "Connect your application"
3. Driver: "Node.js"
4. Version: "4.1 or later"
5. Copiez l'URI (ex: `mongodb+srv://aiesec-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
6. **Remplacez `<password>` par votre mot de passe**

---

## 🔧 **Étape 2 : Configuration des Variables d'Environnement**

### **2.1 Créer le Fichier .env**
Créez un fichier `.env` à la racine de votre projet :

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://aiesec-admin:votre-mot-de-passe@cluster0.xxxxx.mongodb.net/aiesec-carthage?retryWrites=true&w=majority

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votre-mot-de-passe-admin-securise

# JWT Secret
JWT_SECRET=votre-cle-secrete-jwt-super-longue-et-securisee

# Server Port
PORT=3000
```

### **2.2 Variables Vercel**
Dans votre dashboard Vercel, ajoutez ces variables d'environnement :
- `MONGODB_URI` : Votre URI MongoDB Atlas
- `ADMIN_PASSWORD` : Votre mot de passe admin
- `JWT_SECRET` : Votre clé secrète JWT

---

## 🚀 **Étape 3 : Déploiement Vercel**

### **3.1 Préparation**
1. Assurez-vous que tous les fichiers sont dans votre repository GitHub
2. Vérifiez que `package.json` et `vercel.json` sont présents

### **3.2 Déploiement**
1. Allez sur [https://vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre repository
4. Vercel détectera automatiquement la configuration
5. Ajoutez les variables d'environnement
6. Cliquez "Deploy"

### **3.3 Vérification**
1. Attendez que le déploiement se termine
2. Testez l'API : `https://votre-site.vercel.app/api/health`
3. Vous devriez voir : `{"success": true, "message": "API is running"}`

---

## 🧪 **Étape 4 : Test de Fonctionnement**

### **4.1 Test du Formulaire**
1. Allez sur votre site : `https://votre-site.vercel.app`
2. Remplissez le formulaire de candidature
3. Cliquez "Submit"
4. Vérifiez que le message de succès apparaît

### **4.2 Test du Dashboard Admin**
1. Allez sur : `https://votre-site.vercel.app/admin-dashboard.html`
2. Connectez-vous avec :
   - Username: `admin`
   - Password: `votre-mot-de-passe-admin`
3. Vérifiez que les candidatures apparaissent

---

## 📱 **Étape 5 : Test Multi-Appareils**

### **5.1 Test Mobile → Desktop**
1. **Mobile** : Remplissez le formulaire
2. **Desktop** : Ouvrez le dashboard admin
3. **Vérifiez** que la candidature mobile apparaît

### **5.2 Test Desktop → Mobile**
1. **Desktop** : Remplissez le formulaire
2. **Mobile** : Ouvrez le dashboard admin
3. **Vérifiez** que la candidature desktop apparaît

---

## 🔒 **Sécurité**

### **✅ Bonnes Pratiques**
- **Mot de passe fort** pour MongoDB Atlas
- **Mot de passe fort** pour l'admin
- **JWT secret** long et complexe
- **Variables d'environnement** dans Vercel
- **HTTPS** automatique avec Vercel

### **⚠️ À Éviter**
- Ne jamais commiter le fichier `.env`
- Ne jamais exposer les mots de passe
- Utiliser des mots de passe faibles

---

## 🎯 **URLs Importantes**

### **✅ URLs de Votre Site**
- **Site principal** : `https://votre-site.vercel.app`
- **Dashboard admin** : `https://votre-site.vercel.app/admin-dashboard.html`
- **API Health** : `https://votre-site.vercel.app/api/health`

### **✅ URLs API**
- **POST /api/submit** : Soumettre une candidature
- **POST /api/login** : Connexion admin
- **GET /api/candidatures** : Récupérer les candidatures
- **GET /api/stats** : Statistiques

---

## 🆘 **Dépannage**

### **❌ Erreur de Connexion MongoDB**
- Vérifiez l'URI MongoDB Atlas
- Vérifiez que l'IP est autorisée (0.0.0.0/0)
- Vérifiez le nom d'utilisateur et mot de passe

### **❌ Erreur 401 (Non autorisé)**
- Vérifiez les identifiants admin
- Vérifiez le JWT secret
- Vérifiez les variables d'environnement Vercel

### **❌ Erreur 500 (Serveur)**
- Vérifiez les logs Vercel
- Vérifiez la connexion MongoDB
- Vérifiez la syntaxe du code

---

## 🎉 **Résultat Final**

### **✅ Fonctionnalités**
- **Formulaire** : Envoie les données vers MongoDB
- **Dashboard** : Affiche toutes les candidatures
- **Sécurité** : Login admin protégé
- **Multi-appareils** : Fonctionne partout
- **Export** : Téléchargement CSV

### **✅ Avantages**
- **Gratuit** : MongoDB Atlas + Vercel
- **Sécurisé** : JWT + HTTPS
- **Scalable** : Base de données cloud
- **Professionnel** : Interface admin complète

**Votre site est maintenant prêt pour la production ! 🚀**
