import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './components.css';

const BuscarViaje = (props) => {
  const { user } = useAuth(); // Ya no necesitamos logout aquí porque está en App.js
  
  // Estados principales
  const [filtros, setFiltros] = useState({
    destino: '',
    fechaInicio: '',
    fechaFin: '',
    precioMin: '',
    precioMax: '',
    duracion: ''
  });
  
  const [calendarioActivo, setCalendarioActivo] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(true);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  // Datos de sitios turísticos
  const resultadosViajes = [
    {
      id: 1,
      titulo: "Tour Completo Chan Chan",
      destino: "Trujillo, La Libertad",
      descripcion: "Explora la ciudad de adobe más grande de América precolombina",
      fechas: ["14/3/2024", "9/4/2024", "19/3/2024"],
      incluye: ["Guía especializado", "Transporte", "Entradas", "Recorrido completo"],
      precio: 95,
      duracion: "1 día",
      imagen: "/images/chan-chan.jpg",
      destacado: true,
      badge: "popular"
    },
    {
      id: 2,
      titulo: "Señora de Cao y Complejo El Brujo",
      destino: "Valle de Chicama, La Libertad",
      descripcion: "Descubre la tumba de la poderosa gobernante Moche",
      fechas: ["15/3/2024", "22/3/2024", "5/4/2024"],
      incluye: ["Guía especializado", "Transporte", "Entradas", "Museo"],
      precio: 110,
      duracion: "1 día",
      imagen: "/images/senora-cao.jpg",
      destacado: false,
      badge: "new"
    },
    {
      id: 3,
      titulo: "Huaca del Sol y la Luna",
      destino: "Trujillo, La Libertad",
      descripcion: "Maravíllate con los templos Moche mejor conservados",
      fechas: ["20/3/2024", "27/3/2024", "10/4/2024"],
      incluye: ["Guía especializado", "Transporte", "Entradas"],
      precio: 55,
      duracion: "Medio día",
      imagen: "/images/huaca-sol-luna.jpg",
      destacado: false,
      badge: null
    },
    {
      id: 4,
      titulo: "Huaca del Arco Iris",
      destino: "Trujillo, La Libertad",
      descripcion: "Conoce el templo Chimú con impresionantes relieves",
      fechas: ["25/3/2024", "12/4/2024", "28/4/2024"],
      incluye: ["Guía especializado", "Transporte", "Entradas"],
      precio: 45,
      duracion: "Medio día",
      imagen: "/images/huaca-arco-iris.jpg",
      destacado: false,
      badge: null
    },
    {
      id: 5,
      titulo: "Paquete Completo Arqueológico",
      destino: "Trujillo y Chicama",
      descripcion: "Tour completo por los 4 principales sitios arqueológicos",
      fechas: ["18/3/2024", "25/3/2024", "8/4/2024"],
      incluye: ["Guía especializado", "Transporte", "Todas las entradas", "Almuerzo", "Hospedaje 1 noche"],
      precio: 310,
      duracion: "2 días",
      imagen: "/images/paquete-completo.jpg",
      destacado: false,
      badge: "discount"
    },
    {
      id: 6,
      titulo: "Tour Cultural Moche-Chimú",
      destino: "La Libertad",
      descripcion: "Inmersión total en las culturas preincaicas del norte",
      fechas: ["16/3/2024", "23/3/2024", "6/4/2024"],
      incluye: ["Guía especializado", "Transporte", "Entradas", "Almuerzos", "Hospedaje"],
      precio: 240,
      duracion: "2 días",
      imagen: "/images/tour-cultural.jpg",
      destacado: false,
      badge: null
    }
  ];

  const opcionesDuracion = [
    { value: '', label: 'Cualquier duración' },
    { value: 'Medio día', label: 'Medio día' },
    { value: '1 día', label: '1 día' },
    { value: '2 días', label: '2 días' }
  ];

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePrecioChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFiltros(prev => ({ ...prev, [name]: value }));
    }
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    const viajesFiltrados = resultadosViajes.filter(viaje => {
      const coincideDestino = !filtros.destino || 
        viaje.destino.toLowerCase().includes(filtros.destino.toLowerCase()) ||
        viaje.titulo.toLowerCase().includes(filtros.destino.toLowerCase());
      const precioMin = parseFloat(filtros.precioMin) || 0;
      const coincidePrecioMin = !filtros.precioMin || viaje.precio >= precioMin;
      const precioMax = parseFloat(filtros.precioMax) || Infinity;
      const coincidePrecioMax = !filtros.precioMax || viaje.precio <= precioMax;
      const coincideDuracion = !filtros.duracion || viaje.duracion === filtros.duracion;
      return coincideDestino && coincidePrecioMin && coincidePrecioMax && coincideDuracion;
    });
    setResultadosFiltrados(viajesFiltrados);
    setFiltrosAplicados({ ...filtros });
    setMostrarResultados(true);
  };

  const limpiarFiltros = () => {
    setFiltros({
      destino: '', fechaInicio: '', fechaFin: '', precioMin: '', precioMax: '', duracion: ''
    });
    setFiltrosAplicados(null);
    setResultadosFiltrados(resultadosViajes);
    setMostrarResultados(true);
  };

  React.useEffect(() => {
    setResultadosFiltrados(resultadosViajes);
  }, []);

  const formatearFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const seleccionarFecha = (fecha) => {
    const fechaFormateada = formatearFecha(fecha);
    if (calendarioActivo === 'inicio') setFiltros(prev => ({ ...prev, fechaInicio: fechaFormateada }));
    else if (calendarioActivo === 'fin') setFiltros(prev => ({ ...prev, fechaFin: fechaFormateada }));
    setCalendarioActivo(null);
  };

  const abrirCalendario = (tipo) => setCalendarioActivo(tipo);
  const cerrarCalendario = () => setCalendarioActivo(null);
  const seleccionarHoy = () => seleccionarFecha(new Date());

  const obtenerLabelDuracion = (valor) => {
    const opcion = opcionesDuracion.find(op => op.value === valor);
    return opcion ? opcion.label : 'No especificado';
  };

  const handleReservar = (viaje) => {
    setViajeSeleccionado(viaje);
    setMostrarModalConfirmacion(true);
  };

  const handleConfirmarReserva = () => {
    setMostrarModalConfirmacion(false);
    setMostrarModalExito(true);
  };

  const handleCancelarReserva = () => {
    setMostrarModalConfirmacion(false);
    setViajeSeleccionado(null);
  };

  const handleAceptarExito = () => {
    setMostrarModalExito(false);
    if (props.onNavegarAPago) props.onNavegarAPago(viajeSeleccionado);
    setViajeSeleccionado(null);
  };

  const Calendario = () => {
    const [fechaVisualizacion, setFechaVisualizacion] = useState(new Date());
    const mesActual = fechaVisualizacion.getMonth();
    const añoActual = fechaVisualizacion.getFullYear();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSemana = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

    const generarDiasDelMes = () => {
      const primerDia = new Date(añoActual, mesActual, 1);
      const ultimoDia = new Date(añoActual, mesActual + 1, 0);
      const dias = [];
      const diaInicioSemana = primerDia.getDay();
      const ultimoDiaMesAnterior = new Date(añoActual, mesActual, 0).getDate();
      
      for (let i = diaInicioSemana - 1; i >= 0; i--) {
        dias.push({ numero: ultimoDiaMesAnterior - i, esDelMesActual: false, fecha: new Date(añoActual, mesActual - 1, ultimoDiaMesAnterior - i) });
      }
      for (let i = 1; i <= ultimoDia.getDate(); i++) {
        dias.push({ numero: i, esDelMesActual: true, fecha: new Date(añoActual, mesActual, i) });
      }
      const diasFaltantes = 42 - dias.length;
      for (let i = 1; i <= diasFaltantes; i++) {
        dias.push({ numero: i, esDelMesActual: false, fecha: new Date(añoActual, mesActual + 1, i) });
      }
      return dias;
    };

    const cambiarMes = (direccion) => {
      setFechaVisualizacion(prev => {
        const nuevaFecha = new Date(prev);
        nuevaFecha.setMonth(prev.getMonth() + direccion);
        return nuevaFecha;
      });
    };

    const cambiarAño = (direccion) => {
      setFechaVisualizacion(prev => {
        const nuevaFecha = new Date(prev);
        nuevaFecha.setFullYear(prev.getFullYear() + direccion);
        return nuevaFecha;
      });
    };

    const handleSeleccionarDia = (diaInfo) => seleccionarFecha(diaInfo.fecha);
    const esHoy = (fecha) => {
      const hoy = new Date();
      return fecha.getDate() === hoy.getDate() && fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    };

    const dias = generarDiasDelMes();

    return (
      <div className="calendario-overlay" onClick={cerrarCalendario}>
        <div className="calendario-container" onClick={(e) => e.stopPropagation()}>
          <div className="calendario-header">
            <div className="controles-superiores">
              <button className="btn-navegacion" onClick={() => cambiarAño(-1)} type="button">««</button>
              <button className="btn-navegacion" onClick={() => cambiarMes(-1)} type="button">‹</button>
            </div>
            <span className="mes-actual">{meses[mesActual]} {añoActual}</span>
            <div className="controles-superiores">
              <button className="btn-navegacion" onClick={() => cambiarMes(1)} type="button">›</button>
              <button className="btn-navegacion" onClick={() => cambiarAño(1)} type="button">»»</button>
            </div>
          </div>
          <div className="calendario-dias-semana">
            {diasSemana.map(dia => <div key={dia} className="dia-semana">{dia}</div>)}
          </div>
          <div className="calendario-dias">
            {dias.map((diaInfo, index) => (
              <div key={index} className={`dia-calendario ${diaInfo.esDelMesActual ? 'dia-actual' : 'dia-otro-mes'} ${esHoy(diaInfo.fecha) ? 'hoy' : ''}`} onClick={() => handleSeleccionarDia(diaInfo)}>
                {diaInfo.numero}
              </div>
            ))}
          </div>
          <div className="calendario-acciones">
            <button className="btn-hoy" onClick={seleccionarHoy} type="button">Hoy</button>
            <button className="btn-cerrar" onClick={cerrarCalendario} type="button">Cerrar</button>
          </div>
        </div>
      </div>
    );
  };

  const IconoCalendario = ({ onClick }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icono-calendario" onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const ModalConfirmacion = () => (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>¿Estás seguro de reservar?</h3>
          <button className="btn-cerrar-modal" onClick={handleCancelarReserva}>×</button>
        </div>
        <div className="modal-body">
          <div className="resumen-viaje">
            <h4>{viajeSeleccionado?.titulo}</h4>
            <p><strong>Destino:</strong> {viajeSeleccionado?.destino}</p>
            <p><strong>Precio:</strong> ${viajeSeleccionado?.precio?.toLocaleString()}</p>
            <p><strong>Duración:</strong> {viajeSeleccionado?.duracion}</p>
          </div>
          <div className="modal-message"><p>Esta acción confirmará tu reserva. ¿Deseas continuar?</p></div>
        </div>
        <div className="modal-actions">
          <button className="btn-modal btn-cancelar" onClick={handleCancelarReserva}>Atras</button>
          <button className="btn-modal btn-confirmar" onClick={handleConfirmarReserva}>Aceptar</button>
        </div>
      </div>
    </div>
  );

  const ModalExito = () => (
    <div className="modal-overlay">
      <div className="modal-container modal-exito">
        <div className="modal-header"><h3>¡Reserva Confirmada!</h3></div>
        <div className="modal-body">
          <div className="icono-exito">✓</div>
          <p>Tu reserva para <strong>{viajeSeleccionado?.titulo}</strong> ha sido confirmada exitosamente.</p>
          <div className="detalles-reserva">
            <p><strong>Destino:</strong> {viajeSeleccionado?.destino}</p>
            <p><strong>Precio:</strong> ${viajeSeleccionado?.precio?.toLocaleString()}</p>
            <p><strong>Duración:</strong> {viajeSeleccionado?.duracion}</p>
          </div>
          <p className="mensaje-confirmacion">Ahora serás redirigido a la página de pago para completar tu reserva.</p>
        </div>
        <div className="modal-actions">
          <button className="btn-modal btn-aceptar" onClick={handleAceptarExito}>Aceptar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="componente">
      {/* SECCIÓN HERO (La mantenemos porque se ve bonita para el usuario logueado) */}
      <section className="hero-busqueda">
        <div className="container">
          <div className="hero-content">
            <h1>Descubre los Tesoros Arqueológicos de La Libertad</h1>
            <p>Explora las maravillosas culturas Moche y Chimú en el norte del Perú</p>
          </div>
        </div>
      </section>

      {/* Filtros de Búsqueda */}
      <section className="filtros-section">
        <div className="container">
          <h3>Filtrar Tours Arqueológicos</h3>
          
          <form onSubmit={aplicarFiltros}>
            <table className="tabla-filtros">
              <thead>
                <tr>
                  <th>Destino o Tour</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Precio Mínimo ($)</th>
                  <th>Precio Máximo ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" name="destino" value={filtros.destino} onChange={handleFiltroChange} placeholder="Ej: Chan Chan, Señora de Cao..." />
                  </td>
                  <td>
                    <div className="input-fecha-container">
                      <input type="text" name="fechaInicio" value={filtros.fechaInicio} onChange={handleFiltroChange} placeholder="dd/mm/aaaa" readOnly />
                      <IconoCalendario onClick={() => abrirCalendario('inicio')} />
                    </div>
                  </td>
                  <td>
                    <div className="input-fecha-container">
                      <input type="text" name="fechaFin" value={filtros.fechaFin} onChange={handleFiltroChange} placeholder="dd/mm/aaaa" readOnly />
                      <IconoCalendario onClick={() => abrirCalendario('fin')} />
                    </div>
                  </td>
                  <td>
                    <input type="text" name="precioMin" value={filtros.precioMin} onChange={handlePrecioChange} placeholder="45" inputMode="decimal" />
                  </td>
                  <td>
                    <input type="text" name="precioMax" value={filtros.precioMax} onChange={handlePrecioChange} placeholder="310" inputMode="decimal" />
                  </td>
                </tr>
              </tbody>
            </table>

            {calendarioActivo && <Calendario />}

            <div className="seccion-duracion">
              <h4>Duración</h4>
              <div className="select-duracion-container">
                <select name="duracion" value={filtros.duracion} onChange={handleFiltroChange} className="select-duracion">
                  {opcionesDuracion.map(opcion => (
                    <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="linea-divisoria"></div>

            <div className="contenedor-botones">
              <button type="submit" className="btn-aplicar">Aplicar Filtros</button>
              <button type="button" className="btn-limpiar" onClick={limpiarFiltros}>Limpiar Filtros</button>
            </div>
          </form>
        </div>
      </section>

      {/* Tarjeta de Filtros Aplicados */}
      {filtrosAplicados && (
        <section className="filtros-aplicados-section">
          <div className="container">
            <h3>Filtros Aplicados</h3>
            <div className="tarjeta-filtros">
              <div className="tarjeta-header">
                <h4>Configuración Actual de Búsqueda</h4>
                <button className="btn-cerrar-tarjeta" onClick={() => setFiltrosAplicados(null)}>×</button>
              </div>
              <div className="filtros-lista">
                {/* (Aquí irían tus filtros visuales, los dejo igual que antes) */}
                {filtrosAplicados.destino && <div className="filtro-item"><span className="filtro-label">Destino:</span><span className="filtro-valor">{filtrosAplicados.destino}</span></div>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Resultados */}
      {mostrarResultados && (
        <section className="resultados-section">
          <div className="container">
            <h3>Tours Disponibles ({resultadosFiltrados.length})</h3>
            <div className="viajes-grid-compact">
              {resultadosFiltrados.map(viaje => (
                <div key={viaje.id} className="viaje-card-compact">
                  <div className="viaje-imagen-container">
                    <img src={viaje.imagen} alt={viaje.titulo} className="viaje-imagen" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580502304784-8985b7eb50f5?w=400&h=250&fit=crop'; }} />
                    {viaje.badge && (
                      <span className={`badge ${viaje.badge}`}>
                        {viaje.badge === 'popular' && 'Popular'}
                        {viaje.badge === 'new' && 'Nuevo'}
                        {viaje.badge === 'discount' && 'Descuento'}
                      </span>
                    )}
                  </div>
                  
                  <div className="viaje-card-content">
                    <div className="viaje-card-header-compact">
                      <h4>{viaje.titulo}</h4>
                      <span className="destino-compact">{viaje.destino}</span>
                    </div>
                    
                    <p className="descripcion-compact">{viaje.descripcion}</p>
                    
                    <div className="fechas-disponibles-compact">
                      <h5>Fechas disponibles:</h5>
                      <div className="fechas-lista-compact">
                        {viaje.fechas.map((fecha, index) => (
                          <span key={index} className="fecha-item-compact">{fecha}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="viaje-info-compact">
                      <span className="precio-compact">${viaje.precio.toLocaleString()}</span>
                      <span className="duracion-compact">{viaje.duracion}</span>
                    </div>
                    
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                      {/* --- NUEVO BOTÓN: VER DETALLES --- */}
                      <button 
                        className="btn-ver-detalles"
                        style={{
                           marginRight: '10px',
                           backgroundColor: '#6c757d',
                           color: 'white',
                           border: 'none',
                           padding: '8px 15px',
                           borderRadius: '5px',
                           cursor: 'pointer'
                        }}
                        onClick={() => props.onVerDetalles(viaje)}
                      >
                        Ver Detalles
                      </button>

                      <button className="btn-reservar-compact" onClick={() => handleReservar(viaje)}>
                        Reservar Ahora
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {resultadosFiltrados.length === 0 && (
              <div className="no-resultados">
                <p>No se encontraron tours con los filtros aplicados.</p>
                <button onClick={limpiarFiltros} className="btn-limpiar">Mostrar todos los tours</button>
              </div>
            )}
          </div>
        </section>
      )}

      {mostrarModalConfirmacion && <ModalConfirmacion />}
      {mostrarModalExito && <ModalExito />}
    </div>
  );
};

export default BuscarViaje;