// api/chat-zyqtron.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages manquant' });
    }

    const last = messages[messages.length - 1]?.content || '';
    return res.status(200).json({
      reply: `Echo Zyqtron: ${last}`
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
