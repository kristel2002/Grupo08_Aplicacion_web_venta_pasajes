const { Client } = require('pg');

async function setupDatabase() {
  console.log(' Iniciando configuración de la base de datos...');
  
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'password123',
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log(' Conectado a PostgreSQL');

    // Crear base de datos si no existe
    try {
      await client.query('CREATE DATABASE tourest');
      console.log(' Base de datos "tourest" creada');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('  La base de datos "tourest" ya existe');
      } else {
        console.error(' Error creando base de datos:', err.message);
        throw err;
      }
    }

    await client.end();
    
    // Conectar a la base de datos tourest
    const clientTourest = new Client({
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'password123',
      database: 'tourest'
    });

    await clientTourest.connect();
    console.log(' Conectado a la base de datos "tourest"');

    // Crear tabla de usuarios
    await clientTourest.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        activo BOOLEAN DEFAULT true,
        creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log(' Tabla "usuarios" creada/verificada');

    // Insertar datos de ejemplo
    try {
      const result = await clientTourest.query(`
        INSERT INTO usuarios (nombre, email, password, telefono) VALUES
        ('Juan Pérez', 'juan@tourest.com', 'password123', '+1234567890'),
        ('María García', 'maria@tourest.com', 'password456', '+0987654321')
        ON CONFLICT (email) DO NOTHING
        RETURNING id, nombre, email
      `);
      
      if (result.rows.length > 0) {
        console.log(' Datos de ejemplo insertados:');
        result.rows.forEach(user => {
          console.log(`   - ${user.nombre} (${user.email})`);
        });
      } else {
        console.log('  Los datos de ejemplo ya existían');
      }
    } catch (insertError) {
      console.log('  Los datos de ejemplo ya existían');
    }

    // Contar usuarios
    const countResult = await clientTourest.query('SELECT COUNT(*) as total FROM usuarios');
    console.log(` Total de usuarios en la base: ${countResult.rows[0].total}`);

    await clientTourest.end();
    console.log(' Base de datos configurada exitosamente');

  } catch (err) {
    console.error(' Error:', err.message);
    console.log('\n Solución de problemas:');
    console.log('   1. Verifica que PostgreSQL esté corriendo');
    console.log('   2. Verifica las credenciales en database/setup.js');
    console.log('   3. Asegúrate de que el usuario "postgres" exista');
    console.log('   4. Verifica que el puerto 5432 esté disponible');
    
    if (err.message.includes('password authentication failed')) {
      console.log('\n Error de autenticación:');
      console.log('   - Verifica la contraseña de PostgreSQL');
      console.log('   - La contraseña por defecto suele estar vacía o ser "postgres"');
    }
    
    if (err.message.includes('connect ECONNREFUSED')) {
      console.log('\n🔌 Error de conexión:');
      console.log('   - PostgreSQL no está corriendo');
      console.log('   - Inicia el servicio PostgreSQL');
    }
  }
}

// Ejecutar la función
setupDatabase();