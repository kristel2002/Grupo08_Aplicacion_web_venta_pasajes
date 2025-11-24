import React from 'react';
import './components.css';

const SobreNosotros = ({ onVolver }) => {
  return (
    <div className="sobre-nosotros-container">
      <header className="sobre-nosotros-header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <h2>Tourest</h2>
            </div>
            <div className="header-actions">
              <button className="btn-volver" onClick={onVolver}>
                ← Volver al Inicio
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section className="sobre-nosotros-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Sobre Nosotros</h1>
            <p className="hero-subtitle">
              Descubre la pasión que nos impulsa a crear experiencias de viaje inolvidables
            </p>
          </div>
        </div>
      </section>

      <section className="nuestra-historia">
        <div className="container">
          <div className="historia-content">
            <div className="historia-texto">
              <h2>Nuestra Historia</h2>
              <div className="linea-divisoria"></div>
              <p>
                Fundada en 2010, Tourest nació de la pasión por conectar a las personas 
                con los destinos más fascinantes del mundo. Lo que comenzó como un pequeño 
                equipo de entusiastas de los viajes se ha convertido en una agencia de 
                confianza que ha ayudado a miles de viajeros a vivir experiencias únicas.
              </p>
              <p>
                Creemos que cada viaje es una oportunidad para crear recuerdos que durarán 
                toda la vida. Nuestra misión es hacer que el proceso de planificación sea 
                sencillo y emocionante, para que puedas concentrarte en lo que realmente 
                importa: disfrutar de tu aventura.
              </p>
            </div>
            <div className="historia-imagen">
              <img src="/images/equipo-tourest.jpg" alt="Equipo Tourest" />
            </div>
          </div>
        </div>
      </section>

      <section className="nuestros-valores">
        <div className="container">
          <h2>Nuestros Valores</h2>
          <div className="linea-divisoria"></div>
          <div className="valores-grid">
            <div className="valor-card">
              <div className="valor-icono">✈️</div>
              <h3>Pasión por los Viajes</h3>
              <p>
                Vivimos y respiramos viajes. Nuestra experiencia personal en más de 
                50 países nos permite ofrecer recomendaciones auténticas.
              </p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">🤝</div>
              <h3>Confianza y Transparencia</h3>
              <p>
                Creemos en relaciones honestas con nuestros clientes. No hay cargos 
                ocultos ni sorpresas desagradables.
              </p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">⭐</div>
              <h3>Calidad Garantizada</h3>
              <p>
                Trabajamos solo con los mejores proveedores y alojamientos para 
                asegurar que cada experiencia supere tus expectativas.
              </p>
            </div>
            <div className="valor-card">
              <div className="valor-icono">🌍</div>
              <h3>Turismo Responsable</h3>
              <p>
                Promovemos prácticas sostenibles y apoyamos a las comunidades locales 
                en cada destino que visitamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="estadisticas">
        <div className="container">
          <div className="estadisticas-grid">
            <div className="estadistica-item">
              <div className="numero">15,000+</div>
              <div className="label">Viajeros Felices</div>
            </div>
            <div className="estadistica-item">
              <div className="numero">50+</div>
              <div className="label">Destinos</div>
            </div>
            <div className="estadistica-item">
              <div className="numero">12</div>
              <div className="label">Años de Experiencia</div>
            </div>
            <div className="estadistica-item">
              <div className="numero">98%</div>
              <div className="label">Satisfacción del Cliente</div>
            </div>
          </div>
        </div>
      </section>

      <section className="equipo">
        <div className="container">
          <h2>Conoce Nuestro Equipo</h2>
          <div className="linea-divisoria"></div>
          <div className="equipo-grid">
            <div className="miembro-equipo">
              <div className="foto-miembro">
                <img src="/images/ceo.jpg" alt="CEO Tourest" />
              </div>
              <h3>María González</h3>
              <p className="cargo">CEO & Fundadora</p>
              <p className="descripcion">
                Con más de 15 años en la industria del turismo, María lidera 
                nuestra visión de hacer los viajes accesibles para todos.
              </p>
            </div>
            <div className="miembro-equipo">
              <div className="foto-miembro">
                <img src="/images/director-operaciones.jpg" alt="Director de Operaciones" />
              </div>
              <h3>Carlos Rodríguez</h3>
              <p className="cargo">Director de Operaciones</p>
              <p className="descripcion">
                Experto en logística de viajes, Carlos asegura que cada detalle 
                de tu experiencia sea perfecto.
              </p>
            </div>
            <div className="miembro-equipo">
              <div className="foto-miembro">
                <img src="/images/experta-destinos.jpg" alt="Experta en Destinos" />
              </div>
              <h3>Ana Martínez</h3>
              <p className="cargo">Experta en Destinos</p>
              <p className="descripcion">
                Ana ha visitado personalmente cada destino que ofrecemos y 
                comparte sus conocimientos para crear itinerarios únicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-sobre-nosotros">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para tu próxima aventura?</h2>
            <p>
              Únete a nuestra comunidad de viajeros y descubre por qué miles de 
              personas confían en nosotros para sus experiencias más memorables.
            </p>
            <button className="btn-cta" onClick={onVolver}>
              Explorar Destinos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;