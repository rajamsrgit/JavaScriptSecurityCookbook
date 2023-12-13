const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/external-script', (req, res) => {
    // Validate the request (you may add more validation logic)
    const { script } = req.body;

    if (!script || typeof script !== 'string') {
        return res.status(400).json({ error: 'Invalid script format' });
    }

    // Securely handle the external script (you may add more security measures)
    const sanitizedScript = sanitizeScript(script);

    // Respond with the sanitized script
    res.json({ sanitizedScript });
});

function sanitizeScript(script) {
    // Implement your sanitization logic here
    // For example, you can use a library like DOMPurify to sanitize HTML content
    // Install DOMPurify using: npm install dompurify
    const DOMPurify = require('dompurify');
    return DOMPurify.sanitize(script);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
