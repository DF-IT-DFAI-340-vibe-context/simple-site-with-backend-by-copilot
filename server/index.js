import http from 'http';

const PORT = 3000;

// Mock user data
const mockUsers = [
  { username: 'admin', password: 'admin123', token: 'mock-token-admin' },
  { username: 'user', password: 'user123', token: 'mock-token-user' }
];

// Mock token storage
const validTokens = new Set();

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = req.url;
  const method = req.method;

  // Login endpoint
  if (url === '/api/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
          validTokens.add(user.token);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            token: user.token,
            username: user.username
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: false, 
            message: 'Invalid credentials' 
          }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Bad request' 
        }));
      }
    });
    return;
  }

  // Verify token endpoint
  if (url === '/api/verify' && method === 'GET') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token && validTokens.has(token)) {
      const user = mockUsers.find(u => u.token === token);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        username: user.username 
      }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: false, 
        message: 'Invalid token' 
      }));
    }
    return;
  }

  // Logout endpoint
  if (url === '/api/logout' && method === 'POST') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      validTokens.delete(token);
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully' 
    }));
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
