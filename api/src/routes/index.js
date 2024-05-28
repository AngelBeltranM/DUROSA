const { Router, request } = require('express');
const router = Router();
const usuarioController = require('../controller/UsuarioController')
const adminController = require('../controller/AdminController')

//------- AQUI INICIA LAS PETICIONES DEL MODELO DE USUARIOS ---------//
router.get('/getUser', usuarioController.getUser);
router.get('/get/:id', usuarioController.getUserById);
router.post('/signup', usuarioController.SignUp);
router.post('/signin', usuarioController.SignIn);
router.put('/putUser/:id', usuarioController.PutUser);
router.delete('/deleteUser/:id', usuarioController.DeleteUser);
//------- AQUI TERMINA LAS PETICIONES DEL MODELO DE USUARIOS ---------//


//AQUI INICIA PETICIONES DEL MODELO DE ADMINISTRADORES
router.get('/getAdmin/:id',  adminController.getAdminByID);
router.post('/admin', adminController.SignInAdmin);
router.post('/sigInAdmin', adminController.SignUpAdmin);
//AQUI TERMINA LAS PETICIONES DEL MODELO DE ADMINISTRADORES

module.exports = router;
