const https = require('https');
const fs = require('fs');

// Load your SSL certificate and private key
const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

// Define the expected public key hash (SHA-256)
const expectedPublicKeyHash = 'YOUR_PUBLIC_KEY_HASH';

// Create an HTTPS server
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, this is a secure server!\n');
});

// Listen on a specific port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

// Add a listener for the 'secureConnection' event to perform certificate pinning
server.on('secureConnection', (tlsSocket) => {
  const peerCertificate = tlsSocket.getPeerCertificate();

  // Check if the public key hash matches the expected hash
  if (peerCertificate && peerCertificate.fingerprint256 === expectedPublicKeyHash) {
    console.log('Certificate is valid. Connection secure.');
  } else {
    console.error('Certificate verification failed. Potential MitM attack!');
    // Handle the error or close the connection as needed
    tlsSocket.destroy();
  }
});
