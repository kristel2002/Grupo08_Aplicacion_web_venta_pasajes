import React from 'react';
import './components.css';

const DestinosDestacados = ({ onExplorarClick }) => {
  // Datos de destinos destacados
  const destinos = [
    {
      id: 1,
      nombre: "Chan Chan",
      subtitulo: "Capital Chimú",
      descripcion: "La ciudad de adobe más grande de América precolombina, declarada Patrimonio de la Humanidad por la UNESCO. Descubre la impresionante arquitectura y organización de esta antigua civilización.",
      imagen: "https://images.unsplash.com/photo-1580503151099-7d1d6b6431c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "45K",
      ubicacionNumero: "20 km²",
      reporteActual: "Excelente",
      cultura: "Chimú",
      periodo: "900-1470 d.C."
    },
    {
      id: 2,
      nombre: "Huaca del Sol y la Luna",
      subtitulo: "Centro Ceremonial Moche",
      descripcion: "Complejo arqueológico que representa el centro político y religioso de la cultura Moche. Maravíllate con los increíbles murales y la estructura piramidal.",
      imagen: "https://images.unsplash.com/photo-1570212851236-94a5d2045b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "65K",
      ubicacionNumero: "500 m²",
      reporteActual: "Óptimo",
      cultura: "Moche",
      periodo: "100-800 d.C."
    },
    {
      id: 3,
      nombre: "El Brujo",
      subtitulo: "Complejo Arqueológico",
      descripcion: "Conjunto de tres huacas donde se descubrió a la Señora de Cao, importante gobernante moche. Un sitio fascinante que revela el poder femenino en el antiguo Perú.",
      imagen: "https://images.unsplash.com/photo-1578321272177-56f3e83aecd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "35K",
      ubicacionNumero: "2 km²",
      reporteActual: "Bueno",
      cultura: "Moche",
      periodo: "100-800 d.C."
    },
    {
      id: 4,
      nombre: "Huaca Rajada",
      subtitulo: "Tumbas Reales",
      descripcion: "Conocido por el descubrimiento del Señor de Sipán, uno de los hallazgos más importantes del Perú. Explora las tumbas reales y sus tesoros intactos.",
      imagen: "https://images.unsplash.com/photo-1578321272348-0b691c56aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "55K",
      ubicacionNumero: "1.5 km²",
      reporteActual: "Excelente",
      cultura: "Moche",
      periodo: "100-800 d.C."
    },
    {
      id: 5,
      nombre: "Kuntur Wasi",
      subtitulo: "Templo del Cóndor",
      descripcion: "Centro ceremonial de la cultura Cupisnique, conocido por sus impresionantes esculturas en piedra y ofrendas de oro.",
      imagen: "https://images.unsplash.com/photo-1578321272183-0b5e4b5e5b5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "25K",
      ubicacionNumero: "1 km²",
      reporteActual: "Muy Bueno",
      cultura: "Cupisnique",
      periodo: "1200-500 a.C."
    },
    {
      id: 6,
      nombre: "Ventanillas de Otuzco",
      subtitulo: "Necrópolis Cajamarquina",
      descripcion: "Impresionante necrópolis preínca con nichos funerarios tallados en roca volcánica, testimonio único de las prácticas funerarias ancestrales.",
      imagen: "https://images.unsplash.com/photo-1578321272190-0b5e4b5e5b5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      visitantes: "30K",
      ubicacionNumero: "0.5 km²",
      reporteActual: "Bueno",
      cultura: "Cajamarca",
      periodo: "200-800 d.C."
    }
  ];

  const handleExplorarClick = (nombreDestino) => {
    if (onExplorarClick) {
      onExplorarClick(nombreDestino);
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado.toLowerCase()) {
      case 'excelente': return '#27ae60';
      case 'óptimo': return '#2ecc71';
      case 'muy bueno': return '#f39c12';
      case 'bueno': return '#e67e22';
      default: return '#95a5a6';
    }
  };

  return (
    <section className="destinos-destacados-section" id="destinations">
      <div className="container">
        <div className="destinos-header">
          <h2 className="section-title">Sitios Arqueológicos Destacados</h2>
          <p className="section-subtitle">
            Descubre los tesoros culturales del antiguo Perú
          </p>
          <div className="section-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-icon">⚱️</div>
            <div className="decoration-line"></div>
          </div>
        </div>
        
        <div className="destinos-grid">
          {destinos.map(destino => (
            <div key={destino.id} className="destino-card">
              <div className="destino-imagen">
                <img 
                  src={destino.imagen} 
                  alt={destino.nombre}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0jOTk5IHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPiR7ZGVzdGluby5ub21icmV9PC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
                <div className="destino-overlay"></div>
                <div className="destino-badge">
                  <span className="badge-cultura">{destino.cultura}</span>
                  <span className="badge-periodo">{destino.periodo}</span>
                </div>
              </div>
              
              <div className="destino-contenido">
                <div className="destino-header">
                  <h3 className="destino-nombre">{destino.nombre}</h3>
                  <div 
                    className="destino-estado"
                    style={{ backgroundColor: getEstadoColor(destino.reporteActual) }}
                  >
                    {destino.reporteActual}
                  </div>
                </div>
                
                <p className="destino-subtitulo">{destino.subtitulo}</p>
                <p className="destino-descripcion">{destino.descripcion}</p>
                
                <div className="destino-estadisticas">
                  <div className="estadistica">
                    <span className="estadistica-icon">👥</span>
                    <div className="estadistica-info">
                      <span className="numero">{destino.visitantes}</span>
                      <span className="etiqueta">Visitantes/año</span>
                    </div>
                  </div>
                  <div className="estadistica">
                    <span className="estadistica-icon">📏</span>
                    <div className="estadistica-info">
                      <span className="numero">{destino.ubicacionNumero}</span>
                      <span className="etiqueta">Extensión</span>
                    </div>
                  </div>
                  <div className="estadistica">
                    <span className="estadistica-icon">⭐</span>
                    <div className="estadistica-info">
                      <span className="numero">4.8</span>
                      <span className="etiqueta">Rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="destino-actions">
                  <button 
                    className="btn-destino btn-explorar"
                    onClick={() => handleExplorarClick(destino.nombre)}
                  >
                    <span className="btn-icon">🔍</span>
                    Explorar Sitio
                  </button>
                  <button className="btn-destino btn-info">
                    <span className="btn-icon">ℹ️</span>
                    Más Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="destinos-cta">
          <h3>¿Listo para explorar estos tesoros ancestrales?</h3>
          <p>Únete a nuestros tours guiados y vive una experiencia única</p>
          <button className="btn-cta">Ver Todos los Destinos</button>
        </div>
      </div>
    </section>
  );
};

export default DestinosDestacados;