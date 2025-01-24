import axios from 'axios';

/**
 * Consulta o CEP usando a API do ViaCEP.
 * @param {string} cep - 
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
export const consultarCep = async (cep) => {
  const formattedCep = cep.replace(/\D/g, ''); 
  if (formattedCep.length !== 8) {
    throw new Error('CEP inválido! O CEP deve ter 8 dígitos.');
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
    if (response.data.erro) {
      throw new Error(' CEP não encontrado!');
    }
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao consultar o CEP: ${error.message}`);
  }
};
