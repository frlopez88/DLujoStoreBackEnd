const express = require('express');
const app = express.Router();
const db = require('../db/conn');

// No vamos a hacer un CRUD 
// Requerimientos de la ruta de usuarios
//Crear Usuario 
// Validaciones 
// Contaseña y Confirmación 
// Contraseña tenga una longitud de 10 Caracteres 
//Validar su Autenticación 
//Actualizar su foto de perfil 

app.post('', (req, res) => {

    const parametros = [

        req.body.correo_electronico,
        req.body.nombre,
        req.body.apellido,
        2, // Id Estado (Sin Validar Correo)
        2, // Id Rol (Cliente)
        req.body.contrasenia

    ];

    let mensajes = new Array();
    let bandera = true;

    if (req.body.confirmacion != req.body.contrasenia) {

        bandera = false;
        mensajes.push("Las contraseñas no coinciden");
    }

    let pass = req.body.contrasenia;

    if (pass.length < 10) {

        bandera = false;
        mensajes.push("La contraseña debe ser mayor a 10 caracteres");
    }


    let respuestaValidacion = {

        exito: bandera,
        mensaje: mensajes,
        excepcion : "", 
        item_usuario : ""

    };


    if (respuestaValidacion.exito === false) {

        res.status(500).json(respuestaValidacion);

    } else {


        let sql = `insert into tbl_usuario  
                    (correo_electronico,nombre, apellido, id_estado , id_rol, contrasenia)
                    values 
                    ($1, $2, $3, $4, $5, $6) returning correo_electronico
        
                ` ;

        db.one(sql, parametros, event => event.id)
            .then(data => {

                const objetoCreado = {

                    correo_electronico: req.body.correo_electronico, 
                    nombre: req.body.nombre, 
                    apellido: req.body.apellido
                    

                };
                respuestaValidacion.mensaje.push("Operación Exitosa") ;
                respuestaValidacion.item_usuario = objetoCreado;

                res.json(respuestaValidacion);

            })
            .catch((error) => {

                respuestaValidacion.mensaje.push("Operación Erronea") ;
                respuestaValidacion.excepcion = error.message;
                respuestaValidacion.exito = false;
                res.status(500).json(respuestaValidacion);


            }
            );



    }

});


module.exports = app;