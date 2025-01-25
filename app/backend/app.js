require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Import para lidar com caminhos
const { cadastro } = require('./src/routes/index.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir os arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Rotas de API
app.use('/usuario', cadastro);

// Rota para servir o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Porta do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
