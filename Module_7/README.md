# Module 7 - HTTP REST API
This project will introduce you to the HTTP REST API. 
You willll be defining and test REST endpoints and implement logic to perform CRUD operations on a database. We will be using the [express](https://expressjs.com)  http framework in node.js.



## Project Setup
The project was created with the following dependencies. 
```
npm init -y
npm install pg dotenv sequelize dotenv express --save
```

## Prerequsits
- login to neon and create database
- update the file `.env` with your database credentials
[Neon Documentation](https://neon.tech/docs/connect/connect-from-any-app)
example
```sh
PGUSER=alex
PGHOST=ep-cool-darkness-123456.us-east-2.aws.neon.tech
PGDATABASE=dbname
PGPASSWORD=AbC123dEf
PGPORT=5432
```

## Defining a REST API
To create a REST API, we will be using the [express](https://expressjs.com)  http framework in node.js with the followig steps.

1. Installation: Express has already been installed for your project by the command
```bash
npm install express --save # Installs Express and saves it to the package.json file
```

2. Creating a Server: To create an Express server, you need to import the Express module and use its methods to set up the server. Here is a simple example:

```js
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

3. Defining Routes
Routes are used to define how an application responds to client requests to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

Basic Routing: A route method is derived from one of the HTTP methods, and is attached to an instance of the Express class.

```js
Copy code
// Responds to GET requests to get data of the employee with the id in the url
app.get('/employees/:id', (req, res) => {
  const { id } = req.params; 
  res.send('Data of employee with id ' + id);
});

// Responds to DELETE requests to delete employee with the id in the url
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params; 
  res.send('Data of employee with id ' + id);
});

// Responds to PUT requests to "/employees"
app.put('/employees', (req, res) => {
  // Logic to handle PUT with JSON data
  //  and persist to the database
  res.send('Data received');
});
```

4. Middleware
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function.

example
```js
app.use(express.json()); // Built-in middleware for parsing JSON bodies

// Custom middleware that logs the request path for every request
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next(); // Pass control to the next middleware function
});
```

### Putting it all together.
Copy the contents below to file `sample-server.js`
```js
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/employees/:id', (req, res) => {
  const { id } = req.params; 
  res.send('Data of employee with id ' + id);
});

// Responds to DELETE requests to delete employee with the id in the url
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params; 
  res.send('Data of employee with id ' + id);
});

// Responds to PUT requests to "/employees"
app.put('/employees', (req, res) => {
  // Logic to handle PUT with JSON data
  //  and persist to the database
  res.send('Data received');
});
```

Start the server with command
```
node sample-server.js
```

## Testing the REST API with REST Client
Create a file sample.rest with the following content for the VScode rest plugin.
```
###
http://localhost:3000/employees/1
```

The plugin will activate a link `Send Request`, click the link to send the request.

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 26
ETag: W/"1a-dyvhDbVrBG5s5BATZfhTpHT6uak"
Date: Tue, 05 Mar 2024 15:19:00 GMT
Connection: close

Data of employee with id 1
```

## Tasks