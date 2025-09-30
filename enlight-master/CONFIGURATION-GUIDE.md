# ✅ Configuration Spécifique - Votre Script Apps Script

## 🎯 Correspondance Parfaite

Votre formulaire est maintenant configuré pour correspondre exactement à votre script Apps Script !

### 📋 Mapping des Champs

| Champ Formulaire | Champ Apps Script | Description |
|------------------|-------------------|-------------|
| `name` | `data.name` | Nom du candidat |
| `email` | `data.email` | Adresse email |
| `phone` | `data.phone` | Numéro de téléphone |
| `university` | `data.university` | Université |
| `age` | `data.age` | Âge (entier) |
| `level` | `data.level` | Niveau d'études |
| `motivation` | `data.motivation` | Texte de motivation |
| `freeSpace` | `data.freeSpace` | Espace libre |
| `device.type` | `data.device.type` | Type d'appareil (mobile/desktop) |
| `device.userAgent` | `data.device.userAgent` | User Agent du navigateur |

### 🗂️ Structure de votre Google Sheet

Votre sheet doit avoir ces colonnes dans cet ordre :
1. **ID** (généré automatiquement)
2. **Nom** (name)
3. **Email** (email)
4. **Téléphone** (phone)
5. **Université** (university)
6. **Âge** (age)
7. **Niveau** (level)
8. **Motivation** (motivation)
9. **Espace Libre** (freeSpace)
10. **Date** (générée automatiquement)
11. **Appareil** (device.type)
12. **User Agent** (device.userAgent)

### 🔧 Validation de votre Script

Votre script Apps Script valide ces champs obligatoires :
- ✅ `name` (Nom)
- ✅ `email` (Email)
- ✅ `phone` (Téléphone)
- ✅ `university` (Université)
- ✅ `age` (Âge)
- ✅ `level` (Niveau)
- ✅ `motivation` (Motivation)
- ✅ `freeSpace` (Espace Libre)

### 🧪 Test de Fonctionnement

1. **Ouvrez votre site** et remplissez le formulaire
2. **Soumettez le formulaire** - vous devriez voir "Envoyé avec succès !"
3. **Vérifiez votre Google Sheet** - les données devraient apparaître
4. **Utilisez le dashboard** - les candidatures devraient être visibles

### 🔍 Diagnostic

Si les données n'apparaissent toujours pas :

1. **Ouvrez la console** (F12 → Console)
2. **Regardez les logs** - vous devriez voir :
   ```
   🚀 Envoi des données au Google Sheet: {...}
   ✅ Données envoyées au Google Sheet (format Apps Script)
   ```

3. **Testez avec le script de diagnostic** :
   - Ouvrez `test-connection.html`
   - Cliquez sur "Test avec Données"
   - Vérifiez si les données apparaissent dans votre sheet

### 📊 Format des Données Envoyées

Le formulaire envoie maintenant exactement ce format :

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+216 123456789",
  "university": "Test University",
  "age": 22,
  "level": "Bachelor",
  "motivation": "I want to join AIESEC...",
  "freeSpace": "Additional information...",
  "device": {
    "type": "desktop",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### ✅ Vérifications Finales

- [ ] Votre script Apps Script est déployé
- [ ] Les autorisations sont sur "Tout le monde, même les utilisateurs anonymes"
- [ ] Votre Google Sheet a les bonnes colonnes
- [ ] Le formulaire utilise le bon format de données
- [ ] Le test de diagnostic fonctionne

### 🎉 Résultat Attendu

Après soumission du formulaire, vous devriez voir dans votre Google Sheet :
- Une nouvelle ligne avec un ID unique
- Toutes les informations du candidat
- La date et heure de soumission
- Le type d'appareil utilisé
- L'user agent du navigateur

Le formulaire est maintenant parfaitement configuré pour votre script Apps Script ! 🚀

