import React from 'react';
import './components.css';

const DashboardEmpleado = ({ onNavegar }) => {
  
  // Lista de tareas asignadas al ROL DE EMPLEADO en Jira
  const tareasEmpleado = [
    {
      id: 'gestion-viajes',
      titulo: '✈️ Gestionar Viajes',
      descripcion: 'Crear, editar y eliminar paquetes (TRAV-86)',
      color: '#007bff' // Azul
    },
    {
      id: 'reembolsos',
      titulo: '💰 Registrar Reembolsos',
      descripcion: 'Procesar devoluciones a clientes (TRAV-73)',
      color: '#ffc107', // Amarillo
      textoOscuro: true
    },
    {
      id: 'reportes',
      titulo: '📊 Reportes Financieros',
      descripcion: 'Ver balance de ingresos (TRAV-90)',
      color: '#17a2b8' // Cyan
    },
    {
      id: 'pagos-pendientes',
      titulo: '⚠️ Pagos Pendientes',
      descripcion: 'Revisar fallos o alertas (TRAV-57)',
      color: '#dc3545' // Rojo
    },
    {
      id: 'comunicados',
      titulo: '📢 Comunicados',
      descripcion: 'Enviar notificaciones (TRAV-94)',
      color: '#6c757d' // Gris
    }
  ];

  return (
    <div className="dashboard-container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.2rem' }}>👷 Panel de Trabajo del Empleado</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Seleccione una operación para comenzar su jornada</p>
      </div>

      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px' 
      }}>
        
        {tareasEmpleado.map((tarea) => (
          <div 
            key={tarea.id}
            onClick={() => onNavegar(tarea.id)}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              borderLeft: `6px solid ${tarea.color}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>{tarea.titulo}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{tarea.descripcion}</p>
            </div>
            
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <span style={{ 
                color: tarea.color, 
                fontWeight: 'bold', 
                fontSize: '0.9rem',
                backgroundColor: `${tarea.color}15`, // Color con transparencia
                padding: '5px 10px',
                borderRadius: '15px'
              }}>
                Acceder →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEmpleado;