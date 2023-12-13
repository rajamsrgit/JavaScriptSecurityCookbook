// Make sure to install the required Node.js packages using:
// npm install express multer

// These examples provide basic file type validation. You may want to enhance security by considering file size limits, using a content security policy, and implementing additional measures depending on your specific use case.

// server.js
const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        // Save or process the file as needed
        res.send('File uploaded successfully.');
    } else {
        // Delete the file and send an error response
        res.status(400).send('Invalid file type. Please upload a JPG or PNG file.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
