const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers) {
        try {
            token = req.headers.token;
            const decored = jwt.verify(token, process.env.SECRET) 
            req.usuario = await Usuario.findById(decored.uid).select('-password');
            return next();
        } catch (error) {
            const err = new Error('Token no valido.')
            return res.status(403).json({ msg: err.message });
        }
    }
    if (!token) {
        const error = new Error('Token invalido o inexistente.')
        res.status(403).json({ msg: error.message });
    }
    next();
};

module.exports = checkAuth