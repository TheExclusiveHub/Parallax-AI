// api/messages.js
// Временное хранилище в памяти
let messages = [];
let sessions = [];

module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { sessionId } = req.query;
      
      if (!sessionId) {
        return res.status(400).json({ error: 'sessionId is required' });
      }
      
      const userMessages = messages.filter(msg => msg.sessionId === sessionId);
      console.log(`Returning ${userMessages.length} messages for session ${sessionId}`);
      
      res.status(200).json(userMessages);
    }
    
    else if (req.method === 'POST') {
      const { sessionId, text, sender, needsAiResponse } = req.body;
      
      if (!sessionId || !text) {
        return res.status(400).json({ error: 'sessionId and text are required' });
      }
      
      const newMessage = {
        id: Date.now().toString(),
        sessionId,
        text,
        sender: sender || 'user',
        needsAiResponse: needsAiResponse || false,
        created_at: new Date().toISOString(),
        is_admin: sender === 'admin'
      };
      
      messages.push(newMessage);
      console.log('New message saved:', newMessage);
      
      // Обновляем сессию
      const existingSession = sessions.find(s => s.id === sessionId);
      if (existingSession) {
        existingSession.last_activity = new Date().toISOString();
      } else {
        sessions.push({
          id: sessionId,
          ip_address: req.headers['x-forwarded-for'] || 'unknown',
          created_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: newMessage,
        totalMessages: messages.length
      });
    }
    
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in messages API:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};