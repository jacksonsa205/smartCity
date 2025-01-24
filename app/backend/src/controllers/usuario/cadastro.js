const { createUser } = require('../../models/usuario/cadastro');

// Controlador para criar um novo usuário
const registerUser = async (req, res) => {
  try {
    let {
      nome,
      email,
      cpf,
      dt_nascimento,
      cep,
      estado,
      cidade,
      senha,
    } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !cpf || !dt_nascimento || !cep || !estado || !cidade || !senha) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido!' });
    }

    // Validação de CPF (apenas números e 11 dígitos)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).json({ message: 'CPF inválido! Use apenas números com 11 dígitos.' });
    }

    // Validação de CEP
    const cepRegex = /^\d{5}-?\d{3}$/; // Aceita CEP no formato XXXXX-XXX ou XXXXXXXX
    if (!cepRegex.test(cep)) {
      return res.status(400).json({ message: 'CEP inválido! Use o formato XXXXX-XXX.' });
    }

    // Remove o hífen do CEP (caso exista)
    cep = cep.replace('-', '');

    // Verificar se senha atende aos critérios mínimos
    if (senha.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    // Inserir o usuário no banco
    const userData = {
      nome,
      email,
      cpf,
      dt_nascimento,
      cep, // CEP sem hífen
      estado,
      cidade,
      senha,
    };

    await createUser(userData);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao registrar usuário', error: error.message });
  }
};

module.exports = { registerUser };
