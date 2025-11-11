import { useState } from 'react';
import './components.css';

const CrearViajes = () => {
  const [nuevoViaje, setNuevoViaje] = useState({
    destino: '',
    descripcion: '',
    precio: '',
    fechaSalida: '',
    asientos: 1
  });

  const handleCrearViaje = (e) => {
    e.preventDefault();
    console.log('Creando viaje:', nuevoViaje);
    // Lógica para crear viaje
  };

  return (
    <div className="componente">
      <h2>Crear Nuevo Viaje</h2>
      <form onSubmit={handleCrearViaje} className="formulario">
        <div className="campo">
          <label>Destino:</label>
          <input 
            type="text" 
            value={nuevoViaje.destino}
            onChange={(e) => setNuevoViaje({...nuevoViaje, destino: e.target.value})}
            placeholder="Nombre del destino"
            required
          />
        </div>
        
        <div className="campo">
          <label>Descripción:</label>
          <textarea 
            value={nuevoViaje.descripcion}
            onChange={(e) => setNuevoViaje({...nuevoViaje, descripcion: e.target.value})}
            placeholder="Descripción del viaje"
            rows="3"
          />
        </div>
        
        <div className="campo-doble">
          <div className="campo">
            <label>Precio ($):</label>
            <input 
              type="number" 
              value={nuevoViaje.precio}
              onChange={(e) => setNuevoViaje({...nuevoViaje, precio: e.target.value})}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="campo">
            <label>Asientos disponibles:</label>
            <input 
              type="number" 
              value={nuevoViaje.asientos}
              onChange={(e) => setNuevoViaje({...nuevoViaje, asientos: parseInt(e.target.value)})}
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="campo">
          <label>Fecha de salida:</label>
          <input 
            type="date" 
            value={nuevoViaje.fechaSalida}
            onChange={(e) => setNuevoViaje({...nuevoViaje, fechaSalida: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Crear Viaje
        </button>
      </form>
    </div>
  );
};

export default CrearViajes;