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
            { role: 'system', content: "Tu es l'assistant officiel de Zyqtron." },
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
