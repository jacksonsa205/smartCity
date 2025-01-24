const mysql = require('mysql2');

// Logando configurações do MySQL para diagnóstico
console.log('Configurações de conexão com o MySQL:');
console.log({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
});

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT, // Inclua a porta
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // Aumente o tempo limite para 20 segundos
});

// Promisify para usar `async/await`
const db = pool.promise();

// Teste de conexão inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    console.error('Detalhes completos do erro:', err);
  } else {
    console.log('Conexão com MySQL bem-sucedida');
    connection.release(); // Libera a conexão
  }
});

module.exports = db;
