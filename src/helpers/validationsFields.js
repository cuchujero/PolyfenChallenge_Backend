const {body} = require('express-validator');

const usuarioFieldsValidator = [
  body('nombre', 'Campo nombre no puede ser vacio').not().isEmpty(),
  body('nombre', 'Campo nombre tiene una longitud incorrecta').isLength({min: 3},{max: 26}),
  body('apellido', 'Campo apellido no puede ser vacio').not().isEmpty(),
  body('apellido', 'Campo apellido tiene una longitud incorrecta').isLength({min: 3},{max: 26}),
  body('telefono', 'Campo telefono no puede ser vacio').not().isEmpty(),
  body('clave', 'Campo clave no puede ser vacio').not().isEmpty(),
  body('clave', 'Campo clave tiene una longitud incorrecta').isLength({min: 5},{max: 26}),
  body('ciudadFK', 'Campo profesionFK no puede ser vacio').not().isEmpty(),
  body('ciudadFK', 'Campo profesionFK tiene un tipo de dato invalido').isInt(),
  body('profesionFK', 'Campo profesionFK no puede ser vacio').not().isEmpty(),
  body('profesionFK', 'Campo profesionFK tiene un tipo de dato invalido').isInt(),
]

const IdValidator = [
  body('id', 'Campo id no puede ser vacio').not().isEmpty(),
  body('id', 'Campo id tiene un tipo de dato invalido').isInt()
]

module.exports = {
  IdValidator,
  usuarioFieldsValidator
}