import React, { useState } from 'react';
import { consultarCep } from '../../services/viaCep';
import ModalAviso from '../../components/Modal/ModalAviso';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    dt_nascimento: '',
    cep: '',
    estado: '',
    cidade: '',
    senha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (name === 'cep') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    if (name === 'cep' && value.replace('-', '').length === 8) {
      try {
        const cepData = await consultarCep(value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          cep: formattedValue,
          estado: cepData.uf,
          cidade: cepData.localidade,
        }));
      } catch (error) {
        setModal({ isOpen: true, type: 'error', message: error.message });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      cep: formData.cep.replace('-', ''),
    };

    try {
      const response = await axios.post('/usuario/cadastro', formDataToSend);
      setModal({ isOpen: true, type: 'success', message: response.data.message });
      setFormData({
        nome: '',
        email: '',
        cpf: '',
        dt_nascimento: '',
        cep: '',
        estado: '',
        cidade: '',
        senha: '',
      });
    } catch (error) {
      setModal({ isOpen: true, type: 'error', message: error.response?.data.message || error.message });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <ModalAviso
        isOpen={modal.isOpen}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ isOpen: false, type: 'info', message: '' })}
      />
      <div className="d-flex align-items-center justify-content-center flex-grow-1">
        <form
          className="card p-4 shadow-lg"
          style={{ maxWidth: '500px', width: '100%' }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center mb-4">Cadastro de Usuário</h1>

          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">CPF</label>
            <input
              id="cpf"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="123.456.789-01"
              maxLength={14}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dt_nascimento" className="form-label">Data de Nascimento</label>
            <input
              id="dt_nascimento"
              type="date"
              name="dt_nascimento"
              value={formData.dt_nascimento}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cep" className="form-label">CEP</label>
            <input
              id="cep"
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              maxLength={9}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              id="estado"
              type="text"
              name="estado"
              value={formData.estado}
              readOnly
              className="form-control bg-light"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              id="cidade"
              type="text"
              name="cidade"
              value={formData.cidade}
              readOnly
              className="form-control bg-light"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <div className="input-group">
              <input
                id="senha"
                type={showPassword ? 'text' : 'password'}
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="form-control"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-outline-secondary"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Cadastro;
