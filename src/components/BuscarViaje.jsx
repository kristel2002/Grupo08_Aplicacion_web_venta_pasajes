import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './components.css';

const BuscarViaje = (props) => {
  const { user } = useAuth();
  
  // 1. Estados para filtros y ordenamiento
  const [filtros, setFiltros] = useState({
    destino: '',
    fechaInicio: '',
    fechaFin: '',
    precioMin: '',
    precioMax: '',
    tipoViaje: '', // NUEVO: Filtro por tipo
    ordenarPor: 'relevancia' // NUEVO: Ordenamiento
  });
  
  const [calendarioActivo, setCalendarioActivo] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(true);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  // Datos simulados (Ahora incluyen "tipo")
  const resultadosViajes = [
    {
      id: 1,
      titulo: "Tour Completo Chan Chan",
      destino: "Trujillo, La Libertad",
      descripcion: "Explora la ciudad de adobe más grande de América precolombina",
      fechas: ["14/3/2024"],
      precio: 95,
      duracion: "1 día",
      tipo: "Cultural", // TIPO
      incluye: ["Guía", "Transporte"],
      imagen: "/images/chan-chan.jpg",
      destacado: true,
      badge: "popular"
    },
    {
      id: 2,
      titulo: "Trekking Laguna Conococha",
      destino: "Sierra Liberteña",
      descripcion: "Caminata extrema por los andes liberteños.",
      fechas: ["15/3/2024"],
      precio: 150,
      duracion: "1 día",
      tipo: "Aventura", // TIPO
      incluye: ["Guía", "Equipo"],
      imagen: "/images/senora-cao.jpg", 
      destacado: false,
      badge: "new"
    },
    {
      id: 3,
      titulo: "Huaca del Sol y la Luna",
      destino: "Trujillo, La Libertad",
      descripcion: "Maravíllate con los templos Moche mejor conservados",
      fechas: ["20/3/2024"],
      precio: 55,
      duracion: "Medio día",
      tipo: "Arqueológico", // TIPO
      incluye: ["Guía", "Entradas"],
      imagen: "/images/huaca-sol-luna.jpg",
      destacado: false,
      badge: null
    },
    {
      id: 4,
      titulo: "Playa Chicama Surf",
      destino: "Puerto Malabrigo",
      descripcion: "Clases de surf en la ola izquierda más larga del mundo.",
      fechas: ["25/3/2024"],
      precio: 45,
      duracion: "Medio día",
      tipo: "Aventura", // TIPO
      incluye: ["Instructor", "Tabla"],
      imagen: "/images/huaca-arco-iris.jpg",
      destacado: false,
      badge: null
    },
    {
      id: 5,
      titulo: "Paquete Completo Arqueológico",
      destino: "Trujillo y Chicama",
      descripcion: "Tour completo por los 4 principales sitios arqueológicos",
      fechas: ["18/3/2024"],
      precio: 310,
      duracion: "2 días",
      tipo: "Cultural", // TIPO
      incluye: ["Todo incluido"],
      imagen: "/images/paquete-completo.jpg",
      destacado: false,
      badge: "discount"
    },
    {
      id: 6,
      titulo: "Relax en Pacasmayo",
      destino: "Pacasmayo",
      descripcion: "Fin de semana de playa y gastronomía.",
      fechas: ["16/3/2024"],
      precio: 240,
      duracion: "2 días",
      tipo: "Relax", // TIPO
      incluye: ["Hospedaje", "Cena"],
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

  const tiposViaje = ['Cultural', 'Aventura', 'Arqueológico', 'Relax'];

  // Manejadores
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

  // Función principal de filtrado y ordenamiento
  const aplicarFiltros = (e) => {
    if(e) e.preventDefault();
    
    let resultado = resultadosViajes.filter(viaje => {
      // Filtro Texto
      const coincideDestino = !filtros.destino || 
        viaje.destino.toLowerCase().includes(filtros.destino.toLowerCase()) ||
        viaje.titulo.toLowerCase().includes(filtros.destino.toLowerCase());
      
      // Filtro Precio
      const precioMin = parseFloat(filtros.precioMin) || 0;
      const coincidePrecioMin = !filtros.precioMin || viaje.precio >= precioMin;
      const precioMax = parseFloat(filtros.precioMax) || Infinity;
      const coincidePrecioMax = !filtros.precioMax || viaje.precio <= precioMax;
      
      // Filtro Duración
      const coincideDuracion = !filtros.duracion || viaje.duracion === filtros.duracion;

      // NUEVO: Filtro Tipo
      const coincideTipo = !filtros.tipoViaje || viaje.tipo === filtros.tipoViaje;

      return coincideDestino && coincidePrecioMin && coincidePrecioMax && coincideDuracion && coincideTipo;
    });

    // NUEVO: Lógica de Ordenamiento
    if (filtros.ordenarPor === 'precioAsc') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (filtros.ordenarPor === 'precioDesc') {
      resultado.sort((a, b) => b.precio - a.precio);
    } else if (filtros.ordenarPor === 'relevancia') {
      resultado.sort((a, b) => (b.destacado === true) - (a.destacado === true));
    }

    setResultadosFiltrados(resultado);
    setFiltrosAplicados({ ...filtros });
    setMostrarResultados(true);
  };

  const limpiarFiltros = () => {
    setFiltros({
      destino: '', fechaInicio: '', fechaFin: '', precioMin: '', precioMax: '', duracion: '', tipoViaje: '', ordenarPor: 'relevancia'
    });
    setFiltrosAplicados(null);
    setResultadosFiltrados(resultadosViajes);
    setMostrarResultados(true);
  };

  // Cargar datos iniciales
  useEffect(() => {
    setResultadosFiltrados(resultadosViajes);
  }, []);

  // --- Funciones auxiliares (Calendario, Modales) simplificadas para brevedad ---
  const handleReservar = (viaje) => { setViajeSeleccionado(viaje); setMostrarModalConfirmacion(true); };
  const handleConfirmarReserva = () => { setMostrarModalConfirmacion(false); setMostrarModalExito(true); };
  const handleCancelarReserva = () => { setMostrarModalConfirmacion(false); setViajeSeleccionado(null); };
  const handleAceptarExito = () => { setMostrarModalExito(false); if (props.onNavegarAPago) props.onNavegarAPago(viajeSeleccionado); setViajeSeleccionado(null); };

  // Componente Modal de Confirmación
  const ModalConfirmacion = () => (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirmar Reserva</h3>
        <p>¿Deseas reservar <strong>{viajeSeleccionado?.titulo}</strong>?</p>
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
        <h3>¡Reserva Confirmada!</h3>
        <p>Tu reserva ha sido procesada.</p>
        <div className="modal-actions">
          <button className="btn-modal btn-aceptar" onClick={handleAceptarExito}>Pagar Ahora</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="componente">
      <section className="hero-busqueda">
        <div className="container">
          <div className="hero-content">
            <h1>Encuentra tu próxima aventura</h1>
            <p>Promociones exclusivas en el norte del Perú</p>
          </div>
        </div>
      </section>

      {/* BARRA DE FILTROS COMPLETA (TRAV-49) */}
      <section className="filtros-section">
        <div className="container">
          <form onSubmit={aplicarFiltros} className="formulario-filtros">
            
            {/* Fila 1: Filtros principales */}
            <div className="filtros-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              
              <div className="filtro-grupo">
                <label>Destino:</label>
                <input type="text" name="destino" value={filtros.destino} onChange={handleFiltroChange} placeholder="¿A dónde quieres ir?" style={{width: '100%', padding: '8px'}} />
              </div>

              <div className="filtro-grupo">
                <label>Precio (S/.):</label>
                <div style={{display:'flex', gap:'5px'}}>
                  <input type="number" name="precioMin" value={filtros.precioMin} onChange={handlePrecioChange} placeholder="Mín" style={{width: '100%', padding: '8px'}} />
                  <input type="number" name="precioMax" value={filtros.precioMax} onChange={handlePrecioChange} placeholder="Máx" style={{width: '100%', padding: '8px'}} />
                </div>
              </div>

              {/* NUEVO: Tipo de Viaje */}
              <div className="filtro-grupo">
                <label>Tipo de Viaje:</label>
                <select name="tipoViaje" value={filtros.tipoViaje} onChange={handleFiltroChange} style={{width: '100%', padding: '8px'}}>
                  <option value="">Todos</option>
                  {tiposViaje.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* NUEVO: Ordenar Por */}
              <div className="filtro-grupo">
                <label>Ordenar por:</label>
                <select name="ordenarPor" value={filtros.ordenarPor} onChange={handleFiltroChange} style={{width: '100%', padding: '8px'}}>
                  <option value="relevancia">Relevancia</option>
                  <option value="precioAsc">Precio: Menor a Mayor</option>
                  <option value="precioDesc">Precio: Mayor a Menor</option>
                </select>
              </div>

            </div>

            <div className="botones-accion" style={{display: 'flex', gap: '10px'}}>
              <button type="submit" className="btn-aplicar" style={{flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px'}}>🔍 Buscar</button>
              <button type="button" onClick={limpiarFiltros} className="btn-limpiar" style={{flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px'}}>Limpiar</button>
            </div>
          </form>
        </div>
      </section>

      {/* Resultados */}
      <section className="resultados-section" style={{padding: '40px 0'}}>
        <div className="container">
          <h3>Resultados encontrados: {resultadosFiltrados.length}</h3>
          
          <div className="viajes-grid-compact" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px'}}>
            {resultadosFiltrados.map(viaje => (
              <div key={viaje.id} className="viaje-card" style={{border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                <div style={{position: 'relative'}}>
                  <img src={viaje.imagen} alt={viaje.titulo} style={{width: '100%', height: '200px', objectFit: 'cover'}} 
                       onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Viaje'; }} />
                  <span style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ffc107', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8em', fontWeight: 'bold'}}>
                    {viaje.tipo}
                  </span>
                  {viaje.badge && <span style={{position: 'absolute', top: '10px', left: '10px', backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8em', fontWeight: 'bold'}}>{viaje.badge}</span>}
                </div>
                
                <div className="viaje-info" style={{padding: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                    <h3 style={{margin: '0 0 10px 0', fontSize: '1.2em', color: '#333'}}>{viaje.titulo}</h3>
                  </div>
                  
                  <p style={{color: '#666', fontSize: '0.9em', height: '40px', overflow: 'hidden'}}>{viaje.descripcion}</p>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
                    <span style={{fontSize: '1.4em', fontWeight: 'bold', color: '#007bff'}}>S/. {viaje.precio}</span>
                    <span style={{fontSize: '0.9em', color: '#888'}}>⏱️ {viaje.duracion}</span>
                  </div>

                  <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                    <button onClick={() => props.onVerDetalles(viaje)} style={{flex: 1, padding: '8px', border: '1px solid #ccc', backgroundColor: '#f8f9fa', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold'}}>👁️ Ver</button>
                    <button onClick={() => handleReservar(viaje)} style={{flex: 1, padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold'}}>Reservar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {resultadosFiltrados.length === 0 && (
            <div style={{textAlign: 'center', marginTop: '40px', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
              <p style={{color: '#666', fontSize: '1.2em'}}>No se encontraron viajes con esos criterios.</p>
              <button onClick={limpiarFiltros} style={{marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Ver todos</button>
            </div>
          )}
        </div>
      </section>

      {mostrarModalConfirmacion && <ModalConfirmacion />}
      {mostrarModalExito && <ModalExito />}
    </div>
  );
};

export default BuscarViaje;