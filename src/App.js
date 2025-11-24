import React, { useState } from 'react'; 
import { AuthProvider, useAuth } from './context/AuthContext.js';
import IniciarSesion from './components/IniciarSesion.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import BuscarViaje from './components/BuscarViaje.jsx';
import CrearViajes from './components/CrearViajes.jsx';
import GestionarPago from './components/GestionarPago.jsx';
import VerificationTokenModal from './context/VerificationTokenModal.js';
import VerifyEmailPage from './context/VerifyEmailPage.js';
import PaquetesTuristicos from './components/PaquetesTuristicos.jsx'; // Componente unificado
import DestinosDestacados from './components/DestinosDestacados.jsx'; // Nuevo componente importado
import SobreNosotros from './components/SobreNosotros.jsx';
import Contactanos from './components/Contactanos.jsx';
import Footer from './components/Footer.jsx';
import './App.css';


// Componente que maneja el routing basado en autenticación
const AppContent = () => {
  const { 
    user, 
    loading, 
    showTokenModal, 
    verificationToken, 
    pendingEmail, 
    closeTokenModal, 
    verifyEmail,
    logout 
  } = useAuth();
  
  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showVerifyEmailPage, setShowVerifyEmailPage] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'gestionar-pago', 'sobre-nosotros', 'paquetes', 'contactanos', 'servicios'
  const [viajeParaPago, setViajeParaPago] = useState(null);

  const abrirRegistro = () => setShowRegistro(true);
  const cerrarRegistro = () => setShowRegistro(false);
  const abrirLogin = () => setShowLogin(true);
  const cerrarLogin = () => setShowLogin(false);

  const irARegistro = () => {
    setShowLogin(false);
    setShowRegistro(true);
  };

  const irALogin = () => {
    setShowRegistro(false);
    setShowLogin(true);
  };

  const abrirVerifyEmailPage = () => {
    setShowVerifyEmailPage(true);
    setShowRegistro(false);
    setShowLogin(false);
  };

  const cerrarVerifyEmailPage = () => {
    setShowVerifyEmailPage(false);
  };

  const handleVerifyToken = async (token) => {
    const result = await verifyEmail(token);
    if (result.success) {
      alert(result.message);
      closeTokenModal();
      setShowVerifyEmailPage(false);
    } else {
      alert(result.error);
    }
  };

  // Función para manejar clic en explorar destino
  const handleExplorarDestino = (nombreDestino) => {
    if (!user) {
      abrirRegistro();
      alert(`Para explorar ${nombreDestino}, por favor regístrate primero.`);
    } else {
      navegarAPaquetes();
      alert(`Explorando ${nombreDestino} - Redirigiendo a paquetes turísticos.`);
    }
  };

  // Función para navegar a GestionarPago
  const navegarAGestionarPago = (viaje) => {
    setViajeParaPago(viaje);
    setCurrentView('gestionar-pago');
  };

  // Función para navegar a Sobre Nosotros
  const navegarASobreNosotros = () => {
    setCurrentView('sobre-nosotros');
  };

  // Función para navegar a Paquetes Turísticos
  const navegarAPaquetes = () => {
    setCurrentView('paquetes');
  };

  // Función para navegar a Contáctanos
  const navegarAContactanos = () => {
    setCurrentView('contactanos');
  };

  // Función para navegar a Servicios
  const navegarAServicios = () => {
    setCurrentView('servicios');
  };

  // Función para volver a la vista principal
  const volverAVistaPrincipal = () => {
    setCurrentView('main');
    setViajeParaPago(null);
  };

  // Función para manejar clics en enlaces de navegación
  const handleNavLinkClick = (e, section) => {
    e.preventDefault();
    
    if (section === 'about') {
      navegarASobreNosotros();
    } else if (section === 'home') {
      volverAVistaPrincipal();
    } else if (section === 'paquetes') {
      navegarAPaquetes();
    } else if (section === 'destinations') {
      setCurrentView('main');
      // Scroll suave a la sección de destinos en la vista principal
      setTimeout(() => {
        const destinationsSection = document.getElementById('destinations');
        if (destinationsSection) {
          destinationsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (section === 'contact') {
      navegarAContactanos();
    } else if (section === 'services') {
      navegarAServicios();
    }
  };

  // Función para cerrar sesión que maneja todas las vistas
  const handleLogout = () => {
    logout();
    setCurrentView('main');
    setViajeParaPago(null);
    setShowRegistro(false);
    setShowLogin(false);
  };

  // Componente de Header reutilizable
  const Header = () => (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <h2>Tourest</h2>
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleNavLinkClick(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')}>About Us</a></li>
            <li><a href="#paquetes" onClick={(e) => handleNavLinkClick(e, 'paquetes')}>Paquetes</a></li>
            <li><a href="#destinations" onClick={(e) => handleNavLinkClick(e, 'destinations')}>Destinos</a></li>
            <li><a href="#services" onClick={(e) => handleNavLinkClick(e, 'services')}>Servicio</a></li>
            <li><a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contact Us</a></li>
          </ul>
          <div className="auth-buttons">
            {!user ? (
              <>
                <button className="btn-login" onClick={abrirLogin}>Iniciar Sesión</button>
                <button className="btn-register" onClick={abrirRegistro}>Registrarse</button>
              </>
            ) : (
              <button className="btn-login" onClick={handleLogout}>Cerrar Sesión</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );

  // Componente de Modales reutilizable
  const Modales = () => (
    <>
      {/* Modal de Registro */}
      {showRegistro && (
        <div className="modal-overlay" onClick={cerrarRegistro}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarRegistro}>×</button>
            <RegistroUsuario 
              onClose={cerrarRegistro} 
              onSwitchToLogin={irALogin}
              onShowVerifyEmail={abrirVerifyEmailPage}
            />
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {showLogin && (
        <div className="modal-overlay" onClick={cerrarLogin}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarLogin}>×</button>
            <IniciarSesion 
              onClose={cerrarLogin} 
              onSwitchToRegister={irARegistro}
              onShowVerifyEmail={abrirVerifyEmailPage}
            />
          </div>
        </div>
      )}

      {showTokenModal && (
        <VerificationTokenModal
          token={verificationToken}
          email={pendingEmail}
          onClose={closeTokenModal}
          onVerify={handleVerifyToken}
        />
      )}
    </>
  );

  // Componente para la página de Servicios
  const Servicios = () => (
    <div className="servicios-container">
      <div className="container">
        <button className="btn-back" onClick={volverAVistaPrincipal}>
          ← Volver al inicio
        </button>
        
        <div className="servicios-header">
          <h1>Nuestros Servicios</h1>
          <p>Ofrecemos diferentes tipos de transporte para adaptarnos a tus necesidades</p>
        </div>

        <div className="servicios-grid">
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
              <li>✓ Seguro de viaje incluido</li>
              <li>✓ Guía turístico profesional</li>
            </ul>
            <div className="servicio-price">
              Desde <span>S/. 25</span> por persona
            </div>
          </div>

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
              <li>✓ Asistente de viaje dedicado</li>
            </ul>
            <div className="servicio-price">
              Desde <span>S/. 45</span> por persona
            </div>
          </div>
        </div>

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
                  <td><strong>Comodidades</strong></td>
                  <td>Básicas</td>
                  <td>Premium (Wi-Fi, AC, etc.)</td>
                </tr>
                <tr>
                  <td><strong>Entretenimiento</strong></td>
                  <td>Música ambiental</td>
                  <td>✓ Pantallas individuales + Wi-Fi</td>
                </tr>
                <tr>
                  <td><strong>Servicio a bordo</strong></td>
                  <td>-</td>
                  <td>✓ Bebidas y snacks incluidos</td>
                </tr>
                <tr>
                  <td><strong>Precio aproximado</strong></td>
                  <td>S/. 25 - S/. 35</td>
                  <td>S/. 45 - S/. 60</td>
                </tr>
                <tr>
                  <td><strong>Ideal para</strong></td>
                  <td>Grupos pequeños, viajes cortos</td>
                  <td>Grupos grandes, viajes largos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Información adicional */}
        <div className="servicios-adicional">
          <h3>¿Necesitas ayuda para elegir?</h3>
          <p>
            Contáctanos y te asesoraremos para seleccionar el servicio que mejor se adapte a tus necesidades de viaje.
          </p>
          <div className="servicios-buttons">
            <button className="btn-asesor">
              📞 Contactar Asesor
            </button>
            <button className="btn-reservar-servicio">
              📋 Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  if (showVerifyEmailPage) {
    return (
      <div className="verify-email-wrapper">
        <button className="btn-back" onClick={cerrarVerifyEmailPage}>
          ← Volver al inicio
        </button>
        <VerifyEmailPage />
      </div>
    );
  }

  // Si estamos en la vista de GestionarPago y hay usuario
  if (currentView === 'gestionar-pago' && user) {
    return (
      <div className="gestionar-pago-container">
        <GestionarPago 
          viaje={viajeParaPago} 
          onVolver={volverAVistaPrincipal} 
        />
        <Footer />
        <Modales />
      </div>
    );
  }

  // Si estamos en la vista de Sobre Nosotros
  if (currentView === 'sobre-nosotros') {
    return (
      <div className="sobre-nosotros-container">
        <SobreNosotros onVolver={volverAVistaPrincipal} />
        <Footer />
        <Modales />
      </div>
    );
  }

  // Si estamos en la vista de Paquetes Turísticos
  if (currentView === 'paquetes') {
    return (
      <div className="App">
        <Header />
        <PaquetesTuristicos />
        <Footer />
        <Modales />
      </div>
    );
  }

  // Si estamos en la vista de Servicios
  if (currentView === 'servicios') {
    return (
      <div className="App">
        <Header />
        <Servicios />
        <Footer />
        <Modales />
      </div>
    );
  }

  // Si estamos en la vista de Contáctanos
  if (currentView === 'contactanos') {
    return (
      <div className="App">
        <Header />
        <Contactanos />
        <Footer />
        <Modales />
      </div>
    );
  }

  // Redirección según rol
  if (user && user.role === 'admin') {
    return (
      <>
        <CrearViajes onLogout={handleLogout} />
        <Footer />
        {showTokenModal && (
          <VerificationTokenModal
            token={verificationToken}
            email={pendingEmail}
            onClose={closeTokenModal}
            onVerify={handleVerifyToken}
          />
        )}
      </>
    );
  }

  if (user && user.role === 'user') {
    return (
      <>
        <BuscarViaje onNavegarAPago={navegarAGestionarPago} onLogout={handleLogout} />
        <Footer />
        {showTokenModal && (
          <VerificationTokenModal
            token={verificationToken}
            email={pendingEmail}
            onClose={closeTokenModal}
            onVerify={handleVerifyToken}
          />
        )}
      </>
    );
  }

  // Si no hay usuario logueado - Vista principal
  return (
    <div className="App">
      <Header />

      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Descubre el Norte Ancestral</h1>
            <h2>Agencia de Viajes Confiable</h2>
            <p className="hero-quote">
              Explora los tesoros arqueológicos de las culturas Moche y Chimú. 
              Viaja no solo para llegar, sino para descubrir la grandeza del antiguo Perú.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={abrirRegistro}>Comenzar a Explorar</button>
              <button className="btn-secondary" onClick={abrirLogin}>Ya tengo cuenta</button>
              <button className="btn-tertiary" onClick={abrirVerifyEmailPage}>Verificar Email</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Paquetes Turísticos (componente unificado) */}
      <PaquetesTuristicos />

      {/* Sección de Destinos Destacados (nuevo componente) */}
      <DestinosDestacados onExplorarClick={handleExplorarDestino} />

      {/* Footer */}
      <Footer />

      {/* Modales */}
      <Modales />
    </div>
  );
};

// Componente principal que envuelve todo con el AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;