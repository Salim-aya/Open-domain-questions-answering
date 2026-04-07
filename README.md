Voici un **README.md** complet que tu peux copier-coller pour ton projet 👇

---

# 🚀 QueryMind – AI Question Answering Assistant

QueryMind est un assistant de question answering factuel basé sur une architecture **full-stack** combinant **React (frontend)** et **FastAPI (backend)**, ainsi que des technologies avancées de NLP comme **Transformers, FAISS, BERT + LoRA** pour fournir des réponses rapides, précises et contextuelles.

---

## 📌 Démo

🎥 Vidéo de démonstration :
👉 [https://drive.google.com/file/d/17_9sre5ZJ3WvWb5l0_ZpHJh9Z6e4Dj32/view?usp=sharing](https://drive.google.com/file/d/17_9sre5ZJ3WvWb5l0_ZpHJh9Z6e4Dj32/view?usp=sharing)

---

## 🧠 Architecture du système

Le système repose sur une pipeline de question answering en plusieurs étapes :

1. L’utilisateur pose une question via le frontend (React)
2. La requête est envoyée au backend (FastAPI)
3. Encodage de la question via un modèle Transformer
4. Recherche des passages pertinents avec **DPR + FAISS**
5. Passage des résultats au modèle **BERT Reader + LoRA**
6. Génération de la réponse avec score de confiance
7. Retour de la réponse au frontend

---

## 🏗️ Stack technique

### 🔹 Frontend

* React + Vite
* TypeScript
* TailwindCSS
* Axios / API service
* Auth (Supabase)

### 🔹 Backend

* FastAPI
* Python
* Transformers (HuggingFace)
* FAISS (vector search)
* BERT + LoRA fine-tuning

### 🔹 NLP & AI

* DPR (Dense Passage Retrieval)
* BERT Reader
* LoRA fine-tuning
* Tokenizers
* Embeddings vectorielles

---

## 📁 Structure du projet

### Backend

```
backend/
├── main.py
├── requirements.txt
├── adapter_model.safetensors
├── adapter_config.json
├── bertqa_lora_reader_epoch1.pt
├── passage.index
├── passages.pkl
├── tokenizer.json
├── tokenizer_config.json
├── special_tokens_map.json
├── vocab.txt
└── .env
```

### Frontend

```
querymind-frontend/
├── src/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/Salim-aya/Open-domain-questions-answering.git
cd querymind-chat
```

---

### 2️⃣ Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Lancer le serveur :

```bash
uvicorn main:app --reload
```

---

### 3️⃣ Frontend (React)

```bash
cd querymind-frontend
npm install
npm run dev
```

---

## 🔐 Configuration

Créer un fichier `.env` dans le backend :

```env
OPENAI_API_KEY=your_key_if_needed
```

Et configurer les variables nécessaires pour Supabase côté frontend.

---

## ✨ Fonctionnalités

* 🔍 Question answering en open-domain
* ⚡ Recherche vectorielle rapide (FAISS)
* 🧠 Modèle BERT + LoRA fine-tuned
* 📊 Score de confiance des réponses
* 💬 Interface chat interactive
* 🔐 Authentification utilisateur
* 📚 Gestion des conversations

---

## 📷 Aperçu du système

### 🔹 Pipeline backend

![Pipeline Backend](docs/diagram.png)
![alt text](<c:/Users/hp/OneDrive/Images/Captures d’écran/Capture d'écran 2026-01-06 110020.png>)
---

## 🚀 Améliorations futures

* Intégration RAG avancée
* Support multi-documents
* Streaming des réponses
* Historique intelligent des conversations
* Déploiement cloud (Docker + CI/CD)

---

## 👤 Auteur

* **Salim Aya**


