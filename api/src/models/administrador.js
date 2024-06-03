const { default: mongoose } = require('mongoose');
const {Schema, model} = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
},{
    timestamps: true
})

module.exports = model('Administrador', adminSchema);
