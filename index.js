const express = require('express');
const { Pool } = require('pg');

const app = express();

// Database connection configuration
const pool = new Pool({
  user: 'postgres', // Replace with your database username if different
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`, // Cloud SQL instance connection name
  database: 'real_estate_db', // Replace with your database name if different
  password: process.env.DB_PASSWORD, // Database password from environment variable
  port: 5432, // Default PostgreSQL port
});

// Health check route
app.get('/', (req, res) => {
  res.send('Hello, Real Estate Backend is running!');
});

// API: Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    // Query to fetch all properties from the database
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    // Log the error for better debugging
    console.error('Database Query Error:', err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }
});

// Export the app for Cloud Run
exports.helloHttp = app;
