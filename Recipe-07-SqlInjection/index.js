const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your-database-host',
  user: 'your-database-user',
  password: 'your-database-password',
  database: 'your-database-name',
});

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for handling user input
app.post('/users', (req, res) => {
  // Get user input from the request body
  const { username, password } = req.body;

  // Use a parameterized query to avoid SQL injection
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const values = [username, password];

  // Use the connection pool to execute the query
  pool.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('SQL injection protection failed:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User added successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
