// TODO:  Install the required packages using npm install express jsonwebtoken

// server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_secret_key';

app.use(express.json());

// Login endpoint
app.post('/login', (req, res) => {
  // Validate user credentials (this is a simplified example)
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    // Generate a token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected endpoint
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
