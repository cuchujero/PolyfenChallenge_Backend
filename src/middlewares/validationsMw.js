const {validationResult} = require('express-validator');
    
function generalValidation(req, res, next){
    const errors = validationResult(req);
    errors.isEmpty()? next(): res.json({code: 400, message: 'error de validacion de campo', errors: errors.array()}); 
}

module.exports = {generalValidation}