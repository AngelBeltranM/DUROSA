const user = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    const Usuario = await user.find();

    if (!Usuario) return res.status(401).send(error);

    res.status(200).send(Usuario);
}


exports.getUserById = async (req, res) => {
    const getUser = await user.findById(req.params.id);
    if (!getUser) {
        return res.status(401).send("no se encuentra el usuario");
    }
    return res.status(200).send(getUser);
}

exports.SignUp = async (req, res) => {
    const { username, nombre, apellido, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({ username, nombre, apellido, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretKey');
    res.status(200).json({ token });
}

exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    const User = await user.findOne({ email });

    if (!User) return res.status(401).send("El correo no existe");

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) return res.status(401).send("Contraseña equivocada");

    const token = jwt.sign({ _id: User._id }, 'secretKey');
    return res.status(200).json({ token });
};


exports.PutUser = async (req, res) => {

    try {
        const { username, nombre, apellido, email, password } = req.body;
        let usuario = await user.findById(req.params.id);

        if (!usuario) return res.status(401).send("No existe el usuario");

        usuario.username = username;
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.password = password;

        usuario = await user.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });

        res.json({ usuario });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Fallo en actualizar datos")
    }

}


exports.DeleteUser = async (req, res) => {

    let usuario = await user.findById(req.params.id);
    if (!usuario) res.status(404).send("El usuario no existe");
    await user.findOneAndDelete({ _id: req.params.id })
    //await user.findOneAndRemove({_id: req.params.id})
    res.status(200).send("Usuario eliminado con exito");

}