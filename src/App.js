import React, { useState } from 'react'; 
import { AuthProvider, useAuth } from './context/AuthContext.js';
import IniciarSesion from './components/IniciarSesion.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import BuscarViaje from './components/BuscarViaje.jsx';
import CrearViajes from './components/CrearViajes.jsx';
import GestionarPago from './components/GestionarPago.jsx';
import VerificationTokenModal from './context/VerificationTokenModal.js';
import VerifyEmailPage from './context/VerifyEmailPage.js';
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
  const [currentView, setCurrentView] = useState('main'); // 'main', 'gestionar-pago'
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

  // Función para navegar a GestionarPago
  const navegarAGestionarPago = (viaje) => {
    setViajeParaPago(viaje);
    setCurrentView('gestionar-pago');
  };

  // Función para volver a la vista principal
  const volverAVistaPrincipal = () => {
    setCurrentView('main');
    setViajeParaPago(null);
  };

  // Función para cerrar sesión que maneja todas las vistas
  const handleLogout = () => {
    logout();
    setCurrentView('main');
    setViajeParaPago(null);
    setShowRegistro(false);
    setShowLogin(false);
  };

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
      <GestionarPago 
        viaje={viajeParaPago} 
        onVolver={volverAVistaPrincipal} 
      />
    );
  }

  // Redirección según rol
  if (user && user.role === 'admin') {
    return (
      <>
        <CrearViajes onLogout={handleLogout} />
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

  // Si no hay usuario logueado
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <h2>Tourest</h2>
            </div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#tours">Tours</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
            <div className="auth-buttons">
              <button className="btn-login" onClick={abrirLogin}>Iniciar Sesión</button>
              <button className="btn-register" onClick={abrirRegistro}>Registrarse</button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Explore Your Travel</h1>
            <h2>Trusted Travel Agency</h2>
            <p className="hero-quote">
              I travel not to go anywhere, but to go. I travel for travel's sake the great affair is to move.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={abrirRegistro}>Comenzar a Explorar</button>
              <button className="btn-secondary" onClick={abrirLogin}>Ya tengo cuenta</button>
              <button className="btn-tertiary" onClick={abrirVerifyEmailPage}>Verificar Email</button>
            </div>
          </div>
        </div>
      </section>

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