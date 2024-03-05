# Module 6 - Server Side Javascript
This project will introduce you to the server side of javascript,
and test driven development. Through the jest test framework you will run procedures to create a database, and create/update/delete records with SQL.

## This Module will cover the following topics:
- Javascript with node.js
- Testing with [Jest](https://jestjs.io)
- SELECT, CREATE, UPDATE, DELETE
- Create a "coffeshop" Database from javascript logic
- Create/Update/Delete an Employee


## Prerequsits
- login to neon and create database
- update the file `.env` with your database credentials
[Neon Documentation](https://neon.tech/docs/connect/connect-from-any-app)
example
```
PGUSER=alex
PGHOST=ep-cool-darkness-123456.us-east-2.aws.neon.tech
PGDATABASE=dbname
PGPASSWORD=AbC123dEf
PGPORT=5432
```

## Jest test
The Jest testing framework is a popular choice for testing JavaScript code, and included in this project see. `package.json` 

### Writing Tests: 
Create files with your tests. By default, Jest looks for test files with any of the following formats:

- Files with .js suffix in __tests__ folders.
- Files with .test.js suffix.
- Files with .spec.js suffix.

A basic test file might look something like this:

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Running Tests:
Jest is configured in `package.json` to run tests with `npm test`
Open `package.json` and review the `scripts` section.

```json
"scripts": {
  "test": "jest"
}
```
Then you can rn test as follows:

```bash
npm test
```

## Structure of a test file
A jest test file has the following syntax and structure:

1. Describe Block: 
This is used to group together several related tests in a single test suite. The first argument is a string describing the name of the test suite, and the second argument is a function that contains the individual tests or hooks.
```js
describe('app', () => {
  // Test cases will go here
});
```

2. 'beforeAll Hook: 
This is a Jest lifecycle hook that runs a piece of code before all the tests in a describe block run. It's useful for setup that you want to perform once before all your tests run. For example, in this project you use it to connect to a database and to set up any global state needed for all tests.

```javascript
beforeAll(() => {
  // Code to run before all tests
});

```

3. test Function: This function defines an individual test case. It takes two arguments: a string describing the test and a callback function that contains the test's code. The callback function is where you will place your test logic, using expect statements to test your code.

```javascript
test('Iinsert new Employee', () => {
  // Test logic goes here
});
```


4. 'afterAll Hook: 
This runs a function after all the tests in a particular file have completed. It's typically used for teardown logic, such as closing database connections or shutting down a server.
```js
afterAll(() => {
  // Code here runs once after all tests in the file
});
```

Putting it all together in a single block:
```js
describe('app', () => {
  beforeAll(() => {
    // Initialization or setup code runs here
    // For example, setting up database connections
  });

  test('does something', () => {
    // Actual test case
    // Here you can use expect() to test your assumptions
    expect(true).toBe(true); // An example assertion
  });

  // You can have multiple test cases within a describe block
  test('does something else', () => {
    // Another test case
    expect(2 + 2).toBe(4); // Another example assertion
  });
});

```



The file test1.spec.js 
## Task
- Review the file test1.test.js


### 

## Reference
[Neon SQL editor](https://neon.tech/docs/get-started-with-neon/query-with-neon-sql-editor)
