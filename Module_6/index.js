const client = require('./db');

client.connect();
// define SQL for employees table;
let employee_table = `
CREATE TABLE employees (
        employee_id INT PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50),
        hire_date DATE,
        gender VARCHAR(1),
        salary INT,
        coffeeshop_id INT
);
`;
// Call database DBMS to create the table
client.query(employee_table);
