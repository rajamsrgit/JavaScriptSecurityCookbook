const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, secure world!');
});

const PORT = 443; // Standard HTTPS port

server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
