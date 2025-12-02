import React from 'react';
import './components.css';

const HistorialViajes = ({ onVolver, onVerDetalles }) => {
  
  // DATOS DE EJEMPLO
  const historial = [
    {
      id: 101,
      titulo: "Tour Completo Chan Chan",
      fecha: "12 Oct 2025",
      estado: "Finalizado", 
      precio: 120,
      imagen: "/images/chan-chan.jpg",
      descripcion: "Viaje realizado con guía privado por la ciudadela."
    },
    {
      id: 102,
      titulo: "Huaca del Sol y la Luna",
      fecha: "20 Nov 2025",
      estado: "Confirmado", 
      precio: 80,
      imagen: "/images/huaca-sol-luna.jpg",
      descripcion: "Reserva confirmada. Pendiente de realizarse."
    },
    {
      id: 103,
      titulo: "Complejo El Brujo",
      fecha: "15 Sep 2025",
      estado: "Cancelado", 
      precio: 150,
      imagen: "/images/senora-cao.jpg",
      descripcion: "Cancelación solicitada por el usuario."
    }
  ];

  const getColorEstado = (estado) => {
    switch(estado) {
      case 'Finalizado': return '#28a745'; 
      case 'Confirmado': return '#007bff'; 
      case 'Cancelado': return '#dc3545'; 
      default: return '#6c757d';
    }
  };

  return (
    <div className="historial-container" style={{ marginTop: '100px', marginBottom: '50px', padding: '0 20px' }}>
      <div className="container">
        <button className="btn-volver" onClick={onVolver} style={{ marginBottom: '20px' }}>
          ← Volver al Inicio
        </button>

        <h2>📜 Mi Historial de Viajes</h2>
        <p>Revisa el estado y detalles de tus aventuras pasadas.</p>

        <div className="lista-historial" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {historial.map((viaje) => (
            <div 
              key={viaje.id} 
              className="card-historial"
              onClick={() => onVerDetalles(viaje)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ fontSize: '2em' }}>🚌</div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{viaje.titulo}</h3>
                  <p style={{ margin: 0, color: '#666' }}>📅 {viaje.fecha}</p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  backgroundColor: getColorEstado(viaje.estado),
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.9em',
                  fontWeight: 'bold'
                }}>
                  {viaje.estado}
                </span>
                <p style={{ marginTop: '10px', color: '#007bff', fontSize: '0.9em' }}>
                  Ver detalles →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorialViajes;