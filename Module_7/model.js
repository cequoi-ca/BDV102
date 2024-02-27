require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');

// Determine whether to use SSL based on an environment variable or any other logic
const useSSL = process.env.DATABASE_USE_SSL === 'true'; // Assuming an environment variable that flags SSL usage

const sequelizeOptions = {
  host: process.env.PGHOST,
  dialect: 'postgres',
};

// If SSL is required, configure dialect options for SSL
if (useSSL) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: true, // This ensures that SSL is used and the certificate is verified
    },
  };
}

// Create a new Sequelize instance with environment variables
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, sequelizeOptions);

class Employee extends Model {}
Employee.init({
  employee_id: { type: DataTypes.INTEGER, primaryKey: true },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  hire_date: DataTypes.DATE,
  gender: DataTypes.STRING,
  salary: DataTypes.INTEGER,
  coffeeshop_id: DataTypes.INTEGER,
}, { sequelize, modelName: 'employee', timestamps: false });

module.exports = { Employee };
