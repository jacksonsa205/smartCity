const bcrypt = require('bcrypt');

// Middleware para criptografar a senha
const encryptPassword = async (req, res, next) => {
  try {
    const { senha } = req.body;

    // Verifica se a senha foi enviada
    if (!senha) {
      return res.status(400).json({ message: 'Senha é obrigatória!' });
    }

    // Obtém o número de salt rounds da variável de ambiente
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Substitui a senha no corpo da requisição pelo hash
    req.body.senha = hashedPassword;

    // Prossegue para o próximo middleware ou controlador
    next();
  } catch (error) {
    console.error('Erro ao criptografar a senha:', error);
    res.status(500).json({ message: 'Erro interno ao processar a senha' });
  }
};

module.exports = encryptPassword;
