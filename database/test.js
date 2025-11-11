const pool = require('./config/database');

const testDatabase = async () => {
  try {
    // Probar consulta simple
    const result = await pool.query('SELECT version()');
    console.log(' PostgreSQL Version:', result.rows[0].version);
    
    // Verificar tablas
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log(' Tablas en la base de datos:');
    tables.rows.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    
  } catch (error) {
    console.error(' Error:', error.message);
  } finally {
    await pool.end();
  }
};

testDatabase();