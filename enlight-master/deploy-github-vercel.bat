@echo off
echo ========================================
echo  DEPLOIEMENT AIESEC CARTHAGE SUR VERCEL
echo ========================================
echo.

REM Vérifier si Git est installé
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERREUR] Git n'est pas installé!
    echo Téléchargez Git depuis: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Initialisation Git...
git init
if %errorlevel% neq 0 (
    echo Git déjà initialisé, on continue...
)

echo.
echo [2/6] Configuration Git...
git config user.name "Nedim7050"
git config user.email "carthagetm@gmail.com"

echo.
echo [3/6] Ajout des fichiers...
git add .

echo.
echo [4/6] Création du commit...
git commit -m "Configuration AIESEC Carthage - Prêt pour Vercel"
if %errorlevel% neq 0 (
    echo Aucune modification à commiter, on continue...
)

echo.
echo [5/6] Configuration de la branche main...
git branch -M main

echo.
echo [6/6] Configuration du remote GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/Nedim7050/aiesec-carthage-website.git

echo.
echo ========================================
echo  PRET POUR LE PUSH!
echo ========================================
echo.
echo ETAPES SUIVANTES:
echo.
echo 1. Créez le repository sur GitHub:
echo    https://github.com/new
echo    Nom: aiesec-carthage-website
echo.
echo 2. Puis executez cette commande:
echo    git push -u origin main
echo.
echo 3. Allez sur Vercel:
echo    https://vercel.com/new
echo.
echo 4. Importez votre repository GitHub
echo.
echo ========================================
pause
