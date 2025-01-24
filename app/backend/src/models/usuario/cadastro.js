const db = require('../../database/database');

// Função para criar um novo usuário
const createUser = async (userData) => {
  try {
    const query = `
      INSERT INTO usuarios (
        nome, email, cpf, dt_nascimento, estado, cidade, cep, senha, dois_fatores
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userData.nome,
      userData.email,
      userData.cpf,
      userData.dt_nascimento,
      userData.estado,
      userData.cidade,
      userData.cep,
      userData.senha, // Senha já criptografada pelo middleware
      userData.dois_fatores || false,
    ];

    // Executa a query no banco
    const [result] = await db.query(query, values);

    // Retorna o ID do usuário criado
    return result.insertId;
  } catch (error) {
    console.error('Erro ao inserir usuário no banco:', error);
    throw new Error('Erro ao criar usuário no banco de dados');
  }
};

module.exports = { createUser };
