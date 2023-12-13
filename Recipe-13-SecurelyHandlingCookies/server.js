/*In this example:

To set HTTP-only and secure flags for cookies on the server side in a Node.js application, you typically do this within your server code. Here's a brief example using Express, a popular web framework for Node.js:


First, install Express if you haven't already:
npm install express


The cookie-parser middleware is used to parse cookies in the request.
The / route sets a cookie using the res.cookie method with the httpOnly and secure options.
Make sure to adjust the secure option based on your deployment environment. In the example, it is set to true only in a production environment, assuming that you are using HTTPS in production.

Remember to handle sensitive information carefully and follow security best practices in your application.
*/
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  // Set HTTP-only and secure cookie
  res.cookie('exampleCookie', 'exampleValue', {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
  });

  res.send('Cookie set successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
