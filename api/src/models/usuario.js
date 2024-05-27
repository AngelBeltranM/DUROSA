const { Schema, model, default: mongoose } = require("mongoose");

 const usuarioSchema = new mongoose.Schema({
    username:  String,
    nombre: String,
    apellido: String,
    email: String,
    password: String
 },{
      timestamps: true
 });

 module.exports =  model('Usuario', usuarioSchema)
 