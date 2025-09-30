@echo off
chcp 65001 >nul
echo ========================================
echo  AIESEC CARTHAGE - DEPLOIEMENT RAPIDE
echo ========================================
echo.

REM Vérifier si on est dans le bon dossier
if not exist "index.html" (
    echo [ERREUR] index.html introuvable!
    echo Assurez-vous d'être dans le dossier enlight-master
    pause
    exit /b 1
)

REM Vérifier Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERREUR] Git n'est pas installé!
    echo Téléchargez: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [ETAPE 1/5] Ajout des fichiers...
git add .

echo.
echo [ETAPE 2/5] Commit des modifications...
git commit -m "Mise à jour AIESEC Carthage - %date% %time%"
if %errorlevel% neq 0 (
    echo Aucune modification détectée.
)

echo.
echo [ETAPE 3/5] Vérification du remote...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [CONFIG REQUISE] Repository GitHub non configuré!
    echo.
    echo 1. Créez un repository sur: https://github.com/new
    echo    Nom suggéré: aiesec-carthage-website
    echo.
    echo 2. Puis exécutez:
    echo    git remote add origin https://github.com/Nedim7050/aiesec-carthage-website.git
    echo.
    echo 3. Relancez ce script
    echo.
    pause
    exit /b 1
)

echo.
echo [ETAPE 4/5] Push vers GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [INFO] Si c'est le premier push, essayez:
    echo git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo [ETAPE 5/5] Vérification Vercel...
echo.
echo ========================================
echo  DEPLOIEMENT TERMINE !
echo ========================================
echo.
echo Votre site sera automatiquement déployé sur Vercel
echo.
echo Vérifiez sur: https://vercel.com/nedims-projects-07606d3b
echo.
echo Si c'est votre premier déploiement:
echo 1. Allez sur https://vercel.com/new
echo 2. Importez votre repository GitHub
echo 3. Root Directory: enlight-master
echo 4. Cliquez Deploy
echo.
pause