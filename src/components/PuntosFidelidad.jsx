import React, { useState } from 'react';
import './components.css';

const PuntosFidelidad = ({ onVolver }) => {
  // Simulación de puntos del usuario
  const [puntos, setPuntos] = useState(1500);
  const [mensaje, setMensaje] = useState('');

  const recompensas = [
    { id: 1, titulo: "Descuento de S/. 20", costo: 500, icono: "🎟️" },
    { id: 2, titulo: "Souvenir de Artesanía", costo: 800, icono: "🏺" },
    { id: 3, titulo: "Upgrade de Asiento", costo: 1200, icono: "💺" },
    { id: 4, titulo: "Viaje Gratis (Ruta Corta)", costo: 2500, icono: "🚌" },
  ];

  const canjear = (recompensa) => {
    if (puntos >= recompensa.costo) {
      setPuntos(puntos - recompensa.costo);
      setMensaje(`✅ ¡Canjeaste "${recompensa.titulo}" exitosamente!`);
      setTimeout(() => setMensaje(''), 3000);
    } else {
      alert("❌ No tienes suficientes puntos para este premio.");
    }
  };

  return (
    <div className="puntos-container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', marginTop: '80px' }}>
      
      <button className="btn-volver" onClick={onVolver} style={{ marginBottom: '20px' }}>
        ← Volver
      </button>

      <div className="puntos-header" style={{ 
        textAlign: 'center', 
        backgroundColor: '#6c5ce7', 
        color: 'white', 
        padding: '30px', 
        borderRadius: '15px',
        marginBottom: '40px',
        boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)'
      }}>
        <h2 style={{ margin: 0, opacity: 0.9 }}>Mis Puntos TravelTrux</h2>
        <h1 style={{ fontSize: '4rem', margin: '10px 0' }}>{puntos}</h1>
        <p>Puntos Disponibles</p>
      </div>

      {mensaje && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          {mensaje}
        </div>
      )}

      <h3>🎁 Catálogo de Recompensas</h3>
      <div className="grid-recompensas" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {recompensas.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '10px', 
            padding: '20px', 
            textAlign: 'center',
            backgroundColor: 'white',
            opacity: puntos < item.costo ? 0.6 : 1
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{item.icono}</div>
            <h4 style={{ margin: '10px 0' }}>{item.titulo}</h4>
            <p style={{ color: '#6c5ce7', fontWeight: 'bold', fontSize: '1.2rem' }}>{item.costo} pts</p>
            
            <button 
              onClick={() => canjear(item)}
              disabled={puntos < item.costo}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: puntos < item.costo ? '#ccc' : '#00b894',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: puntos < item.costo ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              {puntos < item.costo ? 'Insuficiente' : 'Canjear'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuntosFidelidad;