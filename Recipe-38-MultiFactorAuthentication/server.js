// Install necessary packages:
// npm install express speakeasy body-parser

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy user data (replace with your user data storage)
const users = {};

// Endpoint to register a user and generate a secret
app.post('/register', (req, res) => {
    const { username } = req.body;
    const secret = speakeasy.generateSecret();

    users[username] = { secret: secret.base32, isVerified: false };

    res.json({ secret: secret.otpauth_url });
});

// Endpoint to verify the user's token
app.post('/verify', (req, res) => {
    const { username, token } = req.body;
    const user = users[username];

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token: token,
        window: 1, // Allow tokens from the past 1 step and the next 1 step (30-second window)
    });

    if (verified) {
        user.isVerified = true;
        return res.json({ success: true, message: 'Token verified successfully' });
    } else {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

// Example protected route that requires MFA
app.get('/dashboard', (req, res) => {
    const { username } = req.query;
    const user = users[username];

    if (user && user.isVerified) {
        res.json({ message: 'Welcome to the dashboard!' });
    } else {
        res.status(401).json({ error: 'User not authenticated or verified' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
