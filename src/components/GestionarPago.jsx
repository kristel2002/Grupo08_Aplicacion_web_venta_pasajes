import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './components.css';

const GestionarPago = (props) => {
  const { user } = useAuth();
  const viaje = props.viaje;

  // Estados
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [monederoSeleccionado, setMonederoSeleccionado] = useState('');
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    nombre: '',
    vencimiento: '',
    cvv: '',
    cuotas: '1'
  });
  
  // Estados para monederos digitales
  const [datosMonedero, setDatosMonedero] = useState({
    numeroTelefono: '',
    token: ''
  });
  const [tokenEnviado, setTokenEnviado] = useState(false);

  // Datos de monederos digitales
  const monederos = [
    {
      id: 1,
      nombre: "Yape",
      descripcion: "Monedero digital del BCP",
      color: "#7CD957",
      icono: "💛"
    },
    {
      id: 2,
      nombre: "Plin",
      descripcion: "Monedero digital de Interbank",
      color: "#FF6B6B",
      icono: "💙"
    }
  ];

  // Handlers
  const handleMetodoPagoChange = (metodo) => {
    setMetodoPago(metodo);
    setMonederoSeleccionado('');
    setTokenEnviado(false);
    setDatosMonedero({
      numeroTelefono: '',
      token: ''
    });
  };

  const handleSeleccionarMonedero = (monederoNombre) => {
    setMonederoSeleccionado(monederoNombre);
    setTokenEnviado(false);
    setDatosMonedero({
      numeroTelefono: '',
      token: ''
    });
  };

  const handleDatosTarjetaChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numero' || name === 'cvv') {
      const soloNumeros = value.replace(/\D/g, '');
      if (name === 'numero' && soloNumeros.length <= 16) {
        setDatosTarjeta(prev => ({ ...prev, [name]: soloNumeros }));
      } else if (name === 'cvv' && soloNumeros.length <= 3) {
        setDatosTarjeta(prev => ({ ...prev, [name]: soloNumeros }));
      }
    } else if (name === 'vencimiento') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      setDatosTarjeta(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setDatosTarjeta(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDatosMonederoChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numeroTelefono') {
      const soloNumeros = value.replace(/\D/g, '');
      if (soloNumeros.length <= 9) {
        setDatosMonedero(prev => ({ ...prev, [name]: soloNumeros }));
      }
    } else if (name === 'token') {
      const soloNumeros = value.replace(/\D/g, '');
      if (soloNumeros.length <= 6) {
        setDatosMonedero(prev => ({ ...prev, [name]: soloNumeros }));
      }
    }
  };

  const enviarToken = () => {
    if (!datosMonedero.numeroTelefono || datosMonedero.numeroTelefono.length !== 9) {
      alert('Por favor ingresa un número de teléfono válido de 9 dígitos');
      return;
    }

    // Simular envío de token (en una app real, esto llamaría a una API)
    const tokenSimulado = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`Token enviado al ${datosMonedero.numeroTelefono}: ${tokenSimulado}`);
    setTokenEnviado(true);
    
    // En una app real, guardaríamos el token para validarlo después
    // setTokenCorrecto(tokenSimulado);
  };

  const handleConfirmarPago = (e) => {
    e.preventDefault();
    
    if (metodoPago === 'tarjeta') {
      if (!datosTarjeta.numero || !datosTarjeta.nombre || !datosTarjeta.vencimiento || !datosTarjeta.cvv) {
        alert('Por favor complete todos los datos de la tarjeta');
        return;
      }
      if (datosTarjeta.numero.length !== 16) {
        alert('El número de tarjeta debe tener 16 dígitos');
        return;
      }
      if (datosTarjeta.cvv.length !== 3) {
        alert('El CVV debe tener 3 dígitos');
        return;
      }
    } else if (metodoPago === 'monedero') {
      if (!monederoSeleccionado) {
        alert('Por favor selecciona un monedero digital');
        return;
      }
      if (!datosMonedero.numeroTelefono || datosMonedero.numeroTelefono.length !== 9) {
        alert('Por favor ingresa un número de teléfono válido');
        return;
      }
      if (!tokenEnviado) {
        alert('Por favor solicita y verifica el token primero');
        return;
      }
      if (!datosMonedero.token || datosMonedero.token.length !== 6) {
        alert('Por favor ingresa el token de 6 dígitos');
        return;
      }
    }

    // Simular procesamiento de pago
    let mensaje = '';
    if (metodoPago === 'tarjeta') {
      mensaje = '¡Pago procesado exitosamente con tarjeta de crédito!';
    } else if (metodoPago === 'monedero') {
      mensaje = `¡Pago procesado exitosamente con ${monederoSeleccionado}!`;
    }
    
    alert(mensaje);
    
    // Volver a la vista principal
    if (props.onVolver) {
      props.onVolver();
    }
  };

  const handleCancelar = () => {
    if (window.confirm('¿Está seguro de que desea cancelar el pago?')) {
      if (props.onVolver) {
        props.onVolver();
      }
    }
  };

  // Calcular cuotas para tarjeta
  const calcularCuota = () => {
    if (!viaje?.precio) return '0.00';
    const interes = 0.05; // 5% de interés
    const totalConInteres = viaje.precio * (1 + interes);
    return (totalConInteres / parseInt(datosTarjeta.cuotas)).toFixed(2);
  };

  return (
    <div className="gestionar-pago-container">
      {/* Header */}
      <header className="header-usuario">
        <div className="container">
          <div className="usuario-info">
            <h1>Tourest</h1>
            <div>
              <span style={{marginRight: '1rem'}}>
                Bienvenido, {user?.name || 'Usuario'}
              </span>
              <button onClick={handleCancelar} className="btn btn-secondary">
                Volver
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="gestionar-pago-content">
          
          {/* Información del Viaje */}
          {viaje && (
            <div className="resumen-viaje">
              <h2>Resumen de tu Viaje</h2>
              <div className="viaje-card-pago">
                <div className="viaje-imagen-pago">
                  <img src={viaje.imagen} alt={viaje.titulo} />
                </div>
                <div className="viaje-info-pago">
                  <h3>{viaje.titulo}</h3>
                  <p className="destino-pago">{viaje.destino}</p>
                  <p className="descripcion-pago">{viaje.descripcion}</p>
                  <div className="detalles-pago">
                    <span className="precio-pago">${viaje.precio?.toLocaleString()}</span>
                    <span className="duracion-pago">{viaje.duracion}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selección de Método de Pago */}
          <div className="metodo-pago-section">
            <div className="metodo-pago-header">
              <h1>Gestionar Pago</h1>
              <h2>Selecciona tu método de pago</h2>
            </div>

            {/* Opciones de Método de Pago */}
            <div className="opciones-metodo-pago">
              <div 
                className={`opcion-pago ${metodoPago === 'tarjeta' ? 'seleccionado' : ''}`}
                onClick={() => handleMetodoPagoChange('tarjeta')}
              >
                <div className="icono-pago">💳</div>
                <div className="info-pago">
                  <h3>Tarjeta de Crédito</h3>
                  <p>Paga con tu tarjeta de crédito</p>
                </div>
                <div className="radio-custom">
                  <div className={`radio-inner ${metodoPago === 'tarjeta' ? 'activo' : ''}`} />
                </div>
              </div>

              <div 
                className={`opcion-pago ${metodoPago === 'monedero' ? 'seleccionado' : ''}`}
                onClick={() => handleMetodoPagoChange('monedero')}
              >
                <div className="icono-pago">📱</div>
                <div className="info-pago">
                  <h3>Monedero Digital</h3>
                  <p>Paga con Yape o Plin</p>
                </div>
                <div className="radio-custom">
                  <div className={`radio-inner ${metodoPago === 'monedero' ? 'activo' : ''}`} />
                </div>
              </div>
            </div>

            {/* Formulario de Tarjeta */}
            {metodoPago === 'tarjeta' && (
              <div className="formulario-tarjeta">
                <h3>Información de la Tarjeta</h3>
                <form onSubmit={handleConfirmarPago}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Número de Tarjeta</label>
                      <input
                        type="text"
                        name="numero"
                        value={datosTarjeta.numero}
                        onChange={handleDatosTarjetaChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        name="nombre"
                        value={datosTarjeta.nombre}
                        onChange={handleDatosTarjetaChange}
                        placeholder="JUAN PEREZ"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha de Vencimiento</label>
                      <input
                        type="text"
                        name="vencimiento"
                        value={datosTarjeta.vencimiento}
                        onChange={handleDatosTarjetaChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={datosTarjeta.cvv}
                        onChange={handleDatosTarjetaChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cuotas</label>
                      <select
                        name="cuotas"
                        value={datosTarjeta.cuotas}
                        onChange={handleDatosTarjetaChange}
                      >
                        {[1, 3, 6, 9, 12].map(cuota => (
                          <option key={cuota} value={cuota}>
                            {cuota} {cuota === 1 ? 'cuota' : 'cuotas'} - ${calcularCuota()} c/u
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Selección de Monedero Digital */}
            {metodoPago === 'monedero' && (
              <div className="seleccion-monederos">
                <h3>Monederos Digitales</h3>
                <p className="subtitulo">Selecciona un monedero</p>
                
                <div className="monederos-lista">
                  {monederos.map(monedero => (
                    <div 
                      key={monedero.id}
                      className={`monedero-item ${monederoSeleccionado === monedero.nombre ? 'seleccionado' : ''}`}
                      onClick={() => handleSeleccionarMonedero(monedero.nombre)}
                      style={{ 
                        borderColor: monederoSeleccionado === monedero.nombre ? monedero.color : '#e9ecef',
                        backgroundColor: monederoSeleccionado === monedero.nombre ? `${monedero.color}15` : 'white'
                      }}
                    >
                      <div className="monedero-icono" style={{ color: monedero.color }}>
                        {monedero.icono}
                      </div>
                      <div className="monedero-info">
                        <h4>{monedero.nombre}</h4>
                        <p className="monedero-descripcion">{monedero.descripcion}</p>
                      </div>
                      <div className="monedero-seleccion">
                        <div className="radio-custom">
                          <div className={`radio-inner ${monederoSeleccionado === monedero.nombre ? 'activo' : ''}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulario para monedero digital */}
                {monederoSeleccionado && (
                  <div className="formulario-monederos">
                    <h4>Verificación con {monederoSeleccionado}</h4>
                    <div className="form-grid-monederos">
                      <div className="form-group">
                        <label>Número de Teléfono</label>
                        <div className="input-with-button">
                          <input
                            type="text"
                            name="numeroTelefono"
                            value={datosMonedero.numeroTelefono}
                            onChange={handleDatosMonederoChange}
                            placeholder="987654321"
                            maxLength="9"
                            required
                            disabled={tokenEnviado}
                          />
                          {!tokenEnviado && (
                            <button 
                              type="button" 
                              className="btn-enviar-token"
                              onClick={enviarToken}
                              disabled={!datosMonedero.numeroTelefono || datosMonedero.numeroTelefono.length !== 9}
                            >
                              Enviar Token
                            </button>
                          )}
                        </div>
                        <small>Ingresa tu número de 9 dígitos</small>
                      </div>

                      {tokenEnviado && (
                        <div className="form-group">
                          <label>Token de Verificación</label>
                          <input
                            type="text"
                            name="token"
                            value={datosMonedero.token}
                            onChange={handleDatosMonederoChange}
                            placeholder="123456"
                            maxLength="6"
                            required
                          />
                          <small>Ingresa el token de 6 dígitos enviado a tu teléfono</small>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Línea Divisoria */}
            <div className="linea-divisoria"></div>

            {/* Botones de acción */}
            <div className="acciones-pago">
              <button 
                className="btn-confirmar-pago"
                onClick={handleConfirmarPago}
                disabled={
                  (metodoPago === 'tarjeta' && 
                    (!datosTarjeta.numero || !datosTarjeta.nombre || !datosTarjeta.vencimiento || !datosTarjeta.cvv)) || 
                  (metodoPago === 'monedero' && 
                    (!monederoSeleccionado || !datosMonedero.numeroTelefono || 
                     !tokenEnviado || !datosMonedero.token))
                }
              >
                Confirmar Pago
              </button>
              <button 
                className="btn-cancelar-pago"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarPago;