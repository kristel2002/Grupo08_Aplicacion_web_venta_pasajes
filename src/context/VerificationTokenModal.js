// context/VerificationTokenModal.js
import React from 'react';
import '../components/components.css'; // ✅ Ruta corregida

const VerificationTokenModal = ({ token, email, onClose, onVerify }) => {
  const handleVerifyClick = () => {
    if (onVerify) {
      onVerify(token);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    alert('Token copiado al portapapeles');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content token-modal">
        <div className="modal-header">
          <h3>Verificación de Email (MODO PRUEBAS)</h3>
        </div>
        <div className="modal-body">
          <div className="token-info">
            <p><strong>Para:</strong> {email}</p>
            <p><strong>Token de verificación:</strong></p>
            <div
              className="token-display"
              onClick={copyToClipboard}
              title="Haz clic para copiar"
            >
              {token}
            </div>
            <p className="token-instructions">
              <strong>En un entorno real</strong>, este token llegaría por email.<br />
              Para probar, copia este token y úsalo en la página de verificación.
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleVerifyClick}>
            Verificar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationTokenModal;