function authorizationUser(req, res, next){
    req.session.user_id? next(): res.json({code: 400, message: 'error de autorización de usuario', errors: errors.array()}); 
}

module.exports = {authorizationUser}

