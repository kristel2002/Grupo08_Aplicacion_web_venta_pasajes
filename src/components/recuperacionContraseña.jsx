import { useState } from 'react';
import './components.css';

const RecuperacionContraseña = () => {
  const [email, setEmail] = useState('');

  const handleRecuperar = (e) => {
    e.preventDefault();
    console.log('Solicitando recuperación para:', email);
    // Lógica de recuperación
  };

  return (
    <div className="componente">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleRecuperar} className="formulario">
        <div className="campo">
          <label>Email de recuperación:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email registrado"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Enviar Enlace de Recuperación
        </button>
        
        <div className="enlaces">
          <a href="#login">Volver al inicio de sesión</a>
        </div>
      </form>
    </div>
  );
};

export default RecuperacionContraseña;