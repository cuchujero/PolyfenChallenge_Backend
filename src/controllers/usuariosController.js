const usuariosServices = require('../services/usuariosServices'); 

const controller = {
	getUsuarios: async (req, res)=> {
		res.json(await usuariosServices.getUsuarios(req));
	}
};

module.exports = controller;