import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Fecha o popup após navegar
  };

  return (
    <header className="bg-primary text-white shadow d-flex justify-content-between align-items-center px-3 py-2">
      <h1 className="fs-4 fw-bold mb-0">SmartCity</h1>
      <div className="position-relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-primary p-2 d-flex align-items-center justify-content-center"
          aria-label="User Menu"
        >
          <FontAwesomeIcon icon={faUser} className="fs-4" />
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu show position-absolute end-0 mt-2 shadow border-0">
            <button
              onClick={() => handleNavigation("/login")}
              className="dropdown-item"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/cadastro")}
              className="dropdown-item"
            >
              Cadastrar
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
