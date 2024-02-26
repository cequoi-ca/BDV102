const client = require('./db');
const { Employee } = require("./model")
describe('app', () => { 

  beforeAll(async () => {
    await client.connect();
    // DROP TABLES IF EXISTS;
    await client.query('DROP TABLE IF EXISTS employees CASCADE');
    await client.query('DROP TABLE IF EXISTS shops CASCADE');
    await client.query('DROP TABLE IF EXISTS locations CASCADE');
    await client.query('DROP TABLE IF EXISTS suppliers CASCADE');

    // CREATE TABLES;

    // create employees table;
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
    await client.query(employee_table);
    
    // create shops table;
    const shops_table = `
    CREATE TABLE shops (
        coffeeshop_id INT PRIMARY KEY,
        coffeeshop_name VARCHAR(50),
        city_id INT
    );
    -- add foreign key to employees table and set
    -- coffeeshop_id to NULL if the coffeeshop is deleted
    ALTER TABLE employees
    ADD FOREIGN KEY (coffeeshop_id)
    REFERENCES shops(coffeeshop_id)
    ON DELETE SET NULL;
    `;
    await client.query(shops_table);

    // create location table;
    const locations_table = `
    CREATE TABLE locations (
        city_id INT PRIMARY KEY,
        city VARCHAR(50),
        country VARCHAR(50)   
    );
    -- Add foreign key to shops table and set
    -- city_id to NULL if the city is deleted
    ALTER TABLE shops
    ADD FOREIGN KEY (city_id)
    REFERENCES locations(city_id)
    ON DELETE SET NULL;
    `;
    await client.query(locations_table);

    // create suppliers table;
    const suppliers_table = `
    CREATE TABLE suppliers (
        coffeeshop_id INT,
        supplier_name VARCHAR(40),
        coffee_type VARCHAR(20),
        PRIMARY KEY (coffeeshop_id, supplier_name),
        FOREIGN KEY (coffeeshop_id) REFERENCES shops(coffeeshop_id)
        ON DELETE CASCADE
    );
    `;
    await client.query(suppliers_table);
    await client.query("INSERT INTO employees VALUES (800001, 'Ava', 'Girard', 'agirard@caemail.com', '2015/06/12', 'F', 55000, NULL);");
    await client.query("INSERT INTO employees VALUES (800002, 'James', 'Perrault', 'jperrault@caemail.com', '2017/08/25', 'M', 60000, NULL);");
    await client.query("INSERT INTO shops VALUES(1, 'Common Grounds', NULL);")
    await client.query("UPDATE employees SET coffeeshop_id = 1 WHERE employee_id IN (800001, 800002);");
    await client.query("INSERT INTO locations VALUES(1, 'Los Angeles', 'United States');")
    await client.query("UPDATE shops SET city_id = 1 WHERE coffeeshop_id = 1;")
    await client.query("INSERT INTO suppliers VALUES(1, 'Beans and Barley', 'Arabica');")
    await client.query("INSERT INTO suppliers VALUES(1, 'Cool Beans', 'Robusta');");
    await client.query("INSERT INTO locations VALUES(2, 'New York', 'United States');");
    await client.query("INSERT INTO locations VALUES(3, 'London', 'United Kingdom');");
    await client.query("INSERT INTO shops VALUES(2, 'Early Rise', 2);");
    await client.query("INSERT INTO shops VALUES(3, 'Ancient Bean', 3);");
    await client.query("INSERT INTO shops VALUES(4, 'Urban Grind', 1);");
    await client.query("INSERT INTO shops VALUES(5, 'Trembling Cup', 2);");
    await client.query("INSERT INTO suppliers VALUES(2, 'Vanilla Bean', 'Liberica');");
    await client.query("INSERT INTO suppliers VALUES(2, 'Beans and Barley', 'Arabica');");
    await client.query("INSERT INTO suppliers VALUES(2, 'Cool Beans', 'Robusta');");
    await client.query("INSERT INTO suppliers VALUES(3, 'Bean Me Up', 'Excelsa');");
    await client.query("INSERT INTO suppliers VALUES(3, 'Vanilla Bean', 'Liberica');");
    await client.query("INSERT INTO suppliers VALUES(3, 'Cool Beans', 'Robusta');");
    await client.query("INSERT INTO suppliers VALUES(3, 'Beans and Barley', 'Arabica');");
    await client.query("INSERT INTO suppliers VALUES(4, 'Vanilla Bean', 'Liberica');");
    await client.query("INSERT INTO suppliers VALUES(4, 'Bean Me Up', 'Excelsa');");
    await client.query("INSERT INTO suppliers VALUES(5, 'Beans and Barley', 'Arabica');");
    await client.query("INSERT INTO suppliers VALUES(5, 'Vanilla Bean', 'Liberica');");
    await client.query("INSERT INTO suppliers VALUES(5, 'Bean Me Up', 'Excelsa');");
    console.log("Data inserted successfully.");

  });

  afterAll(async () => {
    client.end();
  });

  beforeEach(async () => {
  });

  afterEach(async () => {
  });

  test('Test SQL INSERT', async () => {
    await client.query("INSERT INTO employees VALUES (800003, 'Charlotte', 'Dupuis', 'cdupuis@caemail.com', '2018/05/30', 'F', 48000, 2);");
    await client.query("INSERT INTO employees VALUES (800004, 'Logan', 'Martin', 'lmartin@caemail.com', '2019/04/15', 'M', 53000, 3);");
    await client.query("INSERT INTO employees VALUES (800005, 'Lucas', 'Fortin', 'lfortin@caemail.com', '2020/02/20', 'M', 62000, 3);");
    await client.query("INSERT INTO employees VALUES (800006, 'Mia', 'Pelletier', 'mpelletier@caemail.com', '2021/11/11', 'F', 57000, 3);");
    await client.query("INSERT INTO employees VALUES (800007, 'Jack', 'Gauthier', 'jgauthier@caemail.com', '2022/03/08', 'M', 61000, 4);");
    await client.query("INSERT INTO employees VALUES (800008, 'Amelia', 'Lapointe', 'alapointe@caemail.com', '2023/01/17', 'F', 50000, 4);");
    await client.query("INSERT INTO employees VALUES (800009, 'Benjamin', 'Savard', 'bsavard@caemail.com', '2023/07/22', 'M', 64000, 4);");
    await client.query("INSERT INTO employees VALUES (800010, 'Zoe', 'Thibault', 'zthibault@caemail.com', '2023/10/05', 'F', 49000, 5);");

    console.log('Users inserted successfully.');
  });
  
  test('Test SQL SELECT', async () => {
    let result = await client.query("SELECT * FROM employees WHERE employee_id = 800001;");
      
    // Check if no employee is found or if more than one employee is found
    if (result.rows.length !== 1) {
      throw new Error(`Test failed: Expected exactly one employee to be returned, got ${result.rows.length}`);
    }
    // If exactly one employee is found, test passes (implicit)
    console.log("Test passed: Exactly one employee found:", result.rows[0]);
  });

  test('Test SQL UPDATE - Increase salary by 10% for employee 800001', async () => {
    // Update the salary
    await client.query(`
      UPDATE employees
      SET salary = salary * 1.10
      WHERE employee_id = 800001;
    `);
  
    // Retrieve the updated salary
    const result = await client.query(`
      SELECT salary
      FROM employees
      WHERE employee_id = 800001;
    `);
  
    // Assuming we know the original salary beforehand, e.g., $50,000
    const originalSalary = 55000;
    const expectedNewSalary = originalSalary * 1.10;
    const actualNewSalary = result.rows[0].salary;
  
    // Verify the salary was updated correctly
    expect(actualNewSalary).toBeCloseTo(expectedNewSalary, 2); 
    // Using toBeCloseTo for floating point comparison, if necessary
  });
  
  test('Test SQL DELETE employee 800001', async () => {
    // Delete the employee
    await client.query(`
      DELETE FROM employees
      WHERE employee_id = 800001;
    `);
    // Attempt to retrieve the deleted employee
    const result = await client.query(`
      SELECT * FROM employees
      WHERE employee_id = 800001;
    `);
    // Verify the employee was successfully deleted
    expect(result.rows.length).toBe(0);
  });

 
  test('Test ORM insert', async () => {
    let employeeData = {
      employee_id: 800011,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      hire_date: '2022-01-01',
      gender: 'M',
      salary: 50000,
      coffeeshop_id: 1
    }
    const employee = await Employee.create(employeeData);
    console.log('Employee created:', employee.toJSON());
  });
});