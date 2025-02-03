const express = require('express');
const { obtenerDiscos, agregarDisco } = require('../controllers/disco.controller');

const router = express.Router();

router.get('/discos', obtenerDiscos);

router.post('/discos', agregarDisco);

module.exports = router;
