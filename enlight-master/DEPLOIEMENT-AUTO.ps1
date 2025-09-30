# AIESEC Carthage - Script de Déploiement Automatique
# Exécution : PowerShell en tant qu'administrateur
# Commande : Set-ExecutionPolicy Bypass -Scope Process -Force; .\DEPLOIEMENT-AUTO.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " AIESEC CARTHAGE - DEPLOIEMENT AUTO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour afficher les messages colorés
function Write-Success { param($msg) Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "✗ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "→ $msg" -ForegroundColor Yellow }
function Write-Step { param($msg) Write-Host "[ETAPE] $msg" -ForegroundColor Magenta }

# Vérifier si on est dans le bon dossier
if (-not (Test-Path "index.html")) {
    Write-Error "index.html introuvable!"
    Write-Info "Assurez-vous d'être dans le dossier enlight-master"
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}
Write-Success "Dossier correct détecté"

# Vérifier Git
Write-Step "Vérification de Git..."
try {
    $gitVersion = git --version
    Write-Success "Git installé : $gitVersion"
} catch {
    Write-Error "Git n'est pas installé!"
    Write-Info "Téléchargez Git depuis: https://git-scm.com/download/win"
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Step "1/7 - Initialisation Git..."
if (-not (Test-Path ".git")) {
    git init
    Write-Success "Repository Git initialisé"
} else {
    Write-Success "Repository Git déjà initialisé"
}

Write-Host ""
Write-Step "2/7 - Configuration Git..."
git config user.name "Nedim7050"
git config user.email "carthagetm@gmail.com"
Write-Success "Configuration Git appliquée"

Write-Host ""
Write-Step "3/7 - Ajout des fichiers..."
git add .
Write-Success "Fichiers ajoutés au staging"

Write-Host ""
Write-Step "4/7 - Création du commit..."
try {
    git commit -m "Configuration AIESEC Carthage - Prêt pour Vercel"
    Write-Success "Commit créé"
} catch {
    Write-Info "Aucune modification à commiter"
}

Write-Host ""
Write-Step "5/7 - Configuration de la branche main..."
git branch -M main
Write-Success "Branche main configurée"

Write-Host ""
Write-Step "6/7 - Configuration du remote GitHub..."
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Info "Remote déjà configuré : $remoteExists"
} else {
    git remote add origin https://github.com/Nedim7050/aiesec-carthage-website.git
    Write-Success "Remote GitHub configuré"
}

Write-Host ""
Write-Step "7/7 - Vérification finale..."
Write-Success "Configuration terminée!"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PRET POUR LE DEPLOIEMENT!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "PROCHAINES ETAPES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. CREER LE REPOSITORY GITHUB" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   Nom: aiesec-carthage-website" -ForegroundColor Gray
Write-Host ""

Write-Host "2. PUSH VERS GITHUB" -ForegroundColor White
Write-Host "   Commande:" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. DEPLOYER SUR VERCEL" -ForegroundColor White
Write-Host "   https://vercel.com/new" -ForegroundColor Cyan
Write-Host "   Root Directory: enlight-master" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Voulez-vous pusher maintenant sur GitHub? (O/N)"
if ($response -eq "O" -or $response -eq "o") {
    Write-Host ""
    Write-Info "Tentative de push..."
    try {
        git push -u origin main
        Write-Success "Push réussi!"
        Write-Host ""
        Write-Host "Maintenant, allez sur Vercel:" -ForegroundColor Green
        Write-Host "https://vercel.com/new" -ForegroundColor Cyan
    } catch {
        Write-Error "Le push a échoué!"
        Write-Info "Assurez-vous que le repository existe sur GitHub"
        Write-Info "Créez-le sur: https://github.com/new"
    }
} else {
    Write-Info "Vous pouvez pusher plus tard avec: git push -u origin main"
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"
