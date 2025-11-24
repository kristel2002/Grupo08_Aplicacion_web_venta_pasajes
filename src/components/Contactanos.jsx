import React, { useState } from 'react';
import './components.css';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <section className="contactanos-section" id="contactanos">
      <div className="container">
        <div className="contactanos-header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">
            Estamos aquí para ayudarte. ¡No dudes en ponerte en contacto con nosotros!
          </p>
        </div>

        <div className="contactanos-content">
          <div className="contactanos-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-details">
                <h3>Nuestra Oficina</h3>
                <p>123 Calle del Viaje</p>
                <p>Ciudad Aventura, CA 12345</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-details">
                <h3>Teléfono</h3>
                <p>+1 (555) 123-4567</p>
                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <p>info@tourest.com</p>
                <p>soporte@tourest.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-details">
                <h3>Horario de Atención</h3>
                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábados: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contactanos-form">
            <form onSubmit={handleSubmit} className="formulario-contacto">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto *</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="reserva">Consulta sobre Reservas</option>
                  <option value="informacion">Información de Tours</option>
                  <option value="grupos">Viajes en Grupo</option>
                  <option value="problema">Problema con mi Reserva</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                ></textarea>
              </div>

              <button type="submit" className="btn-enviar">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="contactanos-faq">
          <h3>Preguntas Frecuentes</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Cómo puedo hacer una reserva?</h4>
              <p>Puedes reservar directamente en nuestro sitio web o contactarnos por teléfono o email.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué métodos de pago aceptan?</h4>
              <p>Aceptamos tarjetas de crédito, transferencias bancarias y PayPal.</p>
            </div>
            <div className="faq-item">
              <h4>¿Ofrecen descuentos para grupos?</h4>
              <p>Sí, ofrecemos descuentos especiales para grupos de 10 personas o más.</p>
            </div>
            <div className="faq-item">
              <h4>¿Cuál es la política de cancelación?</h4>
              <p>Puedes cancelar hasta 48 horas antes del viaje para un reembolso completo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactanos;