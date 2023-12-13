const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the client-side JavaScript file
app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Endpoint to receive client-side logs
app.post('/log', express.json(), (req, res) => {
    const logs = req.body;
    // Store logs to a file or perform other actions as needed
    fs.appendFileSync('server-logs.log', JSON.stringify(logs) + '\n');
    res.status(200).send('Logs received successfully.');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
