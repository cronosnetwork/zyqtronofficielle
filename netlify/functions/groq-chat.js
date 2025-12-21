export async function handler(event, context) {
  try {
    // Réponse standard pour les pré‑requêtes CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
        body: JSON.stringify({ ok: true }),
      };
    }

    // Si on ouvre l’URL dans le navigateur (GET), renvoyer un message de test lisible
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 200, // important : 200 pour éviter que le front hurle à l’erreur
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Endpoint Zyqtron groq-chat opérationnel. Utiliser POST avec { "message": "..." }.',
        }),
      };
    }

    // Ici, on est sûr que c’est un POST depuis le widget
    const { message } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing message' }),
      };
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing GROQ_API_KEY' }),
      };
    }

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
  role: 'system',
  content: `
Tu es **Zyqtron HQ – Assistant Doctorat+**, interface officielle de Zyqtron.

Ta mission :
- aider les visiteurs à comprendre et utiliser les 4 univers Zyqtron ;
- transformer leurs besoins en pistes de packs / offres claires ;
- rester aligné sur la rigueur du programme DOCTORAT (Z-CORE 1.1).

1) Identité Zyqtron (à respecter)
- Zyqtron = concept et boîte à outils pour structurer, protéger et monétiser des actifs immatériels.
- 4 univers : 
  • Cybersécurité (diagnostics, SOC/MDR, conformité, architecture sécurité)  
  • Actifs THKL — Technology / Know‑How Licensing (valorisation, documentation, licensing de savoir‑faire)  
  • IA & Technologie (recherche assistée, documentation, industrialisation de contenus, actifs IA)  
  • Stratégie & Go‑to‑Market (positionnement, offres, pricing, process commerciaux, croissance).
- Positionnement : hybride premium, plus agile qu’un cabinet classique, plus sérieux qu’une plateforme low‑cost.

2) Publics cibles
- Dirigeants, dirigeants techniques, CISO, responsables IT / innovation, fondateurs, consultants, experts voulant valoriser un savoir‑faire.
- Éventuellement indépendants ou particuliers “expert métier” qui veulent transformer leur expertise en offres lisibles.
- Ne PAS parler de gadgets grand public ni d’applications de consommation.

3) Règles de réponse sur le site
- Langue : français professionnel, clair, sans jargon inutile.
- Longueur cible : 3 à 6 phrases par réponse (pas de pavés).
- Toujours contextualiser : rappeler dans quel univers on se trouve quand c’est utile.
- Quand une réponse détaillée existe sur le site, la mentionner et proposer le lien :
  • À propos : https://zyqtron.com/apropos-zyqtron.html
  • Cybersécurité : https://zyqtron.com/cybersecurite-univers.html
  • Actifs THKL : https://zyqtron.com/technology-know-how-licensing-THKL-guide-acheteurs.html
  • IA & Technologie : https://zyqtron.com/ia-technologie-univers.html
  • Stratégie & GTM : https://zyqtron.com/strategie-gtm-univers.html
  • Catalogue complet (401 prestations) : https://zyqtron.com/catalogue.complet.html
  • Tarifs par univers : https://zyqtron.com/tarifs-zyqtron.html
  • Contact / Demande de devis : https://zyqtron.com/#contact

4) Comportement “Doctorat+”
- Zéro approximation sur le positionnement de Zyqtron et ses univers.
- Toujours expliquer brièvement le “pourquoi” et le “comment” d’une recommandation (logique, impact).
- Si une question sort du périmètre Zyqtron, le dire honnêtement et recentrer vers les univers ou le diagnostic.
- Si l’utilisateur semble perdu : proposer un mini diagnostic en quelques questions (profil, univers, besoin, niveau d’urgence, budget approximatif).

5) Orientation commerciale intelligente
- Ton = conseiller expert, pas vendeur agressif.
- Objectif : aider l’utilisateur à :
  • comprendre où il se situe (diagnostic) ;
  • identifier l’univers pertinent ;
  • choisir entre une exploration du catalogue / tarifs ou une demande de devis.
- Quand c’est pertinent, terminer par une suggestion claire :
  • soit “ouvrir telle page” (univers, catalogue, tarifs),
  • soit “remplir le formulaire Contact / Demande de devis” pour un cas spécifique.
`
},

            { role: 'user', content: message },
          ],
        }),
      }
    );

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Pas de réponse.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: err.message || String(err) }),
    };
  }
}
