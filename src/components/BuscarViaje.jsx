import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './components.css';

const BuscarViaje = (props) => {
  const { user, logout } = useAuth();
  
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
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);

  // Datos de ejemplo
  const [resultadosViajes] = useState([
    {
      id: 1,
      titulo: "Four Cultural por Asia",
      destino: "Kuala Lumpur, Malaysia",
      descripcion: "Descubre el rico patrimonio cultural del sudeste asiático",
      fechas: ["14/3/2024", "9/4/2024", "19/3/2024"],
      incluye: ["Hotel", "Guías", "Transporte", "Desayunos"],
      precio: 1250,
      duracion: "7 días",
      imagen: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      titulo: "Aventura en Tailandia",
      destino: "Bangkok, Tailandia",
      descripcion: "Explora templos antiguos y playas tropicales",
      fechas: ["15/3/2024", "22/3/2024", "5/4/2024"],
      incluye: ["Hotel", "Guías", "Transporte", "Algunas comidas"],
      precio: 950.50,
      duracion: "10 días",
      imagen: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      titulo: "Cultural en Japón",
      destino: "Tokio, Japón",
      descripcion: "Sumérgete en la tradición y modernidad japonesa",
      fechas: ["20/3/2024", "27/3/2024", "10/4/2024"],
      incluye: ["Hotel", "Guías", "Transporte", "Desayunos"],
      precio: 1500.75,
      duracion: "12 días",
      imagen: "https://images.unsplash.com/photo-1540959733332-abcbf014cb5e?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      titulo: "Playas de Maldivas",
      destino: "Malé, Maldivas",
      descripcion: "Disfruta de aguas cristalinas y arenas blancas",
      fechas: ["25/3/2024", "12/4/2024", "28/4/2024"],
      incluye: ["Resort", "Todas las comidas", "Actividades acuáticas"],
      precio: 2200,
      duracion: "8 días",
      imagen: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=250&fit=crop"
    }
  ]);

  // Opciones para la lista desplegable de duración
  const opcionesDuracion = [
    { value: '', label: 'Cualquier duración' },
    { value: '7', label: '7 días' },
    { value: '10', label: '10 días' },
    { value: '14', label: '14 días' },
    { value: '15+', label: '15+ días' }
  ];

  // Handlers de formularios
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrecioChange = (e) => {
    const { name, value } = e.target;
    const decimalRegex = /^\d*\.?\d*$/;
    if (value === '' || decimalRegex.test(value)) {
      setFiltros(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    console.log('Aplicando filtros:', filtros);
    
    setFiltrosAplicados({ ...filtros });
    setMostrarResultados(true);
  };

  const limpiarFiltros = () => {
    setFiltros({
      destino: '',
      fechaInicio: '',
      fechaFin: '',
      precioMin: '',
      precioMax: '',
      duracion: ''
    });
    setFiltrosAplicados(null);
    setMostrarResultados(false);
  };

  // Funciones de fecha
  const formatearFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const seleccionarFecha = (fecha) => {
    const fechaFormateada = formatearFecha(fecha);
    
    if (calendarioActivo === 'inicio') {
      setFiltros(prev => ({ ...prev, fechaInicio: fechaFormateada }));
    } else if (calendarioActivo === 'fin') {
      setFiltros(prev => ({ ...prev, fechaFin: fechaFormateada }));
    }
    
    setCalendarioActivo(null);
  };

  const abrirCalendario = (tipo) => {
    setCalendarioActivo(tipo);
  };

  const cerrarCalendario = () => {
    setCalendarioActivo(null);
  };

  const seleccionarHoy = () => {
    seleccionarFecha(new Date());
  };

  // Funciones auxiliares
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
    // Usar la prop para navegar a GestionarPago
    if (props.onNavegarAPago) {
      props.onNavegarAPago(viajeSeleccionado);
    }
    setViajeSeleccionado(null);
  };

  // Componente Calendario
  const Calendario = () => {
    const [fechaVisualizacion, setFechaVisualizacion] = useState(new Date());
    
    const mesActual = fechaVisualizacion.getMonth();
    const añoActual = fechaVisualizacion.getFullYear();

    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const diasSemana = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

    const generarDiasDelMes = () => {
      const primerDia = new Date(añoActual, mesActual, 1);
      const ultimoDia = new Date(añoActual, mesActual + 1, 0);
      const dias = [];

      const diaInicioSemana = primerDia.getDay();
      const ultimoDiaMesAnterior = new Date(añoActual, mesActual, 0).getDate();
      
      for (let i = diaInicioSemana - 1; i >= 0; i--) {
        const diaNumero = ultimoDiaMesAnterior - i;
        dias.push({
          numero: diaNumero,
          esDelMesActual: false,
          fecha: new Date(añoActual, mesActual - 1, diaNumero)
        });
      }

      for (let i = 1; i <= ultimoDia.getDate(); i++) {
        dias.push({
          numero: i,
          esDelMesActual: true,
          fecha: new Date(añoActual, mesActual, i)
        });
      }

      const diasFaltantes = 42 - dias.length;
      for (let i = 1; i <= diasFaltantes; i++) {
        dias.push({
          numero: i,
          esDelMesActual: false,
          fecha: new Date(añoActual, mesActual + 1, i)
        });
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

    const handleSeleccionarDia = (diaInfo) => {
      seleccionarFecha(diaInfo.fecha);
    };

    const esHoy = (fecha) => {
      const hoy = new Date();
      return fecha.getDate() === hoy.getDate() && 
             fecha.getMonth() === hoy.getMonth() && 
             fecha.getFullYear() === hoy.getFullYear();
    };

    const dias = generarDiasDelMes();

    return (
      <div className="calendario-overlay" onClick={cerrarCalendario}>
        <div className="calendario-container" onClick={(e) => e.stopPropagation()}>
          <div className="calendario-header">
            <div className="controles-superiores">
              <button 
                className="btn-navegacion" 
                onClick={() => cambiarAño(-1)}
                aria-label="Año anterior"
                type="button"
              >
                ««
              </button>
              <button 
                className="btn-navegacion" 
                onClick={() => cambiarMes(-1)}
                aria-label="Mes anterior"
                type="button"
              >
                ‹
              </button>
            </div>
            
            <span className="mes-actual">
              {meses[mesActual]} {añoActual}
            </span>
            
            <div className="controles-superiores">
              <button 
                className="btn-navegacion" 
                onClick={() => cambiarMes(1)}
                aria-label="Mes siguiente"
                type="button"
              >
                ›
              </button>
              <button 
                className="btn-navegacion" 
                onClick={() => cambiarAño(1)}
                aria-label="Año siguiente"
                type="button"
              >
                »»
              </button>
            </div>
          </div>

          <div className="calendario-dias-semana">
            {diasSemana.map(dia => (
              <div key={dia} className="dia-semana">
                {dia}
              </div>
            ))}
          </div>

          <div className="calendario-dias">
            {dias.map((diaInfo, index) => (
              <div
                key={index}
                className={`dia-calendario ${
                  diaInfo.esDelMesActual ? 'dia-actual' : 'dia-otro-mes'
                } ${esHoy(diaInfo.fecha) ? 'hoy' : ''}`}
                onClick={() => handleSeleccionarDia(diaInfo)}
              >
                {diaInfo.numero}
              </div>
            ))}
          </div>

          <div className="calendario-acciones">
            <button className="btn-hoy" onClick={seleccionarHoy} type="button">
              Hoy
            </button>
            <button className="btn-cerrar" onClick={cerrarCalendario} type="button">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente IconoCalendario
  const IconoCalendario = ({ onClick }) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className="icono-calendario"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  // Componente Modal de Confirmación
  const ModalConfirmacion = () => (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>¿Estás seguro de reservar?</h3>
          <button 
            className="btn-cerrar-modal"
            onClick={handleCancelarReserva}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="resumen-viaje">
            <h4>{viajeSeleccionado?.titulo}</h4>
            <p><strong>Destino:</strong> {viajeSeleccionado?.destino}</p>
            <p><strong>Precio:</strong> ${viajeSeleccionado?.precio?.toLocaleString()}</p>
            <p><strong>Duración:</strong> {viajeSeleccionado?.duracion}</p>
          </div>
          
          <div className="modal-message">
            <p>Esta acción confirmará tu reserva. ¿Deseas continuar?</p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn-modal btn-cancelar"
            onClick={handleCancelarReserva}
          >
            Atrás
          </button>
          <button 
            className="btn-modal btn-confirmar"
            onClick={handleConfirmarReserva}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  // Componente Modal de Éxito
  const ModalExito = () => (
    <div className="modal-overlay">
      <div className="modal-container modal-exito">
        <div className="modal-header">
          <h3>¡Reserva Confirmada!</h3>
        </div>
        
        <div className="modal-body">
          <div className="icono-exito">✓</div>
          <p>Tu reserva para <strong>{viajeSeleccionado?.titulo}</strong> ha sido confirmada exitosamente.</p>
          
          <div className="detalles-reserva">
            <p><strong>Destino:</strong> {viajeSeleccionado?.destino}</p>
            <p><strong>Precio:</strong> ${viajeSeleccionado?.precio?.toLocaleString()}</p>
            <p><strong>Duración:</strong> {viajeSeleccionado?.duracion}</p>
          </div>
          
          <p className="mensaje-confirmacion">
            Ahora serás redirigido a la página de pago para completar tu reserva.
          </p>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn-modal btn-aceptar"
            onClick={handleAceptarExito}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="componente">
      {/* Header con información del usuario */}
      <header className="header-usuario">
        <div className="container">
          <div className="usuario-info">
            <h1>Tourest</h1>
            <div>
              <span style={{marginRight: '1rem'}}>
                Bienvenido, {user?.name || 'Juan Pérez'}
              </span>
              <button onClick={props.onLogout || logout} className="btn btn-secondary">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-busqueda">
        <div className="container">
          <div className="hero-content">
            <h1>Encuentra tu viaje perfecto</h1>
            <p>Explora destinos increíbles y planifica tu próxima aventura</p>
          </div>
        </div>
      </section>

      {/* Filtros de Búsqueda */}
      <section className="filtros-section">
        <div className="container">
          <h3>Filtrar Viajes</h3>
          
          <form onSubmit={aplicarFiltros}>
            <table className="tabla-filtros">
              <thead>
                <tr>
                  <th>Destino</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Precio Mínimo ($)</th>
                  <th>Precio Máximo ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="destino"
                      value={filtros.destino}
                      onChange={handleFiltroChange}
                      placeholder="Ej: Maldivas, Tailandia..."
                    />
                  </td>
                  
                  <td>
                    <div className="input-fecha-container">
                      <input
                        type="text"
                        name="fechaInicio"
                        value={filtros.fechaInicio}
                        onChange={handleFiltroChange}
                        placeholder="dd/mm/aaaa"
                        readOnly
                      />
                      <IconoCalendario onClick={() => abrirCalendario('inicio')} />
                    </div>
                  </td>
                  
                  <td>
                    <div className="input-fecha-container">
                      <input
                        type="text"
                        name="fechaFin"
                        value={filtros.fechaFin}
                        onChange={handleFiltroChange}
                        placeholder="dd/mm/aaaa"
                        readOnly
                      />
                      <IconoCalendario onClick={() => abrirCalendario('fin')} />
                    </div>
                  </td>
                  
                  <td>
                    <input
                      type="text"
                      name="precioMin"
                      value={filtros.precioMin}
                      onChange={handlePrecioChange}
                      placeholder="0.00"
                      inputMode="decimal"
                    />
                  </td>
                  
                  <td>
                    <input
                      type="text"
                      name="precioMax"
                      value={filtros.precioMax}
                      onChange={handlePrecioChange}
                      placeholder="5000.00"
                      inputMode="decimal"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {calendarioActivo && <Calendario />}

            <div className="seccion-duracion">
              <h4>Duración (días)</h4>
              <div className="select-duracion-container">
                <select
                  name="duracion"
                  value={filtros.duracion}
                  onChange={handleFiltroChange}
                  className="select-duracion"
                >
                  {opcionesDuracion.map(opcion => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="linea-divisoria"></div>

            <div className="contenedor-botones">
              <button type="submit" className="btn-aplicar">
                Aplicar Filtros
              </button>
              <button 
                type="button" 
                className="btn-limpiar"
                onClick={limpiarFiltros}
              >
                Limpiar Filtros
              </button>
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
                <button 
                  className="btn-cerrar-tarjeta"
                  onClick={() => setFiltrosAplicados(null)}
                >
                  ×
                </button>
              </div>
              <div className="filtros-lista">
                {filtrosAplicados.destino && (
                  <div className="filtro-item">
                    <span className="filtro-label">Destino:</span>
                    <span className="filtro-valor">{filtrosAplicados.destino}</span>
                  </div>
                )}
                {filtrosAplicados.fechaInicio && (
                  <div className="filtro-item">
                    <span className="filtro-label">Fecha Inicio:</span>
                    <span className="filtro-valor">{filtrosAplicados.fechaInicio}</span>
                  </div>
                )}
                {filtrosAplicados.fechaFin && (
                  <div className="filtro-item">
                    <span className="filtro-label">Fecha Fin:</span>
                    <span className="filtro-valor">{filtrosAplicados.fechaFin}</span>
                  </div>
                )}
                {filtrosAplicados.precioMin && (
                  <div className="filtro-item">
                    <span className="filtro-label">Precio Mínimo:</span>
                    <span className="filtro-valor">${filtrosAplicados.precioMin}</span>
                  </div>
                )}
                {filtrosAplicados.precioMax && (
                  <div className="filtro-item">
                    <span className="filtro-label">Precio Máximo:</span>
                    <span className="filtro-valor">${filtrosAplicados.precioMax}</span>
                  </div>
                )}
                {filtrosAplicados.duracion && (
                  <div className="filtro-item">
                    <span className="filtro-label">Duración:</span>
                    <span className="filtro-valor">{obtenerLabelDuracion(filtrosAplicados.duracion)}</span>
                  </div>
                )}
                {!filtrosAplicados.destino && !filtrosAplicados.fechaInicio && 
                 !filtrosAplicados.fechaFin && !filtrosAplicados.precioMin && 
                 !filtrosAplicados.precioMax && !filtrosAplicados.duracion && (
                  <div className="filtro-item">
                    <span className="filtro-valor">Todos los filtros (sin restricciones)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Resultados */}
      {mostrarResultados && (
        <section className="resultados-section">
          <div className="container">
            <h3>Viajes Disponibles ({resultadosViajes.length})</h3>
            <div className="viajes-grid-compact">
              {resultadosViajes.map(viaje => (
                <div key={viaje.id} className="viaje-card-compact">
                  <div className="viaje-imagen-container">
                    <img 
                      src={viaje.imagen} 
                      alt={viaje.titulo}
                      className="viaje-imagen"
                    />
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
                    
                    <div className="incluye-compact">
                      <h5>Incluye:</h5>
                      <ul>
                        {viaje.incluye.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="viaje-info-compact">
                      <span className="precio-compact">${viaje.precio.toLocaleString()}</span>
                      <span className="duracion-compact">{viaje.duracion}</span>
                    </div>
                    
                    <button 
                      className="btn-reservar-compact"
                      onClick={() => handleReservar(viaje)}
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal de Confirmación */}
      {mostrarModalConfirmacion && <ModalConfirmacion />}

      {/* Modal de Éxito */}
      {mostrarModalExito && <ModalExito />}
    </div>
  );
};

export default BuscarViaje;