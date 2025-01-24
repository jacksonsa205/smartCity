require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { cadastro } = require('./src/routes/index.routes');

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuario', cadastro);

// Porta do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
