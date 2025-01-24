import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    navigate('/dashboard'); // Redireciona para a página de dashboard
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="d-flex align-items-center justify-content-center flex-grow-1">
        <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                id="username"
                type="text"
                placeholder="Digite seu Email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua Senha"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
