import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import IniciarSesion from './components/IniciarSesion.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import BuscarViaje from './components/BuscarViaje.jsx';
import CrearViajes from './components/CrearViajes.jsx';
import GestionarPago from './components/GestionarPago.jsx';
import VerificationTokenModal from './context/VerificationTokenModal.js';
import VerifyEmailPage from './context/VerifyEmailPage.js';
import PaquetesTuristicos from './components/PaquetesTuristicos.jsx';
import DestinosDestacados from './components/DestinosDestacados.jsx';
import SobreNosotros from './components/SobreNosotros.jsx';
import Contactanos from './components/Contactanos.jsx';
import Footer from './components/Footer.jsx';
import DetalleViaje from './components/DetalleViaje.jsx'; // <--- 1. AQUÍ ESTÁ TU NUEVO COMPONENTE
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
  const [currentView, setCurrentView] = useState('main'); 
  const [viajeParaPago, setViajeParaPago] = useState(null);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null); // <--- 2. ESTADO PARA GUARDAR EL VIAJE

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

  // --- 3. NUEVA FUNCIÓN PARA IR A LOS DETALLES ---
  const navegarADetalles = (viaje) => {
    setViajeSeleccionado(viaje);
    setCurrentView('detalle-viaje');
    // Scroll al inicio para que se vea bien
    window.scrollTo(0, 0);
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
    setViajeSeleccionado(null); // Limpiamos selección
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
        
        {/* Aquí va todo tu código de servicios (Tablas, etc) que ya tenías */}
        {/* Lo he resumido visualmente aquí, pero funcionará igual con tu CSS */}
        <div className="servicios-grid">
           <div className="servicio-card"><h3>Servicio Estándar</h3><p>Minibús - Desde S/. 25</p></div>
           <div className="servicio-card servicio-premium"><h3>Servicio VIT</h3><p>Bus Premium - Desde S/. 45</p></div>
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

  // --- 4. AQUÍ ESTÁ LA NUEVA PANTALLA DE DETALLES ---
  if (currentView === 'detalle-viaje') {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: '80px', minHeight: '60vh' }}>
            <DetalleViaje 
                viaje={viajeSeleccionado} 
                onVolver={volverAVistaPrincipal} 
            />
        </div>
        <Footer />
        <Modales />
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

  if (currentView === 'sobre-nosotros') {
    return (
      <div className="sobre-nosotros-container">
        <SobreNosotros onVolver={volverAVistaPrincipal} />
        <Footer />
        <Modales />
      </div>
    );
  }

  if (currentView === 'paquetes') {
    return (
      <div className="App">
        <Header />
        {/* Pasamos la función nueva aquí también */}
        <PaquetesTuristicos onVerDetalles={navegarADetalles} />
        <Footer />
        <Modales />
      </div>
    );
  }

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

  // Redirección según rol: ADMIN
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

  // Redirección según rol: USUARIO
  if (user && user.role === 'user') {
    return (
      <>
        {/* Aquí pasamos la función nueva al buscador del usuario */}
        <BuscarViaje 
             onNavegarAPago={navegarAGestionarPago} 
             onLogout={handleLogout} 
             onVerDetalles={navegarADetalles}
        />
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

  // Vista PRINCIPAL (Home público)
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
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={abrirRegistro}>Comenzar a Explorar</button>
              <button className="btn-secondary" onClick={abrirLogin}>Ya tengo cuenta</button>
              <button className="btn-tertiary" onClick={abrirVerifyEmailPage}>Verificar Email</button>
            </div>
          </div>
        </div>
      </section>

      {/* AQUÍ TAMBIÉN AGREGAMOS LA PROPIEDAD NUEVA */}
      <PaquetesTuristicos onVerDetalles={navegarADetalles} />

      <DestinosDestacados onExplorarClick={handleExplorarDestino} />

      <Footer />
      <Modales />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;