const usuarios = require("../models/usuarios")
const bcryptjs = require('bcryptjs');


const obtenerUsuarios = async (req, res) => {
    const listaUsuarios = await usuarios.find()
    try {
        res.status(202).json({
            msg: "Lista de usuarios obtenida correctamente",
            listaUsuarios
        })
    } catch (error) {
        res.status(404).json({ msg: "error al traer usuarios" })
    }
}

const crearUsuario = async (req, res) => {

    const { nombre, apellido, correo, password, rol } = req.body
    const usuario = new usuarios({ nombre, apellido, correo, password, rol })
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    try {
        await usuario.save()
    } catch (error) {
        return res.status(404).json({ msg: "error al crear el usuario" })
    }
    res.status(202).json({
        msg: "Usuario creado correctamente",
        usuario
    })
}


const editarUsuario = async(req, res) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    try {

        if (password) {
            // Encriptar la nueva contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await usuarios.findById(id);
        // Verificar si se encontró y actualizó correctamente el usuario
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        Object.assign(usuario, resto);
        const usuarioActualizado = await usuario.save();

        return res.status(200).json({ msg: "Usuario actualizado con éxito", usuarioActualizado });
    } catch (error) {
        return res.status(500).json({ msg: "Error al actualizar el usuario" });
    }
}

const eliminarUsuario = async(req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarios.findById(id);

        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }
        const nuevoEstado = !usuario.estado;
        usuario.estado = nuevoEstado;
        await usuario.save();

        return res.status(200).json({
            msg: "Estado del usuario actualizado correctamente",
            usuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al actualizar el estado del usuario"
        });
    }
}

const obtenerUsuarioPorNombre = async (req, res) => {
    const keyword = req.query.keyword;
    try {

        const results = await usuarios.find({ apellido: { $regex: keyword, $options: 'i' } });
        res.json({
            msg: "USUARIO/S OBTENIDOS CORRECTAMENTE",
            results
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
}

module.exports = {
    obtenerUsuarioPorNombre,
    obtenerUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}