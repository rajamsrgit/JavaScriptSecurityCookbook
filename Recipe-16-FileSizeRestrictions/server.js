/*This server-side code uses the multer middleware to handle file uploads and sets a file size limit of 1MB (adjust as needed). The upload.single('file') middleware processes a single file with the field name 'file'. You can adapt the server-side code based on your specific needs.

Make sure to install the required Node.js packages by running:

npm install express multer
*/

const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // Store the file in memory (adjust as needed)
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } }); // 1MB limit

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Process the file or do further validation

    res.send('File uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
