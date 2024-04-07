const usuarios = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generarJWT");


const autenticarUsuario = async(req, res) => {

    const { correo, password } = req.body;

    try {
        const usuario = await usuarios.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrecta'
            })
        }
        if(!usuario.estado){
            return res.status(408).json({
                msg: 'Usuario restringido. Contacte al administrador'
            })
        }
        const verificarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!verificarPassword){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrecta'
            })
        }
        const token = await generarJWT(usuario.id)
        res.status(200).json({
           usuario,
           token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ups algo salio mal.! :('
        })
    }
}

const obtenerPerfil = (req, res)=>{
    const { usuario } = req
    res.json({
        usuario
    })
}

module.exports = {autenticarUsuario, obtenerPerfil};