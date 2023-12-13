const express = require('express');
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    // Continue to the next middleware
    next();
});

// Your routes and other middleware go here

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
