const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  host: 'postgres',
  database: process.env.POSTGRES_DB || 'wherenext',
  password: process.env.POSTGRES_PASSWORD || 'password123',
  port: 5432,
});

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
