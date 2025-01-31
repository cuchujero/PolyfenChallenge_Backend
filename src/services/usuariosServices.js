require("../database/config/config");
const UserModel = require('../database/models/user');

const services = {
    getUsuarios: async (req) => {
        // Obtener parámetros de la consulta
        const { sortBy = 'score', order = 'desc', page = 1, limit = 10 } = req.query;

        // Validación de parámetros
        const validSortFields = ['name', 'email', 'country', 'jobTitle', 'yearsOfExperience', 'industry', 'companySize', 'score'];
        if (!validSortFields.includes(sortBy)) {
            return { error: 'Invalid sortBy field. Valid options are: ' + validSortFields.join(', ') };
        }

        const validOrders = ['asc', 'desc'];
        if (!validOrders.includes(order)) {
            return { error: 'Invalid order. Valid options are: asc, desc' };
        }

        if (isNaN(page) || page <= 0) {
            return { error: 'Invalid page number. It should be a positive integer.' };
        }

        if (isNaN(limit) || limit <= 0) {
            return { error: 'Invalid limit. It should be a positive integer.' };
        }

        // Convertir parámetros numéricos a enteros
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Calcular la cantidad de saltos (skip) para la paginación
        const skip = (pageNumber - 1) * limitNumber;

        // Ordenamiento
        const sortOrder = order === 'desc' ? -1 : 1;

        try {
            // Consultar la base de datos
            const users = await UserModel.find()
                .sort({ [sortBy]: sortOrder })  // Ordenar por el campo especificado
                .skip(skip)  // Paginación (saltos)
                .limit(limitNumber);  // Límite de resultados

            const totalUsers = await UserModel.countDocuments();  // Total de documentos

            // Retornar datos con metadatos de paginación
            return {
                data: users,
                total: totalUsers,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(totalUsers / limitNumber)
            };
        } catch (err) {
            console.error(err);
            return { error: 'Error fetching data from the database.' };
        }
    },
}

module.exports = services;
