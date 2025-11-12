import { useState } from 'react';
import { useAuth } from '../context/AuthContext.js'; // ✅ Importamos el contexto
import '../components/components.css'; // ✅ Ruta corregida del CSS

const RegistroUsuario = ({ onClose, onShowVerifyEmail }) => {
  const { register } = useAuth(); // ✅ Extraemos register del AuthContext

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [usuariosRegistrados] = useState([
    { email: 'usuario1@ejemplo.com', telefono: '1234567890' },
    { email: 'usuario2@ejemplo.com', telefono: '0987654321' },
  ]);

  const validarTelefono = (telefono) => /^\d{8,10}$/.test(telefono);
  const validarPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const verificarUsuarioExistente = (email, telefono) => {
    const existePorEmail = usuariosRegistrados.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    const existePorTelefono =
      telefono && usuariosRegistrados.some((user) => user.telefono === telefono);

    if (existePorEmail) return 'Ya existe un usuario registrado con este email';
    if (existePorTelefono) return 'Ya existe un usuario registrado con este teléfono';
    return null;
  };

  const mostrarMensaje = (mensaje, tipo) => {
    setMensaje(mensaje);
    setTipoMensaje(tipo);
    setTimeout(() => {
      setMensaje('');
      setTipoMensaje('');
    }, 5000);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    if (onClose) onClose();
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');

    if (!usuario.nombre || !usuario.email || !usuario.password) {
      mostrarMensaje('Por favor, completa todos los campos obligatorios', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      mostrarMensaje('Por favor, ingresa un email válido', 'error');
      return;
    }

    if (usuario.telefono && !validarTelefono(usuario.telefono)) {
      mostrarMensaje('El teléfono debe contener solo números (8-10 dígitos)', 'error');
      return;
    }

    const usuarioExistente = verificarUsuarioExistente(usuario.email, usuario.telefono);
    if (usuarioExistente) {
      mostrarMensaje(usuarioExistente, 'error');
      return;
    }

    if (!validarPassword(usuario.password)) {
      mostrarMensaje(
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)',
        'error'
      );
      return;
    }

    if (usuario.password !== usuario.confirmPassword) {
      mostrarMensaje('Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      const result = await register(usuario); // ✅ Usa el método del AuthContext
      if (result.success) {
        mostrarMensaje(result.message, 'exito');
        setShowSuccessModal(true);

        if (result.requiresVerification && onShowVerifyEmail) {
          setTimeout(() => onShowVerifyEmail(), 3000);
        }
      } else {
        mostrarMensaje(result.error, 'error');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      if (error.response?.status === 409) {
        mostrarMensaje('El usuario ya está registrado', 'error');
      } else {
        mostrarMensaje('Error al registrar usuario. Inténtalo de nuevo.', 'error');
      }
    }
  };

  const handleTelefonoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    setUsuario({ ...usuario, telefono: valor });
  };

  return (
    <div className="componente">
      <h2>Registro de Usuario</h2>

      {mensaje && (
        <div className={`mensaje ${tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error'}`}>
          {mensaje}
        </div>
      )}

      <form onSubmit={handleRegistro} className="formulario">
        <div className="campo">
          <label>Nombre completo: *</label>
          <input
            type="text"
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div className="campo">
          <label>Email: *</label>
          <input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            value={usuario.telefono}
            onChange={handleTelefonoChange}
            placeholder="Solo números (8-10 dígitos)"
            maxLength="10"
          />
          <small className="texto-ayuda">Mínimo 8 dígitos, máximo 10 dígitos</small>
        </div>

        <div className="campo-doble">
          <div className="campo">
            <label>Contraseña: *</label>
            <input
              type="password"
              value={usuario.password}
              onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
              placeholder="Mínimo 8 caracteres con mayúsculas, minúsculas, números y símbolos"
              required
            />
            <small className="texto-ayuda">
              Debe incluir: mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)
            </small>
          </div>

          <div className="campo">
            <label>Confirmar contraseña: *</label>
            <input
              type="password"
              value={usuario.confirmPassword}
              onChange={(e) => setUsuario({ ...usuario, confirmPassword: e.target.value })}
              placeholder="Repite tu contraseña"
              required
            />
          </div>
        </div>

        <div className="campos-obligatorios">
          <small>* Campos obligatorios</small>
        </div>

        <div className="botones-formulario">
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>

        <div className="enlaces">
          <a href="#login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="modal-header">
              <h3>¡Registro Exitoso!</h3>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p>Tu cuenta ha sido creada exitosamente. Te hemos enviado un correo de verificación.</p>
              <p>Por favor, verifica tu email para activar tu cuenta.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleCloseSuccessModal}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroUsuario;