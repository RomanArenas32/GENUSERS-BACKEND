const { Router } = require('express');
const { obtenerCursos, crearCurso, editarCurso, borrarCurso, obtenerCursoPorNombre, obtenerCursoPorCategoria } = require('../controllers/cursos.controllers');


const router = Router();

router.get('/curso', obtenerCursos); 
router.get('/curso/search', obtenerCursoPorNombre);
router.post('/curso', crearCurso); 
router.put('/curso/:id', editarCurso);
router.delete('/curso/:id', borrarCurso);



module.exports = router;