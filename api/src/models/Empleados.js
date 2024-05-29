const {Schema, model, default: mongoose} = require('mongoose');

const EmpleadoSchema = new mongoose.Schema( {

    NOMBRE: String,
    PUESTO: String,
    DIRECCION: String,
    TELEFONO_CASA: String,
    CELULAR: String,
    TELEFONO_RECADOS: String,
    EMAIL: String,
    FECHA_NACIMIENTO: String,
    IMSS: String,
    CLINICA: String,
    CURP: String,
    RFC: String,
    ESTADO_CIVIL: String,
    //DATOS DE LOS HIJOS
    NOMBRE_HIJO1: String,
    FECHA_NACIMIENTO1: String,
    NOMBRE_HIJO2: String,
    FECHA_NACIMIENTO2: String,
    NOMBRE_HIJO3: String,
    FECHA_NACIMIENTO3: String,
    //DATOS INFONAVIT
    DESCUENTO: String,
    FOLIO: String,
    //DATOS DE PADECIMIENTO DEL PERSONAL
    GRUPO_SANGUINEO: String,
    ALERGIAS: String,
    PADECIMIENTOS: String,
    NOMBRE_EMERGENCIA: String,
    TELEFONO_EMERGENCIA: String,
    TALLA_PLAYERA: String,
    TALLA_PANTALON: String,
    TALLA_ZAPATO: String 
}, {
    timestamps: true
});

module.exports = model('Empleados', EmpleadoSchema);