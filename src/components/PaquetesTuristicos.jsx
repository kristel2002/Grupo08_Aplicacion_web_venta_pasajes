import React from 'react';
import './components.css';

// 1. CAMBIO IMPORTANTE: Ahora recibimos 'onVerDetalles' aquí
const PaquetesTuristicos = ({ onVerDetalles }) => {
  
  // Datos de los paquetes turísticos (Tours)
  const paquetes = [
    {
      id: 1,
      titulo: "Tour Completo Chan Chan",
      ubicacion: "Trujillo, La Libertad",
      precio: 120,
      imagen: "/images/chan-chan.jpg",
      duracion: "1 día",
      descripcion: "Explora la ciudad de adobe más grande de América precolombina",
      destacado: true,
      badge: "popular"
    },
    {
      id: 2,
      titulo: "Señora de Cao y Complejo El Brujo", 
      ubicacion: "Valle de Chicama, La Libertad",
      precio: 150,
      imagen: "/images/senora-cao.jpg",
      duracion: "1 día",
      descripcion: "Descubre la tumba de la poderosa gobernante Moche",
      destacado: false,
      badge: "new"
    },
    {
      id: 3,
      titulo: "Huaca del Sol y la Luna",
      ubicacion: "Trujillo, La Libertad",
      precio: 80,
      imagen: "/images/huaca-sol-luna.jpg",
      duracion: "Medio día",
      descripcion: "Maravíllate con los templos Moche mejor conservados",
      destacado: false,
      badge: null
    },
    {
      id: 4,
      titulo: "Huaca del Arco Iris",
      ubicacion: "Trujillo, La Libertad",
      precio: 60,
      imagen: "/images/huaca-arco-iris.jpg",
      duracion: "Medio día",
      descripcion: "Conoce el templo Chimú con impresionantes relieves",
      destacado: false,
      badge: null
    },
    {
      id: 5,
      titulo: "Paquete Completo Arqueológico",
      ubicacion: "Trujillo y Chicama",
      precio: 350,
      imagen: "/images/paquete-completo.jpg",
      duracion: "2 días",
      descripcion: "Tour completo por los 4 principales sitios arqueológicos",
      destacado: false,
      badge: "discount"
    },
    {
      id: 6,
      titulo: "Tour Cultural Moche-Chimú",
      ubicacion: "La Libertad",
      precio: 280,
      imagen: "/images/tour-cultural.jpg",
      duracion: "2 días",
      descripcion: "Inmersión total en las culturas preincaicas del norte",
      destacado: false,
      badge: null
    }
  ];

  const formatearPrecio = (precio) => {
    return `S/. ${precio}`;
  };

  const handleReservarClick = (paquete) => {
    console.log('Reservando paquete:', paquete);
    alert(`¡Excelente elección! Has seleccionado: ${paquete.titulo}`);
  };

  // Función para obtener el texto del badge según el tipo
  const getBadgeText = (badgeType) => {
    switch(badgeType) {
      case 'popular': return 'POPULAR';
      case 'new': return 'NUEVO';
      case 'discount': return 'OFERTA';
      default: return '';
    }
  };

  return (
    <div className="paquetes-turisticos-container">
      {/* Sección de Paquetes Turísticos */}
      <section className="paquetes-turisticos" id="tours">
        <div className="container">
          <div className="paquetes-header">
            <h2 className="section-title">Paquetes Turísticos Arqueológicos</h2>
            <p className="section-subtitle">
              Vive la experiencia de explorar los tesoros culturales del norte peruano
            </p>
          </div>
          
          <div className="paquetes-grid">
            {paquetes.map((paquete) => (
              <div 
                key={paquete.id} 
                className={`paquete-card ${paquete.destacado ? 'featured' : ''}`}
              >
                <div className="paquete-image">
                  <img 
                    src={paquete.imagen || "/placeholder-tour.jpg"} 
                    alt={paquete.titulo} 
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0jOTk5IHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPiR7cGFxdWV0ZS50aXR1bG99PC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                  <div className="paquete-overlay"></div>
                  <div className="paquete-badges">
                    {paquete.badge && (
                      <div className={`paquete-badge ${paquete.badge}`}>
                        {getBadgeText(paquete.badge)}
                      </div>
                    )}
                    <div className="paquete-badge">
                      {paquete.duracion}
                    </div>
                  </div>
                </div>
                
                <div className="paquete-content">
                  <div className="paquete-header">
                    <h3 className="paquete-title">{paquete.titulo}</h3>
                    <div className="paquete-location">
                      <i>📍</i>
                      {paquete.ubicacion}
                    </div>
                  </div>
                  
                  <p className="paquete-description">{paquete.descripcion}</p>
                  
                  <div className="paquete-features">
                    <li><i>✓</i> Guía especializado</li>
                    <li><i>✓</i> Transporte incluido</li>
                    <li><i>✓</i> Entradas incluidas</li>
                    <li><i>✓</i> Recogida en hotel</li>
                  </div>
                  
                  <div className="paquete-footer">
                    <div className="paquete-pricing">
                      <div className="paquete-price">
                        {formatearPrecio(paquete.precio)}
                      </div>
                      <div className="price-note">por persona</div>
                    </div>

                    {/* --- AQUÍ ESTÁN TUS BOTONES --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                      
                      {/* 2. CAMBIO IMPORTANTE: Botón Ver Detalles */}
                      <button 
                        className="btn-ver-detalles"
                        onClick={() => onVerDetalles(paquete)}
                        style={{
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          width: '100%'
                        }}
                      >
                        👁️ Ver Detalles
                      </button>

                      <button 
                        className="btn-reservar"
                        onClick={() => handleReservarClick(paquete)}
                        style={{ width: '100%' }}
                      >
                        <span>Reservar Ahora</span>
                        <i>→</i>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="paquetes-cta">
            <div className="cta-content">
              <h3>¿No encuentras lo que buscas?</h3>
              <p>Contáctanos para crear un paquete personalizado según tus preferencias</p>
              <button className="btn-ver-mas">
                <span>Ver Todos los Paquetes</span>
                <i>↓</i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaquetesTuristicos;