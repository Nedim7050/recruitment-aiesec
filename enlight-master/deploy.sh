#!/bin/bash

echo "========================================"
echo " AIESEC CARTHAGE - DEPLOIEMENT RAPIDE"
echo "========================================"
echo ""

# Vérifier si on est dans le bon dossier
if [ ! -f "index.html" ]; then
    echo "[ERREUR] index.html introuvable!"
    echo "Assurez-vous d'être dans le dossier enlight-master"
    exit 1
fi

# Vérifier Git
if ! command -v git &> /dev/null; then
    echo "[ERREUR] Git n'est pas installé!"
    echo "Installez Git: https://git-scm.com/downloads"
    exit 1
fi

echo "[ETAPE 1/5] Ajout des fichiers..."
git add .

echo ""
echo "[ETAPE 2/5] Commit des modifications..."
git commit -m "Mise à jour AIESEC Carthage - $(date '+%Y-%m-%d %H:%M:%S')"
if [ $? -ne 0 ]; then
    echo "Aucune modification détectée."
fi

echo ""
echo "[ETAPE 3/5] Vérification du remote..."
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "[CONFIG REQUISE] Repository GitHub non configuré!"
    echo ""
    echo "1. Créez un repository sur: https://github.com/new"
    echo "   Nom suggéré: aiesec-carthage-website"
    echo ""
    echo "2. Puis exécutez:"
    echo "   git remote add origin https://github.com/Nedim7050/aiesec-carthage-website.git"
    echo ""
    echo "3. Relancez ce script"
    echo ""
    exit 1
fi

echo ""
echo "[ETAPE 4/5] Push vers GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo ""
    echo "[INFO] Si c'est le premier push, essayez:"
    echo "git push -u origin main"
    echo ""
    exit 1
fi

echo ""
echo "[ETAPE 5/5] Vérification Vercel..."
echo ""
echo "========================================"
echo " DEPLOIEMENT TERMINE !"
echo "========================================"
echo ""
echo "Votre site sera automatiquement déployé sur Vercel"
echo ""
echo "Vérifiez sur: https://vercel.com/nedims-projects-07606d3b"
echo ""
echo "Si c'est votre premier déploiement:"
echo "1. Allez sur https://vercel.com/new"
echo "2. Importez votre repository GitHub"
echo "3. Root Directory: enlight-master"
echo "4. Cliquez Deploy"
echo ""