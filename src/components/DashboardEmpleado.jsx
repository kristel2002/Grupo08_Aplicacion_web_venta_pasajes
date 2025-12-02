import React from 'react';
import './components.css';

const DashboardEmpleado = ({ onNavegar }) => {
  
  // SOLO dejamos la tarea de Reembolsos como pediste
  const tareasEmpleado = [
    {
      id: 'reembolsos',
      titulo: '💰 Registrar Reembolsos',
      descripcion: 'Procesar solicitudes de devolución (TRAV-73)',
      color: '#ffc107', // Amarillo
      textoOscuro: true
    }
  ];

  return (
    <div className="dashboard-container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.2rem' }}>👷 Panel de Empleado</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Bienvenido. Tarea disponible:</p>
      </div>

      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        // Cambiamos el grid para que el botón único se vea bien centrado y grande
        gridTemplateColumns: '1fr', 
        maxWidth: '400px',
        margin: '0 auto',
        gap: '25px' 
      }}>
        
        {tareasEmpleado.map((tarea) => (
          <div 
            key={tarea.id}
            onClick={() => onNavegar(tarea.id)}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '30px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              borderLeft: `8px solid ${tarea.color}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '200px' // Le damos altura para que parezca un botón importante
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            }}
          >
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💸</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.4rem' }}>{tarea.titulo}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>{tarea.descripcion}</p>
            </div>
            
            <div style={{ marginTop: '25px' }}>
              <span style={{ 
                color: '#856404', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                backgroundColor: '#fff3cd', 
                padding: '8px 20px',
                borderRadius: '20px'
              }}>
                Ingresar al Módulo →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEmpleado;