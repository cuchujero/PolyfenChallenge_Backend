const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
//const {usuarioFieldsValidator, IdValidator} = require('../helpers/validationsFields');
const {generalValidation} = require('../middlewares/validationsMw');
const {requestAuthorization} = require('../middlewares/authorizationRequestMw');

router.get('/:id?', usuariosController.getUsuarios);
// router.post('/', requestAuthorization, usuarioFieldsValidator, generalValidation, usuariosController.createProfesional);

module.exports = router;