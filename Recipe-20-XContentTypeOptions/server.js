const express = require('express');
const helmet = require('helmet');

const app = express();

// Use the helmet middleware to set security headers
app.use(helmet());

// Your other middleware and route handlers go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
