// server.js
const express = require('express');
const multer = require('multer');
const { ClamScan } = require('@claviska/clamscan');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const clamscan = new ClamScan({
  clamscan: {
    path: '/usr/bin/clamscan', // Path to the ClamAV binary
    db: '/var/lib/clamav'
  },
  preference: 'clamdscan'
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { buffer } = req.file;
    const isSafe = await clamscan.isInfected(buffer);

    if (isSafe) {
      // Process the file since it's safe
      res.status(200).json({ message: 'File is safe!' });
    } else {
      // Reject the file if it's infected
      res.status(400).json({ error: 'File is infected!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
