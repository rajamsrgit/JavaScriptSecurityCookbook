// Install sentry module
// npm install --save @sentry/node

// In your Node.js server code
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: 'YOUR_DSN',
    // Additional configuration for Node.js
});

// Example: capture an error in a Node.js route handler
app.get('/', (req, res) => {
    try {
        // Code that might throw an error
        throw new Error('This is a test error');
    } catch (error) {
        // Capture and send the error to Sentry
        Sentry.captureException(error);
        res.status(500).send('Internal Server Error');
    }
});
