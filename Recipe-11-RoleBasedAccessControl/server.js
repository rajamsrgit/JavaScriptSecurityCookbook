// Install required packages:
// npm install express body-parser

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// User roles
const roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// Sample user data with assigned roles
const users = [
  { username: 'admin1', password: 'adminpass', role: roles.ADMIN },
  { username: 'user1', password: 'userpass', role: roles.USER },
  { username: 'guest1', password: 'guestpass', role: roles.GUEST },
];

app.use(bodyParser.json());

// Authentication middleware
function authenticate(req, res, next) {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Authentication failed');
  }
}

// Authorization middleware
function authorize(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  };
}

// Example protected routes
app.get('/admin', authenticate, authorize(roles.ADMIN), (req, res) => {
  res.send('Admin has access to special features.');
});

app.get('/user', authenticate, authorize(roles.USER), (req, res) => {
  res.send('User has access to regular features.');
});

app.get('/guest', authenticate, authorize(roles.GUEST), (req, res) => {
  res.send('Guest has limited access.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
