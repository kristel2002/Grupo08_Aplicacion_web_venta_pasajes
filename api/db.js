// api/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'tourest',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password123',
});

// Probar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a la BD:', err);
  } else {
    console.log(' Conectado a PostgreSQL');
    release();
  }
});

module.exports = pool;