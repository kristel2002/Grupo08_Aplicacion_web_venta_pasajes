// components/Servicios.jsx
import React from 'react';
import './Servicios.css';

const Servicios = ({ onVolver }) => {
  return (
    <div className="servicios-container">
      <div className="container">
        <button className="btn-back" onClick={onVolver}>
          ← Volver al inicio
        </button>
        
        <div className="servicios-header">
          <h1>Nuestros Servicios</h1>
          <p>Ofrecemos diferentes tipos de transporte para adaptarnos a tus necesidades de viaje</p>
        </div>

        <div className="servicios-grid">
          {/* Servicio Estándar */}
          <div className="servicio-card">
            <div className="servicio-icon">🚐</div>
            <h3>Servicio Estándar</h3>
            <p className="servicio-vehicle">Minibús</p>
            <ul className="servicio-features">
              <li>✓ Capacidad: 12-15 pasajeros</li>
              <li>✓ Ideal para grupos pequeños</li>
              <li>✓ Precio económico</li>
              <li>✓ Comodidad básica</li>
              <li>✓ Rutas frecuentes</li>
              <li>✓ Puntos de embarque estratégicos</li>
              <li>✓ Reserva inmediata</li>
              <li>✓ Seguro básico de viaje</li>
            </ul>
            <div className="servicio-price">
              Precio desde
              <span>$25.000</span>
              por persona
            </div>
          </div>

          {/* Servicio VIT - Premium */}
          <div className="servicio-card servicio-premium">
            <div className="servicio-icon">🚌</div>
            <h3>Servicio VIT</h3>
            <p className="servicio-vehicle">Bus Premium</p>
            <ul className="servicio-features">
              <li>✓ Capacidad: 40-50 pasajeros</li>
              <li>✓ Asientos reclinables premium</li>
              <li>✓ Aire acondicionado controlado</li>
              <li>✓ Wi-Fi de alta velocidad</li>
              <li>✓ Entretenimiento individual</li>
              <li>✓ Servicio de bebidas y snacks</li>
              <li>✓ Baño disponible a bordo</li>
              <li>✓ Asistente de viaje</li>
              <li>✓ Seguro de viaje extendido</li>
              <li>✓ Prioridad en embarque</li>
            </ul>
            <div className="servicio-price">
              Precio desde
              <span>$45.000</span>
              por persona
            </div>
          </div>
        </div>

        {/* Tabla Comparativa */}
        <div className="servicios-comparison">
          <h2>Comparación de Servicios</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Servicio Estándar</th>
                  <th>Servicio VIT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Vehículo</strong></td>
                  <td>Minibús</td>
                  <td>Bus Premium</td>
                </tr>
                <tr>
                  <td><strong>Capacidad</strong></td>
                  <td>12-15 pasajeros</td>
                  <td>40-50 pasajeros</td>
                </tr>
                <tr>
                  <td><strong>Comodidades Básicas</strong></td>
                  <td>✓ Asientos estándar</td>
                  <td>✓ Asientos reclinables premium</td>
                </tr>
                <tr>
                  <td><strong>Climatización</strong></td>
                  <td>Ventilación natural</td>
                  <td>✓ Aire acondicionado controlado</td>
                </tr>
                <tr>
                  <td><strong>Entretenimiento</strong></td>
                  <td>Música ambiental</td>
                  <td>✓ Wi-Fi + Pantallas individuales</td>
                </tr>
                <tr>
                  <td><strong>Servicio a Bordo</strong></td>
                  <td>-</td>
                  <td>✓ Bebidas y snacks incluidos</td>
                </tr>
                <tr>
                  <td><strong>Baño</strong></td>
                  <td>-</td>
                  <td>✓ Disponible a bordo</td>
                </tr>
                <tr>
                  <td><strong>Seguro de Viaje</strong></td>
                  <td>Básico</td>
                  <td>✓ Extendido</td>
                </tr>
                <tr>
                  <td><strong>Asistencia</strong></td>
                  <td>Soporte telefónico</td>
                  <td>✓ Asistente de viaje dedicado</td>
                </tr>
                <tr>
                  <td><strong>Precio Aproximado</strong></td>
                  <td>$25.000 - $35.000</td>
                  <td>$45.000 - $60.000</td>
                </tr>
                <tr>
                  <td><strong>Ideal para</strong></td>
                  <td>Viajes cortos, grupos pequeños, presupuesto limitado</td>
                  <td>Viajes largos, grupos grandes, máxima comodidad</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="servicios-adicional" style={{marginTop: '3rem', textAlign: 'center', color: 'white'}}>
          <h3>¿Necesitas ayuda para elegir?</h3>
          <p style={{fontSize: '1.1rem', opacity: 0.9}}>
            Contáctanos y te asesoraremos para seleccionar el servicio que mejor se adapte a tus necesidades.
          </p>
          <div style={{marginTop: '1.5rem'}}>
            <button 
              className="btn-primary" 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem',
                marginRight: '1rem'
              }}
            >
              📞 Contactar Asesor
            </button>
            <button 
              className="btn-secondary"
              style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              📋 Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;