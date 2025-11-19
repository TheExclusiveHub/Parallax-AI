// api/sessions.js
module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const userIP = req.headers['x-forwarded-for'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress;
      
      console.log('Detected IP:', userIP);
      
      // Ваш IP для админ-панели
      const ADMIN_IPS = ['171.33.254.90', '127.0.0.1', 'localhost'];
      const isAdmin = ADMIN_IPS.some(ip => userIP.includes(ip));

      res.status(200).json({
        yourIP: userIP,
        isAdmin: isAdmin,
        sessions: [],
        message: 'API работает корректно'
      });
    } catch (error) {
      console.error('Error in sessions API:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};