const Cursos = require('../models/cursos');


const crearCurso = async (req, res) => {
    const { titulo, sinopsis, precio, urlFoto, urlCompra, categoria, autor } = req.body;
    const curso = new Cursos({ titulo, sinopsis, precio, urlFoto, urlCompra, categoria, autor });
    try {
        await curso.save()
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            msg: "Error al agregar curso"
        })
    }
    res.status(200).json({
        msg: "Curso agregado correctamente",
        curso
    })
}

const obtenerCursos = async (req, res) => {

    const cursos = await Cursos.find()
    try {
        res.status(201).json({
            msg: "Lista obtenida con exito",
            cursos
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener los cursos"
        })
    }
}

const obtenerCursoPorNombre = async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const cursos = await Cursos.find({ titulo: { $regex: keyword, $options: 'i' } });
        res.json({
            msg: "CURSOS OBTENIDOS CORRECTAMENTE",
            cursos
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener CURSOS.' });
    }
}

const editarCurso = async (req, res) => {
    const { id } = req.params;
    const  resto  = req.body;
    try {
        const curso = await Cursos.findById(id);
        if (!curso) {
            return res.status(404).json({ msg: "Curso no encontrado" });
        }

        Object.assign(curso, resto);

        const cursoActualizado = await curso.save();

        return res.status(200).json(cursoActualizado);
    } catch (error) {
        return res.status(500).json({ msg: "Error al actualizar el curso" });
    }
}

const borrarCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Cursos.findByIdAndDelete(id);
        if (!curso) {
            return res.status(400).json({
                msg: "El curso no fue encontrado"
            });
        }
        return res.status(200).json({
            msg: "Curso eliminado correctamente",
            curso,
        });

    } catch (error) {
        res.json({
            msg: "Curso no encontrado. Intentelo mas tarde!"
        })
    }
}

module.exports = {
    obtenerCursos,
    crearCurso,
    editarCurso,
    borrarCurso,
    obtenerCursoPorNombre,
}