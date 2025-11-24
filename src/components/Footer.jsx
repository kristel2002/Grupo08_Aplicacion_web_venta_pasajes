import React from 'react';
import './components.css';

const Footer = ({ onNavLinkClick }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, section) => {
    e.preventDefault();
    if (onNavLinkClick) {
      onNavLinkClick(e, section);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Tourest</h3>
              <p>Tu agencia de viajes de confianza. Descubre el mundo con nosotros y crea recuerdos inolvidables.</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Inicio</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Sobre Nosotros</a></li>
              <li><a href="#tours" onClick={(e) => handleLinkClick(e, 'tours')}>Tours</a></li>
              <li><a href="#destinations" onClick={(e) => handleLinkClick(e, 'destinations')}>Destinos</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Servicios</h4>
            <ul className="footer-links">
              <li><a href="#">Tours Personalizados</a></li>
              <li><a href="#">Viajes en Grupo</a></li>
              <li><a href="#">Luna de Miel</a></li>
              <li><a href="#">Aventura y Deporte</a></li>
              <li><a href="#">Viajes de Negocios</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Calle del Viaje, Ciudad Aventura, CA 12345</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@tourest.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Lun - Vie: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Suscríbete para recibir ofertas exclusivas y novedades de viajes.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Tourest. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;