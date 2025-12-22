// api/chat-zyqtron.js
export default async function handler(req, res) {
  // Autoriser uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages manquant' });
    }

    // Récupérer la clé API Groq depuis les variables d'environnement Vercel
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY manquante');
      return res.status(500).json({ error: 'Configuration serveur incorrecte' });
    }

    // Appel à l'API Groq
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!groqResponse.ok) {
      console.error('Erreur Groq API', groqResponse.status);
      return res.status(502).json({ error: 'Erreur API Groq' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Pas de réponse';

    return res.status(200).json({ reply });

  } catch (e) {
    console.error('Erreur handler', e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
