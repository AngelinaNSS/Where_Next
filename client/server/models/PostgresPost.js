// PostgreSQL Model for Project Where Next - Migration in Progress
const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
  user: 'admin',
  host: 'postgres',  //
  database: 'wherenext',
  password: 'password123',
  port: 5432,
});

// Test here the connection function
async function testPostgreSQL() {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as postgres_version');
    return {
      connected: true,
      time: result.rows[0].current_time,
      version: result.rows[0].postgres_version
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
}

module.exports = {
  pool,
  testPostgreSQL
};
