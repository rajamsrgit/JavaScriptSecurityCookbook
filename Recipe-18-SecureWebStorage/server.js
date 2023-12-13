/** 
To securely store sensitive information using web storage, you can follow these steps:

1. Use a strong encryption algorithm to encrypt the sensitive data.
2. Store the encrypted data in the web storage (localStorage or sessionStorage).
3. Decrypt the data when needed.

Below is a simple example using Node.js and the crypto library for encryption and decryption. 
Note that this is a basic example, and in a real-world scenario, you may want to use more
robust encryption libraries and additional security measures.

**/

// Node.js server using Express
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Encryption key (should be stored securely)
const encryptionKey = 'your_secret_encryption_key';

// Encryption function
function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(text) {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decrypted = decipher.update(text, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Example route to store encrypted data
app.post('/store', (req, res) => {
  const sensitiveData = req.body.data;
  const encryptedData = encrypt(sensitiveData);
  // Store encrypted data in localStorage or sessionStorage
  // In a real application, you might want to implement proper error handling and validation.
  localStorage.setItem('encryptedData', encryptedData);
  res.send('Data stored securely.');
});

// Example route to retrieve and decrypt data
app.get('/retrieve', (req, res) => {
  // Retrieve encrypted data from localStorage or sessionStorage
  const encryptedData = localStorage.getItem('encryptedData');
  if (encryptedData) {
    // Decrypt the data when needed
    const decryptedData = decrypt(encryptedData);
    res.send(`Decrypted Data: ${decryptedData}`);
  } else {
    res.send('No data found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
