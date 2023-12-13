// Make sure to install the necessary packages before running the code:
// npm install express express-rate-limit http ws

const express = require('express');
const expressRateLimit = require('express-rate-limit');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Rate limiting middleware
const limiter = expressRateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Max 5 connections per minute per IP
    message: 'Too many connections from this IP, please try again after a minute.',
});

app.use('/ws', limiter);

wss.on('connection', (ws, req) => {
    // Handle WebSocket connections here
    console.log('WebSocket connection established.');

    // Close the connection if inactive for 5 minutes
    const connectionTimeout = setTimeout(() => {
        ws.terminate();
    }, 5 * 60 * 1000);

    ws.on('message', (message) => {
        // Handle incoming messages
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        // Clear the connection timeout when the WebSocket is closed
        clearTimeout(connectionTimeout);
        console.log('WebSocket connection closed.');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
