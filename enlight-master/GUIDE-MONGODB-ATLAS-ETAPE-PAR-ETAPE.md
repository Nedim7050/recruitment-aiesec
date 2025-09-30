# 🗄️ Guide MongoDB Atlas - Étape par Étape

## 🎯 **Objectif**
Créer une base de données MongoDB Atlas gratuite pour stocker toutes les candidatures de votre site AIESEC Carthage.

---

## 📋 **Étape 1 : Créer un Compte MongoDB Atlas**

### **1.1 Aller sur le Site**
1. **Ouvrez votre navigateur**
2. **Allez sur** : [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **Cliquez sur "Try Free"** (gratuit)

### **1.2 Créer le Compte**
1. **Remplissez le formulaire** :
   - **Email** : votre-email@gmail.com
   - **Password** : un mot de passe sécurisé
   - **First Name** : Votre prénom
   - **Last Name** : Votre nom
2. **Cliquez "Create your Atlas account"**

### **1.3 Vérification Email**
1. **Vérifiez votre email**
2. **Cliquez sur le lien** de vérification
3. **Retournez sur MongoDB Atlas**

---

## 🏗️ **Étape 2 : Créer un Cluster (Base de Données)**

### **2.1 Choisir le Type de Cluster**
1. **Sélectionnez "Shared Clusters"** (gratuit)
2. **Cliquez "Create"**

### **2.2 Choisir le Cloud Provider**
1. **Sélectionnez un provider** :
   - **AWS** (recommandé)
   - **Google Cloud**
   - **Azure**
2. **Choisissez une région** proche de vous (ex: Europe - Paris)

### **2.3 Configurer le Cluster**
1. **Cluster Name** : `aiesec-carthage-cluster`
2. **Cluster Tier** : `M0 Sandbox` (gratuit)
3. **Cliquez "Create Cluster"**

### **2.4 Attendre la Création**
- ⏳ **Attendez 3-5 minutes** que le cluster se crée
- ✅ **Message** : "Your cluster is ready!"

---

## 🔐 **Étape 3 : Configurer l'Accès à la Base de Données**

### **3.1 Créer un Utilisateur de Base de Données**
1. **Cliquez "Database Access"** dans le menu de gauche
2. **Cliquez "Add New Database User"**
3. **Remplissez** :
   - **Authentication Method** : `Password`
   - **Username** : `aiesec-admin`
   - **Password** : `VotreMotDePasseSecurise123!`
   - **Database User Privileges** : `Read and write to any database`
4. **Cliquez "Add User"**

### **3.2 Autoriser l'Accès Réseau**
1. **Cliquez "Network Access"** dans le menu de gauche
2. **Cliquez "Add IP Address"**
3. **Cliquez "Allow Access from Anywhere"** (0.0.0.0/0)
4. **Cliquez "Confirm"**

---

## 🔗 **Étape 4 : Obtenir l'URI de Connexion**

### **4.1 Se Connecter au Cluster**
1. **Cliquez "Clusters"** dans le menu de gauche
2. **Cliquez "Connect"** sur votre cluster
3. **Choisissez "Connect your application"**

### **4.2 Obtenir l'URI**
1. **Driver** : `Node.js`
2. **Version** : `4.1 or later`
3. **Copiez l'URI** qui ressemble à :
   ```
   mongodb+srv://aiesec-admin:<password>@aiesec-carthage-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### **4.3 Modifier l'URI**
1. **Remplacez `<password>`** par votre mot de passe
2. **Ajoutez le nom de la base** : `/aiesec-carthage`
3. **URI final** :
   ```
   mongodb+srv://aiesec-admin:VotreMotDePasseSecurise123!@aiesec-carthage-cluster.xxxxx.mongodb.net/aiesec-carthage?retryWrites=true&w=majority
   ```

---

## ⚙️ **Étape 5 : Configuration des Variables d'Environnement**

### **5.1 Créer le Fichier .env**
1. **Dans votre projet**, créez un fichier `.env`
2. **Copiez ce contenu** :

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://aiesec-admin:VotreMotDePasseSecurise123!@aiesec-carthage-cluster.xxxxx.mongodb.net/aiesec-carthage?retryWrites=true&w=majority

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=VotreMotDePasseAdminSecurise123!

# JWT Secret
JWT_SECRET=VotreCleSecreteJWTSuperLongueEtSecurisee123456789

# Server Port
PORT=3000
```

### **5.2 Remplacer les Valeurs**
- **MONGODB_URI** : Votre URI MongoDB Atlas
- **ADMIN_PASSWORD** : Mot de passe pour l'admin
- **JWT_SECRET** : Clé secrète longue et complexe

---

## 🚀 **Étape 6 : Déploiement sur Vercel**

### **6.1 Préparer le Projet**
1. **Assurez-vous** que tous les fichiers sont dans votre repository GitHub
2. **Vérifiez** que `package.json` et `vercel.json` sont présents

### **6.2 Déployer sur Vercel**
1. **Allez sur** [https://vercel.com](https://vercel.com)
2. **Connectez votre compte GitHub**
3. **Importez votre repository**
4. **Vercel détectera** automatiquement la configuration

### **6.3 Ajouter les Variables d'Environnement**
1. **Dans Vercel**, allez dans "Settings" → "Environment Variables"
2. **Ajoutez ces variables** :
   - `MONGODB_URI` : Votre URI MongoDB Atlas
   - `ADMIN_PASSWORD` : Votre mot de passe admin
   - `JWT_SECRET` : Votre clé secrète JWT
3. **Cliquez "Save"**

### **6.4 Déployer**
1. **Cliquez "Deploy"**
2. **Attendez** que le déploiement se termine
3. **Votre site** sera disponible à l'URL fournie

---

## 🧪 **Étape 7 : Test de Fonctionnement**

### **7.1 Test de l'API**
1. **Allez sur** : `https://votre-site.vercel.app/api/health`
2. **Vous devriez voir** :
   ```json
   {
     "success": true,
     "message": "API is running",
     "timestamp": "2025-01-30T..."
   }
   ```

### **7.2 Test du Formulaire**
1. **Allez sur** : `https://votre-site.vercel.app`
2. **Remplissez le formulaire** de candidature
3. **Cliquez "Submit"**
4. **Message de succès** devrait apparaître

### **7.3 Test du Dashboard Admin**
1. **Allez sur** : `https://votre-site.vercel.app/admin-dashboard.html`
2. **Connectez-vous** avec :
   - **Username** : `admin`
   - **Password** : `VotreMotDePasseAdminSecurise123!`
3. **Dashboard** devrait s'ouvrir avec les candidatures

---

## 🔍 **Étape 8 : Vérification dans MongoDB Atlas**

### **8.1 Voir les Données**
1. **Retournez sur MongoDB Atlas**
2. **Cliquez "Browse Collections"**
3. **Vous devriez voir** :
   - Base de données : `aiesec-carthage`
   - Collection : `candidatures`
   - Documents : Vos candidatures

### **8.2 Vérifier les Candidatures**
1. **Cliquez sur la collection** `candidatures`
2. **Vous devriez voir** toutes les candidatures soumises
3. **Chaque document** contient toutes les informations

---

## 🆘 **Dépannage**

### **❌ Erreur de Connexion MongoDB**
- **Vérifiez l'URI** : Assurez-vous que le mot de passe est correct
- **Vérifiez l'IP** : Assurez-vous que 0.0.0.0/0 est autorisé
- **Vérifiez l'utilisateur** : Assurez-vous que l'utilisateur existe

### **❌ Erreur 401 (Non autorisé)**
- **Vérifiez les identifiants** admin
- **Vérifiez le JWT secret**
- **Vérifiez les variables** d'environnement Vercel

### **❌ Erreur 500 (Serveur)**
- **Vérifiez les logs** Vercel
- **Vérifiez la connexion** MongoDB
- **Vérifiez la syntaxe** du code

---

## 📞 **Support**

### **Si vous avez des Problèmes :**
1. **Vérifiez** chaque étape
2. **Relisez** les messages d'erreur
3. **Contactez-moi** avec les détails de l'erreur

### **Informations à Fournir :**
- **Message d'erreur** exact
- **Étape** où ça bloque
- **Capture d'écran** si possible

---

## 🎉 **Résultat Final**

### **✅ Une fois terminé, vous aurez :**
- **Base de données MongoDB Atlas** gratuite
- **Site déployé** sur Vercel
- **Formulaire** qui envoie vers la base de données
- **Dashboard admin** pour voir toutes les candidatures
- **Système complet** et professionnel

### **✅ Avantages :**
- **Gratuit** : MongoDB Atlas + Vercel
- **Sécurisé** : Données protégées
- **Scalable** : Supporte des milliers de candidatures
- **Professionnel** : Interface moderne

**Suivez ces étapes une par une, et votre système fonctionnera parfaitement ! 🚀**
