const { Router } = require('express');
const {autenticarUsuario, obtenerPerfil} = require('../controllers/auth.cotrollers');
const checkAuth = require('../middlewares/checkAuth');

const router = Router();


router.post('/login', autenticarUsuario); 
router.get('/perfil', checkAuth, obtenerPerfil); 




module.exports = router;
