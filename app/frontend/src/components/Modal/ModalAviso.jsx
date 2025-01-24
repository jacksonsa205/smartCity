import React from "react";

const ModalAviso = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  // Define as cores com base no tipo de aviso
  const bgColor = {
    success: "alert-success",
    error: "alert-danger",
    info: "alert-primary",
  }[type] || "alert-secondary"; // Padrão caso o tipo não seja especificado

  return (
    <div
      className={`alert ${bgColor} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x shadow-sm`}
      role="alert"
      style={{ width: "90%", maxWidth: "400px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ModalAviso;
