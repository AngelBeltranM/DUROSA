const Empleado = require('../models/Empleados');
const jwt = require('jsonwebtoken');

exports.getEmployee = async (req, res) => {

    const employee = await Empleado.find();
    if (!employee) return res.status(401).send(error);

    res.status(200).send(employee);

}


exports.InsertEmp = async (req, res) => {
    const { NOMBRE,
        PUESTO,
        DIRECCION,
        TELEFONO_CASA,
        CELULAR,
        TELEFONO_RECADOS,
        EMAIL,
        FECHA_NACIMIENTO,
        IMSS,
        CLINICA,
        CURP,
        RFC,
        ESTADO_CIVIL,
        NOMBRE_HIJO1,
        FECHA_NACIMIENTO1,
        NOMBRE_HIJO2,
        FECHA_NACIMIENTO2,
        NOMBRE_HIJO3,
        FECHA_NACIMIENTO3,
        DESCUENTO,
        FOLIO,
        GRUPO_SANGUINEO,
        ALERGIAS,
        PADECIMIENTOS,
        NOMBRE_EMERGENCIA,
        TELEFONO_EMERGENCIA,
        TALLA_PLAYERA,
        TALLA_PANTALON,
        TALLA_ZAPATO
    } = req.body;

    const newEmployee = new Employee({
        NOMBRE,
        PUESTO,
        DIRECCION,
        TELEFONO_CASA,
        CELULAR,
        TELEFONO_RECADOS,
        EMAIL,
        FECHA_NACIMIENTO,
        IMSS,
        CLINICA,
        CURP,
        RFC,
        ESTADO_CIVIL,
        NOMBRE_HIJO1,
        FECHA_NACIMIENTO1,
        NOMBRE_HIJO2,
        FECHA_NACIMIENTO2,
        NOMBRE_HIJO3,
        FECHA_NACIMIENTO3,
        DESCUENTO,
        FOLIO,
        GRUPO_SANGUINEO,
        ALERGIAS,
        PADECIMIENTOS,
        NOMBRE_EMERGENCIA,
        TELEFONO_EMERGENCIA,
        TALLA_PLAYERA,
        TALLA_PANTALON,
        TALLA_ZAPATO
    });
    
    await newEmployee.save();

    const token_empleado = jwt.sign({_id: newEmployee._id}, 'secretKey');

    res.status(200).json({token_empleado});
}