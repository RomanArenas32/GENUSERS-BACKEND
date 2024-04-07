const {Router} = require('express');
const { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarioPorNombre } = require('../controllers/usuarios.controllers');


const router = Router();

router.get('/user', obtenerUsuarios);
router.post('/user', crearUsuario);
router.put('/user/:id', editarUsuario);
router.put('/user/ban/:id', eliminarUsuario);
router.get('/user/search', obtenerUsuarioPorNombre); 



module.exports = router;