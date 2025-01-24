const express = require('express');
const { registerUser } = require('../../controllers/usuario/cadastro');
const encryptPassword = require('../../middlewares/encryptPassword');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/cadastro', encryptPassword, registerUser);

module.exports = router;
