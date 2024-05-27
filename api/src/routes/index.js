const { Router, request } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const admin = require('../models/administrador')
const jwt = require('jsonwebtoken');
const usuarioController = require('../controller/UsuarioController')

//------- AQUI INICIA LAS PETICIONES DEL MODELO DE USUARIOS ---------//

//PETICION PARA TRAER TODOS LOS DATOS DE USUARIO
router.get('/getUser', usuarioController.getUser);

//PETICION GET PARA TRAER UN USUARIO POR ID
router.get('/get/:id', usuarioController.getUserById);

//PETICION POST PARA PODER AGREGAR UN USUARIO NUEVO
router.post('/signup', usuarioController.SignUp);

//PETICION PARA PODER HACER INICIO DE SESION
router.post('/signin', usuarioController.SignIn);

//PETICION PARA CAMBIAR VALORES DE UN USUARIO
router.put('/putUser/:id', usuarioController.PutUser);

//PETICION DELETE PARA ELIMINAR ALGUN USUARIO POR EL ID
router.delete('/deleteUser/:id', usuarioController.DeleteUser);


//------- AQUI TERMINA LAS PETICIONES DEL MODELO DE USUARIOS ---------//

//AQUI INICIA PETICIONES DEL MODELO DE ADMINISTRADORES

//PETICION GET PARA TRAER UN ADMINISTRADOR POR EL ID
router.get('/getAdmin/:id', async (req, res) => {
    const getAdmin = await admin.findById(req.params.id);
    if (!getAdmin) {
        return res.status(401).send("no se encuentra el usuario");
    }
    return res.status(200).send(getAdmin);
});

//PETICION DE REGISTRO PARA AGREGAR UN ADMINISTRADOR
router.post('/admin', async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new admin({ username, password: hashedPassword });
    await newAdmin.save();

    const token_admin = jwt.sign({ _id: newAdmin._id }, 'secretKey');
    res.status(200).json({ token_admin })
});

//PETICION PARA INICIAR SESION COMO ADMINISTRADOR
router.post('/sigInAdmin', async (req, res) => {
    const { username, password } = req.body;
    const Admin = await admin.findOne({ username });
    if (!Admin) return res.status(401).send("El usuario no existe");

    const isM = await bcrypt.compare(password, Admin.password);
    if (!isM) return res.status(401).send("Contraseña equivocada");

    const token_admin = jwt.sign({ _id: Admin._id }, 'secretkey');
    return res.status(200).json({ token_admin })
});

//AQUI TERMINA LAS PETICIONES DEL MODELO DE ADMINISTRADORES

module.exports = router;
