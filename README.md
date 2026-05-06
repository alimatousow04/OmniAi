# OmniAI — LLM Entreprise Hub

Application web centralisant l'accès à plusieurs modèles de langage (Gemini, Llama, GPT-4o) depuis une interface unique, avec gestion automatique des quotas et persistance des conversations.

## Équipe
- AMOUSSOU Solène — Chef de projet & Développeur back-end
- SOW Alimatou — Designer UI/UX & Développeur front-end
- SALOBO Kevin — Architecte logiciel & Développeur back-end
- FULCRAND Johan — Designer UI/UX & Responsable gestion de projet

## Stack technique
- **Front-end** : React + TypeScript + Vite + TailwindCSS
- **Back-end** : Node.js + Express.js
- **Base de données** : MySQL via TiDB Cloud
- **Déploiement** : Render
- **LLMs** : Gemini 2.0 Flash · Llama 3.3 70B (Groq) · GPT-4o (GitHub Models)

## Fonctionnalités
- Interface de chat multi-modèles
- Sélection dynamique du modèle LLM
- Fallback automatique en cas de quota dépassé
- Persistance des conversations en base de données
- Authentification JWT (register/login)
- Tableau de bord de monitoring
- Support multilingue FR/EN
- Mode clair / mode sombre

## Installation locale

### Back-end
```bash
cd server
npm install
cp .env.example .env  # remplir les variables
npm run dev
```

### Front-end
```bash
npm install
npm run dev
```

## Variables d'environnement

### server/.env
GEMINI_API_KEY=
GROQ_API_KEY=
GITHUB_TOKEN=
JWT_SECRET=
DB_URL=
FRONTEND_URL=

### .env.local;
VITE_API_URL=http://localhost:3001

## Déploiement
L'application est déployée sur Render : [lien à ajouter]

## Module
USAL59 — Coder une application complexe
Conservatoire National des Arts et Métiers (Cnam) 2025-2026