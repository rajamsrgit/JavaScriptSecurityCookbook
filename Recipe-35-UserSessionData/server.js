// Required packages
// npm install express express-session cookie-parser crypto

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Use express-session middleware for managing sessions
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 60000 }, // set secure and session expiration time (in milliseconds)
    })
);

// Route to set a session variable
app.get('/setSession', (req, res) => {
    req.session.user = { username: 'exampleUser' };
    res.send('Session variable set!');
});

// Route to get the session variable
app.get('/getSession', (req, res) => {
    const user = req.session.user;
    res.json(user || {});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
