const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Create a new employee
app.put('/employees', async (req, res) => {
    const { employee_id, first_name, last_name, email, hire_date, gender, salary, coffeeshop_id } = req.body;
    const query = `
      INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, gender, salary, coffeeshop_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING employee_id;
    `;
    try {
      const result = await db.query(query, [employee_id, first_name, last_name, email, hire_date, gender, salary, coffeeshop_id]);
      res.status(201).json({ message: 'Employee created', employeeId: result.rows[0].employee_id });
    } catch (error) {
      // in case of an error during database operation, return a http status code 500 
      res.status(500).json({ error: error.message });
    }
  });

  // Update an existing employee
  app.post('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL path
    const { first_name, last_name, email, hire_date, gender, salary, coffeeshop_id } = req.body;
  
    // Assuming all fields are required for the update, adjust according to your needs
    const updateQuery = `
      UPDATE employees
      SET first_name = $2, last_name = $3, email = $4, hire_date = $5, gender = $6, salary = $7, coffeeshop_id = $8
      WHERE employee_id = $1
      RETURNING employee_id;
    `;
  
    try {
      const result = await db.query(updateQuery, [id, first_name, last_name, email, hire_date, gender, salary, coffeeshop_id]);
  
      // Check if the employee exists and was updated
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated', employeeId: result.rows[0].employee_id });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
// Delete an employee
app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const deleteEmployeeSQL = 'DELETE FROM employees WHERE employee_id = $1';
 
    try {
        const result = await db.query(deleteEmployeeSQL, [id]);
    
        // Check if the employee was actually deleted
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        // Assuming deletion was successful
        res.json({ message: 'Employee deleted', deletedEmployee: result.rows[0] });
      } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
);

// Get an employees
app.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
  
    // Input Validation: Ensure the ID is an integer (or adjust according to your ID format)
    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    const getEmployeeSQL = 'SELECT * FROM employees WHERE employee_id = $1';
  
    try {
      const result = await db.query(getEmployeeSQL, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
