const admin = require('../models/administrador');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


//PETICION GET PARA TRAER UN ADMINISTRADOR POR EL ID
exports.getAdminByID = async (req, res) => {
    const getAdmin = await admin.findById(req.params.id);
    if (!getAdmin) {
        return res.status(401).send("no se encuentra el usuario");
    }
    return res.status(200).send(getAdmin);
}

//PETICION DE REGISTRO PARA AGREGAR UN ADMINISTRADOR
exports.SignInAdmin = async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new admin({ username, password: hashedPassword });
    await newAdmin.save();

    const token_admin = jwt.sign({ _id: newAdmin._id }, 'secretKey');
    res.status(200).json({ token_admin });
}

//PETICION PARA INICIAR SESION COMO ADMINISTRADOR
exports.SignUpAdmin = async (req, res) => {
    const { username, password } = req.body;
    const Admin = await admin.findOne({ username });
    if (!Admin) return res.status(401).send("El usuario no existe");

    const isM = await bcrypt.compare(password, Admin.password);
    if (!isM) return res.status(401).send("Contraseña equivocada");

    const token_admin = jwt.sign({ _id: Admin._id }, 'secretkey');
    return res.status(200).json({ token_admin })
}