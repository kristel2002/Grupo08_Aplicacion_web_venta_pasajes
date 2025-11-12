import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';  // ✅ se agrega la extensión .js
import '../components/components.css';  // ✅ se corrige la ruta al CSS

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const { verifyEmail, resendVerificationEmail, pendingEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      alert('Por favor ingresa el token de verificación');
      return;
    }

    setIsLoading(true);
    const result = await verifyEmail(token);
    setIsLoading(false);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) {
      alert('No hay email pendiente de verificación');
      return;
    }

    setIsLoading(true);
    const result = await resendVerificationEmail(pendingEmail);
    setIsLoading(false);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <h2>Verificar Email</h2>
        <p className="verify-instructions">
          Ingresa el token de verificación que recibiste por email para activar tu cuenta.
        </p>
        
        <form onSubmit={handleSubmit} className="verify-form">
          <div className="campo">
            <label>Token de verificación:</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Pega aquí el token que recibiste"
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Verificar Email'}
          </button>
        </form>
        
        <div className="resend-section">
          <p>¿No recibiste el token?</p>
          <button 
            onClick={handleResend} 
            className="btn btn-secondary"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Reenviar token'}
          </button>
        </div>

        <div className="verify-help">
          <h4>¿Cómo obtener el token?</h4>
          <ul>
            <li>Regístrate en la aplicación</li>
            <li>Recibirás un modal con el token de verificación</li>
            <li>Copia ese token y pégalo aquí</li>
            <li>O revisa la consola del navegador (F12)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;