# Node.js Fundamentals

This repository contains examples and explanations for fundamental Node.js concepts, from basic JavaScript execution to building HTTP servers with Express.

## Table of Contents
1. [Running JavaScript with Node.js](#running-javascript-with-nodejs)
2. [Using Node.js Modules](#using-nodejs-modules)
3. [Reading Files with fs Module](#reading-files-with-fs-module)
4. [Command Line Arguments and Environment](#command-line-arguments-and-environment)
5. [Creating an HTTP Server with Node.js](#creating-an-http-server-with-nodejs)
6. [Building a Server with Express.js](#building-a-server-with-expressjs)
7. [Advanced Routing with Express](#advanced-routing-with-express)
8. [Using ES6+ with Babel](#using-es6-with-babel)
9. [Development with Nodemon](#development-with-nodemon)

## Running JavaScript with Node.js

Node.js allows you to run JavaScript code outside of a web browser. To execute a JavaScript file:

```bash
node filename.js
```

Example `hello.js`:
```javascript
console.log('Hello, Node.js!');
```

## Using Node.js Modules

Node.js uses CommonJS modules by default. You can create and use modules with `module.exports` and `require()`.

```javascript
// math.js
const add = (a, b) => a + b;
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

## Reading Files with fs Module

The `fs` (File System) module provides file I/O operations.

```javascript
const fs = require('fs');

// Asynchronous file read
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Synchronous file read
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

## Command Line Arguments and Environment

Access command line arguments and environment variables:

```javascript
// Access command line arguments (excluding 'node' and script name)
const args = process.argv.slice(2);
console.log('Arguments:', args);

// Access environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('PATH:', process.env.PATH);
```

## Creating an HTTP Server with Node.js

Basic HTTP server using the built-in `http` module:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

## Building a Server with Express.js

Express.js simplifies server creation and routing:

```bash
npm install express
```

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
```

## Advanced Routing with Express

Express provides powerful routing capabilities:

```javascript
const express = require('express');
const router = express.Router();

// Route parameters
router.get('/users/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

// Query parameters
router.get('/search', (req, res) => {
  res.send(`Search query: ${req.query.q}`);
});

// Route middleware
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Protected route
router.get('/protected', auth, (req, res) => {
  res.send('Protected content');
});

module.exports = router;
```

## Using ES6 with Babel

To use modern JavaScript features:

1. Install required packages:
```bash
npm install --save-dev @babel/core @babel/node @babel/preset-env
```

2. Create `.babelrc`:
```json
{
  "presets": ["@babel/preset-env"]
}
```

3. Run with:
```bash
npx babel-node your-script.js
```

## Development with Nodemon

Nodemon automatically restarts your application when file changes are detected:

1. Install Nodemon:
```bash
npm install --save-dev nodemon
```

2. Add a script to `package.json`:
```json
{
  "scripts": {
    "dev": "nodemon your-app.js"
  }
}
```

3. Start development:
```bash
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
