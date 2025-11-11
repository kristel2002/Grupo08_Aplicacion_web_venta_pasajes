import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import IniciarSesion from './components/IniciarSesion';
import RegistroUsuario from './components/RegistroUsuario';
import BuscarViaje from './components/buscarViaje';
import CrearViajes from './components/crearViajes';
import './App.css';

// Componente que maneja el routing basado en autenticación
const AppContent = () => {
  const { user, loading } = useAuth();
  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Debug: verificar estado de autenticación
  console.log('AppContent - Auth state:', { user, loading });

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

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  // REDIRECCIÓN SEGÚN ROL - ESTO ES CLAVE
  console.log('Checking user role:', user?.role);
  
  // Si el usuario es admin, mostrar interfaz de administración
  if (user && user.role === 'admin') {
    console.log('Redirecting to admin interface');
    return <CrearViajes />;
  }

  // Si el usuario es normal, mostrar interfaz de búsqueda
  if (user && user.role === 'user') {
    console.log('Redirecting to user interface');
    return <BuscarViaje />;
  }

  // Si no hay usuario logueado, mostrar landing page
  console.log('No user logged in, showing landing page');
  return (
    <div className="App">
      {/* Header */}
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
              <button className="btn-login" onClick={abrirLogin}>
                Iniciar Sesión
              </button>
              <button className="btn-register" onClick={abrirRegistro}>
                Registrarse
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Explore Your Travel</h1>
            <h2>Trusted Travel Agency</h2>
            <p className="hero-quote">
              I travel not to go anywhere, but to go. I travel for travel's sake the great affair is to move.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={abrirRegistro}>
                Comenzar a Explorar
              </button>
              <button className="btn-secondary" onClick={abrirLogin}>
                Ya tengo cuenta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About Tourest</h2>
          <div className="about-content">
            <p>Your trusted travel partner for unforgettable experiences around the world. We specialize in creating personalized travel experiences that cater to your unique preferences and dreams.</p>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="tours" id="tours">
        <div className="container">
          <h2 className="section-title">Popular Tours</h2>
          <div className="tours-content">
            <p>Discover our most popular travel packages and adventures curated by our expert team.</p>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations" id="destinations">
        <div className="container">
          <h2 className="section-title">Destinations</h2>
          <div className="destinations-content">
            <p>Explore amazing destinations around the globe with our guided tours and travel packages.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <p>Get in touch with our travel experts to plan your next adventure.</p>
          </div>
        </div>
      </section>

      {/* Modal de Registro */}
      {showRegistro && (
        <div className="modal-overlay" onClick={cerrarRegistro}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarRegistro}>
              ×
            </button>
            <RegistroUsuario 
              onClose={cerrarRegistro} 
              onSwitchToLogin={irALogin} 
            />
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {showLogin && (
        <div className="modal-overlay" onClick={cerrarLogin}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarLogin}>
              ×
            </button>
            <IniciarSesion 
              onClose={cerrarLogin} 
              onSwitchToRegister={irARegistro} 
            />
          </div>
        </div>
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