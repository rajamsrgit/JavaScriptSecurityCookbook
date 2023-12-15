// Ensure you have the jsdom package installed in your Node.js project:

const { JSDOM } = require('jsdom');

function escapeHtml(input) {
    const dom = new JSDOM(input);
    return dom.window.document.body.textContent || "";
}

// Example usage
const userInput = '<script>alert("XSS Attack!");</script>';
const escapedInput = escapeHtml(userInput);

console.log(escapedInput);
