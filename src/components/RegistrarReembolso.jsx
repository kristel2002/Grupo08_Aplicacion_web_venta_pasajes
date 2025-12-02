import React, { useState } from 'react';
import './components.css'; // Usamos los mismos estilos

const RegistrarReembolso = ({ onVolver }) => {
  const [datos, setDatos] = useState({
    idReserva: '',
    cliente: '',
    monto: '',
    motivo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en base de datos
    console.log("Reembolso registrado:", datos);
    alert(`✅ Reembolso registrado correctamente para la reserva #${datos.idReserva}`);
    onVolver(); // Volver atrás al terminar
  };

  return (
    <div className="reembolso-container" style={{ maxWidth: '600px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="form-header" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333' }}>💰 Registrar Solicitud de Reembolso</h2>
        <p style={{ color: '#666' }}>Complete los datos para procesar la devolución</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ID de Reserva o Ticket:</label>
          <input 
            type="text" 
            name="idReserva"
            value={datos.idReserva}
            onChange={handleChange}
            placeholder="Ej. RSV-2024-001"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Cliente:</label>
          <input 
            type="text" 
            name="cliente"
            value={datos.cliente}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Monto a Reembolsar (S/.):</label>
          <input 
            type="number" 
            name="monto"
            value={datos.monto}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Motivo de la devolución:</label>
          <textarea 
            name="motivo"
            value={datos.motivo}
            onChange={handleChange}
            placeholder="Explique la razón del reembolso..."
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
          />
        </div>

        <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={onVolver}
            style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            style={{ flex: 1, padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Registrar Reembolso
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegistrarReembolso;