import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './components.css';

const IniciarSesion = ({ onClose, onSwitchToRegister }) => {
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const mostrarMensaje = (mensaje, tipo) => {
    setMensaje(mensaje);
    setTipoMensaje(tipo);
    setTimeout(() => {
      setMensaje('');
      setTipoMensaje('');
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!credenciales.email || !credenciales.password) {
      mostrarMensaje('Por favor, completa todos los campos', 'error');
      return;
    }

    setLoading(true);

    try {
      const result = await login(credenciales.email, credenciales.password);
      
      if (result.success) {
        const mensajeExito = result.role === 'admin' 
          ? `¡Bienvenido Administrador ${result.user.name}!` 
          : `¡Bienvenido ${result.user.name}!`;
        
        mostrarMensaje(mensajeExito, 'exito');
        
        // Cerrar el modal después de un breve tiempo para que el usuario vea el mensaje
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      } else {
        // Mostrar error específico si existe
        mostrarMensaje(result.error || 'Error al iniciar sesión. Verifica tus credenciales.', 'error');
      }
    } catch (error) {
      console.error('Error en login:', error);
      mostrarMensaje('Error al iniciar sesión. Inténtalo de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="componente">
      <h2>Iniciar Sesión</h2>
      
      {mensaje && (
        <div className={`mensaje ${tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error'}`}>
          {mensaje}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="formulario">
        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            value={credenciales.email}
            onChange={(e) => setCredenciales({...credenciales, email: e.target.value})}
            placeholder="tu@email.com"
            required
            disabled={loading}
          />
        </div>
        
        <div className="campo">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={credenciales.password}
            onChange={(e) => setCredenciales({...credenciales, password: e.target.value})}
            placeholder="Tu contraseña"
            required
            disabled={loading}
          />
        </div>
        
        <div className="botones-formulario">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
        
        <div className="enlaces">
          <a href="#olvide" onClick={(e) => { e.preventDefault(); }}>
            ¿Olvidaste tu contraseña?
          </a>
          <a href="#registro" onClick={onSwitchToRegister}>
            ¿No tienes cuenta? Regístrate
          </a>
        </div>

        {/* Información para testing */}
        <div className="info-testing">
          <small>
            <strong>Credenciales de prueba:</strong><br />
            Admin: admin@tourest.com / Admin123!<br />
            Usuario: maria.garcia@email.com / Password123!
          </small>
        </div>
      </form>
    </div>
  );
};

export default IniciarSesion;