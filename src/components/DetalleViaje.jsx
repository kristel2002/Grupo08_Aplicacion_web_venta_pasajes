import React from 'react';
import './components.css'; 

const DetalleViaje = ({ viaje, onVolver, onReservar }) => {
  // Si por alguna razón no llega información del viaje, mostramos un error amigable
  if (!viaje) {
    return (
      <div className="detalle-error">
        <p>No se ha seleccionado ningún viaje.</p>
        <button onClick={onVolver}>Volver</button>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <button className="btn-volver" onClick={onVolver}>
        ← Volver
      </button>

      <div className="detalle-header">
        <h1>{viaje.titulo}</h1>
        {/* Si tienes el precio en el objeto viaje, úsalo, si no, usa un default */}
        <span className="precio">{viaje.precio || "Consultar Precio"}</span>
      </div>

      {/* Renderizado condicional de la imagen */}
      {viaje.imagen && (
        <img src={viaje.imagen} alt={viaje.titulo} className="detalle-imagen" />
      )}

      <div className="detalle-info">
        <h3>Descripción del Paquete</h3>
        <p>{viaje.descripcion || "Disfruta de una experiencia inolvidable con nosotros."}</p>
        
        <div className="info-extra">
          <div className="info-item">
            <strong>📅 Duración:</strong> {viaje.duracion || "3 días / 2 noches"}
          </div>
          <div className="info-item">
            <strong>📍 Destino:</strong> {viaje.destino || "Norte del Perú"}
          </div>
        </div>

        <div className="acciones-reserva">
           <button className="btn-reservar" onClick={onReservar}>
             ¡Reservar Ahora!
           </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleViaje;
