# ZYQTRON PHASE 1 - Site Public + Catalogue 401

## 📌 Structure

```
zyqtron-phase1/
├── index.html          (Site complet + app)
├── data.json           (Catalogue 401 + prix)
├── README.md           (Ce fichier)
└── .gitignore
```

## 🚀 Déploiement Rapide (Vercel)

### 1. Créer le dépôt GitHub
```bash
git clone https://github.com/zyqtron/phase1-site.git
cd phase1-site
```

### 2. Ajouter les 3 fichiers

- `index.html` → Site complet + catalogue + filtres
- `data.json` → 401 services + tarification
- `README.md` → Cette doc

### 3. Push vers GitHub
```bash
git add .
git commit -m "Phase 1: Site + catalogue complet"
git push origin main
```

### 4. Déploiement Vercel
- Connectez GitHub à Vercel (https://vercel.com)
- Vercel déploie **automatiquement** → Site live instantané

**URL Vercel**: `https://zyqtron.vercel.app`

---

## 📝 Modifications Simples (Sans Coder)

### Modifier le catalogue

**Fichier**: `data.json`

**Structure d'un service**:
```json
{
  "id": 1,
  "theme": "THÈME 1",
  "category": "Conseil & Audit",
  "name": "Audit de maturité technologique",
  "description": "Description courte",
  "pricing_status": "PRIX MÉDIAN",
  "pricing_bronze": 750,
  "pricing_argent": 1500,
  "pricing_or": 3000
}
```

**Comment modifier**:
1. Ouvrir `data.json` dans VS Code (ou GitHub editor)
2. Chercher le service par ID ou nom
3. Changer le `name`, `description`, ou tarifs
4. Commit + push → Site se met à jour automatiquement

---

### Modifier les tarifs

**Chercher la prestation**:
```json
"pricing_bronze": 750,        ← Prix tier Bronze
"pricing_argent": 1500,       ← Prix tier Argent
"pricing_or": 3000            ← Prix tier Or
```

**Modifier directement dans data.json** → Site sync instant

---

### Ajouter une nouvelle prestation

**Dans data.json**, ajouter à `"services": []`:

```json
{
  "id": 402,
  "theme": "THÈME 2",
  "category": "Service Custom",
  "name": "Ma nouvelle prestation",
  "description": "Description",
  "pricing_status": "PRIX MÉDIAN",
  "pricing_bronze": 1000,
  "pricing_argent": 2000,
  "pricing_or": 4000
}
```

**Verifier la syntaxe JSON** (pas de virgule manquante) → Commit → Live

---

### Ajouter le webhook Activepieces

**Fichier**: `index.html` (ligne ~320)

Chercher:
```javascript
const webhookUrl = 'https://cloud.activepieces.com/api/v1/webhooks/YOUR_WEBHOOK_ID';
```

**Remplacer** `YOUR_WEBHOOK_ID` par votre vraie clé

Les leads seront envoyés automatiquement à Activepieces

---

## 🎨 Changer les couleurs

**Fichier**: `index.html` (lignes 20-27)

```css
:root {
    --color-primary: #D4A574;   ← Couleur or/bronze (Zyqtron)
    --color-dark: #1a1a1a;      ← Fond sombre
    --color-accent: #ffd700;    ← Accent (jaune)
}
```

**Changer les codes** → Commit → Live

---

## 📊 Cas d'usage: Modifier 3 prestations

**Scénario**: Vous voulez corriger les tarifs de 3 services

1. Ouvrir `data.json` en GitHub editor (pencil icon)
2. Chercher les 3 prestations (Ctrl+F)
3. Changer les tarifs
4. Cliquer "Commit changes"
5. 30 secondes après → Site mis à jour

**Pas de code, pas de build, pas d'attente. Éditable = direct.**

---

## 🔗 URLs importantes

| Élément | URL |
|---------|-----|
| **Site live** | https://zyqtron.vercel.app |
| **GitHub repo** | https://github.com/zyqtron/phase1-site |
| **Vercel dashboard** | https://vercel.com/dashboard |
| **Editeur data.json** | GitHub > data.json > Edit (pencil) |

---

## ✅ Checklist avant Phase 2

- [ ] Site déployé et accessible
- [ ] Catalogue 401 complet chargé
- [ ] Tarifs visibles (Bronze/Argent/Or)
- [ ] Webhook Activepieces configuré
- [ ] Filtres thème fonctionnels
- [ ] Moteur recherche actif
- [ ] Bouton "Demander devis" capture leads
- [ ] Colors/branding OK

---

## 🚨 Troubleshooting

**Problème**: Les services ne s'affichent pas
- ✅ Vérifier `data.json` valide (pas d'erreur syntaxe)
- ✅ Vercel build log: Voir "Deployments"

**Problème**: Tarifs ne s'affichent pas
- ✅ Vérifier `pricing_bronze`, `pricing_argent`, `pricing_or` présents
- ✅ Values doivent être nombres (pas strings)

**Problème**: Les leads ne remontent pas
- ✅ Vérifier webhook URL dans `index.html`
- ✅ Tester avec curl: `curl "https://webhook..."?email=test@test.com`

---

## 📞 Support

📧 contact@zyqtron.com
🔗 https://zyqtron.com

---

**Version**: 1.0  
**Date**: Décembre 2025  
**Statut**: Production Ready
