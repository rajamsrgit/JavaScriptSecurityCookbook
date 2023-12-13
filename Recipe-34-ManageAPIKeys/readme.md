# Recipe 34: Securely Managing API Keys

## 1. Install the required `dotenv` packages

```
npm install dotenv
```

## 2. Create a `.env` file in the root of your project and add your API keys:

```
API_KEY=your_api_key_here
```

## 3. Create a `config.js` file to manage your configuration:

```
// config.js
require('dotenv').config();

const config = {
  apiKey: process.env.API_KEY,
};

module.exports = config;
```

## 4. Use the configuration in your main application file:

```
// app.js
const config = require('./config');

// Example: Accessing the API key
const apiKey = config.apiKey;

// Use the apiKey in your API requests or other parts of your application
```

## 5. Make sure to add the `.env` file to your .gitignore to avoid exposing sensitive information:
```
.gitignore
node_modules
.env
```