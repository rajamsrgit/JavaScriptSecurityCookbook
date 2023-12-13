// Install required packages
// npm install express body-parser

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory user database (replace it with a real database in production)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    // Add more users as needed
];

// Function to generate a session token
function generateToken(userId) {
    // Use a secure method to generate a token (e.g., JSON Web Token)
    return `token_${userId}_${Date.now()}`;
}

// Middleware to validate the token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access Denied');

    // Extract user ID from the token and validate it (add more security checks)
    const userId = parseInt(token.split('_')[1]);

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(401).send('Invalid Token');

    req.user = user;
    next();
}

// Route to authenticate and return a token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).send('Invalid Credentials');

    const token = generateToken(user.id);
    res.json({ token });
});

// Protected route that requires authentication
app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Welcome, ${req.user.username}!`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
