import { useState } from 'react';
import './components.css';

const RegistroUsuario = ({ onClose }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });
  
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'exito' o 'error'
  
  // Simulamos una base de datos de usuarios registrados
  // En una aplicación real, esto vendría de tu backend
  const [usuariosRegistrados] = useState([
    { email: 'usuario1@ejemplo.com', telefono: '1234567890' },
    { email: 'usuario2@ejemplo.com', telefono: '0987654321' },
    // Agrega más usuarios de prueba si es necesario
  ]);

  // Validación de teléfono: solo números, 8-10 dígitos
  const validarTelefono = (telefono) => {
    const regexTelefono = /^\d{8,10}$/;
    return regexTelefono.test(telefono);
  };

  // Validación de contraseña: mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
  const validarPassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regexPassword.test(password);
  };

  // Verificar si el usuario ya está registrado
  const verificarUsuarioExistente = (email, telefono) => {
    // Verificar por email
    const existePorEmail = usuariosRegistrados.some(user => 
      user.email.toLowerCase() === email.toLowerCase()
    );
    
    // Verificar por teléfono (si se proporcionó)
    const existePorTelefono = telefono && usuariosRegistrados.some(user => 
      user.telefono === telefono
    );

    if (existePorEmail) {
      return 'Ya existe un usuario registrado con este email';
    }
    
    if (existePorTelefono) {
      return 'Ya existe un usuario registrado con este teléfono';
    }
    
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

  const handleRegistro = async (e) => {
    e.preventDefault();
    
    // Resetear mensaje
    setMensaje('');
    setTipoMensaje('');

    // Validaciones básicas
    if (!usuario.nombre || !usuario.email || !usuario.password) {
      mostrarMensaje('Por favor, completa todos los campos obligatorios', 'error');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
      mostrarMensaje('Por favor, ingresa un email válido', 'error');
      return;
    }

    // Validar teléfono si se proporcionó
    if (usuario.telefono && !validarTelefono(usuario.telefono)) {
      mostrarMensaje('El teléfono debe contener solo números (8-10 dígitos)', 'error');
      return;
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = verificarUsuarioExistente(usuario.email, usuario.telefono);
    if (usuarioExistente) {
      mostrarMensaje(usuarioExistente, 'error');
      return;
    }

    // Validar contraseña
    if (!validarPassword(usuario.password)) {
      mostrarMensaje('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)', 'error');
      return;
    }

    if (usuario.password !== usuario.confirmPassword) {
      mostrarMensaje('Las contraseñas no coinciden', 'error');
      return;
    }
    
    console.log('Registrando usuario:', usuario);
    
    try {
      // En una aplicación real, aquí harías la llamada a tu API
      // await authService.register(usuario);
      
      // Simulamos el registro exitoso
      mostrarMensaje('¡Usuario registrado exitosamente!', 'exito');
      
      // Agregar el nuevo usuario a la lista de registrados (simulación)
      // En una app real, esto lo manejaría el backend
      usuariosRegistrados.push({
        email: usuario.email,
        telefono: usuario.telefono
      });
      
      // Cerrar modal después de 2 segundos para que el usuario vea el mensaje
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error en el registro:', error);
      
      // Manejar diferentes tipos de error
      if (error.response && error.response.status === 409) {
        mostrarMensaje('El usuario ya está registrado', 'error');
      } else {
        mostrarMensaje('Error al registrar usuario. Inténtalo de nuevo.', 'error');
      }
    }
  };

  // Manejar cambio de teléfono para permitir solo números
  const handleTelefonoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
    setUsuario({...usuario, telefono: valor});
  };

  return (
    <div className="componente">
      <h2>Registro de Usuario</h2>
      
      {/* Mensaje de éxito/error */}
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
            onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}
            placeholder="Tu nombre completo"
            required
          />
        </div>
        
        <div className="campo">
          <label>Email: *</label>
          <input 
            type="email" 
            value={usuario.email}
            onChange={(e) => setUsuario({...usuario, email: e.target.value})}
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
              onChange={(e) => setUsuario({...usuario, password: e.target.value})}
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
              onChange={(e) => setUsuario({...usuario, confirmPassword: e.target.value})}
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
    </div>
  );
};

export default RegistroUsuario;