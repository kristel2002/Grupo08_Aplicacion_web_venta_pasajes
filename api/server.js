const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ 
      message: ' API funcionando con PostgreSQL',
      time: result.rows[0].current_time 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener datos de ejemplo
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor API ejecutándose en puerto ${PORT}`);
});